function JbUndefinedObject(){};function JbWebSocketDelegate(){};function JbEvaluatorWebSocketDelegate(){};function Message(){};function PjApplication(){};JbUndefinedObject.prototype._notNil = function(){	return false};JbUndefinedObject.prototype._ifNotNil_ifNil_ = function(xx,aBlock){	return aBlock();};JbUndefinedObject.prototype._isNil = function(){	return true};JbUndefinedObject.prototype._value = function(){	return undefined};JbUndefinedObject.prototype.__61 = function(other){	return undefined==other};JbUndefinedObject.prototype._ifNil_ = function(aBlock){	return aBlock();};JbUndefinedObject.prototype._isNotNil = function(){	return false};JbUndefinedObject.prototype._ifNil_ifNotNil_ = function(aBlock,xx){	return aBlock();};JbUndefinedObject.prototype._ifNotNil_ = function(aBlock){	return this};JbUndefinedObject._initialize = function(){var self=this;	this._install_asGlobalNamed_((function block__(value){	if(undefined==value){		return self.nilValue	}	return value}),"$asNil$");	this.nilValue = JbUndefinedObject.__proto__._new.call(this);	return this};JbUndefinedObject._new = function(){	return Error._signal_("cannot create instances of UndefinedObject")};JbUndefinedObject.__proto__ = Object;JbUndefinedObject.prototype.__proto__ = Object.prototype;Object.prototype._isNumber = function(){	return false};Object.prototype._isClass = function(){	return false};Object.prototype._isArray = function(){	return false};Object.prototype._perform_with_ = function(selector,arg){	return $asNil$(this[$asNil$(this._class())._registerDNU_(selector)]).call(this,arg)};Object.prototype._perform_withArguments_ = function(selector,argArray){	return $asNil$(this[$asNil$(this._class())._registerDNU_(selector)]).apply(this,argArray)};Object.prototype._instVarNamed_ = function(varName){	return this[varName];};Object.prototype._perform_withArguments_inSuperclass_ = function(selector,argArray,lookupClass){	return $asNil$(lookupClass.prototype[$asNil$(this._class())._registerDNU_(selector)]).apply(this,argArray)};Object.prototype._instVarNames = function(){	return Object.keys(this);};Object.prototype._perform_with_with_ = function(selector,arg1,arg2){	return $asNil$(this[$asNil$(this._class())._registerDNU_(selector)]).call(this,arg1,arg2)};Object.prototype._isBlock = function(){	return false};Object.prototype._ifNotNil_ifNil_ = function(aBlock,xx){	return aBlock(this);};Object.prototype._instVarNamed_put_ = function(varName,newValue){	return this[varName] = newValue;};Object.prototype._isFloat = function(){	return false};Object.prototype._isMemberOf_ = function(aClass){	return this._class()===aClass};Object.prototype._doesNotUnderstand_ = function(aMessage){	return Object._handleDNU_for_(aMessage,this)};Object.prototype._initialize = function(){	return this};Object.prototype._isString = function(){	return false};Object.prototype._class = function(){	return this.constructor;};Object.prototype._ifNil_ = function(aBlock){	return this};Object.prototype._asJson = function(){	return JSON.stringify(this);};Object.prototype._isNotNil = function(){	return true};Object.prototype._perform_with_with_with_ = function(selector,arg1,arg2,arg3){	return $asNil$(this[$asNil$(this._class())._registerDNU_(selector)]).call(this,arg1,arg2,arg3)};Object.prototype._value = function(){	return this};Object.prototype._ifNil_ifNotNil_ = function(xx,aBlock){	return aBlock(this);};Object.prototype._ifNotNil_ = function(aBlock){	return aBlock(this);};Object.prototype.__126_126 = function(other){	return this!==other};Object.prototype.__61_61 = function(other){	return this===other};Object.prototype._className = function(){	var s=this.constructor&&this.constructor.name||this.toString();	if (s.substr(0,1)=="[") s=s.substr(8,s.length-9);	return s};Object.prototype._flag_ = function(aSymbol){	return this};Object.prototype._isKindOf_ = function(aClass){	if(this._class()===aClass){		return true	}else{		return $asNil$(this._class())._inheritsFrom_(aClass)	}};Object.prototype._notNil = function(){	return true};Object.prototype._isNil = function(){	return false};Object.prototype._perform_ = function(selector){	return $asNil$(this[$asNil$(this._class())._registerDNU_(selector)]).call(this)};Object.prototype._yourself = function(){	return this};Object.prototype._isInteger = function(){	return false};Object.prototype._localSlotNames = function(){	return Object.keys(this);};Object.prototype.__61 = function(other){	return this===other};Object.prototype._isBehavior = function(){	return false};Object.prototype._isClosure = function(){	return false};Object.prototype._respondsTo_ = function(aSymbol){	return $asNil$(this._class())._canUnderstand_(aSymbol)};Object.prototype._isCollection = function(){	return false};Object.prototype.__126_61 = function(other){	return this!==other};Object._install_asGlobalNamed_ = function(anObject,jsName){	(function(){this[jsName]=anObject})()};Object._instVarNames = function(){	return Object.keys(this);};Object._makeDNU_ = function(aSelector){	return function DNU() {		return this._doesNotUnderstand_(			Message._selector_arguments_(aSelector,										[].slice.call(arguments)))}};Object._makeSetter_ = function(selector){	return function Setter(value){return this[selector]=value}};Object._registerDNUs_ = function(anArray){var self=this;	$asNil$(anArray).forEach((function block__(each){	return self._registerDNU_(each)}));	return this};Object._initialize = function(){	if(this.selectorsToDNU===undefined){		undefined	}else{		this._registerDNUs_(this.selectorsToDNU);		this.selectorsToDNU = undefined	}	return this};Object._saveSelectorsForDNU_ = function(anArray){	this.selectorsToDNU = anArray;	return this};Object._makeGetter_ = function(selector){	return function Getter(){return this[selector]}};Object._handleDNU_for_ = function(aMessage,anObject){var selector,type,jsSelector;	selector = $asNil$($asNil$(aMessage)._selector()).split(":")[0];	type = $asNil$(selector).split("_");	if(type[1]===undefined){		undefined	}else{		if(type[0]=="slot"){			selector = type[1];			type = $asNil$(aMessage)._arguments().length		}else{			if(type[0]=="native"){				selector = type[1];				type = 2			}		}	}	if(((type!=0)&&(((type!=1)&&(((type!=2)&&((type = anObject[selector])!=undefined))))))){		if(typeof type=="function"){			type = 2		}else{			type = $asNil$(aMessage)._arguments().length		}	}	jsSelector = this._makeJSSelector_($asNil$(aMessage)._selector());	if(type===0){		return $asNil$(anObject.__proto__[jsSelector]=this._makeGetter_(selector)).call(anObject)	}	if(type===1){		return $asNil$(anObject.__proto__[jsSelector]=this._makeSetter_(selector)).call(anObject,$asNil$(aMessage)._arguments()[0])	}	if(type===2){		type = anObject.__proto__;		while(type!=undefined){			if((($asNil$(type).hasOwnProperty(selector))&&(typeof type[selector]=="function"))){				return $asNil$(type[jsSelector]=type[selector]).apply(anObject,$asNil$(aMessage)._arguments())			}			type = type.__proto__		}	}	Error._signal_($asNil$("Message not understood: "+$asNil$(anObject)._className()+">>").__44($asNil$(aMessage)._selector()));	return this};Object._makeJSSelector_ = function(aSelector){var arr;	console.log(aSelector);	if($asNil$(aSelector)._isLetter()){		return $asNil$($asNil$(":"+aSelector).split(":")).join("_")	}	arr = [undefined,undefined];	for(var idx = 1,idxLimiT = $asNil$(aSelector)._size();idx<=idxLimiT;idx = idx+1){		$asNil$(arr).push($asNil$($asNil$(aSelector).charCodeAt(idx-1))._asString())	};	return $asNil$(arr).join("_")};Object._registerDNU_ = function(aSelector){var selector;	selector = this._makeJSSelector_(aSelector);	if((Object[selector])==undefined){		$asNil$(this.prototype)._instVarNamed_put_(selector,this._makeDNU_(aSelector))	}	return selector};Function.prototype._new_ = function(anObject){	return $asNil$(this._basicNew_(anObject))._initialize()};Function.prototype._isClass = function(){	return this._isBehavior()};Function.prototype._basicNew = function(){	return new this();};Function.prototype._canUnderstand_ = function(selector){	var obj=this.prototype[Object._makeJSSelector_(selector)];return typeof obj=="function" && obj.name!="DNU";};Function.prototype._newFromJsonString_ = function(jsonString){var newInstance;	newInstance = JSON.parse(jsonString);	this._adoptInstance_(newInstance);	return newInstance};Function.prototype._isBlock = function(){	console.dir(this);return this.name=="block__"};Function.prototype._whileTrue = function(){	while(this());	return undefined};Function.prototype._adoptInstance_ = function(anObject){	anObject.__proto__ = this.prototype;};Function.prototype._ensure_ = function(aBlock){	try{		return this()	}finally{aBlock()};	return this};Function.prototype._value = function(){	return this()};Function.prototype._value_ = function(arg){	return this(arg)};Function.prototype._basicNew_ = function(anObject){	return new this(anObject);};Function.prototype._whileFalse = function(){	while(!(this()));	return undefined};Function.prototype._ifCurtailed_ = function(curtailBlock){var result,curtailed;	curtailed = true;	try{		result = this();		curtailed = false	}finally{		if(curtailed){			typeof curtailBlock=="function"?curtailBlock():curtailBlock		}	}	return result};Function.prototype._whileFalse_ = function(arg){	while(!(this())){arg()}	return undefined};Function.prototype._whileTrue_ = function(arg){	while(this()){arg()}	return undefined};Function.prototype._cull_cull_ = function(arg1,arg2){	return this(arg1,arg2)};Function.prototype._value_value_ = function(arg1,arg2){	return this(arg1,arg2)};Function.prototype._cull_ = function(arg){	return this(arg)};Function.prototype._on_do_ = function(exception,handlerAction){var ex;	try{		return this()	}catch(ex){if (ex instanceof exception){		return $asNil$(handlerAction)._value_(ex)	}else throw ex}	return this};Function.prototype._valueWithArguments_ = function(anArray){	return this.apply(this,anArray)};Function.prototype._new = function(){	return $asNil$(this._basicNew())._initialize()};Function.prototype._superclass = function(){	return this.prototype && this.prototype.__proto__.constructor};Function.prototype._isBehavior = function(){	return $asNil$(this._isBlock())._not()};Function.prototype._isClosure = function(){	return this._isBlock()};Function.prototype._inheritsFrom_ = function(aClass){var aSuperclass;	aSuperclass = this._superclass();	while(!(aSuperclass===undefined)){		if(aSuperclass===aClass){			return true		}		aSuperclass = $asNil$(aSuperclass)._superclass()	}	return false};Function.prototype._name = function(){	return this.name};Function._initialize = function(){	this._install_asGlobalNamed_(this,"BlockClosure");	this._flag_("todo");	return this};Function.__proto__ = Object;Boolean.prototype._asBit = function(){	if(true==this){		return 1	}else{		return 0	}};Boolean.prototype.__124 = function(aBoolean){	if(true==this){		return true	}else{		return aBoolean	}};Boolean.prototype._ifTrue_ifFalse_ = function(tBlock,fBlock){	if(true==this){		return typeof tBlock=="function"?tBlock():tBlock	}else{		return typeof fBlock=="function"?fBlock():fBlock	}};Boolean.prototype._not = function(){	if(true==this){		return false	}else{		return true	}};Boolean.prototype._ifFalse_ifTrue_ = function(fBlock,tBlock){	if(true==this){		return typeof tBlock=="function"?tBlock():tBlock	}else{		return typeof fBlock=="function"?fBlock():fBlock	}};Boolean.prototype._ifTrue_ = function(tBlock){	if(true==this){		return typeof tBlock=="function"?tBlock():tBlock	}else{		return undefined	}};Boolean.prototype._or_ = function(alternativeBlock){	if(true==this){		return true	}else{		return typeof alternativeBlock=="function"?alternativeBlock():alternativeBlock	}};Boolean.prototype._ifFalse_ = function(fBlock){	if(true==this){		return undefined	}else{		return typeof fBlock=="function"?fBlock():fBlock	}};Boolean.prototype._xor_ = function(aBoolean){	if(true==this){		return $asNil$(typeof aBoolean=="function"?aBoolean():aBoolean)._not()	}else{		return typeof aBoolean=="function"?aBoolean():aBoolean	}};Boolean.prototype.__38 = function(aBoolean){	if(true==this){		return aBoolean	}else{		return false	}};Boolean.prototype._and_ = function(alternativeBlock){	if(true==this){		return typeof alternativeBlock=="function"?alternativeBlock():alternativeBlock	}else{		return false	}};Boolean._new = function(){	return Error._signal_("cannot create instances of Boolean")};Boolean._javaScriptName = function(){	return "Boolean"};Boolean.__proto__ = Object;Error.prototype._messageText_ = function(signalerText){	this.message = signalerText;	return this};Error.prototype._signal = function(){	throw (this);	return this};Error.prototype._signal_ = function(signalerText){	this._messageText_(signalerText);	return this._signal()};Error._signal = function(){	return $asNil$(this._new())._signal()};Error._signal_ = function(message){	return $asNil$(this._new())._signal_(message)};Error.__proto__ = Object;JbWebSocketDelegate.prototype._onOpen_ = function(event){	return this};JbWebSocketDelegate.prototype._close = function(){	$asNil$(this.webSocket).close();	return this};JbWebSocketDelegate.prototype._onError_ = function(event){	return this};JbWebSocketDelegate.prototype._connectTo_ = function(urlString){	this.webSocket = new WebSocket(urlString);	window.Jb_this = this;	this._initWebSocket();	return this};JbWebSocketDelegate.prototype._isConnected = function(){	if((this.webSocket)==undefined){		return false	}	return this.webSocket.readyState===WebSocket.OPEN};JbWebSocketDelegate.prototype._onMessage_ = function(event){	return this};JbWebSocketDelegate.prototype._initWebSocket = function(){var self=this;	this.webSocket.onopen = (function block__(event){	return self._onOpen_(event)});	this.webSocket.onmessage = (function block__(event){	return self._onMessage_(event)});	this.webSocket.onclose = (function block__(event){	return self._onClose_(event)});	this.webSocket.onerror = (function block__(event){	return self._onError_(event)});	return this};JbWebSocketDelegate.prototype._onClose_ = function(event){	return this};JbWebSocketDelegate.prototype._isClosed = function(){	if((this.webSocket)==undefined){		return true	}	return this.webSocket.readyState===WebSocket.CLOSED};JbWebSocketDelegate._connectToTag_ = function(tagString){	return this._connectToUrl_($asNil$("ws://"+location.host+"/").__44(tagString))};JbWebSocketDelegate._connectToUrl_ = function(urlString){var newInstance;	newInstance = this._new();	$asNil$(newInstance)._connectTo_(urlString);	return newInstance};JbWebSocketDelegate.__proto__ = Object;JbWebSocketDelegate.prototype.__proto__ = Object.prototype;JbEvaluatorWebSocketDelegate.prototype._doCallBack_ = function(aResult){	$asNil$(this.webSocket).send(aResult);	return this};JbEvaluatorWebSocketDelegate.prototype._close = function(){	this.shouldRetryToConnectToServer = false;	JbEvaluatorWebSocketDelegate.prototype.__proto__._close.call(this);	return this};JbEvaluatorWebSocketDelegate.prototype._makeBlockClosureProxy_ = function(withThis){	return this._makeBlockClosureProxy_stopPropagation_(withThis,true)};JbEvaluatorWebSocketDelegate.prototype._connectTo_ = function(urlString){	this.shouldRetryToConnectToServer = true;	this.bridgeUrlString = urlString;	JbEvaluatorWebSocketDelegate.prototype.__proto__._connectTo_.call(this,urlString);	return this};JbEvaluatorWebSocketDelegate.prototype._onError_ = function(event){	this._reconnect();	return this};JbEvaluatorWebSocketDelegate.prototype._onMessage_ = function(event){var resultJson;	resultJson = this._eval_(event.data);	$asNil$(this.webSocket).send(resultJson);	return resultJson};JbEvaluatorWebSocketDelegate.prototype._eval_ = function(aString){	var result;	try{		result = this._resultObject_((function(){return this.eval(aString)})());	}catch(exception){		result={exception:exception.message};	}	try{		return JSON.stringify(result);	}catch(stringifyException){		return JSON.stringify({exception:stringifyException.message});	}};JbEvaluatorWebSocketDelegate.prototype._onClose_ = function(event){	this._reconnect();	return this};JbEvaluatorWebSocketDelegate.prototype._resultObject_ = function(result){	var name;		if (result == undefined) return { proxy : typeof result};		if (result.toLowerCase && result.toLowerCase===String.prototype.toLowerCase) result = ""+result;		if (typeof result == "object" || typeof result == "function") {			if (!(name = result.$_jbName)) {				if (result === window) name = "window";				else if (result === document) name = "document";				else if (result === console) name = "console";				else if (result === JSON) name = "JSON";				else {					this.$Jb_counter = (this.$Jb_counter||0)+1;					name = "$_"+this.$Jb_counter;					(function(){return this})()[name]=result;				}				Object.defineProperty(result,"$_jbName",{value:name});			}			return { remove : result.$JbProxyRemove , proxy : name} // , length : (result instanceof Array || result.item) ? result.length : undefined , name : result.constructor && result.constructor.name}		}		return { basic : result }	};JbEvaluatorWebSocketDelegate.prototype._makeBlockClosureProxy_stopPropagation_ = function(withThis,stop){		var self=this;	function JbBlockClosureProxy(ev){			callback(JbBlockClosureProxy.$_jbName,ev,this);			return true;		};	function callback(name,ev,jsThis) {		if (stop) ev.stopPropagation();		self._doCallBack_(JSON.stringify({cb : [name,								self._resultObject_(ev),								self._resultObject_(withThis?jsThis:undefined)]}));	}	JbBlockClosureProxy.$JbRefCount=0;	return JbBlockClosureProxy;	};JbEvaluatorWebSocketDelegate.prototype._reconnect = function(){	if(this.shouldRetryToConnectToServer){		undefined	}else{		return this	}	JbEvaluatorWebSocketDelegate.prototype.__proto__._connectTo_.call(this,this.bridgeUrlString);	return this};JbEvaluatorWebSocketDelegate._connectDefaultToTag_ = function(tagString){var newInstance;	newInstance = this._connectToTag_(tagString);	this._default_(newInstance);	return this};JbEvaluatorWebSocketDelegate._set_callback_to_ = function(anObject,aString,callback){	aString="on"+aString;	var old=anObject[aString];	anObject[aString]=callback;	if (callback && callback.hasOwnProperty("$JbRefCount")) {		++callback.$JbRefCount;	}	if (old && old.$JbRefCount && --old.$JbRefCount==0) {		old.$JbProxyRemove = true;		return old;	}	return true;	};JbEvaluatorWebSocketDelegate._closeDefault = function(){	$asNil$(this._default())._close();	return this};JbEvaluatorWebSocketDelegate._terminate = function(){	this._closeDefault();	window.close();	return this};JbEvaluatorWebSocketDelegate._default_ = function(newInstance){	this.default = newInstance;	return this};JbEvaluatorWebSocketDelegate._connectDefaultToUrl_ = function(urlString){var newInstance;	newInstance = this._connectToUrl_(urlString);	this._default_(newInstance);	return this};JbEvaluatorWebSocketDelegate._default = function(){	return this.default};JbEvaluatorWebSocketDelegate._reload = function(){	this._closeDefault();	location.reload(true);	return this};JbEvaluatorWebSocketDelegate.__proto__ = JbWebSocketDelegate;JbEvaluatorWebSocketDelegate.prototype.__proto__ = JbWebSocketDelegate.prototype;Number.prototype._isNumber = function(){	return true};Number.prototype.__60_61 = function(other){	return this<=other};Number.prototype._timesRepeat_ = function(aBlock){var $0;	for($0= (this) ; $0 >0;$0--){		typeof aBlock=="function"?aBlock():aBlock	};	return this};Number.prototype.__126_61 = function(other){	return this!=other};Number.prototype._to_by_do_ = function(end,step,aBlock){	for(v=this;v<=end;v+=step){		$asNil$(aBlock)._value_(v)	};	return this};Number.prototype._arcCos = function(){	return Math.acos(this)};Number.prototype._sign = function(){	if(this>0){		return 1	}	if(this<0){		return -1	}	return 0};Number.prototype.__60 = function(other){	return this<other};Number.prototype._isFloat = function(){	if(this._isInteger()){		return false	}	if(this._isNaN()){		return false	}	return true};Number.prototype.__43 = function(other){	return typeof other=="number"?this+other:other._adaptToNumber_andSend_(this,"+")};Number.prototype.__45 = function(other){	return typeof other=="number"?this-other:other._adaptToNumber_andSend_(this,"-")};Number.prototype._isNaN = function(){	return this!=this};Number.prototype._tan = function(){	return Math.tan(this)};Number.prototype._cos = function(){	return Math.cos(this)};Number.prototype._to_do_ = function(end,aBlock){	for(var v = this;v<=end;v = v+1){		$asNil$(aBlock)._value_(v)	};	return this};Number.prototype._truncated = function(){	return Math.trunc(this)};Number.prototype._abs = function(){	if(this<0){		return 0-this	}	return this+0};Number.prototype._isFinite = function(){	return 0.0==this-this};Number.prototype._arcTan = function(){	return Math.atan(this)};Number.prototype._sin = function(){	return Math.sin(this)};Number.prototype._asString = function(){	return this.toString()};Number.prototype.__62 = function(other){	return this>other};Number.prototype._ln = function(){	return Math.log(this)};Number.prototype._sqrt = function(){	return Math.sqrt(this)};Number.prototype._log = function(){	return Math.log10(this)};Number.prototype.__62_61 = function(other){	return this>=other};Number.prototype._exp = function(){	return Math.exp(this)};Number.prototype._negated = function(){	return 0-this};Number.prototype._arcSin = function(){	return Math.asin(this)};Number.prototype._reciprocal = function(){	return 1.0/this};Number.prototype._isInteger = function(){	return this==this._truncated()};Number.prototype.__61 = function(other){	return this==other};Number.prototype._isInfinite = function(){	return 1/0===this._abs()};Number.prototype.__42 = function(other){	return typeof other=="number"?this*other:other._adaptToNumber_andSend_(this,"*")};Number.prototype._isZero = function(){	return this==0};Number.prototype.__47 = function(other){	return typeof other=="number"?this/other:other._adaptToNumber_andSend_(this,"/")};Number._e = function(){	return Math.E};Number._pi = function(){	return Math.PI};Number.__proto__ = Object;String.prototype._last = function(){	return this._at_(this._size())};String.prototype._size = function(){	return this.length};String.prototype.__62 = function(other){	return this>other};String.prototype._isEmpty = function(){	return $asNil$(this._size()).__61(0)};String.prototype._first = function(){	return this._at_(1)};String.prototype.__62_61 = function(other){	return this>=other};String.prototype._ifEmpty_ = function(aBlock){	if(this._isEmpty()){		return typeof aBlock=="function"?aBlock():aBlock	}	return this};String.prototype.__60 = function(other){	return this<other};String.prototype.__44 = function(other){	return this+other};String.prototype._notEmpty = function(){	return this._size()>0};String.prototype._isString = function(){	return true};String.prototype._at_put_ = function(index,anObject){	throw new Error("cannot mutate strings");};String.prototype._at_ = function(index){	return this[index - 1];};String.prototype.__61 = function(other){	return this==other};String.prototype._collect_ = function(aBlock){var arr;	arr = this.split("");	$asNil$($asNil$($asNil$((1)._to())._self())._size())._do_((function block__(idx){	return $asNil$(arr)._at_put_(idx,$asNil$(aBlock)._value_($asNil$(arr)._at_(idx)))}));	return $asNil$(arr).join("")};String.prototype._isLetter = function(){var firstLetter,firstCode;	firstLetter = $asNil$(this.charAt(0)).toUpperCase();	firstCode = $asNil$(firstLetter).charCodeAt(0);	if(firstCode<65){		return false	}	if(firstCode>90){		return false	}	return true};String.prototype.__60_61 = function(other){	return this<=other};String.prototype.__126_61 = function(other){	return this!=other};String._new_ = function(size){	this._explicitRequirement();	return this};String._defaultSize = function(){	return 10};String._new = function(){	return this._new_(this._defaultSize())};String.__proto__ = Object;Message.prototype._selector = function(){	return this.selector};Message.prototype._analogousCodeTo_ = function(anObject){	return ((this._class()===$asNil$(anObject)._class())&&(((this.selector===$asNil$(anObject)._selector())&&((($asNil$(this.args).__61($asNil$(anObject)._arguments()))&&(this.lookupClass===$asNil$(anObject)._lookupClass()))))))};Message.prototype._storeOn_ = function(aStream){var $0;	(		$0 = $asNil$(aStream),		$0._nextPut_("("),		$0._nextPutAll_(this._class()._name()),		$0._nextPutAll_(" selector: "),		$0._store_(this.selector),		$0._nextPutAll_(" arguments: "),		$0._store_(this.args),		$0._nextPut_(")"));	return this};Message.prototype._sentTo_ = function(receiver){	if(this.lookupClass===undefined){		return $asNil$(receiver)._perform_withArguments_(this.selector,this.args)	}else{		return $asNil$(receiver)._perform_withArguments_inSuperclass_(this.selector,this.args,this.lookupClass)	}};Message.prototype._sendTo_ = function(receiver){	return $asNil$(receiver)._perform_withArguments_(this.selector,this.args)};Message.prototype._setSelector_arguments_ = function(aSymbol,anArray){	this.selector = aSymbol;	this.args = anArray;	return this};Message.prototype._lookupClass_ = function(aClass){	this.lookupClass = aClass;	return this};Message.prototype._argument_ = function(newValue){	$asNil$(this.args)._at_put_(1,newValue);	return this};Message.prototype._hasArguments = function(){	return $asNil$(this.args)._notEmpty()};Message.prototype._printOn_ = function(stream){	if($asNil$(this.args)._isEmpty()){		return $asNil$(stream)._nextPutAll_(this.selector)	}	$asNil$(this.args)._with_do_($asNil$(this.selector)._keywords(),(function block__(arg,word){	$asNil$(stream)._nextPutAll_(word);	$asNil$(stream)._space();	$asNil$(arg)._printOn_(stream);	return $asNil$(stream)._space()}));	$asNil$(stream)._skip_(-1);	return this};Message.prototype._argument = function(){	return $asNil$(this.args)._at_(1)};Message.prototype._lookupClass = function(){	return this.lookupClass};Message.prototype._numArgs = function(){	return $asNil$(this.args)._size()};Message.prototype._setSelector_ = function(aSymbol){	this.selector = aSymbol;	return this};Message.prototype._arguments = function(){	return this.args};Message.prototype._sends_ = function(aSelector){	return this.selector===aSelector};Message._selector_arguments_ = function(aSymbol,anArray){	return $asNil$(this._new())._setSelector_arguments_(aSymbol,anArray)};Message._selector_ = function(aSymbol){	return $asNil$(this._new())._setSelector_arguments_(aSymbol,Array._new_(0))};Message._selector_argument_ = function(aSymbol,anObject){	return $asNil$(this._new())._setSelector_arguments_(aSymbol,[anObject])};Message.__proto__ = Object;Message.prototype.__proto__ = Object.prototype;PjApplication.prototype._hideDomElementAt_ = function(elementId){	this._domElementAt_setAttribute_to_(elementId,"style","display:none;");	return this};PjApplication.prototype._domElementAt_setAttribute_to_ = function(elementId,attributeName,attributeValue){	$asNil$(this._domElementAt_(elementId))._setAttribute_to_(attributeName,attributeValue);	return this};PjApplication.prototype._stop = function(){	return this};PjApplication.prototype._showDomElementAt_ = function(elementId){	this._domElementAt_setAttribute_to_(elementId,"style","display:block;");	return this};PjApplication.prototype._start = function(){	this._subscribeToDeviceEvents();	return this};PjApplication.prototype._replaceContentsOf_with_ = function(elementId,aString){	$asNil$(this._domElementAt_(elementId))._innerHTML_(aString);	return this};PjApplication.prototype._subscribeToDeviceEvents = function(){	return this};PjApplication.prototype._domElementAt_ = function(elementId){	return document._getElementById_(elementId)};PjApplication._stop = function(){	return $asNil$(this._currentInstance())._stop()};PjApplication._resetCurrentInstance = function(){	this.currentInstance = undefined;	return this};PjApplication._start = function(){	this.currentInstance = this._new();	$asNil$(this._currentInstance())._start();	return this};PjApplication._currentInstance = function(){	return this.currentInstance};PjApplication.__proto__ = Object;PjApplication.prototype.__proto__ = Object.prototype;Object._saveSelectorsForDNU_(["not","truncated","instVarNamed:put:","connectTo:","arguments","connectToUrl:","start","install:asGlobalNamed:","registerDNUs:","domElementAt:setAttribute:to:","initWebSocket","with:do:","lookupClass","closeDefault","size","abs","getElementById:","perform:withArguments:inSuperclass:","at:put:","perform:withArguments:","printOn:","initialize","makeJSSelector:","signal","makeBlockClosureProxy:stopPropagation:","keywords","do:","defaultSize","basicNew:","new","=","domElementAt:","nextPutAll:","store:","makeGetter:","class","signal:","setAttribute:to:","isInteger","default:","explicitRequirement","superclass","innerHTML:","name","onMessage:","at:","onOpen:","notEmpty","connectToTag:","isEmpty","new:","skip:","messageText:","onError:","canUnderstand:","stop","setSelector:arguments:",",","basicNew","space","isBehavior","close","inheritsFrom:","adoptInstance:","value:","isLetter","selector","reconnect","isNaN","eval:","makeDNU:","isBlock","className","self","asString","default","currentInstance","to","subscribeToDeviceEvents","nextPut:","makeSetter:","flag:","registerDNU:","onClose:"]);JbUndefinedObject._initialize();Object._initialize();Function._initialize();(function(){	PjApplication._start();	return JbEvaluatorWebSocketDelegate._connectDefaultToUrl_("ws://127.0.0.1:2222/javascript-bridge")})(Object._registerDNUs_(["start","connectDefaultToUrl:"]))