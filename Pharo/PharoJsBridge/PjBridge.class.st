"
A PjBridge is the facade that allows interacting (i.e. evaluting code) with a javascript interpreter. 

Example: 
""1) Start a bridge in a workspace""
bridge := PjBridge startOn: 12345.

""2) Open a web browser on http://localhost:12345""

""3) Perform in the workspace the following expressions one at a time. Use 'printIt' to display results. Watch the log on the web browser to see the  javascript code actually peformed.""
bridge eval: '1+2'.
bridge eval: 'x := 6 * 7'.
bridge eval: 'x - 5'.
bridge loadClass: PjCounter.
bridge eval: 'counter := PjCounter new.
counter increment.
counter increment.
counter increment.
counter count.'. 

""4) Once done, don't forget to stop the bridge""
bridge stop.

Instance Variables
	clientClassName:		<String>
	communicationTrialsCount:		<Integer>
	converter:		<PjSmalltalkToJavaScriptConverer>
	server:		<PjServer>

clientClassName
	- Name of the class of the socket wrapper running on the JavaScript client (e.g. PjEvaluatorWebSocketDelegate)

communicationTrialsCount
	- Number of attempts to send/receive data through the webSocket

converter
	- Smalltalk to JavaScript converter. Used to translate Smalltalk code to JavaScript before evaluating it on the client (see #eval: and #loadClass:)

server
	- Manages client connections including the websocket

"
Class {
	#name : #PjBridge,
	#superclass : #Object,
	#instVars : [
		'server',
		'communicationTrialsCount',
		'result',
		'timeout',
		'callbacks',
		'executingCallbacks',
		'proxies',
		'blockClosures',
		'client'
	],
	#category : #'PharoJsBridge-Kernel'
}

{ #category : #'bridge handling' }
PjBridge class >> bridge [
	^ PjProxyLocalBridge value
	" the following is a hack to make debugging workable if there is only 1 bridge in existence "
		ifNil: [ | instances |
			instances := self allInstances select: #isStarted.
			instances size = 1 ifTrue: [ instances first ] ifFalse: [ nil ]
		]
]

{ #category : #'bridge handling' }
PjBridge class >> bridge: aBridge [
	PjProxyLocalBridge value: aBridge
]

{ #category : #'instance creation' }
PjBridge class >> bridgeForApp: app [
	^ self new
			client: app bridgeClientClass new;
			appClass: app;
			yourself
]

{ #category : #accessing }
PjBridge class >> debugClass [
	^ self
]

{ #category : #accessing }
PjBridge class >> defaultApp [
	^PjBrowserApplication
]

{ #category : #accessing }
PjBridge class >> defaultClientClass [
	^self defaultApp bridgeClientClass
]

{ #category : #'instance creation' }
PjBridge class >> openOn: portNumber title: title [
	^ self new
		openOn: portNumber title: title;
		yourself
]

{ #category : #'closure handling' }
PjBridge class >> pollFor: aTime orUntil: aBlock [
	^ self bridge pollFor: aTime orUntil: aBlock
]

{ #category : #'instance creation' }
PjBridge class >> startOn: portNumber title: title [
	^  (self bridgeForApp: self defaultApp)
		startOn: portNumber title: title;
		yourself
]

{ #category : #'bridge handling' }
PjBridge class >> stop [
	self bridge ifNotNil: [ self bridge stop . self bridge: nil.Smalltalk garbageCollect]
]

{ #category : #accessing }
PjBridge >> appClass: aPharoJsAppClass [
	self client appClass: aPharoJsAppClass.
	self client bridge: self.

]

{ #category : #public }
PjBridge >> asyncEval: smalltalkString withResultDo: singleArgBlock [
	| javaScriptString |
	javaScriptString := self convertToJs: smalltalkString.
	self asyncEvalJavascript: javaScriptString withResultDo: singleArgBlock
]

{ #category : #public }
PjBridge >> asyncEvalJavascript: javaScriptString withResultDo: singleArgBlock [
	self sendMessage: javaScriptString.
	[
	self 
		when: [self isSyncDataAvailable] 
		do: [self handOffResult: singleArgBlock] 
		onTimeOutDo: [ ^ PjJavascriptError signal: 'Time Out! No response received' ]
		timeOutDuration: self timeout.
	] fork.

]

{ #category : #'closure handling' }
PjBridge >> blockClosure: aBlockClosure [
	^ self blockClosures at: aBlockClosure ifAbsentPut: [
		| proxy thisArg |
		(aBlockClosure isKindOf: BlockClosure) ifFalse: [
				^ PjJavascriptError signal: 'Must be a BlockClosure' ].
		aBlockClosure hasMethodReturn ifTrue: [
				^ PjJavascriptError signal: 'Block cannot have return' ].
		thisArg := aBlockClosure argumentNames findFirst: [ : name | name='this' ].
		proxy := self evalJavascript: self websocketDelegateClassName,
			'._default()._makeBlockClosureProxy_(',thisArg asString,')'.
		proxy closure: aBlockClosure.
		proxy
	]
]

{ #category : #'closure handling' }
PjBridge >> blockClosures [
	^ blockClosures ifNil: [blockClosures := IdentityDictionary new]
]

{ #category : #accessing }
PjBridge >> client [
	^ client
]

{ #category : #accessing }
PjBridge >> client: aClient [
	client := aClient.
	client bridge: self.
]

{ #category : #'initialize-release' }
PjBridge >> clientTitle [
	^self client title,' bridge on ',self serverUrlString
]

{ #category : #public }
PjBridge >> convertToJs: anObject [
	^self exporter convertToJs: anObject
]

{ #category : #accessing }
PjBridge >> defaultClientClass [
	^self class defaultClientClass
]

{ #category : #'initialize-release' }
PjBridge >> defaultCommunicationTrialsCount [
	^100
]

{ #category : #'closure handling' }
PjBridge >> deleteBlockClosure: aBlockClosure [
	self blockClosures removeKey: aBlockClosure ifAbsent: [  ]
]

{ #category : #'bridge handling' }
PjBridge >> deleteJsValue: jsName [
	"Called by proxy finalizer see methode PjProxy>>jsName:onBridge:"
	self proxies removeKey: jsName ifAbsent: [ ].
	self isStopped ifTrue: [ ^self ].
	self sendMessage: ':-',jsName.
	^ proxies
]

{ #category : #public }
PjBridge >> evalBlock: aBlock [
	^self evalJavascript: (self convertToJs: aBlock asValuedBlock)

]

{ #category : #evaluating }
PjBridge >> evalGetResult [
	self
		when: [
			self isConnected ifFalse: [ ^ self ].
			self isSyncDataAvailable] 
		do: [self handOffResult: [ : val | ^ val ]]
		onTimeOutDo: [ ^ PjJavascriptError signal: 'no response after ',self timeout printString ]	
		timeOutDuration: self timeout
]

{ #category : #public }
PjBridge >> evalJavascript: javaScriptString [
	self isConnected ifFalse: [ ^ nil ].
	self sendMessage: javaScriptString.
	^ self evalGetResult
]

{ #category : #evaluating }
PjBridge >> evalJsValue: aString [
	(aString at: 1)=$" ifTrue: [ 
			^ (aString copyFrom: 2 to: aString size - 1)
				copyWithRegex: '\\["\\]'
				matchesTranslatedUsing: [ :str | str copyFrom: 2 to: 2 ] ].
	aString = 'true'
		ifTrue: [ ^ true ].
	aString = 'false'
		ifTrue: [ ^ false ].
	^ Number readFrom: (aString copyWithRegex: 'e\+' matchesTranslatedUsing: [ :str | 'e' ])
]

{ #category : #public }
PjBridge >> evalMessage: jsMessage [
	^self evalJavascript: (self convertToJs: jsMessage)

]

{ #category : #public }
PjBridge >> evalMessage: aMessage sentTo: receiverName [
	| jsMessage |
	jsMessage := PjJavascriptMessage receiverId: receiverName selector: aMessage selector arguments: aMessage arguments.
	^self evalMessage: jsMessage

]

{ #category : #evaluating }
PjBridge >> evalResult: aString [
	^ self evalResult: aString parsed: (STON fromString: aString)
]

{ #category : #evaluating }
PjBridge >> evalResult: aString parsed: value [
	value isLiteral ifTrue: [ ^ value ].
	value at: #remove ifPresent: [ 
		| proxy |
		proxy := PjProxy nilOrProxyNamed: (value at: #proxy) asSymbol onBridge: self.
		proxy closure: nil.
		^ true ].
	value at: #proxy ifPresent: [ : name | | proxy |
		proxy := PjProxy nilOrProxyNamed: name asSymbol onBridge: self.
		^ proxy ].
	value at: #cb ifPresent: [ : array |
		| proxy args |
		proxy := PjProxy proxyNamed: array first onBridge: self.
		args := array allButFirst collect: [ : each | self evalResult: '' parsed: each ].
		self scheduleCallback: [ proxy runBlockClosure: args first with: args second ].
		^ self ].
	value at: #keys ifPresent: [ : map |
		^ map collect: [ : val | self evalResult: '' parsed: val ] ].
	value at: #exception ifPresent: [: message | ^ [ PjJavascriptError signal: message ] ].
	^ [ PjJavascriptError signal: 'unrecognized response from browser:' , aString ]
]

{ #category : #evaluating }
PjBridge >> executeAnyCallbacks [
	executingCallbacks ifFalse: [
		callbacks isEmpty ifFalse: [ | savedResult |
			executingCallbacks := true.
			savedResult := result.
			result := self.
			[callbacks isEmpty] whileFalse: [
				callbacks removeFirst value
			].
			result := savedResult.
			executingCallbacks := false
	]]
]

{ #category : #accessing }
PjBridge >> exporter [
	^self client exporter
]

{ #category : #activity }
PjBridge >> handOffResult: aBlock [
	result ~~ self ifTrue: [ | temp |
		temp := result.
		result := self.
		temp isClosure ifTrue: [
			aBlock value: temp value
		] ifFalse: [
			aBlock value: temp
		]
	]
]

{ #category : #'initialize-release' }
PjBridge >> initialize [
	super initialize.
	executingCallbacks := false.
	callbacks := OrderedCollection new.
	self server: self serverClass new.
	self finalizationRegistry add: self executor:
		(ObjectFinalizer new
			receiver: self server;
			selector: #stop;
			yourself).
	communicationTrialsCount := self defaultCommunicationTrialsCount.
	result := self.
	self client: self defaultClientClass new

]

{ #category : #public }
PjBridge >> isConnected [
	self webSocket ifNil: [ ^false ].
	^self webSocket isConnected
]

{ #category : #activity }
PjBridge >> isDataAvailable [
	self isConnected ifFalse: [ ^false ].
	^self webSocket stream isDataAvailable
]

{ #category : #public }
PjBridge >> isListening [
	^self server isListening
]

{ #category : #public }
PjBridge >> isStarted [
	^self server isRunning
]

{ #category : #public }
PjBridge >> isStopped [
	^self isStarted not
]

{ #category : #evaluating }
PjBridge >> isSyncDataAvailable [
	[result == self and: [self isDataAvailable]] whileTrue: [
		result := self evalResult: (self webSocket readMessage).
	].
	self executeAnyCallbacks.
	^ result ~~ self
]

{ #category : #public }
PjBridge >> loadAllClasses: classes [
	| javaScriptClassesDefinition |
	javaScriptClassesDefinition := self exporter convertAllClasses: (classes select: [: c | (c isTrait or: [ c inheritsFrom: TestCase ]) not ]). 
	self evalJavascript: javaScriptClassesDefinition.
	^classes
	
]

{ #category : #public }
PjBridge >> loadClass: aClass [
	| javaScriptClassDefinition |
	self exporter invalidateClass: aClass. 
	javaScriptClassDefinition := self convertToJs: aClass. 
	self evalJavascript: javaScriptClassDefinition.
	^aClass
	
]

{ #category : #activity }
PjBridge >> minimumStepDuration [
	^ 25 milliSeconds
]

{ #category : #activity }
PjBridge >> openOn: portNumber [
	self openOn: portNumber title: 'PharoJS'
]

{ #category : #activity }
PjBridge >> openOn: portNumber test: aTestCase [
	^self openOn: portNumber title: (self titleForTest: aTestCase)
]

{ #category : #activity }
PjBridge >> openOn: portNumber title: title [
	| clientGenerator |
	clientGenerator := self client codeGenerator.
	title ifNotNil: [ clientGenerator titleString: title ].
	self port: portNumber
]

{ #category : #playground }
PjBridge >> playgroundInitialContent [
	^ self client playgroundInitialContent
]

{ #category : #public }
PjBridge >> pollFor: aTime orUntil: aBlock [
	self
		when: [ aBlock value ifNotNil: [ : value | ^ value ] ifNil: [self isSyncDataAvailable]] 
		do: [ self handOffResult: []]
		onTimeOutDo: [ ^ aBlock value ]	
		timeOutDuration: aTime
]

{ #category : #accessing }
PjBridge >> port [
	^self server port
]

{ #category : #'initialize-release' }
PjBridge >> port: portNumber [
	self server port: portNumber
]

{ #category : #accessing }
PjBridge >> proxies [
	^ proxies ifNil: [proxies := WeakValueDictionary new]
]

{ #category : #public }
PjBridge >> reset [
	self resetProxies.
]

{ #category : #public }
PjBridge >> resetClient [
	| oldWebSocket |
	oldWebSocket := self webSocket.
	self sendMessage: self websocketDelegateClassName, '._reload()'.
	self reset.
	self 
		when: [self webSocket ~~ oldWebSocket] 
		do: [oldWebSocket close] 
		onTimeOutDo: [self error: 'Client did NOT reconnect!'].
	self waitForClientToStart.

]

{ #category : #'initialize-release' }
PjBridge >> resetProxies [
	proxies := nil.
]

{ #category : #public }
PjBridge >> restart [
	self stop.
	self start
]

{ #category : #evaluating }
PjBridge >> scheduleCallback: aBlock [
	callbacks ifNil: [ callbacks := OrderedCollection new ].
	callbacks add: aBlock
]

{ #category : #activity }
PjBridge >> sendMessage: aString [
	self 
		when: [self isConnected] 
		do: [self webSocket sendMessage: aString] 
		onTimeOutDo: [ self inform: 'WebSocket is NOT avaialble' ]
		timeOutDuration: 100 milliSeconds
]

{ #category : #accessing }
PjBridge >> server [
	^server
]

{ #category : #accessing }
PjBridge >> server: anObject [
	server := anObject
]

{ #category : #accessing }
PjBridge >> serverAddress [
	self shouldBeImplemented.
]

{ #category : #'initialize-release' }
PjBridge >> serverClass [
	^PjServer
]

{ #category : #accessing }
PjBridge >> serverUrl [
	^ self server url
]

{ #category : #accessing }
PjBridge >> serverUrlString [
	^ self server urlString
]

{ #category : #public }
PjBridge >> setExtraBindings: aDictionary [
	^self exporter setExtraBindings: aDictionary
]

{ #category : #public }
PjBridge >> start [
	self isStarted ifTrue: [ ^self ].
	self startServer.
	self waitForServerToStart.
	self client start.
	self waitForClientToStart
]

{ #category : #activity }
PjBridge >> startOn: portNumber title: title [
	self openOn: portNumber title: title.
	self start
]

{ #category : #activity }
PjBridge >> startServer [
	self server start
]

{ #category : #public }
PjBridge >> stop [
	self isStopped ifTrue: [ ^self ].
	self client stop.
	self stopServer.
	self waitForServerToStop 
]

{ #category : #activity }
PjBridge >> stopServer [
	self server stop
]

{ #category : #public }
PjBridge >> terminateClient [
	self isConnected ifFalse: [ ^self ].  
	self client stop.
	self webSocket close.

]

{ #category : #evaluating }
PjBridge >> timeout [
	^ timeout ifNil: [ 10 seconds ]
]

{ #category : #evaluating }
PjBridge >> timeout: aDuration [
	timeout := (aDuration isKindOf: Duration) ifTrue: [ aDuration ] ifFalse: [ aDuration seconds ].
]

{ #category : #'initialize-release' }
PjBridge >> titleForTest: aTest [
	^ aTest className , '>>#' , aTest selector
]

{ #category : #activity }
PjBridge >> waitForClientToStart [
	self 
		when: [self isConnected] 
		do: [^self] 
		onTimeOutDo: [self error: 'Javascript interpreter NOT available']

]

{ #category : #activity }
PjBridge >> waitForServerToStart [
	self 
		when: [self isStarted] 
		do: [^self] 
		onTimeOutDo: [ self error: 'Server not ready' ]

]

{ #category : #activity }
PjBridge >> waitForServerToStop [
	self 
		when: [self isStopped] 
		do: [^self] 
		onTimeOutDo: [ self error: 'Server not stopped yet' ]

]

{ #category : #accessing }
PjBridge >> webSocket [
	^self server webSocket
]

{ #category : #accessing }
PjBridge >> webSocketUrlTag [
	^self server webSocketUrlTag
]

{ #category : #'initialize-release' }
PjBridge >> websocketDelegateClassName [
	^self client websocketDelegateClassName
]

{ #category : #activity }
PjBridge >> when: conditionBlock do: actionBlock onTimeOutDo: failureBlock [
	^self when: conditionBlock do: actionBlock onTimeOutDo: failureBlock timeOutDuration: 5 seconds 
]

{ #category : #activity }
PjBridge >> when: conditionBlock do: actionBlock onTimeOutDo: failureBlock timeOutDuration: maxWaitDuration [
	| waitTime |
	waitTime := maxWaitDuration / communicationTrialsCount.
	waitTime < self minimumStepDuration ifTrue: [waitTime := self minimumStepDuration].
	communicationTrialsCount timesRepeat: [
		conditionBlock value ifTrue: [ ^actionBlock value ].
		waitTime wait.
	].
	^failureBlock value.	

]

{ #category : #public }
PjBridge >> withClientLogging [
	self client: self client withClientLogging
]