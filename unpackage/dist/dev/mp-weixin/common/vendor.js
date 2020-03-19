(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 100:
/*!*******************************************************!*\
  !*** D:/project/uniapp-frame/pages/Login/validate.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "phone",
  checkType: "notnull",
  checkRule: "",
  errorMsg: "请输入手机号" },

{
  name: "password",
  checkType: "notnull",
  checkRule: "",
  errorMsg: "请输入密码" }];



module.exports = rule;

/***/ }),

/***/ 109:
/*!****************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/UserInfo/validate.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "phone",
  checkType: "phoneno",
  checkRule: "",
  errorMsg: "请输入正确的手机号码" },

{
  name: "registerSmsCode",
  checkType: "notnull",
  checkRule: "",
  errorMsg: "请输入验证码" },

{
  name: "password",
  checkType: "string",
  checkRule: "^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$",
  errorMsg: "请输入8到16位字母和数字组合的密码" },

{
  name: "confirmPassword",
  checkType: "string",
  checkRule: "^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$",
  errorMsg: "请输入8到16位字母和数字组合的密码" }];



module.exports = rule;

/***/ }),

/***/ 11:
/*!*************************************************************!*\
  !*** D:/project/uniapp-frame/common/vmeitime-http/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.banner = exports.viewFile = exports.uploadFile = exports.chooseImage = exports.getSetting = exports.getAuthorize = exports.downloadFileByPath = exports.auth = exports.queryMoreActivityUserPage = exports.saveActivityDtoInfo = exports.queryActivityDetailById = exports.querySearchIndexActivityDtoPage = exports.queryIndexActivityDtoPage = exports.queryInvestorsDtoById = exports.queryInvestorsPage = exports.addVipCount = exports.queryMyCommand = exports.collectionList = exports.colPersonList = exports.nameCardProList = exports.nameCardList = exports.savaProjectFwjl = exports.saveOrUpdateCard = exports.updateProjectOperate = exports.queryProjectDetailList = exports.dictList = exports.upDowZd = exports.querySearchProjectInforList = exports.queryNewProjectInforList = exports.queryHotProjectInforList = exports.queryIndexBannerDtoPage = exports.test2 = exports.test = void 0;





var _interface = _interopRequireDefault(__webpack_require__(/*! ./interface */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
var test = function test(url, data, options) {
  /* http.config.baseUrl = "http://localhost:8080/api/"
                                              //设置请求前拦截器
                                              http.interceptor.request = (config) => {
                                              	config.header = {
                                              		"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                              	}
                                              } */
  //设置请求结束后拦截器
  _interface.default.interceptor.response = function (response) {
    console.log('个性化response....');
    //判断返回状态 执行相应操作
    return response;
  };
  if (!options) {
    options = {};
  }
  return _interface.default.request({
    url: url || 'ajax/echo/text?name=uni-app',
    dataType: 'json',
    method: options.method || 'POST',
    data: data });

};

// 首页-轮播图
exports.test = test;var test2 = function test2(url, data, options) {
  /* http.config.baseUrl = "http://localhost:8080/api/"
                                                                    //设置请求前拦截器
                                                                    http.interceptor.request = (config) => {
                                                                    	config.header = {
                                                                    		"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                                                    	}
                                                                    } */
  //设置请求结束后拦截器
  _interface.default.interceptor.response = function (response) {
    console.log('个性化response....');
    //判断返回状态 执行相应操作
    return response;
  };
  if (!options) {
    options = {};
  }
  return _interface.default.request({
    url: url || 'ajax/echo/text?name=uni-app',
    dataType: 'json',
    method: options.method || 'POST',
    header: {
      'Content-Type': 'application/json;charset=UTF-8' },

    data: data });

};

// 首页-轮播图
exports.test2 = test2;var queryIndexBannerDtoPage = function queryIndexBannerDtoPage() {
  return _interface.default.post('/banner/queryIndexBannerDtoPage.do');
};
// 首页-热门项目
exports.queryIndexBannerDtoPage = queryIndexBannerDtoPage;var queryHotProjectInforList = function queryHotProjectInforList(data) {
  return _interface.default.post('/project-infor/queryHotProjectInforList.do', data);
};
// 首页-最新项目
exports.queryHotProjectInforList = queryHotProjectInforList;var queryNewProjectInforList = function queryNewProjectInforList(data) {
  return _interface.default.post('/project-infor/queryNewProjectInforList.do', data);
};
// 首页搜索/项目列表
exports.queryNewProjectInforList = queryNewProjectInforList;var querySearchProjectInforList = function querySearchProjectInforList(data) {
  return _interface.default.post('/project-infor/querySearchProjectInforList.do', data);
};

// 上下级字典通用字典接口
exports.querySearchProjectInforList = querySearchProjectInforList;var upDowZd = function upDowZd(data) {
  return _interface.default.post('/rest/upDowZd.do', data);
};
// 通用公共字典请求接口 
exports.upDowZd = upDowZd;var dictList = function dictList(data) {
  return _interface.default.post('/rest/dictList.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};
//项目详情接口
exports.dictList = dictList;var queryProjectDetailList = function queryProjectDetailList(data) {
  return _interface.default.post('/project-infor/queryProjectDetailList.do', data);
};
//分享、收藏、取消收藏操作
exports.queryProjectDetailList = queryProjectDetailList;var updateProjectOperate = function updateProjectOperate(data) {
  return _interface.default.post('/project-infor/updateProjectOperate.do', data);
};

//递名片和回赠名片操作
exports.updateProjectOperate = updateProjectOperate;var saveOrUpdateCard = function saveOrUpdateCard(data) {
  return _interface.default.post('/card/saveOrUpdateCard.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};

//点击详情保存查看记录
exports.saveOrUpdateCard = saveOrUpdateCard;var savaProjectFwjl = function savaProjectFwjl(data) {
  return _interface.default.post('/project-infor/savaProjectFwjl.do', _objectSpread({},
  data, {
    _noLoading: false }));

};

// 我的 - 名片夹投资人列表
exports.savaProjectFwjl = savaProjectFwjl;var nameCardList = function nameCardList(data) {
  return _interface.default.post('/investors/queryMyFolderInvestors.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};
// 我的 - 名片夹项目列表
exports.nameCardList = nameCardList;var nameCardProList = function nameCardProList(data) {
  return _interface.default.post('/investors/queryMyFolderProUserPage.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};

// 我的 - 收藏投资人列表
exports.nameCardProList = nameCardProList;var colPersonList = function colPersonList(data) {
  return _interface.default.post('/investors/queryMyCollectInvestors.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};

// 我的 - 收藏项目列表
exports.colPersonList = colPersonList;var collectionList = function collectionList(data) {
  return _interface.default.post('/project-infor/querymyColleProject.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};

// 我的 - 我的推荐
exports.collectionList = collectionList;var queryMyCommand = function queryMyCommand(data) {
  return _interface.default.post('/rest/user/queryMyRecommend.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};

// 我的 - 记录分享次数
exports.queryMyCommand = queryMyCommand;var addVipCount = function addVipCount(data) {
  return _interface.default.post('/rest/user/addVipTime.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};


//投资人列表
exports.addVipCount = addVipCount;var queryInvestorsPage = function queryInvestorsPage(data) {
  return _interface.default.post('/investors/queryInvestorsPage.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};
//投资人详情接口
exports.queryInvestorsPage = queryInvestorsPage;var queryInvestorsDtoById = function queryInvestorsDtoById(data) {
  return _interface.default.post('/investors/queryInvestorsDtoById.do', data, {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};

//微信端-首页活动专辑
exports.queryInvestorsDtoById = queryInvestorsDtoById;var queryIndexActivityDtoPage = function queryIndexActivityDtoPage(data) {
  return _interface.default.post('/activity/queryIndexActivityDtoPage.do', data);
};

//活动管理/首页搜索活动
exports.queryIndexActivityDtoPage = queryIndexActivityDtoPage;var querySearchIndexActivityDtoPage = function querySearchIndexActivityDtoPage(data) {
  return _interface.default.post('/activity/querySearchIndexActivityDtoPage.do', data);
};
// //活动详情
exports.querySearchIndexActivityDtoPage = querySearchIndexActivityDtoPage;var queryActivityDetailById = function queryActivityDetailById(data) {
  return _interface.default.post('/activity/queryActivityDetailById.do', data);
};
// 活动报名
exports.queryActivityDetailById = queryActivityDetailById;var saveActivityDtoInfo = function saveActivityDtoInfo(data) {
  return _interface.default.post('/activity/saveActivityDtoInfo.do', data);
};
//报名列表-更多
exports.saveActivityDtoInfo = saveActivityDtoInfo;var queryMoreActivityUserPage = function queryMoreActivityUserPage(data) {
  return _interface.default.post('/activity/queryMoreActivityUserPage.do', data);
};
//关键页面权限接口-吴勇
exports.queryMoreActivityUserPage = queryMoreActivityUserPage;var auth = function auth(data) {
  return _interface.default.post('/rest/auth.do', _objectSpread({},
  data, {
    _noLoading: true }),
  {
    header: {
      'Content-Type': 'application/json;charset=UTF-8' } });


};

//下载
exports.auth = auth;var downloadFileByPath = '/file/downloadFileByPath.do';


// 获取授权
exports.downloadFileByPath = downloadFileByPath;var getAuthorize = function getAuthorize(data) {
  return new Promise(function (resolve, reject) {});
};exports.getAuthorize = getAuthorize;


var getSetting = function getSetting() {
  uni.getSetting({
    success: function success(res) {
      var authStatus = res.authSetting['scope.album'];
      if (!authStatus) {
        uni.showModal({
          title: '授权失败',
          content: '需要从您的相册获取图片，请在设置界面打开相关权限',
          success: function success(res) {
            if (res.confirm) {
              uni.openSetting();
            }
          } });

      }
    } });

};

// 附件选择
exports.getSetting = getSetting;var chooseImage = function chooseImage(data) {
  return new Promise(function (resolve, reject) {
    uni.chooseImage({
      count: data.num || 1,
      sizeType: data.sizeType || ['compressed'],
      sourceType: data.sourceType || ['album'],
      success: function success(res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0]);
        var imageSrcArr = res.tempFilePaths;
        resolve(imageSrcArr);
      },
      fail: function fail(err) {
        console.log('chooseImage fail', err);
        reject();
      } });

  });
};

// 上传附件
exports.chooseImage = chooseImage;var uploadFile = function uploadFile(data, url) {
  return _interface.default.uploadFile({
    url: url,
    data: data });

};

// 附件查看地址
exports.uploadFile = uploadFile;var viewFile = function viewFile(data) {
  return _interface.default.viewFile(data);
};

// 轮播图
exports.viewFile = viewFile;var banner = function banner(data) {
  return _interface.default.request({
    url: '/banner/36kr',
    method: 'GET',
    data: data
    // handle:true
  });
};

// 默认全部导出  import api from '@/common/vmeitime-http/'
exports.banner = banner;var _default = {
  test: test,
  test2: test2,
  banner: banner,
  chooseImage: chooseImage,
  getSetting: getSetting,
  uploadFile: uploadFile,
  viewFile: viewFile };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!*****************************************************************!*\
  !*** D:/project/uniapp-frame/common/vmeitime-http/interface.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.baseUrl = void 0;



var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                       * 通用uni-app网络请求
                                                                                                                                                       * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
                                                                                                                                                       */var baseUrl = "";exports.baseUrl = baseUrl;if (true) {
  // baseUrl = 'http://localhost:8081/xfct-rest'
  exports.baseUrl = baseUrl = 'http://220.178.163.228:8800/xfct-rest';
  // baseUrl = 'https://xfct.iflysec.com/xfct-rest'
} else {}


// 防止接口重复调用
var pending = [];
var stringify = function stringify(data) {
  var str = '';
  for (var name in data) {
    str += "&" + name + '=' + data[name];
  }
  return str;
};
// 防止接口重复调用
var removePending = function removePending(config) {
  var url = "".concat(config.url, "?").concat(stringify(config.data));
  for (var p in pending) {
    if (pending[p].url === url) {
      pending[p].task.abort();
      pending.splice(p, 1);
    }
  }
};var _default =

{
  config: {
    baseUrl: baseUrl,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded' },

    data: {},
    method: "GET",
    dataType: "json", /* 如设为json，会对返回的数据做一次 JSON.parse */
    responseType: "text",
    success: function success() {},
    fail: function fail() {},
    complete: function complete() {} },

  interceptor: {
    request: null,
    response: null },

  request: function request(options) {var _this = this;

    if (!options) {
      options = {};
    }
    options.baseUrl = options.baseUrl || this.config.baseUrl;
    options.dataType = options.dataType || this.config.dataType;
    options.url = options.baseUrl + options.url;
    options.data = options.data || {};
    options.method = options.method || this.config.method;
    options.header = options.header || this.config.header;



    return new Promise(function (resolve, reject) {
      var _config = null;
      var _noLoading = !!options.data._noLoading;
      delete options.data._noLoading;

      options.complete = function (response) {
        var statusCode = response.statusCode;
        response.config = _config;
        if (true) {
          if (statusCode === 200) {
            console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data));
          }
        }
        if (_this.interceptor.response) {
          var newResponse = _this.interceptor.response(response);
          if (newResponse) {
            response = newResponse;
          }
        }
        // 统一的响应日志记录
        _reslog(response);
        for (var p in pending) {
          if (pending[p].url === "".concat(response.config.url, "?").concat(stringify(response.config.data))) {
            pending.splice(p, 1);
          }
        }
        console.log(pending);
        pending.length <= 0 && uni.hideLoading();

        if (statusCode === 200 && response.data.flag) {//成功
          if (response.header.loginAuthToken) {
            _store.default.commit('updateToken', response.header.loginAuthToken);
          }
          resolve(response);
        } else {
          if (response.data) {
            switch (response.data.code) {
              case 1010:
                // store.commit('logout')
                uni.showModal({
                  title: '提示',
                  content: response.data.message,
                  success: function success(res) {
                    if (res.confirm) {
                      _store.default.commit('logout');
                      uni.navigateTo({
                        url: '/pages/Login/Login' });

                    }
                  } });

                break;
              case 1020:
              case 1030:
              case 2010:
              case 2020:
              case 2030:
              case -1:
                uni.showModal({
                  title: '提示',
                  content: response.data.message,
                  showCancel: false });

                break;}

          }
          reject(response);
        }
      };

      _config = Object.assign({}, _this.config, options);
      _config.requestId = new Date().getTime();

      if (_store.default.state.userinfo && _store.default.state.userinfo.token) {
        _config.header.loginAuthToken = _store.default.state.userinfo.token || '';
      }
      if (_this.interceptor.request) {
        _this.interceptor.request(_config);
      }

      // 统一的请求日志记录
      _reqlog(_config);

      if (true) {
        console.log("【" + _config.requestId + "】 地址：" + _config.url);
        if (_config.data) {
          console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data));
        }
      }

      var task = uni.request(_config);

      removePending(_config);
      !_noLoading && pending.push({
        url: "".concat(_config.url, "?").concat(stringify(_config.data)),
        task: task });

      pending.length > 0 && uni.showLoading({ title: '加载中...', mask: false });
    });
  },
  get: function get(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'GET';
    return this.request(options);
  },
  post: function post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'POST';
    return this.request(options);
  },
  put: function put(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'PUT';
    return this.request(options);
  },
  delete: function _delete(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'DELETE';
    return this.request(options);
  },
  uploadFile: function uploadFile(options) {var _this2 = this;
    uni.showLoading({ title: '附件上传中...' });
    if (!options) {
      options = {};
    }
    return new Promise(function (resolve, reject) {
      uni.uploadFile({
        url: _this2.config.baseUrl + (options.url || '/file/web/uploadFile.do'), //仅为示例，非真实的接口地址
        filePath: options.data,
        name: 'file',
        success: function success(uploadFileRes) {
          uni.hideLoading();
          console.log(uploadFileRes);
          resolve(JSON.parse(uploadFileRes.data));
        },
        fail: function fail(err) {
          uni.hideLoading();
          reject(err);
        } });

    });
  },
  viewFile: function viewFile(data) {
    return this.config.baseUrl + '/file/downloadFileByPath.do?path=' + data;
  } };



/**
        * 请求接口日志记录
        */exports.default = _default;
function _reqlog(req) {
  if (true) {
    console.log("【" + req.requestId + "】 地址：" + req.url);
    if (req.data) {
      console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data));
    }
  }
  //TODO 调接口异步写入日志数据库
}

/**
   * 响应接口日志记录
   */
function _reslog(res) {
  var _statusCode = res.statusCode;
  if (true) {
    console.log("【" + res.config.requestId + "】 地址：" + res.config.url);
    if (res.config.data) {
      console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data));
    }
    console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res));
  }
  //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
  switch (_statusCode) {
    case 200:
      break;
    case 401:
      break;
    case 404:
      break;
    default:
      break;}

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!**********************************************!*\
  !*** D:/project/uniapp-frame/store/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 17));
var _logger = _interopRequireDefault(__webpack_require__(/*! vuex/dist/logger */ 18));
var _vmeitimeHttp = _interopRequireDefault(__webpack_require__(/*! @/common/vmeitime-http/ */ 11));
var _index = __webpack_require__(/*! @/common/vmeitime-http/index.js */ 11);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
_vue.default.use(_vuex.default);

var myPlugin = function myPlugin(store) {
  console.log('store初始化了');
  if (uni.getStorageSync('state')) {
    console.log(JSON.parse(uni.getStorageSync('state')));
    store.replaceState(_objectSpread({},
    store.state,
    JSON.parse(uni.getStorageSync('state')), {
      buttonClicked: false,
      buttonClickedTime: 0,
      buttonClickedTimeLastTime: 0 }));

  }
  store.subscribe(function (mutation, state) {
    // console.log( JSON.stringify(state) )  
    uni.setStorageSync('state', JSON.stringify(state));
  });
};

var plugins = [myPlugin];
if (true) {
  plugins.push((0, _logger.default)());
}

var clickTimer = null;

var store = new _vuex.default.Store({
  state: {
    loadNum: 0,
    userinfo: {},
    firstLoad: false,
    submitFlag: true,
    hidetextarea: false,
    userinfomore: {},
    activityDetail: {},
    searchHistory: [],
    buttonClicked: false,
    buttonClickedTime: 0,
    buttonClickedLastTime: 0 },

  mutations: {
    setLoadNum: function setLoadNum(state, num) {
      state.loadNum = num;
    },
    setSubmitFlag: function setSubmitFlag(state, submitFlag) {
      state.submitFlag = submitFlag;
    },
    setFirstLoad: function setFirstLoad(state, firstLoad) {
      state.firstLoad = firstLoad;
    },
    setHideTextarea: function setHideTextarea(state, hidetextarea) {
      state.hidetextarea = hidetextarea;
    },
    logout: function logout(state) {
      state.userinfo = {};
      state.userinfomore = {};
    },
    setUserinfo: function setUserinfo(state, userinfo) {
      state.userinfo = userinfo;
    },
    setUserinfoMore: function setUserinfoMore(state, userinfomore) {
      state.userinfomore = userinfomore;
    },
    updateToken: function updateToken(state, token) {
      state.userinfo.token = token;
    },
    setActivityDetail: function setActivityDetail(state, activityDetail) {
      state.activityDetail = activityDetail;
    },
    setSearchHistory: function setSearchHistory(_ref, searchKey) {var searchHistory = _ref.searchHistory;
      searchKey = searchKey.trim();
      if (searchKey !== '') {
        if (searchHistory.includes(searchKey)) {
          searchHistory.splice(searchHistory.indexOf(searchKey), 1);
        }
        if (searchHistory.length >= 6) {
          searchHistory.splice(5, 1);
        }

        searchHistory.unshift(searchKey);
      }
    },
    setButtonClickedSync: function setButtonClickedSync(state, onoff) {
      state.buttonClicked = onoff;
    },
    setButtonClickedTime: function setButtonClickedTime(state, time) {
      state.buttonClickedTime = time;
    },
    setButtonClickedLastTime: function setButtonClickedLastTime(state, time) {
      state.buttonClickedLastTime = time;
    } },

  actions: {
    getUserMoreInfo: function getUserMoreInfo(_ref2) {var commit = _ref2.commit;
      return _vmeitimeHttp.default.test2('/rest/user/querySimpleUserInfo.do').then(function (res) {
        commit('setUserinfoMore', res.data.data);
      });
    },
    // // 权限验证
    permissionValidation: function permissionValidation(_ref3, _ref4) {var commit = _ref3.commit,state = _ref3.state;var accessCode = _ref4.accessCode;
      return new Promise( /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                    (0, _index.auth)({
                      accessCode: accessCode }));case 2:res = _context.sent;

                  resolve(true);case 4:case "end":return _context.stop();}}}, _callee, this);}));return function (_x, _x2) {return _ref5.apply(this, arguments);};}());


    },
    setButtonClicked: function setButtonClicked(_ref6) {var commit = _ref6.commit,state = _ref6.state;var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;var
      buttonClicked = state.buttonClicked,buttonClickedLastTime = state.buttonClickedLastTime;
      commit('setButtonClickedTime', new Date().getTime());
      var buttonClickedTime = new Date().getTime();
      console.log(buttonClickedTime - buttonClickedLastTime);
      if (buttonClickedTime - buttonClickedLastTime > wait) {
        commit('setButtonClickedSync', false);
      } else {
        commit('setButtonClickedSync', true);
      }
      commit('setButtonClickedLastTime', new Date().getTime());
    } },

  plugins: plugins });var _default =


store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 15);


/***/ }),

/***/ 15:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 16);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 16:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 17:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 18:
/*!******************************************!*\
  !*** ./node_modules/vuex/dist/logger.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    store.subscribe(function (mutation, state) {
      if (typeof logger === 'undefined') {
        return
      }
      var nextState = deepCopy(state);

      if (filter(mutation, prevState, nextState)) {
        var time = new Date();
        var formattedTime = " @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3));
        var formattedMutation = mutationTransformer(mutation);
        var message = "mutation " + (mutation.type) + formattedTime;
        var startMessage = collapsed
          ? logger.groupCollapsed
          : logger.group;

        // render
        try {
          startMessage.call(logger, message);
        } catch (e) {
          console.log(message);
        }

        logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
        logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
        logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));

        try {
          logger.groupEnd();
        } catch (e) {
          logger.log('—— log end ——');
        }
      }

      prevState = nextState;
    });
  }
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

return createLogger;

})));


/***/ }),

/***/ 19:
/*!**********************************************!*\
  !*** D:/project/uniapp-frame/common/util.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time;
  }

  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;

  return [hour, minute, second].map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join(':');
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }

  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.') };

}
var dateUtils = {
  UNITS: {
    '年': 31557600000,
    '月': 2629800000,
    '天': 86400000,
    '小时': 3600000,
    '分钟': 60000,
    '秒': 1000 },

  humanize: function humanize(milliseconds) {
    var humanize = '';
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
        break;
      }
    }
    return humanize || '刚刚';
  },
  format: function format(dateStr) {
    var date = this.parse(dateStr);
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS['天']) {
      return this.humanize(diff);
    }
    var _format = function _format(number) {
      return number < 10 ? '0' + number : number;
    };
    return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
    _format(date.getHours()) + ':' + _format(date.getMinutes());
  },
  parse: function parse(str) {//将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  } };


function getDate(type) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (type === 'start') {
    year = year - 60;
  } else if (type === 'end') {
    year = year + 2;
  }
  month = month > 9 ? month : '0' + month;;
  day = day > 9 ? day : '0' + day;
  return "".concat(year, "-").concat(month, "-").concat(day);
}

function getYearsList() {
  var date = new Date();
  var year = date.getFullYear();
  var yearList = [];
  for (var i = year - 60; i <= year; i++) {
    yearList.push(i + '年');
  }
  return yearList;
}

function clearStringSpece(obj) {
  for (var key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/^\s*|\s*$/g, "");
    }
  }
  return obj;
}

function debounce(fun, wait) {
  wait = wait || 1500;
  var _lastTime = new Date().getTime();
  return function () {
    var _clickTime = new Date().getTime();
    if (_clickTime - _lastTime > wait) {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
      fun.apply(this, args);
    }
    _lastTime = _clickTime;
  };
}

module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  dateUtils: dateUtils,
  getDate: getDate,
  getYearsList: getYearsList,
  debounce: debounce,
  clearStringSpece: clearStringSpece };

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!********************************************!*\
  !*** D:/project/uniapp-frame/mock/mock.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _mockjs = _interopRequireDefault(__webpack_require__(/*! mockjs */ 21));
var _queryIndexBannerDtoPage = _interopRequireDefault(__webpack_require__(/*! ./queryIndexBannerDtoPage.js */ 22));
var _interface = __webpack_require__(/*! @/common/vmeitime-http/interface.js */ 12);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_mockjs.default.setup({
  timeout: '800-2000' // 延时响应300到1000毫秒之间的阈值
});
_mockjs.default.mock(_interface.baseUrl + '/banner/queryIndexBannerDtoPage.do', _queryIndexBannerDtoPage.default);

/***/ }),

/***/ 21:
/*!****************************************************************!*\
  !*** D:/project/uniapp-frame/node_modules/mockjs/dist/mock.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
(function webpackUniversalModuleDefinition(root, factory) {
  if (true)
  module.exports = factory();else
  {}
})(void 0, function () {
  return (/******/function (modules) {// webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};

      /******/ // The require function
      /******/function __webpack_require__(moduleId) {

        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId])
          /******/return installedModules[moduleId].exports;

        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/exports: {},
          /******/id: moduleId,
          /******/loaded: false
          /******/ };

        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        /******/ // Flag the module as loaded
        /******/module.loaded = true;

        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/}


      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;

      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;

      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";

      /******/ // Load entry module and return exports
      /******/return __webpack_require__(0);
      /******/}(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      /* global require, module, window */
      var Handler = __webpack_require__(1);
      var Util = __webpack_require__(3);
      var Random = __webpack_require__(5);
      var RE = __webpack_require__(20);
      var toJSONSchema = __webpack_require__(23);
      var valid = __webpack_require__(25);

      var XHR;
      if (typeof window !== 'undefined') XHR = __webpack_require__(27);

      /*!
                                                                            Mock - 模拟请求 & 模拟数据
                                                                            https://github.com/nuysoft/Mock
                                                                            墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
                                                                        */
      var Mock = {
        Handler: Handler,
        Random: Random,
        Util: Util,
        XHR: XHR,
        RE: RE,
        toJSONSchema: toJSONSchema,
        valid: valid,
        heredoc: Util.heredoc,
        setup: function setup(settings) {
          return XHR.setup(settings);
        },
        _mocked: {} };


      Mock.version = '1.0.1-beta3';

      // 避免循环依赖
      if (XHR) XHR.Mock = Mock;

      /*
                                    * Mock.mock( template )
                                    * Mock.mock( function() )
                                    * Mock.mock( rurl, template )
                                    * Mock.mock( rurl, function(options) )
                                    * Mock.mock( rurl, rtype, template )
                                    * Mock.mock( rurl, rtype, function(options) )
                                
                                    根据数据模板生成模拟数据。
                                */
      Mock.mock = function (rurl, rtype, template) {
        // Mock.mock(template)
        if (arguments.length === 1) {
          return Handler.gen(rurl);
        }
        // Mock.mock(rurl, template)
        if (arguments.length === 2) {
          template = rtype;
          rtype = undefined;
        }
        // 拦截 XHR
        if (XHR) window.XMLHttpRequest = XHR;
        Mock._mocked[rurl + (rtype || '')] = {
          rurl: rurl,
          rtype: rtype,
          template: template };

        return Mock;
      };

      module.exports = Mock;

      /***/},
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      /* 
                                                              ## Handler
                                                          
                                                              处理数据模板。
                                                              
                                                              * Handler.gen( template, name?, context? )
                                                          
                                                                  入口方法。
                                                          
                                                              * Data Template Definition, DTD
                                                                  
                                                                  处理数据模板定义。
                                                          
                                                                  * Handler.array( options )
                                                                  * Handler.object( options )
                                                                  * Handler.number( options )
                                                                  * Handler.boolean( options )
                                                                  * Handler.string( options )
                                                                  * Handler.function( options )
                                                                  * Handler.regexp( options )
                                                                  
                                                                  处理路径（相对和绝对）。
                                                          
                                                                  * Handler.getValueByKeyPath( key, options )
                                                          
                                                              * Data Placeholder Definition, DPD
                                                          
                                                                  处理数据占位符定义
                                                          
                                                                  * Handler.placeholder( placeholder, context, templateContext, options )
                                                          
                                                          */

      var Constant = __webpack_require__(2);
      var Util = __webpack_require__(3);
      var Parser = __webpack_require__(4);
      var Random = __webpack_require__(5);
      var RE = __webpack_require__(20);

      var Handler = {
        extend: Util.extend


        /*
                                template        属性值（即数据模板）
                                name            属性名
                                context         数据上下文，生成后的数据
                                templateContext 模板上下文，
                            
                                Handle.gen(template, name, options)
                                context
                                    currentContext, templateCurrentContext, 
                                    path, templatePath
                                    root, templateRoot
                            */ };
      Handler.gen = function (template, name, context) {
        /* jshint -W041 */
        name = name == undefined ? '' : name + '';

        context = context || {};
        context = {
          // 当前访问路径，只有属性名，不包括生成规则
          path: context.path || [Constant.GUID],
          templatePath: context.templatePath || [Constant.GUID++],
          // 最终属性值的上下文
          currentContext: context.currentContext,
          // 属性值模板的上下文
          templateCurrentContext: context.templateCurrentContext || template,
          // 最终值的根
          root: context.root || context.currentContext,
          // 模板的根
          templateRoot: context.templateRoot || context.templateCurrentContext || template

          // console.log('path:', context.path.join('.'), template)
        };
        var rule = Parser.parse(name);
        var type = Util.type(template);
        var data;

        if (Handler[type]) {
          data = Handler[type]({
            // 属性值类型
            type: type,
            // 属性值模板
            template: template,
            // 属性名 + 生成规则
            name: name,
            // 属性名
            parsedName: name ? name.replace(Constant.RE_KEY, '$1') : name,

            // 解析后的生成规则
            rule: rule,
            // 相关上下文
            context: context });


          if (!context.root) context.root = data;
          return data;
        }

        return template;
      };

      Handler.extend({
        array: function array(options) {
          var result = [],
          i,ii;

          // 'name|1': []
          // 'name|count': []
          // 'name|min-max': []
          if (options.template.length === 0) return result;

          // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]
          if (!options.rule.parameters) {
            for (i = 0; i < options.template.length; i++) {
              options.context.path.push(i);
              options.context.templatePath.push(i);
              result.push(
              Handler.gen(options.template[i], i, {
                path: options.context.path,
                templatePath: options.context.templatePath,
                currentContext: result,
                templateCurrentContext: options.template,
                root: options.context.root || result,
                templateRoot: options.context.templateRoot || options.template }));


              options.context.path.pop();
              options.context.templatePath.pop();
            }
          } else {
            // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
            if (options.rule.min === 1 && options.rule.max === undefined) {
              // fix #17
              options.context.path.push(options.name);
              options.context.templatePath.push(options.name);
              result = Random.pick(
              Handler.gen(options.template, undefined, {
                path: options.context.path,
                templatePath: options.context.templatePath,
                currentContext: result,
                templateCurrentContext: options.template,
                root: options.context.root || result,
                templateRoot: options.context.templateRoot || options.template }));


              options.context.path.pop();
              options.context.templatePath.pop();
            } else {
              // 'data|+1': [{}, {}]
              if (options.rule.parameters[2]) {
                options.template.__order_index = options.template.__order_index || 0;

                options.context.path.push(options.name);
                options.context.templatePath.push(options.name);
                result = Handler.gen(options.template, undefined, {
                  path: options.context.path,
                  templatePath: options.context.templatePath,
                  currentContext: result,
                  templateCurrentContext: options.template,
                  root: options.context.root || result,
                  templateRoot: options.context.templateRoot || options.template })[

                options.template.__order_index % options.template.length];


                options.template.__order_index += +options.rule.parameters[2];

                options.context.path.pop();
                options.context.templatePath.pop();

              } else {
                // 'data|1-10': [{}]
                for (i = 0; i < options.rule.count; i++) {
                  // 'data|1-10': [{}, {}]
                  for (ii = 0; ii < options.template.length; ii++) {
                    options.context.path.push(result.length);
                    options.context.templatePath.push(ii);
                    result.push(
                    Handler.gen(options.template[ii], result.length, {
                      path: options.context.path,
                      templatePath: options.context.templatePath,
                      currentContext: result,
                      templateCurrentContext: options.template,
                      root: options.context.root || result,
                      templateRoot: options.context.templateRoot || options.template }));


                    options.context.path.pop();
                    options.context.templatePath.pop();
                  }
                }
              }
            }
          }
          return result;
        },
        object: function object(options) {
          var result = {},
          keys,fnKeys,key,parsedKey,inc,i;

          // 'obj|min-max': {}
          /* jshint -W041 */
          if (options.rule.min != undefined) {
            keys = Util.keys(options.template);
            keys = Random.shuffle(keys);
            keys = keys.slice(0, options.rule.count);
            for (i = 0; i < keys.length; i++) {
              key = keys[i];
              parsedKey = key.replace(Constant.RE_KEY, '$1');
              options.context.path.push(parsedKey);
              options.context.templatePath.push(key);
              result[parsedKey] = Handler.gen(options.template[key], key, {
                path: options.context.path,
                templatePath: options.context.templatePath,
                currentContext: result,
                templateCurrentContext: options.template,
                root: options.context.root || result,
                templateRoot: options.context.templateRoot || options.template });

              options.context.path.pop();
              options.context.templatePath.pop();
            }

          } else {
            // 'obj': {}
            keys = [];
            fnKeys = []; // #25 改变了非函数属性的顺序，查找起来不方便
            for (key in options.template) {
              (typeof options.template[key] === 'function' ? fnKeys : keys).push(key);
            }
            keys = keys.concat(fnKeys);

            /*
                                            会改变非函数属性的顺序
                                            keys = Util.keys(options.template)
                                            keys.sort(function(a, b) {
                                                var afn = typeof options.template[a] === 'function'
                                                var bfn = typeof options.template[b] === 'function'
                                                if (afn === bfn) return 0
                                                if (afn && !bfn) return 1
                                                if (!afn && bfn) return -1
                                            })
                                        */

            for (i = 0; i < keys.length; i++) {
              key = keys[i];
              parsedKey = key.replace(Constant.RE_KEY, '$1');
              options.context.path.push(parsedKey);
              options.context.templatePath.push(key);
              result[parsedKey] = Handler.gen(options.template[key], key, {
                path: options.context.path,
                templatePath: options.context.templatePath,
                currentContext: result,
                templateCurrentContext: options.template,
                root: options.context.root || result,
                templateRoot: options.context.templateRoot || options.template });

              options.context.path.pop();
              options.context.templatePath.pop();
              // 'id|+1': 1
              inc = key.match(Constant.RE_KEY);
              if (inc && inc[2] && Util.type(options.template[key]) === 'number') {
                options.template[key] += parseInt(inc[2], 10);
              }
            }
          }
          return result;
        },
        number: function number(options) {
          var result, parts;
          if (options.rule.decimal) {// float
            options.template += '';
            parts = options.template.split('.');
            // 'float1|.1-10': 10,
            // 'float2|1-100.1-10': 1,
            // 'float3|999.1-10': 1,
            // 'float4|.3-10': 123.123,
            parts[0] = options.rule.range ? options.rule.count : parts[0];
            parts[1] = (parts[1] || '').slice(0, options.rule.dcount);
            while (parts[1].length < options.rule.dcount) {
              parts[1] +=
              // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
              parts[1].length < options.rule.dcount - 1 ? Random.character('number') : Random.character('123456789');

            }
            result = parseFloat(parts.join('.'), 10);
          } else {// integer
            // 'grade1|1-100': 1,
            result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
          }
          return result;
        },
        boolean: function boolean(options) {
          var result;
          // 'prop|multiple': false, 当前值是相反值的概率倍数
          // 'prop|probability-probability': false, 当前值与相反值的概率
          result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template;
          return result;
        },
        string: function string(options) {
          var result = '',
          i,placeholders,ph,phed;
          if (options.template.length) {

            //  'foo': '★',
            /* jshint -W041 */
            if (options.rule.count == undefined) {
              result += options.template;
            }

            // 'star|1-5': '★',
            for (i = 0; i < options.rule.count; i++) {
              result += options.template;
            }
            // 'email|1-10': '@EMAIL, ',
            placeholders = result.match(Constant.RE_PLACEHOLDER) || []; // A-Z_0-9 > \w_
            for (i = 0; i < placeholders.length; i++) {
              ph = placeholders[i];

              // 遇到转义斜杠，不需要解析占位符
              if (/^\\/.test(ph)) {
                placeholders.splice(i--, 1);
                continue;
              }

              phed = Handler.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext, options);

              // 只有一个占位符，并且没有其他字符
              if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) {// 
                result = phed;
                break;

                if (Util.isNumeric(phed)) {
                  result = parseFloat(phed, 10);
                  break;
                }
                if (/^(true|false)$/.test(phed)) {
                  result = phed === 'true' ? true :
                  phed === 'false' ? false :
                  phed; // 已经是布尔值
                  break;
                }
              }
              result = result.replace(ph, phed);
            }

          } else {
            // 'ASCII|1-10': '',
            // 'ASCII': '',
            result = options.rule.range ? Random.string(options.rule.count) : options.template;
          }
          return result;
        },
        'function': function _function(options) {
          // ( context, options )
          return options.template.call(options.context.currentContext, options);
        },
        'regexp': function regexp(options) {
          var source = '';

          // 'name': /regexp/,
          /* jshint -W041 */
          if (options.rule.count == undefined) {
            source += options.template.source; // regexp.source
          }

          // 'name|1-5': /regexp/,
          for (var i = 0; i < options.rule.count; i++) {
            source += options.template.source;
          }

          return RE.Handler.gen(
          RE.Parser.parse(
          source));


        } });


      Handler.extend({
        _all: function _all() {
          var re = {};
          for (var key in Random) {re[key.toLowerCase()] = key;}
          return re;
        },
        // 处理占位符，转换为最终值
        placeholder: function placeholder(_placeholder, obj, templateContext, options) {
          // console.log(options.context.path)
          // 1 key, 2 params
          Constant.RE_PLACEHOLDER.exec('');
          var parts = Constant.RE_PLACEHOLDER.exec(_placeholder),
          key = parts && parts[1],
          lkey = key && key.toLowerCase(),
          okey = this._all()[lkey],
          params = parts && parts[2] || '';
          var pathParts = this.splitPathToArray(key);

          // 解析占位符的参数
          try {
            // 1. 尝试保持参数的类型
            /*
                #24 [Window Firefox 30.0 引用 占位符 抛错](https://github.com/nuysoft/Mock/issues/24)
                [BX9056: 各浏览器下 window.eval 方法的执行上下文存在差异](http://www.w3help.org/zh-cn/causes/BX9056)
                应该属于 Window Firefox 30.0 的 BUG
            */
            /* jshint -W061 */
            params = eval('(function(){ return [].splice.call(arguments, 0 ) })(' + params + ')');
          } catch (error) {
            // 2. 如果失败，只能解析为字符串
            // console.error(error)
            // if (error instanceof ReferenceError) params = parts[2].split(/,\s*/);
            // else throw error
            params = parts[2].split(/,\s*/);
          }

          // 占位符优先引用数据模板中的属性
          if (obj && key in obj) return obj[key];

          // @index @key
          // if (Constant.RE_INDEX.test(key)) return +options.name
          // if (Constant.RE_KEY.test(key)) return options.name

          // 绝对路径 or 相对路径
          if (
          key.charAt(0) === '/' ||
          pathParts.length > 1)
          return this.getValueByKeyPath(key, options);

          // 递归引用数据模板中的属性
          if (templateContext &&
          typeof templateContext === 'object' &&
          key in templateContext &&
          _placeholder !== templateContext[key] // fix #15 避免自己依赖自己
          ) {
              // 先计算被引用的属性值
              templateContext[key] = Handler.gen(templateContext[key], key, {
                currentContext: obj,
                templateCurrentContext: templateContext });

              return templateContext[key];
            }

          // 如果未找到，则原样返回
          if (!(key in Random) && !(lkey in Random) && !(okey in Random)) return _placeholder;

          // 递归解析参数中的占位符
          for (var i = 0; i < params.length; i++) {
            Constant.RE_PLACEHOLDER.exec('');
            if (Constant.RE_PLACEHOLDER.test(params[i])) {
              params[i] = Handler.placeholder(params[i], obj, templateContext, options);
            }
          }

          var handle = Random[key] || Random[lkey] || Random[okey];
          switch (Util.type(handle)) {
            case 'array':
              // 自动从数组中取一个，例如 @areas
              return Random.pick(handle);
            case 'function':
              // 执行占位符方法（大多数情况）
              handle.options = options;
              var re = handle.apply(Random, params);
              if (re === undefined) re = ''; // 因为是在字符串中，所以默认为空字符串。
              delete handle.options;
              return re;}

        },
        getValueByKeyPath: function getValueByKeyPath(key, options) {
          var originalKey = key;
          var keyPathParts = this.splitPathToArray(key);
          var absolutePathParts = [];

          // 绝对路径
          if (key.charAt(0) === '/') {
            absolutePathParts = [options.context.path[0]].concat(
            this.normalizePath(keyPathParts));

          } else {
            // 相对路径
            if (keyPathParts.length > 1) {
              absolutePathParts = options.context.path.slice(0);
              absolutePathParts.pop();
              absolutePathParts = this.normalizePath(
              absolutePathParts.concat(keyPathParts));


            }
          }

          try {
            key = keyPathParts[keyPathParts.length - 1];
            var currentContext = options.context.root;
            var templateCurrentContext = options.context.templateRoot;
            for (var i = 1; i < absolutePathParts.length - 1; i++) {
              currentContext = currentContext[absolutePathParts[i]];
              templateCurrentContext = templateCurrentContext[absolutePathParts[i]];
            }
            // 引用的值已经计算好
            if (currentContext && key in currentContext) return currentContext[key];

            // 尚未计算，递归引用数据模板中的属性
            if (templateCurrentContext &&
            typeof templateCurrentContext === 'object' &&
            key in templateCurrentContext &&
            originalKey !== templateCurrentContext[key] // fix #15 避免自己依赖自己
            ) {
                // 先计算被引用的属性值
                templateCurrentContext[key] = Handler.gen(templateCurrentContext[key], key, {
                  currentContext: currentContext,
                  templateCurrentContext: templateCurrentContext });

                return templateCurrentContext[key];
              }
          } catch (err) {}

          return '@' + keyPathParts.join('/');
        },
        // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
        normalizePath: function normalizePath(pathParts) {
          var newPathParts = [];
          for (var i = 0; i < pathParts.length; i++) {
            switch (pathParts[i]) {
              case '..':
                newPathParts.pop();
                break;
              case '.':
                break;
              default:
                newPathParts.push(pathParts[i]);}

          }
          return newPathParts;
        },
        splitPathToArray: function splitPathToArray(path) {
          var parts = path.split(/\/+/);
          if (!parts[parts.length - 1]) parts = parts.slice(0, -1);
          if (!parts[0]) parts = parts.slice(1);
          return parts;
        } });


      module.exports = Handler;

      /***/},
    /* 2 */
    /***/function (module, exports) {

      /*
                                         ## Constant
                                     
                                         常量集合。
                                      */
      /*
                                             RE_KEY
                                                 'name|min-max': value
                                                 'name|count': value
                                                 'name|min-max.dmin-dmax': value
                                                 'name|min-max.dcount': value
                                                 'name|count.dmin-dmax': value
                                                 'name|count.dcount': value
                                                 'name|+step': value
                                         
                                                 1 name, 2 step, 3 range [ min, max ], 4 drange [ dmin, dmax ]
                                         
                                             RE_PLACEHOLDER
                                                 placeholder(*)
                                         
                                             [正则查看工具](http://www.regexper.com/)
                                         
                                             #26 生成规则 支持 负数，例如 number|-100-100
                                         */
      module.exports = {
        GUID: 1,
        RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
        RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
        RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
        // /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g
        // RE_INDEX: /^index$/,
        // RE_KEY: /^key$/


        /***/ };},
    /* 3 */
    /***/function (module, exports) {

      /*
                                         ## Utilities
                                     */
      var Util = {};

      Util.extend = function extend() {
        var target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        options,name,src,copy,clone;

        if (length === 1) {
          target = this;
          i = 0;
        }

        for (; i < length; i++) {
          options = arguments[i];
          if (!options) continue;

          for (name in options) {
            src = target[name];
            copy = options[name];

            if (target === copy) continue;
            if (copy === undefined) continue;

            if (Util.isArray(copy) || Util.isObject(copy)) {
              if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : [];
              if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {};

              target[name] = Util.extend(clone, copy);
            } else {
              target[name] = copy;
            }
          }
        }

        return target;
      };

      Util.each = function each(obj, iterator, context) {
        var i, key;
        if (this.type(obj) === 'number') {
          for (i = 0; i < obj; i++) {
            iterator(i, i);
          }
        } else if (obj.length === +obj.length) {
          for (i = 0; i < obj.length; i++) {
            if (iterator.call(context, obj[i], i, obj) === false) break;
          }
        } else {
          for (key in obj) {
            if (iterator.call(context, obj[key], key, obj) === false) break;
          }
        }
      };

      Util.type = function type(obj) {
        return obj === null || obj === undefined ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
      };

      Util.each('String Object Array RegExp Function'.split(' '), function (value) {
        Util['is' + value] = function (obj) {
          return Util.type(obj) === value.toLowerCase();
        };
      });

      Util.isObjectOrArray = function (value) {
        return Util.isObject(value) || Util.isArray(value);
      };

      Util.isNumeric = function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      };

      Util.keys = function (obj) {
        var keys = [];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) keys.push(key);
        }
        return keys;
      };
      Util.values = function (obj) {
        var values = [];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) values.push(obj[key]);
        }
        return values;
      };

      /*
             ### Mock.heredoc(fn)
         
             * Mock.heredoc(fn)
         
             以直观、安全的方式书写（多行）HTML 模板。
         
             **使用示例**如下所示：
         
                 var tpl = Mock.heredoc(function() {
                     /*!
                 {{email}}{{age}}
                 <!-- Mock { 
                     email: '@EMAIL',
                     age: '@INT(1,100)'
                 } -->
                     *\/
                 })
             
             **相关阅读**
             * [Creating multiline strings in JavaScript](http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript)、
         */
      Util.heredoc = function heredoc(fn) {
        // 1. 移除起始的 function(){ /*!
        // 2. 移除末尾的 */ }
        // 3. 移除起始和末尾的空格
        return fn.toString().
        replace(/^[^\/]+\/\*!?/, '').
        replace(/\*\/[^\/]+$/, '').
        replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, ''); // .trim()
      };

      Util.noop = function () {};

      module.exports = Util;

      /***/},
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                          	## Parser
                                                          
                                                          	解析数据模板（属性名部分）。
                                                          
                                                          	* Parser.parse( name )
                                                          		
                                                          		```json
                                                          		{
                                                          			parameters: [ name, inc, range, decimal ],
                                                          			rnage: [ min , max ],
                                                          
                                                          			min: min,
                                                          			max: max,
                                                          			count : count,
                                                          
                                                          			decimal: decimal,
                                                          			dmin: dmin,
                                                          			dmax: dmax,
                                                          			dcount: dcount
                                                          		}
                                                          		```
                                                           */

      var Constant = __webpack_require__(2);
      var Random = __webpack_require__(5);

      /* jshint -W041 */
      module.exports = {
        parse: function parse(name) {
          name = name == undefined ? '' : name + '';

          var parameters = (name || '').match(Constant.RE_KEY);

          var range = parameters && parameters[3] && parameters[3].match(Constant.RE_RANGE);
          var min = range && range[1] && parseInt(range[1], 10); // || 1
          var max = range && range[2] && parseInt(range[2], 10); // || 1
          // repeat || min-max || 1
          // var count = range ? !range[2] && parseInt(range[1], 10) || Random.integer(min, max) : 1
          var count = range ? !range[2] ? parseInt(range[1], 10) : Random.integer(min, max) : undefined;

          var decimal = parameters && parameters[4] && parameters[4].match(Constant.RE_RANGE);
          var dmin = decimal && decimal[1] && parseInt(decimal[1], 10); // || 0,
          var dmax = decimal && decimal[2] && parseInt(decimal[2], 10); // || 0,
          // int || dmin-dmax || 0
          var dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random.integer(dmin, dmax) : undefined;

          var result = {
            // 1 name, 2 inc, 3 range, 4 decimal
            parameters: parameters,
            // 1 min, 2 max
            range: range,
            min: min,
            max: max,
            // min-max
            count: count,
            // 是否有 decimal
            decimal: decimal,
            dmin: dmin,
            dmax: dmax,
            // dmin-dimax
            dcount: dcount };


          for (var r in result) {
            if (result[r] != undefined) return result;
          }

          return {};
        }


        /***/ };},
    /* 5 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                              ## Mock.Random
                                                              
                                                              工具类，用于生成各种随机数据。
                                                          */

      var Util = __webpack_require__(3);

      var Random = {
        extend: Util.extend };


      Random.extend(__webpack_require__(6));
      Random.extend(__webpack_require__(7));
      Random.extend(__webpack_require__(8));
      Random.extend(__webpack_require__(10));
      Random.extend(__webpack_require__(13));
      Random.extend(__webpack_require__(15));
      Random.extend(__webpack_require__(16));
      Random.extend(__webpack_require__(17));
      Random.extend(__webpack_require__(14));
      Random.extend(__webpack_require__(19));

      module.exports = Random;

      /***/},
    /* 6 */
    /***/function (module, exports) {

      /*
                                         ## Basics
                                     */
      module.exports = {
        // 返回一个随机的布尔值。
        boolean: function boolean(min, max, cur) {
          if (cur !== undefined) {
            min = typeof min !== 'undefined' && !isNaN(min) ? parseInt(min, 10) : 1;
            max = typeof max !== 'undefined' && !isNaN(max) ? parseInt(max, 10) : 1;
            return Math.random() > 1.0 / (min + max) * min ? !cur : cur;
          }

          return Math.random() >= 0.5;
        },
        bool: function bool(min, max, cur) {
          return this.boolean(min, max, cur);
        },
        // 返回一个随机的自然数（大于等于 0 的整数）。
        natural: function natural(min, max) {
          min = typeof min !== 'undefined' ? parseInt(min, 10) : 0;
          max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992; // 2^53
          return Math.round(Math.random() * (max - min)) + min;
        },
        // 返回一个随机的整数。
        integer: function integer(min, max) {
          min = typeof min !== 'undefined' ? parseInt(min, 10) : -9007199254740992;
          max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992; // 2^53
          return Math.round(Math.random() * (max - min)) + min;
        },
        int: function int(min, max) {
          return this.integer(min, max);
        },
        // 返回一个随机的浮点数。
        float: function float(min, max, dmin, dmax) {
          dmin = dmin === undefined ? 0 : dmin;
          dmin = Math.max(Math.min(dmin, 17), 0);
          dmax = dmax === undefined ? 17 : dmax;
          dmax = Math.max(Math.min(dmax, 17), 0);
          var ret = this.integer(min, max) + '.';
          for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
            ret +=
            // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
            i < dcount - 1 ? this.character('number') : this.character('123456789');

          }
          return parseFloat(ret, 10);
        },
        // 返回一个随机字符。
        character: function character(pool) {
          var pools = {
            lower: 'abcdefghijklmnopqrstuvwxyz',
            upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            number: '0123456789',
            symbol: '!@#$%^&*()[]' };

          pools.alpha = pools.lower + pools.upper;
          pools['undefined'] = pools.lower + pools.upper + pools.number + pools.symbol;

          pool = pools[('' + pool).toLowerCase()] || pool;
          return pool.charAt(this.natural(0, pool.length - 1));
        },
        char: function char(pool) {
          return this.character(pool);
        },
        // 返回一个随机字符串。
        string: function string(pool, min, max) {
          var len;
          switch (arguments.length) {
            case 0: // ()
              len = this.natural(3, 7);
              break;
            case 1: // ( length )
              len = pool;
              pool = undefined;
              break;
            case 2:
              // ( pool, length )
              if (typeof arguments[0] === 'string') {
                len = min;
              } else {
                // ( min, max )
                len = this.natural(pool, min);
                pool = undefined;
              }
              break;
            case 3:
              len = this.natural(min, max);
              break;}


          var text = '';
          for (var i = 0; i < len; i++) {
            text += this.character(pool);
          }

          return text;
        },
        str: function str() /*pool, min, max*/{
          return this.string.apply(this, arguments);
        },
        // 返回一个整型数组。
        range: function range(start, stop, step) {
          // range( stop )
          if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
          }
          // range( start, stop )
          step = arguments[2] || 1;

          start = +start;
          stop = +stop;
          step = +step;

          var len = Math.max(Math.ceil((stop - start) / step), 0);
          var idx = 0;
          var range = new Array(len);

          while (idx < len) {
            range[idx++] = start;
            start += step;
          }

          return range;
        }


        /***/ };},
    /* 7 */
    /***/function (module, exports) {

      /*
                                         ## Date
                                     */
      var patternLetters = {
        yyyy: 'getFullYear',
        yy: function yy(date) {
          return ('' + date.getFullYear()).slice(2);
        },
        y: 'yy',

        MM: function MM(date) {
          var m = date.getMonth() + 1;
          return m < 10 ? '0' + m : m;
        },
        M: function M(date) {
          return date.getMonth() + 1;
        },

        dd: function dd(date) {
          var d = date.getDate();
          return d < 10 ? '0' + d : d;
        },
        d: 'getDate',

        HH: function HH(date) {
          var h = date.getHours();
          return h < 10 ? '0' + h : h;
        },
        H: 'getHours',
        hh: function hh(date) {
          var h = date.getHours() % 12;
          return h < 10 ? '0' + h : h;
        },
        h: function h(date) {
          return date.getHours() % 12;
        },

        mm: function mm(date) {
          var m = date.getMinutes();
          return m < 10 ? '0' + m : m;
        },
        m: 'getMinutes',

        ss: function ss(date) {
          var s = date.getSeconds();
          return s < 10 ? '0' + s : s;
        },
        s: 'getSeconds',

        SS: function SS(date) {
          var ms = date.getMilliseconds();
          return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms;
        },
        S: 'getMilliseconds',

        A: function A(date) {
          return date.getHours() < 12 ? 'AM' : 'PM';
        },
        a: function a(date) {
          return date.getHours() < 12 ? 'am' : 'pm';
        },
        T: 'getTime' };

      module.exports = {
        // 日期占位符集合。
        _patternLetters: patternLetters,
        // 日期占位符正则。
        _rformat: new RegExp(function () {
          var re = [];
          for (var i in patternLetters) {re.push(i);}
          return '(' + re.join('|') + ')';
        }(), 'g'),
        // 格式化日期。
        _formatDate: function _formatDate(date, format) {
          return format.replace(this._rformat, function creatNewSubString($0, flag) {
            return typeof patternLetters[flag] === 'function' ? patternLetters[flag](date) :
            patternLetters[flag] in patternLetters ? creatNewSubString($0, patternLetters[flag]) :
            date[patternLetters[flag]]();
          });
        },
        // 生成一个随机的 Date 对象。
        _randomDate: function _randomDate(min, max) {// min, max
          min = min === undefined ? new Date(0) : min;
          max = max === undefined ? new Date() : max;
          return new Date(Math.random() * (max.getTime() - min.getTime()));
        },
        // 返回一个随机的日期字符串。
        date: function date(format) {
          format = format || 'yyyy-MM-dd';
          return this._formatDate(this._randomDate(), format);
        },
        // 返回一个随机的时间字符串。
        time: function time(format) {
          format = format || 'HH:mm:ss';
          return this._formatDate(this._randomDate(), format);
        },
        // 返回一个随机的日期和时间字符串。
        datetime: function datetime(format) {
          format = format || 'yyyy-MM-dd HH:mm:ss';
          return this._formatDate(this._randomDate(), format);
        },
        // 返回当前的日期和时间字符串。
        now: function now(unit, format) {
          // now(unit) now(format)
          if (arguments.length === 1) {
            // now(format)
            if (!/year|month|day|hour|minute|second|week/.test(unit)) {
              format = unit;
              unit = '';
            }
          }
          unit = (unit || '').toLowerCase();
          format = format || 'yyyy-MM-dd HH:mm:ss';

          var date = new Date();

          /* jshint -W086 */
          // 参考自 http://momentjs.cn/docs/#/manipulating/start-of/
          switch (unit) {
            case 'year':
              date.setMonth(0);
            case 'month':
              date.setDate(1);
            case 'week':
            case 'day':
              date.setHours(0);
            case 'hour':
              date.setMinutes(0);
            case 'minute':
              date.setSeconds(0);
            case 'second':
              date.setMilliseconds(0);}

          switch (unit) {
            case 'week':
              date.setDate(date.getDate() - date.getDay());}


          return this._formatDate(date, format);
        }


        /***/ };},
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      /* WEBPACK VAR INJECTION */(function (module) {/* global document  */
        /*
                                                                                ## Image
                                                                            */
        module.exports = {
          // 常见的广告宽高
          _adSize: [
          '300x250', '250x250', '240x400', '336x280', '180x150',
          '720x300', '468x60', '234x60', '88x31', '120x90',
          '120x60', '120x240', '125x125', '728x90', '160x600',
          '120x600', '300x600'],

          // 常见的屏幕宽高
          _screenSize: [
          '320x200', '320x240', '640x480', '800x480', '800x480',
          '1024x600', '1024x768', '1280x800', '1440x900', '1920x1200',
          '2560x1600'],

          // 常见的视频宽高
          _videoSize: ['720x480', '768x576', '1280x720', '1920x1080'],
          /*
                                                                           生成一个随机的图片地址。
                                                                             替代图片源
                                                                               http://fpoimg.com/
                                                                           参考自 
                                                                               http://rensanning.iteye.com/blog/1933310
                                                                               http://code.tutsplus.com/articles/the-top-8-placeholders-for-web-designers--net-19485
                                                                       */

          image: function image(size, background, foreground, format, text) {
            // Random.image( size, background, foreground, text )
            if (arguments.length === 4) {
              text = format;
              format = undefined;
            }
            // Random.image( size, background, text )
            if (arguments.length === 3) {
              text = foreground;
              foreground = undefined;
            }
            // Random.image()
            if (!size) size = this.pick(this._adSize);

            if (background && ~background.indexOf('#')) background = background.slice(1);
            if (foreground && ~foreground.indexOf('#')) foreground = foreground.slice(1);

            // http://dummyimage.com/600x400/cc00cc/470047.png&text=hello
            return 'http://dummyimage.com/' + size + (
            background ? '/' + background : '') + (
            foreground ? '/' + foreground : '') + (
            format ? '.' + format : '') + (
            text ? '&text=' + text : '');
          },
          img: function img() {
            return this.image.apply(this, arguments);
          },

          /*
                 BrandColors
                 http://brandcolors.net/
                 A collection of major brand color codes curated by Galen Gidman.
                 大牌公司的颜色集合
                   // 获取品牌和颜色
                 $('h2').each(function(index, item){
                     item = $(item)
                     console.log('\'' + item.text() + '\'', ':', '\'' + item.next().text() + '\'', ',')
                 })
             */

          _brandColors: {
            '4ormat': '#fb0a2a',
            '500px': '#02adea',
            'About.me (blue)': '#00405d',
            'About.me (yellow)': '#ffcc33',
            'Addvocate': '#ff6138',
            'Adobe': '#ff0000',
            'Aim': '#fcd20b',
            'Amazon': '#e47911',
            'Android': '#a4c639',
            'Angie\'s List': '#7fbb00',
            'AOL': '#0060a3',
            'Atlassian': '#003366',
            'Behance': '#053eff',
            'Big Cartel': '#97b538',
            'bitly': '#ee6123',
            'Blogger': '#fc4f08',
            'Boeing': '#0039a6',
            'Booking.com': '#003580',
            'Carbonmade': '#613854',
            'Cheddar': '#ff7243',
            'Code School': '#3d4944',
            'Delicious': '#205cc0',
            'Dell': '#3287c1',
            'Designmoo': '#e54a4f',
            'Deviantart': '#4e6252',
            'Designer News': '#2d72da',
            'Devour': '#fd0001',
            'DEWALT': '#febd17',
            'Disqus (blue)': '#59a3fc',
            'Disqus (orange)': '#db7132',
            'Dribbble': '#ea4c89',
            'Dropbox': '#3d9ae8',
            'Drupal': '#0c76ab',
            'Dunked': '#2a323a',
            'eBay': '#89c507',
            'Ember': '#f05e1b',
            'Engadget': '#00bdf6',
            'Envato': '#528036',
            'Etsy': '#eb6d20',
            'Evernote': '#5ba525',
            'Fab.com': '#dd0017',
            'Facebook': '#3b5998',
            'Firefox': '#e66000',
            'Flickr (blue)': '#0063dc',
            'Flickr (pink)': '#ff0084',
            'Forrst': '#5b9a68',
            'Foursquare': '#25a0ca',
            'Garmin': '#007cc3',
            'GetGlue': '#2d75a2',
            'Gimmebar': '#f70078',
            'GitHub': '#171515',
            'Google Blue': '#0140ca',
            'Google Green': '#16a61e',
            'Google Red': '#dd1812',
            'Google Yellow': '#fcca03',
            'Google+': '#dd4b39',
            'Grooveshark': '#f77f00',
            'Groupon': '#82b548',
            'Hacker News': '#ff6600',
            'HelloWallet': '#0085ca',
            'Heroku (light)': '#c7c5e6',
            'Heroku (dark)': '#6567a5',
            'HootSuite': '#003366',
            'Houzz': '#73ba37',
            'HTML5': '#ec6231',
            'IKEA': '#ffcc33',
            'IMDb': '#f3ce13',
            'Instagram': '#3f729b',
            'Intel': '#0071c5',
            'Intuit': '#365ebf',
            'Kickstarter': '#76cc1e',
            'kippt': '#e03500',
            'Kodery': '#00af81',
            'LastFM': '#c3000d',
            'LinkedIn': '#0e76a8',
            'Livestream': '#cf0005',
            'Lumo': '#576396',
            'Mixpanel': '#a086d3',
            'Meetup': '#e51937',
            'Nokia': '#183693',
            'NVIDIA': '#76b900',
            'Opera': '#cc0f16',
            'Path': '#e41f11',
            'PayPal (dark)': '#1e477a',
            'PayPal (light)': '#3b7bbf',
            'Pinboard': '#0000e6',
            'Pinterest': '#c8232c',
            'PlayStation': '#665cbe',
            'Pocket': '#ee4056',
            'Prezi': '#318bff',
            'Pusha': '#0f71b4',
            'Quora': '#a82400',
            'QUOTE.fm': '#66ceff',
            'Rdio': '#008fd5',
            'Readability': '#9c0000',
            'Red Hat': '#cc0000',
            'Resource': '#7eb400',
            'Rockpack': '#0ba6ab',
            'Roon': '#62b0d9',
            'RSS': '#ee802f',
            'Salesforce': '#1798c1',
            'Samsung': '#0c4da2',
            'Shopify': '#96bf48',
            'Skype': '#00aff0',
            'Snagajob': '#f47a20',
            'Softonic': '#008ace',
            'SoundCloud': '#ff7700',
            'Space Box': '#f86960',
            'Spotify': '#81b71a',
            'Sprint': '#fee100',
            'Squarespace': '#121212',
            'StackOverflow': '#ef8236',
            'Staples': '#cc0000',
            'Status Chart': '#d7584f',
            'Stripe': '#008cdd',
            'StudyBlue': '#00afe1',
            'StumbleUpon': '#f74425',
            'T-Mobile': '#ea0a8e',
            'Technorati': '#40a800',
            'The Next Web': '#ef4423',
            'Treehouse': '#5cb868',
            'Trulia': '#5eab1f',
            'Tumblr': '#34526f',
            'Twitch.tv': '#6441a5',
            'Twitter': '#00acee',
            'TYPO3': '#ff8700',
            'Ubuntu': '#dd4814',
            'Ustream': '#3388ff',
            'Verizon': '#ef1d1d',
            'Vimeo': '#86c9ef',
            'Vine': '#00a478',
            'Virb': '#06afd8',
            'Virgin Media': '#cc0000',
            'Wooga': '#5b009c',
            'WordPress (blue)': '#21759b',
            'WordPress (orange)': '#d54e21',
            'WordPress (grey)': '#464646',
            'Wunderlist': '#2b88d9',
            'XBOX': '#9bc848',
            'XING': '#126567',
            'Yahoo!': '#720e9e',
            'Yandex': '#ffcc00',
            'Yelp': '#c41200',
            'YouTube': '#c4302b',
            'Zalongo': '#5498dc',
            'Zendesk': '#78a300',
            'Zerply': '#9dcc7a',
            'Zootool': '#5e8b1d' },

          _brandNames: function _brandNames() {
            var brands = [];
            for (var b in this._brandColors) {
              brands.push(b);
            }
            return brands;
          },
          /*
                 生成一段随机的 Base64 图片编码。
                   https://github.com/imsky/holder
                 Holder renders image placeholders entirely on the client side.
                   dataImageHolder: function(size) {
                     return 'holder.js/' + size
                 },
             */


          dataImage: function dataImage(size, text) {
            var canvas;
            if (typeof document !== 'undefined') {
              canvas = document.createElement('canvas');
            } else {
              /*
                        https://github.com/Automattic/node-canvas
                            npm install canvas --save
                        安装问题：
                        * http://stackoverflow.com/questions/22953206/gulp-issues-with-cario-install-command-not-found-when-trying-to-installing-canva
                        * https://github.com/Automattic/node-canvas/issues/415
                        * https://github.com/Automattic/node-canvas/wiki/_pages
                          PS：node-canvas 的安装过程实在是太繁琐了，所以不放入 package.json 的 dependencies。
                     */

              var Canvas = module.require('canvas');
              canvas = new Canvas();
            }

            var ctx = canvas && canvas.getContext && canvas.getContext("2d");
            if (!canvas || !ctx) return '';

            if (!size) size = this.pick(this._adSize);
            text = text !== undefined ? text : size;

            size = size.split('x');

            var width = parseInt(size[0], 10),
            height = parseInt(size[1], 10),
            background = this._brandColors[this.pick(this._brandNames())],
            foreground = '#FFF',
            text_height = 14,
            font = 'sans-serif';

            canvas.width = width;
            canvas.height = height;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = background;
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = foreground;
            ctx.font = 'bold ' + text_height + 'px ' + font;
            ctx.fillText(text, width / 2, height / 2, width);
            return canvas.toDataURL('image/png');
          }

          /* WEBPACK VAR INJECTION */ };}).call(exports, __webpack_require__(9)(module));

      /***/},
    /* 9 */
    /***/function (module, exports) {

      module.exports = function (module) {
        if (!module.webpackPolyfill) {
          module.deprecate = function () {};
          module.paths = [];
          // module.parent = undefined by default
          module.children = [];
          module.webpackPolyfill = 1;
        }
        return module;
      };


      /***/},
    /* 10 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                              ## Color
                                                          
                                                              http://llllll.li/randomColor/
                                                                  A color generator for JavaScript.
                                                                  randomColor generates attractive colors by default. More specifically, randomColor produces bright colors with a reasonably high saturation. This makes randomColor particularly useful for data visualizations and generative art.
                                                          
                                                              http://randomcolour.com/
                                                                  var bg_colour = Math.floor(Math.random() * 16777215).toString(16);
                                                                  bg_colour = "#" + ("000000" + bg_colour).slice(-6);
                                                                  document.bgColor = bg_colour;
                                                              
                                                              http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
                                                                  Creating random colors is actually more difficult than it seems. The randomness itself is easy, but aesthetically pleasing randomness is more difficult.
                                                                  https://github.com/devongovett/color-generator
                                                          
                                                              http://www.paulirish.com/2009/random-hex-color-code-snippets/
                                                                  Random Hex Color Code Generator in JavaScript
                                                          
                                                              http://chancejs.com/#color
                                                                  chance.color()
                                                                  // => '#79c157'
                                                                  chance.color({format: 'hex'})
                                                                  // => '#d67118'
                                                                  chance.color({format: 'shorthex'})
                                                                  // => '#60f'
                                                                  chance.color({format: 'rgb'})
                                                                  // => 'rgb(110,52,164)'
                                                          
                                                              http://tool.c7sky.com/webcolor
                                                                  网页设计常用色彩搭配表
                                                              
                                                              https://github.com/One-com/one-color
                                                                  An OO-based JavaScript color parser/computation toolkit with support for RGB, HSV, HSL, CMYK, and alpha channels.
                                                                  API 很赞
                                                          
                                                              https://github.com/harthur/color
                                                                  JavaScript color conversion and manipulation library
                                                          
                                                              https://github.com/leaverou/css-colors
                                                                  Share & convert CSS colors
                                                              http://leaverou.github.io/css-colors/#slategray
                                                                  Type a CSS color keyword, #hex, hsl(), rgba(), whatever:
                                                          
                                                              色调 hue
                                                                  http://baike.baidu.com/view/23368.htm
                                                                  色调指的是一幅画中画面色彩的总体倾向，是大的色彩效果。
                                                              饱和度 saturation
                                                                  http://baike.baidu.com/view/189644.htm
                                                                  饱和度是指色彩的鲜艳程度，也称色彩的纯度。饱和度取决于该色中含色成分和消色成分（灰色）的比例。含色成分越大，饱和度越大；消色成分越大，饱和度越小。
                                                              亮度 brightness
                                                                  http://baike.baidu.com/view/34773.htm
                                                                  亮度是指发光体（反光体）表面发光（反光）强弱的物理量。
                                                              照度 luminosity
                                                                  物体被照亮的程度,采用单位面积所接受的光通量来表示,表示单位为勒[克斯](Lux,lx) ,即 1m / m2 。
                                                          
                                                              http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
                                                                  var letters = '0123456789ABCDEF'.split('')
                                                                  var color = '#'
                                                                  for (var i = 0; i < 6; i++) {
                                                                      color += letters[Math.floor(Math.random() * 16)]
                                                                  }
                                                                  return color
                                                              
                                                                  // 随机生成一个无脑的颜色，格式为 '#RRGGBB'。
                                                                  // _brainlessColor()
                                                                  var color = Math.floor(
                                                                      Math.random() *
                                                                      (16 * 16 * 16 * 16 * 16 * 16 - 1)
                                                                  ).toString(16)
                                                                  color = "#" + ("000000" + color).slice(-6)
                                                                  return color.toUpperCase()
                                                          */

      var Convert = __webpack_require__(11);
      var DICT = __webpack_require__(12);

      module.exports = {
        // 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
        color: function color(name) {
          if (name || DICT[name]) return DICT[name].nicer;
          return this.hex();
        },
        // #DAC0DE
        hex: function hex() {
          var hsv = this._goldenRatioColor();
          var rgb = Convert.hsv2rgb(hsv);
          var hex = Convert.rgb2hex(rgb[0], rgb[1], rgb[2]);
          return hex;
        },
        // rgb(128,255,255)
        rgb: function rgb() {
          var hsv = this._goldenRatioColor();
          var rgb = Convert.hsv2rgb(hsv);
          return 'rgb(' +
          parseInt(rgb[0], 10) + ', ' +
          parseInt(rgb[1], 10) + ', ' +
          parseInt(rgb[2], 10) + ')';
        },
        // rgba(128,255,255,0.3)
        rgba: function rgba() {
          var hsv = this._goldenRatioColor();
          var rgb = Convert.hsv2rgb(hsv);
          return 'rgba(' +
          parseInt(rgb[0], 10) + ', ' +
          parseInt(rgb[1], 10) + ', ' +
          parseInt(rgb[2], 10) + ', ' +
          Math.random().toFixed(2) + ')';
        },
        // hsl(300,80%,90%)
        hsl: function hsl() {
          var hsv = this._goldenRatioColor();
          var hsl = Convert.hsv2hsl(hsv);
          return 'hsl(' +
          parseInt(hsl[0], 10) + ', ' +
          parseInt(hsl[1], 10) + ', ' +
          parseInt(hsl[2], 10) + ')';
        },
        // http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
        // https://github.com/devongovett/color-generator/blob/master/index.js
        // 随机生成一个有吸引力的颜色。
        _goldenRatioColor: function _goldenRatioColor(saturation, value) {
          this._goldenRatio = 0.618033988749895;
          this._hue = this._hue || Math.random();
          this._hue += this._goldenRatio;
          this._hue %= 1;

          if (typeof saturation !== "number") saturation = 0.5;
          if (typeof value !== "number") value = 0.95;

          return [
          this._hue * 360,
          saturation * 100,
          value * 100];

        }


        /***/ };},
    /* 11 */
    /***/function (module, exports) {

      /*
                                         ## Color Convert
                                     
                                         http://blog.csdn.net/idfaya/article/details/6770414
                                             颜色空间RGB与HSV(HSL)的转换
                                     */
      // https://github.com/harthur/color-convert/blob/master/conversions.js
      module.exports = {
        rgb2hsl: function rgb2hsl(rgb) {
          var r = rgb[0] / 255,
          g = rgb[1] / 255,
          b = rgb[2] / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h,s,l;

          if (max == min)
          h = 0;else
          if (r == max)
          h = (g - b) / delta;else
          if (g == max)
          h = 2 + (b - r) / delta;else
          if (b == max)
          h = 4 + (r - g) / delta;

          h = Math.min(h * 60, 360);

          if (h < 0)
          h += 360;

          l = (min + max) / 2;

          if (max == min)
          s = 0;else
          if (l <= 0.5)
          s = delta / (max + min);else

          s = delta / (2 - max - min);

          return [h, s * 100, l * 100];
        },
        rgb2hsv: function rgb2hsv(rgb) {
          var r = rgb[0],
          g = rgb[1],
          b = rgb[2],
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h,s,v;

          if (max === 0)
          s = 0;else

          s = delta / max * 1000 / 10;

          if (max == min)
          h = 0;else
          if (r == max)
          h = (g - b) / delta;else
          if (g == max)
          h = 2 + (b - r) / delta;else
          if (b == max)
          h = 4 + (r - g) / delta;

          h = Math.min(h * 60, 360);

          if (h < 0)
          h += 360;

          v = max / 255 * 1000 / 10;

          return [h, s, v];
        },
        hsl2rgb: function hsl2rgb(hsl) {
          var h = hsl[0] / 360,
          s = hsl[1] / 100,
          l = hsl[2] / 100,
          t1,t2,t3,rgb,val;

          if (s === 0) {
            val = l * 255;
            return [val, val, val];
          }

          if (l < 0.5)
          t2 = l * (1 + s);else

          t2 = l + s - l * s;
          t1 = 2 * l - t2;

          rgb = [0, 0, 0];
          for (var i = 0; i < 3; i++) {
            t3 = h + 1 / 3 * -(i - 1);
            if (t3 < 0) t3++;
            if (t3 > 1) t3--;

            if (6 * t3 < 1)
            val = t1 + (t2 - t1) * 6 * t3;else
            if (2 * t3 < 1)
            val = t2;else
            if (3 * t3 < 2)
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;else

            val = t1;

            rgb[i] = val * 255;
          }

          return rgb;
        },
        hsl2hsv: function hsl2hsv(hsl) {
          var h = hsl[0],
          s = hsl[1] / 100,
          l = hsl[2] / 100,
          sv,v;
          l *= 2;
          s *= l <= 1 ? l : 2 - l;
          v = (l + s) / 2;
          sv = 2 * s / (l + s);
          return [h, sv * 100, v * 100];
        },
        hsv2rgb: function hsv2rgb(hsv) {
          var h = hsv[0] / 60;
          var s = hsv[1] / 100;
          var v = hsv[2] / 100;
          var hi = Math.floor(h) % 6;

          var f = h - Math.floor(h);
          var p = 255 * v * (1 - s);
          var q = 255 * v * (1 - s * f);
          var t = 255 * v * (1 - s * (1 - f));

          v = 255 * v;

          switch (hi) {
            case 0:
              return [v, t, p];
            case 1:
              return [q, v, p];
            case 2:
              return [p, v, t];
            case 3:
              return [p, q, v];
            case 4:
              return [t, p, v];
            case 5:
              return [v, p, q];}

        },
        hsv2hsl: function hsv2hsl(hsv) {
          var h = hsv[0],
          s = hsv[1] / 100,
          v = hsv[2] / 100,
          sl,l;

          l = (2 - s) * v;
          sl = s * v;
          sl /= l <= 1 ? l : 2 - l;
          l /= 2;
          return [h, sl * 100, l * 100];
        },
        // http://www.140byt.es/keywords/color
        rgb2hex: function rgb2hex(
        a, // red, as a number from 0 to 255
        b, // green, as a number from 0 to 255
        c // blue, as a number from 0 to 255
        ) {
          return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1);
        },
        hex2rgb: function hex2rgb(
        a // take a "#xxxxxx" hex string,
        ) {
          a = '0x' + a.slice(1).replace(a.length > 4 ? a : /./g, '$&$&') | 0;
          return [a >> 16, a >> 8 & 255, a & 255];
        }


        /***/ };},
    /* 12 */
    /***/function (module, exports) {

      /*
                                         ## Color 字典数据
                                     
                                         字典数据来源 [A nicer color palette for the web](http://clrs.cc/)
                                     */
      module.exports = {
        // name value nicer
        navy: {
          value: '#000080',
          nicer: '#001F3F' },

        blue: {
          value: '#0000ff',
          nicer: '#0074D9' },

        aqua: {
          value: '#00ffff',
          nicer: '#7FDBFF' },

        teal: {
          value: '#008080',
          nicer: '#39CCCC' },

        olive: {
          value: '#008000',
          nicer: '#3D9970' },

        green: {
          value: '#008000',
          nicer: '#2ECC40' },

        lime: {
          value: '#00ff00',
          nicer: '#01FF70' },

        yellow: {
          value: '#ffff00',
          nicer: '#FFDC00' },

        orange: {
          value: '#ffa500',
          nicer: '#FF851B' },

        red: {
          value: '#ff0000',
          nicer: '#FF4136' },

        maroon: {
          value: '#800000',
          nicer: '#85144B' },

        fuchsia: {
          value: '#ff00ff',
          nicer: '#F012BE' },

        purple: {
          value: '#800080',
          nicer: '#B10DC9' },

        silver: {
          value: '#c0c0c0',
          nicer: '#DDDDDD' },

        gray: {
          value: '#808080',
          nicer: '#AAAAAA' },

        black: {
          value: '#000000',
          nicer: '#111111' },

        white: {
          value: '#FFFFFF',
          nicer: '#FFFFFF' }



        /***/ };},
    /* 13 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                              ## Text
                                                          
                                                              http://www.lipsum.com/
                                                          */
      var Basic = __webpack_require__(6);
      var Helper = __webpack_require__(14);

      function range(defaultMin, defaultMax, min, max) {
        return min === undefined ? Basic.natural(defaultMin, defaultMax) : // ()
        max === undefined ? min : // ( len )
        Basic.natural(parseInt(min, 10), parseInt(max, 10)); // ( min, max )
      }

      module.exports = {
        // 随机生成一段文本。
        paragraph: function paragraph(min, max) {
          var len = range(3, 7, min, max);
          var result = [];
          for (var i = 0; i < len; i++) {
            result.push(this.sentence());
          }
          return result.join(' ');
        },
        // 
        cparagraph: function cparagraph(min, max) {
          var len = range(3, 7, min, max);
          var result = [];
          for (var i = 0; i < len; i++) {
            result.push(this.csentence());
          }
          return result.join('');
        },
        // 随机生成一个句子，第一个单词的首字母大写。
        sentence: function sentence(min, max) {
          var len = range(12, 18, min, max);
          var result = [];
          for (var i = 0; i < len; i++) {
            result.push(this.word());
          }
          return Helper.capitalize(result.join(' ')) + '.';
        },
        // 随机生成一个中文句子。
        csentence: function csentence(min, max) {
          var len = range(12, 18, min, max);
          var result = [];
          for (var i = 0; i < len; i++) {
            result.push(this.cword());
          }

          return result.join('') + '。';
        },
        // 随机生成一个单词。
        word: function word(min, max) {
          var len = range(3, 10, min, max);
          var result = '';
          for (var i = 0; i < len; i++) {
            result += Basic.character('lower');
          }
          return result;
        },
        // 随机生成一个或多个汉字。
        cword: function cword(pool, min, max) {
          // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm
          var DICT_KANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞';

          var len;
          switch (arguments.length) {
            case 0: // ()
              pool = DICT_KANZI;
              len = 1;
              break;
            case 1: // ( pool )
              if (typeof arguments[0] === 'string') {
                len = 1;
              } else {
                // ( length )
                len = pool;
                pool = DICT_KANZI;
              }
              break;
            case 2:
              // ( pool, length )
              if (typeof arguments[0] === 'string') {
                len = min;
              } else {
                // ( min, max )
                len = this.natural(pool, min);
                pool = DICT_KANZI;
              }
              break;
            case 3:
              len = this.natural(min, max);
              break;}


          var result = '';
          for (var i = 0; i < len; i++) {
            result += pool.charAt(this.natural(0, pool.length - 1));
          }
          return result;
        },
        // 随机生成一句标题，其中每个单词的首字母大写。
        title: function title(min, max) {
          var len = range(3, 7, min, max);
          var result = [];
          for (var i = 0; i < len; i++) {
            result.push(this.capitalize(this.word()));
          }
          return result.join(' ');
        },
        // 随机生成一句中文标题。
        ctitle: function ctitle(min, max) {
          var len = range(3, 7, min, max);
          var result = [];
          for (var i = 0; i < len; i++) {
            result.push(this.cword());
          }
          return result.join('');
        }


        /***/ };},
    /* 14 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                              ## Helpers
                                                          */

      var Util = __webpack_require__(3);

      module.exports = {
        // 把字符串的第一个字母转换为大写。
        capitalize: function capitalize(word) {
          return (word + '').charAt(0).toUpperCase() + (word + '').substr(1);
        },
        // 把字符串转换为大写。
        upper: function upper(str) {
          return (str + '').toUpperCase();
        },
        // 把字符串转换为小写。
        lower: function lower(str) {
          return (str + '').toLowerCase();
        },
        // 从数组中随机选取一个元素，并返回。
        pick: function pick(arr, min, max) {
          // pick( item1, item2 ... )
          if (!Util.isArray(arr)) {
            arr = [].slice.call(arguments);
            min = 1;
            max = 1;
          } else {
            // pick( [ item1, item2 ... ] )
            if (min === undefined) min = 1;

            // pick( [ item1, item2 ... ], count )
            if (max === undefined) max = min;
          }

          if (min === 1 && max === 1) return arr[this.natural(0, arr.length - 1)];

          // pick( [ item1, item2 ... ], min, max )
          return this.shuffle(arr, min, max);

          // 通过参数个数判断方法签名，扩展性太差！#90
          // switch (arguments.length) {
          // 	case 1:
          // 		// pick( [ item1, item2 ... ] )
          // 		return arr[this.natural(0, arr.length - 1)]
          // 	case 2:
          // 		// pick( [ item1, item2 ... ], count )
          // 		max = min
          // 			/* falls through */
          // 	case 3:
          // 		// pick( [ item1, item2 ... ], min, max )
          // 		return this.shuffle(arr, min, max)
          // }
        },
        /*
               打乱数组中元素的顺序，并返回。
               Given an array, scramble the order and return it.
           		    其他的实现思路：
                   // https://code.google.com/p/jslibs/wiki/JavascriptTips
                   result = result.sort(function() {
                       return Math.random() - 0.5
                   })
           */

        shuffle: function shuffle(arr, min, max) {
          arr = arr || [];
          var old = arr.slice(0),
          result = [],
          index = 0,
          length = old.length;
          for (var i = 0; i < length; i++) {
            index = this.natural(0, old.length - 1);
            result.push(old[index]);
            old.splice(index, 1);
          }
          switch (arguments.length) {
            case 0:
            case 1:
              return result;
            case 2:
              max = min;
            /* falls through */
            case 3:
              min = parseInt(min, 10);
              max = parseInt(max, 10);
              return result.slice(0, this.natural(min, max));}

        },
        /*
               * Random.order(item, item)
               * Random.order([item, item ...])
           		    顺序获取数组中的元素
           		    [JSON导入数组支持数组数据录入](https://github.com/thx/RAP/issues/22)
           		    不支持单独调用！
           */



        order: function order(array) {
          order.cache = order.cache || {};

          if (arguments.length > 1) array = [].slice.call(arguments, 0);

          // options.context.path/templatePath
          var options = order.options;
          var templatePath = options.context.templatePath.join('.');

          var cache =
          order.cache[templatePath] = order.cache[templatePath] || {
            index: 0,
            array: array };



          return cache.array[cache.index++ % cache.array.length];
        }


        /***/ };},
    /* 15 */
    /***/function (module, exports) {

      /*
                                         ## Name
                                     
                                         [Beyond the Top 1000 Names](http://www.ssa.gov/oact/babynames/limits.html)
                                     */
      module.exports = {
        // 随机生成一个常见的英文名。
        first: function first() {
          var names = [
          // male
          "James", "John", "Robert", "Michael", "William",
          "David", "Richard", "Charles", "Joseph", "Thomas",
          "Christopher", "Daniel", "Paul", "Mark", "Donald",
          "George", "Kenneth", "Steven", "Edward", "Brian",
          "Ronald", "Anthony", "Kevin", "Jason", "Matthew",
          "Gary", "Timothy", "Jose", "Larry", "Jeffrey",
          "Frank", "Scott", "Eric"].
          concat([
          // female
          "Mary", "Patricia", "Linda", "Barbara", "Elizabeth",
          "Jennifer", "Maria", "Susan", "Margaret", "Dorothy",
          "Lisa", "Nancy", "Karen", "Betty", "Helen",
          "Sandra", "Donna", "Carol", "Ruth", "Sharon",
          "Michelle", "Laura", "Sarah", "Kimberly", "Deborah",
          "Jessica", "Shirley", "Cynthia", "Angela", "Melissa",
          "Brenda", "Amy", "Anna"]);

          return this.pick(names);
          // or this.capitalize(this.word())
        },
        // 随机生成一个常见的英文姓。
        last: function last() {
          var names = [
          "Smith", "Johnson", "Williams", "Brown", "Jones",
          "Miller", "Davis", "Garcia", "Rodriguez", "Wilson",
          "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez",
          "Moore", "Martin", "Jackson", "Thompson", "White",
          "Lopez", "Lee", "Gonzalez", "Harris", "Clark",
          "Lewis", "Robinson", "Walker", "Perez", "Hall",
          "Young", "Allen"];

          return this.pick(names);
          // or this.capitalize(this.word())
        },
        // 随机生成一个常见的英文姓名。
        name: function name(middle) {
          return this.first() + ' ' + (
          middle ? this.first() + ' ' : '') +
          this.last();
        },
        /*
               随机生成一个常见的中文姓。
               [世界常用姓氏排行](http://baike.baidu.com/view/1719115.htm)
               [玄派网 - 网络小说创作辅助平台](http://xuanpai.sinaapp.com/)
            */
        cfirst: function cfirst() {
          var names = (
          '王 李 张 刘 陈 杨 赵 黄 周 吴 ' +
          '徐 孙 胡 朱 高 林 何 郭 马 罗 ' +
          '梁 宋 郑 谢 韩 唐 冯 于 董 萧 ' +
          '程 曹 袁 邓 许 傅 沈 曾 彭 吕 ' +
          '苏 卢 蒋 蔡 贾 丁 魏 薛 叶 阎 ' +
          '余 潘 杜 戴 夏 锺 汪 田 任 姜 ' +
          '范 方 石 姚 谭 廖 邹 熊 金 陆 ' +
          '郝 孔 白 崔 康 毛 邱 秦 江 史 ' +
          '顾 侯 邵 孟 龙 万 段 雷 钱 汤 ' +
          '尹 黎 易 常 武 乔 贺 赖 龚 文').
          split(' ');
          return this.pick(names);
        },
        /*
               随机生成一个常见的中文名。
               [中国最常见名字前50名_三九算命网](http://www.name999.net/xingming/xingshi/20131004/48.html)
            */
        clast: function clast() {
          var names = (
          '伟 芳 娜 秀英 敏 静 丽 强 磊 军 ' +
          '洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 ' +
          '平 刚 桂英').
          split(' ');
          return this.pick(names);
        },
        // 随机生成一个常见的中文姓名。
        cname: function cname() {
          return this.cfirst() + this.clast();
        }


        /***/ };},
    /* 16 */
    /***/function (module, exports) {

      /*
                                         ## Web
                                     */
      module.exports = {
        /*
                             随机生成一个 URL。
                               [URL 规范](http://www.w3.org/Addressing/URL/url-spec.txt)
                                 http                    Hypertext Transfer Protocol 
                                 ftp                     File Transfer protocol 
                                 gopher                  The Gopher protocol 
                                 mailto                  Electronic mail address 
                                 mid                     Message identifiers for electronic mail 
                                 cid                     Content identifiers for MIME body part 
                                 news                    Usenet news 
                                 nntp                    Usenet news for local NNTP access only 
                                 prospero                Access using the prospero protocols 
                                 telnet rlogin tn3270    Reference to interactive sessions
                                 wais                    Wide Area Information Servers 
                         */

        url: function url(protocol, host) {
          return (protocol || this.protocol()) + '://' + ( // protocol?
          host || this.domain()) + // host?
          '/' + this.word();
        },
        // 随机生成一个 URL 协议。
        protocol: function protocol() {
          return this.pick(
          // 协议簇
          'http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais'.split(' '));

        },
        // 随机生成一个域名。
        domain: function domain(tld) {
          return this.word() + '.' + (tld || this.tld());
        },
        /*
               随机生成一个顶级域名。
               国际顶级域名 international top-level domain-names, iTLDs
               国家顶级域名 national top-level domainnames, nTLDs
               [域名后缀大全](http://www.163ns.com/zixun/post/4417.html)
           */
        tld: function tld() {// Top Level Domain
          return this.pick(
          (
          // 域名后缀
          'com net org edu gov int mil cn ' +
          // 国内域名
          'com.cn net.cn gov.cn org.cn ' +
          // 中文国内域名
          '中国 中国互联.公司 中国互联.网络 ' +
          // 新国际域名
          'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' +
          // 世界各国域名后缀
          'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw').
          split(' '));

        },
        // 随机生成一个邮件地址。
        email: function email(domain) {
          return this.character('lower') + '.' + this.word() + '@' + (

          domain ||
          this.word() + '.' + this.tld());

          // return this.character('lower') + '.' + this.last().toLowerCase() + '@' + this.last().toLowerCase() + '.' + this.tld()
          // return this.word() + '@' + (domain || this.domain())
        },
        // 随机生成一个 IP 地址。
        ip: function ip() {
          return this.natural(0, 255) + '.' +
          this.natural(0, 255) + '.' +
          this.natural(0, 255) + '.' +
          this.natural(0, 255);
        }


        /***/ };},
    /* 17 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                              ## Address
                                                          */

      var DICT = __webpack_require__(18);
      var REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北'];

      module.exports = {
        // 随机生成一个大区。
        region: function region() {
          return this.pick(REGION);
        },
        // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
        province: function province() {
          return this.pick(DICT).name;
        },
        // 随机生成一个（中国）市。
        city: function city(prefix) {
          var province = this.pick(DICT);
          var city = this.pick(province.children);
          return prefix ? [province.name, city.name].join(' ') : city.name;
        },
        // 随机生成一个（中国）县。
        county: function county(prefix) {
          var province = this.pick(DICT);
          var city = this.pick(province.children);
          var county = this.pick(city.children) || {
            name: '-' };

          return prefix ? [province.name, city.name, county.name].join(' ') : county.name;
        },
        // 随机生成一个邮政编码（六位数字）。
        zip: function zip(len) {
          var zip = '';
          for (var i = 0; i < (len || 6); i++) {zip += this.natural(0, 9);}
          return zip;
        }

        // address: function() {},
        // phone: function() {},
        // areacode: function() {},
        // street: function() {},
        // street_suffixes: function() {},
        // street_suffix: function() {},
        // states: function() {},
        // state: function() {},


        /***/ };},
    /* 18 */
    /***/function (module, exports) {

      /*
                                         ## Address 字典数据
                                     
                                         字典数据来源 http://www.atatech.org/articles/30028?rnd=254259856
                                     
                                         国标 省（市）级行政区划码表
                                     
                                         华北   北京市 天津市 河北省 山西省 内蒙古自治区
                                         东北   辽宁省 吉林省 黑龙江省
                                         华东   上海市 江苏省 浙江省 安徽省 福建省 江西省 山东省
                                         华南   广东省 广西壮族自治区 海南省
                                         华中   河南省 湖北省 湖南省
                                         西南   重庆市 四川省 贵州省 云南省 西藏自治区
                                         西北   陕西省 甘肃省 青海省 宁夏回族自治区 新疆维吾尔自治区
                                         港澳台 香港特别行政区 澳门特别行政区 台湾省
                                         
                                         **排序**
                                         
                                         ```js
                                         var map = {}
                                         _.each(_.keys(REGIONS),function(id){
                                           map[id] = REGIONS[ID]
                                         })
                                         JSON.stringify(map)
                                         ```
                                     */
      var DICT = {
        "110000": "北京",
        "110100": "北京市",
        "110101": "东城区",
        "110102": "西城区",
        "110105": "朝阳区",
        "110106": "丰台区",
        "110107": "石景山区",
        "110108": "海淀区",
        "110109": "门头沟区",
        "110111": "房山区",
        "110112": "通州区",
        "110113": "顺义区",
        "110114": "昌平区",
        "110115": "大兴区",
        "110116": "怀柔区",
        "110117": "平谷区",
        "110228": "密云县",
        "110229": "延庆县",
        "110230": "其它区",
        "120000": "天津",
        "120100": "天津市",
        "120101": "和平区",
        "120102": "河东区",
        "120103": "河西区",
        "120104": "南开区",
        "120105": "河北区",
        "120106": "红桥区",
        "120110": "东丽区",
        "120111": "西青区",
        "120112": "津南区",
        "120113": "北辰区",
        "120114": "武清区",
        "120115": "宝坻区",
        "120116": "滨海新区",
        "120221": "宁河县",
        "120223": "静海县",
        "120225": "蓟县",
        "120226": "其它区",
        "130000": "河北省",
        "130100": "石家庄市",
        "130102": "长安区",
        "130103": "桥东区",
        "130104": "桥西区",
        "130105": "新华区",
        "130107": "井陉矿区",
        "130108": "裕华区",
        "130121": "井陉县",
        "130123": "正定县",
        "130124": "栾城县",
        "130125": "行唐县",
        "130126": "灵寿县",
        "130127": "高邑县",
        "130128": "深泽县",
        "130129": "赞皇县",
        "130130": "无极县",
        "130131": "平山县",
        "130132": "元氏县",
        "130133": "赵县",
        "130181": "辛集市",
        "130182": "藁城市",
        "130183": "晋州市",
        "130184": "新乐市",
        "130185": "鹿泉市",
        "130186": "其它区",
        "130200": "唐山市",
        "130202": "路南区",
        "130203": "路北区",
        "130204": "古冶区",
        "130205": "开平区",
        "130207": "丰南区",
        "130208": "丰润区",
        "130223": "滦县",
        "130224": "滦南县",
        "130225": "乐亭县",
        "130227": "迁西县",
        "130229": "玉田县",
        "130230": "曹妃甸区",
        "130281": "遵化市",
        "130283": "迁安市",
        "130284": "其它区",
        "130300": "秦皇岛市",
        "130302": "海港区",
        "130303": "山海关区",
        "130304": "北戴河区",
        "130321": "青龙满族自治县",
        "130322": "昌黎县",
        "130323": "抚宁县",
        "130324": "卢龙县",
        "130398": "其它区",
        "130400": "邯郸市",
        "130402": "邯山区",
        "130403": "丛台区",
        "130404": "复兴区",
        "130406": "峰峰矿区",
        "130421": "邯郸县",
        "130423": "临漳县",
        "130424": "成安县",
        "130425": "大名县",
        "130426": "涉县",
        "130427": "磁县",
        "130428": "肥乡县",
        "130429": "永年县",
        "130430": "邱县",
        "130431": "鸡泽县",
        "130432": "广平县",
        "130433": "馆陶县",
        "130434": "魏县",
        "130435": "曲周县",
        "130481": "武安市",
        "130482": "其它区",
        "130500": "邢台市",
        "130502": "桥东区",
        "130503": "桥西区",
        "130521": "邢台县",
        "130522": "临城县",
        "130523": "内丘县",
        "130524": "柏乡县",
        "130525": "隆尧县",
        "130526": "任县",
        "130527": "南和县",
        "130528": "宁晋县",
        "130529": "巨鹿县",
        "130530": "新河县",
        "130531": "广宗县",
        "130532": "平乡县",
        "130533": "威县",
        "130534": "清河县",
        "130535": "临西县",
        "130581": "南宫市",
        "130582": "沙河市",
        "130583": "其它区",
        "130600": "保定市",
        "130602": "新市区",
        "130603": "北市区",
        "130604": "南市区",
        "130621": "满城县",
        "130622": "清苑县",
        "130623": "涞水县",
        "130624": "阜平县",
        "130625": "徐水县",
        "130626": "定兴县",
        "130627": "唐县",
        "130628": "高阳县",
        "130629": "容城县",
        "130630": "涞源县",
        "130631": "望都县",
        "130632": "安新县",
        "130633": "易县",
        "130634": "曲阳县",
        "130635": "蠡县",
        "130636": "顺平县",
        "130637": "博野县",
        "130638": "雄县",
        "130681": "涿州市",
        "130682": "定州市",
        "130683": "安国市",
        "130684": "高碑店市",
        "130699": "其它区",
        "130700": "张家口市",
        "130702": "桥东区",
        "130703": "桥西区",
        "130705": "宣化区",
        "130706": "下花园区",
        "130721": "宣化县",
        "130722": "张北县",
        "130723": "康保县",
        "130724": "沽源县",
        "130725": "尚义县",
        "130726": "蔚县",
        "130727": "阳原县",
        "130728": "怀安县",
        "130729": "万全县",
        "130730": "怀来县",
        "130731": "涿鹿县",
        "130732": "赤城县",
        "130733": "崇礼县",
        "130734": "其它区",
        "130800": "承德市",
        "130802": "双桥区",
        "130803": "双滦区",
        "130804": "鹰手营子矿区",
        "130821": "承德县",
        "130822": "兴隆县",
        "130823": "平泉县",
        "130824": "滦平县",
        "130825": "隆化县",
        "130826": "丰宁满族自治县",
        "130827": "宽城满族自治县",
        "130828": "围场满族蒙古族自治县",
        "130829": "其它区",
        "130900": "沧州市",
        "130902": "新华区",
        "130903": "运河区",
        "130921": "沧县",
        "130922": "青县",
        "130923": "东光县",
        "130924": "海兴县",
        "130925": "盐山县",
        "130926": "肃宁县",
        "130927": "南皮县",
        "130928": "吴桥县",
        "130929": "献县",
        "130930": "孟村回族自治县",
        "130981": "泊头市",
        "130982": "任丘市",
        "130983": "黄骅市",
        "130984": "河间市",
        "130985": "其它区",
        "131000": "廊坊市",
        "131002": "安次区",
        "131003": "广阳区",
        "131022": "固安县",
        "131023": "永清县",
        "131024": "香河县",
        "131025": "大城县",
        "131026": "文安县",
        "131028": "大厂回族自治县",
        "131081": "霸州市",
        "131082": "三河市",
        "131083": "其它区",
        "131100": "衡水市",
        "131102": "桃城区",
        "131121": "枣强县",
        "131122": "武邑县",
        "131123": "武强县",
        "131124": "饶阳县",
        "131125": "安平县",
        "131126": "故城县",
        "131127": "景县",
        "131128": "阜城县",
        "131181": "冀州市",
        "131182": "深州市",
        "131183": "其它区",
        "140000": "山西省",
        "140100": "太原市",
        "140105": "小店区",
        "140106": "迎泽区",
        "140107": "杏花岭区",
        "140108": "尖草坪区",
        "140109": "万柏林区",
        "140110": "晋源区",
        "140121": "清徐县",
        "140122": "阳曲县",
        "140123": "娄烦县",
        "140181": "古交市",
        "140182": "其它区",
        "140200": "大同市",
        "140202": "城区",
        "140203": "矿区",
        "140211": "南郊区",
        "140212": "新荣区",
        "140221": "阳高县",
        "140222": "天镇县",
        "140223": "广灵县",
        "140224": "灵丘县",
        "140225": "浑源县",
        "140226": "左云县",
        "140227": "大同县",
        "140228": "其它区",
        "140300": "阳泉市",
        "140302": "城区",
        "140303": "矿区",
        "140311": "郊区",
        "140321": "平定县",
        "140322": "盂县",
        "140323": "其它区",
        "140400": "长治市",
        "140421": "长治县",
        "140423": "襄垣县",
        "140424": "屯留县",
        "140425": "平顺县",
        "140426": "黎城县",
        "140427": "壶关县",
        "140428": "长子县",
        "140429": "武乡县",
        "140430": "沁县",
        "140431": "沁源县",
        "140481": "潞城市",
        "140482": "城区",
        "140483": "郊区",
        "140485": "其它区",
        "140500": "晋城市",
        "140502": "城区",
        "140521": "沁水县",
        "140522": "阳城县",
        "140524": "陵川县",
        "140525": "泽州县",
        "140581": "高平市",
        "140582": "其它区",
        "140600": "朔州市",
        "140602": "朔城区",
        "140603": "平鲁区",
        "140621": "山阴县",
        "140622": "应县",
        "140623": "右玉县",
        "140624": "怀仁县",
        "140625": "其它区",
        "140700": "晋中市",
        "140702": "榆次区",
        "140721": "榆社县",
        "140722": "左权县",
        "140723": "和顺县",
        "140724": "昔阳县",
        "140725": "寿阳县",
        "140726": "太谷县",
        "140727": "祁县",
        "140728": "平遥县",
        "140729": "灵石县",
        "140781": "介休市",
        "140782": "其它区",
        "140800": "运城市",
        "140802": "盐湖区",
        "140821": "临猗县",
        "140822": "万荣县",
        "140823": "闻喜县",
        "140824": "稷山县",
        "140825": "新绛县",
        "140826": "绛县",
        "140827": "垣曲县",
        "140828": "夏县",
        "140829": "平陆县",
        "140830": "芮城县",
        "140881": "永济市",
        "140882": "河津市",
        "140883": "其它区",
        "140900": "忻州市",
        "140902": "忻府区",
        "140921": "定襄县",
        "140922": "五台县",
        "140923": "代县",
        "140924": "繁峙县",
        "140925": "宁武县",
        "140926": "静乐县",
        "140927": "神池县",
        "140928": "五寨县",
        "140929": "岢岚县",
        "140930": "河曲县",
        "140931": "保德县",
        "140932": "偏关县",
        "140981": "原平市",
        "140982": "其它区",
        "141000": "临汾市",
        "141002": "尧都区",
        "141021": "曲沃县",
        "141022": "翼城县",
        "141023": "襄汾县",
        "141024": "洪洞县",
        "141025": "古县",
        "141026": "安泽县",
        "141027": "浮山县",
        "141028": "吉县",
        "141029": "乡宁县",
        "141030": "大宁县",
        "141031": "隰县",
        "141032": "永和县",
        "141033": "蒲县",
        "141034": "汾西县",
        "141081": "侯马市",
        "141082": "霍州市",
        "141083": "其它区",
        "141100": "吕梁市",
        "141102": "离石区",
        "141121": "文水县",
        "141122": "交城县",
        "141123": "兴县",
        "141124": "临县",
        "141125": "柳林县",
        "141126": "石楼县",
        "141127": "岚县",
        "141128": "方山县",
        "141129": "中阳县",
        "141130": "交口县",
        "141181": "孝义市",
        "141182": "汾阳市",
        "141183": "其它区",
        "150000": "内蒙古自治区",
        "150100": "呼和浩特市",
        "150102": "新城区",
        "150103": "回民区",
        "150104": "玉泉区",
        "150105": "赛罕区",
        "150121": "土默特左旗",
        "150122": "托克托县",
        "150123": "和林格尔县",
        "150124": "清水河县",
        "150125": "武川县",
        "150126": "其它区",
        "150200": "包头市",
        "150202": "东河区",
        "150203": "昆都仑区",
        "150204": "青山区",
        "150205": "石拐区",
        "150206": "白云鄂博矿区",
        "150207": "九原区",
        "150221": "土默特右旗",
        "150222": "固阳县",
        "150223": "达尔罕茂明安联合旗",
        "150224": "其它区",
        "150300": "乌海市",
        "150302": "海勃湾区",
        "150303": "海南区",
        "150304": "乌达区",
        "150305": "其它区",
        "150400": "赤峰市",
        "150402": "红山区",
        "150403": "元宝山区",
        "150404": "松山区",
        "150421": "阿鲁科尔沁旗",
        "150422": "巴林左旗",
        "150423": "巴林右旗",
        "150424": "林西县",
        "150425": "克什克腾旗",
        "150426": "翁牛特旗",
        "150428": "喀喇沁旗",
        "150429": "宁城县",
        "150430": "敖汉旗",
        "150431": "其它区",
        "150500": "通辽市",
        "150502": "科尔沁区",
        "150521": "科尔沁左翼中旗",
        "150522": "科尔沁左翼后旗",
        "150523": "开鲁县",
        "150524": "库伦旗",
        "150525": "奈曼旗",
        "150526": "扎鲁特旗",
        "150581": "霍林郭勒市",
        "150582": "其它区",
        "150600": "鄂尔多斯市",
        "150602": "东胜区",
        "150621": "达拉特旗",
        "150622": "准格尔旗",
        "150623": "鄂托克前旗",
        "150624": "鄂托克旗",
        "150625": "杭锦旗",
        "150626": "乌审旗",
        "150627": "伊金霍洛旗",
        "150628": "其它区",
        "150700": "呼伦贝尔市",
        "150702": "海拉尔区",
        "150703": "扎赉诺尔区",
        "150721": "阿荣旗",
        "150722": "莫力达瓦达斡尔族自治旗",
        "150723": "鄂伦春自治旗",
        "150724": "鄂温克族自治旗",
        "150725": "陈巴尔虎旗",
        "150726": "新巴尔虎左旗",
        "150727": "新巴尔虎右旗",
        "150781": "满洲里市",
        "150782": "牙克石市",
        "150783": "扎兰屯市",
        "150784": "额尔古纳市",
        "150785": "根河市",
        "150786": "其它区",
        "150800": "巴彦淖尔市",
        "150802": "临河区",
        "150821": "五原县",
        "150822": "磴口县",
        "150823": "乌拉特前旗",
        "150824": "乌拉特中旗",
        "150825": "乌拉特后旗",
        "150826": "杭锦后旗",
        "150827": "其它区",
        "150900": "乌兰察布市",
        "150902": "集宁区",
        "150921": "卓资县",
        "150922": "化德县",
        "150923": "商都县",
        "150924": "兴和县",
        "150925": "凉城县",
        "150926": "察哈尔右翼前旗",
        "150927": "察哈尔右翼中旗",
        "150928": "察哈尔右翼后旗",
        "150929": "四子王旗",
        "150981": "丰镇市",
        "150982": "其它区",
        "152200": "兴安盟",
        "152201": "乌兰浩特市",
        "152202": "阿尔山市",
        "152221": "科尔沁右翼前旗",
        "152222": "科尔沁右翼中旗",
        "152223": "扎赉特旗",
        "152224": "突泉县",
        "152225": "其它区",
        "152500": "锡林郭勒盟",
        "152501": "二连浩特市",
        "152502": "锡林浩特市",
        "152522": "阿巴嘎旗",
        "152523": "苏尼特左旗",
        "152524": "苏尼特右旗",
        "152525": "东乌珠穆沁旗",
        "152526": "西乌珠穆沁旗",
        "152527": "太仆寺旗",
        "152528": "镶黄旗",
        "152529": "正镶白旗",
        "152530": "正蓝旗",
        "152531": "多伦县",
        "152532": "其它区",
        "152900": "阿拉善盟",
        "152921": "阿拉善左旗",
        "152922": "阿拉善右旗",
        "152923": "额济纳旗",
        "152924": "其它区",
        "210000": "辽宁省",
        "210100": "沈阳市",
        "210102": "和平区",
        "210103": "沈河区",
        "210104": "大东区",
        "210105": "皇姑区",
        "210106": "铁西区",
        "210111": "苏家屯区",
        "210112": "东陵区",
        "210113": "新城子区",
        "210114": "于洪区",
        "210122": "辽中县",
        "210123": "康平县",
        "210124": "法库县",
        "210181": "新民市",
        "210184": "沈北新区",
        "210185": "其它区",
        "210200": "大连市",
        "210202": "中山区",
        "210203": "西岗区",
        "210204": "沙河口区",
        "210211": "甘井子区",
        "210212": "旅顺口区",
        "210213": "金州区",
        "210224": "长海县",
        "210281": "瓦房店市",
        "210282": "普兰店市",
        "210283": "庄河市",
        "210298": "其它区",
        "210300": "鞍山市",
        "210302": "铁东区",
        "210303": "铁西区",
        "210304": "立山区",
        "210311": "千山区",
        "210321": "台安县",
        "210323": "岫岩满族自治县",
        "210381": "海城市",
        "210382": "其它区",
        "210400": "抚顺市",
        "210402": "新抚区",
        "210403": "东洲区",
        "210404": "望花区",
        "210411": "顺城区",
        "210421": "抚顺县",
        "210422": "新宾满族自治县",
        "210423": "清原满族自治县",
        "210424": "其它区",
        "210500": "本溪市",
        "210502": "平山区",
        "210503": "溪湖区",
        "210504": "明山区",
        "210505": "南芬区",
        "210521": "本溪满族自治县",
        "210522": "桓仁满族自治县",
        "210523": "其它区",
        "210600": "丹东市",
        "210602": "元宝区",
        "210603": "振兴区",
        "210604": "振安区",
        "210624": "宽甸满族自治县",
        "210681": "东港市",
        "210682": "凤城市",
        "210683": "其它区",
        "210700": "锦州市",
        "210702": "古塔区",
        "210703": "凌河区",
        "210711": "太和区",
        "210726": "黑山县",
        "210727": "义县",
        "210781": "凌海市",
        "210782": "北镇市",
        "210783": "其它区",
        "210800": "营口市",
        "210802": "站前区",
        "210803": "西市区",
        "210804": "鲅鱼圈区",
        "210811": "老边区",
        "210881": "盖州市",
        "210882": "大石桥市",
        "210883": "其它区",
        "210900": "阜新市",
        "210902": "海州区",
        "210903": "新邱区",
        "210904": "太平区",
        "210905": "清河门区",
        "210911": "细河区",
        "210921": "阜新蒙古族自治县",
        "210922": "彰武县",
        "210923": "其它区",
        "211000": "辽阳市",
        "211002": "白塔区",
        "211003": "文圣区",
        "211004": "宏伟区",
        "211005": "弓长岭区",
        "211011": "太子河区",
        "211021": "辽阳县",
        "211081": "灯塔市",
        "211082": "其它区",
        "211100": "盘锦市",
        "211102": "双台子区",
        "211103": "兴隆台区",
        "211121": "大洼县",
        "211122": "盘山县",
        "211123": "其它区",
        "211200": "铁岭市",
        "211202": "银州区",
        "211204": "清河区",
        "211221": "铁岭县",
        "211223": "西丰县",
        "211224": "昌图县",
        "211281": "调兵山市",
        "211282": "开原市",
        "211283": "其它区",
        "211300": "朝阳市",
        "211302": "双塔区",
        "211303": "龙城区",
        "211321": "朝阳县",
        "211322": "建平县",
        "211324": "喀喇沁左翼蒙古族自治县",
        "211381": "北票市",
        "211382": "凌源市",
        "211383": "其它区",
        "211400": "葫芦岛市",
        "211402": "连山区",
        "211403": "龙港区",
        "211404": "南票区",
        "211421": "绥中县",
        "211422": "建昌县",
        "211481": "兴城市",
        "211482": "其它区",
        "220000": "吉林省",
        "220100": "长春市",
        "220102": "南关区",
        "220103": "宽城区",
        "220104": "朝阳区",
        "220105": "二道区",
        "220106": "绿园区",
        "220112": "双阳区",
        "220122": "农安县",
        "220181": "九台市",
        "220182": "榆树市",
        "220183": "德惠市",
        "220188": "其它区",
        "220200": "吉林市",
        "220202": "昌邑区",
        "220203": "龙潭区",
        "220204": "船营区",
        "220211": "丰满区",
        "220221": "永吉县",
        "220281": "蛟河市",
        "220282": "桦甸市",
        "220283": "舒兰市",
        "220284": "磐石市",
        "220285": "其它区",
        "220300": "四平市",
        "220302": "铁西区",
        "220303": "铁东区",
        "220322": "梨树县",
        "220323": "伊通满族自治县",
        "220381": "公主岭市",
        "220382": "双辽市",
        "220383": "其它区",
        "220400": "辽源市",
        "220402": "龙山区",
        "220403": "西安区",
        "220421": "东丰县",
        "220422": "东辽县",
        "220423": "其它区",
        "220500": "通化市",
        "220502": "东昌区",
        "220503": "二道江区",
        "220521": "通化县",
        "220523": "辉南县",
        "220524": "柳河县",
        "220581": "梅河口市",
        "220582": "集安市",
        "220583": "其它区",
        "220600": "白山市",
        "220602": "浑江区",
        "220621": "抚松县",
        "220622": "靖宇县",
        "220623": "长白朝鲜族自治县",
        "220625": "江源区",
        "220681": "临江市",
        "220682": "其它区",
        "220700": "松原市",
        "220702": "宁江区",
        "220721": "前郭尔罗斯蒙古族自治县",
        "220722": "长岭县",
        "220723": "乾安县",
        "220724": "扶余市",
        "220725": "其它区",
        "220800": "白城市",
        "220802": "洮北区",
        "220821": "镇赉县",
        "220822": "通榆县",
        "220881": "洮南市",
        "220882": "大安市",
        "220883": "其它区",
        "222400": "延边朝鲜族自治州",
        "222401": "延吉市",
        "222402": "图们市",
        "222403": "敦化市",
        "222404": "珲春市",
        "222405": "龙井市",
        "222406": "和龙市",
        "222424": "汪清县",
        "222426": "安图县",
        "222427": "其它区",
        "230000": "黑龙江省",
        "230100": "哈尔滨市",
        "230102": "道里区",
        "230103": "南岗区",
        "230104": "道外区",
        "230106": "香坊区",
        "230108": "平房区",
        "230109": "松北区",
        "230111": "呼兰区",
        "230123": "依兰县",
        "230124": "方正县",
        "230125": "宾县",
        "230126": "巴彦县",
        "230127": "木兰县",
        "230128": "通河县",
        "230129": "延寿县",
        "230181": "阿城区",
        "230182": "双城市",
        "230183": "尚志市",
        "230184": "五常市",
        "230186": "其它区",
        "230200": "齐齐哈尔市",
        "230202": "龙沙区",
        "230203": "建华区",
        "230204": "铁锋区",
        "230205": "昂昂溪区",
        "230206": "富拉尔基区",
        "230207": "碾子山区",
        "230208": "梅里斯达斡尔族区",
        "230221": "龙江县",
        "230223": "依安县",
        "230224": "泰来县",
        "230225": "甘南县",
        "230227": "富裕县",
        "230229": "克山县",
        "230230": "克东县",
        "230231": "拜泉县",
        "230281": "讷河市",
        "230282": "其它区",
        "230300": "鸡西市",
        "230302": "鸡冠区",
        "230303": "恒山区",
        "230304": "滴道区",
        "230305": "梨树区",
        "230306": "城子河区",
        "230307": "麻山区",
        "230321": "鸡东县",
        "230381": "虎林市",
        "230382": "密山市",
        "230383": "其它区",
        "230400": "鹤岗市",
        "230402": "向阳区",
        "230403": "工农区",
        "230404": "南山区",
        "230405": "兴安区",
        "230406": "东山区",
        "230407": "兴山区",
        "230421": "萝北县",
        "230422": "绥滨县",
        "230423": "其它区",
        "230500": "双鸭山市",
        "230502": "尖山区",
        "230503": "岭东区",
        "230505": "四方台区",
        "230506": "宝山区",
        "230521": "集贤县",
        "230522": "友谊县",
        "230523": "宝清县",
        "230524": "饶河县",
        "230525": "其它区",
        "230600": "大庆市",
        "230602": "萨尔图区",
        "230603": "龙凤区",
        "230604": "让胡路区",
        "230605": "红岗区",
        "230606": "大同区",
        "230621": "肇州县",
        "230622": "肇源县",
        "230623": "林甸县",
        "230624": "杜尔伯特蒙古族自治县",
        "230625": "其它区",
        "230700": "伊春市",
        "230702": "伊春区",
        "230703": "南岔区",
        "230704": "友好区",
        "230705": "西林区",
        "230706": "翠峦区",
        "230707": "新青区",
        "230708": "美溪区",
        "230709": "金山屯区",
        "230710": "五营区",
        "230711": "乌马河区",
        "230712": "汤旺河区",
        "230713": "带岭区",
        "230714": "乌伊岭区",
        "230715": "红星区",
        "230716": "上甘岭区",
        "230722": "嘉荫县",
        "230781": "铁力市",
        "230782": "其它区",
        "230800": "佳木斯市",
        "230803": "向阳区",
        "230804": "前进区",
        "230805": "东风区",
        "230811": "郊区",
        "230822": "桦南县",
        "230826": "桦川县",
        "230828": "汤原县",
        "230833": "抚远县",
        "230881": "同江市",
        "230882": "富锦市",
        "230883": "其它区",
        "230900": "七台河市",
        "230902": "新兴区",
        "230903": "桃山区",
        "230904": "茄子河区",
        "230921": "勃利县",
        "230922": "其它区",
        "231000": "牡丹江市",
        "231002": "东安区",
        "231003": "阳明区",
        "231004": "爱民区",
        "231005": "西安区",
        "231024": "东宁县",
        "231025": "林口县",
        "231081": "绥芬河市",
        "231083": "海林市",
        "231084": "宁安市",
        "231085": "穆棱市",
        "231086": "其它区",
        "231100": "黑河市",
        "231102": "爱辉区",
        "231121": "嫩江县",
        "231123": "逊克县",
        "231124": "孙吴县",
        "231181": "北安市",
        "231182": "五大连池市",
        "231183": "其它区",
        "231200": "绥化市",
        "231202": "北林区",
        "231221": "望奎县",
        "231222": "兰西县",
        "231223": "青冈县",
        "231224": "庆安县",
        "231225": "明水县",
        "231226": "绥棱县",
        "231281": "安达市",
        "231282": "肇东市",
        "231283": "海伦市",
        "231284": "其它区",
        "232700": "大兴安岭地区",
        "232702": "松岭区",
        "232703": "新林区",
        "232704": "呼中区",
        "232721": "呼玛县",
        "232722": "塔河县",
        "232723": "漠河县",
        "232724": "加格达奇区",
        "232725": "其它区",
        "310000": "上海",
        "310100": "上海市",
        "310101": "黄浦区",
        "310104": "徐汇区",
        "310105": "长宁区",
        "310106": "静安区",
        "310107": "普陀区",
        "310108": "闸北区",
        "310109": "虹口区",
        "310110": "杨浦区",
        "310112": "闵行区",
        "310113": "宝山区",
        "310114": "嘉定区",
        "310115": "浦东新区",
        "310116": "金山区",
        "310117": "松江区",
        "310118": "青浦区",
        "310120": "奉贤区",
        "310230": "崇明县",
        "310231": "其它区",
        "320000": "江苏省",
        "320100": "南京市",
        "320102": "玄武区",
        "320104": "秦淮区",
        "320105": "建邺区",
        "320106": "鼓楼区",
        "320111": "浦口区",
        "320113": "栖霞区",
        "320114": "雨花台区",
        "320115": "江宁区",
        "320116": "六合区",
        "320124": "溧水区",
        "320125": "高淳区",
        "320126": "其它区",
        "320200": "无锡市",
        "320202": "崇安区",
        "320203": "南长区",
        "320204": "北塘区",
        "320205": "锡山区",
        "320206": "惠山区",
        "320211": "滨湖区",
        "320281": "江阴市",
        "320282": "宜兴市",
        "320297": "其它区",
        "320300": "徐州市",
        "320302": "鼓楼区",
        "320303": "云龙区",
        "320305": "贾汪区",
        "320311": "泉山区",
        "320321": "丰县",
        "320322": "沛县",
        "320323": "铜山区",
        "320324": "睢宁县",
        "320381": "新沂市",
        "320382": "邳州市",
        "320383": "其它区",
        "320400": "常州市",
        "320402": "天宁区",
        "320404": "钟楼区",
        "320405": "戚墅堰区",
        "320411": "新北区",
        "320412": "武进区",
        "320481": "溧阳市",
        "320482": "金坛市",
        "320483": "其它区",
        "320500": "苏州市",
        "320505": "虎丘区",
        "320506": "吴中区",
        "320507": "相城区",
        "320508": "姑苏区",
        "320581": "常熟市",
        "320582": "张家港市",
        "320583": "昆山市",
        "320584": "吴江区",
        "320585": "太仓市",
        "320596": "其它区",
        "320600": "南通市",
        "320602": "崇川区",
        "320611": "港闸区",
        "320612": "通州区",
        "320621": "海安县",
        "320623": "如东县",
        "320681": "启东市",
        "320682": "如皋市",
        "320684": "海门市",
        "320694": "其它区",
        "320700": "连云港市",
        "320703": "连云区",
        "320705": "新浦区",
        "320706": "海州区",
        "320721": "赣榆县",
        "320722": "东海县",
        "320723": "灌云县",
        "320724": "灌南县",
        "320725": "其它区",
        "320800": "淮安市",
        "320802": "清河区",
        "320803": "淮安区",
        "320804": "淮阴区",
        "320811": "清浦区",
        "320826": "涟水县",
        "320829": "洪泽县",
        "320830": "盱眙县",
        "320831": "金湖县",
        "320832": "其它区",
        "320900": "盐城市",
        "320902": "亭湖区",
        "320903": "盐都区",
        "320921": "响水县",
        "320922": "滨海县",
        "320923": "阜宁县",
        "320924": "射阳县",
        "320925": "建湖县",
        "320981": "东台市",
        "320982": "大丰市",
        "320983": "其它区",
        "321000": "扬州市",
        "321002": "广陵区",
        "321003": "邗江区",
        "321023": "宝应县",
        "321081": "仪征市",
        "321084": "高邮市",
        "321088": "江都区",
        "321093": "其它区",
        "321100": "镇江市",
        "321102": "京口区",
        "321111": "润州区",
        "321112": "丹徒区",
        "321181": "丹阳市",
        "321182": "扬中市",
        "321183": "句容市",
        "321184": "其它区",
        "321200": "泰州市",
        "321202": "海陵区",
        "321203": "高港区",
        "321281": "兴化市",
        "321282": "靖江市",
        "321283": "泰兴市",
        "321284": "姜堰区",
        "321285": "其它区",
        "321300": "宿迁市",
        "321302": "宿城区",
        "321311": "宿豫区",
        "321322": "沭阳县",
        "321323": "泗阳县",
        "321324": "泗洪县",
        "321325": "其它区",
        "330000": "浙江省",
        "330100": "杭州市",
        "330102": "上城区",
        "330103": "下城区",
        "330104": "江干区",
        "330105": "拱墅区",
        "330106": "西湖区",
        "330108": "滨江区",
        "330109": "萧山区",
        "330110": "余杭区",
        "330122": "桐庐县",
        "330127": "淳安县",
        "330182": "建德市",
        "330183": "富阳市",
        "330185": "临安市",
        "330186": "其它区",
        "330200": "宁波市",
        "330203": "海曙区",
        "330204": "江东区",
        "330205": "江北区",
        "330206": "北仑区",
        "330211": "镇海区",
        "330212": "鄞州区",
        "330225": "象山县",
        "330226": "宁海县",
        "330281": "余姚市",
        "330282": "慈溪市",
        "330283": "奉化市",
        "330284": "其它区",
        "330300": "温州市",
        "330302": "鹿城区",
        "330303": "龙湾区",
        "330304": "瓯海区",
        "330322": "洞头县",
        "330324": "永嘉县",
        "330326": "平阳县",
        "330327": "苍南县",
        "330328": "文成县",
        "330329": "泰顺县",
        "330381": "瑞安市",
        "330382": "乐清市",
        "330383": "其它区",
        "330400": "嘉兴市",
        "330402": "南湖区",
        "330411": "秀洲区",
        "330421": "嘉善县",
        "330424": "海盐县",
        "330481": "海宁市",
        "330482": "平湖市",
        "330483": "桐乡市",
        "330484": "其它区",
        "330500": "湖州市",
        "330502": "吴兴区",
        "330503": "南浔区",
        "330521": "德清县",
        "330522": "长兴县",
        "330523": "安吉县",
        "330524": "其它区",
        "330600": "绍兴市",
        "330602": "越城区",
        "330621": "绍兴县",
        "330624": "新昌县",
        "330681": "诸暨市",
        "330682": "上虞市",
        "330683": "嵊州市",
        "330684": "其它区",
        "330700": "金华市",
        "330702": "婺城区",
        "330703": "金东区",
        "330723": "武义县",
        "330726": "浦江县",
        "330727": "磐安县",
        "330781": "兰溪市",
        "330782": "义乌市",
        "330783": "东阳市",
        "330784": "永康市",
        "330785": "其它区",
        "330800": "衢州市",
        "330802": "柯城区",
        "330803": "衢江区",
        "330822": "常山县",
        "330824": "开化县",
        "330825": "龙游县",
        "330881": "江山市",
        "330882": "其它区",
        "330900": "舟山市",
        "330902": "定海区",
        "330903": "普陀区",
        "330921": "岱山县",
        "330922": "嵊泗县",
        "330923": "其它区",
        "331000": "台州市",
        "331002": "椒江区",
        "331003": "黄岩区",
        "331004": "路桥区",
        "331021": "玉环县",
        "331022": "三门县",
        "331023": "天台县",
        "331024": "仙居县",
        "331081": "温岭市",
        "331082": "临海市",
        "331083": "其它区",
        "331100": "丽水市",
        "331102": "莲都区",
        "331121": "青田县",
        "331122": "缙云县",
        "331123": "遂昌县",
        "331124": "松阳县",
        "331125": "云和县",
        "331126": "庆元县",
        "331127": "景宁畲族自治县",
        "331181": "龙泉市",
        "331182": "其它区",
        "340000": "安徽省",
        "340100": "合肥市",
        "340102": "瑶海区",
        "340103": "庐阳区",
        "340104": "蜀山区",
        "340111": "包河区",
        "340121": "长丰县",
        "340122": "肥东县",
        "340123": "肥西县",
        "340192": "其它区",
        "340200": "芜湖市",
        "340202": "镜湖区",
        "340203": "弋江区",
        "340207": "鸠江区",
        "340208": "三山区",
        "340221": "芜湖县",
        "340222": "繁昌县",
        "340223": "南陵县",
        "340224": "其它区",
        "340300": "蚌埠市",
        "340302": "龙子湖区",
        "340303": "蚌山区",
        "340304": "禹会区",
        "340311": "淮上区",
        "340321": "怀远县",
        "340322": "五河县",
        "340323": "固镇县",
        "340324": "其它区",
        "340400": "淮南市",
        "340402": "大通区",
        "340403": "田家庵区",
        "340404": "谢家集区",
        "340405": "八公山区",
        "340406": "潘集区",
        "340421": "凤台县",
        "340422": "其它区",
        "340500": "马鞍山市",
        "340503": "花山区",
        "340504": "雨山区",
        "340506": "博望区",
        "340521": "当涂县",
        "340522": "其它区",
        "340600": "淮北市",
        "340602": "杜集区",
        "340603": "相山区",
        "340604": "烈山区",
        "340621": "濉溪县",
        "340622": "其它区",
        "340700": "铜陵市",
        "340702": "铜官山区",
        "340703": "狮子山区",
        "340711": "郊区",
        "340721": "铜陵县",
        "340722": "其它区",
        "340800": "安庆市",
        "340802": "迎江区",
        "340803": "大观区",
        "340811": "宜秀区",
        "340822": "怀宁县",
        "340823": "枞阳县",
        "340824": "潜山县",
        "340825": "太湖县",
        "340826": "宿松县",
        "340827": "望江县",
        "340828": "岳西县",
        "340881": "桐城市",
        "340882": "其它区",
        "341000": "黄山市",
        "341002": "屯溪区",
        "341003": "黄山区",
        "341004": "徽州区",
        "341021": "歙县",
        "341022": "休宁县",
        "341023": "黟县",
        "341024": "祁门县",
        "341025": "其它区",
        "341100": "滁州市",
        "341102": "琅琊区",
        "341103": "南谯区",
        "341122": "来安县",
        "341124": "全椒县",
        "341125": "定远县",
        "341126": "凤阳县",
        "341181": "天长市",
        "341182": "明光市",
        "341183": "其它区",
        "341200": "阜阳市",
        "341202": "颍州区",
        "341203": "颍东区",
        "341204": "颍泉区",
        "341221": "临泉县",
        "341222": "太和县",
        "341225": "阜南县",
        "341226": "颍上县",
        "341282": "界首市",
        "341283": "其它区",
        "341300": "宿州市",
        "341302": "埇桥区",
        "341321": "砀山县",
        "341322": "萧县",
        "341323": "灵璧县",
        "341324": "泗县",
        "341325": "其它区",
        "341400": "巢湖市",
        "341421": "庐江县",
        "341422": "无为县",
        "341423": "含山县",
        "341424": "和县",
        "341500": "六安市",
        "341502": "金安区",
        "341503": "裕安区",
        "341521": "寿县",
        "341522": "霍邱县",
        "341523": "舒城县",
        "341524": "金寨县",
        "341525": "霍山县",
        "341526": "其它区",
        "341600": "亳州市",
        "341602": "谯城区",
        "341621": "涡阳县",
        "341622": "蒙城县",
        "341623": "利辛县",
        "341624": "其它区",
        "341700": "池州市",
        "341702": "贵池区",
        "341721": "东至县",
        "341722": "石台县",
        "341723": "青阳县",
        "341724": "其它区",
        "341800": "宣城市",
        "341802": "宣州区",
        "341821": "郎溪县",
        "341822": "广德县",
        "341823": "泾县",
        "341824": "绩溪县",
        "341825": "旌德县",
        "341881": "宁国市",
        "341882": "其它区",
        "350000": "福建省",
        "350100": "福州市",
        "350102": "鼓楼区",
        "350103": "台江区",
        "350104": "仓山区",
        "350105": "马尾区",
        "350111": "晋安区",
        "350121": "闽侯县",
        "350122": "连江县",
        "350123": "罗源县",
        "350124": "闽清县",
        "350125": "永泰县",
        "350128": "平潭县",
        "350181": "福清市",
        "350182": "长乐市",
        "350183": "其它区",
        "350200": "厦门市",
        "350203": "思明区",
        "350205": "海沧区",
        "350206": "湖里区",
        "350211": "集美区",
        "350212": "同安区",
        "350213": "翔安区",
        "350214": "其它区",
        "350300": "莆田市",
        "350302": "城厢区",
        "350303": "涵江区",
        "350304": "荔城区",
        "350305": "秀屿区",
        "350322": "仙游县",
        "350323": "其它区",
        "350400": "三明市",
        "350402": "梅列区",
        "350403": "三元区",
        "350421": "明溪县",
        "350423": "清流县",
        "350424": "宁化县",
        "350425": "大田县",
        "350426": "尤溪县",
        "350427": "沙县",
        "350428": "将乐县",
        "350429": "泰宁县",
        "350430": "建宁县",
        "350481": "永安市",
        "350482": "其它区",
        "350500": "泉州市",
        "350502": "鲤城区",
        "350503": "丰泽区",
        "350504": "洛江区",
        "350505": "泉港区",
        "350521": "惠安县",
        "350524": "安溪县",
        "350525": "永春县",
        "350526": "德化县",
        "350527": "金门县",
        "350581": "石狮市",
        "350582": "晋江市",
        "350583": "南安市",
        "350584": "其它区",
        "350600": "漳州市",
        "350602": "芗城区",
        "350603": "龙文区",
        "350622": "云霄县",
        "350623": "漳浦县",
        "350624": "诏安县",
        "350625": "长泰县",
        "350626": "东山县",
        "350627": "南靖县",
        "350628": "平和县",
        "350629": "华安县",
        "350681": "龙海市",
        "350682": "其它区",
        "350700": "南平市",
        "350702": "延平区",
        "350721": "顺昌县",
        "350722": "浦城县",
        "350723": "光泽县",
        "350724": "松溪县",
        "350725": "政和县",
        "350781": "邵武市",
        "350782": "武夷山市",
        "350783": "建瓯市",
        "350784": "建阳市",
        "350785": "其它区",
        "350800": "龙岩市",
        "350802": "新罗区",
        "350821": "长汀县",
        "350822": "永定县",
        "350823": "上杭县",
        "350824": "武平县",
        "350825": "连城县",
        "350881": "漳平市",
        "350882": "其它区",
        "350900": "宁德市",
        "350902": "蕉城区",
        "350921": "霞浦县",
        "350922": "古田县",
        "350923": "屏南县",
        "350924": "寿宁县",
        "350925": "周宁县",
        "350926": "柘荣县",
        "350981": "福安市",
        "350982": "福鼎市",
        "350983": "其它区",
        "360000": "江西省",
        "360100": "南昌市",
        "360102": "东湖区",
        "360103": "西湖区",
        "360104": "青云谱区",
        "360105": "湾里区",
        "360111": "青山湖区",
        "360121": "南昌县",
        "360122": "新建县",
        "360123": "安义县",
        "360124": "进贤县",
        "360128": "其它区",
        "360200": "景德镇市",
        "360202": "昌江区",
        "360203": "珠山区",
        "360222": "浮梁县",
        "360281": "乐平市",
        "360282": "其它区",
        "360300": "萍乡市",
        "360302": "安源区",
        "360313": "湘东区",
        "360321": "莲花县",
        "360322": "上栗县",
        "360323": "芦溪县",
        "360324": "其它区",
        "360400": "九江市",
        "360402": "庐山区",
        "360403": "浔阳区",
        "360421": "九江县",
        "360423": "武宁县",
        "360424": "修水县",
        "360425": "永修县",
        "360426": "德安县",
        "360427": "星子县",
        "360428": "都昌县",
        "360429": "湖口县",
        "360430": "彭泽县",
        "360481": "瑞昌市",
        "360482": "其它区",
        "360483": "共青城市",
        "360500": "新余市",
        "360502": "渝水区",
        "360521": "分宜县",
        "360522": "其它区",
        "360600": "鹰潭市",
        "360602": "月湖区",
        "360622": "余江县",
        "360681": "贵溪市",
        "360682": "其它区",
        "360700": "赣州市",
        "360702": "章贡区",
        "360721": "赣县",
        "360722": "信丰县",
        "360723": "大余县",
        "360724": "上犹县",
        "360725": "崇义县",
        "360726": "安远县",
        "360727": "龙南县",
        "360728": "定南县",
        "360729": "全南县",
        "360730": "宁都县",
        "360731": "于都县",
        "360732": "兴国县",
        "360733": "会昌县",
        "360734": "寻乌县",
        "360735": "石城县",
        "360781": "瑞金市",
        "360782": "南康市",
        "360783": "其它区",
        "360800": "吉安市",
        "360802": "吉州区",
        "360803": "青原区",
        "360821": "吉安县",
        "360822": "吉水县",
        "360823": "峡江县",
        "360824": "新干县",
        "360825": "永丰县",
        "360826": "泰和县",
        "360827": "遂川县",
        "360828": "万安县",
        "360829": "安福县",
        "360830": "永新县",
        "360881": "井冈山市",
        "360882": "其它区",
        "360900": "宜春市",
        "360902": "袁州区",
        "360921": "奉新县",
        "360922": "万载县",
        "360923": "上高县",
        "360924": "宜丰县",
        "360925": "靖安县",
        "360926": "铜鼓县",
        "360981": "丰城市",
        "360982": "樟树市",
        "360983": "高安市",
        "360984": "其它区",
        "361000": "抚州市",
        "361002": "临川区",
        "361021": "南城县",
        "361022": "黎川县",
        "361023": "南丰县",
        "361024": "崇仁县",
        "361025": "乐安县",
        "361026": "宜黄县",
        "361027": "金溪县",
        "361028": "资溪县",
        "361029": "东乡县",
        "361030": "广昌县",
        "361031": "其它区",
        "361100": "上饶市",
        "361102": "信州区",
        "361121": "上饶县",
        "361122": "广丰县",
        "361123": "玉山县",
        "361124": "铅山县",
        "361125": "横峰县",
        "361126": "弋阳县",
        "361127": "余干县",
        "361128": "鄱阳县",
        "361129": "万年县",
        "361130": "婺源县",
        "361181": "德兴市",
        "361182": "其它区",
        "370000": "山东省",
        "370100": "济南市",
        "370102": "历下区",
        "370103": "市中区",
        "370104": "槐荫区",
        "370105": "天桥区",
        "370112": "历城区",
        "370113": "长清区",
        "370124": "平阴县",
        "370125": "济阳县",
        "370126": "商河县",
        "370181": "章丘市",
        "370182": "其它区",
        "370200": "青岛市",
        "370202": "市南区",
        "370203": "市北区",
        "370211": "黄岛区",
        "370212": "崂山区",
        "370213": "李沧区",
        "370214": "城阳区",
        "370281": "胶州市",
        "370282": "即墨市",
        "370283": "平度市",
        "370285": "莱西市",
        "370286": "其它区",
        "370300": "淄博市",
        "370302": "淄川区",
        "370303": "张店区",
        "370304": "博山区",
        "370305": "临淄区",
        "370306": "周村区",
        "370321": "桓台县",
        "370322": "高青县",
        "370323": "沂源县",
        "370324": "其它区",
        "370400": "枣庄市",
        "370402": "市中区",
        "370403": "薛城区",
        "370404": "峄城区",
        "370405": "台儿庄区",
        "370406": "山亭区",
        "370481": "滕州市",
        "370482": "其它区",
        "370500": "东营市",
        "370502": "东营区",
        "370503": "河口区",
        "370521": "垦利县",
        "370522": "利津县",
        "370523": "广饶县",
        "370591": "其它区",
        "370600": "烟台市",
        "370602": "芝罘区",
        "370611": "福山区",
        "370612": "牟平区",
        "370613": "莱山区",
        "370634": "长岛县",
        "370681": "龙口市",
        "370682": "莱阳市",
        "370683": "莱州市",
        "370684": "蓬莱市",
        "370685": "招远市",
        "370686": "栖霞市",
        "370687": "海阳市",
        "370688": "其它区",
        "370700": "潍坊市",
        "370702": "潍城区",
        "370703": "寒亭区",
        "370704": "坊子区",
        "370705": "奎文区",
        "370724": "临朐县",
        "370725": "昌乐县",
        "370781": "青州市",
        "370782": "诸城市",
        "370783": "寿光市",
        "370784": "安丘市",
        "370785": "高密市",
        "370786": "昌邑市",
        "370787": "其它区",
        "370800": "济宁市",
        "370802": "市中区",
        "370811": "任城区",
        "370826": "微山县",
        "370827": "鱼台县",
        "370828": "金乡县",
        "370829": "嘉祥县",
        "370830": "汶上县",
        "370831": "泗水县",
        "370832": "梁山县",
        "370881": "曲阜市",
        "370882": "兖州市",
        "370883": "邹城市",
        "370884": "其它区",
        "370900": "泰安市",
        "370902": "泰山区",
        "370903": "岱岳区",
        "370921": "宁阳县",
        "370923": "东平县",
        "370982": "新泰市",
        "370983": "肥城市",
        "370984": "其它区",
        "371000": "威海市",
        "371002": "环翠区",
        "371081": "文登市",
        "371082": "荣成市",
        "371083": "乳山市",
        "371084": "其它区",
        "371100": "日照市",
        "371102": "东港区",
        "371103": "岚山区",
        "371121": "五莲县",
        "371122": "莒县",
        "371123": "其它区",
        "371200": "莱芜市",
        "371202": "莱城区",
        "371203": "钢城区",
        "371204": "其它区",
        "371300": "临沂市",
        "371302": "兰山区",
        "371311": "罗庄区",
        "371312": "河东区",
        "371321": "沂南县",
        "371322": "郯城县",
        "371323": "沂水县",
        "371324": "苍山县",
        "371325": "费县",
        "371326": "平邑县",
        "371327": "莒南县",
        "371328": "蒙阴县",
        "371329": "临沭县",
        "371330": "其它区",
        "371400": "德州市",
        "371402": "德城区",
        "371421": "陵县",
        "371422": "宁津县",
        "371423": "庆云县",
        "371424": "临邑县",
        "371425": "齐河县",
        "371426": "平原县",
        "371427": "夏津县",
        "371428": "武城县",
        "371481": "乐陵市",
        "371482": "禹城市",
        "371483": "其它区",
        "371500": "聊城市",
        "371502": "东昌府区",
        "371521": "阳谷县",
        "371522": "莘县",
        "371523": "茌平县",
        "371524": "东阿县",
        "371525": "冠县",
        "371526": "高唐县",
        "371581": "临清市",
        "371582": "其它区",
        "371600": "滨州市",
        "371602": "滨城区",
        "371621": "惠民县",
        "371622": "阳信县",
        "371623": "无棣县",
        "371624": "沾化县",
        "371625": "博兴县",
        "371626": "邹平县",
        "371627": "其它区",
        "371700": "菏泽市",
        "371702": "牡丹区",
        "371721": "曹县",
        "371722": "单县",
        "371723": "成武县",
        "371724": "巨野县",
        "371725": "郓城县",
        "371726": "鄄城县",
        "371727": "定陶县",
        "371728": "东明县",
        "371729": "其它区",
        "410000": "河南省",
        "410100": "郑州市",
        "410102": "中原区",
        "410103": "二七区",
        "410104": "管城回族区",
        "410105": "金水区",
        "410106": "上街区",
        "410108": "惠济区",
        "410122": "中牟县",
        "410181": "巩义市",
        "410182": "荥阳市",
        "410183": "新密市",
        "410184": "新郑市",
        "410185": "登封市",
        "410188": "其它区",
        "410200": "开封市",
        "410202": "龙亭区",
        "410203": "顺河回族区",
        "410204": "鼓楼区",
        "410205": "禹王台区",
        "410211": "金明区",
        "410221": "杞县",
        "410222": "通许县",
        "410223": "尉氏县",
        "410224": "开封县",
        "410225": "兰考县",
        "410226": "其它区",
        "410300": "洛阳市",
        "410302": "老城区",
        "410303": "西工区",
        "410304": "瀍河回族区",
        "410305": "涧西区",
        "410306": "吉利区",
        "410307": "洛龙区",
        "410322": "孟津县",
        "410323": "新安县",
        "410324": "栾川县",
        "410325": "嵩县",
        "410326": "汝阳县",
        "410327": "宜阳县",
        "410328": "洛宁县",
        "410329": "伊川县",
        "410381": "偃师市",
        "410400": "平顶山市",
        "410402": "新华区",
        "410403": "卫东区",
        "410404": "石龙区",
        "410411": "湛河区",
        "410421": "宝丰县",
        "410422": "叶县",
        "410423": "鲁山县",
        "410425": "郏县",
        "410481": "舞钢市",
        "410482": "汝州市",
        "410483": "其它区",
        "410500": "安阳市",
        "410502": "文峰区",
        "410503": "北关区",
        "410505": "殷都区",
        "410506": "龙安区",
        "410522": "安阳县",
        "410523": "汤阴县",
        "410526": "滑县",
        "410527": "内黄县",
        "410581": "林州市",
        "410582": "其它区",
        "410600": "鹤壁市",
        "410602": "鹤山区",
        "410603": "山城区",
        "410611": "淇滨区",
        "410621": "浚县",
        "410622": "淇县",
        "410623": "其它区",
        "410700": "新乡市",
        "410702": "红旗区",
        "410703": "卫滨区",
        "410704": "凤泉区",
        "410711": "牧野区",
        "410721": "新乡县",
        "410724": "获嘉县",
        "410725": "原阳县",
        "410726": "延津县",
        "410727": "封丘县",
        "410728": "长垣县",
        "410781": "卫辉市",
        "410782": "辉县市",
        "410783": "其它区",
        "410800": "焦作市",
        "410802": "解放区",
        "410803": "中站区",
        "410804": "马村区",
        "410811": "山阳区",
        "410821": "修武县",
        "410822": "博爱县",
        "410823": "武陟县",
        "410825": "温县",
        "410881": "济源市",
        "410882": "沁阳市",
        "410883": "孟州市",
        "410884": "其它区",
        "410900": "濮阳市",
        "410902": "华龙区",
        "410922": "清丰县",
        "410923": "南乐县",
        "410926": "范县",
        "410927": "台前县",
        "410928": "濮阳县",
        "410929": "其它区",
        "411000": "许昌市",
        "411002": "魏都区",
        "411023": "许昌县",
        "411024": "鄢陵县",
        "411025": "襄城县",
        "411081": "禹州市",
        "411082": "长葛市",
        "411083": "其它区",
        "411100": "漯河市",
        "411102": "源汇区",
        "411103": "郾城区",
        "411104": "召陵区",
        "411121": "舞阳县",
        "411122": "临颍县",
        "411123": "其它区",
        "411200": "三门峡市",
        "411202": "湖滨区",
        "411221": "渑池县",
        "411222": "陕县",
        "411224": "卢氏县",
        "411281": "义马市",
        "411282": "灵宝市",
        "411283": "其它区",
        "411300": "南阳市",
        "411302": "宛城区",
        "411303": "卧龙区",
        "411321": "南召县",
        "411322": "方城县",
        "411323": "西峡县",
        "411324": "镇平县",
        "411325": "内乡县",
        "411326": "淅川县",
        "411327": "社旗县",
        "411328": "唐河县",
        "411329": "新野县",
        "411330": "桐柏县",
        "411381": "邓州市",
        "411382": "其它区",
        "411400": "商丘市",
        "411402": "梁园区",
        "411403": "睢阳区",
        "411421": "民权县",
        "411422": "睢县",
        "411423": "宁陵县",
        "411424": "柘城县",
        "411425": "虞城县",
        "411426": "夏邑县",
        "411481": "永城市",
        "411482": "其它区",
        "411500": "信阳市",
        "411502": "浉河区",
        "411503": "平桥区",
        "411521": "罗山县",
        "411522": "光山县",
        "411523": "新县",
        "411524": "商城县",
        "411525": "固始县",
        "411526": "潢川县",
        "411527": "淮滨县",
        "411528": "息县",
        "411529": "其它区",
        "411600": "周口市",
        "411602": "川汇区",
        "411621": "扶沟县",
        "411622": "西华县",
        "411623": "商水县",
        "411624": "沈丘县",
        "411625": "郸城县",
        "411626": "淮阳县",
        "411627": "太康县",
        "411628": "鹿邑县",
        "411681": "项城市",
        "411682": "其它区",
        "411700": "驻马店市",
        "411702": "驿城区",
        "411721": "西平县",
        "411722": "上蔡县",
        "411723": "平舆县",
        "411724": "正阳县",
        "411725": "确山县",
        "411726": "泌阳县",
        "411727": "汝南县",
        "411728": "遂平县",
        "411729": "新蔡县",
        "411730": "其它区",
        "420000": "湖北省",
        "420100": "武汉市",
        "420102": "江岸区",
        "420103": "江汉区",
        "420104": "硚口区",
        "420105": "汉阳区",
        "420106": "武昌区",
        "420107": "青山区",
        "420111": "洪山区",
        "420112": "东西湖区",
        "420113": "汉南区",
        "420114": "蔡甸区",
        "420115": "江夏区",
        "420116": "黄陂区",
        "420117": "新洲区",
        "420118": "其它区",
        "420200": "黄石市",
        "420202": "黄石港区",
        "420203": "西塞山区",
        "420204": "下陆区",
        "420205": "铁山区",
        "420222": "阳新县",
        "420281": "大冶市",
        "420282": "其它区",
        "420300": "十堰市",
        "420302": "茅箭区",
        "420303": "张湾区",
        "420321": "郧县",
        "420322": "郧西县",
        "420323": "竹山县",
        "420324": "竹溪县",
        "420325": "房县",
        "420381": "丹江口市",
        "420383": "其它区",
        "420500": "宜昌市",
        "420502": "西陵区",
        "420503": "伍家岗区",
        "420504": "点军区",
        "420505": "猇亭区",
        "420506": "夷陵区",
        "420525": "远安县",
        "420526": "兴山县",
        "420527": "秭归县",
        "420528": "长阳土家族自治县",
        "420529": "五峰土家族自治县",
        "420581": "宜都市",
        "420582": "当阳市",
        "420583": "枝江市",
        "420584": "其它区",
        "420600": "襄阳市",
        "420602": "襄城区",
        "420606": "樊城区",
        "420607": "襄州区",
        "420624": "南漳县",
        "420625": "谷城县",
        "420626": "保康县",
        "420682": "老河口市",
        "420683": "枣阳市",
        "420684": "宜城市",
        "420685": "其它区",
        "420700": "鄂州市",
        "420702": "梁子湖区",
        "420703": "华容区",
        "420704": "鄂城区",
        "420705": "其它区",
        "420800": "荆门市",
        "420802": "东宝区",
        "420804": "掇刀区",
        "420821": "京山县",
        "420822": "沙洋县",
        "420881": "钟祥市",
        "420882": "其它区",
        "420900": "孝感市",
        "420902": "孝南区",
        "420921": "孝昌县",
        "420922": "大悟县",
        "420923": "云梦县",
        "420981": "应城市",
        "420982": "安陆市",
        "420984": "汉川市",
        "420985": "其它区",
        "421000": "荆州市",
        "421002": "沙市区",
        "421003": "荆州区",
        "421022": "公安县",
        "421023": "监利县",
        "421024": "江陵县",
        "421081": "石首市",
        "421083": "洪湖市",
        "421087": "松滋市",
        "421088": "其它区",
        "421100": "黄冈市",
        "421102": "黄州区",
        "421121": "团风县",
        "421122": "红安县",
        "421123": "罗田县",
        "421124": "英山县",
        "421125": "浠水县",
        "421126": "蕲春县",
        "421127": "黄梅县",
        "421181": "麻城市",
        "421182": "武穴市",
        "421183": "其它区",
        "421200": "咸宁市",
        "421202": "咸安区",
        "421221": "嘉鱼县",
        "421222": "通城县",
        "421223": "崇阳县",
        "421224": "通山县",
        "421281": "赤壁市",
        "421283": "其它区",
        "421300": "随州市",
        "421302": "曾都区",
        "421321": "随县",
        "421381": "广水市",
        "421382": "其它区",
        "422800": "恩施土家族苗族自治州",
        "422801": "恩施市",
        "422802": "利川市",
        "422822": "建始县",
        "422823": "巴东县",
        "422825": "宣恩县",
        "422826": "咸丰县",
        "422827": "来凤县",
        "422828": "鹤峰县",
        "422829": "其它区",
        "429004": "仙桃市",
        "429005": "潜江市",
        "429006": "天门市",
        "429021": "神农架林区",
        "430000": "湖南省",
        "430100": "长沙市",
        "430102": "芙蓉区",
        "430103": "天心区",
        "430104": "岳麓区",
        "430105": "开福区",
        "430111": "雨花区",
        "430121": "长沙县",
        "430122": "望城区",
        "430124": "宁乡县",
        "430181": "浏阳市",
        "430182": "其它区",
        "430200": "株洲市",
        "430202": "荷塘区",
        "430203": "芦淞区",
        "430204": "石峰区",
        "430211": "天元区",
        "430221": "株洲县",
        "430223": "攸县",
        "430224": "茶陵县",
        "430225": "炎陵县",
        "430281": "醴陵市",
        "430282": "其它区",
        "430300": "湘潭市",
        "430302": "雨湖区",
        "430304": "岳塘区",
        "430321": "湘潭县",
        "430381": "湘乡市",
        "430382": "韶山市",
        "430383": "其它区",
        "430400": "衡阳市",
        "430405": "珠晖区",
        "430406": "雁峰区",
        "430407": "石鼓区",
        "430408": "蒸湘区",
        "430412": "南岳区",
        "430421": "衡阳县",
        "430422": "衡南县",
        "430423": "衡山县",
        "430424": "衡东县",
        "430426": "祁东县",
        "430481": "耒阳市",
        "430482": "常宁市",
        "430483": "其它区",
        "430500": "邵阳市",
        "430502": "双清区",
        "430503": "大祥区",
        "430511": "北塔区",
        "430521": "邵东县",
        "430522": "新邵县",
        "430523": "邵阳县",
        "430524": "隆回县",
        "430525": "洞口县",
        "430527": "绥宁县",
        "430528": "新宁县",
        "430529": "城步苗族自治县",
        "430581": "武冈市",
        "430582": "其它区",
        "430600": "岳阳市",
        "430602": "岳阳楼区",
        "430603": "云溪区",
        "430611": "君山区",
        "430621": "岳阳县",
        "430623": "华容县",
        "430624": "湘阴县",
        "430626": "平江县",
        "430681": "汨罗市",
        "430682": "临湘市",
        "430683": "其它区",
        "430700": "常德市",
        "430702": "武陵区",
        "430703": "鼎城区",
        "430721": "安乡县",
        "430722": "汉寿县",
        "430723": "澧县",
        "430724": "临澧县",
        "430725": "桃源县",
        "430726": "石门县",
        "430781": "津市市",
        "430782": "其它区",
        "430800": "张家界市",
        "430802": "永定区",
        "430811": "武陵源区",
        "430821": "慈利县",
        "430822": "桑植县",
        "430823": "其它区",
        "430900": "益阳市",
        "430902": "资阳区",
        "430903": "赫山区",
        "430921": "南县",
        "430922": "桃江县",
        "430923": "安化县",
        "430981": "沅江市",
        "430982": "其它区",
        "431000": "郴州市",
        "431002": "北湖区",
        "431003": "苏仙区",
        "431021": "桂阳县",
        "431022": "宜章县",
        "431023": "永兴县",
        "431024": "嘉禾县",
        "431025": "临武县",
        "431026": "汝城县",
        "431027": "桂东县",
        "431028": "安仁县",
        "431081": "资兴市",
        "431082": "其它区",
        "431100": "永州市",
        "431102": "零陵区",
        "431103": "冷水滩区",
        "431121": "祁阳县",
        "431122": "东安县",
        "431123": "双牌县",
        "431124": "道县",
        "431125": "江永县",
        "431126": "宁远县",
        "431127": "蓝山县",
        "431128": "新田县",
        "431129": "江华瑶族自治县",
        "431130": "其它区",
        "431200": "怀化市",
        "431202": "鹤城区",
        "431221": "中方县",
        "431222": "沅陵县",
        "431223": "辰溪县",
        "431224": "溆浦县",
        "431225": "会同县",
        "431226": "麻阳苗族自治县",
        "431227": "新晃侗族自治县",
        "431228": "芷江侗族自治县",
        "431229": "靖州苗族侗族自治县",
        "431230": "通道侗族自治县",
        "431281": "洪江市",
        "431282": "其它区",
        "431300": "娄底市",
        "431302": "娄星区",
        "431321": "双峰县",
        "431322": "新化县",
        "431381": "冷水江市",
        "431382": "涟源市",
        "431383": "其它区",
        "433100": "湘西土家族苗族自治州",
        "433101": "吉首市",
        "433122": "泸溪县",
        "433123": "凤凰县",
        "433124": "花垣县",
        "433125": "保靖县",
        "433126": "古丈县",
        "433127": "永顺县",
        "433130": "龙山县",
        "433131": "其它区",
        "440000": "广东省",
        "440100": "广州市",
        "440103": "荔湾区",
        "440104": "越秀区",
        "440105": "海珠区",
        "440106": "天河区",
        "440111": "白云区",
        "440112": "黄埔区",
        "440113": "番禺区",
        "440114": "花都区",
        "440115": "南沙区",
        "440116": "萝岗区",
        "440183": "增城市",
        "440184": "从化市",
        "440189": "其它区",
        "440200": "韶关市",
        "440203": "武江区",
        "440204": "浈江区",
        "440205": "曲江区",
        "440222": "始兴县",
        "440224": "仁化县",
        "440229": "翁源县",
        "440232": "乳源瑶族自治县",
        "440233": "新丰县",
        "440281": "乐昌市",
        "440282": "南雄市",
        "440283": "其它区",
        "440300": "深圳市",
        "440303": "罗湖区",
        "440304": "福田区",
        "440305": "南山区",
        "440306": "宝安区",
        "440307": "龙岗区",
        "440308": "盐田区",
        "440309": "其它区",
        "440320": "光明新区",
        "440321": "坪山新区",
        "440322": "大鹏新区",
        "440323": "龙华新区",
        "440400": "珠海市",
        "440402": "香洲区",
        "440403": "斗门区",
        "440404": "金湾区",
        "440488": "其它区",
        "440500": "汕头市",
        "440507": "龙湖区",
        "440511": "金平区",
        "440512": "濠江区",
        "440513": "潮阳区",
        "440514": "潮南区",
        "440515": "澄海区",
        "440523": "南澳县",
        "440524": "其它区",
        "440600": "佛山市",
        "440604": "禅城区",
        "440605": "南海区",
        "440606": "顺德区",
        "440607": "三水区",
        "440608": "高明区",
        "440609": "其它区",
        "440700": "江门市",
        "440703": "蓬江区",
        "440704": "江海区",
        "440705": "新会区",
        "440781": "台山市",
        "440783": "开平市",
        "440784": "鹤山市",
        "440785": "恩平市",
        "440786": "其它区",
        "440800": "湛江市",
        "440802": "赤坎区",
        "440803": "霞山区",
        "440804": "坡头区",
        "440811": "麻章区",
        "440823": "遂溪县",
        "440825": "徐闻县",
        "440881": "廉江市",
        "440882": "雷州市",
        "440883": "吴川市",
        "440884": "其它区",
        "440900": "茂名市",
        "440902": "茂南区",
        "440903": "茂港区",
        "440923": "电白县",
        "440981": "高州市",
        "440982": "化州市",
        "440983": "信宜市",
        "440984": "其它区",
        "441200": "肇庆市",
        "441202": "端州区",
        "441203": "鼎湖区",
        "441223": "广宁县",
        "441224": "怀集县",
        "441225": "封开县",
        "441226": "德庆县",
        "441283": "高要市",
        "441284": "四会市",
        "441285": "其它区",
        "441300": "惠州市",
        "441302": "惠城区",
        "441303": "惠阳区",
        "441322": "博罗县",
        "441323": "惠东县",
        "441324": "龙门县",
        "441325": "其它区",
        "441400": "梅州市",
        "441402": "梅江区",
        "441421": "梅县",
        "441422": "大埔县",
        "441423": "丰顺县",
        "441424": "五华县",
        "441426": "平远县",
        "441427": "蕉岭县",
        "441481": "兴宁市",
        "441482": "其它区",
        "441500": "汕尾市",
        "441502": "城区",
        "441521": "海丰县",
        "441523": "陆河县",
        "441581": "陆丰市",
        "441582": "其它区",
        "441600": "河源市",
        "441602": "源城区",
        "441621": "紫金县",
        "441622": "龙川县",
        "441623": "连平县",
        "441624": "和平县",
        "441625": "东源县",
        "441626": "其它区",
        "441700": "阳江市",
        "441702": "江城区",
        "441721": "阳西县",
        "441723": "阳东县",
        "441781": "阳春市",
        "441782": "其它区",
        "441800": "清远市",
        "441802": "清城区",
        "441821": "佛冈县",
        "441823": "阳山县",
        "441825": "连山壮族瑶族自治县",
        "441826": "连南瑶族自治县",
        "441827": "清新区",
        "441881": "英德市",
        "441882": "连州市",
        "441883": "其它区",
        "441900": "东莞市",
        "442000": "中山市",
        "442101": "东沙群岛",
        "445100": "潮州市",
        "445102": "湘桥区",
        "445121": "潮安区",
        "445122": "饶平县",
        "445186": "其它区",
        "445200": "揭阳市",
        "445202": "榕城区",
        "445221": "揭东区",
        "445222": "揭西县",
        "445224": "惠来县",
        "445281": "普宁市",
        "445285": "其它区",
        "445300": "云浮市",
        "445302": "云城区",
        "445321": "新兴县",
        "445322": "郁南县",
        "445323": "云安县",
        "445381": "罗定市",
        "445382": "其它区",
        "450000": "广西壮族自治区",
        "450100": "南宁市",
        "450102": "兴宁区",
        "450103": "青秀区",
        "450105": "江南区",
        "450107": "西乡塘区",
        "450108": "良庆区",
        "450109": "邕宁区",
        "450122": "武鸣县",
        "450123": "隆安县",
        "450124": "马山县",
        "450125": "上林县",
        "450126": "宾阳县",
        "450127": "横县",
        "450128": "其它区",
        "450200": "柳州市",
        "450202": "城中区",
        "450203": "鱼峰区",
        "450204": "柳南区",
        "450205": "柳北区",
        "450221": "柳江县",
        "450222": "柳城县",
        "450223": "鹿寨县",
        "450224": "融安县",
        "450225": "融水苗族自治县",
        "450226": "三江侗族自治县",
        "450227": "其它区",
        "450300": "桂林市",
        "450302": "秀峰区",
        "450303": "叠彩区",
        "450304": "象山区",
        "450305": "七星区",
        "450311": "雁山区",
        "450321": "阳朔县",
        "450322": "临桂区",
        "450323": "灵川县",
        "450324": "全州县",
        "450325": "兴安县",
        "450326": "永福县",
        "450327": "灌阳县",
        "450328": "龙胜各族自治县",
        "450329": "资源县",
        "450330": "平乐县",
        "450331": "荔浦县",
        "450332": "恭城瑶族自治县",
        "450333": "其它区",
        "450400": "梧州市",
        "450403": "万秀区",
        "450405": "长洲区",
        "450406": "龙圩区",
        "450421": "苍梧县",
        "450422": "藤县",
        "450423": "蒙山县",
        "450481": "岑溪市",
        "450482": "其它区",
        "450500": "北海市",
        "450502": "海城区",
        "450503": "银海区",
        "450512": "铁山港区",
        "450521": "合浦县",
        "450522": "其它区",
        "450600": "防城港市",
        "450602": "港口区",
        "450603": "防城区",
        "450621": "上思县",
        "450681": "东兴市",
        "450682": "其它区",
        "450700": "钦州市",
        "450702": "钦南区",
        "450703": "钦北区",
        "450721": "灵山县",
        "450722": "浦北县",
        "450723": "其它区",
        "450800": "贵港市",
        "450802": "港北区",
        "450803": "港南区",
        "450804": "覃塘区",
        "450821": "平南县",
        "450881": "桂平市",
        "450882": "其它区",
        "450900": "玉林市",
        "450902": "玉州区",
        "450903": "福绵区",
        "450921": "容县",
        "450922": "陆川县",
        "450923": "博白县",
        "450924": "兴业县",
        "450981": "北流市",
        "450982": "其它区",
        "451000": "百色市",
        "451002": "右江区",
        "451021": "田阳县",
        "451022": "田东县",
        "451023": "平果县",
        "451024": "德保县",
        "451025": "靖西县",
        "451026": "那坡县",
        "451027": "凌云县",
        "451028": "乐业县",
        "451029": "田林县",
        "451030": "西林县",
        "451031": "隆林各族自治县",
        "451032": "其它区",
        "451100": "贺州市",
        "451102": "八步区",
        "451119": "平桂管理区",
        "451121": "昭平县",
        "451122": "钟山县",
        "451123": "富川瑶族自治县",
        "451124": "其它区",
        "451200": "河池市",
        "451202": "金城江区",
        "451221": "南丹县",
        "451222": "天峨县",
        "451223": "凤山县",
        "451224": "东兰县",
        "451225": "罗城仫佬族自治县",
        "451226": "环江毛南族自治县",
        "451227": "巴马瑶族自治县",
        "451228": "都安瑶族自治县",
        "451229": "大化瑶族自治县",
        "451281": "宜州市",
        "451282": "其它区",
        "451300": "来宾市",
        "451302": "兴宾区",
        "451321": "忻城县",
        "451322": "象州县",
        "451323": "武宣县",
        "451324": "金秀瑶族自治县",
        "451381": "合山市",
        "451382": "其它区",
        "451400": "崇左市",
        "451402": "江州区",
        "451421": "扶绥县",
        "451422": "宁明县",
        "451423": "龙州县",
        "451424": "大新县",
        "451425": "天等县",
        "451481": "凭祥市",
        "451482": "其它区",
        "460000": "海南省",
        "460100": "海口市",
        "460105": "秀英区",
        "460106": "龙华区",
        "460107": "琼山区",
        "460108": "美兰区",
        "460109": "其它区",
        "460200": "三亚市",
        "460300": "三沙市",
        "460321": "西沙群岛",
        "460322": "南沙群岛",
        "460323": "中沙群岛的岛礁及其海域",
        "469001": "五指山市",
        "469002": "琼海市",
        "469003": "儋州市",
        "469005": "文昌市",
        "469006": "万宁市",
        "469007": "东方市",
        "469025": "定安县",
        "469026": "屯昌县",
        "469027": "澄迈县",
        "469028": "临高县",
        "469030": "白沙黎族自治县",
        "469031": "昌江黎族自治县",
        "469033": "乐东黎族自治县",
        "469034": "陵水黎族自治县",
        "469035": "保亭黎族苗族自治县",
        "469036": "琼中黎族苗族自治县",
        "471005": "其它区",
        "500000": "重庆",
        "500100": "重庆市",
        "500101": "万州区",
        "500102": "涪陵区",
        "500103": "渝中区",
        "500104": "大渡口区",
        "500105": "江北区",
        "500106": "沙坪坝区",
        "500107": "九龙坡区",
        "500108": "南岸区",
        "500109": "北碚区",
        "500110": "万盛区",
        "500111": "双桥区",
        "500112": "渝北区",
        "500113": "巴南区",
        "500114": "黔江区",
        "500115": "长寿区",
        "500222": "綦江区",
        "500223": "潼南县",
        "500224": "铜梁县",
        "500225": "大足区",
        "500226": "荣昌县",
        "500227": "璧山县",
        "500228": "梁平县",
        "500229": "城口县",
        "500230": "丰都县",
        "500231": "垫江县",
        "500232": "武隆县",
        "500233": "忠县",
        "500234": "开县",
        "500235": "云阳县",
        "500236": "奉节县",
        "500237": "巫山县",
        "500238": "巫溪县",
        "500240": "石柱土家族自治县",
        "500241": "秀山土家族苗族自治县",
        "500242": "酉阳土家族苗族自治县",
        "500243": "彭水苗族土家族自治县",
        "500381": "江津区",
        "500382": "合川区",
        "500383": "永川区",
        "500384": "南川区",
        "500385": "其它区",
        "510000": "四川省",
        "510100": "成都市",
        "510104": "锦江区",
        "510105": "青羊区",
        "510106": "金牛区",
        "510107": "武侯区",
        "510108": "成华区",
        "510112": "龙泉驿区",
        "510113": "青白江区",
        "510114": "新都区",
        "510115": "温江区",
        "510121": "金堂县",
        "510122": "双流县",
        "510124": "郫县",
        "510129": "大邑县",
        "510131": "蒲江县",
        "510132": "新津县",
        "510181": "都江堰市",
        "510182": "彭州市",
        "510183": "邛崃市",
        "510184": "崇州市",
        "510185": "其它区",
        "510300": "自贡市",
        "510302": "自流井区",
        "510303": "贡井区",
        "510304": "大安区",
        "510311": "沿滩区",
        "510321": "荣县",
        "510322": "富顺县",
        "510323": "其它区",
        "510400": "攀枝花市",
        "510402": "东区",
        "510403": "西区",
        "510411": "仁和区",
        "510421": "米易县",
        "510422": "盐边县",
        "510423": "其它区",
        "510500": "泸州市",
        "510502": "江阳区",
        "510503": "纳溪区",
        "510504": "龙马潭区",
        "510521": "泸县",
        "510522": "合江县",
        "510524": "叙永县",
        "510525": "古蔺县",
        "510526": "其它区",
        "510600": "德阳市",
        "510603": "旌阳区",
        "510623": "中江县",
        "510626": "罗江县",
        "510681": "广汉市",
        "510682": "什邡市",
        "510683": "绵竹市",
        "510684": "其它区",
        "510700": "绵阳市",
        "510703": "涪城区",
        "510704": "游仙区",
        "510722": "三台县",
        "510723": "盐亭县",
        "510724": "安县",
        "510725": "梓潼县",
        "510726": "北川羌族自治县",
        "510727": "平武县",
        "510781": "江油市",
        "510782": "其它区",
        "510800": "广元市",
        "510802": "利州区",
        "510811": "昭化区",
        "510812": "朝天区",
        "510821": "旺苍县",
        "510822": "青川县",
        "510823": "剑阁县",
        "510824": "苍溪县",
        "510825": "其它区",
        "510900": "遂宁市",
        "510903": "船山区",
        "510904": "安居区",
        "510921": "蓬溪县",
        "510922": "射洪县",
        "510923": "大英县",
        "510924": "其它区",
        "511000": "内江市",
        "511002": "市中区",
        "511011": "东兴区",
        "511024": "威远县",
        "511025": "资中县",
        "511028": "隆昌县",
        "511029": "其它区",
        "511100": "乐山市",
        "511102": "市中区",
        "511111": "沙湾区",
        "511112": "五通桥区",
        "511113": "金口河区",
        "511123": "犍为县",
        "511124": "井研县",
        "511126": "夹江县",
        "511129": "沐川县",
        "511132": "峨边彝族自治县",
        "511133": "马边彝族自治县",
        "511181": "峨眉山市",
        "511182": "其它区",
        "511300": "南充市",
        "511302": "顺庆区",
        "511303": "高坪区",
        "511304": "嘉陵区",
        "511321": "南部县",
        "511322": "营山县",
        "511323": "蓬安县",
        "511324": "仪陇县",
        "511325": "西充县",
        "511381": "阆中市",
        "511382": "其它区",
        "511400": "眉山市",
        "511402": "东坡区",
        "511421": "仁寿县",
        "511422": "彭山县",
        "511423": "洪雅县",
        "511424": "丹棱县",
        "511425": "青神县",
        "511426": "其它区",
        "511500": "宜宾市",
        "511502": "翠屏区",
        "511521": "宜宾县",
        "511522": "南溪区",
        "511523": "江安县",
        "511524": "长宁县",
        "511525": "高县",
        "511526": "珙县",
        "511527": "筠连县",
        "511528": "兴文县",
        "511529": "屏山县",
        "511530": "其它区",
        "511600": "广安市",
        "511602": "广安区",
        "511603": "前锋区",
        "511621": "岳池县",
        "511622": "武胜县",
        "511623": "邻水县",
        "511681": "华蓥市",
        "511683": "其它区",
        "511700": "达州市",
        "511702": "通川区",
        "511721": "达川区",
        "511722": "宣汉县",
        "511723": "开江县",
        "511724": "大竹县",
        "511725": "渠县",
        "511781": "万源市",
        "511782": "其它区",
        "511800": "雅安市",
        "511802": "雨城区",
        "511821": "名山区",
        "511822": "荥经县",
        "511823": "汉源县",
        "511824": "石棉县",
        "511825": "天全县",
        "511826": "芦山县",
        "511827": "宝兴县",
        "511828": "其它区",
        "511900": "巴中市",
        "511902": "巴州区",
        "511903": "恩阳区",
        "511921": "通江县",
        "511922": "南江县",
        "511923": "平昌县",
        "511924": "其它区",
        "512000": "资阳市",
        "512002": "雁江区",
        "512021": "安岳县",
        "512022": "乐至县",
        "512081": "简阳市",
        "512082": "其它区",
        "513200": "阿坝藏族羌族自治州",
        "513221": "汶川县",
        "513222": "理县",
        "513223": "茂县",
        "513224": "松潘县",
        "513225": "九寨沟县",
        "513226": "金川县",
        "513227": "小金县",
        "513228": "黑水县",
        "513229": "马尔康县",
        "513230": "壤塘县",
        "513231": "阿坝县",
        "513232": "若尔盖县",
        "513233": "红原县",
        "513234": "其它区",
        "513300": "甘孜藏族自治州",
        "513321": "康定县",
        "513322": "泸定县",
        "513323": "丹巴县",
        "513324": "九龙县",
        "513325": "雅江县",
        "513326": "道孚县",
        "513327": "炉霍县",
        "513328": "甘孜县",
        "513329": "新龙县",
        "513330": "德格县",
        "513331": "白玉县",
        "513332": "石渠县",
        "513333": "色达县",
        "513334": "理塘县",
        "513335": "巴塘县",
        "513336": "乡城县",
        "513337": "稻城县",
        "513338": "得荣县",
        "513339": "其它区",
        "513400": "凉山彝族自治州",
        "513401": "西昌市",
        "513422": "木里藏族自治县",
        "513423": "盐源县",
        "513424": "德昌县",
        "513425": "会理县",
        "513426": "会东县",
        "513427": "宁南县",
        "513428": "普格县",
        "513429": "布拖县",
        "513430": "金阳县",
        "513431": "昭觉县",
        "513432": "喜德县",
        "513433": "冕宁县",
        "513434": "越西县",
        "513435": "甘洛县",
        "513436": "美姑县",
        "513437": "雷波县",
        "513438": "其它区",
        "520000": "贵州省",
        "520100": "贵阳市",
        "520102": "南明区",
        "520103": "云岩区",
        "520111": "花溪区",
        "520112": "乌当区",
        "520113": "白云区",
        "520121": "开阳县",
        "520122": "息烽县",
        "520123": "修文县",
        "520151": "观山湖区",
        "520181": "清镇市",
        "520182": "其它区",
        "520200": "六盘水市",
        "520201": "钟山区",
        "520203": "六枝特区",
        "520221": "水城县",
        "520222": "盘县",
        "520223": "其它区",
        "520300": "遵义市",
        "520302": "红花岗区",
        "520303": "汇川区",
        "520321": "遵义县",
        "520322": "桐梓县",
        "520323": "绥阳县",
        "520324": "正安县",
        "520325": "道真仡佬族苗族自治县",
        "520326": "务川仡佬族苗族自治县",
        "520327": "凤冈县",
        "520328": "湄潭县",
        "520329": "余庆县",
        "520330": "习水县",
        "520381": "赤水市",
        "520382": "仁怀市",
        "520383": "其它区",
        "520400": "安顺市",
        "520402": "西秀区",
        "520421": "平坝县",
        "520422": "普定县",
        "520423": "镇宁布依族苗族自治县",
        "520424": "关岭布依族苗族自治县",
        "520425": "紫云苗族布依族自治县",
        "520426": "其它区",
        "522200": "铜仁市",
        "522201": "碧江区",
        "522222": "江口县",
        "522223": "玉屏侗族自治县",
        "522224": "石阡县",
        "522225": "思南县",
        "522226": "印江土家族苗族自治县",
        "522227": "德江县",
        "522228": "沿河土家族自治县",
        "522229": "松桃苗族自治县",
        "522230": "万山区",
        "522231": "其它区",
        "522300": "黔西南布依族苗族自治州",
        "522301": "兴义市",
        "522322": "兴仁县",
        "522323": "普安县",
        "522324": "晴隆县",
        "522325": "贞丰县",
        "522326": "望谟县",
        "522327": "册亨县",
        "522328": "安龙县",
        "522329": "其它区",
        "522400": "毕节市",
        "522401": "七星关区",
        "522422": "大方县",
        "522423": "黔西县",
        "522424": "金沙县",
        "522425": "织金县",
        "522426": "纳雍县",
        "522427": "威宁彝族回族苗族自治县",
        "522428": "赫章县",
        "522429": "其它区",
        "522600": "黔东南苗族侗族自治州",
        "522601": "凯里市",
        "522622": "黄平县",
        "522623": "施秉县",
        "522624": "三穗县",
        "522625": "镇远县",
        "522626": "岑巩县",
        "522627": "天柱县",
        "522628": "锦屏县",
        "522629": "剑河县",
        "522630": "台江县",
        "522631": "黎平县",
        "522632": "榕江县",
        "522633": "从江县",
        "522634": "雷山县",
        "522635": "麻江县",
        "522636": "丹寨县",
        "522637": "其它区",
        "522700": "黔南布依族苗族自治州",
        "522701": "都匀市",
        "522702": "福泉市",
        "522722": "荔波县",
        "522723": "贵定县",
        "522725": "瓮安县",
        "522726": "独山县",
        "522727": "平塘县",
        "522728": "罗甸县",
        "522729": "长顺县",
        "522730": "龙里县",
        "522731": "惠水县",
        "522732": "三都水族自治县",
        "522733": "其它区",
        "530000": "云南省",
        "530100": "昆明市",
        "530102": "五华区",
        "530103": "盘龙区",
        "530111": "官渡区",
        "530112": "西山区",
        "530113": "东川区",
        "530121": "呈贡区",
        "530122": "晋宁县",
        "530124": "富民县",
        "530125": "宜良县",
        "530126": "石林彝族自治县",
        "530127": "嵩明县",
        "530128": "禄劝彝族苗族自治县",
        "530129": "寻甸回族彝族自治县",
        "530181": "安宁市",
        "530182": "其它区",
        "530300": "曲靖市",
        "530302": "麒麟区",
        "530321": "马龙县",
        "530322": "陆良县",
        "530323": "师宗县",
        "530324": "罗平县",
        "530325": "富源县",
        "530326": "会泽县",
        "530328": "沾益县",
        "530381": "宣威市",
        "530382": "其它区",
        "530400": "玉溪市",
        "530402": "红塔区",
        "530421": "江川县",
        "530422": "澄江县",
        "530423": "通海县",
        "530424": "华宁县",
        "530425": "易门县",
        "530426": "峨山彝族自治县",
        "530427": "新平彝族傣族自治县",
        "530428": "元江哈尼族彝族傣族自治县",
        "530429": "其它区",
        "530500": "保山市",
        "530502": "隆阳区",
        "530521": "施甸县",
        "530522": "腾冲县",
        "530523": "龙陵县",
        "530524": "昌宁县",
        "530525": "其它区",
        "530600": "昭通市",
        "530602": "昭阳区",
        "530621": "鲁甸县",
        "530622": "巧家县",
        "530623": "盐津县",
        "530624": "大关县",
        "530625": "永善县",
        "530626": "绥江县",
        "530627": "镇雄县",
        "530628": "彝良县",
        "530629": "威信县",
        "530630": "水富县",
        "530631": "其它区",
        "530700": "丽江市",
        "530702": "古城区",
        "530721": "玉龙纳西族自治县",
        "530722": "永胜县",
        "530723": "华坪县",
        "530724": "宁蒗彝族自治县",
        "530725": "其它区",
        "530800": "普洱市",
        "530802": "思茅区",
        "530821": "宁洱哈尼族彝族自治县",
        "530822": "墨江哈尼族自治县",
        "530823": "景东彝族自治县",
        "530824": "景谷傣族彝族自治县",
        "530825": "镇沅彝族哈尼族拉祜族自治县",
        "530826": "江城哈尼族彝族自治县",
        "530827": "孟连傣族拉祜族佤族自治县",
        "530828": "澜沧拉祜族自治县",
        "530829": "西盟佤族自治县",
        "530830": "其它区",
        "530900": "临沧市",
        "530902": "临翔区",
        "530921": "凤庆县",
        "530922": "云县",
        "530923": "永德县",
        "530924": "镇康县",
        "530925": "双江拉祜族佤族布朗族傣族自治县",
        "530926": "耿马傣族佤族自治县",
        "530927": "沧源佤族自治县",
        "530928": "其它区",
        "532300": "楚雄彝族自治州",
        "532301": "楚雄市",
        "532322": "双柏县",
        "532323": "牟定县",
        "532324": "南华县",
        "532325": "姚安县",
        "532326": "大姚县",
        "532327": "永仁县",
        "532328": "元谋县",
        "532329": "武定县",
        "532331": "禄丰县",
        "532332": "其它区",
        "532500": "红河哈尼族彝族自治州",
        "532501": "个旧市",
        "532502": "开远市",
        "532522": "蒙自市",
        "532523": "屏边苗族自治县",
        "532524": "建水县",
        "532525": "石屏县",
        "532526": "弥勒市",
        "532527": "泸西县",
        "532528": "元阳县",
        "532529": "红河县",
        "532530": "金平苗族瑶族傣族自治县",
        "532531": "绿春县",
        "532532": "河口瑶族自治县",
        "532533": "其它区",
        "532600": "文山壮族苗族自治州",
        "532621": "文山市",
        "532622": "砚山县",
        "532623": "西畴县",
        "532624": "麻栗坡县",
        "532625": "马关县",
        "532626": "丘北县",
        "532627": "广南县",
        "532628": "富宁县",
        "532629": "其它区",
        "532800": "西双版纳傣族自治州",
        "532801": "景洪市",
        "532822": "勐海县",
        "532823": "勐腊县",
        "532824": "其它区",
        "532900": "大理白族自治州",
        "532901": "大理市",
        "532922": "漾濞彝族自治县",
        "532923": "祥云县",
        "532924": "宾川县",
        "532925": "弥渡县",
        "532926": "南涧彝族自治县",
        "532927": "巍山彝族回族自治县",
        "532928": "永平县",
        "532929": "云龙县",
        "532930": "洱源县",
        "532931": "剑川县",
        "532932": "鹤庆县",
        "532933": "其它区",
        "533100": "德宏傣族景颇族自治州",
        "533102": "瑞丽市",
        "533103": "芒市",
        "533122": "梁河县",
        "533123": "盈江县",
        "533124": "陇川县",
        "533125": "其它区",
        "533300": "怒江傈僳族自治州",
        "533321": "泸水县",
        "533323": "福贡县",
        "533324": "贡山独龙族怒族自治县",
        "533325": "兰坪白族普米族自治县",
        "533326": "其它区",
        "533400": "迪庆藏族自治州",
        "533421": "香格里拉县",
        "533422": "德钦县",
        "533423": "维西傈僳族自治县",
        "533424": "其它区",
        "540000": "西藏自治区",
        "540100": "拉萨市",
        "540102": "城关区",
        "540121": "林周县",
        "540122": "当雄县",
        "540123": "尼木县",
        "540124": "曲水县",
        "540125": "堆龙德庆县",
        "540126": "达孜县",
        "540127": "墨竹工卡县",
        "540128": "其它区",
        "542100": "昌都地区",
        "542121": "昌都县",
        "542122": "江达县",
        "542123": "贡觉县",
        "542124": "类乌齐县",
        "542125": "丁青县",
        "542126": "察雅县",
        "542127": "八宿县",
        "542128": "左贡县",
        "542129": "芒康县",
        "542132": "洛隆县",
        "542133": "边坝县",
        "542134": "其它区",
        "542200": "山南地区",
        "542221": "乃东县",
        "542222": "扎囊县",
        "542223": "贡嘎县",
        "542224": "桑日县",
        "542225": "琼结县",
        "542226": "曲松县",
        "542227": "措美县",
        "542228": "洛扎县",
        "542229": "加查县",
        "542231": "隆子县",
        "542232": "错那县",
        "542233": "浪卡子县",
        "542234": "其它区",
        "542300": "日喀则地区",
        "542301": "日喀则市",
        "542322": "南木林县",
        "542323": "江孜县",
        "542324": "定日县",
        "542325": "萨迦县",
        "542326": "拉孜县",
        "542327": "昂仁县",
        "542328": "谢通门县",
        "542329": "白朗县",
        "542330": "仁布县",
        "542331": "康马县",
        "542332": "定结县",
        "542333": "仲巴县",
        "542334": "亚东县",
        "542335": "吉隆县",
        "542336": "聂拉木县",
        "542337": "萨嘎县",
        "542338": "岗巴县",
        "542339": "其它区",
        "542400": "那曲地区",
        "542421": "那曲县",
        "542422": "嘉黎县",
        "542423": "比如县",
        "542424": "聂荣县",
        "542425": "安多县",
        "542426": "申扎县",
        "542427": "索县",
        "542428": "班戈县",
        "542429": "巴青县",
        "542430": "尼玛县",
        "542431": "其它区",
        "542432": "双湖县",
        "542500": "阿里地区",
        "542521": "普兰县",
        "542522": "札达县",
        "542523": "噶尔县",
        "542524": "日土县",
        "542525": "革吉县",
        "542526": "改则县",
        "542527": "措勤县",
        "542528": "其它区",
        "542600": "林芝地区",
        "542621": "林芝县",
        "542622": "工布江达县",
        "542623": "米林县",
        "542624": "墨脱县",
        "542625": "波密县",
        "542626": "察隅县",
        "542627": "朗县",
        "542628": "其它区",
        "610000": "陕西省",
        "610100": "西安市",
        "610102": "新城区",
        "610103": "碑林区",
        "610104": "莲湖区",
        "610111": "灞桥区",
        "610112": "未央区",
        "610113": "雁塔区",
        "610114": "阎良区",
        "610115": "临潼区",
        "610116": "长安区",
        "610122": "蓝田县",
        "610124": "周至县",
        "610125": "户县",
        "610126": "高陵县",
        "610127": "其它区",
        "610200": "铜川市",
        "610202": "王益区",
        "610203": "印台区",
        "610204": "耀州区",
        "610222": "宜君县",
        "610223": "其它区",
        "610300": "宝鸡市",
        "610302": "渭滨区",
        "610303": "金台区",
        "610304": "陈仓区",
        "610322": "凤翔县",
        "610323": "岐山县",
        "610324": "扶风县",
        "610326": "眉县",
        "610327": "陇县",
        "610328": "千阳县",
        "610329": "麟游县",
        "610330": "凤县",
        "610331": "太白县",
        "610332": "其它区",
        "610400": "咸阳市",
        "610402": "秦都区",
        "610403": "杨陵区",
        "610404": "渭城区",
        "610422": "三原县",
        "610423": "泾阳县",
        "610424": "乾县",
        "610425": "礼泉县",
        "610426": "永寿县",
        "610427": "彬县",
        "610428": "长武县",
        "610429": "旬邑县",
        "610430": "淳化县",
        "610431": "武功县",
        "610481": "兴平市",
        "610482": "其它区",
        "610500": "渭南市",
        "610502": "临渭区",
        "610521": "华县",
        "610522": "潼关县",
        "610523": "大荔县",
        "610524": "合阳县",
        "610525": "澄城县",
        "610526": "蒲城县",
        "610527": "白水县",
        "610528": "富平县",
        "610581": "韩城市",
        "610582": "华阴市",
        "610583": "其它区",
        "610600": "延安市",
        "610602": "宝塔区",
        "610621": "延长县",
        "610622": "延川县",
        "610623": "子长县",
        "610624": "安塞县",
        "610625": "志丹县",
        "610626": "吴起县",
        "610627": "甘泉县",
        "610628": "富县",
        "610629": "洛川县",
        "610630": "宜川县",
        "610631": "黄龙县",
        "610632": "黄陵县",
        "610633": "其它区",
        "610700": "汉中市",
        "610702": "汉台区",
        "610721": "南郑县",
        "610722": "城固县",
        "610723": "洋县",
        "610724": "西乡县",
        "610725": "勉县",
        "610726": "宁强县",
        "610727": "略阳县",
        "610728": "镇巴县",
        "610729": "留坝县",
        "610730": "佛坪县",
        "610731": "其它区",
        "610800": "榆林市",
        "610802": "榆阳区",
        "610821": "神木县",
        "610822": "府谷县",
        "610823": "横山县",
        "610824": "靖边县",
        "610825": "定边县",
        "610826": "绥德县",
        "610827": "米脂县",
        "610828": "佳县",
        "610829": "吴堡县",
        "610830": "清涧县",
        "610831": "子洲县",
        "610832": "其它区",
        "610900": "安康市",
        "610902": "汉滨区",
        "610921": "汉阴县",
        "610922": "石泉县",
        "610923": "宁陕县",
        "610924": "紫阳县",
        "610925": "岚皋县",
        "610926": "平利县",
        "610927": "镇坪县",
        "610928": "旬阳县",
        "610929": "白河县",
        "610930": "其它区",
        "611000": "商洛市",
        "611002": "商州区",
        "611021": "洛南县",
        "611022": "丹凤县",
        "611023": "商南县",
        "611024": "山阳县",
        "611025": "镇安县",
        "611026": "柞水县",
        "611027": "其它区",
        "620000": "甘肃省",
        "620100": "兰州市",
        "620102": "城关区",
        "620103": "七里河区",
        "620104": "西固区",
        "620105": "安宁区",
        "620111": "红古区",
        "620121": "永登县",
        "620122": "皋兰县",
        "620123": "榆中县",
        "620124": "其它区",
        "620200": "嘉峪关市",
        "620300": "金昌市",
        "620302": "金川区",
        "620321": "永昌县",
        "620322": "其它区",
        "620400": "白银市",
        "620402": "白银区",
        "620403": "平川区",
        "620421": "靖远县",
        "620422": "会宁县",
        "620423": "景泰县",
        "620424": "其它区",
        "620500": "天水市",
        "620502": "秦州区",
        "620503": "麦积区",
        "620521": "清水县",
        "620522": "秦安县",
        "620523": "甘谷县",
        "620524": "武山县",
        "620525": "张家川回族自治县",
        "620526": "其它区",
        "620600": "武威市",
        "620602": "凉州区",
        "620621": "民勤县",
        "620622": "古浪县",
        "620623": "天祝藏族自治县",
        "620624": "其它区",
        "620700": "张掖市",
        "620702": "甘州区",
        "620721": "肃南裕固族自治县",
        "620722": "民乐县",
        "620723": "临泽县",
        "620724": "高台县",
        "620725": "山丹县",
        "620726": "其它区",
        "620800": "平凉市",
        "620802": "崆峒区",
        "620821": "泾川县",
        "620822": "灵台县",
        "620823": "崇信县",
        "620824": "华亭县",
        "620825": "庄浪县",
        "620826": "静宁县",
        "620827": "其它区",
        "620900": "酒泉市",
        "620902": "肃州区",
        "620921": "金塔县",
        "620922": "瓜州县",
        "620923": "肃北蒙古族自治县",
        "620924": "阿克塞哈萨克族自治县",
        "620981": "玉门市",
        "620982": "敦煌市",
        "620983": "其它区",
        "621000": "庆阳市",
        "621002": "西峰区",
        "621021": "庆城县",
        "621022": "环县",
        "621023": "华池县",
        "621024": "合水县",
        "621025": "正宁县",
        "621026": "宁县",
        "621027": "镇原县",
        "621028": "其它区",
        "621100": "定西市",
        "621102": "安定区",
        "621121": "通渭县",
        "621122": "陇西县",
        "621123": "渭源县",
        "621124": "临洮县",
        "621125": "漳县",
        "621126": "岷县",
        "621127": "其它区",
        "621200": "陇南市",
        "621202": "武都区",
        "621221": "成县",
        "621222": "文县",
        "621223": "宕昌县",
        "621224": "康县",
        "621225": "西和县",
        "621226": "礼县",
        "621227": "徽县",
        "621228": "两当县",
        "621229": "其它区",
        "622900": "临夏回族自治州",
        "622901": "临夏市",
        "622921": "临夏县",
        "622922": "康乐县",
        "622923": "永靖县",
        "622924": "广河县",
        "622925": "和政县",
        "622926": "东乡族自治县",
        "622927": "积石山保安族东乡族撒拉族自治县",
        "622928": "其它区",
        "623000": "甘南藏族自治州",
        "623001": "合作市",
        "623021": "临潭县",
        "623022": "卓尼县",
        "623023": "舟曲县",
        "623024": "迭部县",
        "623025": "玛曲县",
        "623026": "碌曲县",
        "623027": "夏河县",
        "623028": "其它区",
        "630000": "青海省",
        "630100": "西宁市",
        "630102": "城东区",
        "630103": "城中区",
        "630104": "城西区",
        "630105": "城北区",
        "630121": "大通回族土族自治县",
        "630122": "湟中县",
        "630123": "湟源县",
        "630124": "其它区",
        "632100": "海东市",
        "632121": "平安县",
        "632122": "民和回族土族自治县",
        "632123": "乐都区",
        "632126": "互助土族自治县",
        "632127": "化隆回族自治县",
        "632128": "循化撒拉族自治县",
        "632129": "其它区",
        "632200": "海北藏族自治州",
        "632221": "门源回族自治县",
        "632222": "祁连县",
        "632223": "海晏县",
        "632224": "刚察县",
        "632225": "其它区",
        "632300": "黄南藏族自治州",
        "632321": "同仁县",
        "632322": "尖扎县",
        "632323": "泽库县",
        "632324": "河南蒙古族自治县",
        "632325": "其它区",
        "632500": "海南藏族自治州",
        "632521": "共和县",
        "632522": "同德县",
        "632523": "贵德县",
        "632524": "兴海县",
        "632525": "贵南县",
        "632526": "其它区",
        "632600": "果洛藏族自治州",
        "632621": "玛沁县",
        "632622": "班玛县",
        "632623": "甘德县",
        "632624": "达日县",
        "632625": "久治县",
        "632626": "玛多县",
        "632627": "其它区",
        "632700": "玉树藏族自治州",
        "632721": "玉树市",
        "632722": "杂多县",
        "632723": "称多县",
        "632724": "治多县",
        "632725": "囊谦县",
        "632726": "曲麻莱县",
        "632727": "其它区",
        "632800": "海西蒙古族藏族自治州",
        "632801": "格尔木市",
        "632802": "德令哈市",
        "632821": "乌兰县",
        "632822": "都兰县",
        "632823": "天峻县",
        "632824": "其它区",
        "640000": "宁夏回族自治区",
        "640100": "银川市",
        "640104": "兴庆区",
        "640105": "西夏区",
        "640106": "金凤区",
        "640121": "永宁县",
        "640122": "贺兰县",
        "640181": "灵武市",
        "640182": "其它区",
        "640200": "石嘴山市",
        "640202": "大武口区",
        "640205": "惠农区",
        "640221": "平罗县",
        "640222": "其它区",
        "640300": "吴忠市",
        "640302": "利通区",
        "640303": "红寺堡区",
        "640323": "盐池县",
        "640324": "同心县",
        "640381": "青铜峡市",
        "640382": "其它区",
        "640400": "固原市",
        "640402": "原州区",
        "640422": "西吉县",
        "640423": "隆德县",
        "640424": "泾源县",
        "640425": "彭阳县",
        "640426": "其它区",
        "640500": "中卫市",
        "640502": "沙坡头区",
        "640521": "中宁县",
        "640522": "海原县",
        "640523": "其它区",
        "650000": "新疆维吾尔自治区",
        "650100": "乌鲁木齐市",
        "650102": "天山区",
        "650103": "沙依巴克区",
        "650104": "新市区",
        "650105": "水磨沟区",
        "650106": "头屯河区",
        "650107": "达坂城区",
        "650109": "米东区",
        "650121": "乌鲁木齐县",
        "650122": "其它区",
        "650200": "克拉玛依市",
        "650202": "独山子区",
        "650203": "克拉玛依区",
        "650204": "白碱滩区",
        "650205": "乌尔禾区",
        "650206": "其它区",
        "652100": "吐鲁番地区",
        "652101": "吐鲁番市",
        "652122": "鄯善县",
        "652123": "托克逊县",
        "652124": "其它区",
        "652200": "哈密地区",
        "652201": "哈密市",
        "652222": "巴里坤哈萨克自治县",
        "652223": "伊吾县",
        "652224": "其它区",
        "652300": "昌吉回族自治州",
        "652301": "昌吉市",
        "652302": "阜康市",
        "652323": "呼图壁县",
        "652324": "玛纳斯县",
        "652325": "奇台县",
        "652327": "吉木萨尔县",
        "652328": "木垒哈萨克自治县",
        "652329": "其它区",
        "652700": "博尔塔拉蒙古自治州",
        "652701": "博乐市",
        "652702": "阿拉山口市",
        "652722": "精河县",
        "652723": "温泉县",
        "652724": "其它区",
        "652800": "巴音郭楞蒙古自治州",
        "652801": "库尔勒市",
        "652822": "轮台县",
        "652823": "尉犁县",
        "652824": "若羌县",
        "652825": "且末县",
        "652826": "焉耆回族自治县",
        "652827": "和静县",
        "652828": "和硕县",
        "652829": "博湖县",
        "652830": "其它区",
        "652900": "阿克苏地区",
        "652901": "阿克苏市",
        "652922": "温宿县",
        "652923": "库车县",
        "652924": "沙雅县",
        "652925": "新和县",
        "652926": "拜城县",
        "652927": "乌什县",
        "652928": "阿瓦提县",
        "652929": "柯坪县",
        "652930": "其它区",
        "653000": "克孜勒苏柯尔克孜自治州",
        "653001": "阿图什市",
        "653022": "阿克陶县",
        "653023": "阿合奇县",
        "653024": "乌恰县",
        "653025": "其它区",
        "653100": "喀什地区",
        "653101": "喀什市",
        "653121": "疏附县",
        "653122": "疏勒县",
        "653123": "英吉沙县",
        "653124": "泽普县",
        "653125": "莎车县",
        "653126": "叶城县",
        "653127": "麦盖提县",
        "653128": "岳普湖县",
        "653129": "伽师县",
        "653130": "巴楚县",
        "653131": "塔什库尔干塔吉克自治县",
        "653132": "其它区",
        "653200": "和田地区",
        "653201": "和田市",
        "653221": "和田县",
        "653222": "墨玉县",
        "653223": "皮山县",
        "653224": "洛浦县",
        "653225": "策勒县",
        "653226": "于田县",
        "653227": "民丰县",
        "653228": "其它区",
        "654000": "伊犁哈萨克自治州",
        "654002": "伊宁市",
        "654003": "奎屯市",
        "654021": "伊宁县",
        "654022": "察布查尔锡伯自治县",
        "654023": "霍城县",
        "654024": "巩留县",
        "654025": "新源县",
        "654026": "昭苏县",
        "654027": "特克斯县",
        "654028": "尼勒克县",
        "654029": "其它区",
        "654200": "塔城地区",
        "654201": "塔城市",
        "654202": "乌苏市",
        "654221": "额敏县",
        "654223": "沙湾县",
        "654224": "托里县",
        "654225": "裕民县",
        "654226": "和布克赛尔蒙古自治县",
        "654227": "其它区",
        "654300": "阿勒泰地区",
        "654301": "阿勒泰市",
        "654321": "布尔津县",
        "654322": "富蕴县",
        "654323": "福海县",
        "654324": "哈巴河县",
        "654325": "青河县",
        "654326": "吉木乃县",
        "654327": "其它区",
        "659001": "石河子市",
        "659002": "阿拉尔市",
        "659003": "图木舒克市",
        "659004": "五家渠市",
        "710000": "台湾",
        "710100": "台北市",
        "710101": "中正区",
        "710102": "大同区",
        "710103": "中山区",
        "710104": "松山区",
        "710105": "大安区",
        "710106": "万华区",
        "710107": "信义区",
        "710108": "士林区",
        "710109": "北投区",
        "710110": "内湖区",
        "710111": "南港区",
        "710112": "文山区",
        "710113": "其它区",
        "710200": "高雄市",
        "710201": "新兴区",
        "710202": "前金区",
        "710203": "芩雅区",
        "710204": "盐埕区",
        "710205": "鼓山区",
        "710206": "旗津区",
        "710207": "前镇区",
        "710208": "三民区",
        "710209": "左营区",
        "710210": "楠梓区",
        "710211": "小港区",
        "710212": "其它区",
        "710241": "苓雅区",
        "710242": "仁武区",
        "710243": "大社区",
        "710244": "冈山区",
        "710245": "路竹区",
        "710246": "阿莲区",
        "710247": "田寮区",
        "710248": "燕巢区",
        "710249": "桥头区",
        "710250": "梓官区",
        "710251": "弥陀区",
        "710252": "永安区",
        "710253": "湖内区",
        "710254": "凤山区",
        "710255": "大寮区",
        "710256": "林园区",
        "710257": "鸟松区",
        "710258": "大树区",
        "710259": "旗山区",
        "710260": "美浓区",
        "710261": "六龟区",
        "710262": "内门区",
        "710263": "杉林区",
        "710264": "甲仙区",
        "710265": "桃源区",
        "710266": "那玛夏区",
        "710267": "茂林区",
        "710268": "茄萣区",
        "710300": "台南市",
        "710301": "中西区",
        "710302": "东区",
        "710303": "南区",
        "710304": "北区",
        "710305": "安平区",
        "710306": "安南区",
        "710307": "其它区",
        "710339": "永康区",
        "710340": "归仁区",
        "710341": "新化区",
        "710342": "左镇区",
        "710343": "玉井区",
        "710344": "楠西区",
        "710345": "南化区",
        "710346": "仁德区",
        "710347": "关庙区",
        "710348": "龙崎区",
        "710349": "官田区",
        "710350": "麻豆区",
        "710351": "佳里区",
        "710352": "西港区",
        "710353": "七股区",
        "710354": "将军区",
        "710355": "学甲区",
        "710356": "北门区",
        "710357": "新营区",
        "710358": "后壁区",
        "710359": "白河区",
        "710360": "东山区",
        "710361": "六甲区",
        "710362": "下营区",
        "710363": "柳营区",
        "710364": "盐水区",
        "710365": "善化区",
        "710366": "大内区",
        "710367": "山上区",
        "710368": "新市区",
        "710369": "安定区",
        "710400": "台中市",
        "710401": "中区",
        "710402": "东区",
        "710403": "南区",
        "710404": "西区",
        "710405": "北区",
        "710406": "北屯区",
        "710407": "西屯区",
        "710408": "南屯区",
        "710409": "其它区",
        "710431": "太平区",
        "710432": "大里区",
        "710433": "雾峰区",
        "710434": "乌日区",
        "710435": "丰原区",
        "710436": "后里区",
        "710437": "石冈区",
        "710438": "东势区",
        "710439": "和平区",
        "710440": "新社区",
        "710441": "潭子区",
        "710442": "大雅区",
        "710443": "神冈区",
        "710444": "大肚区",
        "710445": "沙鹿区",
        "710446": "龙井区",
        "710447": "梧栖区",
        "710448": "清水区",
        "710449": "大甲区",
        "710450": "外埔区",
        "710451": "大安区",
        "710500": "金门县",
        "710507": "金沙镇",
        "710508": "金湖镇",
        "710509": "金宁乡",
        "710510": "金城镇",
        "710511": "烈屿乡",
        "710512": "乌坵乡",
        "710600": "南投县",
        "710614": "南投市",
        "710615": "中寮乡",
        "710616": "草屯镇",
        "710617": "国姓乡",
        "710618": "埔里镇",
        "710619": "仁爱乡",
        "710620": "名间乡",
        "710621": "集集镇",
        "710622": "水里乡",
        "710623": "鱼池乡",
        "710624": "信义乡",
        "710625": "竹山镇",
        "710626": "鹿谷乡",
        "710700": "基隆市",
        "710701": "仁爱区",
        "710702": "信义区",
        "710703": "中正区",
        "710704": "中山区",
        "710705": "安乐区",
        "710706": "暖暖区",
        "710707": "七堵区",
        "710708": "其它区",
        "710800": "新竹市",
        "710801": "东区",
        "710802": "北区",
        "710803": "香山区",
        "710804": "其它区",
        "710900": "嘉义市",
        "710901": "东区",
        "710902": "西区",
        "710903": "其它区",
        "711100": "新北市",
        "711130": "万里区",
        "711131": "金山区",
        "711132": "板桥区",
        "711133": "汐止区",
        "711134": "深坑区",
        "711135": "石碇区",
        "711136": "瑞芳区",
        "711137": "平溪区",
        "711138": "双溪区",
        "711139": "贡寮区",
        "711140": "新店区",
        "711141": "坪林区",
        "711142": "乌来区",
        "711143": "永和区",
        "711144": "中和区",
        "711145": "土城区",
        "711146": "三峡区",
        "711147": "树林区",
        "711148": "莺歌区",
        "711149": "三重区",
        "711150": "新庄区",
        "711151": "泰山区",
        "711152": "林口区",
        "711153": "芦洲区",
        "711154": "五股区",
        "711155": "八里区",
        "711156": "淡水区",
        "711157": "三芝区",
        "711158": "石门区",
        "711200": "宜兰县",
        "711214": "宜兰市",
        "711215": "头城镇",
        "711216": "礁溪乡",
        "711217": "壮围乡",
        "711218": "员山乡",
        "711219": "罗东镇",
        "711220": "三星乡",
        "711221": "大同乡",
        "711222": "五结乡",
        "711223": "冬山乡",
        "711224": "苏澳镇",
        "711225": "南澳乡",
        "711226": "钓鱼台",
        "711300": "新竹县",
        "711314": "竹北市",
        "711315": "湖口乡",
        "711316": "新丰乡",
        "711317": "新埔镇",
        "711318": "关西镇",
        "711319": "芎林乡",
        "711320": "宝山乡",
        "711321": "竹东镇",
        "711322": "五峰乡",
        "711323": "横山乡",
        "711324": "尖石乡",
        "711325": "北埔乡",
        "711326": "峨眉乡",
        "711400": "桃园县",
        "711414": "中坜市",
        "711415": "平镇市",
        "711416": "龙潭乡",
        "711417": "杨梅市",
        "711418": "新屋乡",
        "711419": "观音乡",
        "711420": "桃园市",
        "711421": "龟山乡",
        "711422": "八德市",
        "711423": "大溪镇",
        "711424": "复兴乡",
        "711425": "大园乡",
        "711426": "芦竹乡",
        "711500": "苗栗县",
        "711519": "竹南镇",
        "711520": "头份镇",
        "711521": "三湾乡",
        "711522": "南庄乡",
        "711523": "狮潭乡",
        "711524": "后龙镇",
        "711525": "通霄镇",
        "711526": "苑里镇",
        "711527": "苗栗市",
        "711528": "造桥乡",
        "711529": "头屋乡",
        "711530": "公馆乡",
        "711531": "大湖乡",
        "711532": "泰安乡",
        "711533": "铜锣乡",
        "711534": "三义乡",
        "711535": "西湖乡",
        "711536": "卓兰镇",
        "711700": "彰化县",
        "711727": "彰化市",
        "711728": "芬园乡",
        "711729": "花坛乡",
        "711730": "秀水乡",
        "711731": "鹿港镇",
        "711732": "福兴乡",
        "711733": "线西乡",
        "711734": "和美镇",
        "711735": "伸港乡",
        "711736": "员林镇",
        "711737": "社头乡",
        "711738": "永靖乡",
        "711739": "埔心乡",
        "711740": "溪湖镇",
        "711741": "大村乡",
        "711742": "埔盐乡",
        "711743": "田中镇",
        "711744": "北斗镇",
        "711745": "田尾乡",
        "711746": "埤头乡",
        "711747": "溪州乡",
        "711748": "竹塘乡",
        "711749": "二林镇",
        "711750": "大城乡",
        "711751": "芳苑乡",
        "711752": "二水乡",
        "711900": "嘉义县",
        "711919": "番路乡",
        "711920": "梅山乡",
        "711921": "竹崎乡",
        "711922": "阿里山乡",
        "711923": "中埔乡",
        "711924": "大埔乡",
        "711925": "水上乡",
        "711926": "鹿草乡",
        "711927": "太保市",
        "711928": "朴子市",
        "711929": "东石乡",
        "711930": "六脚乡",
        "711931": "新港乡",
        "711932": "民雄乡",
        "711933": "大林镇",
        "711934": "溪口乡",
        "711935": "义竹乡",
        "711936": "布袋镇",
        "712100": "云林县",
        "712121": "斗南镇",
        "712122": "大埤乡",
        "712123": "虎尾镇",
        "712124": "土库镇",
        "712125": "褒忠乡",
        "712126": "东势乡",
        "712127": "台西乡",
        "712128": "仑背乡",
        "712129": "麦寮乡",
        "712130": "斗六市",
        "712131": "林内乡",
        "712132": "古坑乡",
        "712133": "莿桐乡",
        "712134": "西螺镇",
        "712135": "二仑乡",
        "712136": "北港镇",
        "712137": "水林乡",
        "712138": "口湖乡",
        "712139": "四湖乡",
        "712140": "元长乡",
        "712400": "屏东县",
        "712434": "屏东市",
        "712435": "三地门乡",
        "712436": "雾台乡",
        "712437": "玛家乡",
        "712438": "九如乡",
        "712439": "里港乡",
        "712440": "高树乡",
        "712441": "盐埔乡",
        "712442": "长治乡",
        "712443": "麟洛乡",
        "712444": "竹田乡",
        "712445": "内埔乡",
        "712446": "万丹乡",
        "712447": "潮州镇",
        "712448": "泰武乡",
        "712449": "来义乡",
        "712450": "万峦乡",
        "712451": "崁顶乡",
        "712452": "新埤乡",
        "712453": "南州乡",
        "712454": "林边乡",
        "712455": "东港镇",
        "712456": "琉球乡",
        "712457": "佳冬乡",
        "712458": "新园乡",
        "712459": "枋寮乡",
        "712460": "枋山乡",
        "712461": "春日乡",
        "712462": "狮子乡",
        "712463": "车城乡",
        "712464": "牡丹乡",
        "712465": "恒春镇",
        "712466": "满州乡",
        "712500": "台东县",
        "712517": "台东市",
        "712518": "绿岛乡",
        "712519": "兰屿乡",
        "712520": "延平乡",
        "712521": "卑南乡",
        "712522": "鹿野乡",
        "712523": "关山镇",
        "712524": "海端乡",
        "712525": "池上乡",
        "712526": "东河乡",
        "712527": "成功镇",
        "712528": "长滨乡",
        "712529": "金峰乡",
        "712530": "大武乡",
        "712531": "达仁乡",
        "712532": "太麻里乡",
        "712600": "花莲县",
        "712615": "花莲市",
        "712616": "新城乡",
        "712617": "太鲁阁",
        "712618": "秀林乡",
        "712619": "吉安乡",
        "712620": "寿丰乡",
        "712621": "凤林镇",
        "712622": "光复乡",
        "712623": "丰滨乡",
        "712624": "瑞穗乡",
        "712625": "万荣乡",
        "712626": "玉里镇",
        "712627": "卓溪乡",
        "712628": "富里乡",
        "712700": "澎湖县",
        "712707": "马公市",
        "712708": "西屿乡",
        "712709": "望安乡",
        "712710": "七美乡",
        "712711": "白沙乡",
        "712712": "湖西乡",
        "712800": "连江县",
        "712805": "南竿乡",
        "712806": "北竿乡",
        "712807": "莒光乡",
        "712808": "东引乡",
        "810000": "香港特别行政区",
        "810100": "香港岛",
        "810101": "中西区",
        "810102": "湾仔",
        "810103": "东区",
        "810104": "南区",
        "810200": "九龙",
        "810201": "九龙城区",
        "810202": "油尖旺区",
        "810203": "深水埗区",
        "810204": "黄大仙区",
        "810205": "观塘区",
        "810300": "新界",
        "810301": "北区",
        "810302": "大埔区",
        "810303": "沙田区",
        "810304": "西贡区",
        "810305": "元朗区",
        "810306": "屯门区",
        "810307": "荃湾区",
        "810308": "葵青区",
        "810309": "离岛区",
        "820000": "澳门特别行政区",
        "820100": "澳门半岛",
        "820200": "离岛",
        "990000": "海外",
        "990100": "海外"


        // id pid/parentId name children
      };function tree(list) {
        var mapped = {};
        for (var i = 0, item; i < list.length; i++) {
          item = list[i];
          if (!item || !item.id) continue;
          mapped[item.id] = item;
        }

        var result = [];
        for (var ii = 0; ii < list.length; ii++) {
          item = list[ii];

          if (!item) continue;
          /* jshint -W041 */
          if (item.pid == undefined && item.parentId == undefined) {
            result.push(item);
            continue;
          }
          var parent = mapped[item.pid] || mapped[item.parentId];
          if (!parent) continue;
          if (!parent.children) parent.children = [];
          parent.children.push(item);
        }
        return result;
      }

      var DICT_FIXED = function () {
        var fixed = [];
        for (var id in DICT) {
          var pid = id.slice(2, 6) === '0000' ? undefined :
          id.slice(4, 6) == '00' ? id.slice(0, 2) + '0000' :
          id.slice(0, 4) + '00';
          fixed.push({
            id: id,
            pid: pid,
            name: DICT[id] });

        }
        return tree(fixed);
      }();

      module.exports = DICT_FIXED;

      /***/},
    /* 19 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                              ## Miscellaneous
                                                          */
      var DICT = __webpack_require__(18);
      module.exports = {
        // Dice
        d4: function d4() {
          return this.natural(1, 4);
        },
        d6: function d6() {
          return this.natural(1, 6);
        },
        d8: function d8() {
          return this.natural(1, 8);
        },
        d12: function d12() {
          return this.natural(1, 12);
        },
        d20: function d20() {
          return this.natural(1, 20);
        },
        d100: function d100() {
          return this.natural(1, 100);
        },
        /*
               随机生成一个 GUID。
           		    http://www.broofa.com/2008/09/javascript-uuid-function/
               [UUID 规范](http://www.ietf.org/rfc/rfc4122.txt)
                   UUIDs (Universally Unique IDentifier)
                   GUIDs (Globally Unique IDentifier)
                   The formal definition of the UUID string representation is provided by the following ABNF [7]:
                       UUID                   = time-low "-" time-mid "-"
                                              time-high-and-version "-"
                                              clock-seq-and-reserved
                                              clock-seq-low "-" node
                       time-low               = 4hexOctet
                       time-mid               = 2hexOctet
                       time-high-and-version  = 2hexOctet
                       clock-seq-and-reserved = hexOctet
                       clock-seq-low          = hexOctet
                       node                   = 6hexOctet
                       hexOctet               = hexDigit hexDigit
                       hexDigit =
                           "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
                           "a" / "b" / "c" / "d" / "e" / "f" /
                           "A" / "B" / "C" / "D" / "E" / "F"
               
               https://github.com/victorquinn/chancejs/blob/develop/chance.js#L1349
           */

        guid: function guid() {
          var pool = "abcdefABCDEF1234567890",
          guid = this.string(pool, 8) + '-' +
          this.string(pool, 4) + '-' +
          this.string(pool, 4) + '-' +
          this.string(pool, 4) + '-' +
          this.string(pool, 12);
          return guid;
        },
        uuid: function uuid() {
          return this.guid();
        },
        /*
               随机生成一个 18 位身份证。
           		    [身份证](http://baike.baidu.com/view/1697.htm#4)
                   地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
               [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
           */

        id: function id() {
          var id,
          sum = 0,
          rank = [
          "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"],

          last = [
          "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];


          id = this.pick(DICT).id +
          this.date('yyyyMMdd') +
          this.string('number', 3);

          for (var i = 0; i < id.length; i++) {
            sum += id[i] * rank[i];
          }
          id += last[sum % 11];

          return id;
        },

        /*
               生成一个全局的自增整数。
               类似自增主键（auto increment primary key）。
           */
        increment: function () {
          var key = 0;
          return function (step) {
            return key += +step || 1; // step?
          };
        }(),
        inc: function inc(step) {
          return this.increment(step);
        }


        /***/ };},
    /* 20 */
    /***/function (module, exports, __webpack_require__) {

      var Parser = __webpack_require__(21);
      var Handler = __webpack_require__(22);
      module.exports = {
        Parser: Parser,
        Handler: Handler


        /***/ };},
    /* 21 */
    /***/function (module, exports) {

      // https://github.com/nuysoft/regexp
      // forked from https://github.com/ForbesLindesay/regexp

      function parse(n) {
        if ("string" != typeof n) {
          var l = new TypeError("The regexp to parse must be represented as a string.");
          throw l;
        }
        return index = 1, cgs = {}, parser.parse(n);
      }

      function Token(n) {
        this.type = n, this.offset = Token.offset(), this.text = Token.text();
      }

      function Alternate(n, l) {
        Token.call(this, "alternate"), this.left = n, this.right = l;
      }

      function Match(n) {
        Token.call(this, "match"), this.body = n.filter(Boolean);
      }

      function Group(n, l) {
        Token.call(this, n), this.body = l;
      }

      function CaptureGroup(n) {
        Group.call(this, "capture-group"), this.index = cgs[this.offset] || (cgs[this.offset] = index++),
        this.body = n;
      }

      function Quantified(n, l) {
        Token.call(this, "quantified"), this.body = n, this.quantifier = l;
      }

      function Quantifier(n, l) {
        Token.call(this, "quantifier"), this.min = n, this.max = l, this.greedy = !0;
      }

      function CharSet(n, l) {
        Token.call(this, "charset"), this.invert = n, this.body = l;
      }

      function CharacterRange(n, l) {
        Token.call(this, "range"), this.start = n, this.end = l;
      }

      function Literal(n) {
        Token.call(this, "literal"), this.body = n, this.escaped = this.body != this.text;
      }

      function Unicode(n) {
        Token.call(this, "unicode"), this.code = n.toUpperCase();
      }

      function Hex(n) {
        Token.call(this, "hex"), this.code = n.toUpperCase();
      }

      function Octal(n) {
        Token.call(this, "octal"), this.code = n.toUpperCase();
      }

      function BackReference(n) {
        Token.call(this, "back-reference"), this.code = n.toUpperCase();
      }

      function ControlCharacter(n) {
        Token.call(this, "control-character"), this.code = n.toUpperCase();
      }

      var parser = function () {
        function n(n, l) {
          function u() {
            this.constructor = n;
          }
          u.prototype = l.prototype, n.prototype = new u();
        }
        function l(n, l, u, t, r) {
          function e(n, l) {
            function u(n) {
              function l(n) {
                return n.charCodeAt(0).toString(16).toUpperCase();
              }
              return n.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (n) {
                return "\\x0" + l(n);
              }).replace(/[\x10-\x1F\x80-\xFF]/g, function (n) {
                return "\\x" + l(n);
              }).replace(/[\u0180-\u0FFF]/g, function (n) {
                return "\\u0" + l(n);
              }).replace(/[\u1080-\uFFFF]/g, function (n) {
                return "\\u" + l(n);
              });
            }
            var t, r;
            switch (n.length) {
              case 0:
                t = "end of input";
                break;

              case 1:
                t = n[0];
                break;

              default:
                t = n.slice(0, -1).join(", ") + " or " + n[n.length - 1];}

            return r = l ? '"' + u(l) + '"' : "end of input", "Expected " + t + " but " + r + " found.";
          }
          this.expected = n, this.found = l, this.offset = u, this.line = t, this.column = r,
          this.name = "SyntaxError", this.message = e(n, l);
        }
        function u(n) {
          function u() {
            return n.substring(Lt, qt);
          }
          function t() {
            return Lt;
          }
          function r(l) {
            function u(l, u, t) {
              var r, e;
              for (r = u; t > r; r++) {e = n.charAt(r), "\n" === e ? (l.seenCR || l.line++, l.column = 1,
                l.seenCR = !1) : "\r" === e || "\u2028" === e || "\u2029" === e ? (l.line++, l.column = 1,
                l.seenCR = !0) : (l.column++, l.seenCR = !1);}
            }
            return Mt !== l && (Mt > l && (Mt = 0, Dt = {
              line: 1,
              column: 1,
              seenCR: !1 }),
            u(Dt, Mt, l), Mt = l), Dt;
          }
          function e(n) {
            Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n));
          }
          function o(n) {
            var l = 0;
            for (n.sort(); l < n.length;) {n[l - 1] === n[l] ? n.splice(l, 1) : l++;}
          }
          function c() {
            var l, u, t, r, o;
            return l = qt, u = i(), null !== u ? (t = qt, 124 === n.charCodeAt(qt) ? (r = fl,
            qt++) : (r = null, 0 === Wt && e(sl)), null !== r ? (o = c(), null !== o ? (r = [r, o],
            t = r) : (qt = t, t = il)) : (qt = t, t = il), null === t && (t = al), null !== t ? (Lt = l,
            u = hl(u, t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l,
            l = il), l;
          }
          function i() {
            var n, l, u, t, r;
            if (n = qt, l = f(), null === l && (l = al), null !== l) {if (u = qt, Wt++, t = d(),
              Wt--, null === t ? u = al : (qt = u, u = il), null !== u) {
                for (t = [], r = h(), null === r && (r = a()); null !== r;) {t.push(r), r = h(),
                  null === r && (r = a());}
                null !== t ? (r = s(), null === r && (r = al), null !== r ? (Lt = n, l = dl(l, t, r),
                null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il);
              } else qt = n, n = il;} else qt = n, n = il;
            return n;
          }
          function a() {
            var n;
            return n = x(), null === n && (n = Q(), null === n && (n = B())), n;
          }
          function f() {
            var l, u;
            return l = qt, 94 === n.charCodeAt(qt) ? (u = pl, qt++) : (u = null, 0 === Wt && e(vl)),
            null !== u && (Lt = l, u = wl()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function s() {
            var l, u;
            return l = qt, 36 === n.charCodeAt(qt) ? (u = Al, qt++) : (u = null, 0 === Wt && e(Cl)),
            null !== u && (Lt = l, u = gl()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function h() {
            var n, l, u;
            return n = qt, l = a(), null !== l ? (u = d(), null !== u ? (Lt = n, l = bl(l, u),
            null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il), n;
          }
          function d() {
            var n, l, u;
            return Wt++, n = qt, l = p(), null !== l ? (u = k(), null === u && (u = al), null !== u ? (Lt = n,
            l = Tl(l, u), null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n,
            n = il), Wt--, null === n && (l = null, 0 === Wt && e(kl)), n;
          }
          function p() {
            var n;
            return n = v(), null === n && (n = w(), null === n && (n = A(), null === n && (n = C(),
            null === n && (n = g(), null === n && (n = b()))))), n;
          }
          function v() {
            var l, u, t, r, o, c;
            return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)),
            null !== u ? (t = T(), null !== t ? (44 === n.charCodeAt(qt) ? (r = ml, qt++) : (r = null,
            0 === Wt && e(Rl)), null !== r ? (o = T(), null !== o ? (125 === n.charCodeAt(qt) ? (c = Fl,
            qt++) : (c = null, 0 === Wt && e(Ql)), null !== c ? (Lt = l, u = Sl(t, o), null === u ? (qt = l,
            l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l,
            l = il)) : (qt = l, l = il), l;
          }
          function w() {
            var l, u, t, r;
            return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)),
            null !== u ? (t = T(), null !== t ? (n.substr(qt, 2) === Ul ? (r = Ul, qt += 2) : (r = null,
            0 === Wt && e(El)), null !== r ? (Lt = l, u = Gl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
          }
          function A() {
            var l, u, t, r;
            return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)),
            null !== u ? (t = T(), null !== t ? (125 === n.charCodeAt(qt) ? (r = Fl, qt++) : (r = null,
            0 === Wt && e(Ql)), null !== r ? (Lt = l, u = Bl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
          }
          function C() {
            var l, u;
            return l = qt, 43 === n.charCodeAt(qt) ? (u = jl, qt++) : (u = null, 0 === Wt && e($l)),
            null !== u && (Lt = l, u = ql()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function g() {
            var l, u;
            return l = qt, 42 === n.charCodeAt(qt) ? (u = Ll, qt++) : (u = null, 0 === Wt && e(Ml)),
            null !== u && (Lt = l, u = Dl()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function b() {
            var l, u;
            return l = qt, 63 === n.charCodeAt(qt) ? (u = Hl, qt++) : (u = null, 0 === Wt && e(Ol)),
            null !== u && (Lt = l, u = Wl()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function k() {
            var l;
            return 63 === n.charCodeAt(qt) ? (l = Hl, qt++) : (l = null, 0 === Wt && e(Ol)),
            l;
          }
          function T() {
            var l, u, t;
            if (l = qt, u = [], zl.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null,
            0 === Wt && e(Il)), null !== t) for (; null !== t;) {u.push(t), zl.test(n.charAt(qt)) ? (t = n.charAt(qt),
              qt++) : (t = null, 0 === Wt && e(Il));} else u = il;
            return null !== u && (Lt = l, u = Jl(u)), null === u ? (qt = l, l = u) : l = u,
            l;
          }
          function x() {
            var l, u, t, r;
            return l = qt, 40 === n.charCodeAt(qt) ? (u = Kl, qt++) : (u = null, 0 === Wt && e(Nl)),
            null !== u ? (t = R(), null === t && (t = F(), null === t && (t = m(), null === t && (t = y()))),
            null !== t ? (41 === n.charCodeAt(qt) ? (r = Pl, qt++) : (r = null, 0 === Wt && e(Vl)),
            null !== r ? (Lt = l, u = Xl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
          }
          function y() {
            var n, l;
            return n = qt, l = c(), null !== l && (Lt = n, l = Yl(l)), null === l ? (qt = n,
            n = l) : n = l, n;
          }
          function m() {
            var l, u, t;
            return l = qt, n.substr(qt, 2) === Zl ? (u = Zl, qt += 2) : (u = null, 0 === Wt && e(_l)),
            null !== u ? (t = c(), null !== t ? (Lt = l, u = nu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il), l;
          }
          function R() {
            var l, u, t;
            return l = qt, n.substr(qt, 2) === lu ? (u = lu, qt += 2) : (u = null, 0 === Wt && e(uu)),
            null !== u ? (t = c(), null !== t ? (Lt = l, u = tu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il), l;
          }
          function F() {
            var l, u, t;
            return l = qt, n.substr(qt, 2) === ru ? (u = ru, qt += 2) : (u = null, 0 === Wt && e(eu)),
            null !== u ? (t = c(), null !== t ? (Lt = l, u = ou(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il), l;
          }
          function Q() {
            var l, u, t, r, o;
            if (Wt++, l = qt, 91 === n.charCodeAt(qt) ? (u = iu, qt++) : (u = null, 0 === Wt && e(au)),
            null !== u) {if (94 === n.charCodeAt(qt) ? (t = pl, qt++) : (t = null, 0 === Wt && e(vl)),
              null === t && (t = al), null !== t) {
                for (r = [], o = S(), null === o && (o = U()); null !== o;) {r.push(o), o = S(),
                  null === o && (o = U());}
                null !== r ? (93 === n.charCodeAt(qt) ? (o = fu, qt++) : (o = null, 0 === Wt && e(su)),
                null !== o ? (Lt = l, u = hu(t, r), null === u ? (qt = l, l = u) : l = u) : (qt = l,
                l = il)) : (qt = l, l = il);
              } else qt = l, l = il;} else qt = l, l = il;
            return Wt--, null === l && (u = null, 0 === Wt && e(cu)), l;
          }
          function S() {
            var l, u, t, r;
            return Wt++, l = qt, u = U(), null !== u ? (45 === n.charCodeAt(qt) ? (t = pu, qt++) : (t = null,
            0 === Wt && e(vu)), null !== t ? (r = U(), null !== r ? (Lt = l, u = wu(u, r), null === u ? (qt = l,
            l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), Wt--,
            null === l && (u = null, 0 === Wt && e(du)), l;
          }
          function U() {
            var n, l;
            return Wt++, n = G(), null === n && (n = E()), Wt--, null === n && (l = null, 0 === Wt && e(Au)),
            n;
          }
          function E() {
            var l, u;
            return l = qt, Cu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, 0 === Wt && e(gu)),
            null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u, l;
          }
          function G() {
            var n;
            return n = L(), null === n && (n = Y(), null === n && (n = H(), null === n && (n = O(),
            null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), null === n && (n = J(),
            null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), null === n && (n = V(),
            null === n && (n = X(), null === n && (n = _(), null === n && (n = nl(), null === n && (n = ll(),
            null === n && (n = ul(), null === n && (n = tl()))))))))))))))))), n;
          }
          function B() {
            var n;
            return n = j(), null === n && (n = q(), null === n && (n = $())), n;
          }
          function j() {
            var l, u;
            return l = qt, 46 === n.charCodeAt(qt) ? (u = ku, qt++) : (u = null, 0 === Wt && e(Tu)),
            null !== u && (Lt = l, u = xu()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function $() {
            var l, u;
            return Wt++, l = qt, mu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null,
            0 === Wt && e(Ru)), null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u,
            Wt--, null === l && (u = null, 0 === Wt && e(yu)), l;
          }
          function q() {
            var n;
            return n = M(), null === n && (n = D(), null === n && (n = Y(), null === n && (n = H(),
            null === n && (n = O(), null === n && (n = W(), null === n && (n = z(), null === n && (n = I(),
            null === n && (n = J(), null === n && (n = K(), null === n && (n = N(), null === n && (n = P(),
            null === n && (n = V(), null === n && (n = X(), null === n && (n = Z(), null === n && (n = _(),
            null === n && (n = nl(), null === n && (n = ll(), null === n && (n = ul(), null === n && (n = tl()))))))))))))))))))),
            n;
          }
          function L() {
            var l, u;
            return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)),
            null !== u && (Lt = l, u = Su()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function M() {
            var l, u;
            return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)),
            null !== u && (Lt = l, u = Uu()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function D() {
            var l, u;
            return l = qt, n.substr(qt, 2) === Eu ? (u = Eu, qt += 2) : (u = null, 0 === Wt && e(Gu)),
            null !== u && (Lt = l, u = Bu()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function H() {
            var l, u;
            return l = qt, n.substr(qt, 2) === ju ? (u = ju, qt += 2) : (u = null, 0 === Wt && e($u)),
            null !== u && (Lt = l, u = qu()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function O() {
            var l, u;
            return l = qt, n.substr(qt, 2) === Lu ? (u = Lu, qt += 2) : (u = null, 0 === Wt && e(Mu)),
            null !== u && (Lt = l, u = Du()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function W() {
            var l, u;
            return l = qt, n.substr(qt, 2) === Hu ? (u = Hu, qt += 2) : (u = null, 0 === Wt && e(Ou)),
            null !== u && (Lt = l, u = Wu()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function z() {
            var l, u;
            return l = qt, n.substr(qt, 2) === zu ? (u = zu, qt += 2) : (u = null, 0 === Wt && e(Iu)),
            null !== u && (Lt = l, u = Ju()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function I() {
            var l, u;
            return l = qt, n.substr(qt, 2) === Ku ? (u = Ku, qt += 2) : (u = null, 0 === Wt && e(Nu)),
            null !== u && (Lt = l, u = Pu()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function J() {
            var l, u;
            return l = qt, n.substr(qt, 2) === Vu ? (u = Vu, qt += 2) : (u = null, 0 === Wt && e(Xu)),
            null !== u && (Lt = l, u = Yu()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function K() {
            var l, u;
            return l = qt, n.substr(qt, 2) === Zu ? (u = Zu, qt += 2) : (u = null, 0 === Wt && e(_u)),
            null !== u && (Lt = l, u = nt()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function N() {
            var l, u;
            return l = qt, n.substr(qt, 2) === lt ? (u = lt, qt += 2) : (u = null, 0 === Wt && e(ut)),
            null !== u && (Lt = l, u = tt()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function P() {
            var l, u;
            return l = qt, n.substr(qt, 2) === rt ? (u = rt, qt += 2) : (u = null, 0 === Wt && e(et)),
            null !== u && (Lt = l, u = ot()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function V() {
            var l, u;
            return l = qt, n.substr(qt, 2) === ct ? (u = ct, qt += 2) : (u = null, 0 === Wt && e(it)),
            null !== u && (Lt = l, u = at()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function X() {
            var l, u;
            return l = qt, n.substr(qt, 2) === ft ? (u = ft, qt += 2) : (u = null, 0 === Wt && e(st)),
            null !== u && (Lt = l, u = ht()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function Y() {
            var l, u, t;
            return l = qt, n.substr(qt, 2) === dt ? (u = dt, qt += 2) : (u = null, 0 === Wt && e(pt)),
            null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)),
            null !== t ? (Lt = l, u = wt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il), l;
          }
          function Z() {
            var l, u, t;
            return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)),
            null !== u ? (gt.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(bt)),
            null !== t ? (Lt = l, u = kt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il), l;
          }
          function _() {
            var l, u, t, r;
            if (l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)),
            null !== u) {
              if (t = [], yt.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(mt)),
              null !== r) for (; null !== r;) {t.push(r), yt.test(n.charAt(qt)) ? (r = n.charAt(qt),
                qt++) : (r = null, 0 === Wt && e(mt));} else t = il;
              null !== t ? (Lt = l, u = Rt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
              l = il);
            } else qt = l, l = il;
            return l;
          }
          function nl() {
            var l, u, t, r;
            if (l = qt, n.substr(qt, 2) === Ft ? (u = Ft, qt += 2) : (u = null, 0 === Wt && e(Qt)),
            null !== u) {
              if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)),
              null !== r) for (; null !== r;) {t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
                qt++) : (r = null, 0 === Wt && e(Ut));} else t = il;
              null !== t ? (Lt = l, u = Et(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
              l = il);
            } else qt = l, l = il;
            return l;
          }
          function ll() {
            var l, u, t, r;
            if (l = qt, n.substr(qt, 2) === Gt ? (u = Gt, qt += 2) : (u = null, 0 === Wt && e(Bt)),
            null !== u) {
              if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)),
              null !== r) for (; null !== r;) {t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
                qt++) : (r = null, 0 === Wt && e(Ut));} else t = il;
              null !== t ? (Lt = l, u = jt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
              l = il);
            } else qt = l, l = il;
            return l;
          }
          function ul() {
            var l, u;
            return l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)),
            null !== u && (Lt = l, u = $t()), null === u ? (qt = l, l = u) : l = u, l;
          }
          function tl() {
            var l, u, t;
            return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)),
            null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)),
            null !== t ? (Lt = l, u = bu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il), l;
          }
          var rl,el = arguments.length > 1 ? arguments[1] : {},ol = {
            regexp: c },
          cl = c,il = null,al = "",fl = "|",sl = '"|"',hl = function hl(n, l) {
            return l ? new Alternate(n, l[1]) : n;
          },dl = function dl(n, l, u) {
            return new Match([n].concat(l).concat([u]));
          },pl = "^",vl = '"^"',wl = function wl() {
            return new Token("start");
          },Al = "$",Cl = '"$"',gl = function gl() {
            return new Token("end");
          },bl = function bl(n, l) {
            return new Quantified(n, l);
          },kl = "Quantifier",Tl = function Tl(n, l) {
            return l && (n.greedy = !1), n;
          },xl = "{",yl = '"{"',ml = ",",Rl = '","',Fl = "}",Ql = '"}"',Sl = function Sl(n, l) {
            return new Quantifier(n, l);
          },Ul = ",}",El = '",}"',Gl = function Gl(n) {
            return new Quantifier(n, 1 / 0);
          },Bl = function Bl(n) {
            return new Quantifier(n, n);
          },jl = "+",$l = '"+"',ql = function ql() {
            return new Quantifier(1, 1 / 0);
          },Ll = "*",Ml = '"*"',Dl = function Dl() {
            return new Quantifier(0, 1 / 0);
          },Hl = "?",Ol = '"?"',Wl = function Wl() {
            return new Quantifier(0, 1);
          },zl = /^[0-9]/,Il = "[0-9]",Jl = function Jl(n) {
            return +n.join("");
          },Kl = "(",Nl = '"("',Pl = ")",Vl = '")"',Xl = function Xl(n) {
            return n;
          },Yl = function Yl(n) {
            return new CaptureGroup(n);
          },Zl = "?:",_l = '"?:"',nu = function nu(n) {
            return new Group("non-capture-group", n);
          },lu = "?=",uu = '"?="',tu = function tu(n) {
            return new Group("positive-lookahead", n);
          },ru = "?!",eu = '"?!"',ou = function ou(n) {
            return new Group("negative-lookahead", n);
          },cu = "CharacterSet",iu = "[",au = '"["',fu = "]",su = '"]"',hu = function hu(n, l) {
            return new CharSet(!!n, l);
          },du = "CharacterRange",pu = "-",vu = '"-"',wu = function wu(n, l) {
            return new CharacterRange(n, l);
          },Au = "Character",Cu = /^[^\\\]]/,gu = "[^\\\\\\]]",bu = function bu(n) {
            return new Literal(n);
          },ku = ".",Tu = '"."',xu = function xu() {
            return new Token("any-character");
          },yu = "Literal",mu = /^[^|\\\/.[()?+*$\^]/,Ru = "[^|\\\\\\/.[()?+*$\\^]",Fu = "\\b",Qu = '"\\\\b"',Su = function Su() {
            return new Token("backspace");
          },Uu = function Uu() {
            return new Token("word-boundary");
          },Eu = "\\B",Gu = '"\\\\B"',Bu = function Bu() {
            return new Token("non-word-boundary");
          },ju = "\\d",$u = '"\\\\d"',qu = function qu() {
            return new Token("digit");
          },Lu = "\\D",Mu = '"\\\\D"',Du = function Du() {
            return new Token("non-digit");
          },Hu = "\\f",Ou = '"\\\\f"',Wu = function Wu() {
            return new Token("form-feed");
          },zu = "\\n",Iu = '"\\\\n"',Ju = function Ju() {
            return new Token("line-feed");
          },Ku = "\\r",Nu = '"\\\\r"',Pu = function Pu() {
            return new Token("carriage-return");
          },Vu = "\\s",Xu = '"\\\\s"',Yu = function Yu() {
            return new Token("white-space");
          },Zu = "\\S",_u = '"\\\\S"',nt = function nt() {
            return new Token("non-white-space");
          },lt = "\\t",ut = '"\\\\t"',tt = function tt() {
            return new Token("tab");
          },rt = "\\v",et = '"\\\\v"',ot = function ot() {
            return new Token("vertical-tab");
          },ct = "\\w",it = '"\\\\w"',at = function at() {
            return new Token("word");
          },ft = "\\W",st = '"\\\\W"',ht = function ht() {
            return new Token("non-word");
          },dt = "\\c",pt = '"\\\\c"',vt = "any character",wt = function wt(n) {
            return new ControlCharacter(n);
          },At = "\\",Ct = '"\\\\"',gt = /^[1-9]/,bt = "[1-9]",kt = function kt(n) {
            return new BackReference(n);
          },Tt = "\\0",xt = '"\\\\0"',yt = /^[0-7]/,mt = "[0-7]",Rt = function Rt(n) {
            return new Octal(n.join(""));
          },Ft = "\\x",Qt = '"\\\\x"',St = /^[0-9a-fA-F]/,Ut = "[0-9a-fA-F]",Et = function Et(n) {
            return new Hex(n.join(""));
          },Gt = "\\u",Bt = "\"\\\\u\"",jt = function jt(n) {
            return new Unicode(n.join(""));
          },$t = function $t() {
            return new Token("null-character");
          },qt = 0,Lt = 0,Mt = 0,Dt = {
            line: 1,
            column: 1,
            seenCR: !1 },
          Ht = 0,Ot = [],Wt = 0;
          if ("startRule" in el) {
            if (!(el.startRule in ol)) throw new Error("Can't start parsing from rule \"" + el.startRule + '".');
            cl = ol[el.startRule];
          }
          if (Token.offset = t, Token.text = u, rl = cl(), null !== rl && qt === n.length) return rl;
          throw o(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n.length ? n.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column);
        }
        return n(l, Error), {
          SyntaxError: l,
          parse: u };

      }(),index = 1,cgs = {};

      module.exports = parser;

      /***/},
    /* 22 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                              ## RegExp Handler
                                                          
                                                              https://github.com/ForbesLindesay/regexp
                                                              https://github.com/dmajda/pegjs
                                                              http://www.regexper.com/
                                                          
                                                              每个节点的结构
                                                                  {
                                                                      type: '',
                                                                      offset: number,
                                                                      text: '',
                                                                      body: {},
                                                                      escaped: true/false
                                                                  }
                                                          
                                                              type 可选值
                                                                  alternate             |         选择
                                                                  match                 匹配
                                                                  capture-group         ()        捕获组
                                                                  non-capture-group     (?:...)   非捕获组
                                                                  positive-lookahead    (?=p)     零宽正向先行断言
                                                                  negative-lookahead    (?!p)     零宽负向先行断言
                                                                  quantified            a*        重复节点
                                                                  quantifier            *         量词
                                                                  charset               []        字符集
                                                                  range                 {m, n}    范围
                                                                  literal               a         直接量字符
                                                                  unicode               \uxxxx    Unicode
                                                                  hex                   \x        十六进制
                                                                  octal                 八进制
                                                                  back-reference        \n        反向引用
                                                                  control-character     \cX       控制字符
                                                          
                                                                  // Token
                                                                  start               ^       开头
                                                                  end                 $       结尾
                                                                  any-character       .       任意字符
                                                                  backspace           [\b]    退格直接量
                                                                  word-boundary       \b      单词边界
                                                                  non-word-boundary   \B      非单词边界
                                                                  digit               \d      ASCII 数字，[0-9]
                                                                  non-digit           \D      非 ASCII 数字，[^0-9]
                                                                  form-feed           \f      换页符
                                                                  line-feed           \n      换行符
                                                                  carriage-return     \r      回车符
                                                                  white-space         \s      空白符
                                                                  non-white-space     \S      非空白符
                                                                  tab                 \t      制表符
                                                                  vertical-tab        \v      垂直制表符
                                                                  word                \w      ASCII 字符，[a-zA-Z0-9]
                                                                  non-word            \W      非 ASCII 字符，[^a-zA-Z0-9]
                                                                  null-character      \o      NUL 字符
                                                           */

      var Util = __webpack_require__(3);
      var Random = __webpack_require__(5);
      /*
                                               
                                           */
      var Handler = {
        extend: Util.extend


        // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_code_chart
        /*var ASCII_CONTROL_CODE_CHART = {
            '@': ['\u0000'],
            A: ['\u0001'],
            B: ['\u0002'],
            C: ['\u0003'],
            D: ['\u0004'],
            E: ['\u0005'],
            F: ['\u0006'],
            G: ['\u0007', '\a'],
            H: ['\u0008', '\b'],
            I: ['\u0009', '\t'],
            J: ['\u000A', '\n'],
            K: ['\u000B', '\v'],
            L: ['\u000C', '\f'],
            M: ['\u000D', '\r'],
            N: ['\u000E'],
            O: ['\u000F'],
            P: ['\u0010'],
            Q: ['\u0011'],
            R: ['\u0012'],
            S: ['\u0013'],
            T: ['\u0014'],
            U: ['\u0015'],
            V: ['\u0016'],
            W: ['\u0017'],
            X: ['\u0018'],
            Y: ['\u0019'],
            Z: ['\u001A'],
            '[': ['\u001B', '\e'],
            '\\': ['\u001C'],
            ']': ['\u001D'],
            '^': ['\u001E'],
            '_': ['\u001F']
        }*/

        // ASCII printable code chart
        // var LOWER = 'abcdefghijklmnopqrstuvwxyz'
        // var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        // var NUMBER = '0123456789'
        // var SYMBOL = ' !"#$%&\'()*+,-./' + ':;<=>?@' + '[\\]^_`' + '{|}~'
      };var LOWER = ascii(97, 122);
      var UPPER = ascii(65, 90);
      var NUMBER = ascii(48, 57);
      var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126); // 排除 95 _ ascii(91, 94) + ascii(96, 96)
      var PRINTABLE = ascii(32, 126);
      var SPACE = " \f\n\r\t\x0B\xA0\u2028\u2029";
      var CHARACTER_CLASSES = {
        '\\w': LOWER + UPPER + NUMBER + '_', // ascii(95, 95)
        '\\W': OTHER.replace('_', ''),
        '\\s': SPACE,
        '\\S': function () {
          var result = PRINTABLE;
          for (var i = 0; i < SPACE.length; i++) {
            result = result.replace(SPACE[i], '');
          }
          return result;
        }(),
        '\\d': NUMBER,
        '\\D': LOWER + UPPER + OTHER };


      function ascii(from, to) {
        var result = '';
        for (var i = from; i <= to; i++) {
          result += String.fromCharCode(i);
        }
        return result;
      }

      // var ast = RegExpParser.parse(regexp.source)
      Handler.gen = function (node, result, cache) {
        cache = cache || {
          guid: 1 };

        return Handler[node.type] ? Handler[node.type](node, result, cache) :
        Handler.token(node, result, cache);
      };

      Handler.extend({
        /* jshint unused:false */
        token: function token(node, result, cache) {
          switch (node.type) {
            case 'start':
            case 'end':
              return '';
            case 'any-character':
              return Random.character();
            case 'backspace':
              return '';
            case 'word-boundary': // TODO
              return '';
            case 'non-word-boundary': // TODO
              break;
            case 'digit':
              return Random.pick(
              NUMBER.split(''));

            case 'non-digit':
              return Random.pick(
              (LOWER + UPPER + OTHER).split(''));

            case 'form-feed':
              break;
            case 'line-feed':
              return node.body || node.text;
            case 'carriage-return':
              break;
            case 'white-space':
              return Random.pick(
              SPACE.split(''));

            case 'non-white-space':
              return Random.pick(
              (LOWER + UPPER + NUMBER).split(''));

            case 'tab':
              break;
            case 'vertical-tab':
              break;
            case 'word': // \w [a-zA-Z0-9]
              return Random.pick(
              (LOWER + UPPER + NUMBER).split(''));

            case 'non-word': // \W [^a-zA-Z0-9]
              return Random.pick(
              OTHER.replace('_', '').split(''));

            case 'null-character':
              break;}

          return node.body || node.text;
        },
        /*
               {
                   type: 'alternate',
                   offset: 0,
                   text: '',
                   left: {
                       boyd: []
                   },
                   right: {
                       boyd: []
                   }
               }
           */
        alternate: function alternate(node, result, cache) {
          // node.left/right {}
          return this.gen(
          Random.boolean() ? node.left : node.right,
          result,
          cache);

        },
        /*
               {
                   type: 'match',
                   offset: 0,
                   text: '',
                   body: []
               }
           */
        match: function match(node, result, cache) {
          result = '';
          // node.body []
          for (var i = 0; i < node.body.length; i++) {
            result += this.gen(node.body[i], result, cache);
          }
          return result;
        },
        // ()
        'capture-group': function captureGroup(node, result, cache) {
          // node.body {}
          result = this.gen(node.body, result, cache);
          cache[cache.guid++] = result;
          return result;
        },
        // (?:...)
        'non-capture-group': function nonCaptureGroup(node, result, cache) {
          // node.body {}
          return this.gen(node.body, result, cache);
        },
        // (?=p)
        'positive-lookahead': function positiveLookahead(node, result, cache) {
          // node.body
          return this.gen(node.body, result, cache);
        },
        // (?!p)
        'negative-lookahead': function negativeLookahead(node, result, cache) {
          // node.body
          return '';
        },
        /*
               {
                   type: 'quantified',
                   offset: 3,
                   text: 'c*',
                   body: {
                       type: 'literal',
                       offset: 3,
                       text: 'c',
                       body: 'c',
                       escaped: false
                   },
                   quantifier: {
                       type: 'quantifier',
                       offset: 4,
                       text: '*',
                       min: 0,
                       max: Infinity,
                       greedy: true
                   }
               }
           */
        quantified: function quantified(node, result, cache) {
          result = '';
          // node.quantifier {}
          var count = this.quantifier(node.quantifier);
          // node.body {}
          for (var i = 0; i < count; i++) {
            result += this.gen(node.body, result, cache);
          }
          return result;
        },
        /*
               quantifier: {
                   type: 'quantifier',
                   offset: 4,
                   text: '*',
                   min: 0,
                   max: Infinity,
                   greedy: true
               }
           */
        quantifier: function quantifier(node, result, cache) {
          var min = Math.max(node.min, 0);
          var max = isFinite(node.max) ? node.max :
          min + Random.integer(3, 7);
          return Random.integer(min, max);
        },
        /*
               
           */
        charset: function charset(node, result, cache) {
          // node.invert
          if (node.invert) return this['invert-charset'](node, result, cache);

          // node.body []
          var literal = Random.pick(node.body);
          return this.gen(literal, result, cache);
        },
        'invert-charset': function invertCharset(node, result, cache) {
          var pool = PRINTABLE;
          for (var i = 0, item; i < node.body.length; i++) {
            item = node.body[i];
            switch (item.type) {
              case 'literal':
                pool = pool.replace(item.body, '');
                break;
              case 'range':
                var min = this.gen(item.start, result, cache).charCodeAt();
                var max = this.gen(item.end, result, cache).charCodeAt();
                for (var ii = min; ii <= max; ii++) {
                  pool = pool.replace(String.fromCharCode(ii), '');
                }
              /* falls through */
              default:
                var characters = CHARACTER_CLASSES[item.text];
                if (characters) {
                  for (var iii = 0; iii <= characters.length; iii++) {
                    pool = pool.replace(characters[iii], '');
                  }
                }}

          }
          return Random.pick(pool.split(''));
        },
        range: function range(node, result, cache) {
          // node.start, node.end
          var min = this.gen(node.start, result, cache).charCodeAt();
          var max = this.gen(node.end, result, cache).charCodeAt();
          return String.fromCharCode(
          Random.integer(min, max));

        },
        literal: function literal(node, result, cache) {
          return node.escaped ? node.body : node.text;
        },
        // Unicode \u
        unicode: function unicode(node, result, cache) {
          return String.fromCharCode(
          parseInt(node.code, 16));

        },
        // 十六进制 \xFF
        hex: function hex(node, result, cache) {
          return String.fromCharCode(
          parseInt(node.code, 16));

        },
        // 八进制 \0
        octal: function octal(node, result, cache) {
          return String.fromCharCode(
          parseInt(node.code, 8));

        },
        // 反向引用
        'back-reference': function backReference(node, result, cache) {
          return cache[node.code] || '';
        },
        /*
               http://en.wikipedia.org/wiki/C0_and_C1_control_codes
           */
        CONTROL_CHARACTER_MAP: function () {
          var CONTROL_CHARACTER = '@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _'.split(' ');
          var CONTROL_CHARACTER_UNICODE = "\0 \x01 \x02 \x03 \x04 \x05 \x06 \x07 \b \t \n \x0B \f \r \x0E \x0F \x10 \x11 \x12 \x13 \x14 \x15 \x16 \x17 \x18 \x19 \x1A \x1B \x1C \x1D \x1E \x1F".split(' ');
          var map = {};
          for (var i = 0; i < CONTROL_CHARACTER.length; i++) {
            map[CONTROL_CHARACTER[i]] = CONTROL_CHARACTER_UNICODE[i];
          }
          return map;
        }(),
        'control-character': function controlCharacter(node, result, cache) {
          return this.CONTROL_CHARACTER_MAP[node.code];
        } });


      module.exports = Handler;

      /***/},
    /* 23 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = __webpack_require__(24);

      /***/},
    /* 24 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                              ## toJSONSchema
                                                          
                                                              把 Mock.js 风格的数据模板转换成 JSON Schema。
                                                          
                                                              > [JSON Schema](http://json-schema.org/)
                                                           */
      var Constant = __webpack_require__(2);
      var Util = __webpack_require__(3);
      var Parser = __webpack_require__(4);

      function toJSONSchema(template, name, path /* Internal Use Only */) {
        // type rule properties items
        path = path || [];
        var result = {
          name: typeof name === 'string' ? name.replace(Constant.RE_KEY, '$1') : name,
          template: template,
          type: Util.type(template), // 可能不准确，例如 { 'name|1': [{}, {} ...] }
          rule: Parser.parse(name) };

        result.path = path.slice(0);
        result.path.push(name === undefined ? 'ROOT' : result.name);

        switch (result.type) {
          case 'array':
            result.items = [];
            Util.each(template, function (value, index) {
              result.items.push(
              toJSONSchema(value, index, result.path));

            });
            break;
          case 'object':
            result.properties = [];
            Util.each(template, function (value, name) {
              result.properties.push(
              toJSONSchema(value, name, result.path));

            });
            break;}


        return result;

      }

      module.exports = toJSONSchema;


      /***/},
    /* 25 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = __webpack_require__(26);

      /***/},
    /* 26 */
    /***/function (module, exports, __webpack_require__) {

      /*
                                                              ## valid(template, data)
                                                          
                                                              校验真实数据 data 是否与数据模板 template 匹配。
                                                              
                                                              实现思路：
                                                              1. 解析规则。
                                                                  先把数据模板 template 解析为更方便机器解析的 JSON-Schame
                                                                  name               属性名 
                                                                  type               属性值类型
                                                                  template           属性值模板
                                                                  properties         对象属性数组
                                                                  items              数组元素数组
                                                                  rule               属性值生成规则
                                                              2. 递归验证规则。
                                                                  然后用 JSON-Schema 校验真实数据，校验项包括属性名、值类型、值、值生成规则。
                                                          
                                                              提示信息 
                                                              https://github.com/fge/json-schema-validator/blob/master/src/main/resources/com/github/fge/jsonschema/validator/validation.properties
                                                              [JSON-Schama validator](http://json-schema-validator.herokuapp.com/)
                                                              [Regexp Demo](http://demos.forbeslindesay.co.uk/regexp/)
                                                          */
      var Constant = __webpack_require__(2);
      var Util = __webpack_require__(3);
      var toJSONSchema = __webpack_require__(23);

      function valid(template, data) {
        var schema = toJSONSchema(template);
        var result = Diff.diff(schema, data);
        for (var i = 0; i < result.length; i++) {
          // console.log(template, data)
          // console.warn(Assert.message(result[i]))
        }
        return result;
      }

      /*
            ## name
                有生成规则：比较解析后的 name
                无生成规则：直接比较
            ## type
                无类型转换：直接比较
                有类型转换：先试着解析 template，然后再检查？
            ## value vs. template
                基本类型
                    无生成规则：直接比较
                    有生成规则：
                        number
                            min-max.dmin-dmax
                            min-max.dcount
                            count.dmin-dmax
                            count.dcount
                            +step
                            整数部分
                            小数部分
                        boolean 
                        string  
                            min-max
                            count
            ## properties
                对象
                    有生成规则：检测期望的属性个数，继续递归
                    无生成规则：检测全部的属性个数，继续递归
            ## items
                数组
                    有生成规则：
                        `'name|1': [{}, {} ...]`            其中之一，继续递归
                        `'name|+1': [{}, {} ...]`           顺序检测，继续递归
                        `'name|min-max': [{}, {} ...]`      检测个数，继续递归
                        `'name|count': [{}, {} ...]`        检测个数，继续递归
                    无生成规则：检测全部的元素个数，继续递归
        */
      var Diff = {
        diff: function diff(schema, data, name /* Internal Use Only */) {
          var result = [];

          // 先检测名称 name 和类型 type，如果匹配，才有必要继续检测
          if (
          this.name(schema, data, name, result) &&
          this.type(schema, data, name, result))
          {
            this.value(schema, data, name, result);
            this.properties(schema, data, name, result);
            this.items(schema, data, name, result);
          }

          return result;
        },
        /* jshint unused:false */
        name: function name(schema, data, _name, result) {
          var length = result.length;

          Assert.equal('name', schema.path, _name + '', schema.name + '', result);

          return result.length === length;
        },
        type: function type(schema, data, name, result) {
          var length = result.length;

          switch (schema.type) {
            case 'string':
              // 跳过含有『占位符』的属性值，因为『占位符』返回值的类型可能和模板不一致，例如 '@int' 会返回一个整形值
              if (schema.template.match(Constant.RE_PLACEHOLDER)) return true;
              break;
            case 'array':
              if (schema.rule.parameters) {
                // name|count: array
                if (schema.rule.min !== undefined && schema.rule.max === undefined) {
                  // 跳过 name|1: array，因为最终值的类型（很可能）不是数组，也不一定与 `array` 中的类型一致
                  if (schema.rule.count === 1) return true;
                }
                // 跳过 name|+inc: array
                if (schema.rule.parameters[2]) return true;
              }
              break;
            case 'function':
              // 跳过 `'name': function`，因为函数可以返回任何类型的值。
              return true;}


          Assert.equal('type', schema.path, Util.type(data), schema.type, result);

          return result.length === length;
        },
        value: function value(schema, data, name, result) {
          var length = result.length;

          var rule = schema.rule;
          var templateType = schema.type;
          if (templateType === 'object' || templateType === 'array' || templateType === 'function') return true;

          // 无生成规则
          if (!rule.parameters) {
            switch (templateType) {
              case 'regexp':
                Assert.match('value', schema.path, data, schema.template, result);
                return result.length === length;
              case 'string':
                // 同样跳过含有『占位符』的属性值，因为『占位符』的返回值会通常会与模板不一致
                if (schema.template.match(Constant.RE_PLACEHOLDER)) return result.length === length;
                break;}

            Assert.equal('value', schema.path, data, schema.template, result);
            return result.length === length;
          }

          // 有生成规则
          var actualRepeatCount;
          switch (templateType) {
            case 'number':
              var parts = (data + '').split('.');
              parts[0] = +parts[0];

              // 整数部分
              // |min-max
              if (rule.min !== undefined && rule.max !== undefined) {
                Assert.greaterThanOrEqualTo('value', schema.path, parts[0], Math.min(rule.min, rule.max), result);
                // , 'numeric instance is lower than the required minimum (minimum: {expected}, found: {actual})')
                Assert.lessThanOrEqualTo('value', schema.path, parts[0], Math.max(rule.min, rule.max), result);
              }
              // |count
              if (rule.min !== undefined && rule.max === undefined) {
                Assert.equal('value', schema.path, parts[0], rule.min, result, '[value] ' + name);
              }

              // 小数部分
              if (rule.decimal) {
                // |dmin-dmax
                if (rule.dmin !== undefined && rule.dmax !== undefined) {
                  Assert.greaterThanOrEqualTo('value', schema.path, parts[1].length, rule.dmin, result);
                  Assert.lessThanOrEqualTo('value', schema.path, parts[1].length, rule.dmax, result);
                }
                // |dcount
                if (rule.dmin !== undefined && rule.dmax === undefined) {
                  Assert.equal('value', schema.path, parts[1].length, rule.dmin, result);
                }
              }

              break;

            case 'boolean':
              break;

            case 'string':
              // 'aaa'.match(/a/g)
              actualRepeatCount = data.match(new RegExp(schema.template, 'g'));
              actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;

              // |min-max
              if (rule.min !== undefined && rule.max !== undefined) {
                Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result);
                Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result);
              }
              // |count
              if (rule.min !== undefined && rule.max === undefined) {
                Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
              }

              break;

            case 'regexp':
              actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ''), 'g'));
              actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;

              // |min-max
              if (rule.min !== undefined && rule.max !== undefined) {
                Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result);
                Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result);
              }
              // |count
              if (rule.min !== undefined && rule.max === undefined) {
                Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
              }
              break;}


          return result.length === length;
        },
        properties: function properties(schema, data, name, result) {
          var length = result.length;

          var rule = schema.rule;
          var keys = Util.keys(data);
          if (!schema.properties) return;

          // 无生成规则
          if (!schema.rule.parameters) {
            Assert.equal('properties length', schema.path, keys.length, schema.properties.length, result);
          } else {
            // 有生成规则
            // |min-max
            if (rule.min !== undefined && rule.max !== undefined) {
              Assert.greaterThanOrEqualTo('properties length', schema.path, keys.length, Math.min(rule.min, rule.max), result);
              Assert.lessThanOrEqualTo('properties length', schema.path, keys.length, Math.max(rule.min, rule.max), result);
            }
            // |count
            if (rule.min !== undefined && rule.max === undefined) {
              // |1, |>1
              if (rule.count !== 1) Assert.equal('properties length', schema.path, keys.length, rule.min, result);
            }
          }

          if (result.length !== length) return false;

          for (var i = 0; i < keys.length; i++) {
            result.push.apply(
            result,
            this.diff(
            function () {
              var property;
              Util.each(schema.properties, function (item /*, index*/) {
                if (item.name === keys[i]) property = item;
              });
              return property || schema.properties[i];
            }(),
            data[keys[i]],
            keys[i]));


          }

          return result.length === length;
        },
        items: function items(schema, data, name, result) {
          var length = result.length;

          if (!schema.items) return;

          var rule = schema.rule;

          // 无生成规则
          if (!schema.rule.parameters) {
            Assert.equal('items length', schema.path, data.length, schema.items.length, result);
          } else {
            // 有生成规则
            // |min-max
            if (rule.min !== undefined && rule.max !== undefined) {
              Assert.greaterThanOrEqualTo('items', schema.path, data.length, Math.min(rule.min, rule.max) * schema.items.length, result,
              '[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements');
              Assert.lessThanOrEqualTo('items', schema.path, data.length, Math.max(rule.min, rule.max) * schema.items.length, result,
              '[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements');
            }
            // |count
            if (rule.min !== undefined && rule.max === undefined) {
              // |1, |>1
              if (rule.count === 1) return result.length === length;else
              Assert.equal('items length', schema.path, data.length, rule.min * schema.items.length, result);
            }
            // |+inc
            if (rule.parameters[2]) return result.length === length;
          }

          if (result.length !== length) return false;

          for (var i = 0; i < data.length; i++) {
            result.push.apply(
            result,
            this.diff(
            schema.items[i % schema.items.length],
            data[i],
            i % schema.items.length));


          }

          return result.length === length;
        }


        /*
              完善、友好的提示信息
              
              Equal, not equal to, greater than, less than, greater than or equal to, less than or equal to
              路径 验证类型 描述 
          
              Expect path.name is less than or equal to expected, but path.name is actual.
          
              Expect path.name is less than or equal to expected, but path.name is actual.
              Expect path.name is greater than or equal to expected, but path.name is actual.
          
          */ };
      var Assert = {
        message: function message(item) {
          return (item.message ||
          '[{utype}] Expect {path}\'{ltype} {action} {expected}, but is {actual}').
          replace('{utype}', item.type.toUpperCase()).
          replace('{ltype}', item.type.toLowerCase()).
          replace('{path}', Util.isArray(item.path) && item.path.join('.') || item.path).
          replace('{action}', item.action).
          replace('{expected}', item.expected).
          replace('{actual}', item.actual);
        },
        equal: function equal(type, path, actual, expected, result, message) {
          if (actual === expected) return true;
          switch (type) {
            case 'type':
              // 正则模板 === 字符串最终值
              if (expected === 'regexp' && actual === 'string') return true;
              break;}


          var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is equal to',
            message: message };

          item.message = Assert.message(item);
          result.push(item);
          return false;
        },
        // actual matches expected
        match: function match(type, path, actual, expected, result, message) {
          if (expected.test(actual)) return true;

          var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'matches',
            message: message };

          item.message = Assert.message(item);
          result.push(item);
          return false;
        },
        notEqual: function notEqual(type, path, actual, expected, result, message) {
          if (actual !== expected) return true;
          var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is not equal to',
            message: message };

          item.message = Assert.message(item);
          result.push(item);
          return false;
        },
        greaterThan: function greaterThan(type, path, actual, expected, result, message) {
          if (actual > expected) return true;
          var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is greater than',
            message: message };

          item.message = Assert.message(item);
          result.push(item);
          return false;
        },
        lessThan: function lessThan(type, path, actual, expected, result, message) {
          if (actual < expected) return true;
          var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is less to',
            message: message };

          item.message = Assert.message(item);
          result.push(item);
          return false;
        },
        greaterThanOrEqualTo: function greaterThanOrEqualTo(type, path, actual, expected, result, message) {
          if (actual >= expected) return true;
          var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is greater than or equal to',
            message: message };

          item.message = Assert.message(item);
          result.push(item);
          return false;
        },
        lessThanOrEqualTo: function lessThanOrEqualTo(type, path, actual, expected, result, message) {
          if (actual <= expected) return true;
          var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is less than or equal to',
            message: message };

          item.message = Assert.message(item);
          result.push(item);
          return false;
        } };


      valid.Diff = Diff;
      valid.Assert = Assert;

      module.exports = valid;

      /***/},
    /* 27 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = __webpack_require__(28);

      /***/},
    /* 28 */
    /***/function (module, exports, __webpack_require__) {

      /* global window, document, location, Event, setTimeout */
      /*
                                                                     ## MockXMLHttpRequest
                                                                 
                                                                     期望的功能：
                                                                     1. 完整地覆盖原生 XHR 的行为
                                                                     2. 完整地模拟原生 XHR 的行为
                                                                     3. 在发起请求时，自动检测是否需要拦截
                                                                     4. 如果不必拦截，则执行原生 XHR 的行为
                                                                     5. 如果需要拦截，则执行虚拟 XHR 的行为
                                                                     6. 兼容 XMLHttpRequest 和 ActiveXObject
                                                                         new window.XMLHttpRequest()
                                                                         new window.ActiveXObject("Microsoft.XMLHTTP")
                                                                 
                                                                     关键方法的逻辑：
                                                                     * new   此时尚无法确定是否需要拦截，所以创建原生 XHR 对象是必须的。
                                                                     * open  此时可以取到 URL，可以决定是否进行拦截。
                                                                     * send  此时已经确定了请求方式。
                                                                 
                                                                     规范：
                                                                     http://xhr.spec.whatwg.org/
                                                                     http://www.w3.org/TR/XMLHttpRequest2/
                                                                 
                                                                     参考实现：
                                                                     https://github.com/philikon/MockHttpRequest/blob/master/lib/mock.js
                                                                     https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js
                                                                     https://github.com/ilinsky/xmlhttprequest/blob/master/XMLHttpRequest.js
                                                                     https://github.com/firebug/firebug-lite/blob/master/content/lite/xhr.js
                                                                     https://github.com/thx/RAP/blob/master/lab/rap.plugin.xinglie.js
                                                                 
                                                                     **需不需要全面重写 XMLHttpRequest？**
                                                                         http://xhr.spec.whatwg.org/#interface-xmlhttprequest
                                                                         关键属性 readyState、status、statusText、response、responseText、responseXML 是 readonly，所以，试图通过修改这些状态，来模拟响应是不可行的。
                                                                         因此，唯一的办法是模拟整个 XMLHttpRequest，就像 jQuery 对事件模型的封装。
                                                                 
                                                                     // Event handlers
                                                                     onloadstart         loadstart
                                                                     onprogress          progress
                                                                     onabort             abort
                                                                     onerror             error
                                                                     onload              load
                                                                     ontimeout           timeout
                                                                     onloadend           loadend
                                                                     onreadystatechange  readystatechange
                                                                  */

      var Util = __webpack_require__(3);

      // 备份原生 XMLHttpRequest
      window._XMLHttpRequest = window.XMLHttpRequest;
      window._ActiveXObject = window.ActiveXObject;

      /*
                                                        PhantomJS
                                                        TypeError: '[object EventConstructor]' is not a constructor (evaluating 'new Event("readystatechange")')
                                                    
                                                        https://github.com/bluerail/twitter-bootstrap-rails-confirm/issues/18
                                                        https://github.com/ariya/phantomjs/issues/11289
                                                    */
      try {
        new window.Event('custom');
      } catch (exception) {
        window.Event = function (type, bubbles, cancelable, detail) {
          var event = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
          event.initCustomEvent(type, bubbles, cancelable, detail);
          return event;
        };
      }

      var XHR_STATES = {
        // The object has been constructed.
        UNSENT: 0,
        // The open() method has been successfully invoked.
        OPENED: 1,
        // All redirects (if any) have been followed and all HTTP headers of the response have been received.
        HEADERS_RECEIVED: 2,
        // The response's body is being received.
        LOADING: 3,
        // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).
        DONE: 4 };


      var XHR_EVENTS = 'readystatechange loadstart progress abort error load timeout loadend'.split(' ');
      var XHR_REQUEST_PROPERTIES = 'timeout withCredentials'.split(' ');
      var XHR_RESPONSE_PROPERTIES = 'readyState responseURL status statusText responseType response responseText responseXML'.split(' ');

      // https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js#L32
      var HTTP_STATUS_CODES = {
        100: "Continue",
        101: "Switching Protocols",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        300: "Multiple Choice",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Long",
        415: "Unsupported Media Type",
        416: "Requested Range Not Satisfiable",
        417: "Expectation Failed",
        422: "Unprocessable Entity",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported"


        /*
                                              MockXMLHttpRequest
                                          */ };

      function MockXMLHttpRequest() {
        // 初始化 custom 对象，用于存储自定义属性
        this.custom = {
          events: {},
          requestHeaders: {},
          responseHeaders: {} };

      }

      MockXMLHttpRequest._settings = {
        timeout: '10-100'
        /*
                              timeout: 50,
                              timeout: '10-100',
                           */ };


      MockXMLHttpRequest.setup = function (settings) {
        Util.extend(MockXMLHttpRequest._settings, settings);
        return MockXMLHttpRequest._settings;
      };

      Util.extend(MockXMLHttpRequest, XHR_STATES);
      Util.extend(MockXMLHttpRequest.prototype, XHR_STATES);

      // 标记当前对象为 MockXMLHttpRequest
      MockXMLHttpRequest.prototype.mock = true;

      // 是否拦截 Ajax 请求
      MockXMLHttpRequest.prototype.match = false;

      // 初始化 Request 相关的属性和方法
      Util.extend(MockXMLHttpRequest.prototype, {
        // https://xhr.spec.whatwg.org/#the-open()-method
        // Sets the request method, request URL, and synchronous flag.
        open: function open(method, url, async, username, password) {
          var that = this;

          Util.extend(this.custom, {
            method: method,
            url: url,
            async: typeof async === 'boolean' ? async : true,
            username: username,
            password: password,
            options: {
              url: url,
              type: method } });



          this.custom.timeout = function (timeout) {
            if (typeof timeout === 'number') return timeout;
            if (typeof timeout === 'string' && !~timeout.indexOf('-')) return parseInt(timeout, 10);
            if (typeof timeout === 'string' && ~timeout.indexOf('-')) {
              var tmp = timeout.split('-');
              var min = parseInt(tmp[0], 10);
              var max = parseInt(tmp[1], 10);
              return Math.round(Math.random() * (max - min)) + min;
            }
          }(MockXMLHttpRequest._settings.timeout);

          // 查找与请求参数匹配的数据模板
          var item = find(this.custom.options);

          function handle(event) {
            // 同步属性 NativeXMLHttpRequest => MockXMLHttpRequest
            for (var i = 0; i < XHR_RESPONSE_PROPERTIES.length; i++) {
              try {
                that[XHR_RESPONSE_PROPERTIES[i]] = xhr[XHR_RESPONSE_PROPERTIES[i]];
              } catch (e) {}
            }
            // 触发 MockXMLHttpRequest 上的同名事件
            that.dispatchEvent(new Event(event.type /*, false, false, that*/));
          }

          // 如果未找到匹配的数据模板，则采用原生 XHR 发送请求。
          if (!item) {
            // 创建原生 XHR 对象，调用原生 open()，监听所有原生事件
            var xhr = createNativeXMLHttpRequest();
            this.custom.xhr = xhr;

            // 初始化所有事件，用于监听原生 XHR 对象的事件
            for (var i = 0; i < XHR_EVENTS.length; i++) {
              xhr.addEventListener(XHR_EVENTS[i], handle);
            }

            // xhr.open()
            if (username) xhr.open(method, url, async, username, password);else
            xhr.open(method, url, async);

            // 同步属性 MockXMLHttpRequest => NativeXMLHttpRequest
            for (var j = 0; j < XHR_REQUEST_PROPERTIES.length; j++) {
              try {
                xhr[XHR_REQUEST_PROPERTIES[j]] = that[XHR_REQUEST_PROPERTIES[j]];
              } catch (e) {}
            }

            return;
          }

          // 找到了匹配的数据模板，开始拦截 XHR 请求
          this.match = true;
          this.custom.template = item;
          this.readyState = MockXMLHttpRequest.OPENED;
          this.dispatchEvent(new Event('readystatechange' /*, false, false, this*/));
        },
        // https://xhr.spec.whatwg.org/#the-setrequestheader()-method
        // Combines a header in author request headers.
        setRequestHeader: function setRequestHeader(name, value) {
          // 原生 XHR
          if (!this.match) {
            this.custom.xhr.setRequestHeader(name, value);
            return;
          }

          // 拦截 XHR
          var requestHeaders = this.custom.requestHeaders;
          if (requestHeaders[name]) requestHeaders[name] += ',' + value;else
          requestHeaders[name] = value;
        },
        timeout: 0,
        withCredentials: false,
        upload: {},
        // https://xhr.spec.whatwg.org/#the-send()-method
        // Initiates the request.
        send: function send(data) {
          var that = this;
          this.custom.options.body = data;

          // 原生 XHR
          if (!this.match) {
            this.custom.xhr.send(data);
            return;
          }

          // 拦截 XHR

          // X-Requested-With header
          this.setRequestHeader('X-Requested-With', 'MockXMLHttpRequest');

          // loadstart The fetch initiates.
          this.dispatchEvent(new Event('loadstart' /*, false, false, this*/));

          if (this.custom.async) setTimeout(done, this.custom.timeout); // 异步
          else done(); // 同步

          function done() {
            that.readyState = MockXMLHttpRequest.HEADERS_RECEIVED;
            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/));
            that.readyState = MockXMLHttpRequest.LOADING;
            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/));

            that.status = 200;
            that.statusText = HTTP_STATUS_CODES[200];

            // fix #92 #93 by @qddegtya
            that.response = that.responseText = JSON.stringify(
            convert(that.custom.template, that.custom.options),
            null, 4);


            that.readyState = MockXMLHttpRequest.DONE;
            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/));
            that.dispatchEvent(new Event('load' /*, false, false, that*/));
            that.dispatchEvent(new Event('loadend' /*, false, false, that*/));
          }
        },
        // https://xhr.spec.whatwg.org/#the-abort()-method
        // Cancels any network activity.
        abort: function abort() {
          // 原生 XHR
          if (!this.match) {
            this.custom.xhr.abort();
            return;
          }

          // 拦截 XHR
          this.readyState = MockXMLHttpRequest.UNSENT;
          this.dispatchEvent(new Event('abort', false, false, this));
          this.dispatchEvent(new Event('error', false, false, this));
        } });


      // 初始化 Response 相关的属性和方法
      Util.extend(MockXMLHttpRequest.prototype, {
        responseURL: '',
        status: MockXMLHttpRequest.UNSENT,
        statusText: '',
        // https://xhr.spec.whatwg.org/#the-getresponseheader()-method
        getResponseHeader: function getResponseHeader(name) {
          // 原生 XHR
          if (!this.match) {
            return this.custom.xhr.getResponseHeader(name);
          }

          // 拦截 XHR
          return this.custom.responseHeaders[name.toLowerCase()];
        },
        // https://xhr.spec.whatwg.org/#the-getallresponseheaders()-method
        // http://www.utf8-chartable.de/
        getAllResponseHeaders: function getAllResponseHeaders() {
          // 原生 XHR
          if (!this.match) {
            return this.custom.xhr.getAllResponseHeaders();
          }

          // 拦截 XHR
          var responseHeaders = this.custom.responseHeaders;
          var headers = '';
          for (var h in responseHeaders) {
            if (!responseHeaders.hasOwnProperty(h)) continue;
            headers += h + ': ' + responseHeaders[h] + '\r\n';
          }
          return headers;
        },
        overrideMimeType: function overrideMimeType() /*mime*/{},
        responseType: '', // '', 'text', 'arraybuffer', 'blob', 'document', 'json'
        response: null,
        responseText: '',
        responseXML: null });


      // EventTarget
      Util.extend(MockXMLHttpRequest.prototype, {
        addEventListener: function addEventListener(type, handle) {
          var events = this.custom.events;
          if (!events[type]) events[type] = [];
          events[type].push(handle);
        },
        removeEventListener: function removeEventListener(type, handle) {
          var handles = this.custom.events[type] || [];
          for (var i = 0; i < handles.length; i++) {
            if (handles[i] === handle) {
              handles.splice(i--, 1);
            }
          }
        },
        dispatchEvent: function dispatchEvent(event) {
          var handles = this.custom.events[event.type] || [];
          for (var i = 0; i < handles.length; i++) {
            handles[i].call(this, event);
          }

          var ontype = 'on' + event.type;
          if (this[ontype]) this[ontype](event);
        } });


      // Inspired by jQuery
      function createNativeXMLHttpRequest() {
        var isLocal = function () {
          var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
          var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
          var ajaxLocation = location.href;
          var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
          return rlocalProtocol.test(ajaxLocParts[1]);
        }();

        return window.ActiveXObject ?
        !isLocal && createStandardXHR() || createActiveXHR() : createStandardXHR();

        function createStandardXHR() {
          try {
            return new window._XMLHttpRequest();
          } catch (e) {}
        }

        function createActiveXHR() {
          try {
            return new window._ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {}
        }
      }


      // 查找与请求参数匹配的数据模板：URL，Type
      function find(options) {

        for (var sUrlType in MockXMLHttpRequest.Mock._mocked) {
          var item = MockXMLHttpRequest.Mock._mocked[sUrlType];
          if (
          (!item.rurl || match(item.rurl, options.url)) && (
          !item.rtype || match(item.rtype, options.type.toLowerCase())))
          {
            // console.log('[mock]', options.url, '>', item.rurl)
            return item;
          }
        }

        function match(expected, actual) {
          if (Util.type(expected) === 'string') {
            return expected === actual;
          }
          if (Util.type(expected) === 'regexp') {
            return expected.test(actual);
          }
        }

      }

      // 数据模板 ＝> 响应数据
      function convert(item, options) {
        return Util.isFunction(item.template) ?
        item.template(options) : MockXMLHttpRequest.Mock.mock(item.template);
      }

      module.exports = MockXMLHttpRequest;

      /***/}]));

});
;

/***/ }),

/***/ 22:
/*!***************************************************************!*\
  !*** D:/project/uniapp-frame/mock/queryIndexBannerDtoPage.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mockjs = _interopRequireDefault(__webpack_require__(/*! mockjs */ 21));

var _data_frame = _interopRequireDefault(__webpack_require__(/*! ./data_frame.js */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var data = _mockjs.default.mock(_objectSpread({},
_data_frame.default, {
  'data|6-8': [{
    // "id":"@id",
    "id": "@increment",
    bannerUrl: '@url',
    bannerFile: '@image("720x300","@color","hello")'
    //'name': "@ctitle(2,3)",
    // 'name': "@cname"//,
    //"img": "@dataimage('120x120','@color','hello')",
    // "img": "@image('120x120','@color','hello')",
    // "brief": "@csentence(8,50)",
    // "price|0-20.0-2": 1,
    // "num": 0,
    // "minusFlag": true,
    // "date": "@datetime",
    // "peisongfei|0-100.0-2": 1,
    // "limit|0-50": 1
  }] }));var _default =


data;exports.default = _default;

/***/ }),

/***/ 220:
/*!**********************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Activity/application/validate.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [

{
  name: "name",
  checkType: "string",
  checkRule: "^.{1,15}$",
  errorMsg: "请输入长度1~15位真实姓名" },

{
  name: "phone",
  checkType: "phoneno",
  checkRule: "",
  errorMsg: "请输入正确的手机号" },


{
  name: "email",
  checkType: "email",
  checkRule: "^.{1,25}$",
  errorMsg: "请输入长度1~40位的邮件" },

{
  name: "wechat",
  checkType: "string",
  isRequire: false,
  checkRule: "^.{0,25}$",
  errorMsg: "请输入长度1~25位的微信名" },

{
  name: "company",
  checkType: "string",
  checkRule: "^.{1,50}$",
  errorMsg: "请输入长度1~50位的任职公司" },

{
  name: "job",
  checkType: "string",
  checkRule: "^.{1,25}$",
  errorMsg: "请输入长度1~25位的现任职务" }];



module.exports = rule;

/***/ }),

/***/ 23:
/*!**************************************************!*\
  !*** D:/project/uniapp-frame/mock/data_frame.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var data = {
  message: '成功',
  flag: true,
  code: 0,
  data: {} };var _default =

data;exports.default = _default;

/***/ }),

/***/ 290:
/*!*******************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/QyBasicInfo/validate.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "companyName",
  checkType: "string",
  checkRule: "^.{1,50}$",
  errorMsg: "请输入长度1~50位企业全称" },

{
  name: "companyShortName",
  checkType: "string",
  checkRule: "^.{0,15}$",
  errorMsg: "请输入有效的企业简称" },

{
  name: "registerNo",
  checkType: "string",
  checkRule: "^(.{15}|.{18})$",
  errorMsg: "请输入有效的统一社会信用代码" },

{
  name: "legarPerson",
  checkType: "string",
  checkRule: "^.{0,20}$",
  errorMsg: "请输入有效的法定代表人" },

{
  name: "registerPhone",
  checkType: "phoneno",
  checkRule: "",
  errorMsg: "请输入正确的注册手机号" },

{
  name: "registerName",
  checkType: "string",
  checkRule: "^.{1,20}$",
  errorMsg: "请输入长度1~20位注册人姓名" },

{
  name: "registerJob",
  checkType: "string",
  checkRule: "^.{1,20}$",
  errorMsg: "请输入长度1~20位注册人职务" },

{
  name: "leaderPhone",
  checkType: "phoneno",
  checkRule: "",
  errorMsg: "请输入正确的融资负责人手机号" },

{
  name: "leaderName",
  checkType: "string",
  checkRule: "^.{1,20}$",
  errorMsg: "请输入长度1~20位融资负责人姓名" },

{
  name: "leaderJob",
  checkType: "string",
  checkRule: "^.{1,20}$",
  errorMsg: "请输入长度1~20位融资负责人职务" },

{
  name: "leaderTel",
  checkType: "string",
  checkRule: "^.{0,20}$",
  errorMsg: "请输入长度1~20位融资负责人座机" },

{
  name: "leaderEmail",
  checkType: "string",
  checkRule: "^.{1,40}$",
  errorMsg: "请输入长度1~40位融资负责人邮箱" },

{
  name: "registerMoney",
  checkType: "string",
  checkRule: "^(([^0][0-9]{1,13}|0)\.([0-9]{1})$)|^(([^0][0-9]{1,12}|0)\.([0-9]{1,2})$)|^([^0][0-9]{1,14}|0)$",
  // checkRule:"^(([^0][0-9]{1,14}|0)\.([0-9]{0,8})$)|^([^0][0-9]{1,14}|0)$",
  errorMsg: "请输入长度1~15位注册资本" },

{
  name: "address",
  checkType: "string",
  checkRule: "^.{0,50}$",
  errorMsg: "请输入有效的详细地址" },

{
  name: "website",
  checkType: "string",
  checkRule: "^.{0,50}$",
  errorMsg: "请输入有效的企业网址" },

{
  name: "intro",
  checkType: "string",
  checkRule: "^.{1,500}$",
  errorMsg: "请输入长度1~500位企业介绍" }];



module.exports = rule;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 319:
/*!*******************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/XmBasinInfo/validate.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "projectName",
  checkType: "string",
  checkRule: "^.{1,50}$",
  errorMsg: "请输入长度1~50位项目名称" },

{
  name: "xmjs",
  checkType: "string",
  checkRule: "^.{1,500}$",
  errorMsg: "请输入长度1~500位项目介绍" }];



module.exports = rule;

/***/ }),

/***/ 334:
/*!***************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/Xmsyjhs/validate.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "phone",
  checkType: "notnull",
  checkRule: "",
  errorMsg: "请输入手机号" },

{
  name: "password",
  checkType: "notnull",
  checkRule: "",
  errorMsg: "请输入密码" }];



module.exports = rule;

/***/ }),

/***/ 398:
/*!*********************************************************!*\
  !*** D:/project/uniapp-frame/static/common/default.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAFOYwZEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3OTBhZDMxOC1hNDc2LTRkZGMtOWYzMy1lMDViMGRhODgzNmIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjlDNEUxQTA1Qjk1MTFFQThCMUI4QTdDMkUwNUZDNzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjlDNEUxOUY1Qjk1MTFFQThCMUI4QTdDMkUwNUZDNzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NDQ3YmQyMS1hMGUzLTRjNTItOTMzZS1hOTc5YjgxMGQ3ZjYiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1YTU4ODE4NC05YzFkLTExN2QtYjQzYi1hYWNmYzdmOGFmZWUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5sXaLkAAAYcUlEQVR42pySO0oEQRCGa7rXKxgKGhhqJj5PoiCCR/ASXkIQ2VTwBAazKwvLRJoJK5gZGogy1Q/r79ke5tGDj4Fiiqa+/68qKnv/MDTwHUrky3xD4qVbMEpAPvG2aORZTNQvwEFx9UewVav+AdYCvZnHd0W7wnva2V6jzfXVHq1+Ap3z9FAsktaAb7uPx7s6DHKyp0XAkZMYgnuy45kVwNP1hMXZkRf3+dMb5cUrfX5xC75IOcPxdF8HGFEyE5dM97Pn4SPBnDfTyvEqN6Fl5CwwBMqS0wvDnGFJAlTLQsvVzIDgbEx9zo+qeXIAInR2oOn8aCVsG29wZtOCt5rOWWxxpB2UQit+2QVcmQ0Za2sz1Zk3E3iOVuPROV/9WRyttZeoifXfAogRT5YEZUEFID4PxEa44hkZ+EKt/A/VCAKGSGKCuPIzMZnjHXIAk5urrmNzNrFAA+ZsuK2rt10ApqK/SKHPAI6q2EBTbAb8Q7EZWSNylsQBGJmwZkeoxlhLJrDNOHUD4/k/emEATqZAG//++wtOcQZ6agw/f/5i+PHjB4OjuRLOeIZmR0jmSLBmQeSoX7/ASRQ9kXxFFlh87A/YVpCmuYd+QjT/+gPPkkigHqSZBzmAYMUOrBAAZ8ffvyBZ8jdKUm6COVsROXQTgNkxGZwdIUUQJEdBMLYU9gCIu8CK/0OzI9QFIAPBRdBvcK4CqdXEFmDlQM2gLAnNy1BvMPyH5GNIlgTZeAOmASCA8GVJZNAIxHUkJF9XIN6DTwE+i/8zUAd8AWJecqt2SgAPkplYmwVyNLCUYJNCDYgfMtAH/EcO6puEWhbYtIPT7X8Ejg82J6kpE0Kyk/9DCGSLwVmJBAAK6ixCikAFGqx1AytmQK2cWEtEe+P/f9KSByg7SQHpp4Qbcdh8iaj0QdhAVw1Y6YMKjL/gQgNGe9hpMGDLTs8IxWW0JTOYsQjYOIJZAirKQWJzDv6Bi4HKRbilSA7ABliQ8td/rHEJFF587DdKIoJVA8iNLVjZiuzTvyD671+sIc2C1ub/j1pl/IdXzCgW/4fUAAixf2B1v6AtO1ChDrL8718QGyPRMWIruUCCi4A4FtkiEGZhAiYoC1ZYuxJMzzjwAy7PAA9qZItBCQ/uYyNoU4wBVxsmDtx6/PePFV45/oO10REtSXCo/PuP8DmoYQitPCE1EtTHwFoL6qHz+Np8cGBrqvwHWtWBMdACJ2RLIdHxj+E/Ev83OH7/SAItZQRVg8CWKmNMoBVW8wEC8GbuKhHEUBhOxln1ESwECwtRQdBuxUorCxsLsVGws/ABLH0JEUtr2UewsRErQVCsRLYRBN9gJzH3nGSSyWR21yzD3tj5OJfk/Ods27II1w27zr3PrlTpzNrHWYd7i8VjMtPm5EoBcytWoX5TdQEvTKBEFk33CIEv2fU94TK4mIrxLrseplSHS+h+HzxtBYLHHWpMTPrso39e2tX0v7ll7JvP4S96evlKSCBZvXplgY4PtrL32lvoizRU+4nX4RG6GzzncA85eK1bitCaysxYg6IL1Ad2ALebKRiVqe1kjJN+iU63y+mCQ3HVV1ewM1Fo7CQiLiZi+iA12ebGilKYVt7u9ZfHsLgpruA111pM6sjniuhOfowYM13NOwftYa2rz3ZK0/kLsIISLvLEcxT8wcFHybhCq1VywUGmhhMFNZbH+6lVfnLdp/arL+j5Z1rQQ3cL9xLX3fmuduKK6vF1Yi5dI6CVhQJNDdc7BOM6l4JdE4FTF+5DIxav+xYPQ3D9QKGs9h4msYiG18AXoeHLUrh3At0hNWktQLdOC4NkYgFoAHwdizF2p6jufoVqF7sHmLTYg3pgnEoubBwN4MYZ1OoG6G6+fCixxyhum9WY3XQE4+od1iAB7XsihraVHU8Q+hqCxgZs2pqesoi6rva3nF0yq6meiWDaoKiKZllD5Q3k/xE/wS2n1vzcLAc+snaWdZcUk0S1+hOAe+t5bSKIwi9J0zY92FotxYN3D0UQKyJUBEEL4sFDBaEXURD0puDFi+Af4LUHsViRotirlCKCWov1B/YoBfUkqMWI0baW2Mw4szuz82Z2Jt1JNrHpg2HTTTLZb743M2++91rLaXEj62VtkrXhFPq6CWGWK7VgNJtCH2P6vIJiSmC5XRGnXtz/SD0d1srwF3GQ/d82ztr5RjE8gkZ5M4Dldg49U3dagC+LDh/C5raf4jn7NlIGXLaNtRK0ni25NsNqDM+3KFgzOh5OsmgR1+i0qE2zdsLFMN1iYKWS9cQG+BtsXeMK6SXs0sdZm0nyzccvFmGpuFz37KJRRK6CVHlK693eBSePDjRUzptJ+o26wEbBtzp+2K7ffyw3iunXbSL2bcqaSdGZixqsKlnDX67ysAMc8NU0epJiXySNzVcMzSYEEQhG6KA5Mfc3xnIDAQeBx2CzWQXNrXVWmwF4NY2OMKMmqwoUwF0hkrlYlbLCwmIxKo4K65xQ6SFrhY487N3TD+35nNdz8m3pQeqs4pWXUsRgFYHOVIGRKqi0UCJUBgK/Vv7A8zefWPvoDXgyNayRC9PotQ2cU5tDShZBQENJVA5ABSmVBFZWy94uze0zWPKbPqyOHsppN4J6Pey6YgDCahHlAbdny2gQ1DwPxEgJXGs09reHnZW/vrtWGUW6772X69pcBcs2w6/js2Vtriq31+9VEgClxF0+7bAJHFoOpT1Xk7iu616ocSvXrYh8Bom0UeXaSaMsM5aeY+2C33Zjm6vVFyQwBPz4YIDIoRAtcUMImsdS8Lfr7jbLu05Lt3g0kmhh8mIV4iAtrOJrmCxSCSOTcTkACQBzZterKR5vwVFBJuk1A35zrp7al4OergwKnqk2YvdflaG0Rp0hpmsOU7Qn0+jqXHp4wfoOH00rA5ZKRY1FC6v5HGVgI1dAYFW64MzBvJVVDBozGqWOCGLXndHh1mMDm0TEGxPAp/TFypXdU1uQngIy74E+94FqVZbcKtriRKyJnHDl1hg+LJ63VIuIh+20uB5hD/RUDwnjW4/Oqh47xzwFHSTwJ8JkkczbKPeVta1GIUCBtbW0dWluz2TOh7UbrkXKxaqxEui1s8b7Mu1qui9idj8JElgBo2tJAWT9A43Ida8j8Lw9wtlTG6sx9Qzc+TYNaMjstbAUkzVKeKbuHf9c/85ur+evKdXCQb3/8DUo5dBg0VD03NX5G3IZAtkM6cgBvZjN0FH2ejC4x97PZ9lKvdAW/ZOKGCi++kwXOtvvsNdTpvsSbXFjQPu64djQAGQ8Jcd/AnB3NSFSHFH4Tc/M7sJudI2ywrJi1IMrYjAYNZgff0BYUBAP/oJgyCEePCUHj4EcA7ntRfxDCKs5BEJCFBXWKB7MQQXBH0RxRQRxcRGzkuzCdllvpnumfl51V810NTPzoOZ/pvvrr96rV1XvvfGxeyhKL1SjdfdGnpzJZqCRwZSNc7z95vOEfADGza1R3nqa/J3HuEDC2z+tCBjTLjE+etATMRd429EKgHFKiTPwrpzWlzFucQ00sUHezIY4puQ8zxEsymqobgWdyJPhrbyNt8iOQq/rmpwrw+MtBBYFsyIP+2L4vwwsry+5DJZxJbYMsxYGi4J7Yw+zAsygPWQlRPnWzQCegfYSzMb7s1HA93MecrKSnbx97Qr4WxASpttQTkdDlpWVLoqLXm0uVmGtb6Bz5Oc0hsXaNdCJLKsMdxpYlBsmwFugM+VzE+Bx6Fw5o+pwVxs6GQ3pcrzGdMr2W7iOhrFak1MZhS8JcSADC/tg+xfDEAReggE/4m3CKd8TVw3H/rjd3GEtYrUO7d7gAzQa5K+c5sNXbjxq+qgyWCDvL/59zwfDX8ZGa5ftNyanpjNAq4ccivf4+qS/SLwK4CO5mAxtQyLmWr73HIm3DgGP5AdWAcmA1GOPciCA3ITSW0aC9gh8pJTFr6hxlii1yDwl/PDQpqLUt89WCuBAXgyvDvLUW2bcL1ZDD8Gr0fLdiUEf6Jk0tmuPPTId+EVrGII0vRZstOdubSwFQElqobEU1zEtVEJ8vG7tcHWnn4ikRRkc+ACWL1nQAgxbgKX0Vu3W8QY4E8qHhVHD2goTL6bg6s0nzqdXykNvk8ZbLc5SYFsCHZV1FEtczTlWjOPyIMhLb21ASz0iDj4TmA3F5yFzjaStzPkR8LU8XEfxA0ZWpeg+hVmpXFvYqINyHrv0Sd42Z+t4EPHSEMdLl8XODqeuz+oMM9CYlbpzWK+Z4rq+hQz/4t+FlI0VGI2awHCoF+YL1S7ursMZWGlGPNH0V7fQwCjQwmuMMFRKwUdHhu+KVvovaCRoJDpvjIYnhyDCo8KIeDX8mAJNGqqasarrtYMcFhk+mN2Uj3AyKGvM5CBTFbRUYVExVLUu7mal74iA32arr7pvbLLMqrFitRrjcsRsSFpsa8AXKB3e78Yura+mcdc43qrdWipAJDMbCszG71vKTgrwr25dWTnxhKWaRFYN61vUECTXcbVm+DEY/l0hXZcbWKoxsarprXK55HGY1dMAGHN1PIaThiUM7gwzW6qhWGVJKbUgdGndUDGpO1u5lr+DUl6UGofnm6Ea9BYMesuSLkBCkgde9VAfgtTubMHwbpvZEi4KY9Gf79IMlsYgf95dYnBgYxno8H8G0/8zGLs5a1yXFi+UOgQ5Vj4ccvG0vodqESGjY2XS2z3ry4oHJntXfd0FKAZMfUeZcyQbKgvAPwFRvjvNtVykgbWY8pUCAxThAvSUC8Z8pbjf6IaKLk1HCAaoHWvUlw7o6X2C3pLJWcT3FZB6DzIXTRdT9xTByPpVzUwe8Be7ZZappRrhPZY4u6AnF8ocur4AwAiXUq2YJ4Htz2K2NBt/zjzeqvpkkbdE6a3wfqjobM3RoHX4qQ1Yl+lhVLKGvYJUJ8MGLK23ck8KjYYqJjeegEH137K8zIcX88P9mLRUY9Jb09qX4RPJKbn1spdYzsVbxbQY4A/8YD349wNGLyp1s4TWW1F0ZqWLcAuqWWnOO+dOgDEpKgI1wx9188cjOsPpmWkmvU1nGN7xtoC3Txvdn3ACHP9JmqC3l6Lak9sqixRgmYYHyWC7yiUVLHci2EJ+38fbm2a225wAf/bJMpmBumt5ld8W+VN0VY+ngmXJn/iwvw9/c463o1Fe4xBvU2ri5sCieQ3tLTl/6eXkW3j1+t9aHqDoY2PeIeYXBlzDioVwE2/f8LavWGC9+HqBt4sPSvBuRhxbKxftWakYnOPsjnIP6wXtdFSPUS4XYf3Hy2HF0gHnc38vQHvXG2JFFcXP2/fWXdfNdTOzYBHLFjIiyUxqP5hG9rGiAoOQJMg+iNEfSkIMkqKoSKgIKvqQ+aEP1ocCUwoDSyXLMo0S0nJdMzT7s6i5Lrtzu2fnznv33jlz5868mfdmnnPg7nvzdt++N/Ob37nnnnvv76S99zBpw73ni8EtL4WVO+anMV1EYQzumk2ctNgqkgq5sKwCjCMu1O1bKcBsz/A1PAJunR1czHi0AJi22bw9De5O407Iv/0gRuQfhCfMWhPgySJ/tFY8b3VDGdjV4CrCNNQauAoPZoo7GuMU3P763AUC7kSAyts34txRl/ueVgEYVwWsB3fPFwYqy6Aw1CHfLMA+ANqkSF4AvlkAisCuA4sibheoYa7mZwH222kEk0kDvFoEFbuESy7M3h4CNzW8L8lrlxTA68Rd+Bq0nvJ4o22e8H441u5rNsD3C8auL3BJ3LDy2pAYcvU0GmAMDHD/+KaCsanbdeJav9EogDeLwKCnuPYNtVVieDk/LYCRtWcbOYYrzGeYN8DdNW8lDfCjgrVdxTXOhGGOHhc6dCcBMC5A3FBc08zZbHBFpK+uB2DUTb+vuJaZtXbhWZfEAXgPuHOuhWXfUFVnaRSAcRfPjcV1y5WhsuX1NgC/CFKRvMJyZbjqZJoJYNzMs6a4Trk1HOV8Kr8gT/jjom8sajo1yU88PzoGO/Ycrr8uYr0mb77RVubTr9WOp0+bAksG+qGrMzcapk/x9rIOMO7SeSzJTzk0eAq+3jfY/NNlAQuxCXCZvmxbWuu+cN5smHtVLibJsIwillwe9lz0jKTBRdt7YKj5rFVAlJet18ph1V7TyuRoGxm+3T+YFwbj8OlZuQ9+Io1PGRt3ms5aZsla/z59P9AxFFGaaZi7nuytKV7eMmFGHX2tyT0zw8aTjBpiuwx/3ADplVLJZV9r+l3O7G4E+JYLmbXAaBmVFgF6oh5sZiT9KU1I3fTqzWGsndCO9HnX2oFXt9sMdG4ZfDECfHlLsZbqLwPAjcraPAKNAPfkEVzbvta8v5MFAqg8D9sPmXGAh7PyZXzut07WIjAbd1m44No/MAOdUwafbP0I2c7tBrFWfv79wb98JbCrVWVZwD59omJtpVyCa/svg96edHfvYKLjYNaBJbNREJ6NMmWnWBjQjAaaKZq4kqyVru8lS08S6oyjo+Ow98dj8NOhE2levTMI8Fe5HP6wsGyUKTtVEzVRVJyBeK6p6jiyEk6ISh2tM6reDEN/pFq9age6aNxmgp8yLfPABo5j1TexlNyz7pYZo9V/AkvGazpQBgGspGyLl6p8H9x9RRkfB7uSxVH6WlfKODiKfvfLUdU5hIBedc1gASKz+5sUabLJm2x4NfuDXoOLDpkJ8oMrdewaO82uWuuDhQi/X9eaEvd2Gg0wSmpVpwuPgFQyrNn4kf5aAlYOrEL7Wgpc/X4h+lraPYM5mCLk6dXmqDdFegDjP33Gi6I9w/ng0WYNf5gJdUYnLMLmbw3huC/RwZSkh8ZaGWhCI1UXijUx1tH0kWPUKLCxF3g77o2DPcOEB+5Rfa9ZgVRNU51OWkQOnMDVXk8iwJKVQ9XAyqYfZtVhmaXKaD2GFevWyuNg2TY2xFWnMBlPj2Uth0I+1hLuWerrGemembk5jiTprjI+QcN/dpue6NDtQRBC+A1LWsRcQgNAARg3gQF0UKXcjYwOqKrjYHMw5f1e7qMT7oNxufOQnqqkbCFvv4C7/yUDqcY47jkYTMXtKl9F+zsA37EjywxaDJHAN+71vzchW8HbNipVSRkONvt5O5xd1loy1Za11E1AsDjK8IfJ7tthZGmChABeHhQ7mXQePZAxlTnQTNbaTsZbs1ZnZghr5feS2vMWkwtK5gv047rsVt6+ME02hPEP64i/Hj9QjjtBUAOQJc1aavhDsRbUY9fjOuahDwsKpoILFMSdSOBtlgncMAbL9ghvH4O7wakUFWJ71gbnlMslBtf0tcEVl5Rh6uQSVNoYkaSqHYzxePL0OQd+O+XAgWNjcH4M7BmtsVaREHZshj5ErppgbR0AbxfRcuibo0jxfg6uUOhuiKgTETQZb+WCeVvU3wZzLm0L8v3keeIN0NtVgt5ZZZjP27F/HNiyfzTQPetA+hS8pVplcYIp3S17iwwiAox/fC9vH9m+IaoIC2YNcJktar2PW/XBsab1as8nlZkErp6NYuY8s2R9vSWY0lEKdM9M+XeM+AgTY9UUJeWaTSVVIhCsPQq4cQD2bJtg/ytmfJOZjKdzmswy76nFAFQ/TPS18mtK4S55csE3xpX65KByMURgFmJ/imB3qRWpEgLYsycF0B+Guej6JuPjsTaoAEpk1oI6MREcTDl2aUvFVTNTEIWan6jjH1thPgkpw3HRL1REqjP2tF7gZEGdrAVf3xqNtaABrLPWCXDB6mtAT/b7KYxlyRbwdhG4OtN1WZJipAj0AyLKfhgD2SjTesyYN47PWqrTiMpaJdkbYfhDZ7u84MqXSUMwcW8qlmHbmxQoackJe9K4ffwcdsdhLV1ZLAZr/QQGjcd0JB3Y3eiMtXTLZPKDjfCfKwUp0B0nvsI1VUFwfg6/8xMYECcwwE/oID1BYDdZEI+1IS6actPGc3KsImPKFQvWjvHHlwDLbbnKde+kiUHKiu8Ka3H8jPugsBASRoWf0BkoaiovPmt1Bx2HtcF9sAlkZWx8ij+u4o9lfsg9G1vDJsqLpW+pAtzd1RHU1x7iP+8QZcTwO9w5UcAtKO1YD2sDJj+isNazUqkUspqj2s7ytoG3mfyQv4nN4I9vIv31z6xUyvkF+PZFc6Hc1hbQv1ZBR8M06AJ+6iUB+hz+/Hn+/DidjmT1OJTIrPVsaneXyGQp/S6WaNvC212YlxGl2rr5ZzzOH0/WZq3oz1w478pUAW5IWZ3jJ4Zh93e/wvCZEbs9QBJj2ysMVgx0iJuReVk0HPTjnHVHlO+xced/cHokGrTI2u6uTpjS1XmUf8ftvG3l3+8z/v3+Zko0LKcf5QiZBhbr8i2+aS50TKrkH+AGGwrKIC1QtWC6OPZ2UPaKx3O8jYjU678iW4Qy+oOinW+Vi/E/IsQO4yTZYMwAAAAASUVORK5CYII="

/***/ }),

/***/ 399:
/*!*************************************************************************************************!*\
  !*** D:/project/uniapp-frame/components/card-item/style.scss?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_style_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./style.scss?vue&type=style&index=0&lang=scss& */ 400);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_style_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_style_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_style_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_style_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_style_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 4:
/*!******************************************!*\
  !*** D:/project/uniapp-frame/pages.json ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 400:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!D:/project/uniapp-frame/components/card-item/style.scss?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 406:
/*!**************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/QyCwzb/validate.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "businessIncome",
  checkType: "string",
  checkRule: "^([1-9][0-9]{0,7})$",
  errorMsg: "请输入长度1~8位营业收入" },

{
  name: "businessIncome",
  checkType: "string",
  checkRule: "^([1-9][0-9]{0,7})$",
  errorMsg: "请输入长度1~8位营业收入" },

{
  name: "netProfit",
  checkType: "string",
  checkRule: "^(-?[1-9][0-9]{0,7})$",
  errorMsg: "请输入长度1~8位净利润" },

{
  name: "totalAssets",
  checkType: "string",
  checkRule: "^([1-9][0-9]{0,7})$",
  errorMsg: "请输入长度1~8位总资产" },

{
  name: "totalLiabilities",
  checkType: "string",
  checkRule: "^(0|[1-9][0-9]{0,14})$",
  errorMsg: "请输入长度1~8位总负债" }];



module.exports = rule;

/***/ }),

/***/ 414:
/*!**************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/QyHxtd/validate.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "userName",
  checkType: "string",
  checkRule: "^.{1,20}$",
  errorMsg: "请输入长度1~20位姓名" },

{
  name: "userJob",
  checkType: "string",
  checkRule: "^.{1,50}$",
  errorMsg: "请输入长度1~50位职务名称" },

{
  name: "userIntro",
  checkType: "string",
  checkRule: "^.{1,500}$",
  errorMsg: "请输入长度1~500个人经历" }];



module.exports = rule;

/***/ }),

/***/ 422:
/*!**************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/QyGqjg/validate.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "ownerName",
  checkType: "string",
  checkRule: "^.{0,30}$",
  errorMsg: "请输入长度0~30位股东名称" },

{
  name: "ownerPercentage",
  checkType: "string",
  checkRule: "^.{0,8}$",
  errorMsg: "请输入长度0~8位股权比例" }];



module.exports = rule;

/***/ }),

/***/ 430:
/*!**************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/XmRzjl/validate.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "organization",
  checkType: "string",
  checkRule: "^.{1,50}$",
  errorMsg: "请输入长度1~50位投资机构" },

{
  name: "money",
  checkType: "string",
  checkRule: "^.{0,8}$",
  errorMsg: "请输入长度0~8位融资金额" }];



module.exports = rule;

/***/ }),

/***/ 54:
/*!******************************************************!*\
  !*** D:/project/uniapp-frame/common/graceChecker.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 /**
              数据验证（表单验证）
              来自 grace.hcoder.net 
              作者 hcoder 深海
              */
module.exports = {
  error: '',
  check: function check(data, rule) {
    for (var i = 0; i < rule.length; i++) {
      if (!rule[i].checkType) {return true;}
      if (!rule[i].name) {return true;}
      if (!rule[i].errorMsg) {return true;}
      if (rule[i].isRequire === true && !data[rule[i].name]) {this.error = rule[i].errorMsg;return false;}
      switch (rule[i].checkType) {
        case 'string':
          var reg = new RegExp(rule[i].checkRule);
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'int':
          var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
          break;
        case 'between':
          if (!this.isNumber(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenD':
          var reg = /^-?[1-9][0-9]?$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenF':
          var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'same':
          if (data[rule[i].name] != rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'notsame':
          if (data[rule[i].name] == rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'email':
          var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          var reg1 = new RegExp(rule[i].checkRule);
          if (!reg.test(data[rule[i].name]) || !reg1.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'phoneno':
          var reg = /^1[0-9]{10,10}$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'zipcode':
          var reg = /^[0-9]{6}$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'reg':
          var reg = new RegExp(rule[i].checkRule);
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'in':
          if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
            this.error = rule[i].errorMsg;return false;
          }
          break;
        case 'notnull':
          if (data[rule[i].name] == null || data[rule[i].name].length < 1) {this.error = rule[i].errorMsg;return false;}
          break;}

    }
    return true;
  },
  isNumber: function isNumber(checkVal) {
    var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
    return reg.test(checkVal);
  } };

/***/ }),

/***/ 55:
/*!***************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/Project/validate.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "phone",
  checkType: "notnull",
  checkRule: "",
  errorMsg: "请输入手机号" },

{
  name: "password",
  checkType: "notnull",
  checkRule: "",
  errorMsg: "请输入密码" }];



module.exports = rule;

/***/ }),

/***/ 56:
/*!***************************************************!*\
  !*** D:/project/uniapp-frame/common/city.data.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{ "value": 110000, "label": "北京市", "children": [{ "value": 110101, "label": "东城区" }, { "value": 110102, "label": "西城区" }, { "value": 110105, "label": "朝阳区" }, { "value": 110106, "label": "丰台区" }, { "value": 110107, "label": "石景山区" }, { "value": 110108, "label": "海淀区" }, { "value": 110109, "label": "门头沟区" }, { "value": 110111, "label": "房山区" }, { "value": 110112, "label": "通州区" }, { "value": 110113, "label": "顺义区" }, { "value": 110114, "label": "昌平区" }, { "value": 110115, "label": "大兴区" }, { "value": 110116, "label": "怀柔区" }, { "value": 110117, "label": "平谷区" }, { "value": 110118, "label": "密云区" }, { "value": 110119, "label": "延庆区" }] }, { "value": 120000, "label": "天津市", "children": [{ "value": 120101, "label": "和平区" }, { "value": 120102, "label": "河东区" }, { "value": 120103, "label": "河西区" }, { "value": 120104, "label": "南开区" }, { "value": 120105, "label": "河北区" }, { "value": 120106, "label": "红桥区" }, { "value": 120110, "label": "东丽区" }, { "value": 120111, "label": "西青区" }, { "value": 120112, "label": "津南区" }, { "value": 120113, "label": "北辰区" }, { "value": 120114, "label": "武清区" }, { "value": 120115, "label": "宝坻区" }, { "value": 120116, "label": "滨海新区" }, { "value": 120117, "label": "宁河区" }, { "value": 120118, "label": "静海区" }, { "value": 120119, "label": "蓟州区" }] }, { "value": 130000, "label": "河北省", "children": [{ "value": 130100, "label": "石家庄市" }, { "value": 130200, "label": "唐山市" }, { "value": 130300, "label": "秦皇岛市" }, { "value": 130400, "label": "邯郸市" }, { "value": 130500, "label": "邢台市" }, { "value": 130600, "label": "保定市" }, { "value": 130700, "label": "张家口市" }, { "value": 130800, "label": "承德市" }, { "value": 130900, "label": "沧州市" }, { "value": 131000, "label": "廊坊市" }, { "value": 131100, "label": "衡水市" }, { "value": 139000, "label": "省直辖县级行政区划" }] }, { "value": 140000, "label": "山西省", "children": [{ "value": 140100, "label": "太原市" }, { "value": 140200, "label": "大同市" }, { "value": 140300, "label": "阳泉市" }, { "value": 140400, "label": "长治市" }, { "value": 140500, "label": "晋城市" }, { "value": 140600, "label": "朔州市" }, { "value": 140700, "label": "晋中市" }, { "value": 140800, "label": "运城市" }, { "value": 140900, "label": "忻州市" }, { "value": 141000, "label": "临汾市" }, { "value": 141100, "label": "吕梁市" }] }, { "value": 150000, "label": "内蒙古自治区", "children": [{ "value": 150100, "label": "呼和浩特市" }, { "value": 150200, "label": "包头市" }, { "value": 150300, "label": "乌海市" }, { "value": 150400, "label": "赤峰市" }, { "value": 150500, "label": "通辽市" }, { "value": 150600, "label": "鄂尔多斯市" }, { "value": 150700, "label": "呼伦贝尔市" }, { "value": 150800, "label": "巴彦淖尔市" }, { "value": 150900, "label": "乌兰察布市" }, { "value": 152200, "label": "兴安盟" }, { "value": 152500, "label": "锡林郭勒盟" }, { "value": 152900, "label": "阿拉善盟" }] }, { "value": 210000, "label": "辽宁省", "children": [{ "value": 210100, "label": "沈阳市" }, { "value": 210200, "label": "大连市" }, { "value": 210300, "label": "鞍山市" }, { "value": 210400, "label": "抚顺市" }, { "value": 210500, "label": "本溪市" }, { "value": 210600, "label": "丹东市" }, { "value": 210700, "label": "锦州市" }, { "value": 210800, "label": "营口市" }, { "value": 210900, "label": "阜新市" }, { "value": 211000, "label": "辽阳市" }, { "value": 211100, "label": "盘锦市" }, { "value": 211200, "label": "铁岭市" }, { "value": 211300, "label": "朝阳市" }, { "value": 211400, "label": "葫芦岛市" }] }, { "value": 220000, "label": "吉林省", "children": [{ "value": 220100, "label": "长春市" }, { "value": 220200, "label": "吉林市" }, { "value": 220300, "label": "四平市" }, { "value": 220400, "label": "辽源市" }, { "value": 220500, "label": "通化市" }, { "value": 220600, "label": "白山市" }, { "value": 220700, "label": "松原市" }, { "value": 220800, "label": "白城市" }, { "value": 222400, "label": "延边朝鲜族自治州" }] }, { "value": 230000, "label": "黑龙江省", "children": [{ "value": 230100, "label": "哈尔滨市" }, { "value": 230200, "label": "齐齐哈尔市" }, { "value": 230300, "label": "鸡西市" }, { "value": 230400, "label": "鹤岗市" }, { "value": 230500, "label": "双鸭山市" }, { "value": 230600, "label": "大庆市" }, { "value": 230700, "label": "伊春市" }, { "value": 230800, "label": "佳木斯市" }, { "value": 230900, "label": "七台河市" }, { "value": 231000, "label": "牡丹江市" }, { "value": 231100, "label": "黑河市" }, { "value": 231200, "label": "绥化市" }, { "value": 232700, "label": "大兴安岭地区" }] }, { "value": 310000, "label": "上海市", "children": [{ "value": 310101, "label": "黄浦区" }, { "value": 310104, "label": "徐汇区" }, { "value": 310105, "label": "长宁区" }, { "value": 310106, "label": "静安区" }, { "value": 310107, "label": "普陀区" }, { "value": 310109, "label": "虹口区" }, { "value": 310110, "label": "杨浦区" }, { "value": 310112, "label": "闵行区" }, { "value": 310113, "label": "宝山区" }, { "value": 310114, "label": "嘉定区" }, { "value": 310115, "label": "浦东新区" }, { "value": 310116, "label": "金山区" }, { "value": 310117, "label": "松江区" }, { "value": 310118, "label": "青浦区" }, { "value": 310120, "label": "奉贤区" }, { "value": 310151, "label": "崇明区" }] }, { "value": 320000, "label": "江苏省", "children": [{ "value": 320100, "label": "南京市" }, { "value": 320200, "label": "无锡市" }, { "value": 320300, "label": "徐州市" }, { "value": 320400, "label": "常州市" }, { "value": 320500, "label": "苏州市" }, { "value": 320600, "label": "南通市" }, { "value": 320700, "label": "连云港市" }, { "value": 320800, "label": "淮安市" }, { "value": 320900, "label": "盐城市" }, { "value": 321000, "label": "扬州市" }, { "value": 321100, "label": "镇江市" }, { "value": 321200, "label": "泰州市" }, { "value": 321300, "label": "宿迁市" }] }, { "value": 330000, "label": "浙江省", "children": [{ "value": 330100, "label": "杭州市" }, { "value": 330200, "label": "宁波市" }, { "value": 330300, "label": "温州市" }, { "value": 330400, "label": "嘉兴市" }, { "value": 330500, "label": "湖州市" }, { "value": 330600, "label": "绍兴市" }, { "value": 330700, "label": "金华市" }, { "value": 330800, "label": "衢州市" }, { "value": 330900, "label": "舟山市" }, { "value": 331000, "label": "台州市" }, { "value": 331100, "label": "丽水市" }] }, { "value": 340000, "label": "安徽省", "children": [{ "value": 340100, "label": "合肥市" }, { "value": 340200, "label": "芜湖市" }, { "value": 340300, "label": "蚌埠市" }, { "value": 340400, "label": "淮南市" }, { "value": 340500, "label": "马鞍山市" }, { "value": 340600, "label": "淮北市" }, { "value": 340700, "label": "铜陵市" }, { "value": 340800, "label": "安庆市" }, { "value": 341000, "label": "黄山市" }, { "value": 341100, "label": "滁州市" }, { "value": 341200, "label": "阜阳市" }, { "value": 341300, "label": "宿州市" }, { "value": 341500, "label": "六安市" }, { "value": 341600, "label": "亳州市" }, { "value": 341700, "label": "池州市" }, { "value": 341800, "label": "宣城市" }] }, { "value": 350000, "label": "福建省", "children": [{ "value": 350100, "label": "福州市" }, { "value": 350200, "label": "厦门市" }, { "value": 350300, "label": "莆田市" }, { "value": 350400, "label": "三明市" }, { "value": 350500, "label": "泉州市" }, { "value": 350600, "label": "漳州市" }, { "value": 350700, "label": "南平市" }, { "value": 350800, "label": "龙岩市" }, { "value": 350900, "label": "宁德市" }] }, { "value": 360000, "label": "江西省", "children": [{ "value": 360100, "label": "南昌市" }, { "value": 360200, "label": "景德镇市" }, { "value": 360300, "label": "萍乡市" }, { "value": 360400, "label": "九江市" }, { "value": 360500, "label": "新余市" }, { "value": 360600, "label": "鹰潭市" }, { "value": 360700, "label": "赣州市" }, { "value": 360800, "label": "吉安市" }, { "value": 360900, "label": "宜春市" }, { "value": 361000, "label": "抚州市" }, { "value": 361100, "label": "上饶市" }] }, { "value": 370000, "label": "山东省", "children": [{ "value": 370100, "label": "济南市" }, { "value": 370200, "label": "青岛市" }, { "value": 370300, "label": "淄博市" }, { "value": 370400, "label": "枣庄市" }, { "value": 370500, "label": "东营市" }, { "value": 370600, "label": "烟台市" }, { "value": 370700, "label": "潍坊市" }, { "value": 370800, "label": "济宁市" }, { "value": 370900, "label": "泰安市" }, { "value": 371000, "label": "威海市" }, { "value": 371100, "label": "日照市" }, { "value": 371200, "label": "莱芜市" }, { "value": 371300, "label": "临沂市" }, { "value": 371400, "label": "德州市" }, { "value": 371500, "label": "聊城市" }, { "value": 371600, "label": "滨州市" }, { "value": 371700, "label": "菏泽市" }] }, { "value": 410000, "label": "河南省", "children": [{ "value": 410100, "label": "郑州市" }, { "value": 410200, "label": "开封市" }, { "value": 410300, "label": "洛阳市" }, { "value": 410400, "label": "平顶山市" }, { "value": 410500, "label": "安阳市" }, { "value": 410600, "label": "鹤壁市" }, { "value": 410700, "label": "新乡市" }, { "value": 410800, "label": "焦作市" }, { "value": 410900, "label": "濮阳市" }, { "value": 411000, "label": "许昌市" }, { "value": 411100, "label": "漯河市" }, { "value": 411200, "label": "三门峡市" }, { "value": 411300, "label": "南阳市" }, { "value": 411400, "label": "商丘市" }, { "value": 411500, "label": "信阳市" }, { "value": 411600, "label": "周口市" }, { "value": 411700, "label": "驻马店市" }, { "value": 419000, "label": "省直辖县级行政区划" }] }, { "value": 420000, "label": "湖北省", "children": [{ "value": 420100, "label": "武汉市" }, { "value": 420200, "label": "黄石市" }, { "value": 420300, "label": "十堰市" }, { "value": 420500, "label": "宜昌市" }, { "value": 420600, "label": "襄阳市" }, { "value": 420700, "label": "鄂州市" }, { "value": 420800, "label": "荆门市" }, { "value": 420900, "label": "孝感市" }, { "value": 421000, "label": "荆州市" }, { "value": 421100, "label": "黄冈市" }, { "value": 421200, "label": "咸宁市" }, { "value": 421300, "label": "随州市" }, { "value": 422800, "label": "恩施土家族苗族自治州" }, { "value": 429000, "label": "省直辖县级行政区划" }] }, { "value": 430000, "label": "湖南省", "children": [{ "value": 430100, "label": "长沙市" }, { "value": 430200, "label": "株洲市" }, { "value": 430300, "label": "湘潭市" }, { "value": 430400, "label": "衡阳市" }, { "value": 430500, "label": "邵阳市" }, { "value": 430600, "label": "岳阳市" }, { "value": 430700, "label": "常德市" }, { "value": 430800, "label": "张家界市" }, { "value": 430900, "label": "益阳市" }, { "value": 431000, "label": "郴州市" }, { "value": 431100, "label": "永州市" }, { "value": 431200, "label": "怀化市" }, { "value": 431300, "label": "娄底市" }, { "value": 433100, "label": "湘西土家族苗族自治州" }] }, { "value": 440000, "label": "广东省", "children": [{ "value": 440100, "label": "广州市" }, { "value": 440200, "label": "韶关市" }, { "value": 440300, "label": "深圳市" }, { "value": 440400, "label": "珠海市" }, { "value": 440500, "label": "汕头市" }, { "value": 440600, "label": "佛山市" }, { "value": 440700, "label": "江门市" }, { "value": 440800, "label": "湛江市" }, { "value": 440900, "label": "茂名市" }, { "value": 441200, "label": "肇庆市" }, { "value": 441300, "label": "惠州市" }, { "value": 441400, "label": "梅州市" }, { "value": 441500, "label": "汕尾市" }, { "value": 441600, "label": "河源市" }, { "value": 441700, "label": "阳江市" }, { "value": 441800, "label": "清远市" }, { "value": 441900, "label": "东莞市" }, { "value": 442000, "label": "中山市" }, { "value": 445100, "label": "潮州市" }, { "value": 445200, "label": "揭阳市" }, { "value": 445300, "label": "云浮市" }] }, { "value": 450000, "label": "广西壮族自治区", "children": [{ "value": 450100, "label": "南宁市" }, { "value": 450200, "label": "柳州市" }, { "value": 450300, "label": "桂林市" }, { "value": 450400, "label": "梧州市" }, { "value": 450500, "label": "北海市" }, { "value": 450600, "label": "防城港市" }, { "value": 450700, "label": "钦州市" }, { "value": 450800, "label": "贵港市" }, { "value": 450900, "label": "玉林市" }, { "value": 451000, "label": "百色市" }, { "value": 451100, "label": "贺州市" }, { "value": 451200, "label": "河池市" }, { "value": 451300, "label": "来宾市" }, { "value": 451400, "label": "崇左市" }] }, { "value": 460000, "label": "海南省", "children": [{ "value": 460100, "label": "海口市" }, { "value": 460200, "label": "三亚市" }, { "value": 460300, "label": "三沙市" }, { "value": 460400, "label": "儋州市" }, { "value": 469000, "label": "省直辖县级行政区划" }] }, { "value": 500000, "label": "重庆市", "children": [{ "value": 500101, "label": "万州区" }, { "value": 500102, "label": "涪陵区" }, { "value": 500103, "label": "渝中区" }, { "value": 500104, "label": "大渡口区" }, { "value": 500105, "label": "江北区" }, { "value": 500106, "label": "沙坪坝区" }, { "value": 500107, "label": "九龙坡区" }, { "value": 500108, "label": "南岸区" }, { "value": 500109, "label": "北碚区" }, { "value": 500110, "label": "綦江区" }, { "value": 500111, "label": "大足区" }, { "value": 500112, "label": "渝北区" }, { "value": 500113, "label": "巴南区" }, { "value": 500114, "label": "黔江区" }, { "value": 500115, "label": "长寿区" }, { "value": 500116, "label": "江津区" }, { "value": 500117, "label": "合川区" }, { "value": 500118, "label": "永川区" }, { "value": 500119, "label": "南川区" }, { "value": 500120, "label": "璧山区" }, { "value": 500151, "label": "铜梁区" }, { "value": 500152, "label": "潼南区" }, { "value": 500153, "label": "荣昌区" }, { "value": 500154, "label": "开州区" }] }, { "value": 510000, "label": "四川省", "children": [{ "value": 510100, "label": "成都市" }, { "value": 510300, "label": "自贡市" }, { "value": 510400, "label": "攀枝花市" }, { "value": 510500, "label": "泸州市" }, { "value": 510600, "label": "德阳市" }, { "value": 510700, "label": "绵阳市" }, { "value": 510800, "label": "广元市" }, { "value": 510900, "label": "遂宁市" }, { "value": 511000, "label": "内江市" }, { "value": 511100, "label": "乐山市" }, { "value": 511300, "label": "南充市" }, { "value": 511400, "label": "眉山市" }, { "value": 511500, "label": "宜宾市" }, { "value": 511600, "label": "广安市" }, { "value": 511700, "label": "达州市" }, { "value": 511800, "label": "雅安市" }, { "value": 511900, "label": "巴中市" }, { "value": 512000, "label": "资阳市" }, { "value": 513200, "label": "阿坝藏族羌族自治州" }, { "value": 513300, "label": "甘孜藏族自治州" }, { "value": 513400, "label": "凉山彝族自治州" }] }, { "value": 520000, "label": "贵州省", "children": [{ "value": 520100, "label": "贵阳市" }, { "value": 520200, "label": "六盘水市" }, { "value": 520300, "label": "遵义市" }, { "value": 520400, "label": "安顺市" }, { "value": 520500, "label": "毕节市" }, { "value": 520600, "label": "铜仁市" }, { "value": 522300, "label": "黔西南布依族苗族自治州" }, { "value": 522600, "label": "黔东南苗族侗族自治州" }, { "value": 522700, "label": "黔南布依族苗族自治州" }] }, { "value": 530000, "label": "云南省", "children": [{ "value": 530100, "label": "昆明市" }, { "value": 530300, "label": "曲靖市" }, { "value": 530400, "label": "玉溪市" }, { "value": 530500, "label": "保山市" }, { "value": 530600, "label": "昭通市" }, { "value": 530700, "label": "丽江市" }, { "value": 530800, "label": "普洱市" }, { "value": 530900, "label": "临沧市" }, { "value": 532300, "label": "楚雄彝族自治州" }, { "value": 532500, "label": "红河哈尼族彝族自治州" }, { "value": 532600, "label": "文山壮族苗族自治州" }, { "value": 532800, "label": "西双版纳傣族自治州" }, { "value": 532900, "label": "大理白族自治州" }, { "value": 533100, "label": "德宏傣族景颇族自治州" }, { "value": 533300, "label": "怒江傈僳族自治州" }, { "value": 533400, "label": "迪庆藏族自治州" }] }, { "value": 540000, "label": "西藏自治区", "children": [{ "value": 540100, "label": "拉萨市" }, { "value": 540200, "label": "日喀则市" }, { "value": 540300, "label": "昌都市" }, { "value": 540400, "label": "林芝市" }, { "value": 540500, "label": "山南市" }, { "value": 542400, "label": "那曲地区" }, { "value": 542500, "label": "阿里地区" }] }, { "value": 610000, "label": "陕西省", "children": [{ "value": 610100, "label": "西安市" }, { "value": 610200, "label": "铜川市" }, { "value": 610300, "label": "宝鸡市" }, { "value": 610400, "label": "咸阳市" }, { "value": 610500, "label": "渭南市" }, { "value": 610600, "label": "延安市" }, { "value": 610700, "label": "汉中市" }, { "value": 610800, "label": "榆林市" }, { "value": 610900, "label": "安康市" }, { "value": 611000, "label": "商洛市" }] }, { "value": 620000, "label": "甘肃省", "children": [{ "value": 620100, "label": "兰州市" }, { "value": 620200, "label": "嘉峪关市" }, { "value": 620300, "label": "金昌市" }, { "value": 620400, "label": "白银市" }, { "value": 620500, "label": "天水市" }, { "value": 620600, "label": "武威市" }, { "value": 620700, "label": "张掖市" }, { "value": 620800, "label": "平凉市" }, { "value": 620900, "label": "酒泉市" }, { "value": 621000, "label": "庆阳市" }, { "value": 621100, "label": "定西市" }, { "value": 621200, "label": "陇南市" }, { "value": 622900, "label": "临夏回族自治州" }, { "value": 623000, "label": "甘南藏族自治州" }] }, { "value": 630000, "label": "青海省", "children": [{ "value": 630100, "label": "西宁市" }, { "value": 630200, "label": "海东市" }, { "value": 632200, "label": "海北藏族自治州" }, { "value": 632300, "label": "黄南藏族自治州" }, { "value": 632500, "label": "海南藏族自治州" }, { "value": 632600, "label": "果洛藏族自治州" }, { "value": 632700, "label": "玉树藏族自治州" }, { "value": 632800, "label": "海西蒙古族藏族自治州" }] }, { "value": 640000, "label": "宁夏回族自治区", "children": [{ "value": 640100, "label": "银川市" }, { "value": 640200, "label": "石嘴山市" }, { "value": 640300, "label": "吴忠市" }, { "value": 640400, "label": "固原市" }, { "value": 640500, "label": "中卫市" }] }, { "value": 650000, "label": "新疆维吾尔自治区", "children": [{ "value": 650100, "label": "乌鲁木齐市" }, { "value": 650200, "label": "克拉玛依市" }, { "value": 650400, "label": "吐鲁番市" }, { "value": 650500, "label": "哈密市" }, { "value": 652300, "label": "昌吉回族自治州" }, { "value": 652700, "label": "博尔塔拉蒙古自治州" }, { "value": 652800, "label": "巴音郭楞蒙古自治州" }, { "value": 652900, "label": "阿克苏地区" }, { "value": 653000, "label": "克孜勒苏柯尔克孜自治州" }, { "value": 653100, "label": "喀什地区" }, { "value": 653200, "label": "和田地区" }, { "value": 654000, "label": "伊犁哈萨克自治州" }, { "value": 654200, "label": "塔城地区" }, { "value": 654300, "label": "阿勒泰地区" }, { "value": 659000, "label": "自治区直辖县级行政区划" }] }, { "value": 710000, "label": "台湾省", "children": [{ "value": "710100", "label": "台北市" }, { "value": "710200", "label": "高雄市" }, { "value": "710300", "label": "台南市" }, { "value": "710400", "label": "台中市" }, { "value": "710500", "label": "金门县" }, { "value": "710600", "label": "南投县" }, { "value": "710700", "label": "基隆市" }, { "value": "710800", "label": "新竹市" }, { "value": "710900", "label": "嘉义市" }, { "value": "711100", "label": "新北市" }, { "value": "711200", "label": "宜兰县" }, { "value": "711300", "label": "新竹县" }, { "value": "711400", "label": "桃园县" }, { "value": "711500", "label": "苗栗县" }, { "value": "711700", "label": "彰化县" }, { "value": "711900", "label": "嘉义县" }, { "value": "712100", "label": "云林县" }, { "value": "712400", "label": "屏东县" }, { "value": "712500", "label": "台东县" }, { "value": "712600", "label": "花莲县" }, { "value": "712700", "label": "澎湖县" }] }, { "value": 810000, "label": "香港特别行政区", "children": [{ "value": "810100", "label": "香港岛" }, { "value": "810200", "label": "九龙" }, { "value": "810300", "label": "新界" }] }, { "value": 820000, "label": "澳门特别行政区", "children": [{ "value": "820100", "label": "澳门半岛" }, { "value": "820200", "label": "氹仔岛" }, { "value": "820300", "label": "路环岛" }] }];exports.default = _default;

/***/ }),

/***/ 73:
/*!******************************************************!*\
  !*** D:/project/uniapp-frame/pages/Mine/validate.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "name",
  checkType: "string",
  checkRule: "^.{1,20}$",
  errorMsg: "请输入长度1~20位真实姓名" },

{
  name: "company",
  checkType: "string",
  checkRule: "^.{1,50}$",
  errorMsg: "请输入长度1~50位的任职公司" },

{
  name: "job",
  checkType: "string",
  checkRule: "^.{1,20}$",
  errorMsg: "请输入长度1~20位的现任职务" },

{
  name: "email",
  checkType: "string",
  checkRule: "^.{1,40}$",
  errorMsg: "请输入长度1~40位的邮件" }];



module.exports = rule;

/***/ }),

/***/ 90:
/*!*************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/Audit/validate.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "name",
  checkType: "string",
  checkRule: "^.{1,20}$",
  errorMsg: "请输入长度1~20位真实姓名" },

{
  name: "company",
  checkType: "string",
  checkRule: "^.{1,50}$",
  errorMsg: "请输入长度1~50位的任职公司" },

{
  name: "job",
  checkType: "string",
  checkRule: "^.{1,20}$",
  errorMsg: "请输入长度1~20位的现任职务" },

{
  name: "email",
  checkType: "string",
  checkRule: "^.{1,40}$",
  errorMsg: "请输入长度1~40位的邮箱" }];



module.exports = rule;

/***/ }),

/***/ 91:
/*!**************************************************************!*\
  !*** D:/project/uniapp-frame/pages/Regis/Audit/validate2.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var rule = [
{
  name: "investmentCase",
  checkType: "string",
  checkRule: "^.{0,500}$",
  errorMsg: "请输入长度为0~500位的投资案例" },

{
  name: "personalExper",
  checkType: "string",
  checkRule: "^.{0,500}$",
  errorMsg: "请输入长度为0~500位的个人经历" }];



module.exports = rule;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map