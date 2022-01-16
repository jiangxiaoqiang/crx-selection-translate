webpackJsonp([0],{

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listeners = undefined;
exports.onStorageChanged = onStorageChanged;

exports.default = function (keys, areas, listener) {
  var _keys = isArray(keys) ? keys : [keys];

  var _areas = void 0,
      _listener = void 0;
  if (3 === arguments.length) {
    _areas = isArray(areas) ? areas : [areas];
    _listener = listener;
  } else {
    _listener = areas;
    _areas = ['local'];
  }

  // 先读取数据并调用一次回调函数
  // todo 使用一个参数阻止此默认行为
  _areas.forEach(function (area) {
    (0, _defaultOptions2.default)(_keys, area).then(function (items) {
      return _listener(items, area);
    });
  });

  function realListener(changes, area) {

    // 如果产生事件的区域不在监听的区域列表里则直接返回
    if (!_areas.includes(area)) {
      return;
    }

    // 仅包含监听的键
    var myChanges = {};

    for (var key in changes) {
      if (_keys.includes(key)) {
        myChanges[key] = changes[key];
      }
    }

    // myChanges 对象不是空的则调用监听函数
    for (var hasMyChange in myChanges) {
      _listener(myChanges, area);
      break;
    }
  }

  listeners.push(realListener);

  return function () {
    return listeners.splice(listeners.indexOf(realListener), 1);
  };
};

var _defaultOptions = __webpack_require__(173);

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listeners = exports.listeners = [];

/**
 * 唯一的事件处理函数。使用此函数分发事件。
 * @param {Object} changedItems
 * @param {String} area
 */
/**
 * @files 简化 storage 的监听逻辑
 */

function onStorageChanged(changedItems, area) {
  var changedNewValue = {};

  for (var key in changedItems) {
    changedNewValue[key] = changedItems[key].newValue;
  }

  listeners.forEach(function (realListener) {
    realListener(changedNewValue, area);
  });
}

chrome.storage.onChanged.addListener(onStorageChanged);

var isArray = Array.isArray;

/**
 * 先从 storage 里读取一次数据并触发回调函数,然后会持续监听 chrome.storage 的变化并调用回调函数.
 * 读取数据时会自动带上默认值;回调函数仅会接收到新值.
 * @param {String|String[]} keys
 * @param {String|String[]} [areas] - 要监听的存储区域.默认为 local
 * @param {Function} listener
 * @returns {Function} - 调用这个函数可以删除此监听函数
 */

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = __webpack_require__(125);

exports.default = (0, _connect.createClient)();

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _client = __webpack_require__(440);

var _client2 = _interopRequireDefault(_client);

var _index = __webpack_require__(446);

var _index2 = _interopRequireDefault(_index);

var _draggable = __webpack_require__(495);

var _draggable2 = _interopRequireDefault(_draggable);

var _storage = __webpack_require__(498);

var _storage2 = _interopRequireDefault(_storage);

var _ga = __webpack_require__(499);

var _ga2 = _interopRequireDefault(_ga);

var _hideOnEsc = __webpack_require__(500);

var _hideOnEsc2 = _interopRequireDefault(_hideOnEsc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: 功能未测试，先暂时注释掉
// import './shanbay'

var st = new _index2.default({ client: _client2.default });

(0, _draggable2.default)(st);
(0, _storage2.default)(st);
(0, _ga2.default)(st);
(0, _hideOnEsc2.default)(st);

exports.default = st;

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(485);
module.exports = __webpack_require__(486);


/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.requestAnimationFrame = window.requestAnimationFrame.bind(window);
window.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstMouseUp = undefined;

var _regenerator = __webpack_require__(79);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(80);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * mouseup 事件监听函数，用于检测用户第一次产生拖蓝的动作
 * @param {MouseEvent} e
 */
var firstMouseUp = exports.firstMouseUp = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
    var _ref2, disableInEditable;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!selection.toString().trim()) {
              _context.next = 14;
              break;
            }

            removeFirstMouseUp();

            if (!('true' === document.body.contentEditable)) {
              _context.next = 12;
              break;
            }

            _client2.default.send('ga', ['send', 'event', 'body 可编辑的情况']);
            _context.next = 6;
            return (0, _defaultOptions2.default)('disableInEditable');

          case 6:
            _ref2 = _context.sent;
            disableInEditable = _ref2.disableInEditable;

            if (!disableInEditable) {
              _context.next = 12;
              break;
            }

            _st2.default.$destroy();
            _client2.default.send('ga', ['send', 'event', 'body 可编辑的情况', '在 body 可编辑的情况下停用了']);
            return _context.abrupt('return');

          case 12:

            _st2.default.$appendTo('body');
            _st2.default.$emit('mouseup', e);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function firstMouseUp(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 取消对上面的 mouseUp 事件的监听。
 * 用户的其他操作启动了 st 之后就不需要继续监听 mouseup 事件了
 */


exports.removeFirstMouseUp = removeFirstMouseUp;
exports.onTranslate = onTranslate;

__webpack_require__(185);

var _st = __webpack_require__(445);

var _st2 = _interopRequireDefault(_st);

var _server = __webpack_require__(501);

var _server2 = _interopRequireDefault(_server);

var _util = __webpack_require__(127);

var _defaultOptions = __webpack_require__(173);

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _client = __webpack_require__(440);

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MOUSE_UP = 'mouseup',
    selection = getSelection();function removeFirstMouseUp() {
  exports.removeFirstMouseUp = removeFirstMouseUp = _util.noop;
  document.removeEventListener(MOUSE_UP, firstMouseUp);
}

function onTranslate() {
  removeFirstMouseUp();
  _st2.default.$appendTo('body');
  _server2.default.removeListener('connect', onConnect);
}

/**
 * 第一次收到翻译命令时解除 mouse up 事件的检测检测
 * @param client
 */
/* istanbul ignore next */
function onConnect(client) {
  client.on('translate', onTranslate);
}

/* istanbul ignore if */
if (true) {
  _server2.default.on('connect', onConnect);
  document.addEventListener(MOUSE_UP, firstMouseUp);
}

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (st) {

  function restrict() {
    (0, _restrict2.default)(st);
  }

  function onMove(event) {
    var boxPos = st.boxPos;

    boxPos.translateX += event.dx;
    boxPos.translateY += event.dy;
  }

  /* istanbul ignore next */
  if (false) {
    st.__restrict = restrict;
    st.__onMove = onMove;
  } else {
    st.$on('after translate', function () {
      st.$nextTick(restrict);
    });

    (0, _interact2.default)(st.$els.stDrag).styleCursor(false).draggable({
      onmove: onMove,
      onend: restrict
    });
  }
};

var _interact = __webpack_require__(496);

var _interact2 = _interopRequireDefault(_interact);

var _restrict = __webpack_require__(497);

var _restrict2 = _interopRequireDefault(_restrict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

/**
 * interact.js v1.2.8
 *
 * Copyright (c) 2012-2015 Taye Adeyemi <dev@taye.me>
 * Open source under the MIT License.
 * https://raw.github.com/taye/interact.js/master/LICENSE
 */
(function (realWindow) {
    'use strict';

    // return early if there's no window to work with (eg. Node.js)
    if (!realWindow) { return; }

    var // get wrapped window if using Shadow DOM polyfill
        window = (function () {
            // create a TextNode
            var el = realWindow.document.createTextNode('');

            // check if it's wrapped by a polyfill
            if (el.ownerDocument !== realWindow.document
                && typeof realWindow.wrap === 'function'
                && realWindow.wrap(el) === el) {
                // return wrapped window
                return realWindow.wrap(realWindow);
            }

            // no Shadow DOM polyfil or native implementation
            return realWindow;
        }()),

        document           = window.document,
        DocumentFragment   = window.DocumentFragment   || blank,
        SVGElement         = window.SVGElement         || blank,
        SVGSVGElement      = window.SVGSVGElement      || blank,
        SVGElementInstance = window.SVGElementInstance || blank,
        HTMLElement        = window.HTMLElement        || window.Element,

        PointerEvent = (window.PointerEvent || window.MSPointerEvent),
        pEventTypes,

        hypot = Math.hypot || function (x, y) { return Math.sqrt(x * x + y * y); },

        tmpXY = {},     // reduce object creation in getXY()

        documents       = [],   // all documents being listened to

        interactables   = [],   // all set interactables
        interactions    = [],   // all interactions

        dynamicDrop     = false,

        // {
        //      type: {
        //          selectors: ['selector', ...],
        //          contexts : [document, ...],
        //          listeners: [[listener, useCapture], ...]
        //      }
        //  }
        delegatedEvents = {},

        defaultOptions = {
            base: {
                accept        : null,
                actionChecker : null,
                styleCursor   : true,
                preventDefault: 'auto',
                origin        : { x: 0, y: 0 },
                deltaSource   : 'page',
                allowFrom     : null,
                ignoreFrom    : null,
                _context      : document,
                dropChecker   : null
            },

            drag: {
                enabled: false,
                manualStart: true,
                max: Infinity,
                maxPerElement: 1,

                snap: null,
                restrict: null,
                inertia: null,
                autoScroll: null,

                axis: 'xy'
            },

            drop: {
                enabled: false,
                accept: null,
                overlap: 'pointer'
            },

            resize: {
                enabled: false,
                manualStart: false,
                max: Infinity,
                maxPerElement: 1,

                snap: null,
                restrict: null,
                inertia: null,
                autoScroll: null,

                square: false,
                preserveAspectRatio: false,
                axis: 'xy',

                // use default margin
                margin: NaN,

                // object with props left, right, top, bottom which are
                // true/false values to resize when the pointer is over that edge,
                // CSS selectors to match the handles for each direction
                // or the Elements for each handle
                edges: null,

                // a value of 'none' will limit the resize rect to a minimum of 0x0
                // 'negate' will alow the rect to have negative width/height
                // 'reposition' will keep the width/height positive by swapping
                // the top and bottom edges and/or swapping the left and right edges
                invert: 'none'
            },

            gesture: {
                manualStart: false,
                enabled: false,
                max: Infinity,
                maxPerElement: 1,

                restrict: null
            },

            perAction: {
                manualStart: false,
                max: Infinity,
                maxPerElement: 1,

                snap: {
                    enabled     : false,
                    endOnly     : false,
                    range       : Infinity,
                    targets     : null,
                    offsets     : null,

                    relativePoints: null
                },

                restrict: {
                    enabled: false,
                    endOnly: false
                },

                autoScroll: {
                    enabled     : false,
                    container   : null,     // the item that is scrolled (Window or HTMLElement)
                    margin      : 60,
                    speed       : 300       // the scroll speed in pixels per second
                },

                inertia: {
                    enabled          : false,
                    resistance       : 10,    // the lambda in exponential decay
                    minSpeed         : 100,   // target speed must be above this for inertia to start
                    endSpeed         : 10,    // the speed at which inertia is slow enough to stop
                    allowResume      : true,  // allow resuming an action in inertia phase
                    zeroResumeDelta  : true,  // if an action is resumed after launch, set dx/dy to 0
                    smoothEndDuration: 300    // animate to snap/restrict endOnly if there's no inertia
                }
            },

            _holdDuration: 600
        },

        // Things related to autoScroll
        autoScroll = {
            interaction: null,
            i: null,    // the handle returned by window.setInterval
            x: 0, y: 0, // Direction each pulse is to scroll in

            // scroll the window by the values in scroll.x/y
            scroll: function () {
                var options = autoScroll.interaction.target.options[autoScroll.interaction.prepared.name].autoScroll,
                    container = options.container || getWindow(autoScroll.interaction.element),
                    now = new Date().getTime(),
                    // change in time in seconds
                    dtx = (now - autoScroll.prevTimeX) / 1000,
                    dty = (now - autoScroll.prevTimeY) / 1000,
                    vx, vy, sx, sy;

                // displacement
                if (options.velocity) {
                  vx = options.velocity.x;
                  vy = options.velocity.y;
                }
                else {
                  vx = vy = options.speed
                }
 
                sx = vx * dtx;
                sy = vy * dty;

                if (sx >= 1 || sy >= 1) {
                    if (isWindow(container)) {
                        container.scrollBy(autoScroll.x * sx, autoScroll.y * sy);
                    }
                    else if (container) {
                        container.scrollLeft += autoScroll.x * sx;
                        container.scrollTop  += autoScroll.y * sy;
                    }

                    if (sx >=1) autoScroll.prevTimeX = now;
                    if (sy >= 1) autoScroll.prevTimeY = now;
                }

                if (autoScroll.isScrolling) {
                    cancelFrame(autoScroll.i);
                    autoScroll.i = reqFrame(autoScroll.scroll);
                }
            },

            isScrolling: false,
            prevTimeX: 0,
            prevTimeY: 0,

            start: function (interaction) {
                autoScroll.isScrolling = true;
                cancelFrame(autoScroll.i);

                autoScroll.interaction = interaction;
                autoScroll.prevTimeX = new Date().getTime();
                autoScroll.prevTimeY = new Date().getTime();
                autoScroll.i = reqFrame(autoScroll.scroll);
            },

            stop: function () {
                autoScroll.isScrolling = false;
                cancelFrame(autoScroll.i);
            }
        },

        // Does the browser support touch input?
        supportsTouch = (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),

        // Does the browser support PointerEvents
        // Avoid PointerEvent bugs introduced in Chrome 55
        supportsPointerEvent = PointerEvent && !/Chrome/.test(navigator.userAgent),

        // Less Precision with touch input
        margin = supportsTouch || supportsPointerEvent? 20: 10,

        pointerMoveTolerance = 1,

        // for ignoring browser's simulated mouse events
        prevTouchTime = 0,

        // Allow this many interactions to happen simultaneously
        maxInteractions = Infinity,

        // Check if is IE9 or older
        actionCursors = (document.all && !window.atob) ? {
            drag    : 'move',
            resizex : 'e-resize',
            resizey : 's-resize',
            resizexy: 'se-resize',

            resizetop        : 'n-resize',
            resizeleft       : 'w-resize',
            resizebottom     : 's-resize',
            resizeright      : 'e-resize',
            resizetopleft    : 'se-resize',
            resizebottomright: 'se-resize',
            resizetopright   : 'ne-resize',
            resizebottomleft : 'ne-resize',

            gesture : ''
        } : {
            drag    : 'move',
            resizex : 'ew-resize',
            resizey : 'ns-resize',
            resizexy: 'nwse-resize',

            resizetop        : 'ns-resize',
            resizeleft       : 'ew-resize',
            resizebottom     : 'ns-resize',
            resizeright      : 'ew-resize',
            resizetopleft    : 'nwse-resize',
            resizebottomright: 'nwse-resize',
            resizetopright   : 'nesw-resize',
            resizebottomleft : 'nesw-resize',

            gesture : ''
        },

        actionIsEnabled = {
            drag   : true,
            resize : true,
            gesture: true
        },

        // because Webkit and Opera still use 'mousewheel' event type
        wheelEvent = 'onmousewheel' in document? 'mousewheel': 'wheel',

        eventTypes = [
            'dragstart',
            'dragmove',
            'draginertiastart',
            'dragend',
            'dragenter',
            'dragleave',
            'dropactivate',
            'dropdeactivate',
            'dropmove',
            'drop',
            'resizestart',
            'resizemove',
            'resizeinertiastart',
            'resizeend',
            'gesturestart',
            'gesturemove',
            'gestureinertiastart',
            'gestureend',

            'down',
            'move',
            'up',
            'cancel',
            'tap',
            'doubletap',
            'hold'
        ],

        globalEvents = {},

        // Opera Mobile must be handled differently
        isOperaMobile = navigator.appName == 'Opera' &&
            supportsTouch &&
            navigator.userAgent.match('Presto'),

        // scrolling doesn't change the result of getClientRects on iOS 7
        isIOS7 = (/iP(hone|od|ad)/.test(navigator.platform)
                         && /OS 7[^\d]/.test(navigator.appVersion)),

        // prefix matchesSelector
        prefixedMatchesSelector = 'matches' in Element.prototype?
                'matches': 'webkitMatchesSelector' in Element.prototype?
                    'webkitMatchesSelector': 'mozMatchesSelector' in Element.prototype?
                        'mozMatchesSelector': 'oMatchesSelector' in Element.prototype?
                            'oMatchesSelector': 'msMatchesSelector',

        // will be polyfill function if browser is IE8
        ie8MatchesSelector,

        // native requestAnimationFrame or polyfill
        reqFrame = realWindow.requestAnimationFrame,
        cancelFrame = realWindow.cancelAnimationFrame,

        // Events wrapper
        events = (function () {
            var useAttachEvent = ('attachEvent' in window) && !('addEventListener' in window),
                addEvent       = useAttachEvent?  'attachEvent': 'addEventListener',
                removeEvent    = useAttachEvent?  'detachEvent': 'removeEventListener',
                on             = useAttachEvent? 'on': '',

                elements          = [],
                targets           = [],
                attachedListeners = [];

            function add (element, type, listener, useCapture) {
                var elementIndex = indexOf(elements, element),
                    target = targets[elementIndex];

                if (!target) {
                    target = {
                        events: {},
                        typeCount: 0
                    };

                    elementIndex = elements.push(element) - 1;
                    targets.push(target);

                    attachedListeners.push((useAttachEvent ? {
                            supplied: [],
                            wrapped : [],
                            useCount: []
                        } : null));
                }

                if (!target.events[type]) {
                    target.events[type] = [];
                    target.typeCount++;
                }

                if (!contains(target.events[type], listener)) {
                    var ret;

                    if (useAttachEvent) {
                        var listeners = attachedListeners[elementIndex],
                            listenerIndex = indexOf(listeners.supplied, listener);

                        var wrapped = listeners.wrapped[listenerIndex] || function (event) {
                            if (!event.immediatePropagationStopped) {
                                event.target = event.srcElement;
                                event.currentTarget = element;

                                event.preventDefault = event.preventDefault || preventDef;
                                event.stopPropagation = event.stopPropagation || stopProp;
                                event.stopImmediatePropagation = event.stopImmediatePropagation || stopImmProp;

                                if (/mouse|click/.test(event.type)) {
                                    event.pageX = event.clientX + getWindow(element).document.documentElement.scrollLeft;
                                    event.pageY = event.clientY + getWindow(element).document.documentElement.scrollTop;
                                }

                                listener(event);
                            }
                        };

                        ret = element[addEvent](on + type, wrapped, Boolean(useCapture));

                        if (listenerIndex === -1) {
                            listeners.supplied.push(listener);
                            listeners.wrapped.push(wrapped);
                            listeners.useCount.push(1);
                        }
                        else {
                            listeners.useCount[listenerIndex]++;
                        }
                    }
                    else {
                        ret = element[addEvent](type, listener, useCapture || false);
                    }
                    target.events[type].push(listener);

                    return ret;
                }
            }

            function remove (element, type, listener, useCapture) {
                var i,
                    elementIndex = indexOf(elements, element),
                    target = targets[elementIndex],
                    listeners,
                    listenerIndex,
                    wrapped = listener;

                if (!target || !target.events) {
                    return;
                }

                if (useAttachEvent) {
                    listeners = attachedListeners[elementIndex];
                    listenerIndex = indexOf(listeners.supplied, listener);
                    wrapped = listeners.wrapped[listenerIndex];
                }

                if (type === 'all') {
                    for (type in target.events) {
                        if (target.events.hasOwnProperty(type)) {
                            remove(element, type, 'all');
                        }
                    }
                    return;
                }

                if (target.events[type]) {
                    var len = target.events[type].length;

                    if (listener === 'all') {
                        for (i = 0; i < len; i++) {
                            remove(element, type, target.events[type][i], Boolean(useCapture));
                        }
                        return;
                    } else {
                        for (i = 0; i < len; i++) {
                            if (target.events[type][i] === listener) {
                                element[removeEvent](on + type, wrapped, useCapture || false);
                                target.events[type].splice(i, 1);

                                if (useAttachEvent && listeners) {
                                    listeners.useCount[listenerIndex]--;
                                    if (listeners.useCount[listenerIndex] === 0) {
                                        listeners.supplied.splice(listenerIndex, 1);
                                        listeners.wrapped.splice(listenerIndex, 1);
                                        listeners.useCount.splice(listenerIndex, 1);
                                    }
                                }

                                break;
                            }
                        }
                    }

                    if (target.events[type] && target.events[type].length === 0) {
                        target.events[type] = null;
                        target.typeCount--;
                    }
                }

                if (!target.typeCount) {
                    targets.splice(elementIndex, 1);
                    elements.splice(elementIndex, 1);
                    attachedListeners.splice(elementIndex, 1);
                }
            }

            function preventDef () {
                this.returnValue = false;
            }

            function stopProp () {
                this.cancelBubble = true;
            }

            function stopImmProp () {
                this.cancelBubble = true;
                this.immediatePropagationStopped = true;
            }

            return {
                add: add,
                remove: remove,
                useAttachEvent: useAttachEvent,

                _elements: elements,
                _targets: targets,
                _attachedListeners: attachedListeners
            };
        }());

    function blank () {}

    function isElement (o) {
        if (!o || (typeof o !== 'object')) { return false; }

        var _window = getWindow(o) || window;

        return (/object|function/.test(typeof _window.Element)
            ? o instanceof _window.Element //DOM2
            : o.nodeType === 1 && typeof o.nodeName === "string");
    }
    function isWindow (thing) { return thing === window || !!(thing && thing.Window) && (thing instanceof thing.Window); }
    function isDocFrag (thing) { return !!thing && thing instanceof DocumentFragment; }
    function isArray (thing) {
        return isObject(thing)
                && (typeof thing.length !== undefined)
                && isFunction(thing.splice);
    }
    function isObject   (thing) { return !!thing && (typeof thing === 'object'); }
    function isFunction (thing) { return typeof thing === 'function'; }
    function isNumber   (thing) { return typeof thing === 'number'  ; }
    function isBool     (thing) { return typeof thing === 'boolean' ; }
    function isString   (thing) { return typeof thing === 'string'  ; }

    function trySelector (value) {
        if (!isString(value)) { return false; }

        // an exception will be raised if it is invalid
        document.querySelector(value);
        return true;
    }

    function extend (dest, source) {
        for (var prop in source) {
            dest[prop] = source[prop];
        }
        return dest;
    }

    var prefixedPropREs = {
      webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/
    };

    function pointerExtend (dest, source) {
        for (var prop in source) {
          var deprecated = false;

          // skip deprecated prefixed properties
          for (var vendor in prefixedPropREs) {
            if (prop.indexOf(vendor) === 0 && prefixedPropREs[vendor].test(prop)) {
              deprecated = true;
              break;
            }
          }

          if (!deprecated) {
            dest[prop] = source[prop];
          }
        }
        return dest;
    }

    function copyCoords (dest, src) {
        dest.page = dest.page || {};
        dest.page.x = src.page.x;
        dest.page.y = src.page.y;

        dest.client = dest.client || {};
        dest.client.x = src.client.x;
        dest.client.y = src.client.y;

        dest.timeStamp = src.timeStamp;
    }

    function setEventXY (targetObj, pointers, interaction) {
        var pointer = (pointers.length > 1
                       ? pointerAverage(pointers)
                       : pointers[0]);

        getPageXY(pointer, tmpXY, interaction);
        targetObj.page.x = tmpXY.x;
        targetObj.page.y = tmpXY.y;

        getClientXY(pointer, tmpXY, interaction);
        targetObj.client.x = tmpXY.x;
        targetObj.client.y = tmpXY.y;

        targetObj.timeStamp = new Date().getTime();
    }

    function setEventDeltas (targetObj, prev, cur) {
        targetObj.page.x     = cur.page.x      - prev.page.x;
        targetObj.page.y     = cur.page.y      - prev.page.y;
        targetObj.client.x   = cur.client.x    - prev.client.x;
        targetObj.client.y   = cur.client.y    - prev.client.y;
        targetObj.timeStamp = new Date().getTime() - prev.timeStamp;

        // set pointer velocity
        var dt = Math.max(targetObj.timeStamp / 1000, 0.001);
        targetObj.page.speed   = hypot(targetObj.page.x, targetObj.page.y) / dt;
        targetObj.page.vx      = targetObj.page.x / dt;
        targetObj.page.vy      = targetObj.page.y / dt;

        targetObj.client.speed = hypot(targetObj.client.x, targetObj.page.y) / dt;
        targetObj.client.vx    = targetObj.client.x / dt;
        targetObj.client.vy    = targetObj.client.y / dt;
    }

    function isNativePointer (pointer) {
        return (pointer instanceof window.Event
            || (supportsTouch && window.Touch && pointer instanceof window.Touch));
    }

    // Get specified X/Y coords for mouse or event.touches[0]
    function getXY (type, pointer, xy) {
        xy = xy || {};
        type = type || 'page';

        xy.x = pointer[type + 'X'];
        xy.y = pointer[type + 'Y'];

        return xy;
    }

    function getPageXY (pointer, page) {
        page = page || {};

        // Opera Mobile handles the viewport and scrolling oddly
        if (isOperaMobile && isNativePointer(pointer)) {
            getXY('screen', pointer, page);

            page.x += window.scrollX;
            page.y += window.scrollY;
        }
        else {
            getXY('page', pointer, page);
        }

        return page;
    }

    function getClientXY (pointer, client) {
        client = client || {};

        if (isOperaMobile && isNativePointer(pointer)) {
            // Opera Mobile handles the viewport and scrolling oddly
            getXY('screen', pointer, client);
        }
        else {
          getXY('client', pointer, client);
        }

        return client;
    }

    function getScrollXY (win) {
        win = win || window;
        return {
            x: win.scrollX || win.document.documentElement.scrollLeft,
            y: win.scrollY || win.document.documentElement.scrollTop
        };
    }

    function getPointerId (pointer) {
        return isNumber(pointer.pointerId)? pointer.pointerId : pointer.identifier;
    }

    function getActualElement (element) {
        return (element instanceof SVGElementInstance
            ? element.correspondingUseElement
            : element);
    }

    function getWindow (node) {
        if (isWindow(node)) {
            return node;
        }

        var rootNode = (node.ownerDocument || node);

        return rootNode.defaultView || rootNode.parentWindow || window;
    }

    function getElementClientRect (element) {
        var clientRect = (element instanceof SVGElement
                            ? element.getBoundingClientRect()
                            : element.getClientRects()[0]);

        return clientRect && {
            left  : clientRect.left,
            right : clientRect.right,
            top   : clientRect.top,
            bottom: clientRect.bottom,
            width : clientRect.width || clientRect.right - clientRect.left,
            height: clientRect.height || clientRect.bottom - clientRect.top
        };
    }

    function getElementRect (element) {
        var clientRect = getElementClientRect(element);

        if (!isIOS7 && clientRect) {
            var scroll = getScrollXY(getWindow(element));

            clientRect.left   += scroll.x;
            clientRect.right  += scroll.x;
            clientRect.top    += scroll.y;
            clientRect.bottom += scroll.y;
        }

        return clientRect;
    }

    function getTouchPair (event) {
        var touches = [];

        // array of touches is supplied
        if (isArray(event)) {
            touches[0] = event[0];
            touches[1] = event[1];
        }
        // an event
        else {
            if (event.type === 'touchend') {
                if (event.touches.length === 1) {
                    touches[0] = event.touches[0];
                    touches[1] = event.changedTouches[0];
                }
                else if (event.touches.length === 0) {
                    touches[0] = event.changedTouches[0];
                    touches[1] = event.changedTouches[1];
                }
            }
            else {
                touches[0] = event.touches[0];
                touches[1] = event.touches[1];
            }
        }

        return touches;
    }

    function pointerAverage (pointers) {
        var average = {
            pageX  : 0,
            pageY  : 0,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0
        };
        var prop;

        for (var i = 0; i < pointers.length; i++) {
            for (prop in average) {
                average[prop] += pointers[i][prop];
            }
        }
        for (prop in average) {
            average[prop] /= pointers.length;
        }

        return average;
    }

    function touchBBox (event) {
        if (!event.length && !(event.touches && event.touches.length > 1)) {
            return;
        }

        var touches = getTouchPair(event),
            minX = Math.min(touches[0].pageX, touches[1].pageX),
            minY = Math.min(touches[0].pageY, touches[1].pageY),
            maxX = Math.max(touches[0].pageX, touches[1].pageX),
            maxY = Math.max(touches[0].pageY, touches[1].pageY);

        return {
            x: minX,
            y: minY,
            left: minX,
            top: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    }

    function touchDistance (event, deltaSource) {
        deltaSource = deltaSource || defaultOptions.deltaSource;

        var sourceX = deltaSource + 'X',
            sourceY = deltaSource + 'Y',
            touches = getTouchPair(event);


        var dx = touches[0][sourceX] - touches[1][sourceX],
            dy = touches[0][sourceY] - touches[1][sourceY];

        return hypot(dx, dy);
    }

    function touchAngle (event, prevAngle, deltaSource) {
        deltaSource = deltaSource || defaultOptions.deltaSource;

        var sourceX = deltaSource + 'X',
            sourceY = deltaSource + 'Y',
            touches = getTouchPair(event),
            dx = touches[0][sourceX] - touches[1][sourceX],
            dy = touches[0][sourceY] - touches[1][sourceY],
            angle = 180 * Math.atan(dy / dx) / Math.PI;

        if (isNumber(prevAngle)) {
            var dr = angle - prevAngle,
                drClamped = dr % 360;

            if (drClamped > 315) {
                angle -= 360 + (angle / 360)|0 * 360;
            }
            else if (drClamped > 135) {
                angle -= 180 + (angle / 360)|0 * 360;
            }
            else if (drClamped < -315) {
                angle += 360 + (angle / 360)|0 * 360;
            }
            else if (drClamped < -135) {
                angle += 180 + (angle / 360)|0 * 360;
            }
        }

        return  angle;
    }

    function getOriginXY (interactable, element) {
        var origin = interactable
                ? interactable.options.origin
                : defaultOptions.origin;

        if (origin === 'parent') {
            origin = parentElement(element);
        }
        else if (origin === 'self') {
            origin = interactable.getRect(element);
        }
        else if (trySelector(origin)) {
            origin = closest(element, origin) || { x: 0, y: 0 };
        }

        if (isFunction(origin)) {
            origin = origin(interactable && element);
        }

        if (isElement(origin))  {
            origin = getElementRect(origin);
        }

        origin.x = ('x' in origin)? origin.x : origin.left;
        origin.y = ('y' in origin)? origin.y : origin.top;

        return origin;
    }

    // http://stackoverflow.com/a/5634528/2280888
    function _getQBezierValue(t, p1, p2, p3) {
        var iT = 1 - t;
        return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
    }

    function getQuadraticCurvePoint(startX, startY, cpX, cpY, endX, endY, position) {
        return {
            x:  _getQBezierValue(position, startX, cpX, endX),
            y:  _getQBezierValue(position, startY, cpY, endY)
        };
    }

    // http://gizma.com/easing/
    function easeOutQuad (t, b, c, d) {
        t /= d;
        return -c * t*(t-2) + b;
    }

    function nodeContains (parent, child) {
        while (child) {
            if (child === parent) {
                return true;
            }

            child = child.parentNode;
        }

        return false;
    }

    function closest (child, selector) {
        var parent = parentElement(child);

        while (isElement(parent)) {
            if (matchesSelector(parent, selector)) { return parent; }

            parent = parentElement(parent);
        }

        return null;
    }

    function parentElement (node) {
        var parent = node.parentNode;

        if (isDocFrag(parent)) {
            // skip past #shado-root fragments
            while ((parent = parent.host) && isDocFrag(parent)) {}

            return parent;
        }

        return parent;
    }

    function inContext (interactable, element) {
        return interactable._context === element.ownerDocument
                || nodeContains(interactable._context, element);
    }

    function testIgnore (interactable, interactableElement, element) {
        var ignoreFrom = interactable.options.ignoreFrom;

        if (!ignoreFrom || !isElement(element)) { return false; }

        if (isString(ignoreFrom)) {
            return matchesUpTo(element, ignoreFrom, interactableElement);
        }
        else if (isElement(ignoreFrom)) {
            return nodeContains(ignoreFrom, element);
        }

        return false;
    }

    function testAllow (interactable, interactableElement, element) {
        var allowFrom = interactable.options.allowFrom;

        if (!allowFrom) { return true; }

        if (!isElement(element)) { return false; }

        if (isString(allowFrom)) {
            return matchesUpTo(element, allowFrom, interactableElement);
        }
        else if (isElement(allowFrom)) {
            return nodeContains(allowFrom, element);
        }

        return false;
    }

    function checkAxis (axis, interactable) {
        if (!interactable) { return false; }

        var thisAxis = interactable.options.drag.axis;

        return (axis === 'xy' || thisAxis === 'xy' || thisAxis === axis);
    }

    function checkSnap (interactable, action) {
        var options = interactable.options;

        if (/^resize/.test(action)) {
            action = 'resize';
        }

        return options[action].snap && options[action].snap.enabled;
    }

    function checkRestrict (interactable, action) {
        var options = interactable.options;

        if (/^resize/.test(action)) {
            action = 'resize';
        }

        return  options[action].restrict && options[action].restrict.enabled;
    }

    function checkAutoScroll (interactable, action) {
        var options = interactable.options;

        if (/^resize/.test(action)) {
            action = 'resize';
        }

        return  options[action].autoScroll && options[action].autoScroll.enabled;
    }

    function withinInteractionLimit (interactable, element, action) {
        var options = interactable.options,
            maxActions = options[action.name].max,
            maxPerElement = options[action.name].maxPerElement,
            activeInteractions = 0,
            targetCount = 0,
            targetElementCount = 0;

        for (var i = 0, len = interactions.length; i < len; i++) {
            var interaction = interactions[i],
                otherAction = interaction.prepared.name,
                active = interaction.interacting();

            if (!active) { continue; }

            activeInteractions++;

            if (activeInteractions >= maxInteractions) {
                return false;
            }

            if (interaction.target !== interactable) { continue; }

            targetCount += (otherAction === action.name)|0;

            if (targetCount >= maxActions) {
                return false;
            }

            if (interaction.element === element) {
                targetElementCount++;

                if (otherAction !== action.name || targetElementCount >= maxPerElement) {
                    return false;
                }
            }
        }

        return maxInteractions > 0;
    }

    // Test for the element that's "above" all other qualifiers
    function indexOfDeepestElement (elements) {
        var dropzone,
            deepestZone = elements[0],
            index = deepestZone? 0: -1,
            parent,
            deepestZoneParents = [],
            dropzoneParents = [],
            child,
            i,
            n;

        for (i = 1; i < elements.length; i++) {
            dropzone = elements[i];

            // an element might belong to multiple selector dropzones
            if (!dropzone || dropzone === deepestZone) {
                continue;
            }

            if (!deepestZone) {
                deepestZone = dropzone;
                index = i;
                continue;
            }

            // check if the deepest or current are document.documentElement or document.rootElement
            // - if the current dropzone is, do nothing and continue
            if (dropzone.parentNode === dropzone.ownerDocument) {
                continue;
            }
            // - if deepest is, update with the current dropzone and continue to next
            else if (deepestZone.parentNode === dropzone.ownerDocument) {
                deepestZone = dropzone;
                index = i;
                continue;
            }

            if (!deepestZoneParents.length) {
                parent = deepestZone;
                while (parent.parentNode && parent.parentNode !== parent.ownerDocument) {
                    deepestZoneParents.unshift(parent);
                    parent = parent.parentNode;
                }
            }

            // if this element is an svg element and the current deepest is
            // an HTMLElement
            if (deepestZone instanceof HTMLElement
                && dropzone instanceof SVGElement
                && !(dropzone instanceof SVGSVGElement)) {

                if (dropzone === deepestZone.parentNode) {
                    continue;
                }

                parent = dropzone.ownerSVGElement;
            }
            else {
                parent = dropzone;
            }

            dropzoneParents = [];

            while (parent.parentNode !== parent.ownerDocument) {
                dropzoneParents.unshift(parent);
                parent = parent.parentNode;
            }

            n = 0;

            // get (position of last common ancestor) + 1
            while (dropzoneParents[n] && dropzoneParents[n] === deepestZoneParents[n]) {
                n++;
            }

            var parents = [
                dropzoneParents[n - 1],
                dropzoneParents[n],
                deepestZoneParents[n]
            ];

            child = parents[0].lastChild;

            while (child) {
                if (child === parents[1]) {
                    deepestZone = dropzone;
                    index = i;
                    deepestZoneParents = [];

                    break;
                }
                else if (child === parents[2]) {
                    break;
                }

                child = child.previousSibling;
            }
        }

        return index;
    }

    function Interaction () {
        this.target          = null; // current interactable being interacted with
        this.element         = null; // the target element of the interactable
        this.dropTarget      = null; // the dropzone a drag target might be dropped into
        this.dropElement     = null; // the element at the time of checking
        this.prevDropTarget  = null; // the dropzone that was recently dragged away from
        this.prevDropElement = null; // the element at the time of checking

        this.prepared        = {     // action that's ready to be fired on next move event
            name : null,
            axis : null,
            edges: null
        };

        this.matches         = [];   // all selectors that are matched by target element
        this.matchElements   = [];   // corresponding elements

        this.inertiaStatus = {
            active       : false,
            smoothEnd    : false,
            ending       : false,

            startEvent: null,
            upCoords: {},

            xe: 0, ye: 0,
            sx: 0, sy: 0,

            t0: 0,
            vx0: 0, vys: 0,
            duration: 0,

            resumeDx: 0,
            resumeDy: 0,

            lambda_v0: 0,
            one_ve_v0: 0,
            i  : null
        };

        if (isFunction(Function.prototype.bind)) {
            this.boundInertiaFrame = this.inertiaFrame.bind(this);
            this.boundSmoothEndFrame = this.smoothEndFrame.bind(this);
        }
        else {
            var that = this;

            this.boundInertiaFrame = function () { return that.inertiaFrame(); };
            this.boundSmoothEndFrame = function () { return that.smoothEndFrame(); };
        }

        this.activeDrops = {
            dropzones: [],      // the dropzones that are mentioned below
            elements : [],      // elements of dropzones that accept the target draggable
            rects    : []       // the rects of the elements mentioned above
        };

        // keep track of added pointers
        this.pointers    = [];
        this.pointerIds  = [];
        this.downTargets = [];
        this.downTimes   = [];
        this.holdTimers  = [];

        // Previous native pointer move event coordinates
        this.prevCoords = {
            page     : { x: 0, y: 0 },
            client   : { x: 0, y: 0 },
            timeStamp: 0
        };
        // current native pointer move event coordinates
        this.curCoords = {
            page     : { x: 0, y: 0 },
            client   : { x: 0, y: 0 },
            timeStamp: 0
        };

        // Starting InteractEvent pointer coordinates
        this.startCoords = {
            page     : { x: 0, y: 0 },
            client   : { x: 0, y: 0 },
            timeStamp: 0
        };

        // Change in coordinates and time of the pointer
        this.pointerDelta = {
            page     : { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
            client   : { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
            timeStamp: 0
        };

        this.downEvent   = null;    // pointerdown/mousedown/touchstart event
        this.downPointer = {};

        this._eventTarget    = null;
        this._curEventTarget = null;

        this.prevEvent = null;      // previous action event
        this.tapTime   = 0;         // time of the most recent tap event
        this.prevTap   = null;

        this.startOffset    = { left: 0, right: 0, top: 0, bottom: 0 };
        this.restrictOffset = { left: 0, right: 0, top: 0, bottom: 0 };
        this.snapOffsets    = [];

        this.gesture = {
            start: { x: 0, y: 0 },

            startDistance: 0,   // distance between two touches of touchStart
            prevDistance : 0,
            distance     : 0,

            scale: 1,           // gesture.distance / gesture.startDistance

            startAngle: 0,      // angle of line joining two touches
            prevAngle : 0       // angle of the previous gesture event
        };

        this.snapStatus = {
            x       : 0, y       : 0,
            dx      : 0, dy      : 0,
            realX   : 0, realY   : 0,
            snappedX: 0, snappedY: 0,
            targets : [],
            locked  : false,
            changed : false
        };

        this.restrictStatus = {
            dx         : 0, dy         : 0,
            restrictedX: 0, restrictedY: 0,
            snap       : null,
            restricted : false,
            changed    : false
        };

        this.restrictStatus.snap = this.snapStatus;

        this.pointerIsDown   = false;
        this.pointerWasMoved = false;
        this.gesturing       = false;
        this.dragging        = false;
        this.resizing        = false;
        this.resizeAxes      = 'xy';

        this.mouse = false;

        interactions.push(this);
    }

    Interaction.prototype = {
        getPageXY  : function (pointer, xy) { return   getPageXY(pointer, xy, this); },
        getClientXY: function (pointer, xy) { return getClientXY(pointer, xy, this); },
        setEventXY : function (target, ptr) { return  setEventXY(target, ptr, this); },

        pointerOver: function (pointer, event, eventTarget) {
            if (this.prepared.name || !this.mouse) { return; }

            var curMatches = [],
                curMatchElements = [],
                prevTargetElement = this.element;

            this.addPointer(pointer);

            if (this.target
                && (testIgnore(this.target, this.element, eventTarget)
                    || !testAllow(this.target, this.element, eventTarget))) {
                // if the eventTarget should be ignored or shouldn't be allowed
                // clear the previous target
                this.target = null;
                this.element = null;
                this.matches = [];
                this.matchElements = [];
            }

            var elementInteractable = interactables.get(eventTarget),
                elementAction = (elementInteractable
                                 && !testIgnore(elementInteractable, eventTarget, eventTarget)
                                 && testAllow(elementInteractable, eventTarget, eventTarget)
                                 && validateAction(
                                     elementInteractable.getAction(pointer, event, this, eventTarget),
                                     elementInteractable));

            if (elementAction && !withinInteractionLimit(elementInteractable, eventTarget, elementAction)) {
                 elementAction = null;
            }

            function pushCurMatches (interactable, selector) {
                if (interactable
                    && inContext(interactable, eventTarget)
                    && !testIgnore(interactable, eventTarget, eventTarget)
                    && testAllow(interactable, eventTarget, eventTarget)
                    && matchesSelector(eventTarget, selector)) {

                    curMatches.push(interactable);
                    curMatchElements.push(eventTarget);
                }
            }

            if (elementAction) {
                this.target = elementInteractable;
                this.element = eventTarget;
                this.matches = [];
                this.matchElements = [];
            }
            else {
                interactables.forEachSelector(pushCurMatches);

                if (this.validateSelector(pointer, event, curMatches, curMatchElements)) {
                    this.matches = curMatches;
                    this.matchElements = curMatchElements;

                    this.pointerHover(pointer, event, this.matches, this.matchElements);
                    events.add(eventTarget,
                                        supportsPointerEvent? pEventTypes.move : 'mousemove',
                                        listeners.pointerHover);
                }
                else if (this.target) {
                    if (nodeContains(prevTargetElement, eventTarget)) {
                        this.pointerHover(pointer, event, this.matches, this.matchElements);
                        events.add(this.element,
                                            supportsPointerEvent? pEventTypes.move : 'mousemove',
                                            listeners.pointerHover);
                    }
                    else {
                        this.target = null;
                        this.element = null;
                        this.matches = [];
                        this.matchElements = [];
                    }
                }
            }
        },

        // Check what action would be performed on pointerMove target if a mouse
        // button were pressed and change the cursor accordingly
        pointerHover: function (pointer, event, eventTarget, curEventTarget, matches, matchElements) {
            var target = this.target;

            if (!this.prepared.name && this.mouse) {

                var action;

                // update pointer coords for defaultActionChecker to use
                this.setEventXY(this.curCoords, [pointer]);

                if (matches) {
                    action = this.validateSelector(pointer, event, matches, matchElements);
                }
                else if (target) {
                    action = validateAction(target.getAction(this.pointers[0], event, this, this.element), this.target);
                }

                if (target && target.options.styleCursor) {
                    if (action) {
                        target._doc.documentElement.style.cursor = getActionCursor(action);
                    }
                    else {
                        target._doc.documentElement.style.cursor = '';
                    }
                }
            }
            else if (this.prepared.name) {
                this.checkAndPreventDefault(event, target, this.element);
            }
        },

        pointerOut: function (pointer, event, eventTarget) {
            if (this.prepared.name) { return; }

            // Remove temporary event listeners for selector Interactables
            if (!interactables.get(eventTarget)) {
                events.remove(eventTarget,
                                       supportsPointerEvent? pEventTypes.move : 'mousemove',
                                       listeners.pointerHover);
            }

            if (this.target && this.target.options.styleCursor && !this.interacting()) {
                this.target._doc.documentElement.style.cursor = '';
            }
        },

        selectorDown: function (pointer, event, eventTarget, curEventTarget) {
            var that = this,
                // copy event to be used in timeout for IE8
                eventCopy = events.useAttachEvent? extend({}, event) : event,
                element = eventTarget,
                pointerIndex = this.addPointer(pointer),
                action;

            this.holdTimers[pointerIndex] = setTimeout(function () {
                that.pointerHold(events.useAttachEvent? eventCopy : pointer, eventCopy, eventTarget, curEventTarget);
            }, defaultOptions._holdDuration);

            this.pointerIsDown = true;

            // Check if the down event hits the current inertia target
            if (this.inertiaStatus.active && this.target.selector) {
                // climb up the DOM tree from the event target
                while (isElement(element)) {

                    // if this element is the current inertia target element
                    if (element === this.element
                        // and the prospective action is the same as the ongoing one
                        && validateAction(this.target.getAction(pointer, event, this, this.element), this.target).name === this.prepared.name) {

                        // stop inertia so that the next move will be a normal one
                        cancelFrame(this.inertiaStatus.i);
                        this.inertiaStatus.active = false;

                        this.collectEventTargets(pointer, event, eventTarget, 'down');
                        return;
                    }
                    element = parentElement(element);
                }
            }

            // do nothing if interacting
            if (this.interacting()) {
                this.collectEventTargets(pointer, event, eventTarget, 'down');
                return;
            }

            function pushMatches (interactable, selector, context) {
                var elements = ie8MatchesSelector
                    ? context.querySelectorAll(selector)
                    : undefined;

                if (inContext(interactable, element)
                    && !testIgnore(interactable, element, eventTarget)
                    && testAllow(interactable, element, eventTarget)
                    && matchesSelector(element, selector, elements)) {

                    that.matches.push(interactable);
                    that.matchElements.push(element);
                }
            }

            // update pointer coords for defaultActionChecker to use
            this.setEventXY(this.curCoords, [pointer]);
            this.downEvent = event;

            while (isElement(element) && !action) {
                this.matches = [];
                this.matchElements = [];

                interactables.forEachSelector(pushMatches);

                action = this.validateSelector(pointer, event, this.matches, this.matchElements);
                element = parentElement(element);
            }

            if (action) {
                this.prepared.name  = action.name;
                this.prepared.axis  = action.axis;
                this.prepared.edges = action.edges;

                this.collectEventTargets(pointer, event, eventTarget, 'down');

                return this.pointerDown(pointer, event, eventTarget, curEventTarget, action);
            }
            else {
                // do these now since pointerDown isn't being called from here
                this.downTimes[pointerIndex] = new Date().getTime();
                this.downTargets[pointerIndex] = eventTarget;
                pointerExtend(this.downPointer, pointer);

                copyCoords(this.prevCoords, this.curCoords);
                this.pointerWasMoved = false;
            }

            this.collectEventTargets(pointer, event, eventTarget, 'down');
        },

        // Determine action to be performed on next pointerMove and add appropriate
        // style and event Listeners
        pointerDown: function (pointer, event, eventTarget, curEventTarget, forceAction) {
            if (!forceAction && !this.inertiaStatus.active && this.pointerWasMoved && this.prepared.name) {
                this.checkAndPreventDefault(event, this.target, this.element);

                return;
            }

            this.pointerIsDown = true;
            this.downEvent = event;

            var pointerIndex = this.addPointer(pointer),
                action;

            // If it is the second touch of a multi-touch gesture, keep the
            // target the same and get a new action if a target was set by the
            // first touch
            if (this.pointerIds.length > 1 && this.target._element === this.element) {
                var newAction = validateAction(forceAction || this.target.getAction(pointer, event, this, this.element), this.target);

                if (withinInteractionLimit(this.target, this.element, newAction)) {
                    action = newAction;
                }

                this.prepared.name = null;
            }
            // Otherwise, set the target if there is no action prepared
            else if (!this.prepared.name) {
                var interactable = interactables.get(curEventTarget);

                if (interactable
                    && !testIgnore(interactable, curEventTarget, eventTarget)
                    && testAllow(interactable, curEventTarget, eventTarget)
                    && (action = validateAction(forceAction || interactable.getAction(pointer, event, this, curEventTarget), interactable, eventTarget))
                    && withinInteractionLimit(interactable, curEventTarget, action)) {
                    this.target = interactable;
                    this.element = curEventTarget;
                }
            }

            var target = this.target,
                options = target && target.options;

            if (target && (forceAction || !this.prepared.name)) {
                action = action || validateAction(forceAction || target.getAction(pointer, event, this, curEventTarget), target, this.element);

                this.setEventXY(this.startCoords, this.pointers);

                if (!action) { return; }

                if (options.styleCursor) {
                    target._doc.documentElement.style.cursor = getActionCursor(action);
                }

                this.resizeAxes = action.name === 'resize'? action.axis : null;

                if (action === 'gesture' && this.pointerIds.length < 2) {
                    action = null;
                }

                this.prepared.name  = action.name;
                this.prepared.axis  = action.axis;
                this.prepared.edges = action.edges;

                this.snapStatus.snappedX = this.snapStatus.snappedY =
                    this.restrictStatus.restrictedX = this.restrictStatus.restrictedY = NaN;

                this.downTimes[pointerIndex] = new Date().getTime();
                this.downTargets[pointerIndex] = eventTarget;
                pointerExtend(this.downPointer, pointer);

                copyCoords(this.prevCoords, this.startCoords);
                this.pointerWasMoved = false;

                this.checkAndPreventDefault(event, target, this.element);
            }
            // if inertia is active try to resume action
            else if (this.inertiaStatus.active
                && curEventTarget === this.element
                && validateAction(target.getAction(pointer, event, this, this.element), target).name === this.prepared.name) {

                cancelFrame(this.inertiaStatus.i);
                this.inertiaStatus.active = false;

                this.checkAndPreventDefault(event, target, this.element);
            }
        },

        setModifications: function (coords, preEnd) {
            var target         = this.target,
                shouldMove     = true,
                shouldSnap     = checkSnap(target, this.prepared.name)     && (!target.options[this.prepared.name].snap.endOnly     || preEnd),
                shouldRestrict = checkRestrict(target, this.prepared.name) && (!target.options[this.prepared.name].restrict.endOnly || preEnd);

            if (shouldSnap    ) { this.setSnapping   (coords); } else { this.snapStatus    .locked     = false; }
            if (shouldRestrict) { this.setRestriction(coords); } else { this.restrictStatus.restricted = false; }

            if (shouldSnap && this.snapStatus.locked && !this.snapStatus.changed) {
                shouldMove = shouldRestrict && this.restrictStatus.restricted && this.restrictStatus.changed;
            }
            else if (shouldRestrict && this.restrictStatus.restricted && !this.restrictStatus.changed) {
                shouldMove = false;
            }

            return shouldMove;
        },

        setStartOffsets: function (action, interactable, element) {
            var rect = interactable.getRect(element),
                origin = getOriginXY(interactable, element),
                snap = interactable.options[this.prepared.name].snap,
                restrict = interactable.options[this.prepared.name].restrict,
                width, height;

            if (rect) {
                this.startOffset.left = this.startCoords.page.x - rect.left;
                this.startOffset.top  = this.startCoords.page.y - rect.top;

                this.startOffset.right  = rect.right  - this.startCoords.page.x;
                this.startOffset.bottom = rect.bottom - this.startCoords.page.y;

                if ('width' in rect) { width = rect.width; }
                else { width = rect.right - rect.left; }
                if ('height' in rect) { height = rect.height; }
                else { height = rect.bottom - rect.top; }
            }
            else {
                this.startOffset.left = this.startOffset.top = this.startOffset.right = this.startOffset.bottom = 0;
            }

            this.snapOffsets.splice(0);

            var snapOffset = snap && snap.offset === 'startCoords'
                                ? {
                                    x: this.startCoords.page.x - origin.x,
                                    y: this.startCoords.page.y - origin.y
                                }
                                : snap && snap.offset || { x: 0, y: 0 };

            if (rect && snap && snap.relativePoints && snap.relativePoints.length) {
                for (var i = 0; i < snap.relativePoints.length; i++) {
                    this.snapOffsets.push({
                        x: this.startOffset.left - (width  * snap.relativePoints[i].x) + snapOffset.x,
                        y: this.startOffset.top  - (height * snap.relativePoints[i].y) + snapOffset.y
                    });
                }
            }
            else {
                this.snapOffsets.push(snapOffset);
            }

            if (rect && restrict.elementRect) {
                this.restrictOffset.left = this.startOffset.left - (width  * restrict.elementRect.left);
                this.restrictOffset.top  = this.startOffset.top  - (height * restrict.elementRect.top);

                this.restrictOffset.right  = this.startOffset.right  - (width  * (1 - restrict.elementRect.right));
                this.restrictOffset.bottom = this.startOffset.bottom - (height * (1 - restrict.elementRect.bottom));
            }
            else {
                this.restrictOffset.left = this.restrictOffset.top = this.restrictOffset.right = this.restrictOffset.bottom = 0;
            }
        },

        /*\
         * Interaction.start
         [ method ]
         *
         * Start an action with the given Interactable and Element as tartgets. The
         * action must be enabled for the target Interactable and an appropriate number
         * of pointers must be held down – 1 for drag/resize, 2 for gesture.
         *
         * Use it with `interactable.<action>able({ manualStart: false })` to always
         * [start actions manually](https://github.com/taye/interact.js/issues/114)
         *
         - action       (object)  The action to be performed - drag, resize, etc.
         - interactable (Interactable) The Interactable to target
         - element      (Element) The DOM Element to target
         = (object) interact
         **
         | interact(target)
         |   .draggable({
         |     // disable the default drag start by down->move
         |     manualStart: true
         |   })
         |   // start dragging after the user holds the pointer down
         |   .on('hold', function (event) {
         |     var interaction = event.interaction;
         |
         |     if (!interaction.interacting()) {
         |       interaction.start({ name: 'drag' },
         |                         event.interactable,
         |                         event.currentTarget);
         |     }
         | });
        \*/
        start: function (action, interactable, element) {
            if (this.interacting()
                || !this.pointerIsDown
                || this.pointerIds.length < (action.name === 'gesture'? 2 : 1)) {
                return;
            }

            // if this interaction had been removed after stopping
            // add it back
            if (indexOf(interactions, this) === -1) {
                interactions.push(this);
            }

            // set the startCoords if there was no prepared action
            if (!this.prepared.name) {
                this.setEventXY(this.startCoords, this.pointers);
            }

            this.prepared.name  = action.name;
            this.prepared.axis  = action.axis;
            this.prepared.edges = action.edges;
            this.target         = interactable;
            this.element        = element;

            this.setStartOffsets(action.name, interactable, element);
            this.setModifications(this.startCoords.page);

            this.prevEvent = this[this.prepared.name + 'Start'](this.downEvent);
        },

        pointerMove: function (pointer, event, eventTarget, curEventTarget, preEnd) {
            if (this.inertiaStatus.active) {
                var pageUp   = this.inertiaStatus.upCoords.page;
                var clientUp = this.inertiaStatus.upCoords.client;

                var inertiaPosition = {
                    pageX  : pageUp.x   + this.inertiaStatus.sx,
                    pageY  : pageUp.y   + this.inertiaStatus.sy,
                    clientX: clientUp.x + this.inertiaStatus.sx,
                    clientY: clientUp.y + this.inertiaStatus.sy
                };

                this.setEventXY(this.curCoords, [inertiaPosition]);
            }
            else {
                this.recordPointer(pointer);
                this.setEventXY(this.curCoords, this.pointers);
            }

            var duplicateMove = (this.curCoords.page.x === this.prevCoords.page.x
                                 && this.curCoords.page.y === this.prevCoords.page.y
                                 && this.curCoords.client.x === this.prevCoords.client.x
                                 && this.curCoords.client.y === this.prevCoords.client.y);

            var dx, dy,
                pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer));

            // register movement greater than pointerMoveTolerance
            if (this.pointerIsDown && !this.pointerWasMoved) {
                dx = this.curCoords.client.x - this.startCoords.client.x;
                dy = this.curCoords.client.y - this.startCoords.client.y;

                this.pointerWasMoved = hypot(dx, dy) > pointerMoveTolerance;
            }

            if (!duplicateMove && (!this.pointerIsDown || this.pointerWasMoved)) {
                if (this.pointerIsDown) {
                    clearTimeout(this.holdTimers[pointerIndex]);
                }

                this.collectEventTargets(pointer, event, eventTarget, 'move');
            }

            if (!this.pointerIsDown) { return; }

            if (duplicateMove && this.pointerWasMoved && !preEnd) {
                this.checkAndPreventDefault(event, this.target, this.element);
                return;
            }

            // set pointer coordinate, time changes and speeds
            setEventDeltas(this.pointerDelta, this.prevCoords, this.curCoords);

            if (!this.prepared.name) { return; }

            if (this.pointerWasMoved
                // ignore movement while inertia is active
                && (!this.inertiaStatus.active || (pointer instanceof InteractEvent && /inertiastart/.test(pointer.type)))) {

                // if just starting an action, calculate the pointer speed now
                if (!this.interacting()) {
                    setEventDeltas(this.pointerDelta, this.prevCoords, this.curCoords);

                    // check if a drag is in the correct axis
                    if (this.prepared.name === 'drag') {
                        var absX = Math.abs(dx),
                            absY = Math.abs(dy),
                            targetAxis = this.target.options.drag.axis,
                            axis = (absX > absY ? 'x' : absX < absY ? 'y' : 'xy');

                        // if the movement isn't in the axis of the interactable
                        if (axis !== 'xy' && targetAxis !== 'xy' && targetAxis !== axis) {
                            // cancel the prepared action
                            this.prepared.name = null;

                            // then try to get a drag from another ineractable

                            var element = eventTarget;

                            // check element interactables
                            while (isElement(element)) {
                                var elementInteractable = interactables.get(element);

                                if (elementInteractable
                                    && elementInteractable !== this.target
                                    && !elementInteractable.options.drag.manualStart
                                    && elementInteractable.getAction(this.downPointer, this.downEvent, this, element).name === 'drag'
                                    && checkAxis(axis, elementInteractable)) {

                                    this.prepared.name = 'drag';
                                    this.target = elementInteractable;
                                    this.element = element;
                                    break;
                                }

                                element = parentElement(element);
                            }

                            // if there's no drag from element interactables,
                            // check the selector interactables
                            if (!this.prepared.name) {
                                var thisInteraction = this;

                                var getDraggable = function (interactable, selector, context) {
                                    var elements = ie8MatchesSelector
                                        ? context.querySelectorAll(selector)
                                        : undefined;

                                    if (interactable === thisInteraction.target) { return; }

                                    if (inContext(interactable, eventTarget)
                                        && !interactable.options.drag.manualStart
                                        && !testIgnore(interactable, element, eventTarget)
                                        && testAllow(interactable, element, eventTarget)
                                        && matchesSelector(element, selector, elements)
                                        && interactable.getAction(thisInteraction.downPointer, thisInteraction.downEvent, thisInteraction, element).name === 'drag'
                                        && checkAxis(axis, interactable)
                                        && withinInteractionLimit(interactable, element, 'drag')) {

                                        return interactable;
                                    }
                                };

                                element = eventTarget;

                                while (isElement(element)) {
                                    var selectorInteractable = interactables.forEachSelector(getDraggable);

                                    if (selectorInteractable) {
                                        this.prepared.name = 'drag';
                                        this.target = selectorInteractable;
                                        this.element = element;
                                        break;
                                    }

                                    element = parentElement(element);
                                }
                            }
                        }
                    }
                }

                var starting = !!this.prepared.name && !this.interacting();

                if (starting
                    && (this.target.options[this.prepared.name].manualStart
                        || !withinInteractionLimit(this.target, this.element, this.prepared))) {
                    this.stop(event);
                    return;
                }

                if (this.prepared.name && this.target) {
                    if (starting) {
                        this.start(this.prepared, this.target, this.element);
                    }

                    var shouldMove = this.setModifications(this.curCoords.page, preEnd);

                    // move if snapping or restriction doesn't prevent it
                    if (shouldMove || starting) {
                        this.prevEvent = this[this.prepared.name + 'Move'](event);
                    }

                    this.checkAndPreventDefault(event, this.target, this.element);
                }
            }

            copyCoords(this.prevCoords, this.curCoords);

            if (this.dragging || this.resizing) {
                this.autoScrollMove(pointer);
            }
        },

        dragStart: function (event) {
            var dragEvent = new InteractEvent(this, event, 'drag', 'start', this.element);

            this.dragging = true;
            this.target.fire(dragEvent);

            // reset active dropzones
            this.activeDrops.dropzones = [];
            this.activeDrops.elements  = [];
            this.activeDrops.rects     = [];

            if (!this.dynamicDrop) {
                this.setActiveDrops(this.element);
            }

            var dropEvents = this.getDropEvents(event, dragEvent);

            if (dropEvents.activate) {
                this.fireActiveDrops(dropEvents.activate);
            }

            return dragEvent;
        },

        dragMove: function (event) {
            var target = this.target,
                dragEvent  = new InteractEvent(this, event, 'drag', 'move', this.element),
                draggableElement = this.element,
                drop = this.getDrop(dragEvent, event, draggableElement);

            this.dropTarget = drop.dropzone;
            this.dropElement = drop.element;

            var dropEvents = this.getDropEvents(event, dragEvent);

            target.fire(dragEvent);

            if (dropEvents.leave) { this.prevDropTarget.fire(dropEvents.leave); }
            if (dropEvents.enter) {     this.dropTarget.fire(dropEvents.enter); }
            if (dropEvents.move ) {     this.dropTarget.fire(dropEvents.move ); }

            this.prevDropTarget  = this.dropTarget;
            this.prevDropElement = this.dropElement;

            return dragEvent;
        },

        resizeStart: function (event) {
            var resizeEvent = new InteractEvent(this, event, 'resize', 'start', this.element);

            if (this.prepared.edges) {
                var startRect = this.target.getRect(this.element);

                /*
                 * When using the `resizable.square` or `resizable.preserveAspectRatio` options, resizing from one edge
                 * will affect another. E.g. with `resizable.square`, resizing to make the right edge larger will make
                 * the bottom edge larger by the same amount. We call these 'linked' edges. Any linked edges will depend
                 * on the active edges and the edge being interacted with.
                 */
                if (this.target.options.resize.square || this.target.options.resize.preserveAspectRatio) {
                    var linkedEdges = extend({}, this.prepared.edges);

                    linkedEdges.top    = linkedEdges.top    || (linkedEdges.left   && !linkedEdges.bottom);
                    linkedEdges.left   = linkedEdges.left   || (linkedEdges.top    && !linkedEdges.right );
                    linkedEdges.bottom = linkedEdges.bottom || (linkedEdges.right  && !linkedEdges.top   );
                    linkedEdges.right  = linkedEdges.right  || (linkedEdges.bottom && !linkedEdges.left  );

                    this.prepared._linkedEdges = linkedEdges;
                }
                else {
                    this.prepared._linkedEdges = null;
                }

                // if using `resizable.preserveAspectRatio` option, record aspect ratio at the start of the resize
                if (this.target.options.resize.preserveAspectRatio) {
                    this.resizeStartAspectRatio = startRect.width / startRect.height;
                }

                this.resizeRects = {
                    start     : startRect,
                    current   : extend({}, startRect),
                    restricted: extend({}, startRect),
                    previous  : extend({}, startRect),
                    delta     : {
                        left: 0, right : 0, width : 0,
                        top : 0, bottom: 0, height: 0
                    }
                };

                resizeEvent.rect = this.resizeRects.restricted;
                resizeEvent.deltaRect = this.resizeRects.delta;
            }

            this.target.fire(resizeEvent);

            this.resizing = true;

            return resizeEvent;
        },

        resizeMove: function (event) {
            var resizeEvent = new InteractEvent(this, event, 'resize', 'move', this.element);

            var edges = this.prepared.edges,
                invert = this.target.options.resize.invert,
                invertible = invert === 'reposition' || invert === 'negate';

            if (edges) {
                var dx = resizeEvent.dx,
                    dy = resizeEvent.dy,

                    start      = this.resizeRects.start,
                    current    = this.resizeRects.current,
                    restricted = this.resizeRects.restricted,
                    delta      = this.resizeRects.delta,
                    previous   = extend(this.resizeRects.previous, restricted),

                    originalEdges = edges;

                // `resize.preserveAspectRatio` takes precedence over `resize.square`
                if (this.target.options.resize.preserveAspectRatio) {
                    var resizeStartAspectRatio = this.resizeStartAspectRatio;

                    edges = this.prepared._linkedEdges;

                    if ((originalEdges.left && originalEdges.bottom)
                        || (originalEdges.right && originalEdges.top)) {
                        dy = -dx / resizeStartAspectRatio;
                    }
                    else if (originalEdges.left || originalEdges.right) { dy = dx / resizeStartAspectRatio; }
                    else if (originalEdges.top || originalEdges.bottom) { dx = dy * resizeStartAspectRatio; }
                }
                else if (this.target.options.resize.square) {
                    edges = this.prepared._linkedEdges;

                    if ((originalEdges.left && originalEdges.bottom)
                        || (originalEdges.right && originalEdges.top)) {
                        dy = -dx;
                    }
                    else if (originalEdges.left || originalEdges.right) { dy = dx; }
                    else if (originalEdges.top || originalEdges.bottom) { dx = dy; }
                }

                // update the 'current' rect without modifications
                if (edges.top   ) { current.top    += dy; }
                if (edges.bottom) { current.bottom += dy; }
                if (edges.left  ) { current.left   += dx; }
                if (edges.right ) { current.right  += dx; }

                if (invertible) {
                    // if invertible, copy the current rect
                    extend(restricted, current);

                    if (invert === 'reposition') {
                        // swap edge values if necessary to keep width/height positive
                        var swap;

                        if (restricted.top > restricted.bottom) {
                            swap = restricted.top;

                            restricted.top = restricted.bottom;
                            restricted.bottom = swap;
                        }
                        if (restricted.left > restricted.right) {
                            swap = restricted.left;

                            restricted.left = restricted.right;
                            restricted.right = swap;
                        }
                    }
                }
                else {
                    // if not invertible, restrict to minimum of 0x0 rect
                    restricted.top    = Math.min(current.top, start.bottom);
                    restricted.bottom = Math.max(current.bottom, start.top);
                    restricted.left   = Math.min(current.left, start.right);
                    restricted.right  = Math.max(current.right, start.left);
                }

                restricted.width  = restricted.right  - restricted.left;
                restricted.height = restricted.bottom - restricted.top ;

                for (var edge in restricted) {
                    delta[edge] = restricted[edge] - previous[edge];
                }

                resizeEvent.edges = this.prepared.edges;
                resizeEvent.rect = restricted;
                resizeEvent.deltaRect = delta;
            }

            this.target.fire(resizeEvent);

            return resizeEvent;
        },

        gestureStart: function (event) {
            var gestureEvent = new InteractEvent(this, event, 'gesture', 'start', this.element);

            gestureEvent.ds = 0;

            this.gesture.startDistance = this.gesture.prevDistance = gestureEvent.distance;
            this.gesture.startAngle = this.gesture.prevAngle = gestureEvent.angle;
            this.gesture.scale = 1;

            this.gesturing = true;

            this.target.fire(gestureEvent);

            return gestureEvent;
        },

        gestureMove: function (event) {
            if (!this.pointerIds.length) {
                return this.prevEvent;
            }

            var gestureEvent;

            gestureEvent = new InteractEvent(this, event, 'gesture', 'move', this.element);
            gestureEvent.ds = gestureEvent.scale - this.gesture.scale;

            this.target.fire(gestureEvent);

            this.gesture.prevAngle = gestureEvent.angle;
            this.gesture.prevDistance = gestureEvent.distance;

            if (gestureEvent.scale !== Infinity &&
                gestureEvent.scale !== null &&
                gestureEvent.scale !== undefined  &&
                !isNaN(gestureEvent.scale)) {

                this.gesture.scale = gestureEvent.scale;
            }

            return gestureEvent;
        },

        pointerHold: function (pointer, event, eventTarget) {
            this.collectEventTargets(pointer, event, eventTarget, 'hold');
        },

        pointerUp: function (pointer, event, eventTarget, curEventTarget) {
            var pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer));

            clearTimeout(this.holdTimers[pointerIndex]);

            this.collectEventTargets(pointer, event, eventTarget, 'up' );
            this.collectEventTargets(pointer, event, eventTarget, 'tap');

            this.pointerEnd(pointer, event, eventTarget, curEventTarget);

            this.removePointer(pointer);
        },

        pointerCancel: function (pointer, event, eventTarget, curEventTarget) {
            var pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer));

            clearTimeout(this.holdTimers[pointerIndex]);

            this.collectEventTargets(pointer, event, eventTarget, 'cancel');
            this.pointerEnd(pointer, event, eventTarget, curEventTarget);

            this.removePointer(pointer);
        },

        // http://www.quirksmode.org/dom/events/click.html
        // >Events leading to dblclick
        //
        // IE8 doesn't fire down event before dblclick.
        // This workaround tries to fire a tap and doubletap after dblclick
        ie8Dblclick: function (pointer, event, eventTarget) {
            if (this.prevTap
                && event.clientX === this.prevTap.clientX
                && event.clientY === this.prevTap.clientY
                && eventTarget   === this.prevTap.target) {

                this.downTargets[0] = eventTarget;
                this.downTimes[0] = new Date().getTime();
                this.collectEventTargets(pointer, event, eventTarget, 'tap');
            }
        },

        // End interact move events and stop auto-scroll unless inertia is enabled
        pointerEnd: function (pointer, event, eventTarget, curEventTarget) {
            var endEvent,
                target = this.target,
                options = target && target.options,
                inertiaOptions = options && this.prepared.name && options[this.prepared.name].inertia,
                inertiaStatus = this.inertiaStatus;

            if (this.interacting()) {

                if (inertiaStatus.active && !inertiaStatus.ending) { return; }

                var pointerSpeed,
                    now = new Date().getTime(),
                    inertiaPossible = false,
                    inertia = false,
                    smoothEnd = false,
                    endSnap = checkSnap(target, this.prepared.name) && options[this.prepared.name].snap.endOnly,
                    endRestrict = checkRestrict(target, this.prepared.name) && options[this.prepared.name].restrict.endOnly,
                    dx = 0,
                    dy = 0,
                    startEvent;

                if (this.dragging) {
                    if      (options.drag.axis === 'x' ) { pointerSpeed = Math.abs(this.pointerDelta.client.vx); }
                    else if (options.drag.axis === 'y' ) { pointerSpeed = Math.abs(this.pointerDelta.client.vy); }
                    else   /*options.drag.axis === 'xy'*/{ pointerSpeed = this.pointerDelta.client.speed; }
                }
                else {
                    pointerSpeed = this.pointerDelta.client.speed;
                }

                // check if inertia should be started
                inertiaPossible = (inertiaOptions && inertiaOptions.enabled
                                   && this.prepared.name !== 'gesture'
                                   && event !== inertiaStatus.startEvent);

                inertia = (inertiaPossible
                           && (now - this.curCoords.timeStamp) < 50
                           && pointerSpeed > inertiaOptions.minSpeed
                           && pointerSpeed > inertiaOptions.endSpeed);

                if (inertiaPossible && !inertia && (endSnap || endRestrict)) {

                    var snapRestrict = {};

                    snapRestrict.snap = snapRestrict.restrict = snapRestrict;

                    if (endSnap) {
                        this.setSnapping(this.curCoords.page, snapRestrict);
                        if (snapRestrict.locked) {
                            dx += snapRestrict.dx;
                            dy += snapRestrict.dy;
                        }
                    }

                    if (endRestrict) {
                        this.setRestriction(this.curCoords.page, snapRestrict);
                        if (snapRestrict.restricted) {
                            dx += snapRestrict.dx;
                            dy += snapRestrict.dy;
                        }
                    }

                    if (dx || dy) {
                        smoothEnd = true;
                    }
                }

                if (inertia || smoothEnd) {
                    copyCoords(inertiaStatus.upCoords, this.curCoords);

                    this.pointers[0] = inertiaStatus.startEvent = startEvent =
                        new InteractEvent(this, event, this.prepared.name, 'inertiastart', this.element);

                    inertiaStatus.t0 = now;

                    target.fire(inertiaStatus.startEvent);

                    if (inertia) {
                        inertiaStatus.vx0 = this.pointerDelta.client.vx;
                        inertiaStatus.vy0 = this.pointerDelta.client.vy;
                        inertiaStatus.v0 = pointerSpeed;

                        this.calcInertia(inertiaStatus);

                        var page = extend({}, this.curCoords.page),
                            origin = getOriginXY(target, this.element),
                            statusObject;

                        page.x = page.x + inertiaStatus.xe - origin.x;
                        page.y = page.y + inertiaStatus.ye - origin.y;

                        statusObject = {
                            useStatusXY: true,
                            x: page.x,
                            y: page.y,
                            dx: 0,
                            dy: 0,
                            snap: null
                        };

                        statusObject.snap = statusObject;

                        dx = dy = 0;

                        if (endSnap) {
                            var snap = this.setSnapping(this.curCoords.page, statusObject);

                            if (snap.locked) {
                                dx += snap.dx;
                                dy += snap.dy;
                            }
                        }

                        if (endRestrict) {
                            var restrict = this.setRestriction(this.curCoords.page, statusObject);

                            if (restrict.restricted) {
                                dx += restrict.dx;
                                dy += restrict.dy;
                            }
                        }

                        inertiaStatus.modifiedXe += dx;
                        inertiaStatus.modifiedYe += dy;

                        inertiaStatus.i = reqFrame(this.boundInertiaFrame);
                    }
                    else {
                        inertiaStatus.smoothEnd = true;
                        inertiaStatus.xe = dx;
                        inertiaStatus.ye = dy;

                        inertiaStatus.sx = inertiaStatus.sy = 0;

                        inertiaStatus.i = reqFrame(this.boundSmoothEndFrame);
                    }

                    inertiaStatus.active = true;
                    return;
                }

                if (endSnap || endRestrict) {
                    // fire a move event at the snapped coordinates
                    this.pointerMove(pointer, event, eventTarget, curEventTarget, true);
                }
            }

            if (this.dragging) {
                endEvent = new InteractEvent(this, event, 'drag', 'end', this.element);

                var draggableElement = this.element,
                    drop = this.getDrop(endEvent, event, draggableElement);

                this.dropTarget = drop.dropzone;
                this.dropElement = drop.element;

                var dropEvents = this.getDropEvents(event, endEvent);

                if (dropEvents.leave) { this.prevDropTarget.fire(dropEvents.leave); }
                if (dropEvents.enter) {     this.dropTarget.fire(dropEvents.enter); }
                if (dropEvents.drop ) {     this.dropTarget.fire(dropEvents.drop ); }
                if (dropEvents.deactivate) {
                    this.fireActiveDrops(dropEvents.deactivate);
                }

                target.fire(endEvent);
            }
            else if (this.resizing) {
                endEvent = new InteractEvent(this, event, 'resize', 'end', this.element);
                target.fire(endEvent);
            }
            else if (this.gesturing) {
                endEvent = new InteractEvent(this, event, 'gesture', 'end', this.element);
                target.fire(endEvent);
            }

            this.stop(event);
        },

        collectDrops: function (element) {
            var drops = [],
                elements = [],
                i;

            element = element || this.element;

            // collect all dropzones and their elements which qualify for a drop
            for (i = 0; i < interactables.length; i++) {
                if (!interactables[i].options.drop.enabled) { continue; }

                var current = interactables[i],
                    accept = current.options.drop.accept;

                // test the draggable element against the dropzone's accept setting
                if ((isElement(accept) && accept !== element)
                    || (isString(accept)
                        && !matchesSelector(element, accept))) {

                    continue;
                }

                // query for new elements if necessary
                var dropElements = current.selector? current._context.querySelectorAll(current.selector) : [current._element];

                for (var j = 0, len = dropElements.length; j < len; j++) {
                    var currentElement = dropElements[j];

                    if (currentElement === element) {
                        continue;
                    }

                    drops.push(current);
                    elements.push(currentElement);
                }
            }

            return {
                dropzones: drops,
                elements: elements
            };
        },

        fireActiveDrops: function (event) {
            var i,
                current,
                currentElement,
                prevElement;

            // loop through all active dropzones and trigger event
            for (i = 0; i < this.activeDrops.dropzones.length; i++) {
                current = this.activeDrops.dropzones[i];
                currentElement = this.activeDrops.elements [i];

                // prevent trigger of duplicate events on same element
                if (currentElement !== prevElement) {
                    // set current element as event target
                    event.target = currentElement;
                    current.fire(event);
                }
                prevElement = currentElement;
            }
        },

        // Collect a new set of possible drops and save them in activeDrops.
        // setActiveDrops should always be called when a drag has just started or a
        // drag event happens while dynamicDrop is true
        setActiveDrops: function (dragElement) {
            // get dropzones and their elements that could receive the draggable
            var possibleDrops = this.collectDrops(dragElement, true);

            this.activeDrops.dropzones = possibleDrops.dropzones;
            this.activeDrops.elements  = possibleDrops.elements;
            this.activeDrops.rects     = [];

            for (var i = 0; i < this.activeDrops.dropzones.length; i++) {
                this.activeDrops.rects[i] = this.activeDrops.dropzones[i].getRect(this.activeDrops.elements[i]);
            }
        },

        getDrop: function (dragEvent, event, dragElement) {
            var validDrops = [];

            if (dynamicDrop) {
                this.setActiveDrops(dragElement);
            }

            // collect all dropzones and their elements which qualify for a drop
            for (var j = 0; j < this.activeDrops.dropzones.length; j++) {
                var current        = this.activeDrops.dropzones[j],
                    currentElement = this.activeDrops.elements [j],
                    rect           = this.activeDrops.rects    [j];

                validDrops.push(current.dropCheck(dragEvent, event, this.target, dragElement, currentElement, rect)
                                ? currentElement
                                : null);
            }

            // get the most appropriate dropzone based on DOM depth and order
            var dropIndex = indexOfDeepestElement(validDrops),
                dropzone  = this.activeDrops.dropzones[dropIndex] || null,
                element   = this.activeDrops.elements [dropIndex] || null;

            return {
                dropzone: dropzone,
                element: element
            };
        },

        getDropEvents: function (pointerEvent, dragEvent) {
            var dropEvents = {
                enter     : null,
                leave     : null,
                activate  : null,
                deactivate: null,
                move      : null,
                drop      : null
            };

            if (this.dropElement !== this.prevDropElement) {
                // if there was a prevDropTarget, create a dragleave event
                if (this.prevDropTarget) {
                    dropEvents.leave = {
                        target       : this.prevDropElement,
                        dropzone     : this.prevDropTarget,
                        relatedTarget: dragEvent.target,
                        draggable    : dragEvent.interactable,
                        dragEvent    : dragEvent,
                        interaction  : this,
                        timeStamp    : dragEvent.timeStamp,
                        type         : 'dragleave'
                    };

                    dragEvent.dragLeave = this.prevDropElement;
                    dragEvent.prevDropzone = this.prevDropTarget;
                }
                // if the dropTarget is not null, create a dragenter event
                if (this.dropTarget) {
                    dropEvents.enter = {
                        target       : this.dropElement,
                        dropzone     : this.dropTarget,
                        relatedTarget: dragEvent.target,
                        draggable    : dragEvent.interactable,
                        dragEvent    : dragEvent,
                        interaction  : this,
                        timeStamp    : dragEvent.timeStamp,
                        type         : 'dragenter'
                    };

                    dragEvent.dragEnter = this.dropElement;
                    dragEvent.dropzone = this.dropTarget;
                }
            }

            if (dragEvent.type === 'dragend' && this.dropTarget) {
                dropEvents.drop = {
                    target       : this.dropElement,
                    dropzone     : this.dropTarget,
                    relatedTarget: dragEvent.target,
                    draggable    : dragEvent.interactable,
                    dragEvent    : dragEvent,
                    interaction  : this,
                    timeStamp    : dragEvent.timeStamp,
                    type         : 'drop'
                };

                dragEvent.dropzone = this.dropTarget;
            }
            if (dragEvent.type === 'dragstart') {
                dropEvents.activate = {
                    target       : null,
                    dropzone     : null,
                    relatedTarget: dragEvent.target,
                    draggable    : dragEvent.interactable,
                    dragEvent    : dragEvent,
                    interaction  : this,
                    timeStamp    : dragEvent.timeStamp,
                    type         : 'dropactivate'
                };
            }
            if (dragEvent.type === 'dragend') {
                dropEvents.deactivate = {
                    target       : null,
                    dropzone     : null,
                    relatedTarget: dragEvent.target,
                    draggable    : dragEvent.interactable,
                    dragEvent    : dragEvent,
                    interaction  : this,
                    timeStamp    : dragEvent.timeStamp,
                    type         : 'dropdeactivate'
                };
            }
            if (dragEvent.type === 'dragmove' && this.dropTarget) {
                dropEvents.move = {
                    target       : this.dropElement,
                    dropzone     : this.dropTarget,
                    relatedTarget: dragEvent.target,
                    draggable    : dragEvent.interactable,
                    dragEvent    : dragEvent,
                    interaction  : this,
                    dragmove     : dragEvent,
                    timeStamp    : dragEvent.timeStamp,
                    type         : 'dropmove'
                };
                dragEvent.dropzone = this.dropTarget;
            }

            return dropEvents;
        },

        currentAction: function () {
            return (this.dragging && 'drag') || (this.resizing && 'resize') || (this.gesturing && 'gesture') || null;
        },

        interacting: function () {
            return this.dragging || this.resizing || this.gesturing;
        },

        clearTargets: function () {
            this.target = this.element = null;

            this.dropTarget = this.dropElement = this.prevDropTarget = this.prevDropElement = null;
        },

        stop: function (event) {
            if (this.interacting()) {
                autoScroll.stop();
                this.matches = [];
                this.matchElements = [];

                var target = this.target;

                if (target.options.styleCursor) {
                    target._doc.documentElement.style.cursor = '';
                }

                // prevent Default only if were previously interacting
                if (event && isFunction(event.preventDefault)) {
                    this.checkAndPreventDefault(event, target, this.element);
                }

                if (this.dragging) {
                    this.activeDrops.dropzones = this.activeDrops.elements = this.activeDrops.rects = null;
                }
            }

            this.clearTargets();

            this.pointerIsDown = this.snapStatus.locked = this.dragging = this.resizing = this.gesturing = false;
            this.prepared.name = this.prevEvent = null;
            this.inertiaStatus.resumeDx = this.inertiaStatus.resumeDy = 0;

            // remove pointers if their ID isn't in this.pointerIds
            for (var i = 0; i < this.pointers.length; i++) {
                if (indexOf(this.pointerIds, getPointerId(this.pointers[i])) === -1) {
                    this.pointers.splice(i, 1);
                }
            }
        },

        inertiaFrame: function () {
            var inertiaStatus = this.inertiaStatus,
                options = this.target.options[this.prepared.name].inertia,
                lambda = options.resistance,
                t = new Date().getTime() / 1000 - inertiaStatus.t0;

            if (t < inertiaStatus.te) {

                var progress =  1 - (Math.exp(-lambda * t) - inertiaStatus.lambda_v0) / inertiaStatus.one_ve_v0;

                if (inertiaStatus.modifiedXe === inertiaStatus.xe && inertiaStatus.modifiedYe === inertiaStatus.ye) {
                    inertiaStatus.sx = inertiaStatus.xe * progress;
                    inertiaStatus.sy = inertiaStatus.ye * progress;
                }
                else {
                    var quadPoint = getQuadraticCurvePoint(
                            0, 0,
                            inertiaStatus.xe, inertiaStatus.ye,
                            inertiaStatus.modifiedXe, inertiaStatus.modifiedYe,
                            progress);

                    inertiaStatus.sx = quadPoint.x;
                    inertiaStatus.sy = quadPoint.y;
                }

                this.pointerMove(inertiaStatus.startEvent, inertiaStatus.startEvent);

                inertiaStatus.i = reqFrame(this.boundInertiaFrame);
            }
            else {
                inertiaStatus.ending = true;

                inertiaStatus.sx = inertiaStatus.modifiedXe;
                inertiaStatus.sy = inertiaStatus.modifiedYe;

                this.pointerMove(inertiaStatus.startEvent, inertiaStatus.startEvent);
                this.pointerEnd(inertiaStatus.startEvent, inertiaStatus.startEvent);

                inertiaStatus.active = inertiaStatus.ending = false;
            }
        },

        smoothEndFrame: function () {
            var inertiaStatus = this.inertiaStatus,
                t = new Date().getTime() - inertiaStatus.t0,
                duration = this.target.options[this.prepared.name].inertia.smoothEndDuration;

            if (t < duration) {
                inertiaStatus.sx = easeOutQuad(t, 0, inertiaStatus.xe, duration);
                inertiaStatus.sy = easeOutQuad(t, 0, inertiaStatus.ye, duration);

                this.pointerMove(inertiaStatus.startEvent, inertiaStatus.startEvent);

                inertiaStatus.i = reqFrame(this.boundSmoothEndFrame);
            }
            else {
                inertiaStatus.ending = true;

                inertiaStatus.sx = inertiaStatus.xe;
                inertiaStatus.sy = inertiaStatus.ye;

                this.pointerMove(inertiaStatus.startEvent, inertiaStatus.startEvent);
                this.pointerEnd(inertiaStatus.startEvent, inertiaStatus.startEvent);

                inertiaStatus.smoothEnd =
                  inertiaStatus.active = inertiaStatus.ending = false;
            }
        },

        addPointer: function (pointer) {
            var id = getPointerId(pointer),
                index = this.mouse? 0 : indexOf(this.pointerIds, id);

            if (index === -1) {
                index = this.pointerIds.length;
            }

            this.pointerIds[index] = id;
            this.pointers[index] = pointer;

            return index;
        },

        removePointer: function (pointer) {
            var id = getPointerId(pointer),
                index = this.mouse? 0 : indexOf(this.pointerIds, id);

            if (index === -1) { return; }

            this.pointers   .splice(index, 1);
            this.pointerIds .splice(index, 1);
            this.downTargets.splice(index, 1);
            this.downTimes  .splice(index, 1);
            this.holdTimers .splice(index, 1);
        },

        recordPointer: function (pointer) {
            var index = this.mouse? 0: indexOf(this.pointerIds, getPointerId(pointer));

            if (index === -1) { return; }

            this.pointers[index] = pointer;
        },

        collectEventTargets: function (pointer, event, eventTarget, eventType) {
            var pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer));

            // do not fire a tap event if the pointer was moved before being lifted
            if (eventType === 'tap' && (this.pointerWasMoved
                // or if the pointerup target is different to the pointerdown target
                || !(this.downTargets[pointerIndex] && this.downTargets[pointerIndex] === eventTarget))) {
                return;
            }

            var targets = [],
                elements = [],
                element = eventTarget;

            function collectSelectors (interactable, selector, context) {
                var els = ie8MatchesSelector
                        ? context.querySelectorAll(selector)
                        : undefined;

                if (interactable._iEvents[eventType]
                    && isElement(element)
                    && inContext(interactable, element)
                    && !testIgnore(interactable, element, eventTarget)
                    && testAllow(interactable, element, eventTarget)
                    && matchesSelector(element, selector, els)) {

                    targets.push(interactable);
                    elements.push(element);
                }
            }

            while (element) {
                if (interact.isSet(element) && interact(element)._iEvents[eventType]) {
                    targets.push(interact(element));
                    elements.push(element);
                }

                interactables.forEachSelector(collectSelectors);

                element = parentElement(element);
            }

            // create the tap event even if there are no listeners so that
            // doubletap can still be created and fired
            if (targets.length || eventType === 'tap') {
                this.firePointers(pointer, event, eventTarget, targets, elements, eventType);
            }
        },

        firePointers: function (pointer, event, eventTarget, targets, elements, eventType) {
            var pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer)),
                pointerEvent = {},
                i,
                // for tap events
                interval, createNewDoubleTap;

            // if it's a doubletap then the event properties would have been
            // copied from the tap event and provided as the pointer argument
            if (eventType === 'doubletap') {
                pointerEvent = pointer;
            }
            else {
                pointerExtend(pointerEvent, event);
                if (event !== pointer) {
                    pointerExtend(pointerEvent, pointer);
                }

                pointerEvent.preventDefault           = preventOriginalDefault;
                pointerEvent.stopPropagation          = InteractEvent.prototype.stopPropagation;
                pointerEvent.stopImmediatePropagation = InteractEvent.prototype.stopImmediatePropagation;
                pointerEvent.interaction              = this;

                pointerEvent.timeStamp       = new Date().getTime();
                pointerEvent.originalEvent   = event;
                pointerEvent.originalPointer = pointer;
                pointerEvent.type            = eventType;
                pointerEvent.pointerId       = getPointerId(pointer);
                pointerEvent.pointerType     = this.mouse? 'mouse' : !supportsPointerEvent? 'touch'
                                                    : isString(pointer.pointerType)
                                                        ? pointer.pointerType
                                                        : [,,'touch', 'pen', 'mouse'][pointer.pointerType];
            }

            if (eventType === 'tap') {
                pointerEvent.dt = pointerEvent.timeStamp - this.downTimes[pointerIndex];

                interval = pointerEvent.timeStamp - this.tapTime;
                createNewDoubleTap = !!(this.prevTap && this.prevTap.type !== 'doubletap'
                       && this.prevTap.target === pointerEvent.target
                       && interval < 500);

                pointerEvent.double = createNewDoubleTap;

                this.tapTime = pointerEvent.timeStamp;
            }

            for (i = 0; i < targets.length; i++) {
                pointerEvent.currentTarget = elements[i];
                pointerEvent.interactable = targets[i];
                targets[i].fire(pointerEvent);

                if (pointerEvent.immediatePropagationStopped
                    ||(pointerEvent.propagationStopped && elements[i + 1] !== pointerEvent.currentTarget)) {
                    break;
                }
            }

            if (createNewDoubleTap) {
                var doubleTap = {};

                extend(doubleTap, pointerEvent);

                doubleTap.dt   = interval;
                doubleTap.type = 'doubletap';

                this.collectEventTargets(doubleTap, event, eventTarget, 'doubletap');

                this.prevTap = doubleTap;
            }
            else if (eventType === 'tap') {
                this.prevTap = pointerEvent;
            }
        },

        validateSelector: function (pointer, event, matches, matchElements) {
            for (var i = 0, len = matches.length; i < len; i++) {
                var match = matches[i],
                    matchElement = matchElements[i],
                    action = validateAction(match.getAction(pointer, event, this, matchElement), match);

                if (action && withinInteractionLimit(match, matchElement, action)) {
                    this.target = match;
                    this.element = matchElement;

                    return action;
                }
            }
        },

        setSnapping: function (pageCoords, status) {
            var snap = this.target.options[this.prepared.name].snap,
                targets = [],
                target,
                page,
                i;

            status = status || this.snapStatus;

            if (status.useStatusXY) {
                page = { x: status.x, y: status.y };
            }
            else {
                var origin = getOriginXY(this.target, this.element);

                page = extend({}, pageCoords);

                page.x -= origin.x;
                page.y -= origin.y;
            }

            status.realX = page.x;
            status.realY = page.y;

            page.x = page.x - this.inertiaStatus.resumeDx;
            page.y = page.y - this.inertiaStatus.resumeDy;

            var len = snap.targets? snap.targets.length : 0;

            for (var relIndex = 0; relIndex < this.snapOffsets.length; relIndex++) {
                var relative = {
                    x: page.x - this.snapOffsets[relIndex].x,
                    y: page.y - this.snapOffsets[relIndex].y
                };

                for (i = 0; i < len; i++) {
                    if (isFunction(snap.targets[i])) {
                        target = snap.targets[i](relative.x, relative.y, this);
                    }
                    else {
                        target = snap.targets[i];
                    }

                    if (!target) { continue; }

                    targets.push({
                        x: isNumber(target.x) ? (target.x + this.snapOffsets[relIndex].x) : relative.x,
                        y: isNumber(target.y) ? (target.y + this.snapOffsets[relIndex].y) : relative.y,

                        range: isNumber(target.range)? target.range: snap.range
                    });
                }
            }

            var closest = {
                    target: null,
                    inRange: false,
                    distance: 0,
                    range: 0,
                    dx: 0,
                    dy: 0
                };

            for (i = 0, len = targets.length; i < len; i++) {
                target = targets[i];

                var range = target.range,
                    dx = target.x - page.x,
                    dy = target.y - page.y,
                    distance = hypot(dx, dy),
                    inRange = distance <= range;

                // Infinite targets count as being out of range
                // compared to non infinite ones that are in range
                if (range === Infinity && closest.inRange && closest.range !== Infinity) {
                    inRange = false;
                }

                if (!closest.target || (inRange
                    // is the closest target in range?
                    ? (closest.inRange && range !== Infinity
                        // the pointer is relatively deeper in this target
                        ? distance / range < closest.distance / closest.range
                        // this target has Infinite range and the closest doesn't
                        : (range === Infinity && closest.range !== Infinity)
                            // OR this target is closer that the previous closest
                            || distance < closest.distance)
                    // The other is not in range and the pointer is closer to this target
                    : (!closest.inRange && distance < closest.distance))) {

                    if (range === Infinity) {
                        inRange = true;
                    }

                    closest.target = target;
                    closest.distance = distance;
                    closest.range = range;
                    closest.inRange = inRange;
                    closest.dx = dx;
                    closest.dy = dy;

                    status.range = range;
                }
            }

            var snapChanged;

            if (closest.target) {
                snapChanged = (status.snappedX !== closest.target.x || status.snappedY !== closest.target.y);

                status.snappedX = closest.target.x;
                status.snappedY = closest.target.y;
            }
            else {
                snapChanged = true;

                status.snappedX = NaN;
                status.snappedY = NaN;
            }

            status.dx = closest.dx;
            status.dy = closest.dy;

            status.changed = (snapChanged || (closest.inRange && !status.locked));
            status.locked = closest.inRange;

            return status;
        },

        setRestriction: function (pageCoords, status) {
            var target = this.target,
                restrict = target && target.options[this.prepared.name].restrict,
                restriction = restrict && restrict.restriction,
                page;

            if (!restriction) {
                return status;
            }

            status = status || this.restrictStatus;

            page = status.useStatusXY
                    ? page = { x: status.x, y: status.y }
                    : page = extend({}, pageCoords);

            if (status.snap && status.snap.locked) {
                page.x += status.snap.dx || 0;
                page.y += status.snap.dy || 0;
            }

            page.x -= this.inertiaStatus.resumeDx;
            page.y -= this.inertiaStatus.resumeDy;

            status.dx = 0;
            status.dy = 0;
            status.restricted = false;

            var rect, restrictedX, restrictedY;

            if (isString(restriction)) {
                if (restriction === 'parent') {
                    restriction = parentElement(this.element);
                }
                else if (restriction === 'self') {
                    restriction = target.getRect(this.element);
                }
                else {
                    restriction = closest(this.element, restriction);
                }

                if (!restriction) { return status; }
            }

            if (isFunction(restriction)) {
                restriction = restriction(page.x, page.y, this.element);
            }

            if (isElement(restriction)) {
                restriction = getElementRect(restriction);
            }

            rect = restriction;

            if (!restriction) {
                restrictedX = page.x;
                restrictedY = page.y;
            }
            // object is assumed to have
            // x, y, width, height or
            // left, top, right, bottom
            else if ('x' in restriction && 'y' in restriction) {
                restrictedX = Math.max(Math.min(rect.x + rect.width  - this.restrictOffset.right , page.x), rect.x + this.restrictOffset.left);
                restrictedY = Math.max(Math.min(rect.y + rect.height - this.restrictOffset.bottom, page.y), rect.y + this.restrictOffset.top );
            }
            else {
                restrictedX = Math.max(Math.min(rect.right  - this.restrictOffset.right , page.x), rect.left + this.restrictOffset.left);
                restrictedY = Math.max(Math.min(rect.bottom - this.restrictOffset.bottom, page.y), rect.top  + this.restrictOffset.top );
            }

            status.dx = restrictedX - page.x;
            status.dy = restrictedY - page.y;

            status.changed = status.restrictedX !== restrictedX || status.restrictedY !== restrictedY;
            status.restricted = !!(status.dx || status.dy);

            status.restrictedX = restrictedX;
            status.restrictedY = restrictedY;

            return status;
        },

        checkAndPreventDefault: function (event, interactable, element) {
            if (!(interactable = interactable || this.target)) { return; }

            var options = interactable.options,
                prevent = options.preventDefault;

            if (prevent === 'auto' && element && !/^(input|select|textarea)$/i.test(event.target.nodeName)) {
                // do not preventDefault on pointerdown if the prepared action is a drag
                // and dragging can only start from a certain direction - this allows
                // a touch to pan the viewport if a drag isn't in the right direction
                if (/down|start/i.test(event.type)
                    && this.prepared.name === 'drag' && options.drag.axis !== 'xy') {

                    return;
                }

                // with manualStart, only preventDefault while interacting
                if (options[this.prepared.name] && options[this.prepared.name].manualStart
                    && !this.interacting()) {
                    return;
                }

                event.preventDefault();
                return;
            }

            if (prevent === 'always') {
                event.preventDefault();
                return;
            }
        },

        calcInertia: function (status) {
            var inertiaOptions = this.target.options[this.prepared.name].inertia,
                lambda = inertiaOptions.resistance,
                inertiaDur = -Math.log(inertiaOptions.endSpeed / status.v0) / lambda;

            status.x0 = this.prevEvent.pageX;
            status.y0 = this.prevEvent.pageY;
            status.t0 = status.startEvent.timeStamp / 1000;
            status.sx = status.sy = 0;

            status.modifiedXe = status.xe = (status.vx0 - inertiaDur) / lambda;
            status.modifiedYe = status.ye = (status.vy0 - inertiaDur) / lambda;
            status.te = inertiaDur;

            status.lambda_v0 = lambda / status.v0;
            status.one_ve_v0 = 1 - inertiaOptions.endSpeed / status.v0;
        },

        autoScrollMove: function (pointer) {
            if (!(this.interacting()
                && checkAutoScroll(this.target, this.prepared.name))) {
                return;
            }

            if (this.inertiaStatus.active) {
                autoScroll.x = autoScroll.y = 0;
                return;
            }

            var top,
                right,
                bottom,
                left,
                options = this.target.options[this.prepared.name].autoScroll,
                container = options.container || getWindow(this.element);

            if (isWindow(container)) {
                left   = pointer.clientX < autoScroll.margin;
                top    = pointer.clientY < autoScroll.margin;
                right  = pointer.clientX > container.innerWidth  - autoScroll.margin;
                bottom = pointer.clientY > container.innerHeight - autoScroll.margin;
            }
            else {
                var rect = getElementClientRect(container);

                left   = pointer.clientX < rect.left   + autoScroll.margin;
                top    = pointer.clientY < rect.top    + autoScroll.margin;
                right  = pointer.clientX > rect.right  - autoScroll.margin;
                bottom = pointer.clientY > rect.bottom - autoScroll.margin;
            }

            autoScroll.x = (right ? 1: left? -1: 0);
            autoScroll.y = (bottom? 1:  top? -1: 0);

            if (!autoScroll.isScrolling) {
                // set the autoScroll properties to those of the target
                autoScroll.margin = options.margin;
                autoScroll.speed  = options.speed;

                autoScroll.start(this);
            }
        },

        _updateEventTargets: function (target, currentTarget) {
            this._eventTarget    = target;
            this._curEventTarget = currentTarget;
        }

    };

    function getInteractionFromPointer (pointer, eventType, eventTarget) {
        var i = 0, len = interactions.length,
            mouseEvent = (/mouse/i.test(pointer.pointerType || eventType)
                          // MSPointerEvent.MSPOINTER_TYPE_MOUSE
                          || pointer.pointerType === 4),
            interaction;

        var id = getPointerId(pointer);

        // try to resume inertia with a new pointer
        if (/down|start/i.test(eventType)) {
            for (i = 0; i < len; i++) {
                interaction = interactions[i];

                var element = eventTarget;

                if (interaction.inertiaStatus.active && interaction.target.options[interaction.prepared.name].inertia.allowResume
                    && (interaction.mouse === mouseEvent)) {
                    while (element) {
                        // if the element is the interaction element
                        if (element === interaction.element) {
                            return interaction;
                        }
                        element = parentElement(element);
                    }
                }
            }
        }

        // if it's a mouse interaction
        if (mouseEvent || !(supportsTouch || supportsPointerEvent)) {

            // find a mouse interaction that's not in inertia phase
            for (i = 0; i < len; i++) {
                if (interactions[i].mouse && !interactions[i].inertiaStatus.active) {
                    return interactions[i];
                }
            }

            // find any interaction specifically for mouse.
            // if the eventType is a mousedown, and inertia is active
            // ignore the interaction
            for (i = 0; i < len; i++) {
                if (interactions[i].mouse && !(/down/.test(eventType) && interactions[i].inertiaStatus.active)) {
                    return interaction;
                }
            }

            // create a new interaction for mouse
            interaction = new Interaction();
            interaction.mouse = true;

            return interaction;
        }

        // get interaction that has this pointer
        for (i = 0; i < len; i++) {
            if (contains(interactions[i].pointerIds, id)) {
                return interactions[i];
            }
        }

        // at this stage, a pointerUp should not return an interaction
        if (/up|end|out/i.test(eventType)) {
            return null;
        }

        // get first idle interaction
        for (i = 0; i < len; i++) {
            interaction = interactions[i];

            if ((!interaction.prepared.name || (interaction.target.options.gesture.enabled))
                && !interaction.interacting()
                && !(!mouseEvent && interaction.mouse)) {

                return interaction;
            }
        }

        return new Interaction();
    }

    function doOnInteractions (method) {
        return (function (event) {
            var interaction,
                eventTarget = getActualElement(event.path
                                               ? event.path[0]
                                               : event.target),
                curEventTarget = getActualElement(event.currentTarget),
                i;

            if (supportsTouch && /touch/.test(event.type)) {
                prevTouchTime = new Date().getTime();

                for (i = 0; i < event.changedTouches.length; i++) {
                    var pointer = event.changedTouches[i];

                    interaction = getInteractionFromPointer(pointer, event.type, eventTarget);

                    if (!interaction) { continue; }

                    interaction._updateEventTargets(eventTarget, curEventTarget);

                    interaction[method](pointer, event, eventTarget, curEventTarget);
                }
            }
            else {
                if (!supportsPointerEvent && /mouse/.test(event.type)) {
                    // ignore mouse events while touch interactions are active
                    for (i = 0; i < interactions.length; i++) {
                        if (!interactions[i].mouse && interactions[i].pointerIsDown) {
                            return;
                        }
                    }

                    // try to ignore mouse events that are simulated by the browser
                    // after a touch event
                    if (new Date().getTime() - prevTouchTime < 500) {
                        return;
                    }
                }

                interaction = getInteractionFromPointer(event, event.type, eventTarget);

                if (!interaction) { return; }

                interaction._updateEventTargets(eventTarget, curEventTarget);

                interaction[method](event, event, eventTarget, curEventTarget);
            }
        });
    }

    function InteractEvent (interaction, event, action, phase, element, related) {
        var client,
            page,
            target      = interaction.target,
            snapStatus  = interaction.snapStatus,
            restrictStatus  = interaction.restrictStatus,
            pointers    = interaction.pointers,
            deltaSource = (target && target.options || defaultOptions).deltaSource,
            sourceX     = deltaSource + 'X',
            sourceY     = deltaSource + 'Y',
            options     = target? target.options: defaultOptions,
            origin      = getOriginXY(target, element),
            starting    = phase === 'start',
            ending      = phase === 'end',
            coords      = starting? interaction.startCoords : interaction.curCoords;

        element = element || interaction.element;

        page   = extend({}, coords.page);
        client = extend({}, coords.client);

        page.x -= origin.x;
        page.y -= origin.y;

        client.x -= origin.x;
        client.y -= origin.y;

        var relativePoints = options[action].snap && options[action].snap.relativePoints ;

        if (checkSnap(target, action) && !(starting && relativePoints && relativePoints.length)) {
            this.snap = {
                range  : snapStatus.range,
                locked : snapStatus.locked,
                x      : snapStatus.snappedX,
                y      : snapStatus.snappedY,
                realX  : snapStatus.realX,
                realY  : snapStatus.realY,
                dx     : snapStatus.dx,
                dy     : snapStatus.dy
            };

            if (snapStatus.locked) {
                page.x += snapStatus.dx;
                page.y += snapStatus.dy;
                client.x += snapStatus.dx;
                client.y += snapStatus.dy;
            }
        }

        if (checkRestrict(target, action) && !(starting && options[action].restrict.elementRect) && restrictStatus.restricted) {
            page.x += restrictStatus.dx;
            page.y += restrictStatus.dy;
            client.x += restrictStatus.dx;
            client.y += restrictStatus.dy;

            this.restrict = {
                dx: restrictStatus.dx,
                dy: restrictStatus.dy
            };
        }

        this.pageX     = page.x;
        this.pageY     = page.y;
        this.clientX   = client.x;
        this.clientY   = client.y;

        this.x0        = interaction.startCoords.page.x - origin.x;
        this.y0        = interaction.startCoords.page.y - origin.y;
        this.clientX0  = interaction.startCoords.client.x - origin.x;
        this.clientY0  = interaction.startCoords.client.y - origin.y;
        this.ctrlKey   = event.ctrlKey;
        this.altKey    = event.altKey;
        this.shiftKey  = event.shiftKey;
        this.metaKey   = event.metaKey;
        this.button    = event.button;
        this.buttons   = event.buttons;
        this.target    = element;
        this.t0        = interaction.downTimes[0];
        this.type      = action + (phase || '');

        this.interaction = interaction;
        this.interactable = target;

        var inertiaStatus = interaction.inertiaStatus;

        if (inertiaStatus.active) {
            this.detail = 'inertia';
        }

        if (related) {
            this.relatedTarget = related;
        }

        // end event dx, dy is difference between start and end points
        if (ending) {
            if (deltaSource === 'client') {
                this.dx = client.x - interaction.startCoords.client.x;
                this.dy = client.y - interaction.startCoords.client.y;
            }
            else {
                this.dx = page.x - interaction.startCoords.page.x;
                this.dy = page.y - interaction.startCoords.page.y;
            }
        }
        else if (starting) {
            this.dx = 0;
            this.dy = 0;
        }
        // copy properties from previousmove if starting inertia
        else if (phase === 'inertiastart') {
            this.dx = interaction.prevEvent.dx;
            this.dy = interaction.prevEvent.dy;
        }
        else {
            if (deltaSource === 'client') {
                this.dx = client.x - interaction.prevEvent.clientX;
                this.dy = client.y - interaction.prevEvent.clientY;
            }
            else {
                this.dx = page.x - interaction.prevEvent.pageX;
                this.dy = page.y - interaction.prevEvent.pageY;
            }
        }
        if (interaction.prevEvent && interaction.prevEvent.detail === 'inertia'
            && !inertiaStatus.active
            && options[action].inertia && options[action].inertia.zeroResumeDelta) {

            inertiaStatus.resumeDx += this.dx;
            inertiaStatus.resumeDy += this.dy;

            this.dx = this.dy = 0;
        }

        if (action === 'resize' && interaction.resizeAxes) {
            if (options.resize.square) {
                if (interaction.resizeAxes === 'y') {
                    this.dx = this.dy;
                }
                else {
                    this.dy = this.dx;
                }
                this.axes = 'xy';
            }
            else {
                this.axes = interaction.resizeAxes;

                if (interaction.resizeAxes === 'x') {
                    this.dy = 0;
                }
                else if (interaction.resizeAxes === 'y') {
                    this.dx = 0;
                }
            }
        }
        else if (action === 'gesture') {
            this.touches = [pointers[0], pointers[1]];

            if (starting) {
                this.distance = touchDistance(pointers, deltaSource);
                this.box      = touchBBox(pointers);
                this.scale    = 1;
                this.ds       = 0;
                this.angle    = touchAngle(pointers, undefined, deltaSource);
                this.da       = 0;
            }
            else if (ending || event instanceof InteractEvent) {
                this.distance = interaction.prevEvent.distance;
                this.box      = interaction.prevEvent.box;
                this.scale    = interaction.prevEvent.scale;
                this.ds       = this.scale - 1;
                this.angle    = interaction.prevEvent.angle;
                this.da       = this.angle - interaction.gesture.startAngle;
            }
            else {
                this.distance = touchDistance(pointers, deltaSource);
                this.box      = touchBBox(pointers);
                this.scale    = this.distance / interaction.gesture.startDistance;
                this.angle    = touchAngle(pointers, interaction.gesture.prevAngle, deltaSource);

                this.ds = this.scale - interaction.gesture.prevScale;
                this.da = this.angle - interaction.gesture.prevAngle;
            }
        }

        if (starting) {
            this.timeStamp = interaction.downTimes[0];
            this.dt        = 0;
            this.duration  = 0;
            this.speed     = 0;
            this.velocityX = 0;
            this.velocityY = 0;
        }
        else if (phase === 'inertiastart') {
            this.timeStamp = interaction.prevEvent.timeStamp;
            this.dt        = interaction.prevEvent.dt;
            this.duration  = interaction.prevEvent.duration;
            this.speed     = interaction.prevEvent.speed;
            this.velocityX = interaction.prevEvent.velocityX;
            this.velocityY = interaction.prevEvent.velocityY;
        }
        else {
            this.timeStamp = new Date().getTime();
            this.dt        = this.timeStamp - interaction.prevEvent.timeStamp;
            this.duration  = this.timeStamp - interaction.downTimes[0];

            if (event instanceof InteractEvent) {
                var dx = this[sourceX] - interaction.prevEvent[sourceX],
                    dy = this[sourceY] - interaction.prevEvent[sourceY],
                    dt = this.dt / 1000;

                this.speed = hypot(dx, dy) / dt;
                this.velocityX = dx / dt;
                this.velocityY = dy / dt;
            }
            // if normal move or end event, use previous user event coords
            else {
                // speed and velocity in pixels per second
                this.speed = interaction.pointerDelta[deltaSource].speed;
                this.velocityX = interaction.pointerDelta[deltaSource].vx;
                this.velocityY = interaction.pointerDelta[deltaSource].vy;
            }
        }

        if ((ending || phase === 'inertiastart')
            && interaction.prevEvent.speed > 600 && this.timeStamp - interaction.prevEvent.timeStamp < 150) {

            var angle = 180 * Math.atan2(interaction.prevEvent.velocityY, interaction.prevEvent.velocityX) / Math.PI,
                overlap = 22.5;

            if (angle < 0) {
                angle += 360;
            }

            var left = 135 - overlap <= angle && angle < 225 + overlap,
                up   = 225 - overlap <= angle && angle < 315 + overlap,

                right = !left && (315 - overlap <= angle || angle <  45 + overlap),
                down  = !up   &&   45 - overlap <= angle && angle < 135 + overlap;

            this.swipe = {
                up   : up,
                down : down,
                left : left,
                right: right,
                angle: angle,
                speed: interaction.prevEvent.speed,
                velocity: {
                    x: interaction.prevEvent.velocityX,
                    y: interaction.prevEvent.velocityY
                }
            };
        }
    }

    InteractEvent.prototype = {
        preventDefault: blank,
        stopImmediatePropagation: function () {
            this.immediatePropagationStopped = this.propagationStopped = true;
        },
        stopPropagation: function () {
            this.propagationStopped = true;
        }
    };

    function preventOriginalDefault () {
        this.originalEvent.preventDefault();
    }

    function getActionCursor (action) {
        var cursor = '';

        if (action.name === 'drag') {
            cursor =  actionCursors.drag;
        }
        if (action.name === 'resize') {
            if (action.axis) {
                cursor =  actionCursors[action.name + action.axis];
            }
            else if (action.edges) {
                var cursorKey = 'resize',
                    edgeNames = ['top', 'bottom', 'left', 'right'];

                for (var i = 0; i < 4; i++) {
                    if (action.edges[edgeNames[i]]) {
                        cursorKey += edgeNames[i];
                    }
                }

                cursor = actionCursors[cursorKey];
            }
        }

        return cursor;
    }

    function checkResizeEdge (name, value, page, element, interactableElement, rect, margin) {
        // false, '', undefined, null
        if (!value) { return false; }

        // true value, use pointer coords and element rect
        if (value === true) {
            // if dimensions are negative, "switch" edges
            var width = isNumber(rect.width)? rect.width : rect.right - rect.left,
                height = isNumber(rect.height)? rect.height : rect.bottom - rect.top;

            if (width < 0) {
                if      (name === 'left' ) { name = 'right'; }
                else if (name === 'right') { name = 'left' ; }
            }
            if (height < 0) {
                if      (name === 'top'   ) { name = 'bottom'; }
                else if (name === 'bottom') { name = 'top'   ; }
            }

            if (name === 'left'  ) { return page.x < ((width  >= 0? rect.left: rect.right ) + margin); }
            if (name === 'top'   ) { return page.y < ((height >= 0? rect.top : rect.bottom) + margin); }

            if (name === 'right' ) { return page.x > ((width  >= 0? rect.right : rect.left) - margin); }
            if (name === 'bottom') { return page.y > ((height >= 0? rect.bottom: rect.top ) - margin); }
        }

        // the remaining checks require an element
        if (!isElement(element)) { return false; }

        return isElement(value)
                    // the value is an element to use as a resize handle
                    ? value === element
                    // otherwise check if element matches value as selector
                    : matchesUpTo(element, value, interactableElement);
    }

    function defaultActionChecker (pointer, interaction, element) {
        var rect = this.getRect(element),
            shouldResize = false,
            action = null,
            resizeAxes = null,
            resizeEdges,
            page = extend({}, interaction.curCoords.page),
            options = this.options;

        if (!rect) { return null; }

        if (actionIsEnabled.resize && options.resize.enabled) {
            var resizeOptions = options.resize;

            resizeEdges = {
                left: false, right: false, top: false, bottom: false
            };

            // if using resize.edges
            if (isObject(resizeOptions.edges)) {
                for (var edge in resizeEdges) {
                    resizeEdges[edge] = checkResizeEdge(edge,
                                                        resizeOptions.edges[edge],
                                                        page,
                                                        interaction._eventTarget,
                                                        element,
                                                        rect,
                                                        resizeOptions.margin || margin);
                }

                resizeEdges.left = resizeEdges.left && !resizeEdges.right;
                resizeEdges.top  = resizeEdges.top  && !resizeEdges.bottom;

                shouldResize = resizeEdges.left || resizeEdges.right || resizeEdges.top || resizeEdges.bottom;
            }
            else {
                var right  = options.resize.axis !== 'y' && page.x > (rect.right  - margin),
                    bottom = options.resize.axis !== 'x' && page.y > (rect.bottom - margin);

                shouldResize = right || bottom;
                resizeAxes = (right? 'x' : '') + (bottom? 'y' : '');
            }
        }

        action = shouldResize
            ? 'resize'
            : actionIsEnabled.drag && options.drag.enabled
                ? 'drag'
                : null;

        if (actionIsEnabled.gesture
            && interaction.pointerIds.length >=2
            && !(interaction.dragging || interaction.resizing)) {
            action = 'gesture';
        }

        if (action) {
            return {
                name: action,
                axis: resizeAxes,
                edges: resizeEdges
            };
        }

        return null;
    }

    // Check if action is enabled globally and the current target supports it
    // If so, return the validated action. Otherwise, return null
    function validateAction (action, interactable) {
        if (!isObject(action)) { return null; }

        var actionName = action.name,
            options = interactable.options;

        if ((  (actionName  === 'resize'   && options.resize.enabled )
            || (actionName      === 'drag'     && options.drag.enabled  )
            || (actionName      === 'gesture'  && options.gesture.enabled))
            && actionIsEnabled[actionName]) {

            if (actionName === 'resize' || actionName === 'resizeyx') {
                actionName = 'resizexy';
            }

            return action;
        }
        return null;
    }

    var listeners = {},
        interactionListeners = [
            'dragStart', 'dragMove', 'resizeStart', 'resizeMove', 'gestureStart', 'gestureMove',
            'pointerOver', 'pointerOut', 'pointerHover', 'selectorDown',
            'pointerDown', 'pointerMove', 'pointerUp', 'pointerCancel', 'pointerEnd',
            'addPointer', 'removePointer', 'recordPointer', 'autoScrollMove'
        ];

    for (var i = 0, len = interactionListeners.length; i < len; i++) {
        var name = interactionListeners[i];

        listeners[name] = doOnInteractions(name);
    }

    // bound to the interactable context when a DOM event
    // listener is added to a selector interactable
    function delegateListener (event, useCapture) {
        var fakeEvent = {},
            delegated = delegatedEvents[event.type],
            eventTarget = getActualElement(event.path
                                           ? event.path[0]
                                           : event.target),
            element = eventTarget;

        useCapture = useCapture? true: false;

        // duplicate the event so that currentTarget can be changed
        for (var prop in event) {
            fakeEvent[prop] = event[prop];
        }

        fakeEvent.originalEvent = event;
        fakeEvent.preventDefault = preventOriginalDefault;

        // climb up document tree looking for selector matches
        while (isElement(element)) {
            for (var i = 0; i < delegated.selectors.length; i++) {
                var selector = delegated.selectors[i],
                    context = delegated.contexts[i];

                if (matchesSelector(element, selector)
                    && nodeContains(context, eventTarget)
                    && nodeContains(context, element)) {

                    var listeners = delegated.listeners[i];

                    fakeEvent.currentTarget = element;

                    for (var j = 0; j < listeners.length; j++) {
                        if (listeners[j][1] === useCapture) {
                            listeners[j][0](fakeEvent);
                        }
                    }
                }
            }

            element = parentElement(element);
        }
    }

    function delegateUseCapture (event) {
        return delegateListener.call(this, event, true);
    }

    interactables.indexOfElement = function indexOfElement (element, context) {
        context = context || document;

        for (var i = 0; i < this.length; i++) {
            var interactable = this[i];

            if ((interactable.selector === element
                && (interactable._context === context))
                || (!interactable.selector && interactable._element === element)) {

                return i;
            }
        }
        return -1;
    };

    interactables.get = function interactableGet (element, options) {
        return this[this.indexOfElement(element, options && options.context)];
    };

    interactables.forEachSelector = function (callback) {
        for (var i = 0; i < this.length; i++) {
            var interactable = this[i];

            if (!interactable.selector) {
                continue;
            }

            var ret = callback(interactable, interactable.selector, interactable._context, i, this);

            if (ret !== undefined) {
                return ret;
            }
        }
    };

    /*\
     * interact
     [ method ]
     *
     * The methods of this variable can be used to set elements as
     * interactables and also to change various default settings.
     *
     * Calling it as a function and passing an element or a valid CSS selector
     * string returns an Interactable object which has various methods to
     * configure it.
     *
     - element (Element | string) The HTML or SVG Element to interact with or CSS selector
     = (object) An @Interactable
     *
     > Usage
     | interact(document.getElementById('draggable')).draggable(true);
     |
     | var rectables = interact('rect');
     | rectables
     |     .gesturable(true)
     |     .on('gesturemove', function (event) {
     |         // something cool...
     |     })
     |     .autoScroll(true);
    \*/
    function interact (element, options) {
        return interactables.get(element, options) || new Interactable(element, options);
    }

    /*\
     * Interactable
     [ property ]
     **
     * Object type returned by @interact
    \*/
    function Interactable (element, options) {
        this._element = element;
        this._iEvents = this._iEvents || {};

        var _window;

        if (trySelector(element)) {
            this.selector = element;

            var context = options && options.context;

            _window = context? getWindow(context) : window;

            if (context && (_window.Node
                    ? context instanceof _window.Node
                    : (isElement(context) || context === _window.document))) {

                this._context = context;
            }
        }
        else {
            _window = getWindow(element);

            if (isElement(element, _window)) {

                if (supportsPointerEvent) {
                    events.add(this._element, pEventTypes.down, listeners.pointerDown );
                    events.add(this._element, pEventTypes.move, listeners.pointerHover);
                }
                else {
                    events.add(this._element, 'mousedown' , listeners.pointerDown );
                    events.add(this._element, 'mousemove' , listeners.pointerHover);
                    events.add(this._element, 'touchstart', listeners.pointerDown );
                    events.add(this._element, 'touchmove' , listeners.pointerHover);
                }
            }
        }

        this._doc = _window.document;

        if (!contains(documents, this._doc)) {
            listenToDocument(this._doc);
        }

        interactables.push(this);

        this.set(options);
    }

    Interactable.prototype = {
        setOnEvents: function (action, phases) {
            if (action === 'drop') {
                if (isFunction(phases.ondrop)          ) { this.ondrop           = phases.ondrop          ; }
                if (isFunction(phases.ondropactivate)  ) { this.ondropactivate   = phases.ondropactivate  ; }
                if (isFunction(phases.ondropdeactivate)) { this.ondropdeactivate = phases.ondropdeactivate; }
                if (isFunction(phases.ondragenter)     ) { this.ondragenter      = phases.ondragenter     ; }
                if (isFunction(phases.ondragleave)     ) { this.ondragleave      = phases.ondragleave     ; }
                if (isFunction(phases.ondropmove)      ) { this.ondropmove       = phases.ondropmove      ; }
            }
            else {
                action = 'on' + action;

                if (isFunction(phases.onstart)       ) { this[action + 'start'         ] = phases.onstart         ; }
                if (isFunction(phases.onmove)        ) { this[action + 'move'          ] = phases.onmove          ; }
                if (isFunction(phases.onend)         ) { this[action + 'end'           ] = phases.onend           ; }
                if (isFunction(phases.oninertiastart)) { this[action + 'inertiastart'  ] = phases.oninertiastart  ; }
            }

            return this;
        },

        /*\
         * Interactable.draggable
         [ method ]
         *
         * Gets or sets whether drag actions can be performed on the
         * Interactable
         *
         = (boolean) Indicates if this can be the target of drag events
         | var isDraggable = interact('ul li').draggable();
         * or
         - options (boolean | object) #optional true/false or An object with event listeners to be fired on drag events (object makes the Interactable draggable)
         = (object) This Interactable
         | interact(element).draggable({
         |     onstart: function (event) {},
         |     onmove : function (event) {},
         |     onend  : function (event) {},
         |
         |     // the axis in which the first movement must be
         |     // for the drag sequence to start
         |     // 'xy' by default - any direction
         |     axis: 'x' || 'y' || 'xy',
         |
         |     // max number of drags that can happen concurrently
         |     // with elements of this Interactable. Infinity by default
         |     max: Infinity,
         |
         |     // max number of drags that can target the same element+Interactable
         |     // 1 by default
         |     maxPerElement: 2
         | });
        \*/
        draggable: function (options) {
            if (isObject(options)) {
                this.options.drag.enabled = options.enabled === false? false: true;
                this.setPerAction('drag', options);
                this.setOnEvents('drag', options);

                if (/^x$|^y$|^xy$/.test(options.axis)) {
                    this.options.drag.axis = options.axis;
                }
                else if (options.axis === null) {
                    delete this.options.drag.axis;
                }

                return this;
            }

            if (isBool(options)) {
                this.options.drag.enabled = options;

                return this;
            }

            return this.options.drag;
        },

        setPerAction: function (action, options) {
            // for all the default per-action options
            for (var option in options) {
                // if this option exists for this action
                if (option in defaultOptions[action]) {
                    // if the option in the options arg is an object value
                    if (isObject(options[option])) {
                        // duplicate the object
                        this.options[action][option] = extend(this.options[action][option] || {}, options[option]);

                        if (isObject(defaultOptions.perAction[option]) && 'enabled' in defaultOptions.perAction[option]) {
                            this.options[action][option].enabled = options[option].enabled === false? false : true;
                        }
                    }
                    else if (isBool(options[option]) && isObject(defaultOptions.perAction[option])) {
                        this.options[action][option].enabled = options[option];
                    }
                    else if (options[option] !== undefined) {
                        // or if it's not undefined, do a plain assignment
                        this.options[action][option] = options[option];
                    }
                }
            }
        },

        /*\
         * Interactable.dropzone
         [ method ]
         *
         * Returns or sets whether elements can be dropped onto this
         * Interactable to trigger drop events
         *
         * Dropzones can receive the following events:
         *  - `dropactivate` and `dropdeactivate` when an acceptable drag starts and ends
         *  - `dragenter` and `dragleave` when a draggable enters and leaves the dropzone
         *  - `dragmove` when a draggable that has entered the dropzone is moved
         *  - `drop` when a draggable is dropped into this dropzone
         *
         *  Use the `accept` option to allow only elements that match the given CSS selector or element.
         *
         *  Use the `overlap` option to set how drops are checked for. The allowed values are:
         *   - `'pointer'`, the pointer must be over the dropzone (default)
         *   - `'center'`, the draggable element's center must be over the dropzone
         *   - a number from 0-1 which is the `(intersection area) / (draggable area)`.
         *       e.g. `0.5` for drop to happen when half of the area of the
         *       draggable is over the dropzone
         *
         - options (boolean | object | null) #optional The new value to be set.
         | interact('.drop').dropzone({
         |   accept: '.can-drop' || document.getElementById('single-drop'),
         |   overlap: 'pointer' || 'center' || zeroToOne
         | }
         = (boolean | object) The current setting or this Interactable
        \*/
        dropzone: function (options) {
            if (isObject(options)) {
                this.options.drop.enabled = options.enabled === false? false: true;
                this.setOnEvents('drop', options);

                if (/^(pointer|center)$/.test(options.overlap)) {
                    this.options.drop.overlap = options.overlap;
                }
                else if (isNumber(options.overlap)) {
                    this.options.drop.overlap = Math.max(Math.min(1, options.overlap), 0);
                }
                if ('accept' in options) {
                  this.options.drop.accept = options.accept;
                }
                if ('checker' in options) {
                  this.options.drop.checker = options.checker;
                }

                return this;
            }

            if (isBool(options)) {
                this.options.drop.enabled = options;

                return this;
            }

            return this.options.drop;
        },

        dropCheck: function (dragEvent, event, draggable, draggableElement, dropElement, rect) {
            var dropped = false;

            // if the dropzone has no rect (eg. display: none)
            // call the custom dropChecker or just return false
            if (!(rect = rect || this.getRect(dropElement))) {
                return (this.options.drop.checker
                    ? this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement)
                    : false);
            }

            var dropOverlap = this.options.drop.overlap;

            if (dropOverlap === 'pointer') {
                var page = getPageXY(dragEvent),
                    origin = getOriginXY(draggable, draggableElement),
                    horizontal,
                    vertical;

                page.x += origin.x;
                page.y += origin.y;

                horizontal = (page.x > rect.left) && (page.x < rect.right);
                vertical   = (page.y > rect.top ) && (page.y < rect.bottom);

                dropped = horizontal && vertical;
            }

            var dragRect = draggable.getRect(draggableElement);

            if (dropOverlap === 'center') {
                var cx = dragRect.left + dragRect.width  / 2,
                    cy = dragRect.top  + dragRect.height / 2;

                dropped = cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
            }

            if (isNumber(dropOverlap)) {
                var overlapArea  = (Math.max(0, Math.min(rect.right , dragRect.right ) - Math.max(rect.left, dragRect.left))
                                  * Math.max(0, Math.min(rect.bottom, dragRect.bottom) - Math.max(rect.top , dragRect.top ))),
                    overlapRatio = overlapArea / (dragRect.width * dragRect.height);

                dropped = overlapRatio >= dropOverlap;
            }

            if (this.options.drop.checker) {
                dropped = this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement);
            }

            return dropped;
        },

        /*\
         * Interactable.dropChecker
         [ method ]
         *
         * DEPRECATED. Use interactable.dropzone({ checker: function... }) instead.
         *
         * Gets or sets the function used to check if a dragged element is
         * over this Interactable.
         *
         - checker (function) #optional The function that will be called when checking for a drop
         = (Function | Interactable) The checker function or this Interactable
         *
         * The checker function takes the following arguments:
         *
         - dragEvent (InteractEvent) The related dragmove or dragend event
         - event (TouchEvent | PointerEvent | MouseEvent) The user move/up/end Event related to the dragEvent
         - dropped (boolean) The value from the default drop checker
         - dropzone (Interactable) The dropzone interactable
         - dropElement (Element) The dropzone element
         - draggable (Interactable) The Interactable being dragged
         - draggableElement (Element) The actual element that's being dragged
         *
         > Usage:
         | interact(target)
         | .dropChecker(function(dragEvent,         // related dragmove or dragend event
         |                       event,             // TouchEvent/PointerEvent/MouseEvent
         |                       dropped,           // bool result of the default checker
         |                       dropzone,          // dropzone Interactable
         |                       dropElement,       // dropzone elemnt
         |                       draggable,         // draggable Interactable
         |                       draggableElement) {// draggable element
         |
         |   return dropped && event.target.hasAttribute('allow-drop');
         | }
        \*/
        dropChecker: function (checker) {
            if (isFunction(checker)) {
                this.options.drop.checker = checker;

                return this;
            }
            if (checker === null) {
                delete this.options.getRect;

                return this;
            }

            return this.options.drop.checker;
        },

        /*\
         * Interactable.accept
         [ method ]
         *
         * Deprecated. add an `accept` property to the options object passed to
         * @Interactable.dropzone instead.
         *
         * Gets or sets the Element or CSS selector match that this
         * Interactable accepts if it is a dropzone.
         *
         - newValue (Element | string | null) #optional
         * If it is an Element, then only that element can be dropped into this dropzone.
         * If it is a string, the element being dragged must match it as a selector.
         * If it is null, the accept options is cleared - it accepts any element.
         *
         = (string | Element | null | Interactable) The current accept option if given `undefined` or this Interactable
        \*/
        accept: function (newValue) {
            if (isElement(newValue)) {
                this.options.drop.accept = newValue;

                return this;
            }

            // test if it is a valid CSS selector
            if (trySelector(newValue)) {
                this.options.drop.accept = newValue;

                return this;
            }

            if (newValue === null) {
                delete this.options.drop.accept;

                return this;
            }

            return this.options.drop.accept;
        },

        /*\
         * Interactable.resizable
         [ method ]
         *
         * Gets or sets whether resize actions can be performed on the
         * Interactable
         *
         = (boolean) Indicates if this can be the target of resize elements
         | var isResizeable = interact('input[type=text]').resizable();
         * or
         - options (boolean | object) #optional true/false or An object with event listeners to be fired on resize events (object makes the Interactable resizable)
         = (object) This Interactable
         | interact(element).resizable({
         |     onstart: function (event) {},
         |     onmove : function (event) {},
         |     onend  : function (event) {},
         |
         |     edges: {
         |       top   : true,       // Use pointer coords to check for resize.
         |       left  : false,      // Disable resizing from left edge.
         |       bottom: '.resize-s',// Resize if pointer target matches selector
         |       right : handleEl    // Resize if pointer target is the given Element
         |     },
         |
         |     // Width and height can be adjusted independently. When `true`, width and
         |     // height are adjusted at a 1:1 ratio.
         |     square: false,
         |
         |     // Width and height can be adjusted independently. When `true`, width and
         |     // height maintain the aspect ratio they had when resizing started.
         |     preserveAspectRatio: false,
         |
         |     // a value of 'none' will limit the resize rect to a minimum of 0x0
         |     // 'negate' will allow the rect to have negative width/height
         |     // 'reposition' will keep the width/height positive by swapping
         |     // the top and bottom edges and/or swapping the left and right edges
         |     invert: 'none' || 'negate' || 'reposition'
         |
         |     // limit multiple resizes.
         |     // See the explanation in the @Interactable.draggable example
         |     max: Infinity,
         |     maxPerElement: 1,
         | });
        \*/
        resizable: function (options) {
            if (isObject(options)) {
                this.options.resize.enabled = options.enabled === false? false: true;
                this.setPerAction('resize', options);
                this.setOnEvents('resize', options);

                if (/^x$|^y$|^xy$/.test(options.axis)) {
                    this.options.resize.axis = options.axis;
                }
                else if (options.axis === null) {
                    this.options.resize.axis = defaultOptions.resize.axis;
                }

                if (isBool(options.preserveAspectRatio)) {
                    this.options.resize.preserveAspectRatio = options.preserveAspectRatio;
                }
                else if (isBool(options.square)) {
                    this.options.resize.square = options.square;
                }

                return this;
            }
            if (isBool(options)) {
                this.options.resize.enabled = options;

                return this;
            }
            return this.options.resize;
        },

        /*\
         * Interactable.squareResize
         [ method ]
         *
         * Deprecated. Add a `square: true || false` property to @Interactable.resizable instead
         *
         * Gets or sets whether resizing is forced 1:1 aspect
         *
         = (boolean) Current setting
         *
         * or
         *
         - newValue (boolean) #optional
         = (object) this Interactable
        \*/
        squareResize: function (newValue) {
            if (isBool(newValue)) {
                this.options.resize.square = newValue;

                return this;
            }

            if (newValue === null) {
                delete this.options.resize.square;

                return this;
            }

            return this.options.resize.square;
        },

        /*\
         * Interactable.gesturable
         [ method ]
         *
         * Gets or sets whether multitouch gestures can be performed on the
         * Interactable's element
         *
         = (boolean) Indicates if this can be the target of gesture events
         | var isGestureable = interact(element).gesturable();
         * or
         - options (boolean | object) #optional true/false or An object with event listeners to be fired on gesture events (makes the Interactable gesturable)
         = (object) this Interactable
         | interact(element).gesturable({
         |     onstart: function (event) {},
         |     onmove : function (event) {},
         |     onend  : function (event) {},
         |
         |     // limit multiple gestures.
         |     // See the explanation in @Interactable.draggable example
         |     max: Infinity,
         |     maxPerElement: 1,
         | });
        \*/
        gesturable: function (options) {
            if (isObject(options)) {
                this.options.gesture.enabled = options.enabled === false? false: true;
                this.setPerAction('gesture', options);
                this.setOnEvents('gesture', options);

                return this;
            }

            if (isBool(options)) {
                this.options.gesture.enabled = options;

                return this;
            }

            return this.options.gesture;
        },

        /*\
         * Interactable.autoScroll
         [ method ]
         **
         * Deprecated. Add an `autoscroll` property to the options object
         * passed to @Interactable.draggable or @Interactable.resizable instead.
         *
         * Returns or sets whether dragging and resizing near the edges of the
         * window/container trigger autoScroll for this Interactable
         *
         = (object) Object with autoScroll properties
         *
         * or
         *
         - options (object | boolean) #optional
         * options can be:
         * - an object with margin, distance and interval properties,
         * - true or false to enable or disable autoScroll or
         = (Interactable) this Interactable
        \*/
        autoScroll: function (options) {
            if (isObject(options)) {
                options = extend({ actions: ['drag', 'resize']}, options);
            }
            else if (isBool(options)) {
                options = { actions: ['drag', 'resize'], enabled: options };
            }

            return this.setOptions('autoScroll', options);
        },

        /*\
         * Interactable.snap
         [ method ]
         **
         * Deprecated. Add a `snap` property to the options object passed
         * to @Interactable.draggable or @Interactable.resizable instead.
         *
         * Returns or sets if and how action coordinates are snapped. By
         * default, snapping is relative to the pointer coordinates. You can
         * change this by setting the
         * [`elementOrigin`](https://github.com/taye/interact.js/pull/72).
         **
         = (boolean | object) `false` if snap is disabled; object with snap properties if snap is enabled
         **
         * or
         **
         - options (object | boolean | null) #optional
         = (Interactable) this Interactable
         > Usage
         | interact(document.querySelector('#thing')).snap({
         |     targets: [
         |         // snap to this specific point
         |         {
         |             x: 100,
         |             y: 100,
         |             range: 25
         |         },
         |         // give this function the x and y page coords and snap to the object returned
         |         function (x, y) {
         |             return {
         |                 x: x,
         |                 y: (75 + 50 * Math.sin(x * 0.04)),
         |                 range: 40
         |             };
         |         },
         |         // create a function that snaps to a grid
         |         interact.createSnapGrid({
         |             x: 50,
         |             y: 50,
         |             range: 10,              // optional
         |             offset: { x: 5, y: 10 } // optional
         |         })
         |     ],
         |     // do not snap during normal movement.
         |     // Instead, trigger only one snapped move event
         |     // immediately before the end event.
         |     endOnly: true,
         |
         |     relativePoints: [
         |         { x: 0, y: 0 },  // snap relative to the top left of the element
         |         { x: 1, y: 1 },  // and also to the bottom right
         |     ],  
         |
         |     // offset the snap target coordinates
         |     // can be an object with x/y or 'startCoords'
         |     offset: { x: 50, y: 50 }
         |   }
         | });
        \*/
        snap: function (options) {
            var ret = this.setOptions('snap', options);

            if (ret === this) { return this; }

            return ret.drag;
        },

        setOptions: function (option, options) {
            var actions = options && isArray(options.actions)
                    ? options.actions
                    : ['drag'];

            var i;

            if (isObject(options) || isBool(options)) {
                for (i = 0; i < actions.length; i++) {
                    var action = /resize/.test(actions[i])? 'resize' : actions[i];

                    if (!isObject(this.options[action])) { continue; }

                    var thisOption = this.options[action][option];

                    if (isObject(options)) {
                        extend(thisOption, options);
                        thisOption.enabled = options.enabled === false? false: true;

                        if (option === 'snap') {
                            if (thisOption.mode === 'grid') {
                                thisOption.targets = [
                                    interact.createSnapGrid(extend({
                                        offset: thisOption.gridOffset || { x: 0, y: 0 }
                                    }, thisOption.grid || {}))
                                ];
                            }
                            else if (thisOption.mode === 'anchor') {
                                thisOption.targets = thisOption.anchors;
                            }
                            else if (thisOption.mode === 'path') {
                                thisOption.targets = thisOption.paths;
                            }

                            if ('elementOrigin' in options) {
                                thisOption.relativePoints = [options.elementOrigin];
                            }
                        }
                    }
                    else if (isBool(options)) {
                        thisOption.enabled = options;
                    }
                }

                return this;
            }

            var ret = {},
                allActions = ['drag', 'resize', 'gesture'];

            for (i = 0; i < allActions.length; i++) {
                if (option in defaultOptions[allActions[i]]) {
                    ret[allActions[i]] = this.options[allActions[i]][option];
                }
            }

            return ret;
        },


        /*\
         * Interactable.inertia
         [ method ]
         **
         * Deprecated. Add an `inertia` property to the options object passed
         * to @Interactable.draggable or @Interactable.resizable instead.
         *
         * Returns or sets if and how events continue to run after the pointer is released
         **
         = (boolean | object) `false` if inertia is disabled; `object` with inertia properties if inertia is enabled
         **
         * or
         **
         - options (object | boolean | null) #optional
         = (Interactable) this Interactable
         > Usage
         | // enable and use default settings
         | interact(element).inertia(true);
         |
         | // enable and use custom settings
         | interact(element).inertia({
         |     // value greater than 0
         |     // high values slow the object down more quickly
         |     resistance     : 16,
         |
         |     // the minimum launch speed (pixels per second) that results in inertia start
         |     minSpeed       : 200,
         |
         |     // inertia will stop when the object slows down to this speed
         |     endSpeed       : 20,
         |
         |     // boolean; should actions be resumed when the pointer goes down during inertia
         |     allowResume    : true,
         |
         |     // boolean; should the jump when resuming from inertia be ignored in event.dx/dy
         |     zeroResumeDelta: false,
         |
         |     // if snap/restrict are set to be endOnly and inertia is enabled, releasing
         |     // the pointer without triggering inertia will animate from the release
         |     // point to the snaped/restricted point in the given amount of time (ms)
         |     smoothEndDuration: 300,
         |
         |     // an array of action types that can have inertia (no gesture)
         |     actions        : ['drag', 'resize']
         | });
         |
         | // reset custom settings and use all defaults
         | interact(element).inertia(null);
        \*/
        inertia: function (options) {
            var ret = this.setOptions('inertia', options);

            if (ret === this) { return this; }

            return ret.drag;
        },

        getAction: function (pointer, event, interaction, element) {
            var action = this.defaultActionChecker(pointer, interaction, element);

            if (this.options.actionChecker) {
                return this.options.actionChecker(pointer, event, action, this, element, interaction);
            }

            return action;
        },

        defaultActionChecker: defaultActionChecker,

        /*\
         * Interactable.actionChecker
         [ method ]
         *
         * Gets or sets the function used to check action to be performed on
         * pointerDown
         *
         - checker (function | null) #optional A function which takes a pointer event, defaultAction string, interactable, element and interaction as parameters and returns an object with name property 'drag' 'resize' or 'gesture' and optionally an `edges` object with boolean 'top', 'left', 'bottom' and right props.
         = (Function | Interactable) The checker function or this Interactable
         *
         | interact('.resize-drag')
         |   .resizable(true)
         |   .draggable(true)
         |   .actionChecker(function (pointer, event, action, interactable, element, interaction) {
         |
         |   if (interact.matchesSelector(event.target, '.drag-handle') {
         |     // force drag with handle target
         |     action.name = drag;
         |   }
         |   else {
         |     // resize from the top and right edges
         |     action.name  = 'resize';
         |     action.edges = { top: true, right: true };
         |   }
         |
         |   return action;
         | });
        \*/
        actionChecker: function (checker) {
            if (isFunction(checker)) {
                this.options.actionChecker = checker;

                return this;
            }

            if (checker === null) {
                delete this.options.actionChecker;

                return this;
            }

            return this.options.actionChecker;
        },

        /*\
         * Interactable.getRect
         [ method ]
         *
         * The default function to get an Interactables bounding rect. Can be
         * overridden using @Interactable.rectChecker.
         *
         - element (Element) #optional The element to measure.
         = (object) The object's bounding rectangle.
         o {
         o     top   : 0,
         o     left  : 0,
         o     bottom: 0,
         o     right : 0,
         o     width : 0,
         o     height: 0
         o }
        \*/
        getRect: function rectCheck (element) {
            element = element || this._element;

            if (this.selector && !(isElement(element))) {
                element = this._context.querySelector(this.selector);
            }

            return getElementRect(element);
        },

        /*\
         * Interactable.rectChecker
         [ method ]
         *
         * Returns or sets the function used to calculate the interactable's
         * element's rectangle
         *
         - checker (function) #optional A function which returns this Interactable's bounding rectangle. See @Interactable.getRect
         = (function | object) The checker function or this Interactable
        \*/
        rectChecker: function (checker) {
            if (isFunction(checker)) {
                this.getRect = checker;

                return this;
            }

            if (checker === null) {
                delete this.options.getRect;

                return this;
            }

            return this.getRect;
        },

        /*\
         * Interactable.styleCursor
         [ method ]
         *
         * Returns or sets whether the action that would be performed when the
         * mouse on the element are checked on `mousemove` so that the cursor
         * may be styled appropriately
         *
         - newValue (boolean) #optional
         = (boolean | Interactable) The current setting or this Interactable
        \*/
        styleCursor: function (newValue) {
            if (isBool(newValue)) {
                this.options.styleCursor = newValue;

                return this;
            }

            if (newValue === null) {
                delete this.options.styleCursor;

                return this;
            }

            return this.options.styleCursor;
        },

        /*\
         * Interactable.preventDefault
         [ method ]
         *
         * Returns or sets whether to prevent the browser's default behaviour
         * in response to pointer events. Can be set to:
         *  - `'always'` to always prevent
         *  - `'never'` to never prevent
         *  - `'auto'` to let interact.js try to determine what would be best
         *
         - newValue (string) #optional `true`, `false` or `'auto'`
         = (string | Interactable) The current setting or this Interactable
        \*/
        preventDefault: function (newValue) {
            if (/^(always|never|auto)$/.test(newValue)) {
                this.options.preventDefault = newValue;
                return this;
            }

            if (isBool(newValue)) {
                this.options.preventDefault = newValue? 'always' : 'never';
                return this;
            }

            return this.options.preventDefault;
        },

        /*\
         * Interactable.origin
         [ method ]
         *
         * Gets or sets the origin of the Interactable's element.  The x and y
         * of the origin will be subtracted from action event coordinates.
         *
         - origin (object | string) #optional An object eg. { x: 0, y: 0 } or string 'parent', 'self' or any CSS selector
         * OR
         - origin (Element) #optional An HTML or SVG Element whose rect will be used
         **
         = (object) The current origin or this Interactable
        \*/
        origin: function (newValue) {
            if (trySelector(newValue)) {
                this.options.origin = newValue;
                return this;
            }
            else if (isObject(newValue)) {
                this.options.origin = newValue;
                return this;
            }

            return this.options.origin;
        },

        /*\
         * Interactable.deltaSource
         [ method ]
         *
         * Returns or sets the mouse coordinate types used to calculate the
         * movement of the pointer.
         *
         - newValue (string) #optional Use 'client' if you will be scrolling while interacting; Use 'page' if you want autoScroll to work
         = (string | object) The current deltaSource or this Interactable
        \*/
        deltaSource: function (newValue) {
            if (newValue === 'page' || newValue === 'client') {
                this.options.deltaSource = newValue;

                return this;
            }

            return this.options.deltaSource;
        },

        /*\
         * Interactable.restrict
         [ method ]
         **
         * Deprecated. Add a `restrict` property to the options object passed to
         * @Interactable.draggable, @Interactable.resizable or @Interactable.gesturable instead.
         *
         * Returns or sets the rectangles within which actions on this
         * interactable (after snap calculations) are restricted. By default,
         * restricting is relative to the pointer coordinates. You can change
         * this by setting the
         * [`elementRect`](https://github.com/taye/interact.js/pull/72).
         **
         - options (object) #optional an object with keys drag, resize, and/or gesture whose values are rects, Elements, CSS selectors, or 'parent' or 'self'
         = (object) The current restrictions object or this Interactable
         **
         | interact(element).restrict({
         |     // the rect will be `interact.getElementRect(element.parentNode)`
         |     drag: element.parentNode,
         |
         |     // x and y are relative to the the interactable's origin
         |     resize: { x: 100, y: 100, width: 200, height: 200 }
         | })
         |
         | interact('.draggable').restrict({
         |     // the rect will be the selected element's parent
         |     drag: 'parent',
         |
         |     // do not restrict during normal movement.
         |     // Instead, trigger only one restricted move event
         |     // immediately before the end event.
         |     endOnly: true,
         |
         |     // https://github.com/taye/interact.js/pull/72#issue-41813493
         |     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
         | });
        \*/
        restrict: function (options) {
            if (!isObject(options)) {
                return this.setOptions('restrict', options);
            }

            var actions = ['drag', 'resize', 'gesture'],
                ret;

            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];

                if (action in options) {
                    var perAction = extend({
                            actions: [action],
                            restriction: options[action]
                        }, options);

                    ret = this.setOptions('restrict', perAction);
                }
            }

            return ret;
        },

        /*\
         * Interactable.context
         [ method ]
         *
         * Gets the selector context Node of the Interactable. The default is `window.document`.
         *
         = (Node) The context Node of this Interactable
         **
        \*/
        context: function () {
            return this._context;
        },

        _context: document,

        /*\
         * Interactable.ignoreFrom
         [ method ]
         *
         * If the target of the `mousedown`, `pointerdown` or `touchstart`
         * event or any of it's parents match the given CSS selector or
         * Element, no drag/resize/gesture is started.
         *
         - newValue (string | Element | null) #optional a CSS selector string, an Element or `null` to not ignore any elements
         = (string | Element | object) The current ignoreFrom value or this Interactable
         **
         | interact(element, { ignoreFrom: document.getElementById('no-action') });
         | // or
         | interact(element).ignoreFrom('input, textarea, a');
        \*/
        ignoreFrom: function (newValue) {
            if (trySelector(newValue)) {            // CSS selector to match event.target
                this.options.ignoreFrom = newValue;
                return this;
            }

            if (isElement(newValue)) {              // specific element
                this.options.ignoreFrom = newValue;
                return this;
            }

            return this.options.ignoreFrom;
        },

        /*\
         * Interactable.allowFrom
         [ method ]
         *
         * A drag/resize/gesture is started only If the target of the
         * `mousedown`, `pointerdown` or `touchstart` event or any of it's
         * parents match the given CSS selector or Element.
         *
         - newValue (string | Element | null) #optional a CSS selector string, an Element or `null` to allow from any element
         = (string | Element | object) The current allowFrom value or this Interactable
         **
         | interact(element, { allowFrom: document.getElementById('drag-handle') });
         | // or
         | interact(element).allowFrom('.handle');
        \*/
        allowFrom: function (newValue) {
            if (trySelector(newValue)) {            // CSS selector to match event.target
                this.options.allowFrom = newValue;
                return this;
            }

            if (isElement(newValue)) {              // specific element
                this.options.allowFrom = newValue;
                return this;
            }

            return this.options.allowFrom;
        },

        /*\
         * Interactable.element
         [ method ]
         *
         * If this is not a selector Interactable, it returns the element this
         * interactable represents
         *
         = (Element) HTML / SVG Element
        \*/
        element: function () {
            return this._element;
        },

        /*\
         * Interactable.fire
         [ method ]
         *
         * Calls listeners for the given InteractEvent type bound globally
         * and directly to this Interactable
         *
         - iEvent (InteractEvent) The InteractEvent object to be fired on this Interactable
         = (Interactable) this Interactable
        \*/
        fire: function (iEvent) {
            if (!(iEvent && iEvent.type) || !contains(eventTypes, iEvent.type)) {
                return this;
            }

            var listeners,
                i,
                len,
                onEvent = 'on' + iEvent.type,
                funcName = '';

            // Interactable#on() listeners
            if (iEvent.type in this._iEvents) {
                listeners = this._iEvents[iEvent.type];

                for (i = 0, len = listeners.length; i < len && !iEvent.immediatePropagationStopped; i++) {
                    funcName = listeners[i].name;
                    listeners[i](iEvent);
                }
            }

            // interactable.onevent listener
            if (isFunction(this[onEvent])) {
                funcName = this[onEvent].name;
                this[onEvent](iEvent);
            }

            // interact.on() listeners
            if (iEvent.type in globalEvents && (listeners = globalEvents[iEvent.type]))  {

                for (i = 0, len = listeners.length; i < len && !iEvent.immediatePropagationStopped; i++) {
                    funcName = listeners[i].name;
                    listeners[i](iEvent);
                }
            }

            return this;
        },

        /*\
         * Interactable.on
         [ method ]
         *
         * Binds a listener for an InteractEvent or DOM event.
         *
         - eventType  (string | array | object) The types of events to listen for
         - listener   (function) The function to be called on the given event(s)
         - useCapture (boolean) #optional useCapture flag for addEventListener
         = (object) This Interactable
        \*/
        on: function (eventType, listener, useCapture) {
            var i;

            if (isString(eventType) && eventType.search(' ') !== -1) {
                eventType = eventType.trim().split(/ +/);
            }

            if (isArray(eventType)) {
                for (i = 0; i < eventType.length; i++) {
                    this.on(eventType[i], listener, useCapture);
                }

                return this;
            }

            if (isObject(eventType)) {
                for (var prop in eventType) {
                    this.on(prop, eventType[prop], listener);
                }

                return this;
            }

            if (eventType === 'wheel') {
                eventType = wheelEvent;
            }

            // convert to boolean
            useCapture = useCapture? true: false;

            if (contains(eventTypes, eventType)) {
                // if this type of event was never bound to this Interactable
                if (!(eventType in this._iEvents)) {
                    this._iEvents[eventType] = [listener];
                }
                else {
                    this._iEvents[eventType].push(listener);
                }
            }
            // delegated event for selector
            else if (this.selector) {
                if (!delegatedEvents[eventType]) {
                    delegatedEvents[eventType] = {
                        selectors: [],
                        contexts : [],
                        listeners: []
                    };

                    // add delegate listener functions
                    for (i = 0; i < documents.length; i++) {
                        events.add(documents[i], eventType, delegateListener);
                        events.add(documents[i], eventType, delegateUseCapture, true);
                    }
                }

                var delegated = delegatedEvents[eventType],
                    index;

                for (index = delegated.selectors.length - 1; index >= 0; index--) {
                    if (delegated.selectors[index] === this.selector
                        && delegated.contexts[index] === this._context) {
                        break;
                    }
                }

                if (index === -1) {
                    index = delegated.selectors.length;

                    delegated.selectors.push(this.selector);
                    delegated.contexts .push(this._context);
                    delegated.listeners.push([]);
                }

                // keep listener and useCapture flag
                delegated.listeners[index].push([listener, useCapture]);
            }
            else {
                events.add(this._element, eventType, listener, useCapture);
            }

            return this;
        },

        /*\
         * Interactable.off
         [ method ]
         *
         * Removes an InteractEvent or DOM event listener
         *
         - eventType  (string | array | object) The types of events that were listened for
         - listener   (function) The listener function to be removed
         - useCapture (boolean) #optional useCapture flag for removeEventListener
         = (object) This Interactable
        \*/
        off: function (eventType, listener, useCapture) {
            var i;

            if (isString(eventType) && eventType.search(' ') !== -1) {
                eventType = eventType.trim().split(/ +/);
            }

            if (isArray(eventType)) {
                for (i = 0; i < eventType.length; i++) {
                    this.off(eventType[i], listener, useCapture);
                }

                return this;
            }

            if (isObject(eventType)) {
                for (var prop in eventType) {
                    this.off(prop, eventType[prop], listener);
                }

                return this;
            }

            var eventList,
                index = -1;

            // convert to boolean
            useCapture = useCapture? true: false;

            if (eventType === 'wheel') {
                eventType = wheelEvent;
            }

            // if it is an action event type
            if (contains(eventTypes, eventType)) {
                eventList = this._iEvents[eventType];

                if (eventList && (index = indexOf(eventList, listener)) !== -1) {
                    this._iEvents[eventType].splice(index, 1);
                }
            }
            // delegated event
            else if (this.selector) {
                var delegated = delegatedEvents[eventType],
                    matchFound = false;

                if (!delegated) { return this; }

                // count from last index of delegated to 0
                for (index = delegated.selectors.length - 1; index >= 0; index--) {
                    // look for matching selector and context Node
                    if (delegated.selectors[index] === this.selector
                        && delegated.contexts[index] === this._context) {

                        var listeners = delegated.listeners[index];

                        // each item of the listeners array is an array: [function, useCaptureFlag]
                        for (i = listeners.length - 1; i >= 0; i--) {
                            var fn = listeners[i][0],
                                useCap = listeners[i][1];

                            // check if the listener functions and useCapture flags match
                            if (fn === listener && useCap === useCapture) {
                                // remove the listener from the array of listeners
                                listeners.splice(i, 1);

                                // if all listeners for this interactable have been removed
                                // remove the interactable from the delegated arrays
                                if (!listeners.length) {
                                    delegated.selectors.splice(index, 1);
                                    delegated.contexts .splice(index, 1);
                                    delegated.listeners.splice(index, 1);

                                    // remove delegate function from context
                                    events.remove(this._context, eventType, delegateListener);
                                    events.remove(this._context, eventType, delegateUseCapture, true);

                                    // remove the arrays if they are empty
                                    if (!delegated.selectors.length) {
                                        delegatedEvents[eventType] = null;
                                    }
                                }

                                // only remove one listener
                                matchFound = true;
                                break;
                            }
                        }

                        if (matchFound) { break; }
                    }
                }
            }
            // remove listener from this Interatable's element
            else {
                events.remove(this._element, eventType, listener, useCapture);
            }

            return this;
        },

        /*\
         * Interactable.set
         [ method ]
         *
         * Reset the options of this Interactable
         - options (object) The new settings to apply
         = (object) This Interactable
        \*/
        set: function (options) {
            if (!isObject(options)) {
                options = {};
            }

            this.options = extend({}, defaultOptions.base);

            var i,
                actions = ['drag', 'drop', 'resize', 'gesture'],
                methods = ['draggable', 'dropzone', 'resizable', 'gesturable'],
                perActions = extend(extend({}, defaultOptions.perAction), options[action] || {});

            for (i = 0; i < actions.length; i++) {
                var action = actions[i];

                this.options[action] = extend({}, defaultOptions[action]);

                this.setPerAction(action, perActions);

                this[methods[i]](options[action]);
            }

            var settings = [
                    'accept', 'actionChecker', 'allowFrom', 'deltaSource',
                    'dropChecker', 'ignoreFrom', 'origin', 'preventDefault',
                    'rectChecker', 'styleCursor'
                ];

            for (i = 0, len = settings.length; i < len; i++) {
                var setting = settings[i];

                this.options[setting] = defaultOptions.base[setting];

                if (setting in options) {
                    this[setting](options[setting]);
                }
            }

            return this;
        },

        /*\
         * Interactable.unset
         [ method ]
         *
         * Remove this interactable from the list of interactables and remove
         * it's drag, drop, resize and gesture capabilities
         *
         = (object) @interact
        \*/
        unset: function () {
            events.remove(this._element, 'all');

            if (!isString(this.selector)) {
                events.remove(this, 'all');
                if (this.options.styleCursor) {
                    this._element.style.cursor = '';
                }
            }
            else {
                // remove delegated events
                for (var type in delegatedEvents) {
                    var delegated = delegatedEvents[type];

                    for (var i = 0; i < delegated.selectors.length; i++) {
                        if (delegated.selectors[i] === this.selector
                            && delegated.contexts[i] === this._context) {

                            delegated.selectors.splice(i, 1);
                            delegated.contexts .splice(i, 1);
                            delegated.listeners.splice(i, 1);

                            // remove the arrays if they are empty
                            if (!delegated.selectors.length) {
                                delegatedEvents[type] = null;
                            }
                        }

                        events.remove(this._context, type, delegateListener);
                        events.remove(this._context, type, delegateUseCapture, true);

                        break;
                    }
                }
            }

            this.dropzone(false);

            interactables.splice(indexOf(interactables, this), 1);

            return interact;
        }
    };

    function warnOnce (method, message) {
        var warned = false;

        return function () {
            if (!warned) {
                window.console.warn(message);
                warned = true;
            }

            return method.apply(this, arguments);
        };
    }

    Interactable.prototype.snap = warnOnce(Interactable.prototype.snap,
         'Interactable#snap is deprecated. See the new documentation for snapping at http://interactjs.io/docs/snapping');
    Interactable.prototype.restrict = warnOnce(Interactable.prototype.restrict,
         'Interactable#restrict is deprecated. See the new documentation for resticting at http://interactjs.io/docs/restriction');
    Interactable.prototype.inertia = warnOnce(Interactable.prototype.inertia,
         'Interactable#inertia is deprecated. See the new documentation for inertia at http://interactjs.io/docs/inertia');
    Interactable.prototype.autoScroll = warnOnce(Interactable.prototype.autoScroll,
         'Interactable#autoScroll is deprecated. See the new documentation for autoScroll at http://interactjs.io/docs/#autoscroll');
    Interactable.prototype.squareResize = warnOnce(Interactable.prototype.squareResize,
         'Interactable#squareResize is deprecated. See http://interactjs.io/docs/#resize-square');

    Interactable.prototype.accept = warnOnce(Interactable.prototype.accept,
         'Interactable#accept is deprecated. use Interactable#dropzone({ accept: target }) instead');
    Interactable.prototype.dropChecker = warnOnce(Interactable.prototype.dropChecker,
         'Interactable#dropChecker is deprecated. use Interactable#dropzone({ dropChecker: checkerFunction }) instead');
    Interactable.prototype.context = warnOnce(Interactable.prototype.context,
         'Interactable#context as a method is deprecated. It will soon be a DOM Node instead');

    /*\
     * interact.isSet
     [ method ]
     *
     * Check if an element has been set
     - element (Element) The Element being searched for
     = (boolean) Indicates if the element or CSS selector was previously passed to interact
    \*/
    interact.isSet = function(element, options) {
        return interactables.indexOfElement(element, options && options.context) !== -1;
    };

    /*\
     * interact.on
     [ method ]
     *
     * Adds a global listener for an InteractEvent or adds a DOM event to
     * `document`
     *
     - type       (string | array | object) The types of events to listen for
     - listener   (function) The function to be called on the given event(s)
     - useCapture (boolean) #optional useCapture flag for addEventListener
     = (object) interact
    \*/
    interact.on = function (type, listener, useCapture) {
        if (isString(type) && type.search(' ') !== -1) {
            type = type.trim().split(/ +/);
        }

        if (isArray(type)) {
            for (var i = 0; i < type.length; i++) {
                interact.on(type[i], listener, useCapture);
            }

            return interact;
        }

        if (isObject(type)) {
            for (var prop in type) {
                interact.on(prop, type[prop], listener);
            }

            return interact;
        }

        // if it is an InteractEvent type, add listener to globalEvents
        if (contains(eventTypes, type)) {
            // if this type of event was never bound
            if (!globalEvents[type]) {
                globalEvents[type] = [listener];
            }
            else {
                globalEvents[type].push(listener);
            }
        }
        // If non InteractEvent type, addEventListener to document
        else {
            events.add(document, type, listener, useCapture);
        }

        return interact;
    };

    /*\
     * interact.off
     [ method ]
     *
     * Removes a global InteractEvent listener or DOM event from `document`
     *
     - type       (string | array | object) The types of events that were listened for
     - listener   (function) The listener function to be removed
     - useCapture (boolean) #optional useCapture flag for removeEventListener
     = (object) interact
     \*/
    interact.off = function (type, listener, useCapture) {
        if (isString(type) && type.search(' ') !== -1) {
            type = type.trim().split(/ +/);
        }

        if (isArray(type)) {
            for (var i = 0; i < type.length; i++) {
                interact.off(type[i], listener, useCapture);
            }

            return interact;
        }

        if (isObject(type)) {
            for (var prop in type) {
                interact.off(prop, type[prop], listener);
            }

            return interact;
        }

        if (!contains(eventTypes, type)) {
            events.remove(document, type, listener, useCapture);
        }
        else {
            var index;

            if (type in globalEvents
                && (index = indexOf(globalEvents[type], listener)) !== -1) {
                globalEvents[type].splice(index, 1);
            }
        }

        return interact;
    };

    /*\
     * interact.enableDragging
     [ method ]
     *
     * Deprecated.
     *
     * Returns or sets whether dragging is enabled for any Interactables
     *
     - newValue (boolean) #optional `true` to allow the action; `false` to disable action for all Interactables
     = (boolean | object) The current setting or interact
    \*/
    interact.enableDragging = warnOnce(function (newValue) {
        if (newValue !== null && newValue !== undefined) {
            actionIsEnabled.drag = newValue;

            return interact;
        }
        return actionIsEnabled.drag;
    }, 'interact.enableDragging is deprecated and will soon be removed.');

    /*\
     * interact.enableResizing
     [ method ]
     *
     * Deprecated.
     *
     * Returns or sets whether resizing is enabled for any Interactables
     *
     - newValue (boolean) #optional `true` to allow the action; `false` to disable action for all Interactables
     = (boolean | object) The current setting or interact
    \*/
    interact.enableResizing = warnOnce(function (newValue) {
        if (newValue !== null && newValue !== undefined) {
            actionIsEnabled.resize = newValue;

            return interact;
        }
        return actionIsEnabled.resize;
    }, 'interact.enableResizing is deprecated and will soon be removed.');

    /*\
     * interact.enableGesturing
     [ method ]
     *
     * Deprecated.
     *
     * Returns or sets whether gesturing is enabled for any Interactables
     *
     - newValue (boolean) #optional `true` to allow the action; `false` to disable action for all Interactables
     = (boolean | object) The current setting or interact
    \*/
    interact.enableGesturing = warnOnce(function (newValue) {
        if (newValue !== null && newValue !== undefined) {
            actionIsEnabled.gesture = newValue;

            return interact;
        }
        return actionIsEnabled.gesture;
    }, 'interact.enableGesturing is deprecated and will soon be removed.');

    interact.eventTypes = eventTypes;

    /*\
     * interact.debug
     [ method ]
     *
     * Returns debugging data
     = (object) An object with properties that outline the current state and expose internal functions and variables
    \*/
    interact.debug = function () {
        var interaction = interactions[0] || new Interaction();

        return {
            interactions          : interactions,
            target                : interaction.target,
            dragging              : interaction.dragging,
            resizing              : interaction.resizing,
            gesturing             : interaction.gesturing,
            prepared              : interaction.prepared,
            matches               : interaction.matches,
            matchElements         : interaction.matchElements,

            prevCoords            : interaction.prevCoords,
            startCoords           : interaction.startCoords,

            pointerIds            : interaction.pointerIds,
            pointers              : interaction.pointers,
            addPointer            : listeners.addPointer,
            removePointer         : listeners.removePointer,
            recordPointer        : listeners.recordPointer,

            snap                  : interaction.snapStatus,
            restrict              : interaction.restrictStatus,
            inertia               : interaction.inertiaStatus,

            downTime              : interaction.downTimes[0],
            downEvent             : interaction.downEvent,
            downPointer           : interaction.downPointer,
            prevEvent             : interaction.prevEvent,

            Interactable          : Interactable,
            interactables         : interactables,
            pointerIsDown         : interaction.pointerIsDown,
            defaultOptions        : defaultOptions,
            defaultActionChecker  : defaultActionChecker,

            actionCursors         : actionCursors,
            dragMove              : listeners.dragMove,
            resizeMove            : listeners.resizeMove,
            gestureMove           : listeners.gestureMove,
            pointerUp             : listeners.pointerUp,
            pointerDown           : listeners.pointerDown,
            pointerMove           : listeners.pointerMove,
            pointerHover          : listeners.pointerHover,

            eventTypes            : eventTypes,

            events                : events,
            globalEvents          : globalEvents,
            delegatedEvents       : delegatedEvents,

            prefixedPropREs       : prefixedPropREs
        };
    };

    // expose the functions used to calculate multi-touch properties
    interact.getPointerAverage = pointerAverage;
    interact.getTouchBBox     = touchBBox;
    interact.getTouchDistance = touchDistance;
    interact.getTouchAngle    = touchAngle;

    interact.getElementRect         = getElementRect;
    interact.getElementClientRect   = getElementClientRect;
    interact.matchesSelector        = matchesSelector;
    interact.closest                = closest;

    /*\
     * interact.margin
     [ method ]
     *
     * Deprecated. Use `interact(target).resizable({ margin: number });` instead.
     * Returns or sets the margin for autocheck resizing used in
     * @Interactable.getAction. That is the distance from the bottom and right
     * edges of an element clicking in which will start resizing
     *
     - newValue (number) #optional
     = (number | interact) The current margin value or interact
    \*/
    interact.margin = warnOnce(function (newvalue) {
        if (isNumber(newvalue)) {
            margin = newvalue;

            return interact;
        }
        return margin;
    },
    'interact.margin is deprecated. Use interact(target).resizable({ margin: number }); instead.') ;

    /*\
     * interact.supportsTouch
     [ method ]
     *
     = (boolean) Whether or not the browser supports touch input
    \*/
    interact.supportsTouch = function () {
        return supportsTouch;
    };

    /*\
     * interact.supportsPointerEvent
     [ method ]
     *
     = (boolean) Whether or not the browser supports PointerEvents
    \*/
    interact.supportsPointerEvent = function () {
        return supportsPointerEvent;
    };

    /*\
     * interact.stop
     [ method ]
     *
     * Cancels all interactions (end events are not fired)
     *
     - event (Event) An event on which to call preventDefault()
     = (object) interact
    \*/
    interact.stop = function (event) {
        for (var i = interactions.length - 1; i >= 0; i--) {
            interactions[i].stop(event);
        }

        return interact;
    };

    /*\
     * interact.dynamicDrop
     [ method ]
     *
     * Returns or sets whether the dimensions of dropzone elements are
     * calculated on every dragmove or only on dragstart for the default
     * dropChecker
     *
     - newValue (boolean) #optional True to check on each move. False to check only before start
     = (boolean | interact) The current setting or interact
    \*/
    interact.dynamicDrop = function (newValue) {
        if (isBool(newValue)) {
            //if (dragging && dynamicDrop !== newValue && !newValue) {
                //calcRects(dropzones);
            //}

            dynamicDrop = newValue;

            return interact;
        }
        return dynamicDrop;
    };

    /*\
     * interact.pointerMoveTolerance
     [ method ]
     * Returns or sets the distance the pointer must be moved before an action
     * sequence occurs. This also affects tolerance for tap events.
     *
     - newValue (number) #optional The movement from the start position must be greater than this value
     = (number | Interactable) The current setting or interact
    \*/
    interact.pointerMoveTolerance = function (newValue) {
        if (isNumber(newValue)) {
            pointerMoveTolerance = newValue;

            return this;
        }

        return pointerMoveTolerance;
    };

    /*\
     * interact.maxInteractions
     [ method ]
     **
     * Returns or sets the maximum number of concurrent interactions allowed.
     * By default only 1 interaction is allowed at a time (for backwards
     * compatibility). To allow multiple interactions on the same Interactables
     * and elements, you need to enable it in the draggable, resizable and
     * gesturable `'max'` and `'maxPerElement'` options.
     **
     - newValue (number) #optional Any number. newValue <= 0 means no interactions.
    \*/
    interact.maxInteractions = function (newValue) {
        if (isNumber(newValue)) {
            maxInteractions = newValue;

            return this;
        }

        return maxInteractions;
    };

    interact.createSnapGrid = function (grid) {
        return function (x, y) {
            var offsetX = 0,
                offsetY = 0;

            if (isObject(grid.offset)) {
                offsetX = grid.offset.x;
                offsetY = grid.offset.y;
            }

            var gridx = Math.round((x - offsetX) / grid.x),
                gridy = Math.round((y - offsetY) / grid.y),

                newX = gridx * grid.x + offsetX,
                newY = gridy * grid.y + offsetY;

            return {
                x: newX,
                y: newY,
                range: grid.range
            };
        };
    };

    function endAllInteractions (event) {
        for (var i = 0; i < interactions.length; i++) {
            interactions[i].pointerEnd(event, event);
        }
    }

    function listenToDocument (doc) {
        if (contains(documents, doc)) { return; }

        var win = doc.defaultView || doc.parentWindow;

        // add delegate event listener
        for (var eventType in delegatedEvents) {
            events.add(doc, eventType, delegateListener);
            events.add(doc, eventType, delegateUseCapture, true);
        }

        if (supportsPointerEvent) {
            if (PointerEvent === win.MSPointerEvent) {
                pEventTypes = {
                    up: 'MSPointerUp', down: 'MSPointerDown', over: 'mouseover',
                    out: 'mouseout', move: 'MSPointerMove', cancel: 'MSPointerCancel' };
            }
            else {
                pEventTypes = {
                    up: 'pointerup', down: 'pointerdown', over: 'pointerover',
                    out: 'pointerout', move: 'pointermove', cancel: 'pointercancel' };
            }

            events.add(doc, pEventTypes.down  , listeners.selectorDown );
            events.add(doc, pEventTypes.move  , listeners.pointerMove  );
            events.add(doc, pEventTypes.over  , listeners.pointerOver  );
            events.add(doc, pEventTypes.out   , listeners.pointerOut   );
            events.add(doc, pEventTypes.up    , listeners.pointerUp    );
            events.add(doc, pEventTypes.cancel, listeners.pointerCancel);

            // autoscroll
            events.add(doc, pEventTypes.move, listeners.autoScrollMove);
        }
        else {
            events.add(doc, 'mousedown', listeners.selectorDown);
            events.add(doc, 'mousemove', listeners.pointerMove );
            events.add(doc, 'mouseup'  , listeners.pointerUp   );
            events.add(doc, 'mouseover', listeners.pointerOver );
            events.add(doc, 'mouseout' , listeners.pointerOut  );

            events.add(doc, 'touchstart' , listeners.selectorDown );
            events.add(doc, 'touchmove'  , listeners.pointerMove  );
            events.add(doc, 'touchend'   , listeners.pointerUp    );
            events.add(doc, 'touchcancel', listeners.pointerCancel);

            // autoscroll
            events.add(doc, 'mousemove', listeners.autoScrollMove);
            events.add(doc, 'touchmove', listeners.autoScrollMove);
        }

        events.add(win, 'blur', endAllInteractions);

        try {
            if (win.frameElement) {
                var parentDoc = win.frameElement.ownerDocument,
                    parentWindow = parentDoc.defaultView;

                events.add(parentDoc   , 'mouseup'      , listeners.pointerEnd);
                events.add(parentDoc   , 'touchend'     , listeners.pointerEnd);
                events.add(parentDoc   , 'touchcancel'  , listeners.pointerEnd);
                events.add(parentDoc   , 'pointerup'    , listeners.pointerEnd);
                events.add(parentDoc   , 'MSPointerUp'  , listeners.pointerEnd);
                events.add(parentWindow, 'blur'         , endAllInteractions );
            }
        }
        catch (error) {
            interact.windowParentError = error;
        }

        // prevent native HTML5 drag on interact.js target elements
        events.add(doc, 'dragstart', function (event) {
            for (var i = 0; i < interactions.length; i++) {
                var interaction = interactions[i];

                if (interaction.element
                    && (interaction.element === event.target
                        || nodeContains(interaction.element, event.target))) {

                    interaction.checkAndPreventDefault(event, interaction.target, interaction.element);
                    return;
                }
            }
        });

        if (events.useAttachEvent) {
            // For IE's lack of Event#preventDefault
            events.add(doc, 'selectstart', function (event) {
                var interaction = interactions[0];

                if (interaction.currentAction()) {
                    interaction.checkAndPreventDefault(event);
                }
            });

            // For IE's bad dblclick event sequence
            events.add(doc, 'dblclick', doOnInteractions('ie8Dblclick'));
        }

        documents.push(doc);
    }

    listenToDocument(document);

    function indexOf (array, target) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === target) {
                return i;
            }
        }

        return -1;
    }

    function contains (array, target) {
        return indexOf(array, target) !== -1;
    }

    function matchesSelector (element, selector, nodeList) {
        if (ie8MatchesSelector) {
            return ie8MatchesSelector(element, selector, nodeList);
        }

        // remove /deep/ from selectors if shadowDOM polyfill is used
        if (window !== realWindow) {
            selector = selector.replace(/\/deep\//g, ' ');
        }

        return element[prefixedMatchesSelector](selector);
    }

    function matchesUpTo (element, selector, limit) {
        while (isElement(element)) {
            if (matchesSelector(element, selector)) {
                return true;
            }

            element = parentElement(element);

            if (element === limit) {
                return matchesSelector(element, selector);
            }
        }

        return false;
    }

    // For IE8's lack of an Element#matchesSelector
    // taken from http://tanalin.com/en/blog/2012/12/matches-selector-ie8/ and modified
    if (!(prefixedMatchesSelector in Element.prototype) || !isFunction(Element.prototype[prefixedMatchesSelector])) {
        ie8MatchesSelector = function (element, selector, elems) {
            elems = elems || element.parentNode.querySelectorAll(selector);

            for (var i = 0, len = elems.length; i < len; i++) {
                if (elems[i] === element) {
                    return true;
                }
            }

            return false;
        };
    }

    // requestAnimationFrame polyfill
    (function() {
        var lastTime = 0,
            vendors = ['ms', 'moz', 'webkit', 'o'];

        for(var x = 0; x < vendors.length && !realWindow.requestAnimationFrame; ++x) {
            reqFrame = realWindow[vendors[x]+'RequestAnimationFrame'];
            cancelFrame = realWindow[vendors[x]+'CancelAnimationFrame'] || realWindow[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!reqFrame) {
            reqFrame = function(callback) {
                var currTime = new Date().getTime(),
                    timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                    id = setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!cancelFrame) {
            cancelFrame = function(id) {
                clearTimeout(id);
            };
        }
    }());

    /* global exports: true, module, define */

    // http://documentcloud.github.io/underscore/docs/underscore.html#section-11
    if (true) {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = interact;
        }
        exports.interact = interact;
    }
    // AMD
    else if (typeof define === 'function' && define.amd) {
        define('interact', function() {
            return interact;
        });
    }
    else {
        realWindow.interact = interact;
    }

} (typeof window === 'undefined'? undefined : window));


/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (st) {
  /**
   * @prop {Number} width - 元素的宽度
   * @prop {Number} height - 元素的高度
   * @prop {Number} top - 元素的上边线距视口的上边的距离，若为负数则说明超出视口
   * @prop {Number} left - 元素的左边线距视口的左边的距离，若为负数则说明超出视口
   * @prop {Number} right - 元素的右边线距视口的**左**边的距离，即 left + width，若 right - window.innerWidth > 0 则说明超出视口
   * @prop {Number} bottom - 元素的底边线距视口的**上**边的距离，即 top + height，若 bottom - window.innerHeight > 0 则说明超出视口
   * @type {ClientRect}
   */
  var rect = st.$els.stBox.getBoundingClientRect(),
      boxPos = st.boxPos;

  // 左边
  var left = rect.left;

  if (left < 0) {
    boxPos.translateX -= left;
  }

  // 上边
  var top = rect.top;

  if (top < 0) {
    boxPos.translateY -= top;
  }

  // 右边
  var rightDiff = rect.right - window.innerWidth;
  if (rightDiff > 0) {
    boxPos.translateX -= rightDiff;
  }

  // 下边
  var bottomDiff = rect.bottom - window.innerHeight;
  if (bottomDiff > 0) {
    boxPos.translateY -= bottomDiff;
  }
};

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(79);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__(188);

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = __webpack_require__(80);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = function (st) {
  var onStorageChanged = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(items) {
      var defaultApi, excludeDomains;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              defaultApi = items.defaultApi, excludeDomains = items.excludeDomains;


              if (defaultApi) {
                defApi = defaultApi;
                if (!st.boxPos.show) {
                  st.query.api = defApi;
                }
                delete items.defaultApi;
              }

              if (!items.disableSelection) {
                _context.next = 6;
                break;
              }

              st.selection = false;
              _context.next = 11;
              break;

            case 6:
              if (!excludeDomains) {
                _context.next = 11;
                break;
              }

              _context.next = 9;
              return (0, _util.isHostEnabled)(location, excludeDomains);

            case 9:
              st.selection = _context.sent;

              delete items.excludeDomains;

            case 11:

              (0, _assign2.default)(st, items);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function onStorageChanged(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var defApi = '';

  function onAfterTranslate() {
    var query = this.query,
        text = query.text;

    // autoPlay 属性是在 onStorageChanged 的时候扩展进去的
    if (this.autoPlay && text.length < 50) {
      this.play(text, query.from);
    }
  }

  function onBoxPosShow(isShow) {
    if (!isShow) {
      this.query.api = defApi;
    }
  }

  /* istanbul ignore next */
  if (false) {
    st.__onBoxShow = onBoxPosShow;
    st.__afterTs = onAfterTranslate;
    st.__onStorageChanged = onStorageChanged;
  } else {
    st.$watch('boxPos.show', onBoxPosShow);
    st.$on('after translate', onAfterTranslate);

    (0, _storageWatcher2.default)(['showShanbay', 'ignoreChinese', 'ignoreNumLike', 'showBtn', 'disableSelection', 'needCtrl', 'defaultApi', 'excludeDomains', 'autoPlay'], onStorageChanged);
  }
};

var _util = __webpack_require__(127);

var _storageWatcher = __webpack_require__(419);

var _storageWatcher2 = _interopRequireDefault(_storageWatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (st) {
  /* istanbul ignore next */
  st.$watch('boxPos.show', function (value) {
    if (value) {
      ga('send', 'event', '翻译窗口', '展示');
    }
  });
};

var _client = __webpack_require__(440);

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
function ga() {
  try {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _client2.default.send('ga', args);
  } catch (e) {}
} /**
   * @files 发送翻译结果展示事件到谷歌分析
   */

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (st) {
  function onKeyUp(e) {
    if (27 === e.keyCode) {
      // keyCode 虽然已被弃用，但目前几乎没有浏览器实现了 e.key
      st.boxPos.show = st.btnPos.show = false;
    }
  }

  /* istanbul ignore next */
  if (false) {
    st.__onKeyUp = onKeyUp;
  } else {
    document.addEventListener('keyup', onKeyUp);
  }
};

/***/ }),

/***/ 501:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(187);

var _stringify2 = _interopRequireDefault(_stringify);

exports.onGetLocation = onGetLocation;
exports.onTranslate = onTranslate;

var _connect = __webpack_require__(125);

var _st = __webpack_require__(445);

var _st2 = _interopRequireDefault(_st);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 内容脚本同时也是一个 Server 端，用来执行扩展程序发送过来的命令
 */

var server = (0, _connect.createServer)();

/* istanbul ignore next */
/**
 * 将自己的 location 对象报告给后台
 * @param data
 * @param {Function} resolve
 */
function onGetLocation(data, resolve) {
  if (self === top) {
    resolve(JSON.parse((0, _stringify2.default)(location)));
  }
}

/**
 * 接收到翻译命令时，翻译网页上的拖蓝
 */
function onTranslate() {
  _st2.default.query.text = getSelection().toString();
  _st2.default.safeTranslate();
}

/* istanbul ignore if */
if (true) {
  server.on('connect', function (client) {
    client.on('get location', onGetLocation);
    client.on('translate', onTranslate);
  });
}

exports.default = server;

/***/ })

},[484]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljL3N0b3JhZ2Utd2F0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL3N0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvZmlyZWZveC1maXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL3N0L2RyYWdnYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW50ZXJhY3QuanMvaW50ZXJhY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9zdC9yZXN0cmljdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL3N0L3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9zdC9nYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL3N0L2hpZGUtb24tZXNjLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvc2VydmVyLmpzIl0sIm5hbWVzIjpbIm9uU3RvcmFnZUNoYW5nZWQiLCJrZXlzIiwiYXJlYXMiLCJsaXN0ZW5lciIsIl9rZXlzIiwiaXNBcnJheSIsIl9hcmVhcyIsIl9saXN0ZW5lciIsImFyZ3VtZW50cyIsImxlbmd0aCIsImZvckVhY2giLCJhcmVhIiwidGhlbiIsIml0ZW1zIiwicmVhbExpc3RlbmVyIiwiY2hhbmdlcyIsImluY2x1ZGVzIiwibXlDaGFuZ2VzIiwia2V5IiwiaGFzTXlDaGFuZ2UiLCJsaXN0ZW5lcnMiLCJwdXNoIiwic3BsaWNlIiwiaW5kZXhPZiIsImNoYW5nZWRJdGVtcyIsImNoYW5nZWROZXdWYWx1ZSIsIm5ld1ZhbHVlIiwiY2hyb21lIiwic3RvcmFnZSIsIm9uQ2hhbmdlZCIsImFkZExpc3RlbmVyIiwiQXJyYXkiLCJzdCIsImNsaWVudCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImJpbmQiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImUiLCJzZWxlY3Rpb24iLCJ0b1N0cmluZyIsInRyaW0iLCJyZW1vdmVGaXJzdE1vdXNlVXAiLCJkb2N1bWVudCIsImJvZHkiLCJjb250ZW50RWRpdGFibGUiLCJzZW5kIiwiZGlzYWJsZUluRWRpdGFibGUiLCIkZGVzdHJveSIsIiRhcHBlbmRUbyIsIiRlbWl0IiwiZmlyc3RNb3VzZVVwIiwib25UcmFuc2xhdGUiLCJNT1VTRV9VUCIsImdldFNlbGVjdGlvbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsIm9uQ29ubmVjdCIsIm9uIiwicHJvY2VzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXN0cmljdCIsIm9uTW92ZSIsImV2ZW50IiwiYm94UG9zIiwidHJhbnNsYXRlWCIsImR4IiwidHJhbnNsYXRlWSIsImR5IiwiX19yZXN0cmljdCIsIl9fb25Nb3ZlIiwiJG9uIiwiJG5leHRUaWNrIiwiJGVscyIsInN0RHJhZyIsInN0eWxlQ3Vyc29yIiwiZHJhZ2dhYmxlIiwib25tb3ZlIiwib25lbmQiLCJzdEJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJyZWN0IiwidG9wIiwicmlnaHREaWZmIiwicmlnaHQiLCJpbm5lcldpZHRoIiwiYm90dG9tRGlmZiIsImJvdHRvbSIsImlubmVySGVpZ2h0IiwiZGVmYXVsdEFwaSIsImV4Y2x1ZGVEb21haW5zIiwiZGVmQXBpIiwic2hvdyIsInF1ZXJ5IiwiYXBpIiwiZGlzYWJsZVNlbGVjdGlvbiIsImxvY2F0aW9uIiwib25BZnRlclRyYW5zbGF0ZSIsInRleHQiLCJhdXRvUGxheSIsInBsYXkiLCJmcm9tIiwib25Cb3hQb3NTaG93IiwiaXNTaG93IiwiX19vbkJveFNob3ciLCJfX2FmdGVyVHMiLCJfX29uU3RvcmFnZUNoYW5nZWQiLCIkd2F0Y2giLCJ2YWx1ZSIsImdhIiwiYXJncyIsIm9uS2V5VXAiLCJrZXlDb2RlIiwiYnRuUG9zIiwiX19vbktleVVwIiwib25HZXRMb2NhdGlvbiIsInNlcnZlciIsImRhdGEiLCJyZXNvbHZlIiwic2VsZiIsIkpTT04iLCJwYXJzZSIsInNhZmVUcmFuc2xhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztRQWFnQkEsZ0IsR0FBQUEsZ0I7O2tCQXdCRCxVQUFXQyxJQUFYLEVBQWtCQyxLQUFsQixFQUEwQkMsUUFBMUIsRUFBcUM7QUFDbEQsTUFBTUMsUUFBUUMsUUFBU0osSUFBVCxJQUFrQkEsSUFBbEIsR0FBeUIsQ0FBRUEsSUFBRixDQUF2Qzs7QUFFQSxNQUFJSyxlQUFKO0FBQUEsTUFBYUMsa0JBQWI7QUFDQSxNQUFLLE1BQU1DLFVBQVVDLE1BQXJCLEVBQThCO0FBQzVCSCxhQUFTRCxRQUFTSCxLQUFULElBQW1CQSxLQUFuQixHQUEyQixDQUFFQSxLQUFGLENBQXBDO0FBQ0FLLGdCQUFZSixRQUFaO0FBQ0QsR0FIRCxNQUdPO0FBQ0xJLGdCQUFZTCxLQUFaO0FBQ0FJLGFBQVMsQ0FBRSxPQUFGLENBQVQ7QUFDRDs7QUFFRDtBQUNBO0FBQ0FBLFNBQU9JLE9BQVAsQ0FBZ0IsVUFBRUMsSUFBRixFQUFZO0FBQzFCLGtDQUFZUCxLQUFaLEVBQW9CTyxJQUFwQixFQUEyQkMsSUFBM0IsQ0FBaUM7QUFBQSxhQUFTTCxVQUFXTSxLQUFYLEVBQW1CRixJQUFuQixDQUFUO0FBQUEsS0FBakM7QUFDRCxHQUZEOztBQUlBLFdBQVNHLFlBQVQsQ0FBdUJDLE9BQXZCLEVBQWlDSixJQUFqQyxFQUF3Qzs7QUFFdEM7QUFDQSxRQUFLLENBQUNMLE9BQU9VLFFBQVAsQ0FBaUJMLElBQWpCLENBQU4sRUFBZ0M7QUFDOUI7QUFDRDs7QUFFRDtBQUNBLFFBQU1NLFlBQVksRUFBbEI7O0FBRUEsU0FBTSxJQUFJQyxHQUFWLElBQWlCSCxPQUFqQixFQUEyQjtBQUN6QixVQUFLWCxNQUFNWSxRQUFOLENBQWdCRSxHQUFoQixDQUFMLEVBQTZCO0FBQzNCRCxrQkFBV0MsR0FBWCxJQUFtQkgsUUFBU0csR0FBVCxDQUFuQjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQSxTQUFNLElBQUlDLFdBQVYsSUFBeUJGLFNBQXpCLEVBQXFDO0FBQ25DVixnQkFBV1UsU0FBWCxFQUF1Qk4sSUFBdkI7QUFDQTtBQUNEO0FBQ0Y7O0FBRURTLFlBQVVDLElBQVYsQ0FBZ0JQLFlBQWhCOztBQUVBLFNBQU87QUFBQSxXQUFLTSxVQUFVRSxNQUFWLENBQWtCRixVQUFVRyxPQUFWLENBQW1CVCxZQUFuQixDQUFsQixFQUFzRCxDQUF0RCxDQUFMO0FBQUEsR0FBUDtBQUNELEM7O0FBN0VEOzs7Ozs7QUFFTyxJQUFNTSxnQ0FBWSxFQUFsQjs7QUFFUDs7Ozs7QUFSQTs7OztBQWFPLFNBQVNwQixnQkFBVCxDQUEyQndCLFlBQTNCLEVBQTBDYixJQUExQyxFQUFpRDtBQUN0RCxNQUFNYyxrQkFBa0IsRUFBeEI7O0FBRUEsT0FBTSxJQUFJUCxHQUFWLElBQWlCTSxZQUFqQixFQUFnQztBQUM5QkMsb0JBQWlCUCxHQUFqQixJQUF5Qk0sYUFBY04sR0FBZCxFQUFvQlEsUUFBN0M7QUFDRDs7QUFFRE4sWUFBVVYsT0FBVixDQUFtQixVQUFFSSxZQUFGLEVBQW9CO0FBQ3JDQSxpQkFBY1csZUFBZCxFQUFnQ2QsSUFBaEM7QUFDRCxHQUZEO0FBR0Q7O0FBRURnQixPQUFPQyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJDLFdBQXpCLENBQXNDOUIsZ0JBQXRDOztJQUVPSyxPLEdBQVcwQixLLENBQVgxQixPOztBQUVQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7O2tCQUNlLDRCOzs7Ozs7Ozs7Ozs7OztBQ0RmOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7QUFDQTs7QUFFQSxJQUFNMkIsS0FBSyxvQkFBWSxFQUFFQyx3QkFBRixFQUFaLENBQVg7O0FBRUEseUJBQVdELEVBQVg7QUFDQSx1QkFBYUEsRUFBYjtBQUNBLGtCQUFRQSxFQUFSO0FBQ0EseUJBQVdBLEVBQVg7O2tCQUVlQSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJmRSxPQUFPQyxxQkFBUCxHQUErQkQsT0FBT0MscUJBQVAsQ0FBNkJDLElBQTdCLENBQWtDRixNQUFsQyxDQUEvQjtBQUNBQSxPQUFPRyxvQkFBUCxHQUE4QkgsT0FBT0csb0JBQVAsQ0FBNEJELElBQTVCLENBQWlDRixNQUFqQyxDQUE5QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1VBOzs7OztzRkFJTyxpQkFBNkJJLENBQTdCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFDQUMsVUFBVUMsUUFBVixHQUFxQkMsSUFBckIsRUFEQTtBQUFBO0FBQUE7QUFBQTs7QUFFSEM7O0FBRkcsa0JBSUUsV0FBV0MsU0FBU0MsSUFBVCxDQUFjQyxlQUozQjtBQUFBO0FBQUE7QUFBQTs7QUFLRCw2QkFBT0MsSUFBUCxDQUFhLElBQWIsRUFBb0IsQ0FBRSxNQUFGLEVBQVcsT0FBWCxFQUFxQixhQUFyQixDQUFwQjtBQUxDO0FBQUEsbUJBTWlDLDhCQUFZLG1CQUFaLENBTmpDOztBQUFBO0FBQUE7QUFNTUMsNkJBTk4sU0FNTUEsaUJBTk47O0FBQUEsaUJBT0lBLGlCQVBKO0FBQUE7QUFBQTtBQUFBOztBQVFDLHlCQUFHQyxRQUFIO0FBQ0EsNkJBQU9GLElBQVAsQ0FBYSxJQUFiLEVBQW9CLENBQUUsTUFBRixFQUFXLE9BQVgsRUFBcUIsYUFBckIsRUFBcUMsbUJBQXJDLENBQXBCO0FBVEQ7O0FBQUE7O0FBY0gseUJBQUdHLFNBQUgsQ0FBYyxNQUFkO0FBQ0EseUJBQUdDLEtBQUgsQ0FBVSxTQUFWLEVBQXNCWixDQUF0Qjs7QUFmRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOztrQkFBZWEsWTs7Ozs7QUFtQnRCOzs7Ozs7UUFJZ0JULGtCLEdBQUFBLGtCO1FBS0FVLFcsR0FBQUEsVzs7QUEzQ2hCOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxXQUFXLFNBQWpCO0FBQUEsSUFDSWQsWUFBWWUsY0FEaEIsQ0E4Qk8sU0FBU1osa0JBQVQsR0FBOEI7QUFDbkMsVUFEY0Esa0JBQ2Q7QUFDQUMsV0FBU1ksbUJBQVQsQ0FBOEJGLFFBQTlCLEVBQXlDRixZQUF6QztBQUNEOztBQUVNLFNBQVNDLFdBQVQsR0FBdUI7QUFDNUJWO0FBQ0EsZUFBR08sU0FBSCxDQUFjLE1BQWQ7QUFDQSxtQkFBT08sY0FBUCxDQUF1QixTQUF2QixFQUFtQ0MsU0FBbkM7QUFDRDs7QUFFRDs7OztBQUlBO0FBQ0EsU0FBU0EsU0FBVCxDQUFvQnhCLE1BQXBCLEVBQTZCO0FBQzNCQSxTQUFPeUIsRUFBUCxDQUFXLFdBQVgsRUFBeUJOLFdBQXpCO0FBQ0Q7O0FBRUQ7QUFDQSxJQUFLTyxJQUFMLEVBQTBDO0FBQ3hDLG1CQUFPRCxFQUFQLENBQVcsU0FBWCxFQUF1QkQsU0FBdkI7QUFDQWQsV0FBU2lCLGdCQUFULENBQTJCUCxRQUEzQixFQUFzQ0YsWUFBdEM7QUFDRCxDOzs7Ozs7Ozs7Ozs7OztrQkN2RGMsVUFBV25CLEVBQVgsRUFBZ0I7O0FBRTdCLFdBQVM2QixRQUFULEdBQW9CO0FBQ2xCLDRCQUFhN0IsRUFBYjtBQUNEOztBQUVELFdBQVM4QixNQUFULENBQWlCQyxLQUFqQixFQUF5QjtBQUFBLFFBQ2hCQyxNQURnQixHQUNOaEMsRUFETSxDQUNoQmdDLE1BRGdCOztBQUV2QkEsV0FBT0MsVUFBUCxJQUFxQkYsTUFBTUcsRUFBM0I7QUFDQUYsV0FBT0csVUFBUCxJQUFxQkosTUFBTUssRUFBM0I7QUFDRDs7QUFFRDtBQUNBLE1BQUtULEtBQUwsRUFBMEM7QUFDeEMzQixPQUFHcUMsVUFBSCxHQUFnQlIsUUFBaEI7QUFDQTdCLE9BQUdzQyxRQUFILEdBQWNSLE1BQWQ7QUFDRCxHQUhELE1BR087QUFDTDlCLE9BQUd1QyxHQUFILENBQVEsaUJBQVIsRUFBNEIsWUFBSztBQUMvQnZDLFNBQUd3QyxTQUFILENBQWNYLFFBQWQ7QUFDRCxLQUZEOztBQUlBLDRCQUFVN0IsR0FBR3lDLElBQUgsQ0FBUUMsTUFBbEIsRUFDR0MsV0FESCxDQUNnQixLQURoQixFQUVHQyxTQUZILENBRWM7QUFDVkMsY0FBU2YsTUFEQztBQUVWZ0IsYUFBUWpCO0FBRkUsS0FGZDtBQU1EO0FBQ0YsQzs7QUEvQkQ7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsUUFBUTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0NBQStDLGlDQUFpQyxFQUFFOztBQUVsRixrQkFBa0I7O0FBRWxCOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxhQUFhO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixtQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBLDRDQUE0QyxjQUFjOztBQUUxRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix5RkFBeUY7QUFDeEgsZ0NBQWdDLHFEQUFxRDtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLCtDQUErQztBQUNoRixpQ0FBaUMsb0NBQW9DO0FBQ3JFLGlDQUFpQyxvQ0FBb0M7QUFDckUsaUNBQWlDLG9DQUFvQztBQUNyRSxpQ0FBaUMsb0NBQW9DOztBQUVyRTtBQUNBLCtCQUErQixjQUFjOztBQUU3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW9ELGVBQWU7O0FBRW5FO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpREFBaUQsY0FBYzs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5QkFBeUIsYUFBYTs7QUFFdEMsa0NBQWtDLGNBQWM7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLGNBQWM7O0FBRTFDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtELFNBQVM7QUFDM0Q7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixVQUFVOztBQUVwQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQXNELFVBQVU7O0FBRWhFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixxQkFBcUI7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLG9DQUFvQzs7QUFFcEMsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQztBQUNsQyxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCOztBQUV4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0QsNEJBQTRCO0FBQzlFLG9EQUFvRCw4QkFBOEI7QUFDbEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckMsd0JBQXdCLGFBQWE7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckMsd0JBQXdCLGFBQWE7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHFDQUFxQztBQUM3RCx3QkFBd0IscUNBQXFDO0FBQzdEO0FBQ0E7O0FBRUEsZ0NBQWdDO0FBQ2hDOztBQUVBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCLDJCQUEyQjtBQUMzQjs7QUFFQSwrQkFBK0I7QUFDL0IsK0JBQStCO0FBQy9COztBQUVBO0FBQ0Esb0JBQW9CLGFBQWE7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLHVDQUF1QyxFQUFFO0FBQ3RGLDZDQUE2Qyx1Q0FBdUMsRUFBRTtBQUN0Riw2Q0FBNkMsdUNBQXVDLEVBQUU7O0FBRXRGO0FBQ0Esb0RBQW9ELFFBQVE7O0FBRTVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxxQ0FBcUMsUUFBUTs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSw4QkFBOEIsUUFBUTs7QUFFdEM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyw2QkFBNkIsRUFBRSxPQUFPLHdDQUF3QztBQUMvRyxpQ0FBaUMsNkJBQTZCLEVBQUUsT0FBTyx3Q0FBd0M7O0FBRS9HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNDQUFzQyxvQkFBb0I7QUFDMUQsc0JBQXNCLGdDQUFnQztBQUN0RCx1Q0FBdUMsc0JBQXNCO0FBQzdELHNCQUFzQixpQ0FBaUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDs7QUFFMUQ7QUFDQSwrQkFBK0IsZ0NBQWdDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQscUJBQXFCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxlQUFlO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQ0FBc0MsUUFBUTs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQ0FBc0MsUUFBUTs7QUFFOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtGQUFrRixRQUFROztBQUUxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUNBQW1DLDRDQUE0QztBQUMvRSxtQ0FBbUMsNENBQTRDO0FBQy9FLG1DQUFtQyw0Q0FBNEM7O0FBRS9FO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSxrQ0FBa0M7QUFDM0cseUVBQXlFLGtDQUFrQztBQUMzRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsU0FBUztBQUNsRix5RUFBeUUsU0FBUztBQUNsRjs7QUFFQTtBQUNBLG1DQUFtQyxzQkFBc0I7QUFDekQsbUNBQW1DLHNCQUFzQjtBQUN6RCxtQ0FBbUMsc0JBQXNCO0FBQ3pELG1DQUFtQyxzQkFBc0I7O0FBRXpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9FQUFvRSxRQUFROztBQUU1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRCxzREFBc0Q7QUFDaEgsMERBQTBELHNEQUFzRDtBQUNoSCwwREFBMEQsK0NBQStDO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw0Q0FBNEM7QUFDNUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLHVDQUF1Qyw0Q0FBNEM7QUFDbkYsdUNBQXVDLDRDQUE0QztBQUNuRix1Q0FBdUMsNENBQTRDO0FBQ25GO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pELDZEQUE2RCxVQUFVOztBQUV2RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwREFBMEQsU0FBUztBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsdUNBQXVDO0FBQzlEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsdUNBQXVDO0FBQ2xFO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLHVDQUF1QztBQUNsRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLDBCQUEwQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsUUFBUTs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQSwrQkFBK0IsUUFBUTs7QUFFdkM7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLGlEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBOztBQUVBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxrQ0FBa0Msb0NBQW9DO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0MsVUFBVTs7QUFFNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Q0FBNkMsU0FBUztBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUIsc0NBQXNDOztBQUV0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsZUFBZTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxnRUFBZ0UsUUFBUTs7QUFFeEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsaUNBQWlDO0FBQzVEOztBQUVBOztBQUVBLHVDQUF1QyxVQUFVOztBQUVqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IseUJBQXlCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQ0FBbUMsUUFBUTs7QUFFM0M7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMEJBQTBCO0FBQzFCLDBCQUEwQjs7QUFFMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLGNBQWM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEMsZ0JBQWdCO0FBQzVELDRDQUE0QyxnQkFBZ0I7QUFDNUQ7QUFDQTtBQUNBLDZDQUE2QyxpQkFBaUI7QUFDOUQsNkNBQTZDLGlCQUFpQjtBQUM5RDs7QUFFQSxvQ0FBb0Msa0VBQWtFO0FBQ3RHLG9DQUFvQyxrRUFBa0U7O0FBRXRHLG9DQUFvQyxrRUFBa0U7QUFDdEcsb0NBQW9DLGtFQUFrRTtBQUN0Rzs7QUFFQTtBQUNBLGtDQUFrQyxjQUFjOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCOztBQUVBLG9CQUFvQixhQUFhOztBQUVqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsYUFBYTs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzREFBc0QsU0FBUztBQUMvRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixnQ0FBZ0M7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUNBQW1DLHNCQUFzQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1QixpQkFBaUI7QUFDeEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsaURBQWlEO0FBQzNHLDBEQUEwRCxpREFBaUQ7QUFDM0csMERBQTBELGlEQUFpRDtBQUMzRywwREFBMEQsaURBQWlEO0FBQzNHLDBEQUEwRCxpREFBaUQ7QUFDM0csMERBQTBELGlEQUFpRDtBQUMzRztBQUNBO0FBQ0E7O0FBRUEsd0RBQXdELDJEQUEyRDtBQUNuSCx3REFBd0QsMkRBQTJEO0FBQ25ILHdEQUF3RCwyREFBMkQ7QUFDbkgsd0RBQXdELDJEQUEyRDtBQUNuSDs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0dBQWdHOztBQUVoRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCx1QkFBdUI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDZCQUE2QjtBQUMvRDtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxjQUFjO0FBQzlDLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsYUFBYTs7QUFFNUM7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsMkJBQTJCLG9CQUFvQjtBQUMvQzs7QUFFQSwwREFBMEQsVUFBVTs7QUFFcEU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFLHFDQUFxQyx1QkFBdUI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3QkFBd0I7QUFDeEI7O0FBRUEsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7OztBQUdUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixhQUFhOztBQUU1QztBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGFBQWE7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRkFBK0Y7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsb0JBQW9CO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsbURBQW1EO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG9EQUFvRDtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtREFBbUQsZ0RBQWdEO0FBQ25HO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtREFBbUQsZ0RBQWdEO0FBQ25HO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0Isc0JBQXNCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNERBQTRELFlBQVk7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxhQUFhOztBQUU5QztBQUNBLDREQUE0RCxZQUFZO0FBQ3hFO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNEQUFzRCxRQUFRO0FBQzlEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDLE9BQU87QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxrREFBa0Q7O0FBRS9GLHVCQUF1QixvQkFBb0I7QUFDM0M7O0FBRUEsZ0RBQWdEOztBQUVoRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQThDLFNBQVM7QUFDdkQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DLGdDQUFnQztBQUNuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3RUFBd0UsaUJBQWlCO0FBQ3pGO0FBQ0EsNkVBQTZFLCtCQUErQjtBQUM1RztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGlCQUFpQixFQUFFO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxvRUFBb0UsaUJBQWlCLEVBQUU7O0FBRXZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qix5QkFBeUI7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLFFBQVE7O0FBRS9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQix5QkFBeUI7QUFDcEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsMkNBQTJDLFNBQVM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBK0MsU0FBUztBQUN4RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLHlEQUF5RDtBQUMvRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsaUNBQWlDLEVBQUU7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBLFFBQVEsSUFBOEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztrQkNwMUxjLFVBQVc3QixFQUFYLEVBQWdCO0FBQzdCOzs7Ozs7Ozs7QUFTTSxhQUFPQSxHQUFHeUMsSUFBSCxDQUFRTSxLQUFSLENBQWNDLHFCQUFkLEVBQVA7QUFBQSxNQUNIaEIsTUFERyxHQUNPaEMsRUFEUCxDQUNIZ0MsTUFERzs7QUFHTjtBQWI2QixNQWN0QmlCLElBZHNCLEdBY2RDLElBZGMsQ0FjdEJELElBZHNCOztBQWU3QixNQUFLQSxPQUFPLENBQVosRUFBZ0I7QUFDZGpCLFdBQU9DLFVBQVAsSUFBcUJnQixJQUFyQjtBQUNEOztBQUVEO0FBbkI2QixNQW9CdEJFLEdBcEJzQixHQW9CZkQsSUFwQmUsQ0FvQnRCQyxHQXBCc0I7O0FBcUI3QixNQUFLQSxNQUFNLENBQVgsRUFBZTtBQUNibkIsV0FBT0csVUFBUCxJQUFxQmdCLEdBQXJCO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFNQyxZQUFZRixLQUFLRyxLQUFMLEdBQWFuRCxPQUFPb0QsVUFBdEM7QUFDQSxNQUFLRixZQUFZLENBQWpCLEVBQXFCO0FBQ25CcEIsV0FBT0MsVUFBUCxJQUFxQm1CLFNBQXJCO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFNRyxhQUFhTCxLQUFLTSxNQUFMLEdBQWN0RCxPQUFPdUQsV0FBeEM7QUFDQSxNQUFLRixhQUFhLENBQWxCLEVBQXNCO0FBQ3BCdkIsV0FBT0csVUFBUCxJQUFxQm9CLFVBQXJCO0FBQ0Q7QUFDRixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkNqQ2MsVUFBV3ZELEVBQVgsRUFBZ0I7QUFBQTtBQUFBLHdGQWE3QixpQkFBaUNuQixLQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUzZFLHdCQURULEdBQ3NDN0UsS0FEdEMsQ0FDUzZFLFVBRFQsRUFDb0JDLGNBRHBCLEdBQ3NDOUUsS0FEdEMsQ0FDb0I4RSxjQURwQjs7O0FBR0Usa0JBQUtELFVBQUwsRUFBa0I7QUFDaEJFLHlCQUFTRixVQUFUO0FBQ0Esb0JBQUssQ0FBQzFELEdBQUdnQyxNQUFILENBQVU2QixJQUFoQixFQUF1QjtBQUNyQjdELHFCQUFHOEQsS0FBSCxDQUFTQyxHQUFULEdBQWVILE1BQWY7QUFDRDtBQUNELHVCQUFPL0UsTUFBTTZFLFVBQWI7QUFDRDs7QUFUSCxtQkFXTzdFLE1BQU1tRixnQkFYYjtBQUFBO0FBQUE7QUFBQTs7QUFZSWhFLGlCQUFHTyxTQUFILEdBQWUsS0FBZjtBQVpKO0FBQUE7O0FBQUE7QUFBQSxtQkFhY29ELGNBYmQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxxQkFjeUIseUJBQWVNLFFBQWYsRUFBMEJOLGNBQTFCLENBZHpCOztBQUFBO0FBY0kzRCxpQkFBR08sU0FkUDs7QUFlSSxxQkFBTzFCLE1BQU04RSxjQUFiOztBQWZKOztBQWtCRSxvQ0FBZTNELEVBQWYsRUFBb0JuQixLQUFwQjs7QUFsQkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FiNkI7O0FBQUEsb0JBYWRiLGdCQWJjO0FBQUE7QUFBQTtBQUFBOztBQUM3QixNQUFJNEYsU0FBUyxFQUFiOztBQUVBLFdBQVNNLGdCQUFULEdBQTRCO0FBQ3BCLFFBQUNKLEtBQUQsR0FBVSxJQUFWLENBQUNBLEtBQUQ7QUFBQSxRQUNISyxJQURHLEdBQ0tMLEtBREwsQ0FDSEssSUFERzs7QUFHTjtBQUNBLFFBQUssS0FBS0MsUUFBTCxJQUFpQkQsS0FBSzFGLE1BQUwsR0FBYyxFQUFwQyxFQUF5QztBQUN2QyxXQUFLNEYsSUFBTCxDQUFXRixJQUFYLEVBQWtCTCxNQUFNUSxJQUF4QjtBQUNEO0FBQ0Y7O0FBdUJELFdBQVNDLFlBQVQsQ0FBdUJDLE1BQXZCLEVBQWdDO0FBQzlCLFFBQUssQ0FBQ0EsTUFBTixFQUFlO0FBQ2IsV0FBS1YsS0FBTCxDQUFXQyxHQUFYLEdBQWlCSCxNQUFqQjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQSxNQUFLakMsS0FBTCxFQUEwQztBQUN4QzNCLE9BQUd5RSxXQUFILEdBQWlCRixZQUFqQjtBQUNBdkUsT0FBRzBFLFNBQUgsR0FBZVIsZ0JBQWY7QUFDQWxFLE9BQUcyRSxrQkFBSCxHQUF3QjNHLGdCQUF4QjtBQUNELEdBSkQsTUFJTztBQUNMZ0MsT0FBRzRFLE1BQUgsQ0FBVyxhQUFYLEVBQTJCTCxZQUEzQjtBQUNBdkUsT0FBR3VDLEdBQUgsQ0FBUSxpQkFBUixFQUE0QjJCLGdCQUE1Qjs7QUFFQSxrQ0FBTyxDQUNMLGFBREssRUFFTCxlQUZLLEVBRWEsZUFGYixFQUUrQixTQUYvQixFQUUyQyxrQkFGM0MsRUFHTCxVQUhLLEVBR1EsWUFIUixFQUd1QixnQkFIdkIsRUFHMEMsVUFIMUMsQ0FBUCxFQUlJbEcsZ0JBSko7QUFLRDtBQUNGLEM7O0FBMUREOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDU2UsVUFBV2dDLEVBQVgsRUFBZ0I7QUFDNUI7QUFDREEsS0FBRzRFLE1BQUgsQ0FBVyxhQUFYLEVBQTJCLFVBQUVDLEtBQUYsRUFBWTtBQUNyQyxRQUFLQSxLQUFMLEVBQWE7QUFDWEMsU0FBSSxNQUFKLEVBQWEsT0FBYixFQUF1QixNQUF2QixFQUFnQyxJQUFoQztBQUNEO0FBQ0YsR0FKRDtBQUtELEM7O0FBakJEOzs7Ozs7QUFFQTtBQUNBLFNBQVNBLEVBQVQsR0FBdUI7QUFDckIsTUFBSTtBQUFBLHNDQURVQyxJQUNWO0FBRFVBLFVBQ1Y7QUFBQTs7QUFDRixxQkFBT2pFLElBQVAsQ0FBYSxJQUFiLEVBQW9CaUUsSUFBcEI7QUFDRCxHQUZELENBR0EsT0FBUXpFLENBQVIsRUFBWSxDQUFFO0FBQ2YsQyxDQVpEOzs7Ozs7Ozs7Ozs7Ozs7O2tCQ0llLFVBQVdOLEVBQVgsRUFBZ0I7QUFDN0IsV0FBU2dGLE9BQVQsQ0FBa0IxRSxDQUFsQixFQUFzQjtBQUNwQixRQUFLLE9BQU9BLEVBQUUyRSxPQUFkLEVBQXdCO0FBQUU7QUFDeEJqRixTQUFHZ0MsTUFBSCxDQUFVNkIsSUFBVixHQUFpQjdELEdBQUdrRixNQUFILENBQVVyQixJQUFWLEdBQWlCLEtBQWxDO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLE1BQUtsQyxLQUFMLEVBQTBDO0FBQ3hDM0IsT0FBR21GLFNBQUgsR0FBZUgsT0FBZjtBQUNELEdBRkQsTUFFTztBQUNMckUsYUFBU2lCLGdCQUFULENBQTJCLE9BQTNCLEVBQXFDb0QsT0FBckM7QUFDRDtBQUNGLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQ0ZlSSxhLEdBQUFBLGE7UUFTQWhFLFcsR0FBQUEsVzs7QUFwQmhCOztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BLElBQU1pRSxTQUFTLDRCQUFmOztBQUVBO0FBQ0E7Ozs7O0FBS08sU0FBU0QsYUFBVCxDQUF3QkUsSUFBeEIsRUFBK0JDLE9BQS9CLEVBQXlDO0FBQzlDLE1BQUtDLFNBQVNyQyxHQUFkLEVBQW9CO0FBQ2xCb0MsWUFBU0UsS0FBS0MsS0FBTCxDQUFZLHlCQUFnQnpCLFFBQWhCLENBQVosQ0FBVDtBQUNEO0FBQ0Y7O0FBRUQ7OztBQUdPLFNBQVM3QyxXQUFULEdBQXVCO0FBQzVCLGVBQUcwQyxLQUFILENBQVNLLElBQVQsR0FBZ0I3QyxlQUFlZCxRQUFmLEVBQWhCO0FBQ0EsZUFBR21GLGFBQUg7QUFDRDs7QUFFRDtBQUNBLElBQUtoRSxJQUFMLEVBQTBDO0FBQ3hDMEQsU0FBTzNELEVBQVAsQ0FBVyxTQUFYLEVBQXVCLFVBQUV6QixNQUFGLEVBQWE7QUFDbENBLFdBQU95QixFQUFQLENBQVcsY0FBWCxFQUE0QjBELGFBQTVCO0FBQ0FuRixXQUFPeUIsRUFBUCxDQUFXLFdBQVgsRUFBeUJOLFdBQXpCO0FBQ0QsR0FIRDtBQUlEOztrQkFFY2lFLE0iLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVzIOeugOWMliBzdG9yYWdlIOeahOebkeWQrOmAu+i+kVxuICovXG5cbmltcG9ydCBnZXRPcHRpb25zIGZyb20gJy4vZGVmYXVsdC1vcHRpb25zJztcblxuZXhwb3J0IGNvbnN0IGxpc3RlbmVycyA9IFtdO1xuXG4vKipcbiAqIOWUr+S4gOeahOS6i+S7tuWkhOeQhuWHveaVsOOAguS9v+eUqOatpOWHveaVsOWIhuWPkeS6i+S7tuOAglxuICogQHBhcmFtIHtPYmplY3R9IGNoYW5nZWRJdGVtc1xuICogQHBhcmFtIHtTdHJpbmd9IGFyZWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uU3RvcmFnZUNoYW5nZWQoIGNoYW5nZWRJdGVtcyAsIGFyZWEgKSB7XG4gIGNvbnN0IGNoYW5nZWROZXdWYWx1ZSA9IHt9O1xuXG4gIGZvciAoIGxldCBrZXkgaW4gY2hhbmdlZEl0ZW1zICkge1xuICAgIGNoYW5nZWROZXdWYWx1ZVsga2V5IF0gPSBjaGFuZ2VkSXRlbXNbIGtleSBdLm5ld1ZhbHVlO1xuICB9XG5cbiAgbGlzdGVuZXJzLmZvckVhY2goICggcmVhbExpc3RlbmVyICkgPT4ge1xuICAgIHJlYWxMaXN0ZW5lciggY2hhbmdlZE5ld1ZhbHVlICwgYXJlYSApO1xuICB9ICk7XG59XG5cbmNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lciggb25TdG9yYWdlQ2hhbmdlZCApO1xuXG5jb25zdCB7aXNBcnJheX0gPSBBcnJheTtcblxuLyoqXG4gKiDlhYjku44gc3RvcmFnZSDph4zor7vlj5bkuIDmrKHmlbDmja7lubbop6blj5Hlm57osIPlh73mlbAs54S25ZCO5Lya5oyB57ut55uR5ZCsIGNocm9tZS5zdG9yYWdlIOeahOWPmOWMluW5tuiwg+eUqOWbnuiwg+WHveaVsC5cbiAqIOivu+WPluaVsOaNruaXtuS8muiHquWKqOW4puS4ium7mOiupOWAvDvlm57osIPlh73mlbDku4XkvJrmjqXmlLbliLDmlrDlgLwuXG4gKiBAcGFyYW0ge1N0cmluZ3xTdHJpbmdbXX0ga2V5c1xuICogQHBhcmFtIHtTdHJpbmd8U3RyaW5nW119IFthcmVhc10gLSDopoHnm5HlkKznmoTlrZjlgqjljLrln58u6buY6K6k5Li6IGxvY2FsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogQHJldHVybnMge0Z1bmN0aW9ufSAtIOiwg+eUqOi/meS4quWHveaVsOWPr+S7peWIoOmZpOatpOebkeWQrOWHveaVsFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoIGtleXMgLCBhcmVhcyAsIGxpc3RlbmVyICkge1xuICBjb25zdCBfa2V5cyA9IGlzQXJyYXkoIGtleXMgKSA/IGtleXMgOiBbIGtleXMgXTtcblxuICBsZXQgX2FyZWFzICwgX2xpc3RlbmVyO1xuICBpZiAoIDMgPT09IGFyZ3VtZW50cy5sZW5ndGggKSB7XG4gICAgX2FyZWFzID0gaXNBcnJheSggYXJlYXMgKSA/IGFyZWFzIDogWyBhcmVhcyBdO1xuICAgIF9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB9IGVsc2Uge1xuICAgIF9saXN0ZW5lciA9IGFyZWFzO1xuICAgIF9hcmVhcyA9IFsgJ2xvY2FsJyBdO1xuICB9XG5cbiAgLy8g5YWI6K+75Y+W5pWw5o2u5bm26LCD55So5LiA5qyh5Zue6LCD5Ye95pWwXG4gIC8vIHRvZG8g5L2/55So5LiA5Liq5Y+C5pWw6Zi75q2i5q2k6buY6K6k6KGM5Li6XG4gIF9hcmVhcy5mb3JFYWNoKCAoIGFyZWEgKSA9PiB7XG4gICAgZ2V0T3B0aW9ucyggX2tleXMgLCBhcmVhICkudGhlbiggaXRlbXMgPT4gX2xpc3RlbmVyKCBpdGVtcyAsIGFyZWEgKSApO1xuICB9ICk7XG5cbiAgZnVuY3Rpb24gcmVhbExpc3RlbmVyKCBjaGFuZ2VzICwgYXJlYSApIHtcblxuICAgIC8vIOWmguaenOS6p+eUn+S6i+S7tueahOWMuuWfn+S4jeWcqOebkeWQrOeahOWMuuWfn+WIl+ihqOmHjOWImeebtOaOpei/lOWbnlxuICAgIGlmICggIV9hcmVhcy5pbmNsdWRlcyggYXJlYSApICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIOS7heWMheWQq+ebkeWQrOeahOmUrlxuICAgIGNvbnN0IG15Q2hhbmdlcyA9IHt9O1xuXG4gICAgZm9yICggbGV0IGtleSBpbiBjaGFuZ2VzICkge1xuICAgICAgaWYgKCBfa2V5cy5pbmNsdWRlcygga2V5ICkgKSB7XG4gICAgICAgIG15Q2hhbmdlc1sga2V5IF0gPSBjaGFuZ2VzWyBrZXkgXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBteUNoYW5nZXMg5a+56LGh5LiN5piv56m655qE5YiZ6LCD55So55uR5ZCs5Ye95pWwXG4gICAgZm9yICggbGV0IGhhc015Q2hhbmdlIGluIG15Q2hhbmdlcyApIHtcbiAgICAgIF9saXN0ZW5lciggbXlDaGFuZ2VzICwgYXJlYSApO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbGlzdGVuZXJzLnB1c2goIHJlYWxMaXN0ZW5lciApO1xuXG4gIHJldHVybiAoKT0+IGxpc3RlbmVycy5zcGxpY2UoIGxpc3RlbmVycy5pbmRleE9mKCByZWFsTGlzdGVuZXIgKSAsIDEgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wdWJsaWMvc3RvcmFnZS13YXRjaGVyLmpzIiwiaW1wb3J0IHtjcmVhdGVDbGllbnR9IGZyb20gJ2Nvbm5lY3QuaW8nO1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ2xpZW50KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2NsaWVudC5qcyIsImltcG9ydCBjbGllbnQgZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCBXaWRnZXQgZnJvbSAnLi4vLi4vcHVibGljL3dpZGdldC9pbmRleCc7XG5cbmltcG9ydCBkcmFnZ2FibGUgZnJvbSAnLi9kcmFnZ2FibGUnO1xuaW1wb3J0IGJpbmRTdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQgYmluZEdBIGZyb20gJy4vZ2EnO1xuaW1wb3J0IGhpZGVPbkVzYyBmcm9tICcuL2hpZGUtb24tZXNjJztcbi8vIFRPRE86IOWKn+iDveacqua1i+ivle+8jOWFiOaaguaXtuazqOmHiuaOiVxuLy8gaW1wb3J0ICcuL3NoYW5iYXknXG5cbmNvbnN0IHN0ID0gbmV3IFdpZGdldCggeyBjbGllbnQgfSApO1xuXG5kcmFnZ2FibGUoIHN0ICk7XG5iaW5kU3RvcmFnZSggc3QgKTtcbmJpbmRHQSggc3QgKTtcbmhpZGVPbkVzYyggc3QgKTtcblxuZXhwb3J0IGRlZmF1bHQgc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL3N0L2luZGV4LmpzIiwid2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZCh3aW5kb3cpXG53aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUuYmluZCh3aW5kb3cpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9maXJlZm94LWZpeC5qcyIsImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuXG5pbXBvcnQgc3QgZnJvbSAnLi9zdCc7XG5pbXBvcnQgc2VydmVyIGZyb20gJy4vc2VydmVyJztcbmltcG9ydCB7bm9vcH0gZnJvbSAnLi4vcHVibGljL3V0aWwnO1xuaW1wb3J0IGdldE9wdGlvbnMgZnJvbSAnLi4vcHVibGljL2RlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQgY2xpZW50IGZyb20gJy4vY2xpZW50JztcblxuY29uc3QgTU9VU0VfVVAgPSAnbW91c2V1cCdcbiAgLCBzZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb24oKTtcblxuLyoqXG4gKiBtb3VzZXVwIOS6i+S7tuebkeWQrOWHveaVsO+8jOeUqOS6juajgOa1i+eUqOaIt+esrOS4gOasoeS6p+eUn+aLluiTneeahOWKqOS9nFxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaXJzdE1vdXNlVXAoIGUgKSB7XG4gIGlmICggc2VsZWN0aW9uLnRvU3RyaW5nKCkudHJpbSgpICkge1xuICAgIHJlbW92ZUZpcnN0TW91c2VVcCgpO1xuXG4gICAgaWYgKCAndHJ1ZScgPT09IGRvY3VtZW50LmJvZHkuY29udGVudEVkaXRhYmxlICkge1xuICAgICAgY2xpZW50LnNlbmQoICdnYScgLCBbICdzZW5kJyAsICdldmVudCcgLCAnYm9keSDlj6/nvJbovpHnmoTmg4XlhrUnIF0gKTtcbiAgICAgIGNvbnN0IHtkaXNhYmxlSW5FZGl0YWJsZX0gPSBhd2FpdCBnZXRPcHRpb25zKCAnZGlzYWJsZUluRWRpdGFibGUnICk7XG4gICAgICBpZiAoIGRpc2FibGVJbkVkaXRhYmxlICkge1xuICAgICAgICBzdC4kZGVzdHJveSgpO1xuICAgICAgICBjbGllbnQuc2VuZCggJ2dhJyAsIFsgJ3NlbmQnICwgJ2V2ZW50JyAsICdib2R5IOWPr+e8lui+keeahOaDheWGtScgLCAn5ZyoIGJvZHkg5Y+v57yW6L6R55qE5oOF5Ya15LiL5YGc55So5LqGJyBdICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdC4kYXBwZW5kVG8oICdib2R5JyApO1xuICAgIHN0LiRlbWl0KCAnbW91c2V1cCcgLCBlICk7XG4gIH1cbn1cblxuLyoqXG4gKiDlj5bmtojlr7nkuIrpnaLnmoQgbW91c2VVcCDkuovku7bnmoTnm5HlkKzjgIJcbiAqIOeUqOaIt+eahOWFtuS7luaTjeS9nOWQr+WKqOS6hiBzdCDkuYvlkI7lsLHkuI3pnIDopoHnu6fnu63nm5HlkKwgbW91c2V1cCDkuovku7bkuoZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZpcnN0TW91c2VVcCgpIHtcbiAgcmVtb3ZlRmlyc3RNb3VzZVVwID0gbm9vcDtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggTU9VU0VfVVAgLCBmaXJzdE1vdXNlVXAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVHJhbnNsYXRlKCkge1xuICByZW1vdmVGaXJzdE1vdXNlVXAoKTtcbiAgc3QuJGFwcGVuZFRvKCAnYm9keScgKTtcbiAgc2VydmVyLnJlbW92ZUxpc3RlbmVyKCAnY29ubmVjdCcgLCBvbkNvbm5lY3QgKTtcbn1cblxuLyoqXG4gKiDnrKzkuIDmrKHmlLbliLDnv7vor5Hlkb3ku6Tml7bop6PpmaQgbW91c2UgdXAg5LqL5Lu255qE5qOA5rWL5qOA5rWLXG4gKiBAcGFyYW0gY2xpZW50XG4gKi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBvbkNvbm5lY3QoIGNsaWVudCApIHtcbiAgY2xpZW50Lm9uKCAndHJhbnNsYXRlJyAsIG9uVHJhbnNsYXRlICk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3RpbmcnICkge1xuICBzZXJ2ZXIub24oICdjb25uZWN0JyAsIG9uQ29ubmVjdCApO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBNT1VTRV9VUCAsIGZpcnN0TW91c2VVcCApO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luZGV4LmpzIiwiLyoqXG4gKiBAZmlsZXMg6K6p57+76K+R56qX5Y+j5Y+v5ouW5YqoXG4gKi9cblxuaW1wb3J0IGludGVyYWN0IGZyb20gJ2ludGVyYWN0LmpzJztcbmltcG9ydCByZXN0cmljdEJveCBmcm9tICcuL3Jlc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCBzdCApIHtcblxuICBmdW5jdGlvbiByZXN0cmljdCgpIHtcbiAgICByZXN0cmljdEJveCggc3QgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTW92ZSggZXZlbnQgKSB7XG4gICAgY29uc3Qge2JveFBvc30gPSBzdDtcbiAgICBib3hQb3MudHJhbnNsYXRlWCArPSBldmVudC5keDtcbiAgICBib3hQb3MudHJhbnNsYXRlWSArPSBldmVudC5keTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0aW5nJyApIHtcbiAgICBzdC5fX3Jlc3RyaWN0ID0gcmVzdHJpY3Q7XG4gICAgc3QuX19vbk1vdmUgPSBvbk1vdmU7XG4gIH0gZWxzZSB7XG4gICAgc3QuJG9uKCAnYWZ0ZXIgdHJhbnNsYXRlJyAsICgpPT4ge1xuICAgICAgc3QuJG5leHRUaWNrKCByZXN0cmljdCApO1xuICAgIH0gKTtcblxuICAgIGludGVyYWN0KCBzdC4kZWxzLnN0RHJhZyApXG4gICAgICAuc3R5bGVDdXJzb3IoIGZhbHNlIClcbiAgICAgIC5kcmFnZ2FibGUoIHtcbiAgICAgICAgb25tb3ZlIDogb25Nb3ZlICxcbiAgICAgICAgb25lbmQgOiByZXN0cmljdFxuICAgICAgfSApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL3N0L2RyYWdnYWJsZS5qcyIsIi8qKlxuICogaW50ZXJhY3QuanMgdjEuMi44XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyLTIwMTUgVGF5ZSBBZGV5ZW1pIDxkZXZAdGF5ZS5tZT5cbiAqIE9wZW4gc291cmNlIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vdGF5ZS9pbnRlcmFjdC5qcy9tYXN0ZXIvTElDRU5TRVxuICovXG4oZnVuY3Rpb24gKHJlYWxXaW5kb3cpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyByZXR1cm4gZWFybHkgaWYgdGhlcmUncyBubyB3aW5kb3cgdG8gd29yayB3aXRoIChlZy4gTm9kZS5qcylcbiAgICBpZiAoIXJlYWxXaW5kb3cpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgLy8gZ2V0IHdyYXBwZWQgd2luZG93IGlmIHVzaW5nIFNoYWRvdyBET00gcG9seWZpbGxcbiAgICAgICAgd2luZG93ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIFRleHROb2RlXG4gICAgICAgICAgICB2YXIgZWwgPSByZWFsV2luZG93LmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQncyB3cmFwcGVkIGJ5IGEgcG9seWZpbGxcbiAgICAgICAgICAgIGlmIChlbC5vd25lckRvY3VtZW50ICE9PSByZWFsV2luZG93LmRvY3VtZW50XG4gICAgICAgICAgICAgICAgJiYgdHlwZW9mIHJlYWxXaW5kb3cud3JhcCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICYmIHJlYWxXaW5kb3cud3JhcChlbCkgPT09IGVsKSB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHdyYXBwZWQgd2luZG93XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWxXaW5kb3cud3JhcChyZWFsV2luZG93KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm8gU2hhZG93IERPTSBwb2x5ZmlsIG9yIG5hdGl2ZSBpbXBsZW1lbnRhdGlvblxuICAgICAgICAgICAgcmV0dXJuIHJlYWxXaW5kb3c7XG4gICAgICAgIH0oKSksXG5cbiAgICAgICAgZG9jdW1lbnQgICAgICAgICAgID0gd2luZG93LmRvY3VtZW50LFxuICAgICAgICBEb2N1bWVudEZyYWdtZW50ICAgPSB3aW5kb3cuRG9jdW1lbnRGcmFnbWVudCAgIHx8IGJsYW5rLFxuICAgICAgICBTVkdFbGVtZW50ICAgICAgICAgPSB3aW5kb3cuU1ZHRWxlbWVudCAgICAgICAgIHx8IGJsYW5rLFxuICAgICAgICBTVkdTVkdFbGVtZW50ICAgICAgPSB3aW5kb3cuU1ZHU1ZHRWxlbWVudCAgICAgIHx8IGJsYW5rLFxuICAgICAgICBTVkdFbGVtZW50SW5zdGFuY2UgPSB3aW5kb3cuU1ZHRWxlbWVudEluc3RhbmNlIHx8IGJsYW5rLFxuICAgICAgICBIVE1MRWxlbWVudCAgICAgICAgPSB3aW5kb3cuSFRNTEVsZW1lbnQgICAgICAgIHx8IHdpbmRvdy5FbGVtZW50LFxuXG4gICAgICAgIFBvaW50ZXJFdmVudCA9ICh3aW5kb3cuUG9pbnRlckV2ZW50IHx8IHdpbmRvdy5NU1BvaW50ZXJFdmVudCksXG4gICAgICAgIHBFdmVudFR5cGVzLFxuXG4gICAgICAgIGh5cG90ID0gTWF0aC5oeXBvdCB8fCBmdW5jdGlvbiAoeCwgeSkgeyByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpOyB9LFxuXG4gICAgICAgIHRtcFhZID0ge30sICAgICAvLyByZWR1Y2Ugb2JqZWN0IGNyZWF0aW9uIGluIGdldFhZKClcblxuICAgICAgICBkb2N1bWVudHMgICAgICAgPSBbXSwgICAvLyBhbGwgZG9jdW1lbnRzIGJlaW5nIGxpc3RlbmVkIHRvXG5cbiAgICAgICAgaW50ZXJhY3RhYmxlcyAgID0gW10sICAgLy8gYWxsIHNldCBpbnRlcmFjdGFibGVzXG4gICAgICAgIGludGVyYWN0aW9ucyAgICA9IFtdLCAgIC8vIGFsbCBpbnRlcmFjdGlvbnNcblxuICAgICAgICBkeW5hbWljRHJvcCAgICAgPSBmYWxzZSxcblxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICAgdHlwZToge1xuICAgICAgICAvLyAgICAgICAgICBzZWxlY3RvcnM6IFsnc2VsZWN0b3InLCAuLi5dLFxuICAgICAgICAvLyAgICAgICAgICBjb250ZXh0cyA6IFtkb2N1bWVudCwgLi4uXSxcbiAgICAgICAgLy8gICAgICAgICAgbGlzdGVuZXJzOiBbW2xpc3RlbmVyLCB1c2VDYXB0dXJlXSwgLi4uXVxuICAgICAgICAvLyAgICAgIH1cbiAgICAgICAgLy8gIH1cbiAgICAgICAgZGVsZWdhdGVkRXZlbnRzID0ge30sXG5cbiAgICAgICAgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgICAgICAgYWNjZXB0ICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgYWN0aW9uQ2hlY2tlciA6IG51bGwsXG4gICAgICAgICAgICAgICAgc3R5bGVDdXJzb3IgICA6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBvcmlnaW4gICAgICAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICAgICAgZGVsdGFTb3VyY2UgICA6ICdwYWdlJyxcbiAgICAgICAgICAgICAgICBhbGxvd0Zyb20gICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBpZ25vcmVGcm9tICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBfY29udGV4dCAgICAgIDogZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgZHJvcENoZWNrZXIgICA6IG51bGxcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRyYWc6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtYW51YWxTdGFydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgICAgICAgICAgIG1heFBlckVsZW1lbnQ6IDEsXG5cbiAgICAgICAgICAgICAgICBzbmFwOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiBudWxsLFxuICAgICAgICAgICAgICAgIGluZXJ0aWE6IG51bGwsXG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbDogbnVsbCxcblxuICAgICAgICAgICAgICAgIGF4aXM6ICd4eSdcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRyb3A6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhY2NlcHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgb3ZlcmxhcDogJ3BvaW50ZXInXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZXNpemU6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtYW51YWxTdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICBtYXhQZXJFbGVtZW50OiAxLFxuXG4gICAgICAgICAgICAgICAgc25hcDogbnVsbCxcbiAgICAgICAgICAgICAgICByZXN0cmljdDogbnVsbCxcbiAgICAgICAgICAgICAgICBpbmVydGlhOiBudWxsLFxuICAgICAgICAgICAgICAgIGF1dG9TY3JvbGw6IG51bGwsXG5cbiAgICAgICAgICAgICAgICBzcXVhcmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgICAgICAgICAgIGF4aXM6ICd4eScsXG5cbiAgICAgICAgICAgICAgICAvLyB1c2UgZGVmYXVsdCBtYXJnaW5cbiAgICAgICAgICAgICAgICBtYXJnaW46IE5hTixcblxuICAgICAgICAgICAgICAgIC8vIG9iamVjdCB3aXRoIHByb3BzIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSB3aGljaCBhcmVcbiAgICAgICAgICAgICAgICAvLyB0cnVlL2ZhbHNlIHZhbHVlcyB0byByZXNpemUgd2hlbiB0aGUgcG9pbnRlciBpcyBvdmVyIHRoYXQgZWRnZSxcbiAgICAgICAgICAgICAgICAvLyBDU1Mgc2VsZWN0b3JzIHRvIG1hdGNoIHRoZSBoYW5kbGVzIGZvciBlYWNoIGRpcmVjdGlvblxuICAgICAgICAgICAgICAgIC8vIG9yIHRoZSBFbGVtZW50cyBmb3IgZWFjaCBoYW5kbGVcbiAgICAgICAgICAgICAgICBlZGdlczogbnVsbCxcblxuICAgICAgICAgICAgICAgIC8vIGEgdmFsdWUgb2YgJ25vbmUnIHdpbGwgbGltaXQgdGhlIHJlc2l6ZSByZWN0IHRvIGEgbWluaW11bSBvZiAweDBcbiAgICAgICAgICAgICAgICAvLyAnbmVnYXRlJyB3aWxsIGFsb3cgdGhlIHJlY3QgdG8gaGF2ZSBuZWdhdGl2ZSB3aWR0aC9oZWlnaHRcbiAgICAgICAgICAgICAgICAvLyAncmVwb3NpdGlvbicgd2lsbCBrZWVwIHRoZSB3aWR0aC9oZWlnaHQgcG9zaXRpdmUgYnkgc3dhcHBpbmdcbiAgICAgICAgICAgICAgICAvLyB0aGUgdG9wIGFuZCBib3R0b20gZWRnZXMgYW5kL29yIHN3YXBwaW5nIHRoZSBsZWZ0IGFuZCByaWdodCBlZGdlc1xuICAgICAgICAgICAgICAgIGludmVydDogJ25vbmUnXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXN0dXJlOiB7XG4gICAgICAgICAgICAgICAgbWFudWFsU3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1heDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgbWF4UGVyRWxlbWVudDogMSxcblxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiBudWxsXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwZXJBY3Rpb246IHtcbiAgICAgICAgICAgICAgICBtYW51YWxTdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICBtYXhQZXJFbGVtZW50OiAxLFxuXG4gICAgICAgICAgICAgICAgc25hcDoge1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVkICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlbmRPbmx5ICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICByYW5nZSAgICAgICA6IEluZmluaXR5LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldHMgICAgIDogbnVsbCxcblxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBvaW50czogbnVsbFxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICByZXN0cmljdDoge1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZW5kT25seTogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbDoge1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVkICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgICA6IG51bGwsICAgICAvLyB0aGUgaXRlbSB0aGF0IGlzIHNjcm9sbGVkIChXaW5kb3cgb3IgSFRNTEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbiAgICAgIDogNjAsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkICAgICAgIDogMzAwICAgICAgIC8vIHRoZSBzY3JvbGwgc3BlZWQgaW4gcGl4ZWxzIHBlciBzZWNvbmRcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaW5lcnRpYToge1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVkICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHJlc2lzdGFuY2UgICAgICAgOiAxMCwgICAgLy8gdGhlIGxhbWJkYSBpbiBleHBvbmVudGlhbCBkZWNheVxuICAgICAgICAgICAgICAgICAgICBtaW5TcGVlZCAgICAgICAgIDogMTAwLCAgIC8vIHRhcmdldCBzcGVlZCBtdXN0IGJlIGFib3ZlIHRoaXMgZm9yIGluZXJ0aWEgdG8gc3RhcnRcbiAgICAgICAgICAgICAgICAgICAgZW5kU3BlZWQgICAgICAgICA6IDEwLCAgICAvLyB0aGUgc3BlZWQgYXQgd2hpY2ggaW5lcnRpYSBpcyBzbG93IGVub3VnaCB0byBzdG9wXG4gICAgICAgICAgICAgICAgICAgIGFsbG93UmVzdW1lICAgICAgOiB0cnVlLCAgLy8gYWxsb3cgcmVzdW1pbmcgYW4gYWN0aW9uIGluIGluZXJ0aWEgcGhhc2VcbiAgICAgICAgICAgICAgICAgICAgemVyb1Jlc3VtZURlbHRhICA6IHRydWUsICAvLyBpZiBhbiBhY3Rpb24gaXMgcmVzdW1lZCBhZnRlciBsYXVuY2gsIHNldCBkeC9keSB0byAwXG4gICAgICAgICAgICAgICAgICAgIHNtb290aEVuZER1cmF0aW9uOiAzMDAgICAgLy8gYW5pbWF0ZSB0byBzbmFwL3Jlc3RyaWN0IGVuZE9ubHkgaWYgdGhlcmUncyBubyBpbmVydGlhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgX2hvbGREdXJhdGlvbjogNjAwXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVGhpbmdzIHJlbGF0ZWQgdG8gYXV0b1Njcm9sbFxuICAgICAgICBhdXRvU2Nyb2xsID0ge1xuICAgICAgICAgICAgaW50ZXJhY3Rpb246IG51bGwsXG4gICAgICAgICAgICBpOiBudWxsLCAgICAvLyB0aGUgaGFuZGxlIHJldHVybmVkIGJ5IHdpbmRvdy5zZXRJbnRlcnZhbFxuICAgICAgICAgICAgeDogMCwgeTogMCwgLy8gRGlyZWN0aW9uIGVhY2ggcHVsc2UgaXMgdG8gc2Nyb2xsIGluXG5cbiAgICAgICAgICAgIC8vIHNjcm9sbCB0aGUgd2luZG93IGJ5IHRoZSB2YWx1ZXMgaW4gc2Nyb2xsLngveVxuICAgICAgICAgICAgc2Nyb2xsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBhdXRvU2Nyb2xsLmludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2F1dG9TY3JvbGwuaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uYXV0b1Njcm9sbCxcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgfHwgZ2V0V2luZG93KGF1dG9TY3JvbGwuaW50ZXJhY3Rpb24uZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgaW4gdGltZSBpbiBzZWNvbmRzXG4gICAgICAgICAgICAgICAgICAgIGR0eCA9IChub3cgLSBhdXRvU2Nyb2xsLnByZXZUaW1lWCkgLyAxMDAwLFxuICAgICAgICAgICAgICAgICAgICBkdHkgPSAobm93IC0gYXV0b1Njcm9sbC5wcmV2VGltZVkpIC8gMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgdngsIHZ5LCBzeCwgc3k7XG5cbiAgICAgICAgICAgICAgICAvLyBkaXNwbGFjZW1lbnRcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy52ZWxvY2l0eSkge1xuICAgICAgICAgICAgICAgICAgdnggPSBvcHRpb25zLnZlbG9jaXR5Lng7XG4gICAgICAgICAgICAgICAgICB2eSA9IG9wdGlvbnMudmVsb2NpdHkueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICB2eCA9IHZ5ID0gb3B0aW9ucy5zcGVlZFxuICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICBzeCA9IHZ4ICogZHR4O1xuICAgICAgICAgICAgICAgIHN5ID0gdnkgKiBkdHk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3ggPj0gMSB8fCBzeSA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1dpbmRvdyhjb250YWluZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuc2Nyb2xsQnkoYXV0b1Njcm9sbC54ICogc3gsIGF1dG9TY3JvbGwueSAqIHN5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxMZWZ0ICs9IGF1dG9TY3JvbGwueCAqIHN4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCAgKz0gYXV0b1Njcm9sbC55ICogc3k7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ggPj0xKSBhdXRvU2Nyb2xsLnByZXZUaW1lWCA9IG5vdztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN5ID49IDEpIGF1dG9TY3JvbGwucHJldlRpbWVZID0gbm93O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEZyYW1lKGF1dG9TY3JvbGwuaSk7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9TY3JvbGwuaSA9IHJlcUZyYW1lKGF1dG9TY3JvbGwuc2Nyb2xsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpc1Njcm9sbGluZzogZmFsc2UsXG4gICAgICAgICAgICBwcmV2VGltZVg6IDAsXG4gICAgICAgICAgICBwcmV2VGltZVk6IDAsXG5cbiAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYW5jZWxGcmFtZShhdXRvU2Nyb2xsLmkpO1xuXG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbC5pbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xuICAgICAgICAgICAgICAgIGF1dG9TY3JvbGwucHJldlRpbWVYID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbC5wcmV2VGltZVkgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsLmkgPSByZXFGcmFtZShhdXRvU2Nyb2xsLnNjcm9sbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbC5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNhbmNlbEZyYW1lKGF1dG9TY3JvbGwuaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gRG9lcyB0aGUgYnJvd3NlciBzdXBwb3J0IHRvdWNoIGlucHV0P1xuICAgICAgICBzdXBwb3J0c1RvdWNoID0gKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpLFxuXG4gICAgICAgIC8vIERvZXMgdGhlIGJyb3dzZXIgc3VwcG9ydCBQb2ludGVyRXZlbnRzXG4gICAgICAgIC8vIEF2b2lkIFBvaW50ZXJFdmVudCBidWdzIGludHJvZHVjZWQgaW4gQ2hyb21lIDU1XG4gICAgICAgIHN1cHBvcnRzUG9pbnRlckV2ZW50ID0gUG9pbnRlckV2ZW50ICYmICEvQ2hyb21lLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxuXG4gICAgICAgIC8vIExlc3MgUHJlY2lzaW9uIHdpdGggdG91Y2ggaW5wdXRcbiAgICAgICAgbWFyZ2luID0gc3VwcG9ydHNUb3VjaCB8fCBzdXBwb3J0c1BvaW50ZXJFdmVudD8gMjA6IDEwLFxuXG4gICAgICAgIHBvaW50ZXJNb3ZlVG9sZXJhbmNlID0gMSxcblxuICAgICAgICAvLyBmb3IgaWdub3JpbmcgYnJvd3NlcidzIHNpbXVsYXRlZCBtb3VzZSBldmVudHNcbiAgICAgICAgcHJldlRvdWNoVGltZSA9IDAsXG5cbiAgICAgICAgLy8gQWxsb3cgdGhpcyBtYW55IGludGVyYWN0aW9ucyB0byBoYXBwZW4gc2ltdWx0YW5lb3VzbHlcbiAgICAgICAgbWF4SW50ZXJhY3Rpb25zID0gSW5maW5pdHksXG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXMgSUU5IG9yIG9sZGVyXG4gICAgICAgIGFjdGlvbkN1cnNvcnMgPSAoZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYikgPyB7XG4gICAgICAgICAgICBkcmFnICAgIDogJ21vdmUnLFxuICAgICAgICAgICAgcmVzaXpleCA6ICdlLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemV5IDogJ3MtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZXh5OiAnc2UtcmVzaXplJyxcblxuICAgICAgICAgICAgcmVzaXpldG9wICAgICAgICA6ICduLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemVsZWZ0ICAgICAgIDogJ3ctcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZWJvdHRvbSAgICAgOiAncy1yZXNpemUnLFxuICAgICAgICAgICAgcmVzaXplcmlnaHQgICAgICA6ICdlLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemV0b3BsZWZ0ICAgIDogJ3NlLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemVib3R0b21yaWdodDogJ3NlLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemV0b3ByaWdodCAgIDogJ25lLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemVib3R0b21sZWZ0IDogJ25lLXJlc2l6ZScsXG5cbiAgICAgICAgICAgIGdlc3R1cmUgOiAnJ1xuICAgICAgICB9IDoge1xuICAgICAgICAgICAgZHJhZyAgICA6ICdtb3ZlJyxcbiAgICAgICAgICAgIHJlc2l6ZXggOiAnZXctcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZXkgOiAnbnMtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZXh5OiAnbndzZS1yZXNpemUnLFxuXG4gICAgICAgICAgICByZXNpemV0b3AgICAgICAgIDogJ25zLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemVsZWZ0ICAgICAgIDogJ2V3LXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemVib3R0b20gICAgIDogJ25zLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemVyaWdodCAgICAgIDogJ2V3LXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemV0b3BsZWZ0ICAgIDogJ253c2UtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZWJvdHRvbXJpZ2h0OiAnbndzZS1yZXNpemUnLFxuICAgICAgICAgICAgcmVzaXpldG9wcmlnaHQgICA6ICduZXN3LXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemVib3R0b21sZWZ0IDogJ25lc3ctcmVzaXplJyxcblxuICAgICAgICAgICAgZ2VzdHVyZSA6ICcnXG4gICAgICAgIH0sXG5cbiAgICAgICAgYWN0aW9uSXNFbmFibGVkID0ge1xuICAgICAgICAgICAgZHJhZyAgIDogdHJ1ZSxcbiAgICAgICAgICAgIHJlc2l6ZSA6IHRydWUsXG4gICAgICAgICAgICBnZXN0dXJlOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gYmVjYXVzZSBXZWJraXQgYW5kIE9wZXJhIHN0aWxsIHVzZSAnbW91c2V3aGVlbCcgZXZlbnQgdHlwZVxuICAgICAgICB3aGVlbEV2ZW50ID0gJ29ubW91c2V3aGVlbCcgaW4gZG9jdW1lbnQ/ICdtb3VzZXdoZWVsJzogJ3doZWVsJyxcblxuICAgICAgICBldmVudFR5cGVzID0gW1xuICAgICAgICAgICAgJ2RyYWdzdGFydCcsXG4gICAgICAgICAgICAnZHJhZ21vdmUnLFxuICAgICAgICAgICAgJ2RyYWdpbmVydGlhc3RhcnQnLFxuICAgICAgICAgICAgJ2RyYWdlbmQnLFxuICAgICAgICAgICAgJ2RyYWdlbnRlcicsXG4gICAgICAgICAgICAnZHJhZ2xlYXZlJyxcbiAgICAgICAgICAgICdkcm9wYWN0aXZhdGUnLFxuICAgICAgICAgICAgJ2Ryb3BkZWFjdGl2YXRlJyxcbiAgICAgICAgICAgICdkcm9wbW92ZScsXG4gICAgICAgICAgICAnZHJvcCcsXG4gICAgICAgICAgICAncmVzaXplc3RhcnQnLFxuICAgICAgICAgICAgJ3Jlc2l6ZW1vdmUnLFxuICAgICAgICAgICAgJ3Jlc2l6ZWluZXJ0aWFzdGFydCcsXG4gICAgICAgICAgICAncmVzaXplZW5kJyxcbiAgICAgICAgICAgICdnZXN0dXJlc3RhcnQnLFxuICAgICAgICAgICAgJ2dlc3R1cmVtb3ZlJyxcbiAgICAgICAgICAgICdnZXN0dXJlaW5lcnRpYXN0YXJ0JyxcbiAgICAgICAgICAgICdnZXN0dXJlZW5kJyxcblxuICAgICAgICAgICAgJ2Rvd24nLFxuICAgICAgICAgICAgJ21vdmUnLFxuICAgICAgICAgICAgJ3VwJyxcbiAgICAgICAgICAgICdjYW5jZWwnLFxuICAgICAgICAgICAgJ3RhcCcsXG4gICAgICAgICAgICAnZG91YmxldGFwJyxcbiAgICAgICAgICAgICdob2xkJ1xuICAgICAgICBdLFxuXG4gICAgICAgIGdsb2JhbEV2ZW50cyA9IHt9LFxuXG4gICAgICAgIC8vIE9wZXJhIE1vYmlsZSBtdXN0IGJlIGhhbmRsZWQgZGlmZmVyZW50bHlcbiAgICAgICAgaXNPcGVyYU1vYmlsZSA9IG5hdmlnYXRvci5hcHBOYW1lID09ICdPcGVyYScgJiZcbiAgICAgICAgICAgIHN1cHBvcnRzVG91Y2ggJiZcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goJ1ByZXN0bycpLFxuXG4gICAgICAgIC8vIHNjcm9sbGluZyBkb2Vzbid0IGNoYW5nZSB0aGUgcmVzdWx0IG9mIGdldENsaWVudFJlY3RzIG9uIGlPUyA3XG4gICAgICAgIGlzSU9TNyA9ICgvaVAoaG9uZXxvZHxhZCkvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICYmIC9PUyA3W15cXGRdLy50ZXN0KG5hdmlnYXRvci5hcHBWZXJzaW9uKSksXG5cbiAgICAgICAgLy8gcHJlZml4IG1hdGNoZXNTZWxlY3RvclxuICAgICAgICBwcmVmaXhlZE1hdGNoZXNTZWxlY3RvciA9ICdtYXRjaGVzJyBpbiBFbGVtZW50LnByb3RvdHlwZT9cbiAgICAgICAgICAgICAgICAnbWF0Y2hlcyc6ICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InIGluIEVsZW1lbnQucHJvdG90eXBlP1xuICAgICAgICAgICAgICAgICAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJzogJ21vek1hdGNoZXNTZWxlY3RvcicgaW4gRWxlbWVudC5wcm90b3R5cGU/XG4gICAgICAgICAgICAgICAgICAgICAgICAnbW96TWF0Y2hlc1NlbGVjdG9yJzogJ29NYXRjaGVzU2VsZWN0b3InIGluIEVsZW1lbnQucHJvdG90eXBlP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvTWF0Y2hlc1NlbGVjdG9yJzogJ21zTWF0Y2hlc1NlbGVjdG9yJyxcblxuICAgICAgICAvLyB3aWxsIGJlIHBvbHlmaWxsIGZ1bmN0aW9uIGlmIGJyb3dzZXIgaXMgSUU4XG4gICAgICAgIGllOE1hdGNoZXNTZWxlY3RvcixcblxuICAgICAgICAvLyBuYXRpdmUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIG9yIHBvbHlmaWxsXG4gICAgICAgIHJlcUZyYW1lID0gcmVhbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gICAgICAgIGNhbmNlbEZyYW1lID0gcmVhbFdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSxcblxuICAgICAgICAvLyBFdmVudHMgd3JhcHBlclxuICAgICAgICBldmVudHMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHVzZUF0dGFjaEV2ZW50ID0gKCdhdHRhY2hFdmVudCcgaW4gd2luZG93KSAmJiAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpLFxuICAgICAgICAgICAgICAgIGFkZEV2ZW50ICAgICAgID0gdXNlQXR0YWNoRXZlbnQ/ICAnYXR0YWNoRXZlbnQnOiAnYWRkRXZlbnRMaXN0ZW5lcicsXG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQgICAgPSB1c2VBdHRhY2hFdmVudD8gICdkZXRhY2hFdmVudCc6ICdyZW1vdmVFdmVudExpc3RlbmVyJyxcbiAgICAgICAgICAgICAgICBvbiAgICAgICAgICAgICA9IHVzZUF0dGFjaEV2ZW50PyAnb24nOiAnJyxcblxuICAgICAgICAgICAgICAgIGVsZW1lbnRzICAgICAgICAgID0gW10sXG4gICAgICAgICAgICAgICAgdGFyZ2V0cyAgICAgICAgICAgPSBbXSxcbiAgICAgICAgICAgICAgICBhdHRhY2hlZExpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGQgKGVsZW1lbnQsIHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRJbmRleCA9IGluZGV4T2YoZWxlbWVudHMsIGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRzW2VsZW1lbnRJbmRleF07XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNvdW50OiAwXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudEluZGV4ID0gZWxlbWVudHMucHVzaChlbGVtZW50KSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMucHVzaCh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkTGlzdGVuZXJzLnB1c2goKHVzZUF0dGFjaEV2ZW50ID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBsaWVkOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVkIDogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlQ291bnQ6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICB9IDogbnVsbCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0LmV2ZW50c1t0eXBlXSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZXZlbnRzW3R5cGVdID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC50eXBlQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5zKHRhcmdldC5ldmVudHNbdHlwZV0sIGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VBdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGF0dGFjaGVkTGlzdGVuZXJzW2VsZW1lbnRJbmRleF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJJbmRleCA9IGluZGV4T2YobGlzdGVuZXJzLnN1cHBsaWVkLCBsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkID0gbGlzdGVuZXJzLndyYXBwZWRbbGlzdGVuZXJJbmRleF0gfHwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFldmVudC5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gZXZlbnQuc3JjRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgPSBldmVudC5wcmV2ZW50RGVmYXVsdCB8fCBwcmV2ZW50RGVmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24gPSBldmVudC5zdG9wUHJvcGFnYXRpb24gfHwgc3RvcFByb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiB8fCBzdG9wSW1tUHJvcDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoL21vdXNlfGNsaWNrLy50ZXN0KGV2ZW50LnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wYWdlWCA9IGV2ZW50LmNsaWVudFggKyBnZXRXaW5kb3coZWxlbWVudCkuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wYWdlWSA9IGV2ZW50LmNsaWVudFkgKyBnZXRXaW5kb3coZWxlbWVudCkuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBlbGVtZW50W2FkZEV2ZW50XShvbiArIHR5cGUsIHdyYXBwZWQsIEJvb2xlYW4odXNlQ2FwdHVyZSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3VwcGxpZWQucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLndyYXBwZWQucHVzaCh3cmFwcGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMudXNlQ291bnQucHVzaCgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy51c2VDb3VudFtsaXN0ZW5lckluZGV4XSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gZWxlbWVudFthZGRFdmVudF0odHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUgfHwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZSAoZWxlbWVudCwgdHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudEluZGV4ID0gaW5kZXhPZihlbGVtZW50cywgZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldHNbZWxlbWVudEluZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lckluZGV4LFxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVkID0gbGlzdGVuZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCB8fCAhdGFyZ2V0LmV2ZW50cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHVzZUF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGF0dGFjaGVkTGlzdGVuZXJzW2VsZW1lbnRJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVySW5kZXggPSBpbmRleE9mKGxpc3RlbmVycy5zdXBwbGllZCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVkID0gbGlzdGVuZXJzLndyYXBwZWRbbGlzdGVuZXJJbmRleF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdhbGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodHlwZSBpbiB0YXJnZXQuZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmV2ZW50cy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZShlbGVtZW50LCB0eXBlLCAnYWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuZXZlbnRzW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW4gPSB0YXJnZXQuZXZlbnRzW3R5cGVdLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09ICdhbGwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUoZWxlbWVudCwgdHlwZSwgdGFyZ2V0LmV2ZW50c1t0eXBlXVtpXSwgQm9vbGVhbih1c2VDYXB0dXJlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmV2ZW50c1t0eXBlXVtpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFtyZW1vdmVFdmVudF0ob24gKyB0eXBlLCB3cmFwcGVkLCB1c2VDYXB0dXJlIHx8IGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmV2ZW50c1t0eXBlXS5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZUF0dGFjaEV2ZW50ICYmIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnVzZUNvdW50W2xpc3RlbmVySW5kZXhdLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzLnVzZUNvdW50W2xpc3RlbmVySW5kZXhdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnN1cHBsaWVkLnNwbGljZShsaXN0ZW5lckluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMud3JhcHBlZC5zcGxpY2UobGlzdGVuZXJJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnVzZUNvdW50LnNwbGljZShsaXN0ZW5lckluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuZXZlbnRzW3R5cGVdICYmIHRhcmdldC5ldmVudHNbdHlwZV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZXZlbnRzW3R5cGVdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC50eXBlQ291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0LnR5cGVDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLnNwbGljZShlbGVtZW50SW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5zcGxpY2UoZWxlbWVudEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoZWRMaXN0ZW5lcnMuc3BsaWNlKGVsZW1lbnRJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBwcmV2ZW50RGVmICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN0b3BQcm9wICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN0b3BJbW1Qcm9wICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFkZDogYWRkLFxuICAgICAgICAgICAgICAgIHJlbW92ZTogcmVtb3ZlLFxuICAgICAgICAgICAgICAgIHVzZUF0dGFjaEV2ZW50OiB1c2VBdHRhY2hFdmVudCxcblxuICAgICAgICAgICAgICAgIF9lbGVtZW50czogZWxlbWVudHMsXG4gICAgICAgICAgICAgICAgX3RhcmdldHM6IHRhcmdldHMsXG4gICAgICAgICAgICAgICAgX2F0dGFjaGVkTGlzdGVuZXJzOiBhdHRhY2hlZExpc3RlbmVyc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSgpKTtcblxuICAgIGZ1bmN0aW9uIGJsYW5rICgpIHt9XG5cbiAgICBmdW5jdGlvbiBpc0VsZW1lbnQgKG8pIHtcbiAgICAgICAgaWYgKCFvIHx8ICh0eXBlb2YgbyAhPT0gJ29iamVjdCcpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHZhciBfd2luZG93ID0gZ2V0V2luZG93KG8pIHx8IHdpbmRvdztcblxuICAgICAgICByZXR1cm4gKC9vYmplY3R8ZnVuY3Rpb24vLnRlc3QodHlwZW9mIF93aW5kb3cuRWxlbWVudClcbiAgICAgICAgICAgID8gbyBpbnN0YW5jZW9mIF93aW5kb3cuRWxlbWVudCAvL0RPTTJcbiAgICAgICAgICAgIDogby5ub2RlVHlwZSA9PT0gMSAmJiB0eXBlb2Ygby5ub2RlTmFtZSA9PT0gXCJzdHJpbmdcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzV2luZG93ICh0aGluZykgeyByZXR1cm4gdGhpbmcgPT09IHdpbmRvdyB8fCAhISh0aGluZyAmJiB0aGluZy5XaW5kb3cpICYmICh0aGluZyBpbnN0YW5jZW9mIHRoaW5nLldpbmRvdyk7IH1cbiAgICBmdW5jdGlvbiBpc0RvY0ZyYWcgKHRoaW5nKSB7IHJldHVybiAhIXRoaW5nICYmIHRoaW5nIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudDsgfVxuICAgIGZ1bmN0aW9uIGlzQXJyYXkgKHRoaW5nKSB7XG4gICAgICAgIHJldHVybiBpc09iamVjdCh0aGluZylcbiAgICAgICAgICAgICAgICAmJiAodHlwZW9mIHRoaW5nLmxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICYmIGlzRnVuY3Rpb24odGhpbmcuc3BsaWNlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNPYmplY3QgICAodGhpbmcpIHsgcmV0dXJuICEhdGhpbmcgJiYgKHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCcpOyB9XG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbiAodGhpbmcpIHsgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJzsgfVxuICAgIGZ1bmN0aW9uIGlzTnVtYmVyICAgKHRoaW5nKSB7IHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdudW1iZXInICA7IH1cbiAgICBmdW5jdGlvbiBpc0Jvb2wgICAgICh0aGluZykgeyByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnYm9vbGVhbicgOyB9XG4gICAgZnVuY3Rpb24gaXNTdHJpbmcgICAodGhpbmcpIHsgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ3N0cmluZycgIDsgfVxuXG4gICAgZnVuY3Rpb24gdHJ5U2VsZWN0b3IgKHZhbHVlKSB7XG4gICAgICAgIGlmICghaXNTdHJpbmcodmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHJhaXNlZCBpZiBpdCBpcyBpbnZhbGlkXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFsdWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmQgKGRlc3QsIHNvdXJjZSkge1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgZGVzdFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9XG5cbiAgICB2YXIgcHJlZml4ZWRQcm9wUkVzID0ge1xuICAgICAgd2Via2l0OiAvKE1vdmVtZW50W1hZXXxSYWRpdXNbWFldfFJvdGF0aW9uQW5nbGV8Rm9yY2UpJC9cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcG9pbnRlckV4dGVuZCAoZGVzdCwgc291cmNlKSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgICAgdmFyIGRlcHJlY2F0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgIC8vIHNraXAgZGVwcmVjYXRlZCBwcmVmaXhlZCBwcm9wZXJ0aWVzXG4gICAgICAgICAgZm9yICh2YXIgdmVuZG9yIGluIHByZWZpeGVkUHJvcFJFcykge1xuICAgICAgICAgICAgaWYgKHByb3AuaW5kZXhPZih2ZW5kb3IpID09PSAwICYmIHByZWZpeGVkUHJvcFJFc1t2ZW5kb3JdLnRlc3QocHJvcCkpIHtcbiAgICAgICAgICAgICAgZGVwcmVjYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZGVwcmVjYXRlZCkge1xuICAgICAgICAgICAgZGVzdFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29weUNvb3JkcyAoZGVzdCwgc3JjKSB7XG4gICAgICAgIGRlc3QucGFnZSA9IGRlc3QucGFnZSB8fCB7fTtcbiAgICAgICAgZGVzdC5wYWdlLnggPSBzcmMucGFnZS54O1xuICAgICAgICBkZXN0LnBhZ2UueSA9IHNyYy5wYWdlLnk7XG5cbiAgICAgICAgZGVzdC5jbGllbnQgPSBkZXN0LmNsaWVudCB8fCB7fTtcbiAgICAgICAgZGVzdC5jbGllbnQueCA9IHNyYy5jbGllbnQueDtcbiAgICAgICAgZGVzdC5jbGllbnQueSA9IHNyYy5jbGllbnQueTtcblxuICAgICAgICBkZXN0LnRpbWVTdGFtcCA9IHNyYy50aW1lU3RhbXA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RXZlbnRYWSAodGFyZ2V0T2JqLCBwb2ludGVycywgaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgdmFyIHBvaW50ZXIgPSAocG9pbnRlcnMubGVuZ3RoID4gMVxuICAgICAgICAgICAgICAgICAgICAgICA/IHBvaW50ZXJBdmVyYWdlKHBvaW50ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICA6IHBvaW50ZXJzWzBdKTtcblxuICAgICAgICBnZXRQYWdlWFkocG9pbnRlciwgdG1wWFksIGludGVyYWN0aW9uKTtcbiAgICAgICAgdGFyZ2V0T2JqLnBhZ2UueCA9IHRtcFhZLng7XG4gICAgICAgIHRhcmdldE9iai5wYWdlLnkgPSB0bXBYWS55O1xuXG4gICAgICAgIGdldENsaWVudFhZKHBvaW50ZXIsIHRtcFhZLCBpbnRlcmFjdGlvbik7XG4gICAgICAgIHRhcmdldE9iai5jbGllbnQueCA9IHRtcFhZLng7XG4gICAgICAgIHRhcmdldE9iai5jbGllbnQueSA9IHRtcFhZLnk7XG5cbiAgICAgICAgdGFyZ2V0T2JqLnRpbWVTdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEV2ZW50RGVsdGFzICh0YXJnZXRPYmosIHByZXYsIGN1cikge1xuICAgICAgICB0YXJnZXRPYmoucGFnZS54ICAgICA9IGN1ci5wYWdlLnggICAgICAtIHByZXYucGFnZS54O1xuICAgICAgICB0YXJnZXRPYmoucGFnZS55ICAgICA9IGN1ci5wYWdlLnkgICAgICAtIHByZXYucGFnZS55O1xuICAgICAgICB0YXJnZXRPYmouY2xpZW50LnggICA9IGN1ci5jbGllbnQueCAgICAtIHByZXYuY2xpZW50Lng7XG4gICAgICAgIHRhcmdldE9iai5jbGllbnQueSAgID0gY3VyLmNsaWVudC55ICAgIC0gcHJldi5jbGllbnQueTtcbiAgICAgICAgdGFyZ2V0T2JqLnRpbWVTdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gcHJldi50aW1lU3RhbXA7XG5cbiAgICAgICAgLy8gc2V0IHBvaW50ZXIgdmVsb2NpdHlcbiAgICAgICAgdmFyIGR0ID0gTWF0aC5tYXgodGFyZ2V0T2JqLnRpbWVTdGFtcCAvIDEwMDAsIDAuMDAxKTtcbiAgICAgICAgdGFyZ2V0T2JqLnBhZ2Uuc3BlZWQgICA9IGh5cG90KHRhcmdldE9iai5wYWdlLngsIHRhcmdldE9iai5wYWdlLnkpIC8gZHQ7XG4gICAgICAgIHRhcmdldE9iai5wYWdlLnZ4ICAgICAgPSB0YXJnZXRPYmoucGFnZS54IC8gZHQ7XG4gICAgICAgIHRhcmdldE9iai5wYWdlLnZ5ICAgICAgPSB0YXJnZXRPYmoucGFnZS55IC8gZHQ7XG5cbiAgICAgICAgdGFyZ2V0T2JqLmNsaWVudC5zcGVlZCA9IGh5cG90KHRhcmdldE9iai5jbGllbnQueCwgdGFyZ2V0T2JqLnBhZ2UueSkgLyBkdDtcbiAgICAgICAgdGFyZ2V0T2JqLmNsaWVudC52eCAgICA9IHRhcmdldE9iai5jbGllbnQueCAvIGR0O1xuICAgICAgICB0YXJnZXRPYmouY2xpZW50LnZ5ICAgID0gdGFyZ2V0T2JqLmNsaWVudC55IC8gZHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNOYXRpdmVQb2ludGVyIChwb2ludGVyKSB7XG4gICAgICAgIHJldHVybiAocG9pbnRlciBpbnN0YW5jZW9mIHdpbmRvdy5FdmVudFxuICAgICAgICAgICAgfHwgKHN1cHBvcnRzVG91Y2ggJiYgd2luZG93LlRvdWNoICYmIHBvaW50ZXIgaW5zdGFuY2VvZiB3aW5kb3cuVG91Y2gpKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgc3BlY2lmaWVkIFgvWSBjb29yZHMgZm9yIG1vdXNlIG9yIGV2ZW50LnRvdWNoZXNbMF1cbiAgICBmdW5jdGlvbiBnZXRYWSAodHlwZSwgcG9pbnRlciwgeHkpIHtcbiAgICAgICAgeHkgPSB4eSB8fCB7fTtcbiAgICAgICAgdHlwZSA9IHR5cGUgfHwgJ3BhZ2UnO1xuXG4gICAgICAgIHh5LnggPSBwb2ludGVyW3R5cGUgKyAnWCddO1xuICAgICAgICB4eS55ID0gcG9pbnRlclt0eXBlICsgJ1knXTtcblxuICAgICAgICByZXR1cm4geHk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGFnZVhZIChwb2ludGVyLCBwYWdlKSB7XG4gICAgICAgIHBhZ2UgPSBwYWdlIHx8IHt9O1xuXG4gICAgICAgIC8vIE9wZXJhIE1vYmlsZSBoYW5kbGVzIHRoZSB2aWV3cG9ydCBhbmQgc2Nyb2xsaW5nIG9kZGx5XG4gICAgICAgIGlmIChpc09wZXJhTW9iaWxlICYmIGlzTmF0aXZlUG9pbnRlcihwb2ludGVyKSkge1xuICAgICAgICAgICAgZ2V0WFkoJ3NjcmVlbicsIHBvaW50ZXIsIHBhZ2UpO1xuXG4gICAgICAgICAgICBwYWdlLnggKz0gd2luZG93LnNjcm9sbFg7XG4gICAgICAgICAgICBwYWdlLnkgKz0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZXRYWSgncGFnZScsIHBvaW50ZXIsIHBhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q2xpZW50WFkgKHBvaW50ZXIsIGNsaWVudCkge1xuICAgICAgICBjbGllbnQgPSBjbGllbnQgfHwge307XG5cbiAgICAgICAgaWYgKGlzT3BlcmFNb2JpbGUgJiYgaXNOYXRpdmVQb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICAgICAgICAvLyBPcGVyYSBNb2JpbGUgaGFuZGxlcyB0aGUgdmlld3BvcnQgYW5kIHNjcm9sbGluZyBvZGRseVxuICAgICAgICAgICAgZ2V0WFkoJ3NjcmVlbicsIHBvaW50ZXIsIGNsaWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZ2V0WFkoJ2NsaWVudCcsIHBvaW50ZXIsIGNsaWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xpZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNjcm9sbFhZICh3aW4pIHtcbiAgICAgICAgd2luID0gd2luIHx8IHdpbmRvdztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHdpbi5zY3JvbGxYIHx8IHdpbi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHk6IHdpbi5zY3JvbGxZIHx8IHdpbi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UG9pbnRlcklkIChwb2ludGVyKSB7XG4gICAgICAgIHJldHVybiBpc051bWJlcihwb2ludGVyLnBvaW50ZXJJZCk/IHBvaW50ZXIucG9pbnRlcklkIDogcG9pbnRlci5pZGVudGlmaWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFjdHVhbEVsZW1lbnQgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIChlbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudEluc3RhbmNlXG4gICAgICAgICAgICA/IGVsZW1lbnQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnRcbiAgICAgICAgICAgIDogZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V2luZG93IChub2RlKSB7XG4gICAgICAgIGlmIChpc1dpbmRvdyhub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm9vdE5vZGUgPSAobm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUpO1xuXG4gICAgICAgIHJldHVybiByb290Tm9kZS5kZWZhdWx0VmlldyB8fCByb290Tm9kZS5wYXJlbnRXaW5kb3cgfHwgd2luZG93O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRDbGllbnRSZWN0IChlbGVtZW50KSB7XG4gICAgICAgIHZhciBjbGllbnRSZWN0ID0gKGVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBlbGVtZW50LmdldENsaWVudFJlY3RzKClbMF0pO1xuXG4gICAgICAgIHJldHVybiBjbGllbnRSZWN0ICYmIHtcbiAgICAgICAgICAgIGxlZnQgIDogY2xpZW50UmVjdC5sZWZ0LFxuICAgICAgICAgICAgcmlnaHQgOiBjbGllbnRSZWN0LnJpZ2h0LFxuICAgICAgICAgICAgdG9wICAgOiBjbGllbnRSZWN0LnRvcCxcbiAgICAgICAgICAgIGJvdHRvbTogY2xpZW50UmVjdC5ib3R0b20sXG4gICAgICAgICAgICB3aWR0aCA6IGNsaWVudFJlY3Qud2lkdGggfHwgY2xpZW50UmVjdC5yaWdodCAtIGNsaWVudFJlY3QubGVmdCxcbiAgICAgICAgICAgIGhlaWdodDogY2xpZW50UmVjdC5oZWlnaHQgfHwgY2xpZW50UmVjdC5ib3R0b20gLSBjbGllbnRSZWN0LnRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRSZWN0IChlbGVtZW50KSB7XG4gICAgICAgIHZhciBjbGllbnRSZWN0ID0gZ2V0RWxlbWVudENsaWVudFJlY3QoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKCFpc0lPUzcgJiYgY2xpZW50UmVjdCkge1xuICAgICAgICAgICAgdmFyIHNjcm9sbCA9IGdldFNjcm9sbFhZKGdldFdpbmRvdyhlbGVtZW50KSk7XG5cbiAgICAgICAgICAgIGNsaWVudFJlY3QubGVmdCAgICs9IHNjcm9sbC54O1xuICAgICAgICAgICAgY2xpZW50UmVjdC5yaWdodCAgKz0gc2Nyb2xsLng7XG4gICAgICAgICAgICBjbGllbnRSZWN0LnRvcCAgICArPSBzY3JvbGwueTtcbiAgICAgICAgICAgIGNsaWVudFJlY3QuYm90dG9tICs9IHNjcm9sbC55O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsaWVudFJlY3Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG91Y2hQYWlyIChldmVudCkge1xuICAgICAgICB2YXIgdG91Y2hlcyA9IFtdO1xuXG4gICAgICAgIC8vIGFycmF5IG9mIHRvdWNoZXMgaXMgc3VwcGxpZWRcbiAgICAgICAgaWYgKGlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICAgICAgICB0b3VjaGVzWzBdID0gZXZlbnRbMF07XG4gICAgICAgICAgICB0b3VjaGVzWzFdID0gZXZlbnRbMV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gYW4gZXZlbnRcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoZW5kJykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzWzBdID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzWzBdID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXNbMV0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1sxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b3VjaGVzWzBdID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgICAgICAgICB0b3VjaGVzWzFdID0gZXZlbnQudG91Y2hlc1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b3VjaGVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvaW50ZXJBdmVyYWdlIChwb2ludGVycykge1xuICAgICAgICB2YXIgYXZlcmFnZSA9IHtcbiAgICAgICAgICAgIHBhZ2VYICA6IDAsXG4gICAgICAgICAgICBwYWdlWSAgOiAwLFxuICAgICAgICAgICAgY2xpZW50WDogMCxcbiAgICAgICAgICAgIGNsaWVudFk6IDAsXG4gICAgICAgICAgICBzY3JlZW5YOiAwLFxuICAgICAgICAgICAgc2NyZWVuWTogMFxuICAgICAgICB9O1xuICAgICAgICB2YXIgcHJvcDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHByb3AgaW4gYXZlcmFnZSkge1xuICAgICAgICAgICAgICAgIGF2ZXJhZ2VbcHJvcF0gKz0gcG9pbnRlcnNbaV1bcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChwcm9wIGluIGF2ZXJhZ2UpIHtcbiAgICAgICAgICAgIGF2ZXJhZ2VbcHJvcF0gLz0gcG9pbnRlcnMubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF2ZXJhZ2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2hCQm94IChldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50Lmxlbmd0aCAmJiAhKGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdWNoZXMgPSBnZXRUb3VjaFBhaXIoZXZlbnQpLFxuICAgICAgICAgICAgbWluWCA9IE1hdGgubWluKHRvdWNoZXNbMF0ucGFnZVgsIHRvdWNoZXNbMV0ucGFnZVgpLFxuICAgICAgICAgICAgbWluWSA9IE1hdGgubWluKHRvdWNoZXNbMF0ucGFnZVksIHRvdWNoZXNbMV0ucGFnZVkpLFxuICAgICAgICAgICAgbWF4WCA9IE1hdGgubWF4KHRvdWNoZXNbMF0ucGFnZVgsIHRvdWNoZXNbMV0ucGFnZVgpLFxuICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KHRvdWNoZXNbMF0ucGFnZVksIHRvdWNoZXNbMV0ucGFnZVkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBtaW5YLFxuICAgICAgICAgICAgeTogbWluWSxcbiAgICAgICAgICAgIGxlZnQ6IG1pblgsXG4gICAgICAgICAgICB0b3A6IG1pblksXG4gICAgICAgICAgICB3aWR0aDogbWF4WCAtIG1pblgsXG4gICAgICAgICAgICBoZWlnaHQ6IG1heFkgLSBtaW5ZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2hEaXN0YW5jZSAoZXZlbnQsIGRlbHRhU291cmNlKSB7XG4gICAgICAgIGRlbHRhU291cmNlID0gZGVsdGFTb3VyY2UgfHwgZGVmYXVsdE9wdGlvbnMuZGVsdGFTb3VyY2U7XG5cbiAgICAgICAgdmFyIHNvdXJjZVggPSBkZWx0YVNvdXJjZSArICdYJyxcbiAgICAgICAgICAgIHNvdXJjZVkgPSBkZWx0YVNvdXJjZSArICdZJyxcbiAgICAgICAgICAgIHRvdWNoZXMgPSBnZXRUb3VjaFBhaXIoZXZlbnQpO1xuXG5cbiAgICAgICAgdmFyIGR4ID0gdG91Y2hlc1swXVtzb3VyY2VYXSAtIHRvdWNoZXNbMV1bc291cmNlWF0sXG4gICAgICAgICAgICBkeSA9IHRvdWNoZXNbMF1bc291cmNlWV0gLSB0b3VjaGVzWzFdW3NvdXJjZVldO1xuXG4gICAgICAgIHJldHVybiBoeXBvdChkeCwgZHkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvdWNoQW5nbGUgKGV2ZW50LCBwcmV2QW5nbGUsIGRlbHRhU291cmNlKSB7XG4gICAgICAgIGRlbHRhU291cmNlID0gZGVsdGFTb3VyY2UgfHwgZGVmYXVsdE9wdGlvbnMuZGVsdGFTb3VyY2U7XG5cbiAgICAgICAgdmFyIHNvdXJjZVggPSBkZWx0YVNvdXJjZSArICdYJyxcbiAgICAgICAgICAgIHNvdXJjZVkgPSBkZWx0YVNvdXJjZSArICdZJyxcbiAgICAgICAgICAgIHRvdWNoZXMgPSBnZXRUb3VjaFBhaXIoZXZlbnQpLFxuICAgICAgICAgICAgZHggPSB0b3VjaGVzWzBdW3NvdXJjZVhdIC0gdG91Y2hlc1sxXVtzb3VyY2VYXSxcbiAgICAgICAgICAgIGR5ID0gdG91Y2hlc1swXVtzb3VyY2VZXSAtIHRvdWNoZXNbMV1bc291cmNlWV0sXG4gICAgICAgICAgICBhbmdsZSA9IDE4MCAqIE1hdGguYXRhbihkeSAvIGR4KSAvIE1hdGguUEk7XG5cbiAgICAgICAgaWYgKGlzTnVtYmVyKHByZXZBbmdsZSkpIHtcbiAgICAgICAgICAgIHZhciBkciA9IGFuZ2xlIC0gcHJldkFuZ2xlLFxuICAgICAgICAgICAgICAgIGRyQ2xhbXBlZCA9IGRyICUgMzYwO1xuXG4gICAgICAgICAgICBpZiAoZHJDbGFtcGVkID4gMzE1KSB7XG4gICAgICAgICAgICAgICAgYW5nbGUgLT0gMzYwICsgKGFuZ2xlIC8gMzYwKXwwICogMzYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZHJDbGFtcGVkID4gMTM1KSB7XG4gICAgICAgICAgICAgICAgYW5nbGUgLT0gMTgwICsgKGFuZ2xlIC8gMzYwKXwwICogMzYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZHJDbGFtcGVkIDwgLTMxNSkge1xuICAgICAgICAgICAgICAgIGFuZ2xlICs9IDM2MCArIChhbmdsZSAvIDM2MCl8MCAqIDM2MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRyQ2xhbXBlZCA8IC0xMzUpIHtcbiAgICAgICAgICAgICAgICBhbmdsZSArPSAxODAgKyAoYW5nbGUgLyAzNjApfDAgKiAzNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gIGFuZ2xlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9yaWdpblhZIChpbnRlcmFjdGFibGUsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIG9yaWdpbiA9IGludGVyYWN0YWJsZVxuICAgICAgICAgICAgICAgID8gaW50ZXJhY3RhYmxlLm9wdGlvbnMub3JpZ2luXG4gICAgICAgICAgICAgICAgOiBkZWZhdWx0T3B0aW9ucy5vcmlnaW47XG5cbiAgICAgICAgaWYgKG9yaWdpbiA9PT0gJ3BhcmVudCcpIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IHBhcmVudEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3JpZ2luID09PSAnc2VsZicpIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IGludGVyYWN0YWJsZS5nZXRSZWN0KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRyeVNlbGVjdG9yKG9yaWdpbikpIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IGNsb3Nlc3QoZWxlbWVudCwgb3JpZ2luKSB8fCB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9yaWdpbikpIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IG9yaWdpbihpbnRlcmFjdGFibGUgJiYgZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNFbGVtZW50KG9yaWdpbikpICB7XG4gICAgICAgICAgICBvcmlnaW4gPSBnZXRFbGVtZW50UmVjdChvcmlnaW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3JpZ2luLnggPSAoJ3gnIGluIG9yaWdpbik/IG9yaWdpbi54IDogb3JpZ2luLmxlZnQ7XG4gICAgICAgIG9yaWdpbi55ID0gKCd5JyBpbiBvcmlnaW4pPyBvcmlnaW4ueSA6IG9yaWdpbi50b3A7XG5cbiAgICAgICAgcmV0dXJuIG9yaWdpbjtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjM0NTI4LzIyODA4ODhcbiAgICBmdW5jdGlvbiBfZ2V0UUJlemllclZhbHVlKHQsIHAxLCBwMiwgcDMpIHtcbiAgICAgICAgdmFyIGlUID0gMSAtIHQ7XG4gICAgICAgIHJldHVybiBpVCAqIGlUICogcDEgKyAyICogaVQgKiB0ICogcDIgKyB0ICogdCAqIHAzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFF1YWRyYXRpY0N1cnZlUG9pbnQoc3RhcnRYLCBzdGFydFksIGNwWCwgY3BZLCBlbmRYLCBlbmRZLCBwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogIF9nZXRRQmV6aWVyVmFsdWUocG9zaXRpb24sIHN0YXJ0WCwgY3BYLCBlbmRYKSxcbiAgICAgICAgICAgIHk6ICBfZ2V0UUJlemllclZhbHVlKHBvc2l0aW9uLCBzdGFydFksIGNwWSwgZW5kWSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vZ2l6bWEuY29tL2Vhc2luZy9cbiAgICBmdW5jdGlvbiBlYXNlT3V0UXVhZCAodCwgYiwgYywgZCkge1xuICAgICAgICB0IC89IGQ7XG4gICAgICAgIHJldHVybiAtYyAqIHQqKHQtMikgKyBiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vZGVDb250YWlucyAocGFyZW50LCBjaGlsZCkge1xuICAgICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZXN0IChjaGlsZCwgc2VsZWN0b3IpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHBhcmVudEVsZW1lbnQoY2hpbGQpO1xuXG4gICAgICAgIHdoaWxlIChpc0VsZW1lbnQocGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoZXNTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKSkgeyByZXR1cm4gcGFyZW50OyB9XG5cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudEVsZW1lbnQocGFyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcmVudEVsZW1lbnQgKG5vZGUpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcblxuICAgICAgICBpZiAoaXNEb2NGcmFnKHBhcmVudCkpIHtcbiAgICAgICAgICAgIC8vIHNraXAgcGFzdCAjc2hhZG8tcm9vdCBmcmFnbWVudHNcbiAgICAgICAgICAgIHdoaWxlICgocGFyZW50ID0gcGFyZW50Lmhvc3QpICYmIGlzRG9jRnJhZyhwYXJlbnQpKSB7fVxuXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbkNvbnRleHQgKGludGVyYWN0YWJsZSwgZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gaW50ZXJhY3RhYmxlLl9jb250ZXh0ID09PSBlbGVtZW50Lm93bmVyRG9jdW1lbnRcbiAgICAgICAgICAgICAgICB8fCBub2RlQ29udGFpbnMoaW50ZXJhY3RhYmxlLl9jb250ZXh0LCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXN0SWdub3JlIChpbnRlcmFjdGFibGUsIGludGVyYWN0YWJsZUVsZW1lbnQsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGlnbm9yZUZyb20gPSBpbnRlcmFjdGFibGUub3B0aW9ucy5pZ25vcmVGcm9tO1xuXG4gICAgICAgIGlmICghaWdub3JlRnJvbSB8fCAhaXNFbGVtZW50KGVsZW1lbnQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIGlmIChpc1N0cmluZyhpZ25vcmVGcm9tKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNVcFRvKGVsZW1lbnQsIGlnbm9yZUZyb20sIGludGVyYWN0YWJsZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzRWxlbWVudChpZ25vcmVGcm9tKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVDb250YWlucyhpZ25vcmVGcm9tLCBlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXN0QWxsb3cgKGludGVyYWN0YWJsZSwgaW50ZXJhY3RhYmxlRWxlbWVudCwgZWxlbWVudCkge1xuICAgICAgICB2YXIgYWxsb3dGcm9tID0gaW50ZXJhY3RhYmxlLm9wdGlvbnMuYWxsb3dGcm9tO1xuXG4gICAgICAgIGlmICghYWxsb3dGcm9tKSB7IHJldHVybiB0cnVlOyB9XG5cbiAgICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlbWVudCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgaWYgKGlzU3RyaW5nKGFsbG93RnJvbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzVXBUbyhlbGVtZW50LCBhbGxvd0Zyb20sIGludGVyYWN0YWJsZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzRWxlbWVudChhbGxvd0Zyb20pKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUNvbnRhaW5zKGFsbG93RnJvbSwgZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBeGlzIChheGlzLCBpbnRlcmFjdGFibGUpIHtcbiAgICAgICAgaWYgKCFpbnRlcmFjdGFibGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgdmFyIHRoaXNBeGlzID0gaW50ZXJhY3RhYmxlLm9wdGlvbnMuZHJhZy5heGlzO1xuXG4gICAgICAgIHJldHVybiAoYXhpcyA9PT0gJ3h5JyB8fCB0aGlzQXhpcyA9PT0gJ3h5JyB8fCB0aGlzQXhpcyA9PT0gYXhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tTbmFwIChpbnRlcmFjdGFibGUsIGFjdGlvbikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zO1xuXG4gICAgICAgIGlmICgvXnJlc2l6ZS8udGVzdChhY3Rpb24pKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAncmVzaXplJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zW2FjdGlvbl0uc25hcCAmJiBvcHRpb25zW2FjdGlvbl0uc25hcC5lbmFibGVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrUmVzdHJpY3QgKGludGVyYWN0YWJsZSwgYWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnM7XG5cbiAgICAgICAgaWYgKC9ecmVzaXplLy50ZXN0KGFjdGlvbikpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdyZXNpemUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICBvcHRpb25zW2FjdGlvbl0ucmVzdHJpY3QgJiYgb3B0aW9uc1thY3Rpb25dLnJlc3RyaWN0LmVuYWJsZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBdXRvU2Nyb2xsIChpbnRlcmFjdGFibGUsIGFjdGlvbikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zO1xuXG4gICAgICAgIGlmICgvXnJlc2l6ZS8udGVzdChhY3Rpb24pKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAncmVzaXplJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAgb3B0aW9uc1thY3Rpb25dLmF1dG9TY3JvbGwgJiYgb3B0aW9uc1thY3Rpb25dLmF1dG9TY3JvbGwuZW5hYmxlZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0IChpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGFjdGlvbikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zLFxuICAgICAgICAgICAgbWF4QWN0aW9ucyA9IG9wdGlvbnNbYWN0aW9uLm5hbWVdLm1heCxcbiAgICAgICAgICAgIG1heFBlckVsZW1lbnQgPSBvcHRpb25zW2FjdGlvbi5uYW1lXS5tYXhQZXJFbGVtZW50LFxuICAgICAgICAgICAgYWN0aXZlSW50ZXJhY3Rpb25zID0gMCxcbiAgICAgICAgICAgIHRhcmdldENvdW50ID0gMCxcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnRDb3VudCA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGludGVyYWN0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGludGVyYWN0aW9uID0gaW50ZXJhY3Rpb25zW2ldLFxuICAgICAgICAgICAgICAgIG90aGVyQWN0aW9uID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSxcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpO1xuXG4gICAgICAgICAgICBpZiAoIWFjdGl2ZSkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgICAgICBhY3RpdmVJbnRlcmFjdGlvbnMrKztcblxuICAgICAgICAgICAgaWYgKGFjdGl2ZUludGVyYWN0aW9ucyA+PSBtYXhJbnRlcmFjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbnRlcmFjdGlvbi50YXJnZXQgIT09IGludGVyYWN0YWJsZSkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgICAgICB0YXJnZXRDb3VudCArPSAob3RoZXJBY3Rpb24gPT09IGFjdGlvbi5uYW1lKXwwO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0Q291bnQgPj0gbWF4QWN0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGludGVyYWN0aW9uLmVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRFbGVtZW50Q291bnQrKztcblxuICAgICAgICAgICAgICAgIGlmIChvdGhlckFjdGlvbiAhPT0gYWN0aW9uLm5hbWUgfHwgdGFyZ2V0RWxlbWVudENvdW50ID49IG1heFBlckVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXhJbnRlcmFjdGlvbnMgPiAwO1xuICAgIH1cblxuICAgIC8vIFRlc3QgZm9yIHRoZSBlbGVtZW50IHRoYXQncyBcImFib3ZlXCIgYWxsIG90aGVyIHF1YWxpZmllcnNcbiAgICBmdW5jdGlvbiBpbmRleE9mRGVlcGVzdEVsZW1lbnQgKGVsZW1lbnRzKSB7XG4gICAgICAgIHZhciBkcm9wem9uZSxcbiAgICAgICAgICAgIGRlZXBlc3Rab25lID0gZWxlbWVudHNbMF0sXG4gICAgICAgICAgICBpbmRleCA9IGRlZXBlc3Rab25lPyAwOiAtMSxcbiAgICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgICAgIGRlZXBlc3Rab25lUGFyZW50cyA9IFtdLFxuICAgICAgICAgICAgZHJvcHpvbmVQYXJlbnRzID0gW10sXG4gICAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBuO1xuXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZHJvcHpvbmUgPSBlbGVtZW50c1tpXTtcblxuICAgICAgICAgICAgLy8gYW4gZWxlbWVudCBtaWdodCBiZWxvbmcgdG8gbXVsdGlwbGUgc2VsZWN0b3IgZHJvcHpvbmVzXG4gICAgICAgICAgICBpZiAoIWRyb3B6b25lIHx8IGRyb3B6b25lID09PSBkZWVwZXN0Wm9uZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWRlZXBlc3Rab25lKSB7XG4gICAgICAgICAgICAgICAgZGVlcGVzdFpvbmUgPSBkcm9wem9uZTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBkZWVwZXN0IG9yIGN1cnJlbnQgYXJlIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCBvciBkb2N1bWVudC5yb290RWxlbWVudFxuICAgICAgICAgICAgLy8gLSBpZiB0aGUgY3VycmVudCBkcm9wem9uZSBpcywgZG8gbm90aGluZyBhbmQgY29udGludWVcbiAgICAgICAgICAgIGlmIChkcm9wem9uZS5wYXJlbnROb2RlID09PSBkcm9wem9uZS5vd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAtIGlmIGRlZXBlc3QgaXMsIHVwZGF0ZSB3aXRoIHRoZSBjdXJyZW50IGRyb3B6b25lIGFuZCBjb250aW51ZSB0byBuZXh0XG4gICAgICAgICAgICBlbHNlIGlmIChkZWVwZXN0Wm9uZS5wYXJlbnROb2RlID09PSBkcm9wem9uZS5vd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgZGVlcGVzdFpvbmUgPSBkcm9wem9uZTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZGVlcGVzdFpvbmVQYXJlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IGRlZXBlc3Rab25lO1xuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQucGFyZW50Tm9kZSAmJiBwYXJlbnQucGFyZW50Tm9kZSAhPT0gcGFyZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVlcGVzdFpvbmVQYXJlbnRzLnVuc2hpZnQocGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGVsZW1lbnQgaXMgYW4gc3ZnIGVsZW1lbnQgYW5kIHRoZSBjdXJyZW50IGRlZXBlc3QgaXNcbiAgICAgICAgICAgIC8vIGFuIEhUTUxFbGVtZW50XG4gICAgICAgICAgICBpZiAoZGVlcGVzdFpvbmUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICYmIGRyb3B6b25lIGluc3RhbmNlb2YgU1ZHRWxlbWVudFxuICAgICAgICAgICAgICAgICYmICEoZHJvcHpvbmUgaW5zdGFuY2VvZiBTVkdTVkdFbGVtZW50KSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRyb3B6b25lID09PSBkZWVwZXN0Wm9uZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhcmVudCA9IGRyb3B6b25lLm93bmVyU1ZHRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IGRyb3B6b25lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkcm9wem9uZVBhcmVudHMgPSBbXTtcblxuICAgICAgICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnROb2RlICE9PSBwYXJlbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIGRyb3B6b25lUGFyZW50cy51bnNoaWZ0KHBhcmVudCk7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG4gPSAwO1xuXG4gICAgICAgICAgICAvLyBnZXQgKHBvc2l0aW9uIG9mIGxhc3QgY29tbW9uIGFuY2VzdG9yKSArIDFcbiAgICAgICAgICAgIHdoaWxlIChkcm9wem9uZVBhcmVudHNbbl0gJiYgZHJvcHpvbmVQYXJlbnRzW25dID09PSBkZWVwZXN0Wm9uZVBhcmVudHNbbl0pIHtcbiAgICAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwYXJlbnRzID0gW1xuICAgICAgICAgICAgICAgIGRyb3B6b25lUGFyZW50c1tuIC0gMV0sXG4gICAgICAgICAgICAgICAgZHJvcHpvbmVQYXJlbnRzW25dLFxuICAgICAgICAgICAgICAgIGRlZXBlc3Rab25lUGFyZW50c1tuXVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgY2hpbGQgPSBwYXJlbnRzWzBdLmxhc3RDaGlsZDtcblxuICAgICAgICAgICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZXBlc3Rab25lID0gZHJvcHpvbmU7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgZGVlcGVzdFpvbmVQYXJlbnRzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkID09PSBwYXJlbnRzWzJdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEludGVyYWN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgICAgICAgICAgPSBudWxsOyAvLyBjdXJyZW50IGludGVyYWN0YWJsZSBiZWluZyBpbnRlcmFjdGVkIHdpdGhcbiAgICAgICAgdGhpcy5lbGVtZW50ICAgICAgICAgPSBudWxsOyAvLyB0aGUgdGFyZ2V0IGVsZW1lbnQgb2YgdGhlIGludGVyYWN0YWJsZVxuICAgICAgICB0aGlzLmRyb3BUYXJnZXQgICAgICA9IG51bGw7IC8vIHRoZSBkcm9wem9uZSBhIGRyYWcgdGFyZ2V0IG1pZ2h0IGJlIGRyb3BwZWQgaW50b1xuICAgICAgICB0aGlzLmRyb3BFbGVtZW50ICAgICA9IG51bGw7IC8vIHRoZSBlbGVtZW50IGF0IHRoZSB0aW1lIG9mIGNoZWNraW5nXG4gICAgICAgIHRoaXMucHJldkRyb3BUYXJnZXQgID0gbnVsbDsgLy8gdGhlIGRyb3B6b25lIHRoYXQgd2FzIHJlY2VudGx5IGRyYWdnZWQgYXdheSBmcm9tXG4gICAgICAgIHRoaXMucHJldkRyb3BFbGVtZW50ID0gbnVsbDsgLy8gdGhlIGVsZW1lbnQgYXQgdGhlIHRpbWUgb2YgY2hlY2tpbmdcblxuICAgICAgICB0aGlzLnByZXBhcmVkICAgICAgICA9IHsgICAgIC8vIGFjdGlvbiB0aGF0J3MgcmVhZHkgdG8gYmUgZmlyZWQgb24gbmV4dCBtb3ZlIGV2ZW50XG4gICAgICAgICAgICBuYW1lIDogbnVsbCxcbiAgICAgICAgICAgIGF4aXMgOiBudWxsLFxuICAgICAgICAgICAgZWRnZXM6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1hdGNoZXMgICAgICAgICA9IFtdOyAgIC8vIGFsbCBzZWxlY3RvcnMgdGhhdCBhcmUgbWF0Y2hlZCBieSB0YXJnZXQgZWxlbWVudFxuICAgICAgICB0aGlzLm1hdGNoRWxlbWVudHMgICA9IFtdOyAgIC8vIGNvcnJlc3BvbmRpbmcgZWxlbWVudHNcblxuICAgICAgICB0aGlzLmluZXJ0aWFTdGF0dXMgPSB7XG4gICAgICAgICAgICBhY3RpdmUgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIHNtb290aEVuZCAgICA6IGZhbHNlLFxuICAgICAgICAgICAgZW5kaW5nICAgICAgIDogZmFsc2UsXG5cbiAgICAgICAgICAgIHN0YXJ0RXZlbnQ6IG51bGwsXG4gICAgICAgICAgICB1cENvb3Jkczoge30sXG5cbiAgICAgICAgICAgIHhlOiAwLCB5ZTogMCxcbiAgICAgICAgICAgIHN4OiAwLCBzeTogMCxcblxuICAgICAgICAgICAgdDA6IDAsXG4gICAgICAgICAgICB2eDA6IDAsIHZ5czogMCxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuXG4gICAgICAgICAgICByZXN1bWVEeDogMCxcbiAgICAgICAgICAgIHJlc3VtZUR5OiAwLFxuXG4gICAgICAgICAgICBsYW1iZGFfdjA6IDAsXG4gICAgICAgICAgICBvbmVfdmVfdjA6IDAsXG4gICAgICAgICAgICBpICA6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRJbmVydGlhRnJhbWUgPSB0aGlzLmluZXJ0aWFGcmFtZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFNtb290aEVuZEZyYW1lID0gdGhpcy5zbW9vdGhFbmRGcmFtZS5iaW5kKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLmJvdW5kSW5lcnRpYUZyYW1lID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhhdC5pbmVydGlhRnJhbWUoKTsgfTtcbiAgICAgICAgICAgIHRoaXMuYm91bmRTbW9vdGhFbmRGcmFtZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoYXQuc21vb3RoRW5kRnJhbWUoKTsgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlRHJvcHMgPSB7XG4gICAgICAgICAgICBkcm9wem9uZXM6IFtdLCAgICAgIC8vIHRoZSBkcm9wem9uZXMgdGhhdCBhcmUgbWVudGlvbmVkIGJlbG93XG4gICAgICAgICAgICBlbGVtZW50cyA6IFtdLCAgICAgIC8vIGVsZW1lbnRzIG9mIGRyb3B6b25lcyB0aGF0IGFjY2VwdCB0aGUgdGFyZ2V0IGRyYWdnYWJsZVxuICAgICAgICAgICAgcmVjdHMgICAgOiBbXSAgICAgICAvLyB0aGUgcmVjdHMgb2YgdGhlIGVsZW1lbnRzIG1lbnRpb25lZCBhYm92ZVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgYWRkZWQgcG9pbnRlcnNcbiAgICAgICAgdGhpcy5wb2ludGVycyAgICA9IFtdO1xuICAgICAgICB0aGlzLnBvaW50ZXJJZHMgID0gW107XG4gICAgICAgIHRoaXMuZG93blRhcmdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5kb3duVGltZXMgICA9IFtdO1xuICAgICAgICB0aGlzLmhvbGRUaW1lcnMgID0gW107XG5cbiAgICAgICAgLy8gUHJldmlvdXMgbmF0aXZlIHBvaW50ZXIgbW92ZSBldmVudCBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLnByZXZDb29yZHMgPSB7XG4gICAgICAgICAgICBwYWdlICAgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgY2xpZW50ICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIHRpbWVTdGFtcDogMFxuICAgICAgICB9O1xuICAgICAgICAvLyBjdXJyZW50IG5hdGl2ZSBwb2ludGVyIG1vdmUgZXZlbnQgY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy5jdXJDb29yZHMgPSB7XG4gICAgICAgICAgICBwYWdlICAgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgY2xpZW50ICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIHRpbWVTdGFtcDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFN0YXJ0aW5nIEludGVyYWN0RXZlbnQgcG9pbnRlciBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLnN0YXJ0Q29vcmRzID0ge1xuICAgICAgICAgICAgcGFnZSAgICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIGNsaWVudCAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICB0aW1lU3RhbXA6IDBcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBDaGFuZ2UgaW4gY29vcmRpbmF0ZXMgYW5kIHRpbWUgb2YgdGhlIHBvaW50ZXJcbiAgICAgICAgdGhpcy5wb2ludGVyRGVsdGEgPSB7XG4gICAgICAgICAgICBwYWdlICAgICA6IHsgeDogMCwgeTogMCwgdng6IDAsIHZ5OiAwLCBzcGVlZDogMCB9LFxuICAgICAgICAgICAgY2xpZW50ICAgOiB7IHg6IDAsIHk6IDAsIHZ4OiAwLCB2eTogMCwgc3BlZWQ6IDAgfSxcbiAgICAgICAgICAgIHRpbWVTdGFtcDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZG93bkV2ZW50ICAgPSBudWxsOyAgICAvLyBwb2ludGVyZG93bi9tb3VzZWRvd24vdG91Y2hzdGFydCBldmVudFxuICAgICAgICB0aGlzLmRvd25Qb2ludGVyID0ge307XG5cbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXQgICAgPSBudWxsO1xuICAgICAgICB0aGlzLl9jdXJFdmVudFRhcmdldCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5wcmV2RXZlbnQgPSBudWxsOyAgICAgIC8vIHByZXZpb3VzIGFjdGlvbiBldmVudFxuICAgICAgICB0aGlzLnRhcFRpbWUgICA9IDA7ICAgICAgICAgLy8gdGltZSBvZiB0aGUgbW9zdCByZWNlbnQgdGFwIGV2ZW50XG4gICAgICAgIHRoaXMucHJldlRhcCAgID0gbnVsbDtcblxuICAgICAgICB0aGlzLnN0YXJ0T2Zmc2V0ICAgID0geyBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiAwLCBib3R0b206IDAgfTtcbiAgICAgICAgdGhpcy5yZXN0cmljdE9mZnNldCA9IHsgbGVmdDogMCwgcmlnaHQ6IDAsIHRvcDogMCwgYm90dG9tOiAwIH07XG4gICAgICAgIHRoaXMuc25hcE9mZnNldHMgICAgPSBbXTtcblxuICAgICAgICB0aGlzLmdlc3R1cmUgPSB7XG4gICAgICAgICAgICBzdGFydDogeyB4OiAwLCB5OiAwIH0sXG5cbiAgICAgICAgICAgIHN0YXJ0RGlzdGFuY2U6IDAsICAgLy8gZGlzdGFuY2UgYmV0d2VlbiB0d28gdG91Y2hlcyBvZiB0b3VjaFN0YXJ0XG4gICAgICAgICAgICBwcmV2RGlzdGFuY2UgOiAwLFxuICAgICAgICAgICAgZGlzdGFuY2UgICAgIDogMCxcblxuICAgICAgICAgICAgc2NhbGU6IDEsICAgICAgICAgICAvLyBnZXN0dXJlLmRpc3RhbmNlIC8gZ2VzdHVyZS5zdGFydERpc3RhbmNlXG5cbiAgICAgICAgICAgIHN0YXJ0QW5nbGU6IDAsICAgICAgLy8gYW5nbGUgb2YgbGluZSBqb2luaW5nIHR3byB0b3VjaGVzXG4gICAgICAgICAgICBwcmV2QW5nbGUgOiAwICAgICAgIC8vIGFuZ2xlIG9mIHRoZSBwcmV2aW91cyBnZXN0dXJlIGV2ZW50XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zbmFwU3RhdHVzID0ge1xuICAgICAgICAgICAgeCAgICAgICA6IDAsIHkgICAgICAgOiAwLFxuICAgICAgICAgICAgZHggICAgICA6IDAsIGR5ICAgICAgOiAwLFxuICAgICAgICAgICAgcmVhbFggICA6IDAsIHJlYWxZICAgOiAwLFxuICAgICAgICAgICAgc25hcHBlZFg6IDAsIHNuYXBwZWRZOiAwLFxuICAgICAgICAgICAgdGFyZ2V0cyA6IFtdLFxuICAgICAgICAgICAgbG9ja2VkICA6IGZhbHNlLFxuICAgICAgICAgICAgY2hhbmdlZCA6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZXN0cmljdFN0YXR1cyA9IHtcbiAgICAgICAgICAgIGR4ICAgICAgICAgOiAwLCBkeSAgICAgICAgIDogMCxcbiAgICAgICAgICAgIHJlc3RyaWN0ZWRYOiAwLCByZXN0cmljdGVkWTogMCxcbiAgICAgICAgICAgIHNuYXAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgcmVzdHJpY3RlZCA6IGZhbHNlLFxuICAgICAgICAgICAgY2hhbmdlZCAgICA6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZXN0cmljdFN0YXR1cy5zbmFwID0gdGhpcy5zbmFwU3RhdHVzO1xuXG4gICAgICAgIHRoaXMucG9pbnRlcklzRG93biAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMucG9pbnRlcldhc01vdmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2VzdHVyaW5nICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzaXppbmcgICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzaXplQXhlcyAgICAgID0gJ3h5JztcblxuICAgICAgICB0aGlzLm1vdXNlID0gZmFsc2U7XG5cbiAgICAgICAgaW50ZXJhY3Rpb25zLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgSW50ZXJhY3Rpb24ucHJvdG90eXBlID0ge1xuICAgICAgICBnZXRQYWdlWFkgIDogZnVuY3Rpb24gKHBvaW50ZXIsIHh5KSB7IHJldHVybiAgIGdldFBhZ2VYWShwb2ludGVyLCB4eSwgdGhpcyk7IH0sXG4gICAgICAgIGdldENsaWVudFhZOiBmdW5jdGlvbiAocG9pbnRlciwgeHkpIHsgcmV0dXJuIGdldENsaWVudFhZKHBvaW50ZXIsIHh5LCB0aGlzKTsgfSxcbiAgICAgICAgc2V0RXZlbnRYWSA6IGZ1bmN0aW9uICh0YXJnZXQsIHB0cikgeyByZXR1cm4gIHNldEV2ZW50WFkodGFyZ2V0LCBwdHIsIHRoaXMpOyB9LFxuXG4gICAgICAgIHBvaW50ZXJPdmVyOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVwYXJlZC5uYW1lIHx8ICF0aGlzLm1vdXNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB2YXIgY3VyTWF0Y2hlcyA9IFtdLFxuICAgICAgICAgICAgICAgIGN1ck1hdGNoRWxlbWVudHMgPSBbXSxcbiAgICAgICAgICAgICAgICBwcmV2VGFyZ2V0RWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblxuICAgICAgICAgICAgdGhpcy5hZGRQb2ludGVyKHBvaW50ZXIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXRcbiAgICAgICAgICAgICAgICAmJiAodGVzdElnbm9yZSh0aGlzLnRhcmdldCwgdGhpcy5lbGVtZW50LCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgfHwgIXRlc3RBbGxvdyh0aGlzLnRhcmdldCwgdGhpcy5lbGVtZW50LCBldmVudFRhcmdldCkpKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGV2ZW50VGFyZ2V0IHNob3VsZCBiZSBpZ25vcmVkIG9yIHNob3VsZG4ndCBiZSBhbGxvd2VkXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgdGhlIHByZXZpb3VzIHRhcmdldFxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hFbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZWxlbWVudEludGVyYWN0YWJsZSA9IGludGVyYWN0YWJsZXMuZ2V0KGV2ZW50VGFyZ2V0KSxcbiAgICAgICAgICAgICAgICBlbGVtZW50QWN0aW9uID0gKGVsZW1lbnRJbnRlcmFjdGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICF0ZXN0SWdub3JlKGVsZW1lbnRJbnRlcmFjdGFibGUsIGV2ZW50VGFyZ2V0LCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRlc3RBbGxvdyhlbGVtZW50SW50ZXJhY3RhYmxlLCBldmVudFRhcmdldCwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWxpZGF0ZUFjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50SW50ZXJhY3RhYmxlLmdldEFjdGlvbihwb2ludGVyLCBldmVudCwgdGhpcywgZXZlbnRUYXJnZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRJbnRlcmFjdGFibGUpKTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRBY3Rpb24gJiYgIXdpdGhpbkludGVyYWN0aW9uTGltaXQoZWxlbWVudEludGVyYWN0YWJsZSwgZXZlbnRUYXJnZXQsIGVsZW1lbnRBY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgIGVsZW1lbnRBY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBwdXNoQ3VyTWF0Y2hlcyAoaW50ZXJhY3RhYmxlLCBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcmFjdGFibGVcbiAgICAgICAgICAgICAgICAgICAgJiYgaW5Db250ZXh0KGludGVyYWN0YWJsZSwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICYmICF0ZXN0SWdub3JlKGludGVyYWN0YWJsZSwgZXZlbnRUYXJnZXQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAmJiB0ZXN0QWxsb3coaW50ZXJhY3RhYmxlLCBldmVudFRhcmdldCwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICYmIG1hdGNoZXNTZWxlY3RvcihldmVudFRhcmdldCwgc2VsZWN0b3IpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyTWF0Y2hlcy5wdXNoKGludGVyYWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1ck1hdGNoRWxlbWVudHMucHVzaChldmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZWxlbWVudEFjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gZWxlbWVudEludGVyYWN0YWJsZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBldmVudFRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoRWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGludGVyYWN0YWJsZXMuZm9yRWFjaFNlbGVjdG9yKHB1c2hDdXJNYXRjaGVzKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlU2VsZWN0b3IocG9pbnRlciwgZXZlbnQsIGN1ck1hdGNoZXMsIGN1ck1hdGNoRWxlbWVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IGN1ck1hdGNoZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hFbGVtZW50cyA9IGN1ck1hdGNoRWxlbWVudHM7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludGVySG92ZXIocG9pbnRlciwgZXZlbnQsIHRoaXMubWF0Y2hlcywgdGhpcy5tYXRjaEVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmFkZChldmVudFRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0c1BvaW50ZXJFdmVudD8gcEV2ZW50VHlwZXMubW92ZSA6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5wb2ludGVySG92ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZUNvbnRhaW5zKHByZXZUYXJnZXRFbGVtZW50LCBldmVudFRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlckhvdmVyKHBvaW50ZXIsIGV2ZW50LCB0aGlzLm1hdGNoZXMsIHRoaXMubWF0Y2hFbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMuYWRkKHRoaXMuZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydHNQb2ludGVyRXZlbnQ/IHBFdmVudFR5cGVzLm1vdmUgOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnBvaW50ZXJIb3Zlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoRWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDaGVjayB3aGF0IGFjdGlvbiB3b3VsZCBiZSBwZXJmb3JtZWQgb24gcG9pbnRlck1vdmUgdGFyZ2V0IGlmIGEgbW91c2VcbiAgICAgICAgLy8gYnV0dG9uIHdlcmUgcHJlc3NlZCBhbmQgY2hhbmdlIHRoZSBjdXJzb3IgYWNjb3JkaW5nbHlcbiAgICAgICAgcG9pbnRlckhvdmVyOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCwgbWF0Y2hlcywgbWF0Y2hFbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMucHJlcGFyZWQubmFtZSAmJiB0aGlzLm1vdXNlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHBvaW50ZXIgY29vcmRzIGZvciBkZWZhdWx0QWN0aW9uQ2hlY2tlciB0byB1c2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldEV2ZW50WFkodGhpcy5jdXJDb29yZHMsIFtwb2ludGVyXSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSB0aGlzLnZhbGlkYXRlU2VsZWN0b3IocG9pbnRlciwgZXZlbnQsIG1hdGNoZXMsIG1hdGNoRWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gdmFsaWRhdGVBY3Rpb24odGFyZ2V0LmdldEFjdGlvbih0aGlzLnBvaW50ZXJzWzBdLCBldmVudCwgdGhpcywgdGhpcy5lbGVtZW50KSwgdGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9IGdldEFjdGlvbkN1cnNvcihhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcmVwYXJlZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50LCB0YXJnZXQsIHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9pbnRlck91dDogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlcGFyZWQubmFtZSkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRlbXBvcmFyeSBldmVudCBsaXN0ZW5lcnMgZm9yIHNlbGVjdG9yIEludGVyYWN0YWJsZXNcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RhYmxlcy5nZXQoZXZlbnRUYXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLnJlbW92ZShldmVudFRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnRzUG9pbnRlckV2ZW50PyBwRXZlbnRUeXBlcy5tb3ZlIDogJ21vdXNlbW92ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMucG9pbnRlckhvdmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0Lm9wdGlvbnMuc3R5bGVDdXJzb3IgJiYgIXRoaXMuaW50ZXJhY3RpbmcoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNlbGVjdG9yRG93bjogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICAvLyBjb3B5IGV2ZW50IHRvIGJlIHVzZWQgaW4gdGltZW91dCBmb3IgSUU4XG4gICAgICAgICAgICAgICAgZXZlbnRDb3B5ID0gZXZlbnRzLnVzZUF0dGFjaEV2ZW50PyBleHRlbmQoe30sIGV2ZW50KSA6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBldmVudFRhcmdldCxcbiAgICAgICAgICAgICAgICBwb2ludGVySW5kZXggPSB0aGlzLmFkZFBvaW50ZXIocG9pbnRlciksXG4gICAgICAgICAgICAgICAgYWN0aW9uO1xuXG4gICAgICAgICAgICB0aGlzLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoYXQucG9pbnRlckhvbGQoZXZlbnRzLnVzZUF0dGFjaEV2ZW50PyBldmVudENvcHkgOiBwb2ludGVyLCBldmVudENvcHksIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCk7XG4gICAgICAgICAgICB9LCBkZWZhdWx0T3B0aW9ucy5faG9sZER1cmF0aW9uKTtcblxuICAgICAgICAgICAgdGhpcy5wb2ludGVySXNEb3duID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGRvd24gZXZlbnQgaGl0cyB0aGUgY3VycmVudCBpbmVydGlhIHRhcmdldFxuICAgICAgICAgICAgaWYgKHRoaXMuaW5lcnRpYVN0YXR1cy5hY3RpdmUgJiYgdGhpcy50YXJnZXQuc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAvLyBjbGltYiB1cCB0aGUgRE9NIHRyZWUgZnJvbSB0aGUgZXZlbnQgdGFyZ2V0XG4gICAgICAgICAgICAgICAgd2hpbGUgKGlzRWxlbWVudChlbGVtZW50KSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgZWxlbWVudCBpcyB0aGUgY3VycmVudCBpbmVydGlhIHRhcmdldCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSB0aGlzLmVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgcHJvc3BlY3RpdmUgYWN0aW9uIGlzIHRoZSBzYW1lIGFzIHRoZSBvbmdvaW5nIG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsaWRhdGVBY3Rpb24odGhpcy50YXJnZXQuZ2V0QWN0aW9uKHBvaW50ZXIsIGV2ZW50LCB0aGlzLCB0aGlzLmVsZW1lbnQpLCB0aGlzLnRhcmdldCkubmFtZSA9PT0gdGhpcy5wcmVwYXJlZC5uYW1lKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0b3AgaW5lcnRpYSBzbyB0aGF0IHRoZSBuZXh0IG1vdmUgd2lsbCBiZSBhIG5vcm1hbCBvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEZyYW1lKHRoaXMuaW5lcnRpYVN0YXR1cy5pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5lcnRpYVN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0RXZlbnRUYXJnZXRzKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgJ2Rvd24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gcGFyZW50RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgaWYgaW50ZXJhY3RpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVyYWN0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RFdmVudFRhcmdldHMocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCAnZG93bicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gcHVzaE1hdGNoZXMgKGludGVyYWN0YWJsZSwgc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBpZThNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluQ29udGV4dChpbnRlcmFjdGFibGUsIGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICYmICF0ZXN0SWdub3JlKGludGVyYWN0YWJsZSwgZWxlbWVudCwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICYmIHRlc3RBbGxvdyhpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IsIGVsZW1lbnRzKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubWF0Y2hlcy5wdXNoKGludGVyYWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubWF0Y2hFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdXBkYXRlIHBvaW50ZXIgY29vcmRzIGZvciBkZWZhdWx0QWN0aW9uQ2hlY2tlciB0byB1c2VcbiAgICAgICAgICAgIHRoaXMuc2V0RXZlbnRYWSh0aGlzLmN1ckNvb3JkcywgW3BvaW50ZXJdKTtcbiAgICAgICAgICAgIHRoaXMuZG93bkV2ZW50ID0gZXZlbnQ7XG5cbiAgICAgICAgICAgIHdoaWxlIChpc0VsZW1lbnQoZWxlbWVudCkgJiYgIWFjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hFbGVtZW50cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgaW50ZXJhY3RhYmxlcy5mb3JFYWNoU2VsZWN0b3IocHVzaE1hdGNoZXMpO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gdGhpcy52YWxpZGF0ZVNlbGVjdG9yKHBvaW50ZXIsIGV2ZW50LCB0aGlzLm1hdGNoZXMsIHRoaXMubWF0Y2hFbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkLm5hbWUgID0gYWN0aW9uLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZC5heGlzICA9IGFjdGlvbi5heGlzO1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWQuZWRnZXMgPSBhY3Rpb24uZWRnZXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RFdmVudFRhcmdldHMocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCAnZG93bicpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRlckRvd24ocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCwgYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGRvIHRoZXNlIG5vdyBzaW5jZSBwb2ludGVyRG93biBpc24ndCBiZWluZyBjYWxsZWQgZnJvbSBoZXJlXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duVGltZXNbcG9pbnRlckluZGV4XSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZG93blRhcmdldHNbcG9pbnRlckluZGV4XSA9IGV2ZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFeHRlbmQodGhpcy5kb3duUG9pbnRlciwgcG9pbnRlcik7XG5cbiAgICAgICAgICAgICAgICBjb3B5Q29vcmRzKHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlcldhc01vdmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEV2ZW50VGFyZ2V0cyhwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsICdkb3duJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQgb24gbmV4dCBwb2ludGVyTW92ZSBhbmQgYWRkIGFwcHJvcHJpYXRlXG4gICAgICAgIC8vIHN0eWxlIGFuZCBldmVudCBMaXN0ZW5lcnNcbiAgICAgICAgcG9pbnRlckRvd246IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0LCBmb3JjZUFjdGlvbikge1xuICAgICAgICAgICAgaWYgKCFmb3JjZUFjdGlvbiAmJiAhdGhpcy5pbmVydGlhU3RhdHVzLmFjdGl2ZSAmJiB0aGlzLnBvaW50ZXJXYXNNb3ZlZCAmJiB0aGlzLnByZXBhcmVkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQsIHRoaXMudGFyZ2V0LCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJJc0Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kb3duRXZlbnQgPSBldmVudDtcblxuICAgICAgICAgICAgdmFyIHBvaW50ZXJJbmRleCA9IHRoaXMuYWRkUG9pbnRlcihwb2ludGVyKSxcbiAgICAgICAgICAgICAgICBhY3Rpb247XG5cbiAgICAgICAgICAgIC8vIElmIGl0IGlzIHRoZSBzZWNvbmQgdG91Y2ggb2YgYSBtdWx0aS10b3VjaCBnZXN0dXJlLCBrZWVwIHRoZVxuICAgICAgICAgICAgLy8gdGFyZ2V0IHRoZSBzYW1lIGFuZCBnZXQgYSBuZXcgYWN0aW9uIGlmIGEgdGFyZ2V0IHdhcyBzZXQgYnkgdGhlXG4gICAgICAgICAgICAvLyBmaXJzdCB0b3VjaFxuICAgICAgICAgICAgaWYgKHRoaXMucG9pbnRlcklkcy5sZW5ndGggPiAxICYmIHRoaXMudGFyZ2V0Ll9lbGVtZW50ID09PSB0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3QWN0aW9uID0gdmFsaWRhdGVBY3Rpb24oZm9yY2VBY3Rpb24gfHwgdGhpcy50YXJnZXQuZ2V0QWN0aW9uKHBvaW50ZXIsIGV2ZW50LCB0aGlzLCB0aGlzLmVsZW1lbnQpLCB0aGlzLnRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAod2l0aGluSW50ZXJhY3Rpb25MaW1pdCh0aGlzLnRhcmdldCwgdGhpcy5lbGVtZW50LCBuZXdBY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IG5ld0FjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkLm5hbWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBzZXQgdGhlIHRhcmdldCBpZiB0aGVyZSBpcyBubyBhY3Rpb24gcHJlcGFyZWRcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnByZXBhcmVkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW50ZXJhY3RhYmxlID0gaW50ZXJhY3RhYmxlcy5nZXQoY3VyRXZlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGludGVyYWN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAmJiAhdGVzdElnbm9yZShpbnRlcmFjdGFibGUsIGN1ckV2ZW50VGFyZ2V0LCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgJiYgdGVzdEFsbG93KGludGVyYWN0YWJsZSwgY3VyRXZlbnRUYXJnZXQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAmJiAoYWN0aW9uID0gdmFsaWRhdGVBY3Rpb24oZm9yY2VBY3Rpb24gfHwgaW50ZXJhY3RhYmxlLmdldEFjdGlvbihwb2ludGVyLCBldmVudCwgdGhpcywgY3VyRXZlbnRUYXJnZXQpLCBpbnRlcmFjdGFibGUsIGV2ZW50VGFyZ2V0KSlcbiAgICAgICAgICAgICAgICAgICAgJiYgd2l0aGluSW50ZXJhY3Rpb25MaW1pdChpbnRlcmFjdGFibGUsIGN1ckV2ZW50VGFyZ2V0LCBhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gaW50ZXJhY3RhYmxlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBjdXJFdmVudFRhcmdldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gdGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICYmIChmb3JjZUFjdGlvbiB8fCAhdGhpcy5wcmVwYXJlZC5uYW1lKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbiA9IGFjdGlvbiB8fCB2YWxpZGF0ZUFjdGlvbihmb3JjZUFjdGlvbiB8fCB0YXJnZXQuZ2V0QWN0aW9uKHBvaW50ZXIsIGV2ZW50LCB0aGlzLCBjdXJFdmVudFRhcmdldCksIHRhcmdldCwgdGhpcy5lbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RXZlbnRYWSh0aGlzLnN0YXJ0Q29vcmRzLCB0aGlzLnBvaW50ZXJzKTtcblxuICAgICAgICAgICAgICAgIGlmICghYWN0aW9uKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9IGdldEFjdGlvbkN1cnNvcihhY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplQXhlcyA9IGFjdGlvbi5uYW1lID09PSAncmVzaXplJz8gYWN0aW9uLmF4aXMgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2dlc3R1cmUnICYmIHRoaXMucG9pbnRlcklkcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZC5uYW1lICA9IGFjdGlvbi5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWQuYXhpcyAgPSBhY3Rpb24uYXhpcztcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkLmVkZ2VzID0gYWN0aW9uLmVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zbmFwU3RhdHVzLnNuYXBwZWRYID0gdGhpcy5zbmFwU3RhdHVzLnNuYXBwZWRZID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN0cmljdFN0YXR1cy5yZXN0cmljdGVkWCA9IHRoaXMucmVzdHJpY3RTdGF0dXMucmVzdHJpY3RlZFkgPSBOYU47XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRvd25UaW1lc1twb2ludGVySW5kZXhdID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3duVGFyZ2V0c1twb2ludGVySW5kZXhdID0gZXZlbnRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgcG9pbnRlckV4dGVuZCh0aGlzLmRvd25Qb2ludGVyLCBwb2ludGVyKTtcblxuICAgICAgICAgICAgICAgIGNvcHlDb29yZHModGhpcy5wcmV2Q29vcmRzLCB0aGlzLnN0YXJ0Q29vcmRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJXYXNNb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50LCB0YXJnZXQsIHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBpbmVydGlhIGlzIGFjdGl2ZSB0cnkgdG8gcmVzdW1lIGFjdGlvblxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pbmVydGlhU3RhdHVzLmFjdGl2ZVxuICAgICAgICAgICAgICAgICYmIGN1ckV2ZW50VGFyZ2V0ID09PSB0aGlzLmVsZW1lbnRcbiAgICAgICAgICAgICAgICAmJiB2YWxpZGF0ZUFjdGlvbih0YXJnZXQuZ2V0QWN0aW9uKHBvaW50ZXIsIGV2ZW50LCB0aGlzLCB0aGlzLmVsZW1lbnQpLCB0YXJnZXQpLm5hbWUgPT09IHRoaXMucHJlcGFyZWQubmFtZSkge1xuXG4gICAgICAgICAgICAgICAgY2FuY2VsRnJhbWUodGhpcy5pbmVydGlhU3RhdHVzLmkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5lcnRpYVN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdChldmVudCwgdGFyZ2V0LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldE1vZGlmaWNhdGlvbnM6IGZ1bmN0aW9uIChjb29yZHMsIHByZUVuZCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCAgICAgICAgID0gdGhpcy50YXJnZXQsXG4gICAgICAgICAgICAgICAgc2hvdWxkTW92ZSAgICAgPSB0cnVlLFxuICAgICAgICAgICAgICAgIHNob3VsZFNuYXAgICAgID0gY2hlY2tTbmFwKHRhcmdldCwgdGhpcy5wcmVwYXJlZC5uYW1lKSAgICAgJiYgKCF0YXJnZXQub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLnNuYXAuZW5kT25seSAgICAgfHwgcHJlRW5kKSxcbiAgICAgICAgICAgICAgICBzaG91bGRSZXN0cmljdCA9IGNoZWNrUmVzdHJpY3QodGFyZ2V0LCB0aGlzLnByZXBhcmVkLm5hbWUpICYmICghdGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5yZXN0cmljdC5lbmRPbmx5IHx8IHByZUVuZCk7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRTbmFwICAgICkgeyB0aGlzLnNldFNuYXBwaW5nICAgKGNvb3Jkcyk7IH0gZWxzZSB7IHRoaXMuc25hcFN0YXR1cyAgICAubG9ja2VkICAgICA9IGZhbHNlOyB9XG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVzdHJpY3QpIHsgdGhpcy5zZXRSZXN0cmljdGlvbihjb29yZHMpOyB9IGVsc2UgeyB0aGlzLnJlc3RyaWN0U3RhdHVzLnJlc3RyaWN0ZWQgPSBmYWxzZTsgfVxuXG4gICAgICAgICAgICBpZiAoc2hvdWxkU25hcCAmJiB0aGlzLnNuYXBTdGF0dXMubG9ja2VkICYmICF0aGlzLnNuYXBTdGF0dXMuY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHNob3VsZE1vdmUgPSBzaG91bGRSZXN0cmljdCAmJiB0aGlzLnJlc3RyaWN0U3RhdHVzLnJlc3RyaWN0ZWQgJiYgdGhpcy5yZXN0cmljdFN0YXR1cy5jaGFuZ2VkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2hvdWxkUmVzdHJpY3QgJiYgdGhpcy5yZXN0cmljdFN0YXR1cy5yZXN0cmljdGVkICYmICF0aGlzLnJlc3RyaWN0U3RhdHVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBzaG91bGRNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzaG91bGRNb3ZlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFN0YXJ0T2Zmc2V0czogZnVuY3Rpb24gKGFjdGlvbiwgaW50ZXJhY3RhYmxlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgcmVjdCA9IGludGVyYWN0YWJsZS5nZXRSZWN0KGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIG9yaWdpbiA9IGdldE9yaWdpblhZKGludGVyYWN0YWJsZSwgZWxlbWVudCksXG4gICAgICAgICAgICAgICAgc25hcCA9IGludGVyYWN0YWJsZS5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0uc25hcCxcbiAgICAgICAgICAgICAgICByZXN0cmljdCA9IGludGVyYWN0YWJsZS5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0ucmVzdHJpY3QsXG4gICAgICAgICAgICAgICAgd2lkdGgsIGhlaWdodDtcblxuICAgICAgICAgICAgaWYgKHJlY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0T2Zmc2V0LmxlZnQgPSB0aGlzLnN0YXJ0Q29vcmRzLnBhZ2UueCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0T2Zmc2V0LnRvcCAgPSB0aGlzLnN0YXJ0Q29vcmRzLnBhZ2UueSAtIHJlY3QudG9wO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE9mZnNldC5yaWdodCAgPSByZWN0LnJpZ2h0ICAtIHRoaXMuc3RhcnRDb29yZHMucGFnZS54O1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRPZmZzZXQuYm90dG9tID0gcmVjdC5ib3R0b20gLSB0aGlzLnN0YXJ0Q29vcmRzLnBhZ2UueTtcblxuICAgICAgICAgICAgICAgIGlmICgnd2lkdGgnIGluIHJlY3QpIHsgd2lkdGggPSByZWN0LndpZHRoOyB9XG4gICAgICAgICAgICAgICAgZWxzZSB7IHdpZHRoID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdDsgfVxuICAgICAgICAgICAgICAgIGlmICgnaGVpZ2h0JyBpbiByZWN0KSB7IGhlaWdodCA9IHJlY3QuaGVpZ2h0OyB9XG4gICAgICAgICAgICAgICAgZWxzZSB7IGhlaWdodCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3A7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRPZmZzZXQubGVmdCA9IHRoaXMuc3RhcnRPZmZzZXQudG9wID0gdGhpcy5zdGFydE9mZnNldC5yaWdodCA9IHRoaXMuc3RhcnRPZmZzZXQuYm90dG9tID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zbmFwT2Zmc2V0cy5zcGxpY2UoMCk7XG5cbiAgICAgICAgICAgIHZhciBzbmFwT2Zmc2V0ID0gc25hcCAmJiBzbmFwLm9mZnNldCA9PT0gJ3N0YXJ0Q29vcmRzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuc3RhcnRDb29yZHMucGFnZS54IC0gb3JpZ2luLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnN0YXJ0Q29vcmRzLnBhZ2UueSAtIG9yaWdpbi55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzbmFwICYmIHNuYXAub2Zmc2V0IHx8IHsgeDogMCwgeTogMCB9O1xuXG4gICAgICAgICAgICBpZiAocmVjdCAmJiBzbmFwICYmIHNuYXAucmVsYXRpdmVQb2ludHMgJiYgc25hcC5yZWxhdGl2ZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNuYXAucmVsYXRpdmVQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbmFwT2Zmc2V0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuc3RhcnRPZmZzZXQubGVmdCAtICh3aWR0aCAgKiBzbmFwLnJlbGF0aXZlUG9pbnRzW2ldLngpICsgc25hcE9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5zdGFydE9mZnNldC50b3AgIC0gKGhlaWdodCAqIHNuYXAucmVsYXRpdmVQb2ludHNbaV0ueSkgKyBzbmFwT2Zmc2V0LnlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbmFwT2Zmc2V0cy5wdXNoKHNuYXBPZmZzZXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVjdCAmJiByZXN0cmljdC5lbGVtZW50UmVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdHJpY3RPZmZzZXQubGVmdCA9IHRoaXMuc3RhcnRPZmZzZXQubGVmdCAtICh3aWR0aCAgKiByZXN0cmljdC5lbGVtZW50UmVjdC5sZWZ0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RyaWN0T2Zmc2V0LnRvcCAgPSB0aGlzLnN0YXJ0T2Zmc2V0LnRvcCAgLSAoaGVpZ2h0ICogcmVzdHJpY3QuZWxlbWVudFJlY3QudG9wKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVzdHJpY3RPZmZzZXQucmlnaHQgID0gdGhpcy5zdGFydE9mZnNldC5yaWdodCAgLSAod2lkdGggICogKDEgLSByZXN0cmljdC5lbGVtZW50UmVjdC5yaWdodCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdHJpY3RPZmZzZXQuYm90dG9tID0gdGhpcy5zdGFydE9mZnNldC5ib3R0b20gLSAoaGVpZ2h0ICogKDEgLSByZXN0cmljdC5lbGVtZW50UmVjdC5ib3R0b20pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdHJpY3RPZmZzZXQubGVmdCA9IHRoaXMucmVzdHJpY3RPZmZzZXQudG9wID0gdGhpcy5yZXN0cmljdE9mZnNldC5yaWdodCA9IHRoaXMucmVzdHJpY3RPZmZzZXQuYm90dG9tID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0aW9uLnN0YXJ0XG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIFN0YXJ0IGFuIGFjdGlvbiB3aXRoIHRoZSBnaXZlbiBJbnRlcmFjdGFibGUgYW5kIEVsZW1lbnQgYXMgdGFydGdldHMuIFRoZVxuICAgICAgICAgKiBhY3Rpb24gbXVzdCBiZSBlbmFibGVkIGZvciB0aGUgdGFyZ2V0IEludGVyYWN0YWJsZSBhbmQgYW4gYXBwcm9wcmlhdGUgbnVtYmVyXG4gICAgICAgICAqIG9mIHBvaW50ZXJzIG11c3QgYmUgaGVsZCBkb3duIOKAkyAxIGZvciBkcmFnL3Jlc2l6ZSwgMiBmb3IgZ2VzdHVyZS5cbiAgICAgICAgICpcbiAgICAgICAgICogVXNlIGl0IHdpdGggYGludGVyYWN0YWJsZS48YWN0aW9uPmFibGUoeyBtYW51YWxTdGFydDogZmFsc2UgfSlgIHRvIGFsd2F5c1xuICAgICAgICAgKiBbc3RhcnQgYWN0aW9ucyBtYW51YWxseV0oaHR0cHM6Ly9naXRodWIuY29tL3RheWUvaW50ZXJhY3QuanMvaXNzdWVzLzExNClcbiAgICAgICAgICpcbiAgICAgICAgIC0gYWN0aW9uICAgICAgIChvYmplY3QpICBUaGUgYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCAtIGRyYWcsIHJlc2l6ZSwgZXRjLlxuICAgICAgICAgLSBpbnRlcmFjdGFibGUgKEludGVyYWN0YWJsZSkgVGhlIEludGVyYWN0YWJsZSB0byB0YXJnZXRcbiAgICAgICAgIC0gZWxlbWVudCAgICAgIChFbGVtZW50KSBUaGUgRE9NIEVsZW1lbnQgdG8gdGFyZ2V0XG4gICAgICAgICA9IChvYmplY3QpIGludGVyYWN0XG4gICAgICAgICAqKlxuICAgICAgICAgfCBpbnRlcmFjdCh0YXJnZXQpXG4gICAgICAgICB8ICAgLmRyYWdnYWJsZSh7XG4gICAgICAgICB8ICAgICAvLyBkaXNhYmxlIHRoZSBkZWZhdWx0IGRyYWcgc3RhcnQgYnkgZG93bi0+bW92ZVxuICAgICAgICAgfCAgICAgbWFudWFsU3RhcnQ6IHRydWVcbiAgICAgICAgIHwgICB9KVxuICAgICAgICAgfCAgIC8vIHN0YXJ0IGRyYWdnaW5nIGFmdGVyIHRoZSB1c2VyIGhvbGRzIHRoZSBwb2ludGVyIGRvd25cbiAgICAgICAgIHwgICAub24oJ2hvbGQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgIHwgICAgIHZhciBpbnRlcmFjdGlvbiA9IGV2ZW50LmludGVyYWN0aW9uO1xuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7XG4gICAgICAgICB8ICAgICAgIGludGVyYWN0aW9uLnN0YXJ0KHsgbmFtZTogJ2RyYWcnIH0sXG4gICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmludGVyYWN0YWJsZSxcbiAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICB8ICAgICB9XG4gICAgICAgICB8IH0pO1xuICAgICAgICBcXCovXG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVyYWN0aW5nKClcbiAgICAgICAgICAgICAgICB8fCAhdGhpcy5wb2ludGVySXNEb3duXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wb2ludGVySWRzLmxlbmd0aCA8IChhY3Rpb24ubmFtZSA9PT0gJ2dlc3R1cmUnPyAyIDogMSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaW50ZXJhY3Rpb24gaGFkIGJlZW4gcmVtb3ZlZCBhZnRlciBzdG9wcGluZ1xuICAgICAgICAgICAgLy8gYWRkIGl0IGJhY2tcbiAgICAgICAgICAgIGlmIChpbmRleE9mKGludGVyYWN0aW9ucywgdGhpcykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpb25zLnB1c2godGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgc3RhcnRDb29yZHMgaWYgdGhlcmUgd2FzIG5vIHByZXBhcmVkIGFjdGlvblxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXBhcmVkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEV2ZW50WFkodGhpcy5zdGFydENvb3JkcywgdGhpcy5wb2ludGVycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWQubmFtZSAgPSBhY3Rpb24ubmFtZTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWQuYXhpcyAgPSBhY3Rpb24uYXhpcztcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWQuZWRnZXMgPSBhY3Rpb24uZWRnZXM7XG4gICAgICAgICAgICB0aGlzLnRhcmdldCAgICAgICAgID0gaW50ZXJhY3RhYmxlO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ICAgICAgICA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhcnRPZmZzZXRzKGFjdGlvbi5uYW1lLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zZXRNb2RpZmljYXRpb25zKHRoaXMuc3RhcnRDb29yZHMucGFnZSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJldkV2ZW50ID0gdGhpc1t0aGlzLnByZXBhcmVkLm5hbWUgKyAnU3RhcnQnXSh0aGlzLmRvd25FdmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9pbnRlck1vdmU6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0LCBwcmVFbmQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluZXJ0aWFTdGF0dXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhZ2VVcCAgID0gdGhpcy5pbmVydGlhU3RhdHVzLnVwQ29vcmRzLnBhZ2U7XG4gICAgICAgICAgICAgICAgdmFyIGNsaWVudFVwID0gdGhpcy5pbmVydGlhU3RhdHVzLnVwQ29vcmRzLmNsaWVudDtcblxuICAgICAgICAgICAgICAgIHZhciBpbmVydGlhUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VYICA6IHBhZ2VVcC54ICAgKyB0aGlzLmluZXJ0aWFTdGF0dXMuc3gsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VZICA6IHBhZ2VVcC55ICAgKyB0aGlzLmluZXJ0aWFTdGF0dXMuc3ksXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFg6IGNsaWVudFVwLnggKyB0aGlzLmluZXJ0aWFTdGF0dXMuc3gsXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFk6IGNsaWVudFVwLnkgKyB0aGlzLmluZXJ0aWFTdGF0dXMuc3lcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFdmVudFhZKHRoaXMuY3VyQ29vcmRzLCBbaW5lcnRpYVBvc2l0aW9uXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZFBvaW50ZXIocG9pbnRlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFdmVudFhZKHRoaXMuY3VyQ29vcmRzLCB0aGlzLnBvaW50ZXJzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR1cGxpY2F0ZU1vdmUgPSAodGhpcy5jdXJDb29yZHMucGFnZS54ID09PSB0aGlzLnByZXZDb29yZHMucGFnZS54XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmN1ckNvb3Jkcy5wYWdlLnkgPT09IHRoaXMucHJldkNvb3Jkcy5wYWdlLnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY3VyQ29vcmRzLmNsaWVudC54ID09PSB0aGlzLnByZXZDb29yZHMuY2xpZW50LnhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY3VyQ29vcmRzLmNsaWVudC55ID09PSB0aGlzLnByZXZDb29yZHMuY2xpZW50LnkpO1xuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LFxuICAgICAgICAgICAgICAgIHBvaW50ZXJJbmRleCA9IHRoaXMubW91c2U/IDAgOiBpbmRleE9mKHRoaXMucG9pbnRlcklkcywgZ2V0UG9pbnRlcklkKHBvaW50ZXIpKTtcblxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgbW92ZW1lbnQgZ3JlYXRlciB0aGFuIHBvaW50ZXJNb3ZlVG9sZXJhbmNlXG4gICAgICAgICAgICBpZiAodGhpcy5wb2ludGVySXNEb3duICYmICF0aGlzLnBvaW50ZXJXYXNNb3ZlZCkge1xuICAgICAgICAgICAgICAgIGR4ID0gdGhpcy5jdXJDb29yZHMuY2xpZW50LnggLSB0aGlzLnN0YXJ0Q29vcmRzLmNsaWVudC54O1xuICAgICAgICAgICAgICAgIGR5ID0gdGhpcy5jdXJDb29yZHMuY2xpZW50LnkgLSB0aGlzLnN0YXJ0Q29vcmRzLmNsaWVudC55O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyV2FzTW92ZWQgPSBoeXBvdChkeCwgZHkpID4gcG9pbnRlck1vdmVUb2xlcmFuY2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZHVwbGljYXRlTW92ZSAmJiAoIXRoaXMucG9pbnRlcklzRG93biB8fCB0aGlzLnBvaW50ZXJXYXNNb3ZlZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb2ludGVySXNEb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0RXZlbnRUYXJnZXRzKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgJ21vdmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLnBvaW50ZXJJc0Rvd24pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIGlmIChkdXBsaWNhdGVNb3ZlICYmIHRoaXMucG9pbnRlcldhc01vdmVkICYmICFwcmVFbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQsIHRoaXMudGFyZ2V0LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHBvaW50ZXIgY29vcmRpbmF0ZSwgdGltZSBjaGFuZ2VzIGFuZCBzcGVlZHNcbiAgICAgICAgICAgIHNldEV2ZW50RGVsdGFzKHRoaXMucG9pbnRlckRlbHRhLCB0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXBhcmVkLm5hbWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBvaW50ZXJXYXNNb3ZlZFxuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBtb3ZlbWVudCB3aGlsZSBpbmVydGlhIGlzIGFjdGl2ZVxuICAgICAgICAgICAgICAgICYmICghdGhpcy5pbmVydGlhU3RhdHVzLmFjdGl2ZSB8fCAocG9pbnRlciBpbnN0YW5jZW9mIEludGVyYWN0RXZlbnQgJiYgL2luZXJ0aWFzdGFydC8udGVzdChwb2ludGVyLnR5cGUpKSkpIHtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGp1c3Qgc3RhcnRpbmcgYW4gYWN0aW9uLCBjYWxjdWxhdGUgdGhlIHBvaW50ZXIgc3BlZWQgbm93XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmludGVyYWN0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXZlbnREZWx0YXModGhpcy5wb2ludGVyRGVsdGEsIHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGEgZHJhZyBpcyBpbiB0aGUgY29ycmVjdCBheGlzXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXBhcmVkLm5hbWUgPT09ICdkcmFnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFic1ggPSBNYXRoLmFicyhkeCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJzWSA9IE1hdGguYWJzKGR5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBeGlzID0gdGhpcy50YXJnZXQub3B0aW9ucy5kcmFnLmF4aXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXhpcyA9IChhYnNYID4gYWJzWSA/ICd4JyA6IGFic1ggPCBhYnNZID8gJ3knIDogJ3h5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBtb3ZlbWVudCBpc24ndCBpbiB0aGUgYXhpcyBvZiB0aGUgaW50ZXJhY3RhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcyAhPT0gJ3h5JyAmJiB0YXJnZXRBeGlzICE9PSAneHknICYmIHRhcmdldEF4aXMgIT09IGF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW5jZWwgdGhlIHByZXBhcmVkIGFjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWQubmFtZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIHRyeSB0byBnZXQgYSBkcmFnIGZyb20gYW5vdGhlciBpbmVyYWN0YWJsZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGVsZW1lbnQgaW50ZXJhY3RhYmxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChpc0VsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRJbnRlcmFjdGFibGUgPSBpbnRlcmFjdGFibGVzLmdldChlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudEludGVyYWN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZWxlbWVudEludGVyYWN0YWJsZSAhPT0gdGhpcy50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICFlbGVtZW50SW50ZXJhY3RhYmxlLm9wdGlvbnMuZHJhZy5tYW51YWxTdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZWxlbWVudEludGVyYWN0YWJsZS5nZXRBY3Rpb24odGhpcy5kb3duUG9pbnRlciwgdGhpcy5kb3duRXZlbnQsIHRoaXMsIGVsZW1lbnQpLm5hbWUgPT09ICdkcmFnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY2hlY2tBeGlzKGF4aXMsIGVsZW1lbnRJbnRlcmFjdGFibGUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWQubmFtZSA9ICdkcmFnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gZWxlbWVudEludGVyYWN0YWJsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gZHJhZyBmcm9tIGVsZW1lbnQgaW50ZXJhY3RhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgc2VsZWN0b3IgaW50ZXJhY3RhYmxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmVwYXJlZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGlzSW50ZXJhY3Rpb24gPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXREcmFnZ2FibGUgPSBmdW5jdGlvbiAoaW50ZXJhY3RhYmxlLCBzZWxlY3RvciwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gaWU4TWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnRlcmFjdGFibGUgPT09IHRoaXNJbnRlcmFjdGlvbi50YXJnZXQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbkNvbnRleHQoaW50ZXJhY3RhYmxlLCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAhaW50ZXJhY3RhYmxlLm9wdGlvbnMuZHJhZy5tYW51YWxTdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICF0ZXN0SWdub3JlKGludGVyYWN0YWJsZSwgZWxlbWVudCwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGVzdEFsbG93KGludGVyYWN0YWJsZSwgZWxlbWVudCwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yLCBlbGVtZW50cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBpbnRlcmFjdGFibGUuZ2V0QWN0aW9uKHRoaXNJbnRlcmFjdGlvbi5kb3duUG9pbnRlciwgdGhpc0ludGVyYWN0aW9uLmRvd25FdmVudCwgdGhpc0ludGVyYWN0aW9uLCBlbGVtZW50KS5uYW1lID09PSAnZHJhZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBjaGVja0F4aXMoYXhpcywgaW50ZXJhY3RhYmxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHdpdGhpbkludGVyYWN0aW9uTGltaXQoaW50ZXJhY3RhYmxlLCBlbGVtZW50LCAnZHJhZycpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJhY3RhYmxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaXNFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3JJbnRlcmFjdGFibGUgPSBpbnRlcmFjdGFibGVzLmZvckVhY2hTZWxlY3RvcihnZXREcmFnZ2FibGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3JJbnRlcmFjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkLm5hbWUgPSAnZHJhZyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBzZWxlY3RvckludGVyYWN0YWJsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gcGFyZW50RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzdGFydGluZyA9ICEhdGhpcy5wcmVwYXJlZC5uYW1lICYmICF0aGlzLmludGVyYWN0aW5nKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRpbmdcbiAgICAgICAgICAgICAgICAgICAgJiYgKHRoaXMudGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5tYW51YWxTdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgIXdpdGhpbkludGVyYWN0aW9uTGltaXQodGhpcy50YXJnZXQsIHRoaXMuZWxlbWVudCwgdGhpcy5wcmVwYXJlZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmVwYXJlZC5uYW1lICYmIHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCh0aGlzLnByZXBhcmVkLCB0aGlzLnRhcmdldCwgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaG91bGRNb3ZlID0gdGhpcy5zZXRNb2RpZmljYXRpb25zKHRoaXMuY3VyQ29vcmRzLnBhZ2UsIHByZUVuZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSBpZiBzbmFwcGluZyBvciByZXN0cmljdGlvbiBkb2Vzbid0IHByZXZlbnQgaXRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNob3VsZE1vdmUgfHwgc3RhcnRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldkV2ZW50ID0gdGhpc1t0aGlzLnByZXBhcmVkLm5hbWUgKyAnTW92ZSddKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdChldmVudCwgdGhpcy50YXJnZXQsIHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3B5Q29vcmRzKHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2luZyB8fCB0aGlzLnJlc2l6aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvU2Nyb2xsTW92ZShwb2ludGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkcmFnU3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGRyYWdFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KHRoaXMsIGV2ZW50LCAnZHJhZycsICdzdGFydCcsIHRoaXMuZWxlbWVudCk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuZmlyZShkcmFnRXZlbnQpO1xuXG4gICAgICAgICAgICAvLyByZXNldCBhY3RpdmUgZHJvcHpvbmVzXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZURyb3BzLmRyb3B6b25lcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVEcm9wcy5lbGVtZW50cyAgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRHJvcHMucmVjdHMgICAgID0gW107XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5keW5hbWljRHJvcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlRHJvcHModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRyb3BFdmVudHMgPSB0aGlzLmdldERyb3BFdmVudHMoZXZlbnQsIGRyYWdFdmVudCk7XG5cbiAgICAgICAgICAgIGlmIChkcm9wRXZlbnRzLmFjdGl2YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlQWN0aXZlRHJvcHMoZHJvcEV2ZW50cy5hY3RpdmF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkcmFnRXZlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZHJhZ01vdmU6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRyYWdFdmVudCAgPSBuZXcgSW50ZXJhY3RFdmVudCh0aGlzLCBldmVudCwgJ2RyYWcnLCAnbW92ZScsIHRoaXMuZWxlbWVudCksXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlRWxlbWVudCA9IHRoaXMuZWxlbWVudCxcbiAgICAgICAgICAgICAgICBkcm9wID0gdGhpcy5nZXREcm9wKGRyYWdFdmVudCwgZXZlbnQsIGRyYWdnYWJsZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmRyb3BUYXJnZXQgPSBkcm9wLmRyb3B6b25lO1xuICAgICAgICAgICAgdGhpcy5kcm9wRWxlbWVudCA9IGRyb3AuZWxlbWVudDtcblxuICAgICAgICAgICAgdmFyIGRyb3BFdmVudHMgPSB0aGlzLmdldERyb3BFdmVudHMoZXZlbnQsIGRyYWdFdmVudCk7XG5cbiAgICAgICAgICAgIHRhcmdldC5maXJlKGRyYWdFdmVudCk7XG5cbiAgICAgICAgICAgIGlmIChkcm9wRXZlbnRzLmxlYXZlKSB7IHRoaXMucHJldkRyb3BUYXJnZXQuZmlyZShkcm9wRXZlbnRzLmxlYXZlKTsgfVxuICAgICAgICAgICAgaWYgKGRyb3BFdmVudHMuZW50ZXIpIHsgICAgIHRoaXMuZHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMuZW50ZXIpOyB9XG4gICAgICAgICAgICBpZiAoZHJvcEV2ZW50cy5tb3ZlICkgeyAgICAgdGhpcy5kcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5tb3ZlICk7IH1cblxuICAgICAgICAgICAgdGhpcy5wcmV2RHJvcFRhcmdldCAgPSB0aGlzLmRyb3BUYXJnZXQ7XG4gICAgICAgICAgICB0aGlzLnByZXZEcm9wRWxlbWVudCA9IHRoaXMuZHJvcEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHJldHVybiBkcmFnRXZlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVzaXplU3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIHJlc2l6ZUV2ZW50ID0gbmV3IEludGVyYWN0RXZlbnQodGhpcywgZXZlbnQsICdyZXNpemUnLCAnc3RhcnQnLCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcmVwYXJlZC5lZGdlcykge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydFJlY3QgPSB0aGlzLnRhcmdldC5nZXRSZWN0KHRoaXMuZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAqIFdoZW4gdXNpbmcgdGhlIGByZXNpemFibGUuc3F1YXJlYCBvciBgcmVzaXphYmxlLnByZXNlcnZlQXNwZWN0UmF0aW9gIG9wdGlvbnMsIHJlc2l6aW5nIGZyb20gb25lIGVkZ2VcbiAgICAgICAgICAgICAgICAgKiB3aWxsIGFmZmVjdCBhbm90aGVyLiBFLmcuIHdpdGggYHJlc2l6YWJsZS5zcXVhcmVgLCByZXNpemluZyB0byBtYWtlIHRoZSByaWdodCBlZGdlIGxhcmdlciB3aWxsIG1ha2VcbiAgICAgICAgICAgICAgICAgKiB0aGUgYm90dG9tIGVkZ2UgbGFyZ2VyIGJ5IHRoZSBzYW1lIGFtb3VudC4gV2UgY2FsbCB0aGVzZSAnbGlua2VkJyBlZGdlcy4gQW55IGxpbmtlZCBlZGdlcyB3aWxsIGRlcGVuZFxuICAgICAgICAgICAgICAgICAqIG9uIHRoZSBhY3RpdmUgZWRnZXMgYW5kIHRoZSBlZGdlIGJlaW5nIGludGVyYWN0ZWQgd2l0aC5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXQub3B0aW9ucy5yZXNpemUuc3F1YXJlIHx8IHRoaXMudGFyZ2V0Lm9wdGlvbnMucmVzaXplLnByZXNlcnZlQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtlZEVkZ2VzID0gZXh0ZW5kKHt9LCB0aGlzLnByZXBhcmVkLmVkZ2VzKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rZWRFZGdlcy50b3AgICAgPSBsaW5rZWRFZGdlcy50b3AgICAgfHwgKGxpbmtlZEVkZ2VzLmxlZnQgICAmJiAhbGlua2VkRWRnZXMuYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgbGlua2VkRWRnZXMubGVmdCAgID0gbGlua2VkRWRnZXMubGVmdCAgIHx8IChsaW5rZWRFZGdlcy50b3AgICAgJiYgIWxpbmtlZEVkZ2VzLnJpZ2h0ICk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtlZEVkZ2VzLmJvdHRvbSA9IGxpbmtlZEVkZ2VzLmJvdHRvbSB8fCAobGlua2VkRWRnZXMucmlnaHQgICYmICFsaW5rZWRFZGdlcy50b3AgICApO1xuICAgICAgICAgICAgICAgICAgICBsaW5rZWRFZGdlcy5yaWdodCAgPSBsaW5rZWRFZGdlcy5yaWdodCAgfHwgKGxpbmtlZEVkZ2VzLmJvdHRvbSAmJiAhbGlua2VkRWRnZXMubGVmdCAgKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkLl9saW5rZWRFZGdlcyA9IGxpbmtlZEVkZ2VzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZC5fbGlua2VkRWRnZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHVzaW5nIGByZXNpemFibGUucHJlc2VydmVBc3BlY3RSYXRpb2Agb3B0aW9uLCByZWNvcmQgYXNwZWN0IHJhdGlvIGF0IHRoZSBzdGFydCBvZiB0aGUgcmVzaXplXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0Lm9wdGlvbnMucmVzaXplLnByZXNlcnZlQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVTdGFydEFzcGVjdFJhdGlvID0gc3RhcnRSZWN0LndpZHRoIC8gc3RhcnRSZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZVJlY3RzID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGFydCAgICAgOiBzdGFydFJlY3QsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgICA6IGV4dGVuZCh7fSwgc3RhcnRSZWN0KSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3RlZDogZXh0ZW5kKHt9LCBzdGFydFJlY3QpLFxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyAgOiBleHRlbmQoe30sIHN0YXJ0UmVjdCksXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsIHJpZ2h0IDogMCwgd2lkdGggOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wIDogMCwgYm90dG9tOiAwLCBoZWlnaHQ6IDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXNpemVFdmVudC5yZWN0ID0gdGhpcy5yZXNpemVSZWN0cy5yZXN0cmljdGVkO1xuICAgICAgICAgICAgICAgIHJlc2l6ZUV2ZW50LmRlbHRhUmVjdCA9IHRoaXMucmVzaXplUmVjdHMuZGVsdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmZpcmUocmVzaXplRXZlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLnJlc2l6aW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc2l6ZUV2ZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlc2l6ZU1vdmU6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIHJlc2l6ZUV2ZW50ID0gbmV3IEludGVyYWN0RXZlbnQodGhpcywgZXZlbnQsICdyZXNpemUnLCAnbW92ZScsIHRoaXMuZWxlbWVudCk7XG5cbiAgICAgICAgICAgIHZhciBlZGdlcyA9IHRoaXMucHJlcGFyZWQuZWRnZXMsXG4gICAgICAgICAgICAgICAgaW52ZXJ0ID0gdGhpcy50YXJnZXQub3B0aW9ucy5yZXNpemUuaW52ZXJ0LFxuICAgICAgICAgICAgICAgIGludmVydGlibGUgPSBpbnZlcnQgPT09ICdyZXBvc2l0aW9uJyB8fCBpbnZlcnQgPT09ICduZWdhdGUnO1xuXG4gICAgICAgICAgICBpZiAoZWRnZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZHggPSByZXNpemVFdmVudC5keCxcbiAgICAgICAgICAgICAgICAgICAgZHkgPSByZXNpemVFdmVudC5keSxcblxuICAgICAgICAgICAgICAgICAgICBzdGFydCAgICAgID0gdGhpcy5yZXNpemVSZWN0cy5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCAgICA9IHRoaXMucmVzaXplUmVjdHMuY3VycmVudCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3RlZCA9IHRoaXMucmVzaXplUmVjdHMucmVzdHJpY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgICAgICA9IHRoaXMucmVzaXplUmVjdHMuZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzICAgPSBleHRlbmQodGhpcy5yZXNpemVSZWN0cy5wcmV2aW91cywgcmVzdHJpY3RlZCksXG5cbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFZGdlcyA9IGVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgLy8gYHJlc2l6ZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvYCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgYHJlc2l6ZS5zcXVhcmVgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0Lm9wdGlvbnMucmVzaXplLnByZXNlcnZlQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc2l6ZVN0YXJ0QXNwZWN0UmF0aW8gPSB0aGlzLnJlc2l6ZVN0YXJ0QXNwZWN0UmF0aW87XG5cbiAgICAgICAgICAgICAgICAgICAgZWRnZXMgPSB0aGlzLnByZXBhcmVkLl9saW5rZWRFZGdlcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKG9yaWdpbmFsRWRnZXMubGVmdCAmJiBvcmlnaW5hbEVkZ2VzLmJvdHRvbSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IChvcmlnaW5hbEVkZ2VzLnJpZ2h0ICYmIG9yaWdpbmFsRWRnZXMudG9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHkgPSAtZHggLyByZXNpemVTdGFydEFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9yaWdpbmFsRWRnZXMubGVmdCB8fCBvcmlnaW5hbEVkZ2VzLnJpZ2h0KSB7IGR5ID0gZHggLyByZXNpemVTdGFydEFzcGVjdFJhdGlvOyB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9yaWdpbmFsRWRnZXMudG9wIHx8IG9yaWdpbmFsRWRnZXMuYm90dG9tKSB7IGR4ID0gZHkgKiByZXNpemVTdGFydEFzcGVjdFJhdGlvOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudGFyZ2V0Lm9wdGlvbnMucmVzaXplLnNxdWFyZSkge1xuICAgICAgICAgICAgICAgICAgICBlZGdlcyA9IHRoaXMucHJlcGFyZWQuX2xpbmtlZEVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgob3JpZ2luYWxFZGdlcy5sZWZ0ICYmIG9yaWdpbmFsRWRnZXMuYm90dG9tKVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKG9yaWdpbmFsRWRnZXMucmlnaHQgJiYgb3JpZ2luYWxFZGdlcy50b3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkeSA9IC1keDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcmlnaW5hbEVkZ2VzLmxlZnQgfHwgb3JpZ2luYWxFZGdlcy5yaWdodCkgeyBkeSA9IGR4OyB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9yaWdpbmFsRWRnZXMudG9wIHx8IG9yaWdpbmFsRWRnZXMuYm90dG9tKSB7IGR4ID0gZHk7IH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlICdjdXJyZW50JyByZWN0IHdpdGhvdXQgbW9kaWZpY2F0aW9uc1xuICAgICAgICAgICAgICAgIGlmIChlZGdlcy50b3AgICApIHsgY3VycmVudC50b3AgICAgKz0gZHk7IH1cbiAgICAgICAgICAgICAgICBpZiAoZWRnZXMuYm90dG9tKSB7IGN1cnJlbnQuYm90dG9tICs9IGR5OyB9XG4gICAgICAgICAgICAgICAgaWYgKGVkZ2VzLmxlZnQgICkgeyBjdXJyZW50LmxlZnQgICArPSBkeDsgfVxuICAgICAgICAgICAgICAgIGlmIChlZGdlcy5yaWdodCApIHsgY3VycmVudC5yaWdodCAgKz0gZHg7IH1cblxuICAgICAgICAgICAgICAgIGlmIChpbnZlcnRpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGludmVydGlibGUsIGNvcHkgdGhlIGN1cnJlbnQgcmVjdFxuICAgICAgICAgICAgICAgICAgICBleHRlbmQocmVzdHJpY3RlZCwgY3VycmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGludmVydCA9PT0gJ3JlcG9zaXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzd2FwIGVkZ2UgdmFsdWVzIGlmIG5lY2Vzc2FyeSB0byBrZWVwIHdpZHRoL2hlaWdodCBwb3NpdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN3YXA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN0cmljdGVkLnRvcCA+IHJlc3RyaWN0ZWQuYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhcCA9IHJlc3RyaWN0ZWQudG9wO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3RlZC50b3AgPSByZXN0cmljdGVkLmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGVkLmJvdHRvbSA9IHN3YXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdHJpY3RlZC5sZWZ0ID4gcmVzdHJpY3RlZC5yaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YXAgPSByZXN0cmljdGVkLmxlZnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGVkLmxlZnQgPSByZXN0cmljdGVkLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWQucmlnaHQgPSBzd2FwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBub3QgaW52ZXJ0aWJsZSwgcmVzdHJpY3QgdG8gbWluaW11bSBvZiAweDAgcmVjdFxuICAgICAgICAgICAgICAgICAgICByZXN0cmljdGVkLnRvcCAgICA9IE1hdGgubWluKGN1cnJlbnQudG9wLCBzdGFydC5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICByZXN0cmljdGVkLmJvdHRvbSA9IE1hdGgubWF4KGN1cnJlbnQuYm90dG9tLCBzdGFydC50b3ApO1xuICAgICAgICAgICAgICAgICAgICByZXN0cmljdGVkLmxlZnQgICA9IE1hdGgubWluKGN1cnJlbnQubGVmdCwgc3RhcnQucmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICByZXN0cmljdGVkLnJpZ2h0ICA9IE1hdGgubWF4KGN1cnJlbnQucmlnaHQsIHN0YXJ0LmxlZnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWQud2lkdGggID0gcmVzdHJpY3RlZC5yaWdodCAgLSByZXN0cmljdGVkLmxlZnQ7XG4gICAgICAgICAgICAgICAgcmVzdHJpY3RlZC5oZWlnaHQgPSByZXN0cmljdGVkLmJvdHRvbSAtIHJlc3RyaWN0ZWQudG9wIDtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGVkZ2UgaW4gcmVzdHJpY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBkZWx0YVtlZGdlXSA9IHJlc3RyaWN0ZWRbZWRnZV0gLSBwcmV2aW91c1tlZGdlXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNpemVFdmVudC5lZGdlcyA9IHRoaXMucHJlcGFyZWQuZWRnZXM7XG4gICAgICAgICAgICAgICAgcmVzaXplRXZlbnQucmVjdCA9IHJlc3RyaWN0ZWQ7XG4gICAgICAgICAgICAgICAgcmVzaXplRXZlbnQuZGVsdGFSZWN0ID0gZGVsdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmZpcmUocmVzaXplRXZlbnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzaXplRXZlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2VzdHVyZVN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBnZXN0dXJlRXZlbnQgPSBuZXcgSW50ZXJhY3RFdmVudCh0aGlzLCBldmVudCwgJ2dlc3R1cmUnLCAnc3RhcnQnLCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICBnZXN0dXJlRXZlbnQuZHMgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmdlc3R1cmUuc3RhcnREaXN0YW5jZSA9IHRoaXMuZ2VzdHVyZS5wcmV2RGlzdGFuY2UgPSBnZXN0dXJlRXZlbnQuZGlzdGFuY2U7XG4gICAgICAgICAgICB0aGlzLmdlc3R1cmUuc3RhcnRBbmdsZSA9IHRoaXMuZ2VzdHVyZS5wcmV2QW5nbGUgPSBnZXN0dXJlRXZlbnQuYW5nbGU7XG4gICAgICAgICAgICB0aGlzLmdlc3R1cmUuc2NhbGUgPSAxO1xuXG4gICAgICAgICAgICB0aGlzLmdlc3R1cmluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmZpcmUoZ2VzdHVyZUV2ZW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIGdlc3R1cmVFdmVudDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXN0dXJlTW92ZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucG9pbnRlcklkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2RXZlbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBnZXN0dXJlRXZlbnQ7XG5cbiAgICAgICAgICAgIGdlc3R1cmVFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KHRoaXMsIGV2ZW50LCAnZ2VzdHVyZScsICdtb3ZlJywgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGdlc3R1cmVFdmVudC5kcyA9IGdlc3R1cmVFdmVudC5zY2FsZSAtIHRoaXMuZ2VzdHVyZS5zY2FsZTtcblxuICAgICAgICAgICAgdGhpcy50YXJnZXQuZmlyZShnZXN0dXJlRXZlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmdlc3R1cmUucHJldkFuZ2xlID0gZ2VzdHVyZUV2ZW50LmFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5nZXN0dXJlLnByZXZEaXN0YW5jZSA9IGdlc3R1cmVFdmVudC5kaXN0YW5jZTtcblxuICAgICAgICAgICAgaWYgKGdlc3R1cmVFdmVudC5zY2FsZSAhPT0gSW5maW5pdHkgJiZcbiAgICAgICAgICAgICAgICBnZXN0dXJlRXZlbnQuc2NhbGUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBnZXN0dXJlRXZlbnQuc2NhbGUgIT09IHVuZGVmaW5lZCAgJiZcbiAgICAgICAgICAgICAgICAhaXNOYU4oZ2VzdHVyZUV2ZW50LnNjYWxlKSkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXN0dXJlLnNjYWxlID0gZ2VzdHVyZUV2ZW50LnNjYWxlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZ2VzdHVyZUV2ZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvaW50ZXJIb2xkOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RFdmVudFRhcmdldHMocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCAnaG9sZCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvaW50ZXJVcDogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHZhciBwb2ludGVySW5kZXggPSB0aGlzLm1vdXNlPyAwIDogaW5kZXhPZih0aGlzLnBvaW50ZXJJZHMsIGdldFBvaW50ZXJJZChwb2ludGVyKSk7XG5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEV2ZW50VGFyZ2V0cyhwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsICd1cCcgKTtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEV2ZW50VGFyZ2V0cyhwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsICd0YXAnKTtcblxuICAgICAgICAgICAgdGhpcy5wb2ludGVyRW5kKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBvaW50ZXIocG9pbnRlcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9pbnRlckNhbmNlbDogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHZhciBwb2ludGVySW5kZXggPSB0aGlzLm1vdXNlPyAwIDogaW5kZXhPZih0aGlzLnBvaW50ZXJJZHMsIGdldFBvaW50ZXJJZChwb2ludGVyKSk7XG5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEV2ZW50VGFyZ2V0cyhwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsICdjYW5jZWwnKTtcbiAgICAgICAgICAgIHRoaXMucG9pbnRlckVuZChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVQb2ludGVyKHBvaW50ZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGh0dHA6Ly93d3cucXVpcmtzbW9kZS5vcmcvZG9tL2V2ZW50cy9jbGljay5odG1sXG4gICAgICAgIC8vID5FdmVudHMgbGVhZGluZyB0byBkYmxjbGlja1xuICAgICAgICAvL1xuICAgICAgICAvLyBJRTggZG9lc24ndCBmaXJlIGRvd24gZXZlbnQgYmVmb3JlIGRibGNsaWNrLlxuICAgICAgICAvLyBUaGlzIHdvcmthcm91bmQgdHJpZXMgdG8gZmlyZSBhIHRhcCBhbmQgZG91YmxldGFwIGFmdGVyIGRibGNsaWNrXG4gICAgICAgIGllOERibGNsaWNrOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2VGFwXG4gICAgICAgICAgICAgICAgJiYgZXZlbnQuY2xpZW50WCA9PT0gdGhpcy5wcmV2VGFwLmNsaWVudFhcbiAgICAgICAgICAgICAgICAmJiBldmVudC5jbGllbnRZID09PSB0aGlzLnByZXZUYXAuY2xpZW50WVxuICAgICAgICAgICAgICAgICYmIGV2ZW50VGFyZ2V0ICAgPT09IHRoaXMucHJldlRhcC50YXJnZXQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZG93blRhcmdldHNbMF0gPSBldmVudFRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25UaW1lc1swXSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdEV2ZW50VGFyZ2V0cyhwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsICd0YXAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBFbmQgaW50ZXJhY3QgbW92ZSBldmVudHMgYW5kIHN0b3AgYXV0by1zY3JvbGwgdW5sZXNzIGluZXJ0aWEgaXMgZW5hYmxlZFxuICAgICAgICBwb2ludGVyRW5kOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCkge1xuICAgICAgICAgICAgdmFyIGVuZEV2ZW50LFxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgaW5lcnRpYU9wdGlvbnMgPSBvcHRpb25zICYmIHRoaXMucHJlcGFyZWQubmFtZSAmJiBvcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0uaW5lcnRpYSxcbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzID0gdGhpcy5pbmVydGlhU3RhdHVzO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5lcnRpYVN0YXR1cy5hY3RpdmUgJiYgIWluZXJ0aWFTdGF0dXMuZW5kaW5nKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50ZXJTcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgICAgIGluZXJ0aWFQb3NzaWJsZSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmVydGlhID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNtb290aEVuZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlbmRTbmFwID0gY2hlY2tTbmFwKHRhcmdldCwgdGhpcy5wcmVwYXJlZC5uYW1lKSAmJiBvcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0uc25hcC5lbmRPbmx5LFxuICAgICAgICAgICAgICAgICAgICBlbmRSZXN0cmljdCA9IGNoZWNrUmVzdHJpY3QodGFyZ2V0LCB0aGlzLnByZXBhcmVkLm5hbWUpICYmIG9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5yZXN0cmljdC5lbmRPbmx5LFxuICAgICAgICAgICAgICAgICAgICBkeCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGR5ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRFdmVudDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICAgICAgKG9wdGlvbnMuZHJhZy5heGlzID09PSAneCcgKSB7IHBvaW50ZXJTcGVlZCA9IE1hdGguYWJzKHRoaXMucG9pbnRlckRlbHRhLmNsaWVudC52eCk7IH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5kcmFnLmF4aXMgPT09ICd5JyApIHsgcG9pbnRlclNwZWVkID0gTWF0aC5hYnModGhpcy5wb2ludGVyRGVsdGEuY2xpZW50LnZ5KTsgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlICAgLypvcHRpb25zLmRyYWcuYXhpcyA9PT0gJ3h5JyoveyBwb2ludGVyU3BlZWQgPSB0aGlzLnBvaW50ZXJEZWx0YS5jbGllbnQuc3BlZWQ7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXJTcGVlZCA9IHRoaXMucG9pbnRlckRlbHRhLmNsaWVudC5zcGVlZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpbmVydGlhIHNob3VsZCBiZSBzdGFydGVkXG4gICAgICAgICAgICAgICAgaW5lcnRpYVBvc3NpYmxlID0gKGluZXJ0aWFPcHRpb25zICYmIGluZXJ0aWFPcHRpb25zLmVuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5wcmVwYXJlZC5uYW1lICE9PSAnZ2VzdHVyZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZXZlbnQgIT09IGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCk7XG5cbiAgICAgICAgICAgICAgICBpbmVydGlhID0gKGluZXJ0aWFQb3NzaWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKG5vdyAtIHRoaXMuY3VyQ29vcmRzLnRpbWVTdGFtcCkgPCA1MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcG9pbnRlclNwZWVkID4gaW5lcnRpYU9wdGlvbnMubWluU3BlZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvaW50ZXJTcGVlZCA+IGluZXJ0aWFPcHRpb25zLmVuZFNwZWVkKTtcblxuICAgICAgICAgICAgICAgIGlmIChpbmVydGlhUG9zc2libGUgJiYgIWluZXJ0aWEgJiYgKGVuZFNuYXAgfHwgZW5kUmVzdHJpY3QpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNuYXBSZXN0cmljdCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIHNuYXBSZXN0cmljdC5zbmFwID0gc25hcFJlc3RyaWN0LnJlc3RyaWN0ID0gc25hcFJlc3RyaWN0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmRTbmFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNuYXBwaW5nKHRoaXMuY3VyQ29vcmRzLnBhZ2UsIHNuYXBSZXN0cmljdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc25hcFJlc3RyaWN0LmxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4ICs9IHNuYXBSZXN0cmljdC5keDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeSArPSBzbmFwUmVzdHJpY3QuZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kUmVzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVzdHJpY3Rpb24odGhpcy5jdXJDb29yZHMucGFnZSwgc25hcFJlc3RyaWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbmFwUmVzdHJpY3QucmVzdHJpY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4ICs9IHNuYXBSZXN0cmljdC5keDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeSArPSBzbmFwUmVzdHJpY3QuZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZHggfHwgZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtb290aEVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5lcnRpYSB8fCBzbW9vdGhFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29weUNvb3JkcyhpbmVydGlhU3RhdHVzLnVwQ29vcmRzLCB0aGlzLmN1ckNvb3Jkcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyc1swXSA9IGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCA9IHN0YXJ0RXZlbnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEludGVyYWN0RXZlbnQodGhpcywgZXZlbnQsIHRoaXMucHJlcGFyZWQubmFtZSwgJ2luZXJ0aWFzdGFydCcsIHRoaXMuZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy50MCA9IG5vdztcblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZmlyZShpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmVydGlhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnZ4MCA9IHRoaXMucG9pbnRlckRlbHRhLmNsaWVudC52eDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMudnkwID0gdGhpcy5wb2ludGVyRGVsdGEuY2xpZW50LnZ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy52MCA9IHBvaW50ZXJTcGVlZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxjSW5lcnRpYShpbmVydGlhU3RhdHVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2UgPSBleHRlbmQoe30sIHRoaXMuY3VyQ29vcmRzLnBhZ2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbiA9IGdldE9yaWdpblhZKHRhcmdldCwgdGhpcy5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNPYmplY3Q7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UueCA9IHBhZ2UueCArIGluZXJ0aWFTdGF0dXMueGUgLSBvcmlnaW4ueDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UueSA9IHBhZ2UueSArIGluZXJ0aWFTdGF0dXMueWUgLSBvcmlnaW4ueTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZVN0YXR1c1hZOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBhZ2UueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBwYWdlLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcDogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzT2JqZWN0LnNuYXAgPSBzdGF0dXNPYmplY3Q7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGR4ID0gZHkgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW5kU25hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbmFwID0gdGhpcy5zZXRTbmFwcGluZyh0aGlzLmN1ckNvb3Jkcy5wYWdlLCBzdGF0dXNPYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXAubG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4ICs9IHNuYXAuZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5ICs9IHNuYXAuZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW5kUmVzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdHJpY3QgPSB0aGlzLnNldFJlc3RyaWN0aW9uKHRoaXMuY3VyQ29vcmRzLnBhZ2UsIHN0YXR1c09iamVjdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdHJpY3QucmVzdHJpY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCArPSByZXN0cmljdC5keDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHkgKz0gcmVzdHJpY3QuZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLm1vZGlmaWVkWGUgKz0gZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLm1vZGlmaWVkWWUgKz0gZHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuaSA9IHJlcUZyYW1lKHRoaXMuYm91bmRJbmVydGlhRnJhbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5zbW9vdGhFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy54ZSA9IGR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy55ZSA9IGR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN4ID0gaW5lcnRpYVN0YXR1cy5zeSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuaSA9IHJlcUZyYW1lKHRoaXMuYm91bmRTbW9vdGhFbmRGcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZW5kU25hcCB8fCBlbmRSZXN0cmljdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaXJlIGEgbW92ZSBldmVudCBhdCB0aGUgc25hcHBlZCBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJNb3ZlKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICBlbmRFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KHRoaXMsIGV2ZW50LCAnZHJhZycsICdlbmQnLCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRyYWdnYWJsZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGRyb3AgPSB0aGlzLmdldERyb3AoZW5kRXZlbnQsIGV2ZW50LCBkcmFnZ2FibGVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFRhcmdldCA9IGRyb3AuZHJvcHpvbmU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wRWxlbWVudCA9IGRyb3AuZWxlbWVudDtcblxuICAgICAgICAgICAgICAgIHZhciBkcm9wRXZlbnRzID0gdGhpcy5nZXREcm9wRXZlbnRzKGV2ZW50LCBlbmRFdmVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZHJvcEV2ZW50cy5sZWF2ZSkgeyB0aGlzLnByZXZEcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5sZWF2ZSk7IH1cbiAgICAgICAgICAgICAgICBpZiAoZHJvcEV2ZW50cy5lbnRlcikgeyAgICAgdGhpcy5kcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5lbnRlcik7IH1cbiAgICAgICAgICAgICAgICBpZiAoZHJvcEV2ZW50cy5kcm9wICkgeyAgICAgdGhpcy5kcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5kcm9wICk7IH1cbiAgICAgICAgICAgICAgICBpZiAoZHJvcEV2ZW50cy5kZWFjdGl2YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZUFjdGl2ZURyb3BzKGRyb3BFdmVudHMuZGVhY3RpdmF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmZpcmUoZW5kRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5yZXNpemluZykge1xuICAgICAgICAgICAgICAgIGVuZEV2ZW50ID0gbmV3IEludGVyYWN0RXZlbnQodGhpcywgZXZlbnQsICdyZXNpemUnLCAnZW5kJywgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmlyZShlbmRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdlc3R1cmluZykge1xuICAgICAgICAgICAgICAgIGVuZEV2ZW50ID0gbmV3IEludGVyYWN0RXZlbnQodGhpcywgZXZlbnQsICdnZXN0dXJlJywgJ2VuZCcsIHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmZpcmUoZW5kRXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0b3AoZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbGxlY3REcm9wczogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBkcm9wcyA9IFtdLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gW10sXG4gICAgICAgICAgICAgICAgaTtcblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy5lbGVtZW50O1xuXG4gICAgICAgICAgICAvLyBjb2xsZWN0IGFsbCBkcm9wem9uZXMgYW5kIHRoZWlyIGVsZW1lbnRzIHdoaWNoIHF1YWxpZnkgZm9yIGEgZHJvcFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGludGVyYWN0YWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIWludGVyYWN0YWJsZXNbaV0ub3B0aW9ucy5kcm9wLmVuYWJsZWQpIHsgY29udGludWU7IH1cblxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gaW50ZXJhY3RhYmxlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0ID0gY3VycmVudC5vcHRpb25zLmRyb3AuYWNjZXB0O1xuXG4gICAgICAgICAgICAgICAgLy8gdGVzdCB0aGUgZHJhZ2dhYmxlIGVsZW1lbnQgYWdhaW5zdCB0aGUgZHJvcHpvbmUncyBhY2NlcHQgc2V0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgoaXNFbGVtZW50KGFjY2VwdCkgJiYgYWNjZXB0ICE9PSBlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICB8fCAoaXNTdHJpbmcoYWNjZXB0KVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgIW1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBhY2NlcHQpKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHF1ZXJ5IGZvciBuZXcgZWxlbWVudHMgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgdmFyIGRyb3BFbGVtZW50cyA9IGN1cnJlbnQuc2VsZWN0b3I/IGN1cnJlbnQuX2NvbnRleHQucXVlcnlTZWxlY3RvckFsbChjdXJyZW50LnNlbGVjdG9yKSA6IFtjdXJyZW50Ll9lbGVtZW50XTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBsZW4gPSBkcm9wRWxlbWVudHMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gZHJvcEVsZW1lbnRzW2pdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkcm9wcy5wdXNoKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGN1cnJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZHJvcHpvbmVzOiBkcm9wcyxcbiAgICAgICAgICAgICAgICBlbGVtZW50czogZWxlbWVudHNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmlyZUFjdGl2ZURyb3BzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQsXG4gICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgcHJldkVsZW1lbnQ7XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgYWN0aXZlIGRyb3B6b25lcyBhbmQgdHJpZ2dlciBldmVudFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuYWN0aXZlRHJvcHMuZHJvcHpvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuYWN0aXZlRHJvcHMuZHJvcHpvbmVzW2ldO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gdGhpcy5hY3RpdmVEcm9wcy5lbGVtZW50cyBbaV07XG5cbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IHRyaWdnZXIgb2YgZHVwbGljYXRlIGV2ZW50cyBvbiBzYW1lIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQgIT09IHByZXZFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBjdXJyZW50IGVsZW1lbnQgYXMgZXZlbnQgdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmZpcmUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENvbGxlY3QgYSBuZXcgc2V0IG9mIHBvc3NpYmxlIGRyb3BzIGFuZCBzYXZlIHRoZW0gaW4gYWN0aXZlRHJvcHMuXG4gICAgICAgIC8vIHNldEFjdGl2ZURyb3BzIHNob3VsZCBhbHdheXMgYmUgY2FsbGVkIHdoZW4gYSBkcmFnIGhhcyBqdXN0IHN0YXJ0ZWQgb3IgYVxuICAgICAgICAvLyBkcmFnIGV2ZW50IGhhcHBlbnMgd2hpbGUgZHluYW1pY0Ryb3AgaXMgdHJ1ZVxuICAgICAgICBzZXRBY3RpdmVEcm9wczogZnVuY3Rpb24gKGRyYWdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBnZXQgZHJvcHpvbmVzIGFuZCB0aGVpciBlbGVtZW50cyB0aGF0IGNvdWxkIHJlY2VpdmUgdGhlIGRyYWdnYWJsZVxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlRHJvcHMgPSB0aGlzLmNvbGxlY3REcm9wcyhkcmFnRWxlbWVudCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRHJvcHMuZHJvcHpvbmVzID0gcG9zc2libGVEcm9wcy5kcm9wem9uZXM7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZURyb3BzLmVsZW1lbnRzICA9IHBvc3NpYmxlRHJvcHMuZWxlbWVudHM7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZURyb3BzLnJlY3RzICAgICA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWN0aXZlRHJvcHMuZHJvcHpvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEcm9wcy5yZWN0c1tpXSA9IHRoaXMuYWN0aXZlRHJvcHMuZHJvcHpvbmVzW2ldLmdldFJlY3QodGhpcy5hY3RpdmVEcm9wcy5lbGVtZW50c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0RHJvcDogZnVuY3Rpb24gKGRyYWdFdmVudCwgZXZlbnQsIGRyYWdFbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgdmFsaWREcm9wcyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoZHluYW1pY0Ryb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZURyb3BzKGRyYWdFbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29sbGVjdCBhbGwgZHJvcHpvbmVzIGFuZCB0aGVpciBlbGVtZW50cyB3aGljaCBxdWFsaWZ5IGZvciBhIGRyb3BcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5hY3RpdmVEcm9wcy5kcm9wem9uZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCAgICAgICAgPSB0aGlzLmFjdGl2ZURyb3BzLmRyb3B6b25lc1tqXSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSB0aGlzLmFjdGl2ZURyb3BzLmVsZW1lbnRzIFtqXSxcbiAgICAgICAgICAgICAgICAgICAgcmVjdCAgICAgICAgICAgPSB0aGlzLmFjdGl2ZURyb3BzLnJlY3RzICAgIFtqXTtcblxuICAgICAgICAgICAgICAgIHZhbGlkRHJvcHMucHVzaChjdXJyZW50LmRyb3BDaGVjayhkcmFnRXZlbnQsIGV2ZW50LCB0aGlzLnRhcmdldCwgZHJhZ0VsZW1lbnQsIGN1cnJlbnRFbGVtZW50LCByZWN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGN1cnJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgbW9zdCBhcHByb3ByaWF0ZSBkcm9wem9uZSBiYXNlZCBvbiBET00gZGVwdGggYW5kIG9yZGVyXG4gICAgICAgICAgICB2YXIgZHJvcEluZGV4ID0gaW5kZXhPZkRlZXBlc3RFbGVtZW50KHZhbGlkRHJvcHMpLFxuICAgICAgICAgICAgICAgIGRyb3B6b25lICA9IHRoaXMuYWN0aXZlRHJvcHMuZHJvcHpvbmVzW2Ryb3BJbmRleF0gfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBlbGVtZW50ICAgPSB0aGlzLmFjdGl2ZURyb3BzLmVsZW1lbnRzIFtkcm9wSW5kZXhdIHx8IG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZHJvcHpvbmU6IGRyb3B6b25lLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0RHJvcEV2ZW50czogZnVuY3Rpb24gKHBvaW50ZXJFdmVudCwgZHJhZ0V2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZHJvcEV2ZW50cyA9IHtcbiAgICAgICAgICAgICAgICBlbnRlciAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIGxlYXZlICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgYWN0aXZhdGUgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBkZWFjdGl2YXRlOiBudWxsLFxuICAgICAgICAgICAgICAgIG1vdmUgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgZHJvcCAgICAgIDogbnVsbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJvcEVsZW1lbnQgIT09IHRoaXMucHJldkRyb3BFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgd2FzIGEgcHJldkRyb3BUYXJnZXQsIGNyZWF0ZSBhIGRyYWdsZWF2ZSBldmVudFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXZEcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3BFdmVudHMubGVhdmUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgICAgICAgOiB0aGlzLnByZXZEcm9wRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3B6b25lICAgICA6IHRoaXMucHJldkRyb3BUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBkcmFnRXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlICAgIDogZHJhZ0V2ZW50LmludGVyYWN0YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdFdmVudCAgICA6IGRyYWdFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uICA6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lU3RhbXAgICAgOiBkcmFnRXZlbnQudGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICAgIDogJ2RyYWdsZWF2ZSdcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBkcmFnRXZlbnQuZHJhZ0xlYXZlID0gdGhpcy5wcmV2RHJvcEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdFdmVudC5wcmV2RHJvcHpvbmUgPSB0aGlzLnByZXZEcm9wVGFyZ2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZHJvcFRhcmdldCBpcyBub3QgbnVsbCwgY3JlYXRlIGEgZHJhZ2VudGVyIGV2ZW50XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBkcm9wRXZlbnRzLmVudGVyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ICAgICAgIDogdGhpcy5kcm9wRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3B6b25lICAgICA6IHRoaXMuZHJvcFRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGRyYWdFdmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgICAgOiBkcmFnRXZlbnQuaW50ZXJhY3RhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0V2ZW50ICAgIDogZHJhZ0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24gIDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVTdGFtcCAgICA6IGRyYWdFdmVudC50aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgOiAnZHJhZ2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGRyYWdFdmVudC5kcmFnRW50ZXIgPSB0aGlzLmRyb3BFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBkcmFnRXZlbnQuZHJvcHpvbmUgPSB0aGlzLmRyb3BUYXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZHJhZ0V2ZW50LnR5cGUgPT09ICdkcmFnZW5kJyAmJiB0aGlzLmRyb3BUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICBkcm9wRXZlbnRzLmRyb3AgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCAgICAgICA6IHRoaXMuZHJvcEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lICAgICA6IHRoaXMuZHJvcFRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogZHJhZ0V2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlICAgIDogZHJhZ0V2ZW50LmludGVyYWN0YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0V2ZW50ICAgIDogZHJhZ0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbiAgOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB0aW1lU3RhbXAgICAgOiBkcmFnRXZlbnQudGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgOiAnZHJvcCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZHJhZ0V2ZW50LmRyb3B6b25lID0gdGhpcy5kcm9wVGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIGRyb3BFdmVudHMuYWN0aXZhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGRyYWdFdmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZSAgICA6IGRyYWdFdmVudC5pbnRlcmFjdGFibGUsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdFdmVudCAgICA6IGRyYWdFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24gIDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdGltZVN0YW1wICAgIDogZHJhZ0V2ZW50LnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICAgIDogJ2Ryb3BhY3RpdmF0ZSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ2VuZCcpIHtcbiAgICAgICAgICAgICAgICBkcm9wRXZlbnRzLmRlYWN0aXZhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGRyYWdFdmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZSAgICA6IGRyYWdFdmVudC5pbnRlcmFjdGFibGUsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdFdmVudCAgICA6IGRyYWdFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24gIDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdGltZVN0YW1wICAgIDogZHJhZ0V2ZW50LnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICAgIDogJ2Ryb3BkZWFjdGl2YXRlJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHJhZ0V2ZW50LnR5cGUgPT09ICdkcmFnbW92ZScgJiYgdGhpcy5kcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZHJvcEV2ZW50cy5tb3ZlID0ge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgICAgICAgOiB0aGlzLmRyb3BFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSAgICAgOiB0aGlzLmRyb3BUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGRyYWdFdmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZSAgICA6IGRyYWdFdmVudC5pbnRlcmFjdGFibGUsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdFdmVudCAgICA6IGRyYWdFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24gIDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ21vdmUgICAgIDogZHJhZ0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICB0aW1lU3RhbXAgICAgOiBkcmFnRXZlbnQudGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgOiAnZHJvcG1vdmUnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkcmFnRXZlbnQuZHJvcHpvbmUgPSB0aGlzLmRyb3BUYXJnZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkcm9wRXZlbnRzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGN1cnJlbnRBY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5kcmFnZ2luZyAmJiAnZHJhZycpIHx8ICh0aGlzLnJlc2l6aW5nICYmICdyZXNpemUnKSB8fCAodGhpcy5nZXN0dXJpbmcgJiYgJ2dlc3R1cmUnKSB8fCBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGludGVyYWN0aW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kcmFnZ2luZyB8fCB0aGlzLnJlc2l6aW5nIHx8IHRoaXMuZ2VzdHVyaW5nO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFyVGFyZ2V0czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLmVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICB0aGlzLmRyb3BUYXJnZXQgPSB0aGlzLmRyb3BFbGVtZW50ID0gdGhpcy5wcmV2RHJvcFRhcmdldCA9IHRoaXMucHJldkRyb3BFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBzdG9wOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVyYWN0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoRWxlbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQub3B0aW9ucy5zdHlsZUN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuX2RvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudCBEZWZhdWx0IG9ubHkgaWYgd2VyZSBwcmV2aW91c2x5IGludGVyYWN0aW5nXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGlzRnVuY3Rpb24oZXZlbnQucHJldmVudERlZmF1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdChldmVudCwgdGFyZ2V0LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRHJvcHMuZHJvcHpvbmVzID0gdGhpcy5hY3RpdmVEcm9wcy5lbGVtZW50cyA9IHRoaXMuYWN0aXZlRHJvcHMucmVjdHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jbGVhclRhcmdldHMoKTtcblxuICAgICAgICAgICAgdGhpcy5wb2ludGVySXNEb3duID0gdGhpcy5zbmFwU3RhdHVzLmxvY2tlZCA9IHRoaXMuZHJhZ2dpbmcgPSB0aGlzLnJlc2l6aW5nID0gdGhpcy5nZXN0dXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWQubmFtZSA9IHRoaXMucHJldkV2ZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuaW5lcnRpYVN0YXR1cy5yZXN1bWVEeCA9IHRoaXMuaW5lcnRpYVN0YXR1cy5yZXN1bWVEeSA9IDA7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBwb2ludGVycyBpZiB0aGVpciBJRCBpc24ndCBpbiB0aGlzLnBvaW50ZXJJZHNcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wb2ludGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleE9mKHRoaXMucG9pbnRlcklkcywgZ2V0UG9pbnRlcklkKHRoaXMucG9pbnRlcnNbaV0pKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGluZXJ0aWFGcmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZXJ0aWFTdGF0dXMgPSB0aGlzLmluZXJ0aWFTdGF0dXMsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMudGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5pbmVydGlhLFxuICAgICAgICAgICAgICAgIGxhbWJkYSA9IG9wdGlvbnMucmVzaXN0YW5jZSxcbiAgICAgICAgICAgICAgICB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwIC0gaW5lcnRpYVN0YXR1cy50MDtcblxuICAgICAgICAgICAgaWYgKHQgPCBpbmVydGlhU3RhdHVzLnRlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAgMSAtIChNYXRoLmV4cCgtbGFtYmRhICogdCkgLSBpbmVydGlhU3RhdHVzLmxhbWJkYV92MCkgLyBpbmVydGlhU3RhdHVzLm9uZV92ZV92MDtcblxuICAgICAgICAgICAgICAgIGlmIChpbmVydGlhU3RhdHVzLm1vZGlmaWVkWGUgPT09IGluZXJ0aWFTdGF0dXMueGUgJiYgaW5lcnRpYVN0YXR1cy5tb2RpZmllZFllID09PSBpbmVydGlhU3RhdHVzLnllKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuc3ggPSBpbmVydGlhU3RhdHVzLnhlICogcHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuc3kgPSBpbmVydGlhU3RhdHVzLnllICogcHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXVhZFBvaW50ID0gZ2V0UXVhZHJhdGljQ3VydmVQb2ludChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMueGUsIGluZXJ0aWFTdGF0dXMueWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5tb2RpZmllZFhlLCBpbmVydGlhU3RhdHVzLm1vZGlmaWVkWWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuc3ggPSBxdWFkUG9pbnQueDtcbiAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5zeSA9IHF1YWRQb2ludC55O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlck1vdmUoaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50LCBpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5pID0gcmVxRnJhbWUodGhpcy5ib3VuZEluZXJ0aWFGcmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLmVuZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN4ID0gaW5lcnRpYVN0YXR1cy5tb2RpZmllZFhlO1xuICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuc3kgPSBpbmVydGlhU3RhdHVzLm1vZGlmaWVkWWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJNb3ZlKGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCwgaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJFbmQoaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50LCBpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5hY3RpdmUgPSBpbmVydGlhU3RhdHVzLmVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNtb290aEVuZEZyYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5lcnRpYVN0YXR1cyA9IHRoaXMuaW5lcnRpYVN0YXR1cyxcbiAgICAgICAgICAgICAgICB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBpbmVydGlhU3RhdHVzLnQwLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gdGhpcy50YXJnZXQub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLmluZXJ0aWEuc21vb3RoRW5kRHVyYXRpb247XG5cbiAgICAgICAgICAgIGlmICh0IDwgZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN4ID0gZWFzZU91dFF1YWQodCwgMCwgaW5lcnRpYVN0YXR1cy54ZSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuc3kgPSBlYXNlT3V0UXVhZCh0LCAwLCBpbmVydGlhU3RhdHVzLnllLCBkdXJhdGlvbik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJNb3ZlKGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCwgaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50KTtcblxuICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuaSA9IHJlcUZyYW1lKHRoaXMuYm91bmRTbW9vdGhFbmRGcmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLmVuZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN4ID0gaW5lcnRpYVN0YXR1cy54ZTtcbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN5ID0gaW5lcnRpYVN0YXR1cy55ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlck1vdmUoaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50LCBpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlckVuZChpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQsIGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCk7XG5cbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnNtb290aEVuZCA9XG4gICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLmFjdGl2ZSA9IGluZXJ0aWFTdGF0dXMuZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkUG9pbnRlcjogZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IGdldFBvaW50ZXJJZChwb2ludGVyKSxcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMubW91c2U/IDAgOiBpbmRleE9mKHRoaXMucG9pbnRlcklkcywgaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLnBvaW50ZXJJZHMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJJZHNbaW5kZXhdID0gaWQ7XG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJzW2luZGV4XSA9IHBvaW50ZXI7XG5cbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVQb2ludGVyOiBmdW5jdGlvbiAocG9pbnRlcikge1xuICAgICAgICAgICAgdmFyIGlkID0gZ2V0UG9pbnRlcklkKHBvaW50ZXIpLFxuICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5tb3VzZT8gMCA6IGluZGV4T2YodGhpcy5wb2ludGVySWRzLCBpZCk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIHRoaXMucG9pbnRlcnMgICAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucG9pbnRlcklkcyAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZG93blRhcmdldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZG93blRpbWVzICAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuaG9sZFRpbWVycyAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWNvcmRQb2ludGVyOiBmdW5jdGlvbiAocG9pbnRlcikge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5tb3VzZT8gMDogaW5kZXhPZih0aGlzLnBvaW50ZXJJZHMsIGdldFBvaW50ZXJJZChwb2ludGVyKSk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIHRoaXMucG9pbnRlcnNbaW5kZXhdID0gcG9pbnRlcjtcbiAgICAgICAgfSxcblxuICAgICAgICBjb2xsZWN0RXZlbnRUYXJnZXRzOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBldmVudFR5cGUpIHtcbiAgICAgICAgICAgIHZhciBwb2ludGVySW5kZXggPSB0aGlzLm1vdXNlPyAwIDogaW5kZXhPZih0aGlzLnBvaW50ZXJJZHMsIGdldFBvaW50ZXJJZChwb2ludGVyKSk7XG5cbiAgICAgICAgICAgIC8vIGRvIG5vdCBmaXJlIGEgdGFwIGV2ZW50IGlmIHRoZSBwb2ludGVyIHdhcyBtb3ZlZCBiZWZvcmUgYmVpbmcgbGlmdGVkXG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAndGFwJyAmJiAodGhpcy5wb2ludGVyV2FzTW92ZWRcbiAgICAgICAgICAgICAgICAvLyBvciBpZiB0aGUgcG9pbnRlcnVwIHRhcmdldCBpcyBkaWZmZXJlbnQgdG8gdGhlIHBvaW50ZXJkb3duIHRhcmdldFxuICAgICAgICAgICAgICAgIHx8ICEodGhpcy5kb3duVGFyZ2V0c1twb2ludGVySW5kZXhdICYmIHRoaXMuZG93blRhcmdldHNbcG9pbnRlckluZGV4XSA9PT0gZXZlbnRUYXJnZXQpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBbXSxcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IFtdLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAgICAgICAgICAgZnVuY3Rpb24gY29sbGVjdFNlbGVjdG9ycyAoaW50ZXJhY3RhYmxlLCBzZWxlY3RvciwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHZhciBlbHMgPSBpZThNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJhY3RhYmxlLl9pRXZlbnRzW2V2ZW50VHlwZV1cbiAgICAgICAgICAgICAgICAgICAgJiYgaXNFbGVtZW50KGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICYmIGluQ29udGV4dChpbnRlcmFjdGFibGUsIGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICYmICF0ZXN0SWdub3JlKGludGVyYWN0YWJsZSwgZWxlbWVudCwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICYmIHRlc3RBbGxvdyhpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IsIGVscykpIHtcblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLnB1c2goaW50ZXJhY3RhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVyYWN0LmlzU2V0KGVsZW1lbnQpICYmIGludGVyYWN0KGVsZW1lbnQpLl9pRXZlbnRzW2V2ZW50VHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKGludGVyYWN0KGVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbnRlcmFjdGFibGVzLmZvckVhY2hTZWxlY3Rvcihjb2xsZWN0U2VsZWN0b3JzKTtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIHRhcCBldmVudCBldmVuIGlmIHRoZXJlIGFyZSBubyBsaXN0ZW5lcnMgc28gdGhhdFxuICAgICAgICAgICAgLy8gZG91YmxldGFwIGNhbiBzdGlsbCBiZSBjcmVhdGVkIGFuZCBmaXJlZFxuICAgICAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoIHx8IGV2ZW50VHlwZSA9PT0gJ3RhcCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVQb2ludGVycyhwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIHRhcmdldHMsIGVsZW1lbnRzLCBldmVudFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZpcmVQb2ludGVyczogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgdGFyZ2V0cywgZWxlbWVudHMsIGV2ZW50VHlwZSkge1xuICAgICAgICAgICAgdmFyIHBvaW50ZXJJbmRleCA9IHRoaXMubW91c2U/IDAgOiBpbmRleE9mKHRoaXMucG9pbnRlcklkcywgZ2V0UG9pbnRlcklkKHBvaW50ZXIpKSxcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQgPSB7fSxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIC8vIGZvciB0YXAgZXZlbnRzXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWwsIGNyZWF0ZU5ld0RvdWJsZVRhcDtcblxuICAgICAgICAgICAgLy8gaWYgaXQncyBhIGRvdWJsZXRhcCB0aGVuIHRoZSBldmVudCBwcm9wZXJ0aWVzIHdvdWxkIGhhdmUgYmVlblxuICAgICAgICAgICAgLy8gY29waWVkIGZyb20gdGhlIHRhcCBldmVudCBhbmQgcHJvdmlkZWQgYXMgdGhlIHBvaW50ZXIgYXJndW1lbnRcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdkb3VibGV0YXAnKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50ID0gcG9pbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFeHRlbmQocG9pbnRlckV2ZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICE9PSBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXJFeHRlbmQocG9pbnRlckV2ZW50LCBwb2ludGVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQucHJldmVudERlZmF1bHQgICAgICAgICAgID0gcHJldmVudE9yaWdpbmFsRGVmYXVsdDtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQuc3RvcFByb3BhZ2F0aW9uICAgICAgICAgID0gSW50ZXJhY3RFdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uO1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBJbnRlcmFjdEV2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb247XG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50LmludGVyYWN0aW9uICAgICAgICAgICAgICA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQudGltZVN0YW1wICAgICAgID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50Lm9yaWdpbmFsRXZlbnQgICA9IGV2ZW50O1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudC5vcmlnaW5hbFBvaW50ZXIgPSBwb2ludGVyO1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudC50eXBlICAgICAgICAgICAgPSBldmVudFR5cGU7XG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50LnBvaW50ZXJJZCAgICAgICA9IGdldFBvaW50ZXJJZChwb2ludGVyKTtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQucG9pbnRlclR5cGUgICAgID0gdGhpcy5tb3VzZT8gJ21vdXNlJyA6ICFzdXBwb3J0c1BvaW50ZXJFdmVudD8gJ3RvdWNoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNTdHJpbmcocG9pbnRlci5wb2ludGVyVHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwb2ludGVyLnBvaW50ZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogWywsJ3RvdWNoJywgJ3BlbicsICdtb3VzZSddW3BvaW50ZXIucG9pbnRlclR5cGVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAndGFwJykge1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudC5kdCA9IHBvaW50ZXJFdmVudC50aW1lU3RhbXAgLSB0aGlzLmRvd25UaW1lc1twb2ludGVySW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSBwb2ludGVyRXZlbnQudGltZVN0YW1wIC0gdGhpcy50YXBUaW1lO1xuICAgICAgICAgICAgICAgIGNyZWF0ZU5ld0RvdWJsZVRhcCA9ICEhKHRoaXMucHJldlRhcCAmJiB0aGlzLnByZXZUYXAudHlwZSAhPT0gJ2RvdWJsZXRhcCdcbiAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5wcmV2VGFwLnRhcmdldCA9PT0gcG9pbnRlckV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgICAgICAgICAmJiBpbnRlcnZhbCA8IDUwMCk7XG5cbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQuZG91YmxlID0gY3JlYXRlTmV3RG91YmxlVGFwO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50YXBUaW1lID0gcG9pbnRlckV2ZW50LnRpbWVTdGFtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQuY3VycmVudFRhcmdldCA9IGVsZW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudC5pbnRlcmFjdGFibGUgPSB0YXJnZXRzW2ldO1xuICAgICAgICAgICAgICAgIHRhcmdldHNbaV0uZmlyZShwb2ludGVyRXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50ZXJFdmVudC5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgICAgICAgICAgICAgICAgfHwocG9pbnRlckV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCAmJiBlbGVtZW50c1tpICsgMV0gIT09IHBvaW50ZXJFdmVudC5jdXJyZW50VGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjcmVhdGVOZXdEb3VibGVUYXApIHtcbiAgICAgICAgICAgICAgICB2YXIgZG91YmxlVGFwID0ge307XG5cbiAgICAgICAgICAgICAgICBleHRlbmQoZG91YmxlVGFwLCBwb2ludGVyRXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgZG91YmxlVGFwLmR0ICAgPSBpbnRlcnZhbDtcbiAgICAgICAgICAgICAgICBkb3VibGVUYXAudHlwZSA9ICdkb3VibGV0YXAnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0RXZlbnRUYXJnZXRzKGRvdWJsZVRhcCwgZXZlbnQsIGV2ZW50VGFyZ2V0LCAnZG91YmxldGFwJyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXZUYXAgPSBkb3VibGVUYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChldmVudFR5cGUgPT09ICd0YXAnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2VGFwID0gcG9pbnRlckV2ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHZhbGlkYXRlU2VsZWN0b3I6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgbWF0Y2hlcywgbWF0Y2hFbGVtZW50cykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1hdGNoZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBtYXRjaGVzW2ldLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaEVsZW1lbnQgPSBtYXRjaEVsZW1lbnRzW2ldLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSB2YWxpZGF0ZUFjdGlvbihtYXRjaC5nZXRBY3Rpb24ocG9pbnRlciwgZXZlbnQsIHRoaXMsIG1hdGNoRWxlbWVudCksIG1hdGNoKTtcblxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgd2l0aGluSW50ZXJhY3Rpb25MaW1pdChtYXRjaCwgbWF0Y2hFbGVtZW50LCBhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG1hdGNoRWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzZXRTbmFwcGluZzogZnVuY3Rpb24gKHBhZ2VDb29yZHMsIHN0YXR1cykge1xuICAgICAgICAgICAgdmFyIHNuYXAgPSB0aGlzLnRhcmdldC5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0uc25hcCxcbiAgICAgICAgICAgICAgICB0YXJnZXRzID0gW10sXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICAgICAgaTtcblxuICAgICAgICAgICAgc3RhdHVzID0gc3RhdHVzIHx8IHRoaXMuc25hcFN0YXR1cztcblxuICAgICAgICAgICAgaWYgKHN0YXR1cy51c2VTdGF0dXNYWSkge1xuICAgICAgICAgICAgICAgIHBhZ2UgPSB7IHg6IHN0YXR1cy54LCB5OiBzdGF0dXMueSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbiA9IGdldE9yaWdpblhZKHRoaXMudGFyZ2V0LCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgcGFnZSA9IGV4dGVuZCh7fSwgcGFnZUNvb3Jkcyk7XG5cbiAgICAgICAgICAgICAgICBwYWdlLnggLT0gb3JpZ2luLng7XG4gICAgICAgICAgICAgICAgcGFnZS55IC09IG9yaWdpbi55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGF0dXMucmVhbFggPSBwYWdlLng7XG4gICAgICAgICAgICBzdGF0dXMucmVhbFkgPSBwYWdlLnk7XG5cbiAgICAgICAgICAgIHBhZ2UueCA9IHBhZ2UueCAtIHRoaXMuaW5lcnRpYVN0YXR1cy5yZXN1bWVEeDtcbiAgICAgICAgICAgIHBhZ2UueSA9IHBhZ2UueSAtIHRoaXMuaW5lcnRpYVN0YXR1cy5yZXN1bWVEeTtcblxuICAgICAgICAgICAgdmFyIGxlbiA9IHNuYXAudGFyZ2V0cz8gc25hcC50YXJnZXRzLmxlbmd0aCA6IDA7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHJlbEluZGV4ID0gMDsgcmVsSW5kZXggPCB0aGlzLnNuYXBPZmZzZXRzLmxlbmd0aDsgcmVsSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHZhciByZWxhdGl2ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogcGFnZS54IC0gdGhpcy5zbmFwT2Zmc2V0c1tyZWxJbmRleF0ueCxcbiAgICAgICAgICAgICAgICAgICAgeTogcGFnZS55IC0gdGhpcy5zbmFwT2Zmc2V0c1tyZWxJbmRleF0ueVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oc25hcC50YXJnZXRzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gc25hcC50YXJnZXRzW2ldKHJlbGF0aXZlLngsIHJlbGF0aXZlLnksIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gc25hcC50YXJnZXRzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHsgY29udGludWU7IH1cblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogaXNOdW1iZXIodGFyZ2V0LngpID8gKHRhcmdldC54ICsgdGhpcy5zbmFwT2Zmc2V0c1tyZWxJbmRleF0ueCkgOiByZWxhdGl2ZS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogaXNOdW1iZXIodGFyZ2V0LnkpID8gKHRhcmdldC55ICsgdGhpcy5zbmFwT2Zmc2V0c1tyZWxJbmRleF0ueSkgOiByZWxhdGl2ZS55LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogaXNOdW1iZXIodGFyZ2V0LnJhbmdlKT8gdGFyZ2V0LnJhbmdlOiBzbmFwLnJhbmdlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNsb3Nlc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgaW5SYW5nZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5nZTogMCxcbiAgICAgICAgICAgICAgICAgICAgZHg6IDAsXG4gICAgICAgICAgICAgICAgICAgIGR5OiAwXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gdGFyZ2V0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldHNbaV07XG5cbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSB0YXJnZXQucmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGR4ID0gdGFyZ2V0LnggLSBwYWdlLngsXG4gICAgICAgICAgICAgICAgICAgIGR5ID0gdGFyZ2V0LnkgLSBwYWdlLnksXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gaHlwb3QoZHgsIGR5KSxcbiAgICAgICAgICAgICAgICAgICAgaW5SYW5nZSA9IGRpc3RhbmNlIDw9IHJhbmdlO1xuXG4gICAgICAgICAgICAgICAgLy8gSW5maW5pdGUgdGFyZ2V0cyBjb3VudCBhcyBiZWluZyBvdXQgb2YgcmFuZ2VcbiAgICAgICAgICAgICAgICAvLyBjb21wYXJlZCB0byBub24gaW5maW5pdGUgb25lcyB0aGF0IGFyZSBpbiByYW5nZVxuICAgICAgICAgICAgICAgIGlmIChyYW5nZSA9PT0gSW5maW5pdHkgJiYgY2xvc2VzdC5pblJhbmdlICYmIGNsb3Nlc3QucmFuZ2UgIT09IEluZmluaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGluUmFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3QudGFyZ2V0IHx8IChpblJhbmdlXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIHRoZSBjbG9zZXN0IHRhcmdldCBpbiByYW5nZT9cbiAgICAgICAgICAgICAgICAgICAgPyAoY2xvc2VzdC5pblJhbmdlICYmIHJhbmdlICE9PSBJbmZpbml0eVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHBvaW50ZXIgaXMgcmVsYXRpdmVseSBkZWVwZXIgaW4gdGhpcyB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZGlzdGFuY2UgLyByYW5nZSA8IGNsb3Nlc3QuZGlzdGFuY2UgLyBjbG9zZXN0LnJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHRhcmdldCBoYXMgSW5maW5pdGUgcmFuZ2UgYW5kIHRoZSBjbG9zZXN0IGRvZXNuJ3RcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKHJhbmdlID09PSBJbmZpbml0eSAmJiBjbG9zZXN0LnJhbmdlICE9PSBJbmZpbml0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPUiB0aGlzIHRhcmdldCBpcyBjbG9zZXIgdGhhdCB0aGUgcHJldmlvdXMgY2xvc2VzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGRpc3RhbmNlIDwgY2xvc2VzdC5kaXN0YW5jZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG90aGVyIGlzIG5vdCBpbiByYW5nZSBhbmQgdGhlIHBvaW50ZXIgaXMgY2xvc2VyIHRvIHRoaXMgdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIDogKCFjbG9zZXN0LmluUmFuZ2UgJiYgZGlzdGFuY2UgPCBjbG9zZXN0LmRpc3RhbmNlKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpblJhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0LmRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QucmFuZ2UgPSByYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdC5pblJhbmdlID0gaW5SYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdC5keCA9IGR4O1xuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0LmR5ID0gZHk7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnJhbmdlID0gcmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc25hcENoYW5nZWQ7XG5cbiAgICAgICAgICAgIGlmIChjbG9zZXN0LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHNuYXBDaGFuZ2VkID0gKHN0YXR1cy5zbmFwcGVkWCAhPT0gY2xvc2VzdC50YXJnZXQueCB8fCBzdGF0dXMuc25hcHBlZFkgIT09IGNsb3Nlc3QudGFyZ2V0LnkpO1xuXG4gICAgICAgICAgICAgICAgc3RhdHVzLnNuYXBwZWRYID0gY2xvc2VzdC50YXJnZXQueDtcbiAgICAgICAgICAgICAgICBzdGF0dXMuc25hcHBlZFkgPSBjbG9zZXN0LnRhcmdldC55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc25hcENoYW5nZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc3RhdHVzLnNuYXBwZWRYID0gTmFOO1xuICAgICAgICAgICAgICAgIHN0YXR1cy5zbmFwcGVkWSA9IE5hTjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhdHVzLmR4ID0gY2xvc2VzdC5keDtcbiAgICAgICAgICAgIHN0YXR1cy5keSA9IGNsb3Nlc3QuZHk7XG5cbiAgICAgICAgICAgIHN0YXR1cy5jaGFuZ2VkID0gKHNuYXBDaGFuZ2VkIHx8IChjbG9zZXN0LmluUmFuZ2UgJiYgIXN0YXR1cy5sb2NrZWQpKTtcbiAgICAgICAgICAgIHN0YXR1cy5sb2NrZWQgPSBjbG9zZXN0LmluUmFuZ2U7XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0UmVzdHJpY3Rpb246IGZ1bmN0aW9uIChwYWdlQ29vcmRzLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcbiAgICAgICAgICAgICAgICByZXN0cmljdCA9IHRhcmdldCAmJiB0YXJnZXQub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLnJlc3RyaWN0LFxuICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uID0gcmVzdHJpY3QgJiYgcmVzdHJpY3QucmVzdHJpY3Rpb24sXG4gICAgICAgICAgICAgICAgcGFnZTtcblxuICAgICAgICAgICAgaWYgKCFyZXN0cmljdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YXR1cyA9IHN0YXR1cyB8fCB0aGlzLnJlc3RyaWN0U3RhdHVzO1xuXG4gICAgICAgICAgICBwYWdlID0gc3RhdHVzLnVzZVN0YXR1c1hZXG4gICAgICAgICAgICAgICAgICAgID8gcGFnZSA9IHsgeDogc3RhdHVzLngsIHk6IHN0YXR1cy55IH1cbiAgICAgICAgICAgICAgICAgICAgOiBwYWdlID0gZXh0ZW5kKHt9LCBwYWdlQ29vcmRzKTtcblxuICAgICAgICAgICAgaWYgKHN0YXR1cy5zbmFwICYmIHN0YXR1cy5zbmFwLmxvY2tlZCkge1xuICAgICAgICAgICAgICAgIHBhZ2UueCArPSBzdGF0dXMuc25hcC5keCB8fCAwO1xuICAgICAgICAgICAgICAgIHBhZ2UueSArPSBzdGF0dXMuc25hcC5keSB8fCAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYWdlLnggLT0gdGhpcy5pbmVydGlhU3RhdHVzLnJlc3VtZUR4O1xuICAgICAgICAgICAgcGFnZS55IC09IHRoaXMuaW5lcnRpYVN0YXR1cy5yZXN1bWVEeTtcblxuICAgICAgICAgICAgc3RhdHVzLmR4ID0gMDtcbiAgICAgICAgICAgIHN0YXR1cy5keSA9IDA7XG4gICAgICAgICAgICBzdGF0dXMucmVzdHJpY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgcmVjdCwgcmVzdHJpY3RlZFgsIHJlc3RyaWN0ZWRZO1xuXG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcocmVzdHJpY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3RyaWN0aW9uID09PSAncGFyZW50Jykge1xuICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbiA9IHBhcmVudEVsZW1lbnQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzdHJpY3Rpb24gPT09ICdzZWxmJykge1xuICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbiA9IHRhcmdldC5nZXRSZWN0KHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbiA9IGNsb3Nlc3QodGhpcy5lbGVtZW50LCByZXN0cmljdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN0cmljdGlvbikgeyByZXR1cm4gc3RhdHVzOyB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHJlc3RyaWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uID0gcmVzdHJpY3Rpb24ocGFnZS54LCBwYWdlLnksIHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0VsZW1lbnQocmVzdHJpY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gPSBnZXRFbGVtZW50UmVjdChyZXN0cmljdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlY3QgPSByZXN0cmljdGlvbjtcblxuICAgICAgICAgICAgaWYgKCFyZXN0cmljdGlvbikge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWRYID0gcGFnZS54O1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWRZID0gcGFnZS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZVxuICAgICAgICAgICAgLy8geCwgeSwgd2lkdGgsIGhlaWdodCBvclxuICAgICAgICAgICAgLy8gbGVmdCwgdG9wLCByaWdodCwgYm90dG9tXG4gICAgICAgICAgICBlbHNlIGlmICgneCcgaW4gcmVzdHJpY3Rpb24gJiYgJ3knIGluIHJlc3RyaWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmVzdHJpY3RlZFggPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LnggKyByZWN0LndpZHRoICAtIHRoaXMucmVzdHJpY3RPZmZzZXQucmlnaHQgLCBwYWdlLngpLCByZWN0LnggKyB0aGlzLnJlc3RyaWN0T2Zmc2V0LmxlZnQpO1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWRZID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC55ICsgcmVjdC5oZWlnaHQgLSB0aGlzLnJlc3RyaWN0T2Zmc2V0LmJvdHRvbSwgcGFnZS55KSwgcmVjdC55ICsgdGhpcy5yZXN0cmljdE9mZnNldC50b3AgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWRYID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC5yaWdodCAgLSB0aGlzLnJlc3RyaWN0T2Zmc2V0LnJpZ2h0ICwgcGFnZS54KSwgcmVjdC5sZWZ0ICsgdGhpcy5yZXN0cmljdE9mZnNldC5sZWZ0KTtcbiAgICAgICAgICAgICAgICByZXN0cmljdGVkWSA9IE1hdGgubWF4KE1hdGgubWluKHJlY3QuYm90dG9tIC0gdGhpcy5yZXN0cmljdE9mZnNldC5ib3R0b20sIHBhZ2UueSksIHJlY3QudG9wICArIHRoaXMucmVzdHJpY3RPZmZzZXQudG9wICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YXR1cy5keCA9IHJlc3RyaWN0ZWRYIC0gcGFnZS54O1xuICAgICAgICAgICAgc3RhdHVzLmR5ID0gcmVzdHJpY3RlZFkgLSBwYWdlLnk7XG5cbiAgICAgICAgICAgIHN0YXR1cy5jaGFuZ2VkID0gc3RhdHVzLnJlc3RyaWN0ZWRYICE9PSByZXN0cmljdGVkWCB8fCBzdGF0dXMucmVzdHJpY3RlZFkgIT09IHJlc3RyaWN0ZWRZO1xuICAgICAgICAgICAgc3RhdHVzLnJlc3RyaWN0ZWQgPSAhIShzdGF0dXMuZHggfHwgc3RhdHVzLmR5KTtcblxuICAgICAgICAgICAgc3RhdHVzLnJlc3RyaWN0ZWRYID0gcmVzdHJpY3RlZFg7XG4gICAgICAgICAgICBzdGF0dXMucmVzdHJpY3RlZFkgPSByZXN0cmljdGVkWTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja0FuZFByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiAoZXZlbnQsIGludGVyYWN0YWJsZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCEoaW50ZXJhY3RhYmxlID0gaW50ZXJhY3RhYmxlIHx8IHRoaXMudGFyZ2V0KSkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBwcmV2ZW50ID0gb3B0aW9ucy5wcmV2ZW50RGVmYXVsdDtcblxuICAgICAgICAgICAgaWYgKHByZXZlbnQgPT09ICdhdXRvJyAmJiBlbGVtZW50ICYmICEvXihpbnB1dHxzZWxlY3R8dGV4dGFyZWEpJC9pLnRlc3QoZXZlbnQudGFyZ2V0Lm5vZGVOYW1lKSkge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBwcmV2ZW50RGVmYXVsdCBvbiBwb2ludGVyZG93biBpZiB0aGUgcHJlcGFyZWQgYWN0aW9uIGlzIGEgZHJhZ1xuICAgICAgICAgICAgICAgIC8vIGFuZCBkcmFnZ2luZyBjYW4gb25seSBzdGFydCBmcm9tIGEgY2VydGFpbiBkaXJlY3Rpb24gLSB0aGlzIGFsbG93c1xuICAgICAgICAgICAgICAgIC8vIGEgdG91Y2ggdG8gcGFuIHRoZSB2aWV3cG9ydCBpZiBhIGRyYWcgaXNuJ3QgaW4gdGhlIHJpZ2h0IGRpcmVjdGlvblxuICAgICAgICAgICAgICAgIGlmICgvZG93bnxzdGFydC9pLnRlc3QoZXZlbnQudHlwZSlcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5wcmVwYXJlZC5uYW1lID09PSAnZHJhZycgJiYgb3B0aW9ucy5kcmFnLmF4aXMgIT09ICd4eScpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gd2l0aCBtYW51YWxTdGFydCwgb25seSBwcmV2ZW50RGVmYXVsdCB3aGlsZSBpbnRlcmFjdGluZ1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0gJiYgb3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLm1hbnVhbFN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICYmICF0aGlzLmludGVyYWN0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJldmVudCA9PT0gJ2Fsd2F5cycpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjYWxjSW5lcnRpYTogZnVuY3Rpb24gKHN0YXR1cykge1xuICAgICAgICAgICAgdmFyIGluZXJ0aWFPcHRpb25zID0gdGhpcy50YXJnZXQub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLmluZXJ0aWEsXG4gICAgICAgICAgICAgICAgbGFtYmRhID0gaW5lcnRpYU9wdGlvbnMucmVzaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBpbmVydGlhRHVyID0gLU1hdGgubG9nKGluZXJ0aWFPcHRpb25zLmVuZFNwZWVkIC8gc3RhdHVzLnYwKSAvIGxhbWJkYTtcblxuICAgICAgICAgICAgc3RhdHVzLngwID0gdGhpcy5wcmV2RXZlbnQucGFnZVg7XG4gICAgICAgICAgICBzdGF0dXMueTAgPSB0aGlzLnByZXZFdmVudC5wYWdlWTtcbiAgICAgICAgICAgIHN0YXR1cy50MCA9IHN0YXR1cy5zdGFydEV2ZW50LnRpbWVTdGFtcCAvIDEwMDA7XG4gICAgICAgICAgICBzdGF0dXMuc3ggPSBzdGF0dXMuc3kgPSAwO1xuXG4gICAgICAgICAgICBzdGF0dXMubW9kaWZpZWRYZSA9IHN0YXR1cy54ZSA9IChzdGF0dXMudngwIC0gaW5lcnRpYUR1cikgLyBsYW1iZGE7XG4gICAgICAgICAgICBzdGF0dXMubW9kaWZpZWRZZSA9IHN0YXR1cy55ZSA9IChzdGF0dXMudnkwIC0gaW5lcnRpYUR1cikgLyBsYW1iZGE7XG4gICAgICAgICAgICBzdGF0dXMudGUgPSBpbmVydGlhRHVyO1xuXG4gICAgICAgICAgICBzdGF0dXMubGFtYmRhX3YwID0gbGFtYmRhIC8gc3RhdHVzLnYwO1xuICAgICAgICAgICAgc3RhdHVzLm9uZV92ZV92MCA9IDEgLSBpbmVydGlhT3B0aW9ucy5lbmRTcGVlZCAvIHN0YXR1cy52MDtcbiAgICAgICAgfSxcblxuICAgICAgICBhdXRvU2Nyb2xsTW92ZTogZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMuaW50ZXJhY3RpbmcoKVxuICAgICAgICAgICAgICAgICYmIGNoZWNrQXV0b1Njcm9sbCh0aGlzLnRhcmdldCwgdGhpcy5wcmVwYXJlZC5uYW1lKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluZXJ0aWFTdGF0dXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbC54ID0gYXV0b1Njcm9sbC55ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0b3AsXG4gICAgICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgICAgICAgYm90dG9tLFxuICAgICAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMudGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5hdXRvU2Nyb2xsLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIHx8IGdldFdpbmRvdyh0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAoaXNXaW5kb3coY29udGFpbmVyKSkge1xuICAgICAgICAgICAgICAgIGxlZnQgICA9IHBvaW50ZXIuY2xpZW50WCA8IGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgICAgICAgICAgIHRvcCAgICA9IHBvaW50ZXIuY2xpZW50WSA8IGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgICAgICAgICAgIHJpZ2h0ICA9IHBvaW50ZXIuY2xpZW50WCA+IGNvbnRhaW5lci5pbm5lcldpZHRoICAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgICAgICAgICAgIGJvdHRvbSA9IHBvaW50ZXIuY2xpZW50WSA+IGNvbnRhaW5lci5pbm5lckhlaWdodCAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlY3QgPSBnZXRFbGVtZW50Q2xpZW50UmVjdChjb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgbGVmdCAgID0gcG9pbnRlci5jbGllbnRYIDwgcmVjdC5sZWZ0ICAgKyBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgICAgICAgICAgICB0b3AgICAgPSBwb2ludGVyLmNsaWVudFkgPCByZWN0LnRvcCAgICArIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgICAgICAgICAgIHJpZ2h0ICA9IHBvaW50ZXIuY2xpZW50WCA+IHJlY3QucmlnaHQgIC0gYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICAgICAgICAgICAgYm90dG9tID0gcG9pbnRlci5jbGllbnRZID4gcmVjdC5ib3R0b20gLSBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXV0b1Njcm9sbC54ID0gKHJpZ2h0ID8gMTogbGVmdD8gLTE6IDApO1xuICAgICAgICAgICAgYXV0b1Njcm9sbC55ID0gKGJvdHRvbT8gMTogIHRvcD8gLTE6IDApO1xuXG4gICAgICAgICAgICBpZiAoIWF1dG9TY3JvbGwuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIGF1dG9TY3JvbGwgcHJvcGVydGllcyB0byB0aG9zZSBvZiB0aGUgdGFyZ2V0XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbC5tYXJnaW4gPSBvcHRpb25zLm1hcmdpbjtcbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsLnNwZWVkICA9IG9wdGlvbnMuc3BlZWQ7XG5cbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsLnN0YXJ0KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF91cGRhdGVFdmVudFRhcmdldHM6IGZ1bmN0aW9uICh0YXJnZXQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0ICAgID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5fY3VyRXZlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0SW50ZXJhY3Rpb25Gcm9tUG9pbnRlciAocG9pbnRlciwgZXZlbnRUeXBlLCBldmVudFRhcmdldCkge1xuICAgICAgICB2YXIgaSA9IDAsIGxlbiA9IGludGVyYWN0aW9ucy5sZW5ndGgsXG4gICAgICAgICAgICBtb3VzZUV2ZW50ID0gKC9tb3VzZS9pLnRlc3QocG9pbnRlci5wb2ludGVyVHlwZSB8fCBldmVudFR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1TUG9pbnRlckV2ZW50Lk1TUE9JTlRFUl9UWVBFX01PVVNFXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHBvaW50ZXIucG9pbnRlclR5cGUgPT09IDQpLFxuICAgICAgICAgICAgaW50ZXJhY3Rpb247XG5cbiAgICAgICAgdmFyIGlkID0gZ2V0UG9pbnRlcklkKHBvaW50ZXIpO1xuXG4gICAgICAgIC8vIHRyeSB0byByZXN1bWUgaW5lcnRpYSB3aXRoIGEgbmV3IHBvaW50ZXJcbiAgICAgICAgaWYgKC9kb3dufHN0YXJ0L2kudGVzdChldmVudFR5cGUpKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uc1tpXTtcblxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cy5hY3RpdmUgJiYgaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uaW5lcnRpYS5hbGxvd1Jlc3VtZVxuICAgICAgICAgICAgICAgICAgICAmJiAoaW50ZXJhY3Rpb24ubW91c2UgPT09IG1vdXNlRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZWxlbWVudCBpcyB0aGUgaW50ZXJhY3Rpb24gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IGludGVyYWN0aW9uLmVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gcGFyZW50RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGl0J3MgYSBtb3VzZSBpbnRlcmFjdGlvblxuICAgICAgICBpZiAobW91c2VFdmVudCB8fCAhKHN1cHBvcnRzVG91Y2ggfHwgc3VwcG9ydHNQb2ludGVyRXZlbnQpKSB7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgYSBtb3VzZSBpbnRlcmFjdGlvbiB0aGF0J3Mgbm90IGluIGluZXJ0aWEgcGhhc2VcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcmFjdGlvbnNbaV0ubW91c2UgJiYgIWludGVyYWN0aW9uc1tpXS5pbmVydGlhU3RhdHVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb25zW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZmluZCBhbnkgaW50ZXJhY3Rpb24gc3BlY2lmaWNhbGx5IGZvciBtb3VzZS5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBldmVudFR5cGUgaXMgYSBtb3VzZWRvd24sIGFuZCBpbmVydGlhIGlzIGFjdGl2ZVxuICAgICAgICAgICAgLy8gaWdub3JlIHRoZSBpbnRlcmFjdGlvblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVyYWN0aW9uc1tpXS5tb3VzZSAmJiAhKC9kb3duLy50ZXN0KGV2ZW50VHlwZSkgJiYgaW50ZXJhY3Rpb25zW2ldLmluZXJ0aWFTdGF0dXMuYWN0aXZlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgaW50ZXJhY3Rpb24gZm9yIG1vdXNlXG4gICAgICAgICAgICBpbnRlcmFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgaW50ZXJhY3Rpb24ubW91c2UgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgaW50ZXJhY3Rpb24gdGhhdCBoYXMgdGhpcyBwb2ludGVyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5zKGludGVyYWN0aW9uc1tpXS5wb2ludGVySWRzLCBpZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb25zW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXQgdGhpcyBzdGFnZSwgYSBwb2ludGVyVXAgc2hvdWxkIG5vdCByZXR1cm4gYW4gaW50ZXJhY3Rpb25cbiAgICAgICAgaWYgKC91cHxlbmR8b3V0L2kudGVzdChldmVudFR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBmaXJzdCBpZGxlIGludGVyYWN0aW9uXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbnNbaV07XG5cbiAgICAgICAgICAgIGlmICgoIWludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgfHwgKGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZCkpXG4gICAgICAgICAgICAgICAgJiYgIWludGVyYWN0aW9uLmludGVyYWN0aW5nKClcbiAgICAgICAgICAgICAgICAmJiAhKCFtb3VzZUV2ZW50ICYmIGludGVyYWN0aW9uLm1vdXNlKSkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcmFjdGlvbigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvT25JbnRlcmFjdGlvbnMgKG1ldGhvZCkge1xuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGludGVyYWN0aW9uLFxuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gZ2V0QWN0dWFsRWxlbWVudChldmVudC5wYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZXZlbnQucGF0aFswXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGV2ZW50LnRhcmdldCksXG4gICAgICAgICAgICAgICAgY3VyRXZlbnRUYXJnZXQgPSBnZXRBY3R1YWxFbGVtZW50KGV2ZW50LmN1cnJlbnRUYXJnZXQpLFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIGlmIChzdXBwb3J0c1RvdWNoICYmIC90b3VjaC8udGVzdChldmVudC50eXBlKSkge1xuICAgICAgICAgICAgICAgIHByZXZUb3VjaFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9pbnRlciA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uID0gZ2V0SW50ZXJhY3Rpb25Gcm9tUG9pbnRlcihwb2ludGVyLCBldmVudC50eXBlLCBldmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpbnRlcmFjdGlvbikgeyBjb250aW51ZTsgfVxuXG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLl91cGRhdGVFdmVudFRhcmdldHMoZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvblttZXRob2RdKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghc3VwcG9ydHNQb2ludGVyRXZlbnQgJiYgL21vdXNlLy50ZXN0KGV2ZW50LnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBtb3VzZSBldmVudHMgd2hpbGUgdG91Y2ggaW50ZXJhY3Rpb25zIGFyZSBhY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGludGVyYWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbnRlcmFjdGlvbnNbaV0ubW91c2UgJiYgaW50ZXJhY3Rpb25zW2ldLnBvaW50ZXJJc0Rvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyB0cnkgdG8gaWdub3JlIG1vdXNlIGV2ZW50cyB0aGF0IGFyZSBzaW11bGF0ZWQgYnkgdGhlIGJyb3dzZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWZ0ZXIgYSB0b3VjaCBldmVudFxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBwcmV2VG91Y2hUaW1lIDwgNTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbiA9IGdldEludGVyYWN0aW9uRnJvbVBvaW50ZXIoZXZlbnQsIGV2ZW50LnR5cGUsIGV2ZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIGlmICghaW50ZXJhY3Rpb24pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbi5fdXBkYXRlRXZlbnRUYXJnZXRzKGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpbnRlcmFjdGlvblttZXRob2RdKGV2ZW50LCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gSW50ZXJhY3RFdmVudCAoaW50ZXJhY3Rpb24sIGV2ZW50LCBhY3Rpb24sIHBoYXNlLCBlbGVtZW50LCByZWxhdGVkKSB7XG4gICAgICAgIHZhciBjbGllbnQsXG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgdGFyZ2V0ICAgICAgPSBpbnRlcmFjdGlvbi50YXJnZXQsXG4gICAgICAgICAgICBzbmFwU3RhdHVzICA9IGludGVyYWN0aW9uLnNuYXBTdGF0dXMsXG4gICAgICAgICAgICByZXN0cmljdFN0YXR1cyAgPSBpbnRlcmFjdGlvbi5yZXN0cmljdFN0YXR1cyxcbiAgICAgICAgICAgIHBvaW50ZXJzICAgID0gaW50ZXJhY3Rpb24ucG9pbnRlcnMsXG4gICAgICAgICAgICBkZWx0YVNvdXJjZSA9ICh0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnMgfHwgZGVmYXVsdE9wdGlvbnMpLmRlbHRhU291cmNlLFxuICAgICAgICAgICAgc291cmNlWCAgICAgPSBkZWx0YVNvdXJjZSArICdYJyxcbiAgICAgICAgICAgIHNvdXJjZVkgICAgID0gZGVsdGFTb3VyY2UgKyAnWScsXG4gICAgICAgICAgICBvcHRpb25zICAgICA9IHRhcmdldD8gdGFyZ2V0Lm9wdGlvbnM6IGRlZmF1bHRPcHRpb25zLFxuICAgICAgICAgICAgb3JpZ2luICAgICAgPSBnZXRPcmlnaW5YWSh0YXJnZXQsIGVsZW1lbnQpLFxuICAgICAgICAgICAgc3RhcnRpbmcgICAgPSBwaGFzZSA9PT0gJ3N0YXJ0JyxcbiAgICAgICAgICAgIGVuZGluZyAgICAgID0gcGhhc2UgPT09ICdlbmQnLFxuICAgICAgICAgICAgY29vcmRzICAgICAgPSBzdGFydGluZz8gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMgOiBpbnRlcmFjdGlvbi5jdXJDb29yZHM7XG5cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgaW50ZXJhY3Rpb24uZWxlbWVudDtcblxuICAgICAgICBwYWdlICAgPSBleHRlbmQoe30sIGNvb3Jkcy5wYWdlKTtcbiAgICAgICAgY2xpZW50ID0gZXh0ZW5kKHt9LCBjb29yZHMuY2xpZW50KTtcblxuICAgICAgICBwYWdlLnggLT0gb3JpZ2luLng7XG4gICAgICAgIHBhZ2UueSAtPSBvcmlnaW4ueTtcblxuICAgICAgICBjbGllbnQueCAtPSBvcmlnaW4ueDtcbiAgICAgICAgY2xpZW50LnkgLT0gb3JpZ2luLnk7XG5cbiAgICAgICAgdmFyIHJlbGF0aXZlUG9pbnRzID0gb3B0aW9uc1thY3Rpb25dLnNuYXAgJiYgb3B0aW9uc1thY3Rpb25dLnNuYXAucmVsYXRpdmVQb2ludHMgO1xuXG4gICAgICAgIGlmIChjaGVja1NuYXAodGFyZ2V0LCBhY3Rpb24pICYmICEoc3RhcnRpbmcgJiYgcmVsYXRpdmVQb2ludHMgJiYgcmVsYXRpdmVQb2ludHMubGVuZ3RoKSkge1xuICAgICAgICAgICAgdGhpcy5zbmFwID0ge1xuICAgICAgICAgICAgICAgIHJhbmdlICA6IHNuYXBTdGF0dXMucmFuZ2UsXG4gICAgICAgICAgICAgICAgbG9ja2VkIDogc25hcFN0YXR1cy5sb2NrZWQsXG4gICAgICAgICAgICAgICAgeCAgICAgIDogc25hcFN0YXR1cy5zbmFwcGVkWCxcbiAgICAgICAgICAgICAgICB5ICAgICAgOiBzbmFwU3RhdHVzLnNuYXBwZWRZLFxuICAgICAgICAgICAgICAgIHJlYWxYICA6IHNuYXBTdGF0dXMucmVhbFgsXG4gICAgICAgICAgICAgICAgcmVhbFkgIDogc25hcFN0YXR1cy5yZWFsWSxcbiAgICAgICAgICAgICAgICBkeCAgICAgOiBzbmFwU3RhdHVzLmR4LFxuICAgICAgICAgICAgICAgIGR5ICAgICA6IHNuYXBTdGF0dXMuZHlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChzbmFwU3RhdHVzLmxvY2tlZCkge1xuICAgICAgICAgICAgICAgIHBhZ2UueCArPSBzbmFwU3RhdHVzLmR4O1xuICAgICAgICAgICAgICAgIHBhZ2UueSArPSBzbmFwU3RhdHVzLmR5O1xuICAgICAgICAgICAgICAgIGNsaWVudC54ICs9IHNuYXBTdGF0dXMuZHg7XG4gICAgICAgICAgICAgICAgY2xpZW50LnkgKz0gc25hcFN0YXR1cy5keTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVja1Jlc3RyaWN0KHRhcmdldCwgYWN0aW9uKSAmJiAhKHN0YXJ0aW5nICYmIG9wdGlvbnNbYWN0aW9uXS5yZXN0cmljdC5lbGVtZW50UmVjdCkgJiYgcmVzdHJpY3RTdGF0dXMucmVzdHJpY3RlZCkge1xuICAgICAgICAgICAgcGFnZS54ICs9IHJlc3RyaWN0U3RhdHVzLmR4O1xuICAgICAgICAgICAgcGFnZS55ICs9IHJlc3RyaWN0U3RhdHVzLmR5O1xuICAgICAgICAgICAgY2xpZW50LnggKz0gcmVzdHJpY3RTdGF0dXMuZHg7XG4gICAgICAgICAgICBjbGllbnQueSArPSByZXN0cmljdFN0YXR1cy5keTtcblxuICAgICAgICAgICAgdGhpcy5yZXN0cmljdCA9IHtcbiAgICAgICAgICAgICAgICBkeDogcmVzdHJpY3RTdGF0dXMuZHgsXG4gICAgICAgICAgICAgICAgZHk6IHJlc3RyaWN0U3RhdHVzLmR5XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYWdlWCAgICAgPSBwYWdlLng7XG4gICAgICAgIHRoaXMucGFnZVkgICAgID0gcGFnZS55O1xuICAgICAgICB0aGlzLmNsaWVudFggICA9IGNsaWVudC54O1xuICAgICAgICB0aGlzLmNsaWVudFkgICA9IGNsaWVudC55O1xuXG4gICAgICAgIHRoaXMueDAgICAgICAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS54IC0gb3JpZ2luLng7XG4gICAgICAgIHRoaXMueTAgICAgICAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS55IC0gb3JpZ2luLnk7XG4gICAgICAgIHRoaXMuY2xpZW50WDAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50LnggLSBvcmlnaW4ueDtcbiAgICAgICAgdGhpcy5jbGllbnRZMCAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueSAtIG9yaWdpbi55O1xuICAgICAgICB0aGlzLmN0cmxLZXkgICA9IGV2ZW50LmN0cmxLZXk7XG4gICAgICAgIHRoaXMuYWx0S2V5ICAgID0gZXZlbnQuYWx0S2V5O1xuICAgICAgICB0aGlzLnNoaWZ0S2V5ICA9IGV2ZW50LnNoaWZ0S2V5O1xuICAgICAgICB0aGlzLm1ldGFLZXkgICA9IGV2ZW50Lm1ldGFLZXk7XG4gICAgICAgIHRoaXMuYnV0dG9uICAgID0gZXZlbnQuYnV0dG9uO1xuICAgICAgICB0aGlzLmJ1dHRvbnMgICA9IGV2ZW50LmJ1dHRvbnM7XG4gICAgICAgIHRoaXMudGFyZ2V0ICAgID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy50MCAgICAgICAgPSBpbnRlcmFjdGlvbi5kb3duVGltZXNbMF07XG4gICAgICAgIHRoaXMudHlwZSAgICAgID0gYWN0aW9uICsgKHBoYXNlIHx8ICcnKTtcblxuICAgICAgICB0aGlzLmludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XG4gICAgICAgIHRoaXMuaW50ZXJhY3RhYmxlID0gdGFyZ2V0O1xuXG4gICAgICAgIHZhciBpbmVydGlhU3RhdHVzID0gaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cztcblxuICAgICAgICBpZiAoaW5lcnRpYVN0YXR1cy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsID0gJ2luZXJ0aWEnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbGF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVsYXRlZFRhcmdldCA9IHJlbGF0ZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmQgZXZlbnQgZHgsIGR5IGlzIGRpZmZlcmVuY2UgYmV0d2VlbiBzdGFydCBhbmQgZW5kIHBvaW50c1xuICAgICAgICBpZiAoZW5kaW5nKSB7XG4gICAgICAgICAgICBpZiAoZGVsdGFTb3VyY2UgPT09ICdjbGllbnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5keCA9IGNsaWVudC54IC0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50Lng7XG4gICAgICAgICAgICAgICAgdGhpcy5keSA9IGNsaWVudC55IC0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR4ID0gcGFnZS54IC0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS54O1xuICAgICAgICAgICAgICAgIHRoaXMuZHkgPSBwYWdlLnkgLSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhcnRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZHggPSAwO1xuICAgICAgICAgICAgdGhpcy5keSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29weSBwcm9wZXJ0aWVzIGZyb20gcHJldmlvdXNtb3ZlIGlmIHN0YXJ0aW5nIGluZXJ0aWFcbiAgICAgICAgZWxzZSBpZiAocGhhc2UgPT09ICdpbmVydGlhc3RhcnQnKSB7XG4gICAgICAgICAgICB0aGlzLmR4ID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmR4O1xuICAgICAgICAgICAgdGhpcy5keSA9IGludGVyYWN0aW9uLnByZXZFdmVudC5keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkZWx0YVNvdXJjZSA9PT0gJ2NsaWVudCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR4ID0gY2xpZW50LnggLSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuY2xpZW50WDtcbiAgICAgICAgICAgICAgICB0aGlzLmR5ID0gY2xpZW50LnkgLSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuY2xpZW50WTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZHggPSBwYWdlLnggLSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQucGFnZVg7XG4gICAgICAgICAgICAgICAgdGhpcy5keSA9IHBhZ2UueSAtIGludGVyYWN0aW9uLnByZXZFdmVudC5wYWdlWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaW50ZXJhY3Rpb24ucHJldkV2ZW50ICYmIGludGVyYWN0aW9uLnByZXZFdmVudC5kZXRhaWwgPT09ICdpbmVydGlhJ1xuICAgICAgICAgICAgJiYgIWluZXJ0aWFTdGF0dXMuYWN0aXZlXG4gICAgICAgICAgICAmJiBvcHRpb25zW2FjdGlvbl0uaW5lcnRpYSAmJiBvcHRpb25zW2FjdGlvbl0uaW5lcnRpYS56ZXJvUmVzdW1lRGVsdGEpIHtcblxuICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5yZXN1bWVEeCArPSB0aGlzLmR4O1xuICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5yZXN1bWVEeSArPSB0aGlzLmR5O1xuXG4gICAgICAgICAgICB0aGlzLmR4ID0gdGhpcy5keSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0aW9uID09PSAncmVzaXplJyAmJiBpbnRlcmFjdGlvbi5yZXNpemVBeGVzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5yZXNpemUuc3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmR4ID0gdGhpcy5keTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHkgPSB0aGlzLmR4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmF4ZXMgPSAneHknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5heGVzID0gaW50ZXJhY3Rpb24ucmVzaXplQXhlcztcblxuICAgICAgICAgICAgICAgIGlmIChpbnRlcmFjdGlvbi5yZXNpemVBeGVzID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5keSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmR4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uID09PSAnZ2VzdHVyZScpIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hlcyA9IFtwb2ludGVyc1swXSwgcG9pbnRlcnNbMV1dO1xuXG4gICAgICAgICAgICBpZiAoc3RhcnRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gdG91Y2hEaXN0YW5jZShwb2ludGVycywgZGVsdGFTb3VyY2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuYm94ICAgICAgPSB0b3VjaEJCb3gocG9pbnRlcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgICAgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuZHMgICAgICAgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgICAgPSB0b3VjaEFuZ2xlKHBvaW50ZXJzLCB1bmRlZmluZWQsIGRlbHRhU291cmNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhICAgICAgID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVuZGluZyB8fCBldmVudCBpbnN0YW5jZW9mIEludGVyYWN0RXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYm94ICAgICAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuYm94O1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgICAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc2NhbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcyAgICAgICA9IHRoaXMuc2NhbGUgLSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgICAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuYW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5kYSAgICAgICA9IHRoaXMuYW5nbGUgLSBpbnRlcmFjdGlvbi5nZXN0dXJlLnN0YXJ0QW5nbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gdG91Y2hEaXN0YW5jZShwb2ludGVycywgZGVsdGFTb3VyY2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuYm94ICAgICAgPSB0b3VjaEJCb3gocG9pbnRlcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgICAgPSB0aGlzLmRpc3RhbmNlIC8gaW50ZXJhY3Rpb24uZ2VzdHVyZS5zdGFydERpc3RhbmNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgICAgPSB0b3VjaEFuZ2xlKHBvaW50ZXJzLCBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZBbmdsZSwgZGVsdGFTb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcyA9IHRoaXMuc2NhbGUgLSBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZTY2FsZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhID0gdGhpcy5hbmdsZSAtIGludGVyYWN0aW9uLmdlc3R1cmUucHJldkFuZ2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXJ0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IGludGVyYWN0aW9uLmRvd25UaW1lc1swXTtcbiAgICAgICAgICAgIHRoaXMuZHQgICAgICAgID0gMDtcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgICAgID0gMDtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHlYID0gMDtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHlZID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwaGFzZSA9PT0gJ2luZXJ0aWFzdGFydCcpIHtcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnRpbWVTdGFtcDtcbiAgICAgICAgICAgIHRoaXMuZHQgICAgICAgID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmR0O1xuICAgICAgICAgICAgdGhpcy5kdXJhdGlvbiAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuZHVyYXRpb247XG4gICAgICAgICAgICB0aGlzLnNwZWVkICAgICA9IGludGVyYWN0aW9uLnByZXZFdmVudC5zcGVlZDtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHlYID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WDtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHlZID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB0aGlzLmR0ICAgICAgICA9IHRoaXMudGltZVN0YW1wIC0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnRpbWVTdGFtcDtcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gID0gdGhpcy50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi5kb3duVGltZXNbMF07XG5cbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEludGVyYWN0RXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZHggPSB0aGlzW3NvdXJjZVhdIC0gaW50ZXJhY3Rpb24ucHJldkV2ZW50W3NvdXJjZVhdLFxuICAgICAgICAgICAgICAgICAgICBkeSA9IHRoaXNbc291cmNlWV0gLSBpbnRlcmFjdGlvbi5wcmV2RXZlbnRbc291cmNlWV0sXG4gICAgICAgICAgICAgICAgICAgIGR0ID0gdGhpcy5kdCAvIDEwMDA7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gaHlwb3QoZHgsIGR5KSAvIGR0O1xuICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHlYID0gZHggLyBkdDtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5WSA9IGR5IC8gZHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBub3JtYWwgbW92ZSBvciBlbmQgZXZlbnQsIHVzZSBwcmV2aW91cyB1c2VyIGV2ZW50IGNvb3Jkc1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3BlZWQgYW5kIHZlbG9jaXR5IGluIHBpeGVscyBwZXIgc2Vjb25kXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YVtkZWx0YVNvdXJjZV0uc3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eVggPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGFbZGVsdGFTb3VyY2VdLnZ4O1xuICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHlZID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhW2RlbHRhU291cmNlXS52eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoZW5kaW5nIHx8IHBoYXNlID09PSAnaW5lcnRpYXN0YXJ0JylcbiAgICAgICAgICAgICYmIGludGVyYWN0aW9uLnByZXZFdmVudC5zcGVlZCA+IDYwMCAmJiB0aGlzLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLnByZXZFdmVudC50aW1lU3RhbXAgPCAxNTApIHtcblxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gMTgwICogTWF0aC5hdGFuMihpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlZLCBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlYKSAvIE1hdGguUEksXG4gICAgICAgICAgICAgICAgb3ZlcmxhcCA9IDIyLjU7XG5cbiAgICAgICAgICAgIGlmIChhbmdsZSA8IDApIHtcbiAgICAgICAgICAgICAgICBhbmdsZSArPSAzNjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsZWZ0ID0gMTM1IC0gb3ZlcmxhcCA8PSBhbmdsZSAmJiBhbmdsZSA8IDIyNSArIG92ZXJsYXAsXG4gICAgICAgICAgICAgICAgdXAgICA9IDIyNSAtIG92ZXJsYXAgPD0gYW5nbGUgJiYgYW5nbGUgPCAzMTUgKyBvdmVybGFwLFxuXG4gICAgICAgICAgICAgICAgcmlnaHQgPSAhbGVmdCAmJiAoMzE1IC0gb3ZlcmxhcCA8PSBhbmdsZSB8fCBhbmdsZSA8ICA0NSArIG92ZXJsYXApLFxuICAgICAgICAgICAgICAgIGRvd24gID0gIXVwICAgJiYgICA0NSAtIG92ZXJsYXAgPD0gYW5nbGUgJiYgYW5nbGUgPCAxMzUgKyBvdmVybGFwO1xuXG4gICAgICAgICAgICB0aGlzLnN3aXBlID0ge1xuICAgICAgICAgICAgICAgIHVwICAgOiB1cCxcbiAgICAgICAgICAgICAgICBkb3duIDogZG93bixcbiAgICAgICAgICAgICAgICBsZWZ0IDogbGVmdCxcbiAgICAgICAgICAgICAgICByaWdodDogcmlnaHQsXG4gICAgICAgICAgICAgICAgYW5nbGU6IGFuZ2xlLFxuICAgICAgICAgICAgICAgIHNwZWVkOiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc3BlZWQsXG4gICAgICAgICAgICAgICAgdmVsb2NpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WCxcbiAgICAgICAgICAgICAgICAgICAgeTogaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBJbnRlcmFjdEV2ZW50LnByb3RvdHlwZSA9IHtcbiAgICAgICAgcHJldmVudERlZmF1bHQ6IGJsYW5rLFxuICAgICAgICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcmV2ZW50T3JpZ2luYWxEZWZhdWx0ICgpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWN0aW9uQ3Vyc29yIChhY3Rpb24pIHtcbiAgICAgICAgdmFyIGN1cnNvciA9ICcnO1xuXG4gICAgICAgIGlmIChhY3Rpb24ubmFtZSA9PT0gJ2RyYWcnKSB7XG4gICAgICAgICAgICBjdXJzb3IgPSAgYWN0aW9uQ3Vyc29ycy5kcmFnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb24ubmFtZSA9PT0gJ3Jlc2l6ZScpIHtcbiAgICAgICAgICAgIGlmIChhY3Rpb24uYXhpcykge1xuICAgICAgICAgICAgICAgIGN1cnNvciA9ICBhY3Rpb25DdXJzb3JzW2FjdGlvbi5uYW1lICsgYWN0aW9uLmF4aXNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYWN0aW9uLmVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnNvcktleSA9ICdyZXNpemUnLFxuICAgICAgICAgICAgICAgICAgICBlZGdlTmFtZXMgPSBbJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCddO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5lZGdlc1tlZGdlTmFtZXNbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JLZXkgKz0gZWRnZU5hbWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3Vyc29yID0gYWN0aW9uQ3Vyc29yc1tjdXJzb3JLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGN1cnNvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1Jlc2l6ZUVkZ2UgKG5hbWUsIHZhbHVlLCBwYWdlLCBlbGVtZW50LCBpbnRlcmFjdGFibGVFbGVtZW50LCByZWN0LCBtYXJnaW4pIHtcbiAgICAgICAgLy8gZmFsc2UsICcnLCB1bmRlZmluZWQsIG51bGxcbiAgICAgICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAvLyB0cnVlIHZhbHVlLCB1c2UgcG9pbnRlciBjb29yZHMgYW5kIGVsZW1lbnQgcmVjdFxuICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIGlmIGRpbWVuc2lvbnMgYXJlIG5lZ2F0aXZlLCBcInN3aXRjaFwiIGVkZ2VzXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBpc051bWJlcihyZWN0LndpZHRoKT8gcmVjdC53aWR0aCA6IHJlY3QucmlnaHQgLSByZWN0LmxlZnQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gaXNOdW1iZXIocmVjdC5oZWlnaHQpPyByZWN0LmhlaWdodCA6IHJlY3QuYm90dG9tIC0gcmVjdC50b3A7XG5cbiAgICAgICAgICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgICAgICAgICAgICBpZiAgICAgIChuYW1lID09PSAnbGVmdCcgKSB7IG5hbWUgPSAncmlnaHQnOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ3JpZ2h0JykgeyBuYW1lID0gJ2xlZnQnIDsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhlaWdodCA8IDApIHtcbiAgICAgICAgICAgICAgICBpZiAgICAgIChuYW1lID09PSAndG9wJyAgICkgeyBuYW1lID0gJ2JvdHRvbSc7IH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnYm90dG9tJykgeyBuYW1lID0gJ3RvcCcgICA7IH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdsZWZ0JyAgKSB7IHJldHVybiBwYWdlLnggPCAoKHdpZHRoICA+PSAwPyByZWN0LmxlZnQ6IHJlY3QucmlnaHQgKSArIG1hcmdpbik7IH1cbiAgICAgICAgICAgIGlmIChuYW1lID09PSAndG9wJyAgICkgeyByZXR1cm4gcGFnZS55IDwgKChoZWlnaHQgPj0gMD8gcmVjdC50b3AgOiByZWN0LmJvdHRvbSkgKyBtYXJnaW4pOyB9XG5cbiAgICAgICAgICAgIGlmIChuYW1lID09PSAncmlnaHQnICkgeyByZXR1cm4gcGFnZS54ID4gKCh3aWR0aCAgPj0gMD8gcmVjdC5yaWdodCA6IHJlY3QubGVmdCkgLSBtYXJnaW4pOyB9XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2JvdHRvbScpIHsgcmV0dXJuIHBhZ2UueSA+ICgoaGVpZ2h0ID49IDA/IHJlY3QuYm90dG9tOiByZWN0LnRvcCApIC0gbWFyZ2luKTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIHJlbWFpbmluZyBjaGVja3MgcmVxdWlyZSBhbiBlbGVtZW50XG4gICAgICAgIGlmICghaXNFbGVtZW50KGVsZW1lbnQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHJldHVybiBpc0VsZW1lbnQodmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSB2YWx1ZSBpcyBhbiBlbGVtZW50IHRvIHVzZSBhcyBhIHJlc2l6ZSBoYW5kbGVcbiAgICAgICAgICAgICAgICAgICAgPyB2YWx1ZSA9PT0gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UgY2hlY2sgaWYgZWxlbWVudCBtYXRjaGVzIHZhbHVlIGFzIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIDogbWF0Y2hlc1VwVG8oZWxlbWVudCwgdmFsdWUsIGludGVyYWN0YWJsZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRBY3Rpb25DaGVja2VyIChwb2ludGVyLCBpbnRlcmFjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuZ2V0UmVjdChlbGVtZW50KSxcbiAgICAgICAgICAgIHNob3VsZFJlc2l6ZSA9IGZhbHNlLFxuICAgICAgICAgICAgYWN0aW9uID0gbnVsbCxcbiAgICAgICAgICAgIHJlc2l6ZUF4ZXMgPSBudWxsLFxuICAgICAgICAgICAgcmVzaXplRWRnZXMsXG4gICAgICAgICAgICBwYWdlID0gZXh0ZW5kKHt9LCBpbnRlcmFjdGlvbi5jdXJDb29yZHMucGFnZSksXG4gICAgICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICAgIGlmICghcmVjdCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGlmIChhY3Rpb25Jc0VuYWJsZWQucmVzaXplICYmIG9wdGlvbnMucmVzaXplLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHZhciByZXNpemVPcHRpb25zID0gb3B0aW9ucy5yZXNpemU7XG5cbiAgICAgICAgICAgIHJlc2l6ZUVkZ2VzID0ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLCByaWdodDogZmFsc2UsIHRvcDogZmFsc2UsIGJvdHRvbTogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGlmIHVzaW5nIHJlc2l6ZS5lZGdlc1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHJlc2l6ZU9wdGlvbnMuZWRnZXMpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZWRnZSBpbiByZXNpemVFZGdlcykge1xuICAgICAgICAgICAgICAgICAgICByZXNpemVFZGdlc1tlZGdlXSA9IGNoZWNrUmVzaXplRWRnZShlZGdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVPcHRpb25zLmVkZ2VzW2VkZ2VdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbi5fZXZlbnRUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZU9wdGlvbnMubWFyZ2luIHx8IG1hcmdpbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzaXplRWRnZXMubGVmdCA9IHJlc2l6ZUVkZ2VzLmxlZnQgJiYgIXJlc2l6ZUVkZ2VzLnJpZ2h0O1xuICAgICAgICAgICAgICAgIHJlc2l6ZUVkZ2VzLnRvcCAgPSByZXNpemVFZGdlcy50b3AgICYmICFyZXNpemVFZGdlcy5ib3R0b207XG5cbiAgICAgICAgICAgICAgICBzaG91bGRSZXNpemUgPSByZXNpemVFZGdlcy5sZWZ0IHx8IHJlc2l6ZUVkZ2VzLnJpZ2h0IHx8IHJlc2l6ZUVkZ2VzLnRvcCB8fCByZXNpemVFZGdlcy5ib3R0b207XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHQgID0gb3B0aW9ucy5yZXNpemUuYXhpcyAhPT0gJ3knICYmIHBhZ2UueCA+IChyZWN0LnJpZ2h0ICAtIG1hcmdpbiksXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSA9IG9wdGlvbnMucmVzaXplLmF4aXMgIT09ICd4JyAmJiBwYWdlLnkgPiAocmVjdC5ib3R0b20gLSBtYXJnaW4pO1xuXG4gICAgICAgICAgICAgICAgc2hvdWxkUmVzaXplID0gcmlnaHQgfHwgYm90dG9tO1xuICAgICAgICAgICAgICAgIHJlc2l6ZUF4ZXMgPSAocmlnaHQ/ICd4JyA6ICcnKSArIChib3R0b20/ICd5JyA6ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGlvbiA9IHNob3VsZFJlc2l6ZVxuICAgICAgICAgICAgPyAncmVzaXplJ1xuICAgICAgICAgICAgOiBhY3Rpb25Jc0VuYWJsZWQuZHJhZyAmJiBvcHRpb25zLmRyYWcuZW5hYmxlZFxuICAgICAgICAgICAgICAgID8gJ2RyYWcnXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIGlmIChhY3Rpb25Jc0VuYWJsZWQuZ2VzdHVyZVxuICAgICAgICAgICAgJiYgaW50ZXJhY3Rpb24ucG9pbnRlcklkcy5sZW5ndGggPj0yXG4gICAgICAgICAgICAmJiAhKGludGVyYWN0aW9uLmRyYWdnaW5nIHx8IGludGVyYWN0aW9uLnJlc2l6aW5nKSkge1xuICAgICAgICAgICAgYWN0aW9uID0gJ2dlc3R1cmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBhY3Rpb24sXG4gICAgICAgICAgICAgICAgYXhpczogcmVzaXplQXhlcyxcbiAgICAgICAgICAgICAgICBlZGdlczogcmVzaXplRWRnZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBhY3Rpb24gaXMgZW5hYmxlZCBnbG9iYWxseSBhbmQgdGhlIGN1cnJlbnQgdGFyZ2V0IHN1cHBvcnRzIGl0XG4gICAgLy8gSWYgc28sIHJldHVybiB0aGUgdmFsaWRhdGVkIGFjdGlvbi4gT3RoZXJ3aXNlLCByZXR1cm4gbnVsbFxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlQWN0aW9uIChhY3Rpb24sIGludGVyYWN0YWJsZSkge1xuICAgICAgICBpZiAoIWlzT2JqZWN0KGFjdGlvbikpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICB2YXIgYWN0aW9uTmFtZSA9IGFjdGlvbi5uYW1lLFxuICAgICAgICAgICAgb3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zO1xuXG4gICAgICAgIGlmICgoICAoYWN0aW9uTmFtZSAgPT09ICdyZXNpemUnICAgJiYgb3B0aW9ucy5yZXNpemUuZW5hYmxlZCApXG4gICAgICAgICAgICB8fCAoYWN0aW9uTmFtZSAgICAgID09PSAnZHJhZycgICAgICYmIG9wdGlvbnMuZHJhZy5lbmFibGVkICApXG4gICAgICAgICAgICB8fCAoYWN0aW9uTmFtZSAgICAgID09PSAnZ2VzdHVyZScgICYmIG9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkKSlcbiAgICAgICAgICAgICYmIGFjdGlvbklzRW5hYmxlZFthY3Rpb25OYW1lXSkge1xuXG4gICAgICAgICAgICBpZiAoYWN0aW9uTmFtZSA9PT0gJ3Jlc2l6ZScgfHwgYWN0aW9uTmFtZSA9PT0gJ3Jlc2l6ZXl4Jykge1xuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWUgPSAncmVzaXpleHknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSB7fSxcbiAgICAgICAgaW50ZXJhY3Rpb25MaXN0ZW5lcnMgPSBbXG4gICAgICAgICAgICAnZHJhZ1N0YXJ0JywgJ2RyYWdNb3ZlJywgJ3Jlc2l6ZVN0YXJ0JywgJ3Jlc2l6ZU1vdmUnLCAnZ2VzdHVyZVN0YXJ0JywgJ2dlc3R1cmVNb3ZlJyxcbiAgICAgICAgICAgICdwb2ludGVyT3ZlcicsICdwb2ludGVyT3V0JywgJ3BvaW50ZXJIb3ZlcicsICdzZWxlY3RvckRvd24nLFxuICAgICAgICAgICAgJ3BvaW50ZXJEb3duJywgJ3BvaW50ZXJNb3ZlJywgJ3BvaW50ZXJVcCcsICdwb2ludGVyQ2FuY2VsJywgJ3BvaW50ZXJFbmQnLFxuICAgICAgICAgICAgJ2FkZFBvaW50ZXInLCAncmVtb3ZlUG9pbnRlcicsICdyZWNvcmRQb2ludGVyJywgJ2F1dG9TY3JvbGxNb3ZlJ1xuICAgICAgICBdO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGludGVyYWN0aW9uTGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBuYW1lID0gaW50ZXJhY3Rpb25MaXN0ZW5lcnNbaV07XG5cbiAgICAgICAgbGlzdGVuZXJzW25hbWVdID0gZG9PbkludGVyYWN0aW9ucyhuYW1lKTtcbiAgICB9XG5cbiAgICAvLyBib3VuZCB0byB0aGUgaW50ZXJhY3RhYmxlIGNvbnRleHQgd2hlbiBhIERPTSBldmVudFxuICAgIC8vIGxpc3RlbmVyIGlzIGFkZGVkIHRvIGEgc2VsZWN0b3IgaW50ZXJhY3RhYmxlXG4gICAgZnVuY3Rpb24gZGVsZWdhdGVMaXN0ZW5lciAoZXZlbnQsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgdmFyIGZha2VFdmVudCA9IHt9LFxuICAgICAgICAgICAgZGVsZWdhdGVkID0gZGVsZWdhdGVkRXZlbnRzW2V2ZW50LnR5cGVdLFxuICAgICAgICAgICAgZXZlbnRUYXJnZXQgPSBnZXRBY3R1YWxFbGVtZW50KGV2ZW50LnBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGV2ZW50LnBhdGhbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGV2ZW50LnRhcmdldCksXG4gICAgICAgICAgICBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICAgICAgdXNlQ2FwdHVyZSA9IHVzZUNhcHR1cmU/IHRydWU6IGZhbHNlO1xuXG4gICAgICAgIC8vIGR1cGxpY2F0ZSB0aGUgZXZlbnQgc28gdGhhdCBjdXJyZW50VGFyZ2V0IGNhbiBiZSBjaGFuZ2VkXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gZXZlbnQpIHtcbiAgICAgICAgICAgIGZha2VFdmVudFtwcm9wXSA9IGV2ZW50W3Byb3BdO1xuICAgICAgICB9XG5cbiAgICAgICAgZmFrZUV2ZW50Lm9yaWdpbmFsRXZlbnQgPSBldmVudDtcbiAgICAgICAgZmFrZUV2ZW50LnByZXZlbnREZWZhdWx0ID0gcHJldmVudE9yaWdpbmFsRGVmYXVsdDtcblxuICAgICAgICAvLyBjbGltYiB1cCBkb2N1bWVudCB0cmVlIGxvb2tpbmcgZm9yIHNlbGVjdG9yIG1hdGNoZXNcbiAgICAgICAgd2hpbGUgKGlzRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gZGVsZWdhdGVkLnNlbGVjdG9yc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGRlbGVnYXRlZC5jb250ZXh0c1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgICYmIG5vZGVDb250YWlucyhjb250ZXh0LCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgJiYgbm9kZUNvbnRhaW5zKGNvbnRleHQsIGVsZW1lbnQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGRlbGVnYXRlZC5saXN0ZW5lcnNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgZmFrZUV2ZW50LmN1cnJlbnRUYXJnZXQgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGlzdGVuZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2pdWzFdID09PSB1c2VDYXB0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2pdWzBdKGZha2VFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZWdhdGVVc2VDYXB0dXJlIChldmVudCkge1xuICAgICAgICByZXR1cm4gZGVsZWdhdGVMaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBpbnRlcmFjdGFibGVzLmluZGV4T2ZFbGVtZW50ID0gZnVuY3Rpb24gaW5kZXhPZkVsZW1lbnQgKGVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW50ZXJhY3RhYmxlID0gdGhpc1tpXTtcblxuICAgICAgICAgICAgaWYgKChpbnRlcmFjdGFibGUuc2VsZWN0b3IgPT09IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAmJiAoaW50ZXJhY3RhYmxlLl9jb250ZXh0ID09PSBjb250ZXh0KSlcbiAgICAgICAgICAgICAgICB8fCAoIWludGVyYWN0YWJsZS5zZWxlY3RvciAmJiBpbnRlcmFjdGFibGUuX2VsZW1lbnQgPT09IGVsZW1lbnQpKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcblxuICAgIGludGVyYWN0YWJsZXMuZ2V0ID0gZnVuY3Rpb24gaW50ZXJhY3RhYmxlR2V0IChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzW3RoaXMuaW5kZXhPZkVsZW1lbnQoZWxlbWVudCwgb3B0aW9ucyAmJiBvcHRpb25zLmNvbnRleHQpXTtcbiAgICB9O1xuXG4gICAgaW50ZXJhY3RhYmxlcy5mb3JFYWNoU2VsZWN0b3IgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW50ZXJhY3RhYmxlID0gdGhpc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFpbnRlcmFjdGFibGUuc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJldCA9IGNhbGxiYWNrKGludGVyYWN0YWJsZSwgaW50ZXJhY3RhYmxlLnNlbGVjdG9yLCBpbnRlcmFjdGFibGUuX2NvbnRleHQsIGksIHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdFxuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgKiBUaGUgbWV0aG9kcyBvZiB0aGlzIHZhcmlhYmxlIGNhbiBiZSB1c2VkIHRvIHNldCBlbGVtZW50cyBhc1xuICAgICAqIGludGVyYWN0YWJsZXMgYW5kIGFsc28gdG8gY2hhbmdlIHZhcmlvdXMgZGVmYXVsdCBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIENhbGxpbmcgaXQgYXMgYSBmdW5jdGlvbiBhbmQgcGFzc2luZyBhbiBlbGVtZW50IG9yIGEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAgICogc3RyaW5nIHJldHVybnMgYW4gSW50ZXJhY3RhYmxlIG9iamVjdCB3aGljaCBoYXMgdmFyaW91cyBtZXRob2RzIHRvXG4gICAgICogY29uZmlndXJlIGl0LlxuICAgICAqXG4gICAgIC0gZWxlbWVudCAoRWxlbWVudCB8IHN0cmluZykgVGhlIEhUTUwgb3IgU1ZHIEVsZW1lbnQgdG8gaW50ZXJhY3Qgd2l0aCBvciBDU1Mgc2VsZWN0b3JcbiAgICAgPSAob2JqZWN0KSBBbiBASW50ZXJhY3RhYmxlXG4gICAgICpcbiAgICAgPiBVc2FnZVxuICAgICB8IGludGVyYWN0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcmFnZ2FibGUnKSkuZHJhZ2dhYmxlKHRydWUpO1xuICAgICB8XG4gICAgIHwgdmFyIHJlY3RhYmxlcyA9IGludGVyYWN0KCdyZWN0Jyk7XG4gICAgIHwgcmVjdGFibGVzXG4gICAgIHwgICAgIC5nZXN0dXJhYmxlKHRydWUpXG4gICAgIHwgICAgIC5vbignZ2VzdHVyZW1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgfCAgICAgICAgIC8vIHNvbWV0aGluZyBjb29sLi4uXG4gICAgIHwgICAgIH0pXG4gICAgIHwgICAgIC5hdXRvU2Nyb2xsKHRydWUpO1xuICAgIFxcKi9cbiAgICBmdW5jdGlvbiBpbnRlcmFjdCAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gaW50ZXJhY3RhYmxlcy5nZXQoZWxlbWVudCwgb3B0aW9ucykgfHwgbmV3IEludGVyYWN0YWJsZShlbGVtZW50LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKlxcXG4gICAgICogSW50ZXJhY3RhYmxlXG4gICAgIFsgcHJvcGVydHkgXVxuICAgICAqKlxuICAgICAqIE9iamVjdCB0eXBlIHJldHVybmVkIGJ5IEBpbnRlcmFjdFxuICAgIFxcKi9cbiAgICBmdW5jdGlvbiBJbnRlcmFjdGFibGUgKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2lFdmVudHMgPSB0aGlzLl9pRXZlbnRzIHx8IHt9O1xuXG4gICAgICAgIHZhciBfd2luZG93O1xuXG4gICAgICAgIGlmICh0cnlTZWxlY3RvcihlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmNvbnRleHQ7XG5cbiAgICAgICAgICAgIF93aW5kb3cgPSBjb250ZXh0PyBnZXRXaW5kb3coY29udGV4dCkgOiB3aW5kb3c7XG5cbiAgICAgICAgICAgIGlmIChjb250ZXh0ICYmIChfd2luZG93Lk5vZGVcbiAgICAgICAgICAgICAgICAgICAgPyBjb250ZXh0IGluc3RhbmNlb2YgX3dpbmRvdy5Ob2RlXG4gICAgICAgICAgICAgICAgICAgIDogKGlzRWxlbWVudChjb250ZXh0KSB8fCBjb250ZXh0ID09PSBfd2luZG93LmRvY3VtZW50KSkpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3dpbmRvdyA9IGdldFdpbmRvdyhlbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKGlzRWxlbWVudChlbGVtZW50LCBfd2luZG93KSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRzUG9pbnRlckV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQodGhpcy5fZWxlbWVudCwgcEV2ZW50VHlwZXMuZG93biwgbGlzdGVuZXJzLnBvaW50ZXJEb3duICk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQodGhpcy5fZWxlbWVudCwgcEV2ZW50VHlwZXMubW92ZSwgbGlzdGVuZXJzLnBvaW50ZXJIb3Zlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBldmVudHMuYWRkKHRoaXMuX2VsZW1lbnQsICdtb3VzZWRvd24nICwgbGlzdGVuZXJzLnBvaW50ZXJEb3duICk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQodGhpcy5fZWxlbWVudCwgJ21vdXNlbW92ZScgLCBsaXN0ZW5lcnMucG9pbnRlckhvdmVyKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmFkZCh0aGlzLl9lbGVtZW50LCAndG91Y2hzdGFydCcsIGxpc3RlbmVycy5wb2ludGVyRG93biApO1xuICAgICAgICAgICAgICAgICAgICBldmVudHMuYWRkKHRoaXMuX2VsZW1lbnQsICd0b3VjaG1vdmUnICwgbGlzdGVuZXJzLnBvaW50ZXJIb3Zlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZG9jID0gX3dpbmRvdy5kb2N1bWVudDtcblxuICAgICAgICBpZiAoIWNvbnRhaW5zKGRvY3VtZW50cywgdGhpcy5fZG9jKSkge1xuICAgICAgICAgICAgbGlzdGVuVG9Eb2N1bWVudCh0aGlzLl9kb2MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW50ZXJhY3RhYmxlcy5wdXNoKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2V0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIEludGVyYWN0YWJsZS5wcm90b3R5cGUgPSB7XG4gICAgICAgIHNldE9uRXZlbnRzOiBmdW5jdGlvbiAoYWN0aW9uLCBwaGFzZXMpIHtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdkcm9wJykge1xuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBoYXNlcy5vbmRyb3ApICAgICAgICAgICkgeyB0aGlzLm9uZHJvcCAgICAgICAgICAgPSBwaGFzZXMub25kcm9wICAgICAgICAgIDsgfVxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBoYXNlcy5vbmRyb3BhY3RpdmF0ZSkgICkgeyB0aGlzLm9uZHJvcGFjdGl2YXRlICAgPSBwaGFzZXMub25kcm9wYWN0aXZhdGUgIDsgfVxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBoYXNlcy5vbmRyb3BkZWFjdGl2YXRlKSkgeyB0aGlzLm9uZHJvcGRlYWN0aXZhdGUgPSBwaGFzZXMub25kcm9wZGVhY3RpdmF0ZTsgfVxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBoYXNlcy5vbmRyYWdlbnRlcikgICAgICkgeyB0aGlzLm9uZHJhZ2VudGVyICAgICAgPSBwaGFzZXMub25kcmFnZW50ZXIgICAgIDsgfVxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBoYXNlcy5vbmRyYWdsZWF2ZSkgICAgICkgeyB0aGlzLm9uZHJhZ2xlYXZlICAgICAgPSBwaGFzZXMub25kcmFnbGVhdmUgICAgIDsgfVxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBoYXNlcy5vbmRyb3Btb3ZlKSAgICAgICkgeyB0aGlzLm9uZHJvcG1vdmUgICAgICAgPSBwaGFzZXMub25kcm9wbW92ZSAgICAgIDsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uID0gJ29uJyArIGFjdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBoYXNlcy5vbnN0YXJ0KSAgICAgICApIHsgdGhpc1thY3Rpb24gKyAnc3RhcnQnICAgICAgICAgXSA9IHBoYXNlcy5vbnN0YXJ0ICAgICAgICAgOyB9XG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGhhc2VzLm9ubW92ZSkgICAgICAgICkgeyB0aGlzW2FjdGlvbiArICdtb3ZlJyAgICAgICAgICBdID0gcGhhc2VzLm9ubW92ZSAgICAgICAgICA7IH1cbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwaGFzZXMub25lbmQpICAgICAgICAgKSB7IHRoaXNbYWN0aW9uICsgJ2VuZCcgICAgICAgICAgIF0gPSBwaGFzZXMub25lbmQgICAgICAgICAgIDsgfVxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBoYXNlcy5vbmluZXJ0aWFzdGFydCkpIHsgdGhpc1thY3Rpb24gKyAnaW5lcnRpYXN0YXJ0JyAgXSA9IHBoYXNlcy5vbmluZXJ0aWFzdGFydCAgOyB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmRyYWdnYWJsZVxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciBkcmFnIGFjdGlvbnMgY2FuIGJlIHBlcmZvcm1lZCBvbiB0aGVcbiAgICAgICAgICogSW50ZXJhY3RhYmxlXG4gICAgICAgICAqXG4gICAgICAgICA9IChib29sZWFuKSBJbmRpY2F0ZXMgaWYgdGhpcyBjYW4gYmUgdGhlIHRhcmdldCBvZiBkcmFnIGV2ZW50c1xuICAgICAgICAgfCB2YXIgaXNEcmFnZ2FibGUgPSBpbnRlcmFjdCgndWwgbGknKS5kcmFnZ2FibGUoKTtcbiAgICAgICAgICogb3JcbiAgICAgICAgIC0gb3B0aW9ucyAoYm9vbGVhbiB8IG9iamVjdCkgI29wdGlvbmFsIHRydWUvZmFsc2Ugb3IgQW4gb2JqZWN0IHdpdGggZXZlbnQgbGlzdGVuZXJzIHRvIGJlIGZpcmVkIG9uIGRyYWcgZXZlbnRzIChvYmplY3QgbWFrZXMgdGhlIEludGVyYWN0YWJsZSBkcmFnZ2FibGUpXG4gICAgICAgICA9IChvYmplY3QpIFRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICB8IGludGVyYWN0KGVsZW1lbnQpLmRyYWdnYWJsZSh7XG4gICAgICAgICB8ICAgICBvbnN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICAgICAgICAgfCAgICAgb25tb3ZlIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAgICAgICAgIHwgICAgIG9uZW5kICA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICAvLyB0aGUgYXhpcyBpbiB3aGljaCB0aGUgZmlyc3QgbW92ZW1lbnQgbXVzdCBiZVxuICAgICAgICAgfCAgICAgLy8gZm9yIHRoZSBkcmFnIHNlcXVlbmNlIHRvIHN0YXJ0XG4gICAgICAgICB8ICAgICAvLyAneHknIGJ5IGRlZmF1bHQgLSBhbnkgZGlyZWN0aW9uXG4gICAgICAgICB8ICAgICBheGlzOiAneCcgfHwgJ3knIHx8ICd4eScsXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICAvLyBtYXggbnVtYmVyIG9mIGRyYWdzIHRoYXQgY2FuIGhhcHBlbiBjb25jdXJyZW50bHlcbiAgICAgICAgIHwgICAgIC8vIHdpdGggZWxlbWVudHMgb2YgdGhpcyBJbnRlcmFjdGFibGUuIEluZmluaXR5IGJ5IGRlZmF1bHRcbiAgICAgICAgIHwgICAgIG1heDogSW5maW5pdHksXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICAvLyBtYXggbnVtYmVyIG9mIGRyYWdzIHRoYXQgY2FuIHRhcmdldCB0aGUgc2FtZSBlbGVtZW50K0ludGVyYWN0YWJsZVxuICAgICAgICAgfCAgICAgLy8gMSBieSBkZWZhdWx0XG4gICAgICAgICB8ICAgICBtYXhQZXJFbGVtZW50OiAyXG4gICAgICAgICB8IH0pO1xuICAgICAgICBcXCovXG4gICAgICAgIGRyYWdnYWJsZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kcmFnLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZTogdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBlckFjdGlvbignZHJhZycsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T25FdmVudHMoJ2RyYWcnLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIGlmICgvXngkfF55JHxeeHkkLy50ZXN0KG9wdGlvbnMuYXhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyYWcuYXhpcyA9IG9wdGlvbnMuYXhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5heGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMuZHJhZy5heGlzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNCb29sKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyYWcuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcmFnO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFBlckFjdGlvbjogZnVuY3Rpb24gKGFjdGlvbiwgb3B0aW9ucykge1xuICAgICAgICAgICAgLy8gZm9yIGFsbCB0aGUgZGVmYXVsdCBwZXItYWN0aW9uIG9wdGlvbnNcbiAgICAgICAgICAgIGZvciAodmFyIG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBvcHRpb24gZXhpc3RzIGZvciB0aGlzIGFjdGlvblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24gaW4gZGVmYXVsdE9wdGlvbnNbYWN0aW9uXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgb3B0aW9uIGluIHRoZSBvcHRpb25zIGFyZyBpcyBhbiBvYmplY3QgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnNbb3B0aW9uXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGR1cGxpY2F0ZSB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dID0gZXh0ZW5kKHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0gfHwge30sIG9wdGlvbnNbb3B0aW9uXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc09iamVjdChkZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb25bb3B0aW9uXSkgJiYgJ2VuYWJsZWQnIGluIGRlZmF1bHRPcHRpb25zLnBlckFjdGlvbltvcHRpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXS5lbmFibGVkID0gb3B0aW9uc1tvcHRpb25dLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNCb29sKG9wdGlvbnNbb3B0aW9uXSkgJiYgaXNPYmplY3QoZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uW29wdGlvbl0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dLmVuYWJsZWQgPSBvcHRpb25zW29wdGlvbl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9uc1tvcHRpb25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIGlmIGl0J3Mgbm90IHVuZGVmaW5lZCwgZG8gYSBwbGFpbiBhc3NpZ25tZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmRyb3B6b25lXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIGVsZW1lbnRzIGNhbiBiZSBkcm9wcGVkIG9udG8gdGhpc1xuICAgICAgICAgKiBJbnRlcmFjdGFibGUgdG8gdHJpZ2dlciBkcm9wIGV2ZW50c1xuICAgICAgICAgKlxuICAgICAgICAgKiBEcm9wem9uZXMgY2FuIHJlY2VpdmUgdGhlIGZvbGxvd2luZyBldmVudHM6XG4gICAgICAgICAqICAtIGBkcm9wYWN0aXZhdGVgIGFuZCBgZHJvcGRlYWN0aXZhdGVgIHdoZW4gYW4gYWNjZXB0YWJsZSBkcmFnIHN0YXJ0cyBhbmQgZW5kc1xuICAgICAgICAgKiAgLSBgZHJhZ2VudGVyYCBhbmQgYGRyYWdsZWF2ZWAgd2hlbiBhIGRyYWdnYWJsZSBlbnRlcnMgYW5kIGxlYXZlcyB0aGUgZHJvcHpvbmVcbiAgICAgICAgICogIC0gYGRyYWdtb3ZlYCB3aGVuIGEgZHJhZ2dhYmxlIHRoYXQgaGFzIGVudGVyZWQgdGhlIGRyb3B6b25lIGlzIG1vdmVkXG4gICAgICAgICAqICAtIGBkcm9wYCB3aGVuIGEgZHJhZ2dhYmxlIGlzIGRyb3BwZWQgaW50byB0aGlzIGRyb3B6b25lXG4gICAgICAgICAqXG4gICAgICAgICAqICBVc2UgdGhlIGBhY2NlcHRgIG9wdGlvbiB0byBhbGxvdyBvbmx5IGVsZW1lbnRzIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIENTUyBzZWxlY3RvciBvciBlbGVtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiAgVXNlIHRoZSBgb3ZlcmxhcGAgb3B0aW9uIHRvIHNldCBob3cgZHJvcHMgYXJlIGNoZWNrZWQgZm9yLiBUaGUgYWxsb3dlZCB2YWx1ZXMgYXJlOlxuICAgICAgICAgKiAgIC0gYCdwb2ludGVyJ2AsIHRoZSBwb2ludGVyIG11c3QgYmUgb3ZlciB0aGUgZHJvcHpvbmUgKGRlZmF1bHQpXG4gICAgICAgICAqICAgLSBgJ2NlbnRlcidgLCB0aGUgZHJhZ2dhYmxlIGVsZW1lbnQncyBjZW50ZXIgbXVzdCBiZSBvdmVyIHRoZSBkcm9wem9uZVxuICAgICAgICAgKiAgIC0gYSBudW1iZXIgZnJvbSAwLTEgd2hpY2ggaXMgdGhlIGAoaW50ZXJzZWN0aW9uIGFyZWEpIC8gKGRyYWdnYWJsZSBhcmVhKWAuXG4gICAgICAgICAqICAgICAgIGUuZy4gYDAuNWAgZm9yIGRyb3AgdG8gaGFwcGVuIHdoZW4gaGFsZiBvZiB0aGUgYXJlYSBvZiB0aGVcbiAgICAgICAgICogICAgICAgZHJhZ2dhYmxlIGlzIG92ZXIgdGhlIGRyb3B6b25lXG4gICAgICAgICAqXG4gICAgICAgICAtIG9wdGlvbnMgKGJvb2xlYW4gfCBvYmplY3QgfCBudWxsKSAjb3B0aW9uYWwgVGhlIG5ldyB2YWx1ZSB0byBiZSBzZXQuXG4gICAgICAgICB8IGludGVyYWN0KCcuZHJvcCcpLmRyb3B6b25lKHtcbiAgICAgICAgIHwgICBhY2NlcHQ6ICcuY2FuLWRyb3AnIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaW5nbGUtZHJvcCcpLFxuICAgICAgICAgfCAgIG92ZXJsYXA6ICdwb2ludGVyJyB8fCAnY2VudGVyJyB8fCB6ZXJvVG9PbmVcbiAgICAgICAgIHwgfVxuICAgICAgICAgPSAoYm9vbGVhbiB8IG9iamVjdCkgVGhlIGN1cnJlbnQgc2V0dGluZyBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIGRyb3B6b25lOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyb3AuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2U/IGZhbHNlOiB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T25FdmVudHMoJ2Ryb3AnLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIGlmICgvXihwb2ludGVyfGNlbnRlcikkLy50ZXN0KG9wdGlvbnMub3ZlcmxhcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyb3Aub3ZlcmxhcCA9IG9wdGlvbnMub3ZlcmxhcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNOdW1iZXIob3B0aW9ucy5vdmVybGFwKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZHJvcC5vdmVybGFwID0gTWF0aC5tYXgoTWF0aC5taW4oMSwgb3B0aW9ucy5vdmVybGFwKSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgnYWNjZXB0JyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZHJvcC5hY2NlcHQgPSBvcHRpb25zLmFjY2VwdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCdjaGVja2VyJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyID0gb3B0aW9ucy5jaGVja2VyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNCb29sKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyb3AuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcm9wO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRyb3BDaGVjazogZnVuY3Rpb24gKGRyYWdFdmVudCwgZXZlbnQsIGRyYWdnYWJsZSwgZHJhZ2dhYmxlRWxlbWVudCwgZHJvcEVsZW1lbnQsIHJlY3QpIHtcbiAgICAgICAgICAgIHZhciBkcm9wcGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBkcm9wem9uZSBoYXMgbm8gcmVjdCAoZWcuIGRpc3BsYXk6IG5vbmUpXG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBjdXN0b20gZHJvcENoZWNrZXIgb3IganVzdCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGlmICghKHJlY3QgPSByZWN0IHx8IHRoaXMuZ2V0UmVjdChkcm9wRWxlbWVudCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlcihkcmFnRXZlbnQsIGV2ZW50LCBkcm9wcGVkLCB0aGlzLCBkcm9wRWxlbWVudCwgZHJhZ2dhYmxlLCBkcmFnZ2FibGVFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICA6IGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRyb3BPdmVybGFwID0gdGhpcy5vcHRpb25zLmRyb3Aub3ZlcmxhcDtcblxuICAgICAgICAgICAgaWYgKGRyb3BPdmVybGFwID09PSAncG9pbnRlcicpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFnZSA9IGdldFBhZ2VYWShkcmFnRXZlbnQpLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW4gPSBnZXRPcmlnaW5YWShkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbDtcblxuICAgICAgICAgICAgICAgIHBhZ2UueCArPSBvcmlnaW4ueDtcbiAgICAgICAgICAgICAgICBwYWdlLnkgKz0gb3JpZ2luLnk7XG5cbiAgICAgICAgICAgICAgICBob3Jpem9udGFsID0gKHBhZ2UueCA+IHJlY3QubGVmdCkgJiYgKHBhZ2UueCA8IHJlY3QucmlnaHQpO1xuICAgICAgICAgICAgICAgIHZlcnRpY2FsICAgPSAocGFnZS55ID4gcmVjdC50b3AgKSAmJiAocGFnZS55IDwgcmVjdC5ib3R0b20pO1xuXG4gICAgICAgICAgICAgICAgZHJvcHBlZCA9IGhvcml6b250YWwgJiYgdmVydGljYWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkcmFnUmVjdCA9IGRyYWdnYWJsZS5nZXRSZWN0KGRyYWdnYWJsZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAoZHJvcE92ZXJsYXAgPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN4ID0gZHJhZ1JlY3QubGVmdCArIGRyYWdSZWN0LndpZHRoICAvIDIsXG4gICAgICAgICAgICAgICAgICAgIGN5ID0gZHJhZ1JlY3QudG9wICArIGRyYWdSZWN0LmhlaWdodCAvIDI7XG5cbiAgICAgICAgICAgICAgICBkcm9wcGVkID0gY3ggPj0gcmVjdC5sZWZ0ICYmIGN4IDw9IHJlY3QucmlnaHQgJiYgY3kgPj0gcmVjdC50b3AgJiYgY3kgPD0gcmVjdC5ib3R0b207XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc051bWJlcihkcm9wT3ZlcmxhcCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3ZlcmxhcEFyZWEgID0gKE1hdGgubWF4KDAsIE1hdGgubWluKHJlY3QucmlnaHQgLCBkcmFnUmVjdC5yaWdodCApIC0gTWF0aC5tYXgocmVjdC5sZWZ0LCBkcmFnUmVjdC5sZWZ0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIE1hdGgubWF4KDAsIE1hdGgubWluKHJlY3QuYm90dG9tLCBkcmFnUmVjdC5ib3R0b20pIC0gTWF0aC5tYXgocmVjdC50b3AgLCBkcmFnUmVjdC50b3AgKSkpLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGFwUmF0aW8gPSBvdmVybGFwQXJlYSAvIChkcmFnUmVjdC53aWR0aCAqIGRyYWdSZWN0LmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICBkcm9wcGVkID0gb3ZlcmxhcFJhdGlvID49IGRyb3BPdmVybGFwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlcikge1xuICAgICAgICAgICAgICAgIGRyb3BwZWQgPSB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyKGRyYWdFdmVudCwgZXZlbnQsIGRyb3BwZWQsIHRoaXMsIGRyb3BFbGVtZW50LCBkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZHJvcHBlZDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5kcm9wQ2hlY2tlclxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBERVBSRUNBVEVELiBVc2UgaW50ZXJhY3RhYmxlLmRyb3B6b25lKHsgY2hlY2tlcjogZnVuY3Rpb24uLi4gfSkgaW5zdGVhZC5cbiAgICAgICAgICpcbiAgICAgICAgICogR2V0cyBvciBzZXRzIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIGEgZHJhZ2dlZCBlbGVtZW50IGlzXG4gICAgICAgICAqIG92ZXIgdGhpcyBJbnRlcmFjdGFibGUuXG4gICAgICAgICAqXG4gICAgICAgICAtIGNoZWNrZXIgKGZ1bmN0aW9uKSAjb3B0aW9uYWwgVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiBjaGVja2luZyBmb3IgYSBkcm9wXG4gICAgICAgICA9IChGdW5jdGlvbiB8IEludGVyYWN0YWJsZSkgVGhlIGNoZWNrZXIgZnVuY3Rpb24gb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIGNoZWNrZXIgZnVuY3Rpb24gdGFrZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gICAgICAgICAqXG4gICAgICAgICAtIGRyYWdFdmVudCAoSW50ZXJhY3RFdmVudCkgVGhlIHJlbGF0ZWQgZHJhZ21vdmUgb3IgZHJhZ2VuZCBldmVudFxuICAgICAgICAgLSBldmVudCAoVG91Y2hFdmVudCB8IFBvaW50ZXJFdmVudCB8IE1vdXNlRXZlbnQpIFRoZSB1c2VyIG1vdmUvdXAvZW5kIEV2ZW50IHJlbGF0ZWQgdG8gdGhlIGRyYWdFdmVudFxuICAgICAgICAgLSBkcm9wcGVkIChib29sZWFuKSBUaGUgdmFsdWUgZnJvbSB0aGUgZGVmYXVsdCBkcm9wIGNoZWNrZXJcbiAgICAgICAgIC0gZHJvcHpvbmUgKEludGVyYWN0YWJsZSkgVGhlIGRyb3B6b25lIGludGVyYWN0YWJsZVxuICAgICAgICAgLSBkcm9wRWxlbWVudCAoRWxlbWVudCkgVGhlIGRyb3B6b25lIGVsZW1lbnRcbiAgICAgICAgIC0gZHJhZ2dhYmxlIChJbnRlcmFjdGFibGUpIFRoZSBJbnRlcmFjdGFibGUgYmVpbmcgZHJhZ2dlZFxuICAgICAgICAgLSBkcmFnZ2FibGVFbGVtZW50IChFbGVtZW50KSBUaGUgYWN0dWFsIGVsZW1lbnQgdGhhdCdzIGJlaW5nIGRyYWdnZWRcbiAgICAgICAgICpcbiAgICAgICAgID4gVXNhZ2U6XG4gICAgICAgICB8IGludGVyYWN0KHRhcmdldClcbiAgICAgICAgIHwgLmRyb3BDaGVja2VyKGZ1bmN0aW9uKGRyYWdFdmVudCwgICAgICAgICAvLyByZWxhdGVkIGRyYWdtb3ZlIG9yIGRyYWdlbmQgZXZlbnRcbiAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LCAgICAgICAgICAgICAvLyBUb3VjaEV2ZW50L1BvaW50ZXJFdmVudC9Nb3VzZUV2ZW50XG4gICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICBkcm9wcGVkLCAgICAgICAgICAgLy8gYm9vbCByZXN1bHQgb2YgdGhlIGRlZmF1bHQgY2hlY2tlclxuICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmUsICAgICAgICAgIC8vIGRyb3B6b25lIEludGVyYWN0YWJsZVxuICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgZHJvcEVsZW1lbnQsICAgICAgIC8vIGRyb3B6b25lIGVsZW1udFxuICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlLCAgICAgICAgIC8vIGRyYWdnYWJsZSBJbnRlcmFjdGFibGVcbiAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZUVsZW1lbnQpIHsvLyBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAgICAgfFxuICAgICAgICAgfCAgIHJldHVybiBkcm9wcGVkICYmIGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2FsbG93LWRyb3AnKTtcbiAgICAgICAgIHwgfVxuICAgICAgICBcXCovXG4gICAgICAgIGRyb3BDaGVja2VyOiBmdW5jdGlvbiAoY2hlY2tlcikge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oY2hlY2tlcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyID0gY2hlY2tlcjtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoZWNrZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5vcHRpb25zLmdldFJlY3Q7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuYWNjZXB0XG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIERlcHJlY2F0ZWQuIGFkZCBhbiBgYWNjZXB0YCBwcm9wZXJ0eSB0byB0aGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvXG4gICAgICAgICAqIEBJbnRlcmFjdGFibGUuZHJvcHpvbmUgaW5zdGVhZC5cbiAgICAgICAgICpcbiAgICAgICAgICogR2V0cyBvciBzZXRzIHRoZSBFbGVtZW50IG9yIENTUyBzZWxlY3RvciBtYXRjaCB0aGF0IHRoaXNcbiAgICAgICAgICogSW50ZXJhY3RhYmxlIGFjY2VwdHMgaWYgaXQgaXMgYSBkcm9wem9uZS5cbiAgICAgICAgICpcbiAgICAgICAgIC0gbmV3VmFsdWUgKEVsZW1lbnQgfCBzdHJpbmcgfCBudWxsKSAjb3B0aW9uYWxcbiAgICAgICAgICogSWYgaXQgaXMgYW4gRWxlbWVudCwgdGhlbiBvbmx5IHRoYXQgZWxlbWVudCBjYW4gYmUgZHJvcHBlZCBpbnRvIHRoaXMgZHJvcHpvbmUuXG4gICAgICAgICAqIElmIGl0IGlzIGEgc3RyaW5nLCB0aGUgZWxlbWVudCBiZWluZyBkcmFnZ2VkIG11c3QgbWF0Y2ggaXQgYXMgYSBzZWxlY3Rvci5cbiAgICAgICAgICogSWYgaXQgaXMgbnVsbCwgdGhlIGFjY2VwdCBvcHRpb25zIGlzIGNsZWFyZWQgLSBpdCBhY2NlcHRzIGFueSBlbGVtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgPSAoc3RyaW5nIHwgRWxlbWVudCB8IG51bGwgfCBJbnRlcmFjdGFibGUpIFRoZSBjdXJyZW50IGFjY2VwdCBvcHRpb24gaWYgZ2l2ZW4gYHVuZGVmaW5lZGAgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgXFwqL1xuICAgICAgICBhY2NlcHQ6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGlzRWxlbWVudChuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZHJvcC5hY2NlcHQgPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0ZXN0IGlmIGl0IGlzIGEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAgICAgICAgICBpZiAodHJ5U2VsZWN0b3IobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyb3AuYWNjZXB0ID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5kcm9wLmFjY2VwdDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRyb3AuYWNjZXB0O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLnJlc2l6YWJsZVxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciByZXNpemUgYWN0aW9ucyBjYW4gYmUgcGVyZm9ybWVkIG9uIHRoZVxuICAgICAgICAgKiBJbnRlcmFjdGFibGVcbiAgICAgICAgICpcbiAgICAgICAgID0gKGJvb2xlYW4pIEluZGljYXRlcyBpZiB0aGlzIGNhbiBiZSB0aGUgdGFyZ2V0IG9mIHJlc2l6ZSBlbGVtZW50c1xuICAgICAgICAgfCB2YXIgaXNSZXNpemVhYmxlID0gaW50ZXJhY3QoJ2lucHV0W3R5cGU9dGV4dF0nKS5yZXNpemFibGUoKTtcbiAgICAgICAgICogb3JcbiAgICAgICAgIC0gb3B0aW9ucyAoYm9vbGVhbiB8IG9iamVjdCkgI29wdGlvbmFsIHRydWUvZmFsc2Ugb3IgQW4gb2JqZWN0IHdpdGggZXZlbnQgbGlzdGVuZXJzIHRvIGJlIGZpcmVkIG9uIHJlc2l6ZSBldmVudHMgKG9iamVjdCBtYWtlcyB0aGUgSW50ZXJhY3RhYmxlIHJlc2l6YWJsZSlcbiAgICAgICAgID0gKG9iamVjdCkgVGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgIHwgaW50ZXJhY3QoZWxlbWVudCkucmVzaXphYmxlKHtcbiAgICAgICAgIHwgICAgIG9uc3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge30sXG4gICAgICAgICB8ICAgICBvbm1vdmUgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICAgICAgICAgfCAgICAgb25lbmQgIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIGVkZ2VzOiB7XG4gICAgICAgICB8ICAgICAgIHRvcCAgIDogdHJ1ZSwgICAgICAgLy8gVXNlIHBvaW50ZXIgY29vcmRzIHRvIGNoZWNrIGZvciByZXNpemUuXG4gICAgICAgICB8ICAgICAgIGxlZnQgIDogZmFsc2UsICAgICAgLy8gRGlzYWJsZSByZXNpemluZyBmcm9tIGxlZnQgZWRnZS5cbiAgICAgICAgIHwgICAgICAgYm90dG9tOiAnLnJlc2l6ZS1zJywvLyBSZXNpemUgaWYgcG9pbnRlciB0YXJnZXQgbWF0Y2hlcyBzZWxlY3RvclxuICAgICAgICAgfCAgICAgICByaWdodCA6IGhhbmRsZUVsICAgIC8vIFJlc2l6ZSBpZiBwb2ludGVyIHRhcmdldCBpcyB0aGUgZ2l2ZW4gRWxlbWVudFxuICAgICAgICAgfCAgICAgfSxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIFdpZHRoIGFuZCBoZWlnaHQgY2FuIGJlIGFkanVzdGVkIGluZGVwZW5kZW50bHkuIFdoZW4gYHRydWVgLCB3aWR0aCBhbmRcbiAgICAgICAgIHwgICAgIC8vIGhlaWdodCBhcmUgYWRqdXN0ZWQgYXQgYSAxOjEgcmF0aW8uXG4gICAgICAgICB8ICAgICBzcXVhcmU6IGZhbHNlLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gV2lkdGggYW5kIGhlaWdodCBjYW4gYmUgYWRqdXN0ZWQgaW5kZXBlbmRlbnRseS4gV2hlbiBgdHJ1ZWAsIHdpZHRoIGFuZFxuICAgICAgICAgfCAgICAgLy8gaGVpZ2h0IG1haW50YWluIHRoZSBhc3BlY3QgcmF0aW8gdGhleSBoYWQgd2hlbiByZXNpemluZyBzdGFydGVkLlxuICAgICAgICAgfCAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICAvLyBhIHZhbHVlIG9mICdub25lJyB3aWxsIGxpbWl0IHRoZSByZXNpemUgcmVjdCB0byBhIG1pbmltdW0gb2YgMHgwXG4gICAgICAgICB8ICAgICAvLyAnbmVnYXRlJyB3aWxsIGFsbG93IHRoZSByZWN0IHRvIGhhdmUgbmVnYXRpdmUgd2lkdGgvaGVpZ2h0XG4gICAgICAgICB8ICAgICAvLyAncmVwb3NpdGlvbicgd2lsbCBrZWVwIHRoZSB3aWR0aC9oZWlnaHQgcG9zaXRpdmUgYnkgc3dhcHBpbmdcbiAgICAgICAgIHwgICAgIC8vIHRoZSB0b3AgYW5kIGJvdHRvbSBlZGdlcyBhbmQvb3Igc3dhcHBpbmcgdGhlIGxlZnQgYW5kIHJpZ2h0IGVkZ2VzXG4gICAgICAgICB8ICAgICBpbnZlcnQ6ICdub25lJyB8fCAnbmVnYXRlJyB8fCAncmVwb3NpdGlvbidcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIGxpbWl0IG11bHRpcGxlIHJlc2l6ZXMuXG4gICAgICAgICB8ICAgICAvLyBTZWUgdGhlIGV4cGxhbmF0aW9uIGluIHRoZSBASW50ZXJhY3RhYmxlLmRyYWdnYWJsZSBleGFtcGxlXG4gICAgICAgICB8ICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgICAgfCAgICAgbWF4UGVyRWxlbWVudDogMSxcbiAgICAgICAgIHwgfSk7XG4gICAgICAgIFxcKi9cbiAgICAgICAgcmVzaXphYmxlOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZT8gZmFsc2U6IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQZXJBY3Rpb24oJ3Jlc2l6ZScsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T25FdmVudHMoJ3Jlc2l6ZScsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKC9eeCR8XnkkfF54eSQvLnRlc3Qob3B0aW9ucy5heGlzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucmVzaXplLmF4aXMgPSBvcHRpb25zLmF4aXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuYXhpcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucmVzaXplLmF4aXMgPSBkZWZhdWx0T3B0aW9ucy5yZXNpemUuYXhpcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNCb29sKG9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpbykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvID0gb3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0Jvb2wob3B0aW9ucy5zcXVhcmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUuc3F1YXJlID0gb3B0aW9ucy5zcXVhcmU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNCb29sKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5lbmFibGVkID0gb3B0aW9ucztcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXNpemU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuc3F1YXJlUmVzaXplXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIERlcHJlY2F0ZWQuIEFkZCBhIGBzcXVhcmU6IHRydWUgfHwgZmFsc2VgIHByb3BlcnR5IHRvIEBJbnRlcmFjdGFibGUucmVzaXphYmxlIGluc3RlYWRcbiAgICAgICAgICpcbiAgICAgICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgcmVzaXppbmcgaXMgZm9yY2VkIDE6MSBhc3BlY3RcbiAgICAgICAgICpcbiAgICAgICAgID0gKGJvb2xlYW4pIEN1cnJlbnQgc2V0dGluZ1xuICAgICAgICAgKlxuICAgICAgICAgKiBvclxuICAgICAgICAgKlxuICAgICAgICAgLSBuZXdWYWx1ZSAoYm9vbGVhbikgI29wdGlvbmFsXG4gICAgICAgICA9IChvYmplY3QpIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgIFxcKi9cbiAgICAgICAgc3F1YXJlUmVzaXplOiBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpc0Jvb2wobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5zcXVhcmUgPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5vcHRpb25zLnJlc2l6ZS5zcXVhcmU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXNpemUuc3F1YXJlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmdlc3R1cmFibGVcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgbXVsdGl0b3VjaCBnZXN0dXJlcyBjYW4gYmUgcGVyZm9ybWVkIG9uIHRoZVxuICAgICAgICAgKiBJbnRlcmFjdGFibGUncyBlbGVtZW50XG4gICAgICAgICAqXG4gICAgICAgICA9IChib29sZWFuKSBJbmRpY2F0ZXMgaWYgdGhpcyBjYW4gYmUgdGhlIHRhcmdldCBvZiBnZXN0dXJlIGV2ZW50c1xuICAgICAgICAgfCB2YXIgaXNHZXN0dXJlYWJsZSA9IGludGVyYWN0KGVsZW1lbnQpLmdlc3R1cmFibGUoKTtcbiAgICAgICAgICogb3JcbiAgICAgICAgIC0gb3B0aW9ucyAoYm9vbGVhbiB8IG9iamVjdCkgI29wdGlvbmFsIHRydWUvZmFsc2Ugb3IgQW4gb2JqZWN0IHdpdGggZXZlbnQgbGlzdGVuZXJzIHRvIGJlIGZpcmVkIG9uIGdlc3R1cmUgZXZlbnRzIChtYWtlcyB0aGUgSW50ZXJhY3RhYmxlIGdlc3R1cmFibGUpXG4gICAgICAgICA9IChvYmplY3QpIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICB8IGludGVyYWN0KGVsZW1lbnQpLmdlc3R1cmFibGUoe1xuICAgICAgICAgfCAgICAgb25zdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAgICAgICAgIHwgICAgIG9ubW92ZSA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gICAgICAgICB8ICAgICBvbmVuZCAgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gbGltaXQgbXVsdGlwbGUgZ2VzdHVyZXMuXG4gICAgICAgICB8ICAgICAvLyBTZWUgdGhlIGV4cGxhbmF0aW9uIGluIEBJbnRlcmFjdGFibGUuZHJhZ2dhYmxlIGV4YW1wbGVcbiAgICAgICAgIHwgICAgIG1heDogSW5maW5pdHksXG4gICAgICAgICB8ICAgICBtYXhQZXJFbGVtZW50OiAxLFxuICAgICAgICAgfCB9KTtcbiAgICAgICAgXFwqL1xuICAgICAgICBnZXN0dXJhYmxlOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2U/IGZhbHNlOiB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVyQWN0aW9uKCdnZXN0dXJlJywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRPbkV2ZW50cygnZ2VzdHVyZScsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0Jvb2wob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkID0gb3B0aW9ucztcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdlc3R1cmU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuYXV0b1Njcm9sbFxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKipcbiAgICAgICAgICogRGVwcmVjYXRlZC4gQWRkIGFuIGBhdXRvc2Nyb2xsYCBwcm9wZXJ0eSB0byB0aGUgb3B0aW9ucyBvYmplY3RcbiAgICAgICAgICogcGFzc2VkIHRvIEBJbnRlcmFjdGFibGUuZHJhZ2dhYmxlIG9yIEBJbnRlcmFjdGFibGUucmVzaXphYmxlIGluc3RlYWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIGRyYWdnaW5nIGFuZCByZXNpemluZyBuZWFyIHRoZSBlZGdlcyBvZiB0aGVcbiAgICAgICAgICogd2luZG93L2NvbnRhaW5lciB0cmlnZ2VyIGF1dG9TY3JvbGwgZm9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICAqXG4gICAgICAgICA9IChvYmplY3QpIE9iamVjdCB3aXRoIGF1dG9TY3JvbGwgcHJvcGVydGllc1xuICAgICAgICAgKlxuICAgICAgICAgKiBvclxuICAgICAgICAgKlxuICAgICAgICAgLSBvcHRpb25zIChvYmplY3QgfCBib29sZWFuKSAjb3B0aW9uYWxcbiAgICAgICAgICogb3B0aW9ucyBjYW4gYmU6XG4gICAgICAgICAqIC0gYW4gb2JqZWN0IHdpdGggbWFyZ2luLCBkaXN0YW5jZSBhbmQgaW50ZXJ2YWwgcHJvcGVydGllcyxcbiAgICAgICAgICogLSB0cnVlIG9yIGZhbHNlIHRvIGVuYWJsZSBvciBkaXNhYmxlIGF1dG9TY3JvbGwgb3JcbiAgICAgICAgID0gKEludGVyYWN0YWJsZSkgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgXFwqL1xuICAgICAgICBhdXRvU2Nyb2xsOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IGV4dGVuZCh7IGFjdGlvbnM6IFsnZHJhZycsICdyZXNpemUnXX0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNCb29sKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHsgYWN0aW9uczogWydkcmFnJywgJ3Jlc2l6ZSddLCBlbmFibGVkOiBvcHRpb25zIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldE9wdGlvbnMoJ2F1dG9TY3JvbGwnLCBvcHRpb25zKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5zbmFwXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqKlxuICAgICAgICAgKiBEZXByZWNhdGVkLiBBZGQgYSBgc25hcGAgcHJvcGVydHkgdG8gdGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZFxuICAgICAgICAgKiB0byBASW50ZXJhY3RhYmxlLmRyYWdnYWJsZSBvciBASW50ZXJhY3RhYmxlLnJlc2l6YWJsZSBpbnN0ZWFkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIG9yIHNldHMgaWYgYW5kIGhvdyBhY3Rpb24gY29vcmRpbmF0ZXMgYXJlIHNuYXBwZWQuIEJ5XG4gICAgICAgICAqIGRlZmF1bHQsIHNuYXBwaW5nIGlzIHJlbGF0aXZlIHRvIHRoZSBwb2ludGVyIGNvb3JkaW5hdGVzLiBZb3UgY2FuXG4gICAgICAgICAqIGNoYW5nZSB0aGlzIGJ5IHNldHRpbmcgdGhlXG4gICAgICAgICAqIFtgZWxlbWVudE9yaWdpbmBdKGh0dHBzOi8vZ2l0aHViLmNvbS90YXllL2ludGVyYWN0LmpzL3B1bGwvNzIpLlxuICAgICAgICAgKipcbiAgICAgICAgID0gKGJvb2xlYW4gfCBvYmplY3QpIGBmYWxzZWAgaWYgc25hcCBpcyBkaXNhYmxlZDsgb2JqZWN0IHdpdGggc25hcCBwcm9wZXJ0aWVzIGlmIHNuYXAgaXMgZW5hYmxlZFxuICAgICAgICAgKipcbiAgICAgICAgICogb3JcbiAgICAgICAgICoqXG4gICAgICAgICAtIG9wdGlvbnMgKG9iamVjdCB8IGJvb2xlYW4gfCBudWxsKSAjb3B0aW9uYWxcbiAgICAgICAgID0gKEludGVyYWN0YWJsZSkgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgID4gVXNhZ2VcbiAgICAgICAgIHwgaW50ZXJhY3QoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RoaW5nJykpLnNuYXAoe1xuICAgICAgICAgfCAgICAgdGFyZ2V0czogW1xuICAgICAgICAgfCAgICAgICAgIC8vIHNuYXAgdG8gdGhpcyBzcGVjaWZpYyBwb2ludFxuICAgICAgICAgfCAgICAgICAgIHtcbiAgICAgICAgIHwgICAgICAgICAgICAgeDogMTAwLFxuICAgICAgICAgfCAgICAgICAgICAgICB5OiAxMDAsXG4gICAgICAgICB8ICAgICAgICAgICAgIHJhbmdlOiAyNVxuICAgICAgICAgfCAgICAgICAgIH0sXG4gICAgICAgICB8ICAgICAgICAgLy8gZ2l2ZSB0aGlzIGZ1bmN0aW9uIHRoZSB4IGFuZCB5IHBhZ2UgY29vcmRzIGFuZCBzbmFwIHRvIHRoZSBvYmplY3QgcmV0dXJuZWRcbiAgICAgICAgIHwgICAgICAgICBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgfCAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgfCAgICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgIHwgICAgICAgICAgICAgICAgIHk6ICg3NSArIDUwICogTWF0aC5zaW4oeCAqIDAuMDQpKSxcbiAgICAgICAgIHwgICAgICAgICAgICAgICAgIHJhbmdlOiA0MFxuICAgICAgICAgfCAgICAgICAgICAgICB9O1xuICAgICAgICAgfCAgICAgICAgIH0sXG4gICAgICAgICB8ICAgICAgICAgLy8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCBzbmFwcyB0byBhIGdyaWRcbiAgICAgICAgIHwgICAgICAgICBpbnRlcmFjdC5jcmVhdGVTbmFwR3JpZCh7XG4gICAgICAgICB8ICAgICAgICAgICAgIHg6IDUwLFxuICAgICAgICAgfCAgICAgICAgICAgICB5OiA1MCxcbiAgICAgICAgIHwgICAgICAgICAgICAgcmFuZ2U6IDEwLCAgICAgICAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgIHwgICAgICAgICAgICAgb2Zmc2V0OiB7IHg6IDUsIHk6IDEwIH0gLy8gb3B0aW9uYWxcbiAgICAgICAgIHwgICAgICAgICB9KVxuICAgICAgICAgfCAgICAgXSxcbiAgICAgICAgIHwgICAgIC8vIGRvIG5vdCBzbmFwIGR1cmluZyBub3JtYWwgbW92ZW1lbnQuXG4gICAgICAgICB8ICAgICAvLyBJbnN0ZWFkLCB0cmlnZ2VyIG9ubHkgb25lIHNuYXBwZWQgbW92ZSBldmVudFxuICAgICAgICAgfCAgICAgLy8gaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBlbmQgZXZlbnQuXG4gICAgICAgICB8ICAgICBlbmRPbmx5OiB0cnVlLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgcmVsYXRpdmVQb2ludHM6IFtcbiAgICAgICAgIHwgICAgICAgICB7IHg6IDAsIHk6IDAgfSwgIC8vIHNuYXAgcmVsYXRpdmUgdG8gdGhlIHRvcCBsZWZ0IG9mIHRoZSBlbGVtZW50XG4gICAgICAgICB8ICAgICAgICAgeyB4OiAxLCB5OiAxIH0sICAvLyBhbmQgYWxzbyB0byB0aGUgYm90dG9tIHJpZ2h0XG4gICAgICAgICB8ICAgICBdLCAgXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICAvLyBvZmZzZXQgdGhlIHNuYXAgdGFyZ2V0IGNvb3JkaW5hdGVzXG4gICAgICAgICB8ICAgICAvLyBjYW4gYmUgYW4gb2JqZWN0IHdpdGggeC95IG9yICdzdGFydENvb3JkcydcbiAgICAgICAgIHwgICAgIG9mZnNldDogeyB4OiA1MCwgeTogNTAgfVxuICAgICAgICAgfCAgIH1cbiAgICAgICAgIHwgfSk7XG4gICAgICAgIFxcKi9cbiAgICAgICAgc25hcDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSB0aGlzLnNldE9wdGlvbnMoJ3NuYXAnLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgaWYgKHJldCA9PT0gdGhpcykgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0LmRyYWc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gKG9wdGlvbiwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBvcHRpb25zICYmIGlzQXJyYXkob3B0aW9ucy5hY3Rpb25zKVxuICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbnMuYWN0aW9uc1xuICAgICAgICAgICAgICAgICAgICA6IFsnZHJhZyddO1xuXG4gICAgICAgICAgICB2YXIgaTtcblxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpIHx8IGlzQm9vbChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSAvcmVzaXplLy50ZXN0KGFjdGlvbnNbaV0pPyAncmVzaXplJyA6IGFjdGlvbnNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc09iamVjdCh0aGlzLm9wdGlvbnNbYWN0aW9uXSkpIHsgY29udGludWU7IH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpc09wdGlvbiA9IHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbmQodGhpc09wdGlvbiwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzT3B0aW9uLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZTogdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9PT0gJ3NuYXAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNPcHRpb24ubW9kZSA9PT0gJ2dyaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNPcHRpb24udGFyZ2V0cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVyYWN0LmNyZWF0ZVNuYXBHcmlkKGV4dGVuZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB0aGlzT3B0aW9uLmdyaWRPZmZzZXQgfHwgeyB4OiAwLCB5OiAwIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXNPcHRpb24uZ3JpZCB8fCB7fSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXNPcHRpb24ubW9kZSA9PT0gJ2FuY2hvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc09wdGlvbi50YXJnZXRzID0gdGhpc09wdGlvbi5hbmNob3JzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzT3B0aW9uLm1vZGUgPT09ICdwYXRoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzT3B0aW9uLnRhcmdldHMgPSB0aGlzT3B0aW9uLnBhdGhzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgnZWxlbWVudE9yaWdpbicgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzT3B0aW9uLnJlbGF0aXZlUG9pbnRzID0gW29wdGlvbnMuZWxlbWVudE9yaWdpbl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQm9vbChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc09wdGlvbi5lbmFibGVkID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmV0ID0ge30sXG4gICAgICAgICAgICAgICAgYWxsQWN0aW9ucyA9IFsnZHJhZycsICdyZXNpemUnLCAnZ2VzdHVyZSddO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWxsQWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24gaW4gZGVmYXVsdE9wdGlvbnNbYWxsQWN0aW9uc1tpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0W2FsbEFjdGlvbnNbaV1dID0gdGhpcy5vcHRpb25zW2FsbEFjdGlvbnNbaV1dW29wdGlvbl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuaW5lcnRpYVxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKipcbiAgICAgICAgICogRGVwcmVjYXRlZC4gQWRkIGFuIGBpbmVydGlhYCBwcm9wZXJ0eSB0byB0aGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkXG4gICAgICAgICAqIHRvIEBJbnRlcmFjdGFibGUuZHJhZ2dhYmxlIG9yIEBJbnRlcmFjdGFibGUucmVzaXphYmxlIGluc3RlYWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgb3Igc2V0cyBpZiBhbmQgaG93IGV2ZW50cyBjb250aW51ZSB0byBydW4gYWZ0ZXIgdGhlIHBvaW50ZXIgaXMgcmVsZWFzZWRcbiAgICAgICAgICoqXG4gICAgICAgICA9IChib29sZWFuIHwgb2JqZWN0KSBgZmFsc2VgIGlmIGluZXJ0aWEgaXMgZGlzYWJsZWQ7IGBvYmplY3RgIHdpdGggaW5lcnRpYSBwcm9wZXJ0aWVzIGlmIGluZXJ0aWEgaXMgZW5hYmxlZFxuICAgICAgICAgKipcbiAgICAgICAgICogb3JcbiAgICAgICAgICoqXG4gICAgICAgICAtIG9wdGlvbnMgKG9iamVjdCB8IGJvb2xlYW4gfCBudWxsKSAjb3B0aW9uYWxcbiAgICAgICAgID0gKEludGVyYWN0YWJsZSkgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgID4gVXNhZ2VcbiAgICAgICAgIHwgLy8gZW5hYmxlIGFuZCB1c2UgZGVmYXVsdCBzZXR0aW5nc1xuICAgICAgICAgfCBpbnRlcmFjdChlbGVtZW50KS5pbmVydGlhKHRydWUpO1xuICAgICAgICAgfFxuICAgICAgICAgfCAvLyBlbmFibGUgYW5kIHVzZSBjdXN0b20gc2V0dGluZ3NcbiAgICAgICAgIHwgaW50ZXJhY3QoZWxlbWVudCkuaW5lcnRpYSh7XG4gICAgICAgICB8ICAgICAvLyB2YWx1ZSBncmVhdGVyIHRoYW4gMFxuICAgICAgICAgfCAgICAgLy8gaGlnaCB2YWx1ZXMgc2xvdyB0aGUgb2JqZWN0IGRvd24gbW9yZSBxdWlja2x5XG4gICAgICAgICB8ICAgICByZXNpc3RhbmNlICAgICA6IDE2LFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gdGhlIG1pbmltdW0gbGF1bmNoIHNwZWVkIChwaXhlbHMgcGVyIHNlY29uZCkgdGhhdCByZXN1bHRzIGluIGluZXJ0aWEgc3RhcnRcbiAgICAgICAgIHwgICAgIG1pblNwZWVkICAgICAgIDogMjAwLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gaW5lcnRpYSB3aWxsIHN0b3Agd2hlbiB0aGUgb2JqZWN0IHNsb3dzIGRvd24gdG8gdGhpcyBzcGVlZFxuICAgICAgICAgfCAgICAgZW5kU3BlZWQgICAgICAgOiAyMCxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIGJvb2xlYW47IHNob3VsZCBhY3Rpb25zIGJlIHJlc3VtZWQgd2hlbiB0aGUgcG9pbnRlciBnb2VzIGRvd24gZHVyaW5nIGluZXJ0aWFcbiAgICAgICAgIHwgICAgIGFsbG93UmVzdW1lICAgIDogdHJ1ZSxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIGJvb2xlYW47IHNob3VsZCB0aGUganVtcCB3aGVuIHJlc3VtaW5nIGZyb20gaW5lcnRpYSBiZSBpZ25vcmVkIGluIGV2ZW50LmR4L2R5XG4gICAgICAgICB8ICAgICB6ZXJvUmVzdW1lRGVsdGE6IGZhbHNlLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gaWYgc25hcC9yZXN0cmljdCBhcmUgc2V0IHRvIGJlIGVuZE9ubHkgYW5kIGluZXJ0aWEgaXMgZW5hYmxlZCwgcmVsZWFzaW5nXG4gICAgICAgICB8ICAgICAvLyB0aGUgcG9pbnRlciB3aXRob3V0IHRyaWdnZXJpbmcgaW5lcnRpYSB3aWxsIGFuaW1hdGUgZnJvbSB0aGUgcmVsZWFzZVxuICAgICAgICAgfCAgICAgLy8gcG9pbnQgdG8gdGhlIHNuYXBlZC9yZXN0cmljdGVkIHBvaW50IGluIHRoZSBnaXZlbiBhbW91bnQgb2YgdGltZSAobXMpXG4gICAgICAgICB8ICAgICBzbW9vdGhFbmREdXJhdGlvbjogMzAwLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gYW4gYXJyYXkgb2YgYWN0aW9uIHR5cGVzIHRoYXQgY2FuIGhhdmUgaW5lcnRpYSAobm8gZ2VzdHVyZSlcbiAgICAgICAgIHwgICAgIGFjdGlvbnMgICAgICAgIDogWydkcmFnJywgJ3Jlc2l6ZSddXG4gICAgICAgICB8IH0pO1xuICAgICAgICAgfFxuICAgICAgICAgfCAvLyByZXNldCBjdXN0b20gc2V0dGluZ3MgYW5kIHVzZSBhbGwgZGVmYXVsdHNcbiAgICAgICAgIHwgaW50ZXJhY3QoZWxlbWVudCkuaW5lcnRpYShudWxsKTtcbiAgICAgICAgXFwqL1xuICAgICAgICBpbmVydGlhOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHJldCA9IHRoaXMuc2V0T3B0aW9ucygnaW5lcnRpYScsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICBpZiAocmV0ID09PSB0aGlzKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXQuZHJhZztcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRBY3Rpb246IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSB0aGlzLmRlZmF1bHRBY3Rpb25DaGVja2VyKHBvaW50ZXIsIGludGVyYWN0aW9uLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyKHBvaW50ZXIsIGV2ZW50LCBhY3Rpb24sIHRoaXMsIGVsZW1lbnQsIGludGVyYWN0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0QWN0aW9uQ2hlY2tlcjogZGVmYXVsdEFjdGlvbkNoZWNrZXIsXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuYWN0aW9uQ2hlY2tlclxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCBvblxuICAgICAgICAgKiBwb2ludGVyRG93blxuICAgICAgICAgKlxuICAgICAgICAgLSBjaGVja2VyIChmdW5jdGlvbiB8IG51bGwpICNvcHRpb25hbCBBIGZ1bmN0aW9uIHdoaWNoIHRha2VzIGEgcG9pbnRlciBldmVudCwgZGVmYXVsdEFjdGlvbiBzdHJpbmcsIGludGVyYWN0YWJsZSwgZWxlbWVudCBhbmQgaW50ZXJhY3Rpb24gYXMgcGFyYW1ldGVycyBhbmQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBuYW1lIHByb3BlcnR5ICdkcmFnJyAncmVzaXplJyBvciAnZ2VzdHVyZScgYW5kIG9wdGlvbmFsbHkgYW4gYGVkZ2VzYCBvYmplY3Qgd2l0aCBib29sZWFuICd0b3AnLCAnbGVmdCcsICdib3R0b20nIGFuZCByaWdodCBwcm9wcy5cbiAgICAgICAgID0gKEZ1bmN0aW9uIHwgSW50ZXJhY3RhYmxlKSBUaGUgY2hlY2tlciBmdW5jdGlvbiBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICAgKlxuICAgICAgICAgfCBpbnRlcmFjdCgnLnJlc2l6ZS1kcmFnJylcbiAgICAgICAgIHwgICAucmVzaXphYmxlKHRydWUpXG4gICAgICAgICB8ICAgLmRyYWdnYWJsZSh0cnVlKVxuICAgICAgICAgfCAgIC5hY3Rpb25DaGVja2VyKGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uKSB7XG4gICAgICAgICB8XG4gICAgICAgICB8ICAgaWYgKGludGVyYWN0Lm1hdGNoZXNTZWxlY3RvcihldmVudC50YXJnZXQsICcuZHJhZy1oYW5kbGUnKSB7XG4gICAgICAgICB8ICAgICAvLyBmb3JjZSBkcmFnIHdpdGggaGFuZGxlIHRhcmdldFxuICAgICAgICAgfCAgICAgYWN0aW9uLm5hbWUgPSBkcmFnO1xuICAgICAgICAgfCAgIH1cbiAgICAgICAgIHwgICBlbHNlIHtcbiAgICAgICAgIHwgICAgIC8vIHJlc2l6ZSBmcm9tIHRoZSB0b3AgYW5kIHJpZ2h0IGVkZ2VzXG4gICAgICAgICB8ICAgICBhY3Rpb24ubmFtZSAgPSAncmVzaXplJztcbiAgICAgICAgIHwgICAgIGFjdGlvbi5lZGdlcyA9IHsgdG9wOiB0cnVlLCByaWdodDogdHJ1ZSB9O1xuICAgICAgICAgfCAgIH1cbiAgICAgICAgIHxcbiAgICAgICAgIHwgICByZXR1cm4gYWN0aW9uO1xuICAgICAgICAgfCB9KTtcbiAgICAgICAgXFwqL1xuICAgICAgICBhY3Rpb25DaGVja2VyOiBmdW5jdGlvbiAoY2hlY2tlcikge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oY2hlY2tlcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlciA9IGNoZWNrZXI7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoZWNrZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXI7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmdldFJlY3RcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIGRlZmF1bHQgZnVuY3Rpb24gdG8gZ2V0IGFuIEludGVyYWN0YWJsZXMgYm91bmRpbmcgcmVjdC4gQ2FuIGJlXG4gICAgICAgICAqIG92ZXJyaWRkZW4gdXNpbmcgQEludGVyYWN0YWJsZS5yZWN0Q2hlY2tlci5cbiAgICAgICAgICpcbiAgICAgICAgIC0gZWxlbWVudCAoRWxlbWVudCkgI29wdGlvbmFsIFRoZSBlbGVtZW50IHRvIG1lYXN1cmUuXG4gICAgICAgICA9IChvYmplY3QpIFRoZSBvYmplY3QncyBib3VuZGluZyByZWN0YW5nbGUuXG4gICAgICAgICBvIHtcbiAgICAgICAgIG8gICAgIHRvcCAgIDogMCxcbiAgICAgICAgIG8gICAgIGxlZnQgIDogMCxcbiAgICAgICAgIG8gICAgIGJvdHRvbTogMCxcbiAgICAgICAgIG8gICAgIHJpZ2h0IDogMCxcbiAgICAgICAgIG8gICAgIHdpZHRoIDogMCxcbiAgICAgICAgIG8gICAgIGhlaWdodDogMFxuICAgICAgICAgbyB9XG4gICAgICAgIFxcKi9cbiAgICAgICAgZ2V0UmVjdDogZnVuY3Rpb24gcmVjdENoZWNrIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLl9lbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvciAmJiAhKGlzRWxlbWVudChlbGVtZW50KSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5fY29udGV4dC5xdWVyeVNlbGVjdG9yKHRoaXMuc2VsZWN0b3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZ2V0RWxlbWVudFJlY3QoZWxlbWVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUucmVjdENoZWNrZXJcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogUmV0dXJucyBvciBzZXRzIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgaW50ZXJhY3RhYmxlJ3NcbiAgICAgICAgICogZWxlbWVudCdzIHJlY3RhbmdsZVxuICAgICAgICAgKlxuICAgICAgICAgLSBjaGVja2VyIChmdW5jdGlvbikgI29wdGlvbmFsIEEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGlzIEludGVyYWN0YWJsZSdzIGJvdW5kaW5nIHJlY3RhbmdsZS4gU2VlIEBJbnRlcmFjdGFibGUuZ2V0UmVjdFxuICAgICAgICAgPSAoZnVuY3Rpb24gfCBvYmplY3QpIFRoZSBjaGVja2VyIGZ1bmN0aW9uIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgIFxcKi9cbiAgICAgICAgcmVjdENoZWNrZXI6IGZ1bmN0aW9uIChjaGVja2VyKSB7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihjaGVja2VyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjdCA9IGNoZWNrZXI7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoZWNrZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5vcHRpb25zLmdldFJlY3Q7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVjdDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5zdHlsZUN1cnNvclxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciB0aGUgYWN0aW9uIHRoYXQgd291bGQgYmUgcGVyZm9ybWVkIHdoZW4gdGhlXG4gICAgICAgICAqIG1vdXNlIG9uIHRoZSBlbGVtZW50IGFyZSBjaGVja2VkIG9uIGBtb3VzZW1vdmVgIHNvIHRoYXQgdGhlIGN1cnNvclxuICAgICAgICAgKiBtYXkgYmUgc3R5bGVkIGFwcHJvcHJpYXRlbHlcbiAgICAgICAgICpcbiAgICAgICAgIC0gbmV3VmFsdWUgKGJvb2xlYW4pICNvcHRpb25hbFxuICAgICAgICAgPSAoYm9vbGVhbiB8IEludGVyYWN0YWJsZSkgVGhlIGN1cnJlbnQgc2V0dGluZyBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIHN0eWxlQ3Vyc29yOiBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpc0Jvb2wobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlQ3Vyc29yID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvcjtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN0eWxlQ3Vyc29yO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLnByZXZlbnREZWZhdWx0XG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIHRvIHByZXZlbnQgdGhlIGJyb3dzZXIncyBkZWZhdWx0IGJlaGF2aW91clxuICAgICAgICAgKiBpbiByZXNwb25zZSB0byBwb2ludGVyIGV2ZW50cy4gQ2FuIGJlIHNldCB0bzpcbiAgICAgICAgICogIC0gYCdhbHdheXMnYCB0byBhbHdheXMgcHJldmVudFxuICAgICAgICAgKiAgLSBgJ25ldmVyJ2AgdG8gbmV2ZXIgcHJldmVudFxuICAgICAgICAgKiAgLSBgJ2F1dG8nYCB0byBsZXQgaW50ZXJhY3QuanMgdHJ5IHRvIGRldGVybWluZSB3aGF0IHdvdWxkIGJlIGJlc3RcbiAgICAgICAgICpcbiAgICAgICAgIC0gbmV3VmFsdWUgKHN0cmluZykgI29wdGlvbmFsIGB0cnVlYCwgYGZhbHNlYCBvciBgJ2F1dG8nYFxuICAgICAgICAgPSAoc3RyaW5nIHwgSW50ZXJhY3RhYmxlKSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgIFxcKi9cbiAgICAgICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKC9eKGFsd2F5c3xuZXZlcnxhdXRvKSQvLnRlc3QobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnByZXZlbnREZWZhdWx0ID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0Jvb2wobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnByZXZlbnREZWZhdWx0ID0gbmV3VmFsdWU/ICdhbHdheXMnIDogJ25ldmVyJztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5vcmlnaW5cbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogR2V0cyBvciBzZXRzIHRoZSBvcmlnaW4gb2YgdGhlIEludGVyYWN0YWJsZSdzIGVsZW1lbnQuICBUaGUgeCBhbmQgeVxuICAgICAgICAgKiBvZiB0aGUgb3JpZ2luIHdpbGwgYmUgc3VidHJhY3RlZCBmcm9tIGFjdGlvbiBldmVudCBjb29yZGluYXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgIC0gb3JpZ2luIChvYmplY3QgfCBzdHJpbmcpICNvcHRpb25hbCBBbiBvYmplY3QgZWcuIHsgeDogMCwgeTogMCB9IG9yIHN0cmluZyAncGFyZW50JywgJ3NlbGYnIG9yIGFueSBDU1Mgc2VsZWN0b3JcbiAgICAgICAgICogT1JcbiAgICAgICAgIC0gb3JpZ2luIChFbGVtZW50KSAjb3B0aW9uYWwgQW4gSFRNTCBvciBTVkcgRWxlbWVudCB3aG9zZSByZWN0IHdpbGwgYmUgdXNlZFxuICAgICAgICAgKipcbiAgICAgICAgID0gKG9iamVjdCkgVGhlIGN1cnJlbnQgb3JpZ2luIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgIFxcKi9cbiAgICAgICAgb3JpZ2luOiBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0cnlTZWxlY3RvcihuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub3JpZ2luID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc09iamVjdChuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMub3JpZ2luID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMub3JpZ2luO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmRlbHRhU291cmNlXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgb3Igc2V0cyB0aGUgbW91c2UgY29vcmRpbmF0ZSB0eXBlcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGVcbiAgICAgICAgICogbW92ZW1lbnQgb2YgdGhlIHBvaW50ZXIuXG4gICAgICAgICAqXG4gICAgICAgICAtIG5ld1ZhbHVlIChzdHJpbmcpICNvcHRpb25hbCBVc2UgJ2NsaWVudCcgaWYgeW91IHdpbGwgYmUgc2Nyb2xsaW5nIHdoaWxlIGludGVyYWN0aW5nOyBVc2UgJ3BhZ2UnIGlmIHlvdSB3YW50IGF1dG9TY3JvbGwgdG8gd29ya1xuICAgICAgICAgPSAoc3RyaW5nIHwgb2JqZWN0KSBUaGUgY3VycmVudCBkZWx0YVNvdXJjZSBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIGRlbHRhU291cmNlOiBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gJ3BhZ2UnIHx8IG5ld1ZhbHVlID09PSAnY2xpZW50Jykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWx0YVNvdXJjZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZGVsdGFTb3VyY2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUucmVzdHJpY3RcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICoqXG4gICAgICAgICAqIERlcHJlY2F0ZWQuIEFkZCBhIGByZXN0cmljdGAgcHJvcGVydHkgdG8gdGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0b1xuICAgICAgICAgKiBASW50ZXJhY3RhYmxlLmRyYWdnYWJsZSwgQEludGVyYWN0YWJsZS5yZXNpemFibGUgb3IgQEludGVyYWN0YWJsZS5nZXN0dXJhYmxlIGluc3RlYWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgb3Igc2V0cyB0aGUgcmVjdGFuZ2xlcyB3aXRoaW4gd2hpY2ggYWN0aW9ucyBvbiB0aGlzXG4gICAgICAgICAqIGludGVyYWN0YWJsZSAoYWZ0ZXIgc25hcCBjYWxjdWxhdGlvbnMpIGFyZSByZXN0cmljdGVkLiBCeSBkZWZhdWx0LFxuICAgICAgICAgKiByZXN0cmljdGluZyBpcyByZWxhdGl2ZSB0byB0aGUgcG9pbnRlciBjb29yZGluYXRlcy4gWW91IGNhbiBjaGFuZ2VcbiAgICAgICAgICogdGhpcyBieSBzZXR0aW5nIHRoZVxuICAgICAgICAgKiBbYGVsZW1lbnRSZWN0YF0oaHR0cHM6Ly9naXRodWIuY29tL3RheWUvaW50ZXJhY3QuanMvcHVsbC83MikuXG4gICAgICAgICAqKlxuICAgICAgICAgLSBvcHRpb25zIChvYmplY3QpICNvcHRpb25hbCBhbiBvYmplY3Qgd2l0aCBrZXlzIGRyYWcsIHJlc2l6ZSwgYW5kL29yIGdlc3R1cmUgd2hvc2UgdmFsdWVzIGFyZSByZWN0cywgRWxlbWVudHMsIENTUyBzZWxlY3RvcnMsIG9yICdwYXJlbnQnIG9yICdzZWxmJ1xuICAgICAgICAgPSAob2JqZWN0KSBUaGUgY3VycmVudCByZXN0cmljdGlvbnMgb2JqZWN0IG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICAqKlxuICAgICAgICAgfCBpbnRlcmFjdChlbGVtZW50KS5yZXN0cmljdCh7XG4gICAgICAgICB8ICAgICAvLyB0aGUgcmVjdCB3aWxsIGJlIGBpbnRlcmFjdC5nZXRFbGVtZW50UmVjdChlbGVtZW50LnBhcmVudE5vZGUpYFxuICAgICAgICAgfCAgICAgZHJhZzogZWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8geCBhbmQgeSBhcmUgcmVsYXRpdmUgdG8gdGhlIHRoZSBpbnRlcmFjdGFibGUncyBvcmlnaW5cbiAgICAgICAgIHwgICAgIHJlc2l6ZTogeyB4OiAxMDAsIHk6IDEwMCwgd2lkdGg6IDIwMCwgaGVpZ2h0OiAyMDAgfVxuICAgICAgICAgfCB9KVxuICAgICAgICAgfFxuICAgICAgICAgfCBpbnRlcmFjdCgnLmRyYWdnYWJsZScpLnJlc3RyaWN0KHtcbiAgICAgICAgIHwgICAgIC8vIHRoZSByZWN0IHdpbGwgYmUgdGhlIHNlbGVjdGVkIGVsZW1lbnQncyBwYXJlbnRcbiAgICAgICAgIHwgICAgIGRyYWc6ICdwYXJlbnQnLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gZG8gbm90IHJlc3RyaWN0IGR1cmluZyBub3JtYWwgbW92ZW1lbnQuXG4gICAgICAgICB8ICAgICAvLyBJbnN0ZWFkLCB0cmlnZ2VyIG9ubHkgb25lIHJlc3RyaWN0ZWQgbW92ZSBldmVudFxuICAgICAgICAgfCAgICAgLy8gaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBlbmQgZXZlbnQuXG4gICAgICAgICB8ICAgICBlbmRPbmx5OiB0cnVlLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RheWUvaW50ZXJhY3QuanMvcHVsbC83MiNpc3N1ZS00MTgxMzQ5M1xuICAgICAgICAgfCAgICAgZWxlbWVudFJlY3Q6IHsgdG9wOiAwLCBsZWZ0OiAwLCBib3R0b206IDEsIHJpZ2h0OiAxIH1cbiAgICAgICAgIHwgfSk7XG4gICAgICAgIFxcKi9cbiAgICAgICAgcmVzdHJpY3Q6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIWlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0T3B0aW9ucygncmVzdHJpY3QnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBbJ2RyYWcnLCAncmVzaXplJywgJ2dlc3R1cmUnXSxcbiAgICAgICAgICAgICAgICByZXQ7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBhY3Rpb25zW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJBY3Rpb24gPSBleHRlbmQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFthY3Rpb25dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uOiBvcHRpb25zW2FjdGlvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuc2V0T3B0aW9ucygncmVzdHJpY3QnLCBwZXJBY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5jb250ZXh0XG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIEdldHMgdGhlIHNlbGVjdG9yIGNvbnRleHQgTm9kZSBvZiB0aGUgSW50ZXJhY3RhYmxlLiBUaGUgZGVmYXVsdCBpcyBgd2luZG93LmRvY3VtZW50YC5cbiAgICAgICAgICpcbiAgICAgICAgID0gKE5vZGUpIFRoZSBjb250ZXh0IE5vZGUgb2YgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgICoqXG4gICAgICAgIFxcKi9cbiAgICAgICAgY29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NvbnRleHQ6IGRvY3VtZW50LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmlnbm9yZUZyb21cbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhlIHRhcmdldCBvZiB0aGUgYG1vdXNlZG93bmAsIGBwb2ludGVyZG93bmAgb3IgYHRvdWNoc3RhcnRgXG4gICAgICAgICAqIGV2ZW50IG9yIGFueSBvZiBpdCdzIHBhcmVudHMgbWF0Y2ggdGhlIGdpdmVuIENTUyBzZWxlY3RvciBvclxuICAgICAgICAgKiBFbGVtZW50LCBubyBkcmFnL3Jlc2l6ZS9nZXN0dXJlIGlzIHN0YXJ0ZWQuXG4gICAgICAgICAqXG4gICAgICAgICAtIG5ld1ZhbHVlIChzdHJpbmcgfCBFbGVtZW50IHwgbnVsbCkgI29wdGlvbmFsIGEgQ1NTIHNlbGVjdG9yIHN0cmluZywgYW4gRWxlbWVudCBvciBgbnVsbGAgdG8gbm90IGlnbm9yZSBhbnkgZWxlbWVudHNcbiAgICAgICAgID0gKHN0cmluZyB8IEVsZW1lbnQgfCBvYmplY3QpIFRoZSBjdXJyZW50IGlnbm9yZUZyb20gdmFsdWUgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgICoqXG4gICAgICAgICB8IGludGVyYWN0KGVsZW1lbnQsIHsgaWdub3JlRnJvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vLWFjdGlvbicpIH0pO1xuICAgICAgICAgfCAvLyBvclxuICAgICAgICAgfCBpbnRlcmFjdChlbGVtZW50KS5pZ25vcmVGcm9tKCdpbnB1dCwgdGV4dGFyZWEsIGEnKTtcbiAgICAgICAgXFwqL1xuICAgICAgICBpZ25vcmVGcm9tOiBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0cnlTZWxlY3RvcihuZXdWYWx1ZSkpIHsgICAgICAgICAgICAvLyBDU1Mgc2VsZWN0b3IgdG8gbWF0Y2ggZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlnbm9yZUZyb20gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzRWxlbWVudChuZXdWYWx1ZSkpIHsgICAgICAgICAgICAgIC8vIHNwZWNpZmljIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaWdub3JlRnJvbSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmlnbm9yZUZyb207XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuYWxsb3dGcm9tXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIEEgZHJhZy9yZXNpemUvZ2VzdHVyZSBpcyBzdGFydGVkIG9ubHkgSWYgdGhlIHRhcmdldCBvZiB0aGVcbiAgICAgICAgICogYG1vdXNlZG93bmAsIGBwb2ludGVyZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50IG9yIGFueSBvZiBpdCdzXG4gICAgICAgICAqIHBhcmVudHMgbWF0Y2ggdGhlIGdpdmVuIENTUyBzZWxlY3RvciBvciBFbGVtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgLSBuZXdWYWx1ZSAoc3RyaW5nIHwgRWxlbWVudCB8IG51bGwpICNvcHRpb25hbCBhIENTUyBzZWxlY3RvciBzdHJpbmcsIGFuIEVsZW1lbnQgb3IgYG51bGxgIHRvIGFsbG93IGZyb20gYW55IGVsZW1lbnRcbiAgICAgICAgID0gKHN0cmluZyB8IEVsZW1lbnQgfCBvYmplY3QpIFRoZSBjdXJyZW50IGFsbG93RnJvbSB2YWx1ZSBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICAgKipcbiAgICAgICAgIHwgaW50ZXJhY3QoZWxlbWVudCwgeyBhbGxvd0Zyb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcmFnLWhhbmRsZScpIH0pO1xuICAgICAgICAgfCAvLyBvclxuICAgICAgICAgfCBpbnRlcmFjdChlbGVtZW50KS5hbGxvd0Zyb20oJy5oYW5kbGUnKTtcbiAgICAgICAgXFwqL1xuICAgICAgICBhbGxvd0Zyb206IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRyeVNlbGVjdG9yKG5ld1ZhbHVlKSkgeyAgICAgICAgICAgIC8vIENTUyBzZWxlY3RvciB0byBtYXRjaCBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuYWxsb3dGcm9tID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0VsZW1lbnQobmV3VmFsdWUpKSB7ICAgICAgICAgICAgICAvLyBzcGVjaWZpYyBlbGVtZW50XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFsbG93RnJvbSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RnJvbTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5lbGVtZW50XG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHRoaXMgaXMgbm90IGEgc2VsZWN0b3IgSW50ZXJhY3RhYmxlLCBpdCByZXR1cm5zIHRoZSBlbGVtZW50IHRoaXNcbiAgICAgICAgICogaW50ZXJhY3RhYmxlIHJlcHJlc2VudHNcbiAgICAgICAgICpcbiAgICAgICAgID0gKEVsZW1lbnQpIEhUTUwgLyBTVkcgRWxlbWVudFxuICAgICAgICBcXCovXG4gICAgICAgIGVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmZpcmVcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogQ2FsbHMgbGlzdGVuZXJzIGZvciB0aGUgZ2l2ZW4gSW50ZXJhY3RFdmVudCB0eXBlIGJvdW5kIGdsb2JhbGx5XG4gICAgICAgICAqIGFuZCBkaXJlY3RseSB0byB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICAgKlxuICAgICAgICAgLSBpRXZlbnQgKEludGVyYWN0RXZlbnQpIFRoZSBJbnRlcmFjdEV2ZW50IG9iamVjdCB0byBiZSBmaXJlZCBvbiB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICAgPSAoSW50ZXJhY3RhYmxlKSB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uIChpRXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghKGlFdmVudCAmJiBpRXZlbnQudHlwZSkgfHwgIWNvbnRhaW5zKGV2ZW50VHlwZXMsIGlFdmVudC50eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzLFxuICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgbGVuLFxuICAgICAgICAgICAgICAgIG9uRXZlbnQgPSAnb24nICsgaUV2ZW50LnR5cGUsXG4gICAgICAgICAgICAgICAgZnVuY05hbWUgPSAnJztcblxuICAgICAgICAgICAgLy8gSW50ZXJhY3RhYmxlI29uKCkgbGlzdGVuZXJzXG4gICAgICAgICAgICBpZiAoaUV2ZW50LnR5cGUgaW4gdGhpcy5faUV2ZW50cykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2lFdmVudHNbaUV2ZW50LnR5cGVdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbiAmJiAhaUV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lID0gbGlzdGVuZXJzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1tpXShpRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW50ZXJhY3RhYmxlLm9uZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbb25FdmVudF0pKSB7XG4gICAgICAgICAgICAgICAgZnVuY05hbWUgPSB0aGlzW29uRXZlbnRdLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpc1tvbkV2ZW50XShpRXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbnRlcmFjdC5vbigpIGxpc3RlbmVyc1xuICAgICAgICAgICAgaWYgKGlFdmVudC50eXBlIGluIGdsb2JhbEV2ZW50cyAmJiAobGlzdGVuZXJzID0gZ2xvYmFsRXZlbnRzW2lFdmVudC50eXBlXSkpICB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuICYmICFpRXZlbnQuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWUgPSBsaXN0ZW5lcnNbaV0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2ldKGlFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5vblxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBCaW5kcyBhIGxpc3RlbmVyIGZvciBhbiBJbnRlcmFjdEV2ZW50IG9yIERPTSBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgIC0gZXZlbnRUeXBlICAoc3RyaW5nIHwgYXJyYXkgfCBvYmplY3QpIFRoZSB0eXBlcyBvZiBldmVudHMgdG8gbGlzdGVuIGZvclxuICAgICAgICAgLSBsaXN0ZW5lciAgIChmdW5jdGlvbikgVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiB0aGUgZ2l2ZW4gZXZlbnQocylcbiAgICAgICAgIC0gdXNlQ2FwdHVyZSAoYm9vbGVhbikgI29wdGlvbmFsIHVzZUNhcHR1cmUgZmxhZyBmb3IgYWRkRXZlbnRMaXN0ZW5lclxuICAgICAgICAgPSAob2JqZWN0KSBUaGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIG9uOiBmdW5jdGlvbiAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICAgICAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgICAgIGlmIChpc1N0cmluZyhldmVudFR5cGUpICYmIGV2ZW50VHlwZS5zZWFyY2goJyAnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBldmVudFR5cGUgPSBldmVudFR5cGUudHJpbSgpLnNwbGl0KC8gKy8pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNBcnJheShldmVudFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50VHlwZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uKGV2ZW50VHlwZVtpXSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoZXZlbnRUeXBlKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gZXZlbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24ocHJvcCwgZXZlbnRUeXBlW3Byb3BdLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICd3aGVlbCcpIHtcbiAgICAgICAgICAgICAgICBldmVudFR5cGUgPSB3aGVlbEV2ZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRvIGJvb2xlYW5cbiAgICAgICAgICAgIHVzZUNhcHR1cmUgPSB1c2VDYXB0dXJlPyB0cnVlOiBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGNvbnRhaW5zKGV2ZW50VHlwZXMsIGV2ZW50VHlwZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIHR5cGUgb2YgZXZlbnQgd2FzIG5ldmVyIGJvdW5kIHRvIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICAgICAgICAgaWYgKCEoZXZlbnRUeXBlIGluIHRoaXMuX2lFdmVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lFdmVudHNbZXZlbnRUeXBlXSA9IFtsaXN0ZW5lcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pRXZlbnRzW2V2ZW50VHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZGVsZWdhdGVkIGV2ZW50IGZvciBzZWxlY3RvclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIGlmICghZGVsZWdhdGVkRXZlbnRzW2V2ZW50VHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkRXZlbnRzW2V2ZW50VHlwZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcnM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dHMgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyczogW11cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgZGVsZWdhdGUgbGlzdGVuZXIgZnVuY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jdW1lbnRzW2ldLCBldmVudFR5cGUsIGRlbGVnYXRlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmFkZChkb2N1bWVudHNbaV0sIGV2ZW50VHlwZSwgZGVsZWdhdGVVc2VDYXB0dXJlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBkZWxlZ2F0ZWQgPSBkZWxlZ2F0ZWRFdmVudHNbZXZlbnRUeXBlXSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGluZGV4ID0gZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWxlZ2F0ZWQuc2VsZWN0b3JzW2luZGV4XSA9PT0gdGhpcy5zZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgZGVsZWdhdGVkLmNvbnRleHRzW2luZGV4XSA9PT0gdGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkLnNlbGVjdG9ycy5wdXNoKHRoaXMuc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0ZWQuY29udGV4dHMgLnB1c2godGhpcy5fY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlZC5saXN0ZW5lcnMucHVzaChbXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8ga2VlcCBsaXN0ZW5lciBhbmQgdXNlQ2FwdHVyZSBmbGFnXG4gICAgICAgICAgICAgICAgZGVsZWdhdGVkLmxpc3RlbmVyc1tpbmRleF0ucHVzaChbbGlzdGVuZXIsIHVzZUNhcHR1cmVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQodGhpcy5fZWxlbWVudCwgZXZlbnRUeXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLm9mZlxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBSZW1vdmVzIGFuIEludGVyYWN0RXZlbnQgb3IgRE9NIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAqXG4gICAgICAgICAtIGV2ZW50VHlwZSAgKHN0cmluZyB8IGFycmF5IHwgb2JqZWN0KSBUaGUgdHlwZXMgb2YgZXZlbnRzIHRoYXQgd2VyZSBsaXN0ZW5lZCBmb3JcbiAgICAgICAgIC0gbGlzdGVuZXIgICAoZnVuY3Rpb24pIFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0byBiZSByZW1vdmVkXG4gICAgICAgICAtIHVzZUNhcHR1cmUgKGJvb2xlYW4pICNvcHRpb25hbCB1c2VDYXB0dXJlIGZsYWcgZm9yIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgICAgID0gKG9iamVjdCkgVGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgXFwqL1xuICAgICAgICBvZmY6IGZ1bmN0aW9uIChldmVudFR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gICAgICAgICAgICB2YXIgaTtcblxuICAgICAgICAgICAgaWYgKGlzU3RyaW5nKGV2ZW50VHlwZSkgJiYgZXZlbnRUeXBlLnNlYXJjaCgnICcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VHlwZSA9IGV2ZW50VHlwZS50cmltKCkuc3BsaXQoLyArLyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5KGV2ZW50VHlwZSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRUeXBlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50VHlwZVtpXSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoZXZlbnRUeXBlKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gZXZlbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmKHByb3AsIGV2ZW50VHlwZVtwcm9wXSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZXZlbnRMaXN0LFxuICAgICAgICAgICAgICAgIGluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gYm9vbGVhblxuICAgICAgICAgICAgdXNlQ2FwdHVyZSA9IHVzZUNhcHR1cmU/IHRydWU6IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnd2hlZWwnKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gd2hlZWxFdmVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYW4gYWN0aW9uIGV2ZW50IHR5cGVcbiAgICAgICAgICAgIGlmIChjb250YWlucyhldmVudFR5cGVzLCBldmVudFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRMaXN0ID0gdGhpcy5faUV2ZW50c1tldmVudFR5cGVdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50TGlzdCAmJiAoaW5kZXggPSBpbmRleE9mKGV2ZW50TGlzdCwgbGlzdGVuZXIpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faUV2ZW50c1tldmVudFR5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZGVsZWdhdGVkIGV2ZW50XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlbGVnYXRlZCA9IGRlbGVnYXRlZEV2ZW50c1tldmVudFR5cGVdLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaEZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRlbGVnYXRlZCkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgICAgICAgICAgLy8gY291bnQgZnJvbSBsYXN0IGluZGV4IG9mIGRlbGVnYXRlZCB0byAwXG4gICAgICAgICAgICAgICAgZm9yIChpbmRleCA9IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsb29rIGZvciBtYXRjaGluZyBzZWxlY3RvciBhbmQgY29udGV4dCBOb2RlXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWxlZ2F0ZWQuc2VsZWN0b3JzW2luZGV4XSA9PT0gdGhpcy5zZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgZGVsZWdhdGVkLmNvbnRleHRzW2luZGV4XSA9PT0gdGhpcy5fY29udGV4dCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gZGVsZWdhdGVkLmxpc3RlbmVyc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVhY2ggaXRlbSBvZiB0aGUgbGlzdGVuZXJzIGFycmF5IGlzIGFuIGFycmF5OiBbZnVuY3Rpb24sIHVzZUNhcHR1cmVGbGFnXVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gbGlzdGVuZXJzW2ldWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VDYXAgPSBsaXN0ZW5lcnNbaV1bMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb25zIGFuZCB1c2VDYXB0dXJlIGZsYWdzIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZuID09PSBsaXN0ZW5lciAmJiB1c2VDYXAgPT09IHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBhbGwgbGlzdGVuZXJzIGZvciB0aGlzIGludGVyYWN0YWJsZSBoYXZlIGJlZW4gcmVtb3ZlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGludGVyYWN0YWJsZSBmcm9tIHRoZSBkZWxlZ2F0ZWQgYXJyYXlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkLnNlbGVjdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkLmNvbnRleHRzIC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkLmxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGVsZWdhdGUgZnVuY3Rpb24gZnJvbSBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucmVtb3ZlKHRoaXMuX2NvbnRleHQsIGV2ZW50VHlwZSwgZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucmVtb3ZlKHRoaXMuX2NvbnRleHQsIGV2ZW50VHlwZSwgZGVsZWdhdGVVc2VDYXB0dXJlLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBhcnJheXMgaWYgdGhleSBhcmUgZW1wdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0ZWRFdmVudHNbZXZlbnRUeXBlXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IHJlbW92ZSBvbmUgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoRm91bmQpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBmcm9tIHRoaXMgSW50ZXJhdGFibGUncyBlbGVtZW50XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudHMucmVtb3ZlKHRoaXMuX2VsZW1lbnQsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5zZXRcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogUmVzZXQgdGhlIG9wdGlvbnMgb2YgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgIC0gb3B0aW9ucyAob2JqZWN0KSBUaGUgbmV3IHNldHRpbmdzIHRvIGFwcGx5XG4gICAgICAgICA9IChvYmplY3QpIFRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgIFxcKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFpc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucy5iYXNlKTtcblxuICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgYWN0aW9ucyA9IFsnZHJhZycsICdkcm9wJywgJ3Jlc2l6ZScsICdnZXN0dXJlJ10sXG4gICAgICAgICAgICAgICAgbWV0aG9kcyA9IFsnZHJhZ2dhYmxlJywgJ2Ryb3B6b25lJywgJ3Jlc2l6YWJsZScsICdnZXN0dXJhYmxlJ10sXG4gICAgICAgICAgICAgICAgcGVyQWN0aW9ucyA9IGV4dGVuZChleHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLnBlckFjdGlvbiksIG9wdGlvbnNbYWN0aW9uXSB8fCB7fSk7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFjdGlvbnNbaV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXSA9IGV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnNbYWN0aW9uXSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldFBlckFjdGlvbihhY3Rpb24sIHBlckFjdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgdGhpc1ttZXRob2RzW2ldXShvcHRpb25zW2FjdGlvbl0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBbXG4gICAgICAgICAgICAgICAgICAgICdhY2NlcHQnLCAnYWN0aW9uQ2hlY2tlcicsICdhbGxvd0Zyb20nLCAnZGVsdGFTb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICAnZHJvcENoZWNrZXInLCAnaWdub3JlRnJvbScsICdvcmlnaW4nLCAncHJldmVudERlZmF1bHQnLFxuICAgICAgICAgICAgICAgICAgICAncmVjdENoZWNrZXInLCAnc3R5bGVDdXJzb3InXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gc2V0dGluZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IHNldHRpbmdzW2ldO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW3NldHRpbmddID0gZGVmYXVsdE9wdGlvbnMuYmFzZVtzZXR0aW5nXTtcblxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tzZXR0aW5nXShvcHRpb25zW3NldHRpbmddKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLnVuc2V0XG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIFJlbW92ZSB0aGlzIGludGVyYWN0YWJsZSBmcm9tIHRoZSBsaXN0IG9mIGludGVyYWN0YWJsZXMgYW5kIHJlbW92ZVxuICAgICAgICAgKiBpdCdzIGRyYWcsIGRyb3AsIHJlc2l6ZSBhbmQgZ2VzdHVyZSBjYXBhYmlsaXRpZXNcbiAgICAgICAgICpcbiAgICAgICAgID0gKG9iamVjdCkgQGludGVyYWN0XG4gICAgICAgIFxcKi9cbiAgICAgICAgdW5zZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGV2ZW50cy5yZW1vdmUodGhpcy5fZWxlbWVudCwgJ2FsbCcpO1xuXG4gICAgICAgICAgICBpZiAoIWlzU3RyaW5nKHRoaXMuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLCAnYWxsJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmN1cnNvciA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkZWxlZ2F0ZWQgZXZlbnRzXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdHlwZSBpbiBkZWxlZ2F0ZWRFdmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGVnYXRlZCA9IGRlbGVnYXRlZEV2ZW50c1t0eXBlXTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWxlZ2F0ZWQuc2VsZWN0b3JzW2ldID09PSB0aGlzLnNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZGVsZWdhdGVkLmNvbnRleHRzW2ldID09PSB0aGlzLl9jb250ZXh0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0ZWQuc2VsZWN0b3JzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0ZWQuY29udGV4dHMgLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0ZWQubGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYXJyYXlzIGlmIHRoZXkgYXJlIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0ZWRFdmVudHNbdHlwZV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLl9jb250ZXh0LCB0eXBlLCBkZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5yZW1vdmUodGhpcy5fY29udGV4dCwgdHlwZSwgZGVsZWdhdGVVc2VDYXB0dXJlLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZHJvcHpvbmUoZmFsc2UpO1xuXG4gICAgICAgICAgICBpbnRlcmFjdGFibGVzLnNwbGljZShpbmRleE9mKGludGVyYWN0YWJsZXMsIHRoaXMpLCAxKTtcblxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHdhcm5PbmNlIChtZXRob2QsIG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIEludGVyYWN0YWJsZS5wcm90b3R5cGUuc25hcCA9IHdhcm5PbmNlKEludGVyYWN0YWJsZS5wcm90b3R5cGUuc25hcCxcbiAgICAgICAgICdJbnRlcmFjdGFibGUjc25hcCBpcyBkZXByZWNhdGVkLiBTZWUgdGhlIG5ldyBkb2N1bWVudGF0aW9uIGZvciBzbmFwcGluZyBhdCBodHRwOi8vaW50ZXJhY3Rqcy5pby9kb2NzL3NuYXBwaW5nJyk7XG4gICAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5yZXN0cmljdCA9IHdhcm5PbmNlKEludGVyYWN0YWJsZS5wcm90b3R5cGUucmVzdHJpY3QsXG4gICAgICAgICAnSW50ZXJhY3RhYmxlI3Jlc3RyaWN0IGlzIGRlcHJlY2F0ZWQuIFNlZSB0aGUgbmV3IGRvY3VtZW50YXRpb24gZm9yIHJlc3RpY3RpbmcgYXQgaHR0cDovL2ludGVyYWN0anMuaW8vZG9jcy9yZXN0cmljdGlvbicpO1xuICAgIEludGVyYWN0YWJsZS5wcm90b3R5cGUuaW5lcnRpYSA9IHdhcm5PbmNlKEludGVyYWN0YWJsZS5wcm90b3R5cGUuaW5lcnRpYSxcbiAgICAgICAgICdJbnRlcmFjdGFibGUjaW5lcnRpYSBpcyBkZXByZWNhdGVkLiBTZWUgdGhlIG5ldyBkb2N1bWVudGF0aW9uIGZvciBpbmVydGlhIGF0IGh0dHA6Ly9pbnRlcmFjdGpzLmlvL2RvY3MvaW5lcnRpYScpO1xuICAgIEludGVyYWN0YWJsZS5wcm90b3R5cGUuYXV0b1Njcm9sbCA9IHdhcm5PbmNlKEludGVyYWN0YWJsZS5wcm90b3R5cGUuYXV0b1Njcm9sbCxcbiAgICAgICAgICdJbnRlcmFjdGFibGUjYXV0b1Njcm9sbCBpcyBkZXByZWNhdGVkLiBTZWUgdGhlIG5ldyBkb2N1bWVudGF0aW9uIGZvciBhdXRvU2Nyb2xsIGF0IGh0dHA6Ly9pbnRlcmFjdGpzLmlvL2RvY3MvI2F1dG9zY3JvbGwnKTtcbiAgICBJbnRlcmFjdGFibGUucHJvdG90eXBlLnNxdWFyZVJlc2l6ZSA9IHdhcm5PbmNlKEludGVyYWN0YWJsZS5wcm90b3R5cGUuc3F1YXJlUmVzaXplLFxuICAgICAgICAgJ0ludGVyYWN0YWJsZSNzcXVhcmVSZXNpemUgaXMgZGVwcmVjYXRlZC4gU2VlIGh0dHA6Ly9pbnRlcmFjdGpzLmlvL2RvY3MvI3Jlc2l6ZS1zcXVhcmUnKTtcblxuICAgIEludGVyYWN0YWJsZS5wcm90b3R5cGUuYWNjZXB0ID0gd2Fybk9uY2UoSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5hY2NlcHQsXG4gICAgICAgICAnSW50ZXJhY3RhYmxlI2FjY2VwdCBpcyBkZXByZWNhdGVkLiB1c2UgSW50ZXJhY3RhYmxlI2Ryb3B6b25lKHsgYWNjZXB0OiB0YXJnZXQgfSkgaW5zdGVhZCcpO1xuICAgIEludGVyYWN0YWJsZS5wcm90b3R5cGUuZHJvcENoZWNrZXIgPSB3YXJuT25jZShJbnRlcmFjdGFibGUucHJvdG90eXBlLmRyb3BDaGVja2VyLFxuICAgICAgICAgJ0ludGVyYWN0YWJsZSNkcm9wQ2hlY2tlciBpcyBkZXByZWNhdGVkLiB1c2UgSW50ZXJhY3RhYmxlI2Ryb3B6b25lKHsgZHJvcENoZWNrZXI6IGNoZWNrZXJGdW5jdGlvbiB9KSBpbnN0ZWFkJyk7XG4gICAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5jb250ZXh0ID0gd2Fybk9uY2UoSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5jb250ZXh0LFxuICAgICAgICAgJ0ludGVyYWN0YWJsZSNjb250ZXh0IGFzIGEgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuIEl0IHdpbGwgc29vbiBiZSBhIERPTSBOb2RlIGluc3RlYWQnKTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5pc1NldFxuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgKiBDaGVjayBpZiBhbiBlbGVtZW50IGhhcyBiZWVuIHNldFxuICAgICAtIGVsZW1lbnQgKEVsZW1lbnQpIFRoZSBFbGVtZW50IGJlaW5nIHNlYXJjaGVkIGZvclxuICAgICA9IChib29sZWFuKSBJbmRpY2F0ZXMgaWYgdGhlIGVsZW1lbnQgb3IgQ1NTIHNlbGVjdG9yIHdhcyBwcmV2aW91c2x5IHBhc3NlZCB0byBpbnRlcmFjdFxuICAgIFxcKi9cbiAgICBpbnRlcmFjdC5pc1NldCA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGludGVyYWN0YWJsZXMuaW5kZXhPZkVsZW1lbnQoZWxlbWVudCwgb3B0aW9ucyAmJiBvcHRpb25zLmNvbnRleHQpICE9PSAtMTtcbiAgICB9O1xuXG4gICAgLypcXFxuICAgICAqIGludGVyYWN0Lm9uXG4gICAgIFsgbWV0aG9kIF1cbiAgICAgKlxuICAgICAqIEFkZHMgYSBnbG9iYWwgbGlzdGVuZXIgZm9yIGFuIEludGVyYWN0RXZlbnQgb3IgYWRkcyBhIERPTSBldmVudCB0b1xuICAgICAqIGBkb2N1bWVudGBcbiAgICAgKlxuICAgICAtIHR5cGUgICAgICAgKHN0cmluZyB8IGFycmF5IHwgb2JqZWN0KSBUaGUgdHlwZXMgb2YgZXZlbnRzIHRvIGxpc3RlbiBmb3JcbiAgICAgLSBsaXN0ZW5lciAgIChmdW5jdGlvbikgVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiB0aGUgZ2l2ZW4gZXZlbnQocylcbiAgICAgLSB1c2VDYXB0dXJlIChib29sZWFuKSAjb3B0aW9uYWwgdXNlQ2FwdHVyZSBmbGFnIGZvciBhZGRFdmVudExpc3RlbmVyXG4gICAgID0gKG9iamVjdCkgaW50ZXJhY3RcbiAgICBcXCovXG4gICAgaW50ZXJhY3Qub24gPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHR5cGUpICYmIHR5cGUuc2VhcmNoKCcgJykgIT09IC0xKSB7XG4gICAgICAgICAgICB0eXBlID0gdHlwZS50cmltKCkuc3BsaXQoLyArLyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBcnJheSh0eXBlKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJhY3Qub24odHlwZVtpXSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNPYmplY3QodHlwZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gdHlwZSkge1xuICAgICAgICAgICAgICAgIGludGVyYWN0Lm9uKHByb3AsIHR5cGVbcHJvcF0sIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXQgaXMgYW4gSW50ZXJhY3RFdmVudCB0eXBlLCBhZGQgbGlzdGVuZXIgdG8gZ2xvYmFsRXZlbnRzXG4gICAgICAgIGlmIChjb250YWlucyhldmVudFR5cGVzLCB0eXBlKSkge1xuICAgICAgICAgICAgLy8gaWYgdGhpcyB0eXBlIG9mIGV2ZW50IHdhcyBuZXZlciBib3VuZFxuICAgICAgICAgICAgaWYgKCFnbG9iYWxFdmVudHNbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxFdmVudHNbdHlwZV0gPSBbbGlzdGVuZXJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsRXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIG5vbiBJbnRlcmFjdEV2ZW50IHR5cGUsIGFkZEV2ZW50TGlzdGVuZXIgdG8gZG9jdW1lbnRcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvY3VtZW50LCB0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgfTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5vZmZcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgICogUmVtb3ZlcyBhIGdsb2JhbCBJbnRlcmFjdEV2ZW50IGxpc3RlbmVyIG9yIERPTSBldmVudCBmcm9tIGBkb2N1bWVudGBcbiAgICAgKlxuICAgICAtIHR5cGUgICAgICAgKHN0cmluZyB8IGFycmF5IHwgb2JqZWN0KSBUaGUgdHlwZXMgb2YgZXZlbnRzIHRoYXQgd2VyZSBsaXN0ZW5lZCBmb3JcbiAgICAgLSBsaXN0ZW5lciAgIChmdW5jdGlvbikgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWRcbiAgICAgLSB1c2VDYXB0dXJlIChib29sZWFuKSAjb3B0aW9uYWwgdXNlQ2FwdHVyZSBmbGFnIGZvciByZW1vdmVFdmVudExpc3RlbmVyXG4gICAgID0gKG9iamVjdCkgaW50ZXJhY3RcbiAgICAgXFwqL1xuICAgIGludGVyYWN0Lm9mZiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICAgICAgICBpZiAoaXNTdHJpbmcodHlwZSkgJiYgdHlwZS5zZWFyY2goJyAnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlLnRyaW0oKS5zcGxpdCgvICsvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0FycmF5KHR5cGUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnRlcmFjdC5vZmYodHlwZVtpXSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNPYmplY3QodHlwZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gdHlwZSkge1xuICAgICAgICAgICAgICAgIGludGVyYWN0Lm9mZihwcm9wLCB0eXBlW3Byb3BdLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29udGFpbnMoZXZlbnRUeXBlcywgdHlwZSkpIHtcbiAgICAgICAgICAgIGV2ZW50cy5yZW1vdmUoZG9jdW1lbnQsIHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpbmRleDtcblxuICAgICAgICAgICAgaWYgKHR5cGUgaW4gZ2xvYmFsRXZlbnRzXG4gICAgICAgICAgICAgICAgJiYgKGluZGV4ID0gaW5kZXhPZihnbG9iYWxFdmVudHNbdHlwZV0sIGxpc3RlbmVyKSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsRXZlbnRzW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgfTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5lbmFibGVEcmFnZ2luZ1xuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgKiBEZXByZWNhdGVkLlxuICAgICAqXG4gICAgICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgZHJhZ2dpbmcgaXMgZW5hYmxlZCBmb3IgYW55IEludGVyYWN0YWJsZXNcbiAgICAgKlxuICAgICAtIG5ld1ZhbHVlIChib29sZWFuKSAjb3B0aW9uYWwgYHRydWVgIHRvIGFsbG93IHRoZSBhY3Rpb247IGBmYWxzZWAgdG8gZGlzYWJsZSBhY3Rpb24gZm9yIGFsbCBJbnRlcmFjdGFibGVzXG4gICAgID0gKGJvb2xlYW4gfCBvYmplY3QpIFRoZSBjdXJyZW50IHNldHRpbmcgb3IgaW50ZXJhY3RcbiAgICBcXCovXG4gICAgaW50ZXJhY3QuZW5hYmxlRHJhZ2dpbmcgPSB3YXJuT25jZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBudWxsICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFjdGlvbklzRW5hYmxlZC5kcmFnID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aW9uSXNFbmFibGVkLmRyYWc7XG4gICAgfSwgJ2ludGVyYWN0LmVuYWJsZURyYWdnaW5nIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgc29vbiBiZSByZW1vdmVkLicpO1xuXG4gICAgLypcXFxuICAgICAqIGludGVyYWN0LmVuYWJsZVJlc2l6aW5nXG4gICAgIFsgbWV0aG9kIF1cbiAgICAgKlxuICAgICAqIERlcHJlY2F0ZWQuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciByZXNpemluZyBpcyBlbmFibGVkIGZvciBhbnkgSW50ZXJhY3RhYmxlc1xuICAgICAqXG4gICAgIC0gbmV3VmFsdWUgKGJvb2xlYW4pICNvcHRpb25hbCBgdHJ1ZWAgdG8gYWxsb3cgdGhlIGFjdGlvbjsgYGZhbHNlYCB0byBkaXNhYmxlIGFjdGlvbiBmb3IgYWxsIEludGVyYWN0YWJsZXNcbiAgICAgPSAoYm9vbGVhbiB8IG9iamVjdCkgVGhlIGN1cnJlbnQgc2V0dGluZyBvciBpbnRlcmFjdFxuICAgIFxcKi9cbiAgICBpbnRlcmFjdC5lbmFibGVSZXNpemluZyA9IHdhcm5PbmNlKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IG51bGwgJiYgbmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWN0aW9uSXNFbmFibGVkLnJlc2l6ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbklzRW5hYmxlZC5yZXNpemU7XG4gICAgfSwgJ2ludGVyYWN0LmVuYWJsZVJlc2l6aW5nIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgc29vbiBiZSByZW1vdmVkLicpO1xuXG4gICAgLypcXFxuICAgICAqIGludGVyYWN0LmVuYWJsZUdlc3R1cmluZ1xuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgKiBEZXByZWNhdGVkLlxuICAgICAqXG4gICAgICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgZ2VzdHVyaW5nIGlzIGVuYWJsZWQgZm9yIGFueSBJbnRlcmFjdGFibGVzXG4gICAgICpcbiAgICAgLSBuZXdWYWx1ZSAoYm9vbGVhbikgI29wdGlvbmFsIGB0cnVlYCB0byBhbGxvdyB0aGUgYWN0aW9uOyBgZmFsc2VgIHRvIGRpc2FibGUgYWN0aW9uIGZvciBhbGwgSW50ZXJhY3RhYmxlc1xuICAgICA9IChib29sZWFuIHwgb2JqZWN0KSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIGludGVyYWN0XG4gICAgXFwqL1xuICAgIGludGVyYWN0LmVuYWJsZUdlc3R1cmluZyA9IHdhcm5PbmNlKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IG51bGwgJiYgbmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWN0aW9uSXNFbmFibGVkLmdlc3R1cmUgPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25Jc0VuYWJsZWQuZ2VzdHVyZTtcbiAgICB9LCAnaW50ZXJhY3QuZW5hYmxlR2VzdHVyaW5nIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgc29vbiBiZSByZW1vdmVkLicpO1xuXG4gICAgaW50ZXJhY3QuZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXM7XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3QuZGVidWdcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgICogUmV0dXJucyBkZWJ1Z2dpbmcgZGF0YVxuICAgICA9IChvYmplY3QpIEFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgdGhhdCBvdXRsaW5lIHRoZSBjdXJyZW50IHN0YXRlIGFuZCBleHBvc2UgaW50ZXJuYWwgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXNcbiAgICBcXCovXG4gICAgaW50ZXJhY3QuZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uc1swXSB8fCBuZXcgSW50ZXJhY3Rpb24oKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW50ZXJhY3Rpb25zICAgICAgICAgIDogaW50ZXJhY3Rpb25zLFxuICAgICAgICAgICAgdGFyZ2V0ICAgICAgICAgICAgICAgIDogaW50ZXJhY3Rpb24udGFyZ2V0LFxuICAgICAgICAgICAgZHJhZ2dpbmcgICAgICAgICAgICAgIDogaW50ZXJhY3Rpb24uZHJhZ2dpbmcsXG4gICAgICAgICAgICByZXNpemluZyAgICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5yZXNpemluZyxcbiAgICAgICAgICAgIGdlc3R1cmluZyAgICAgICAgICAgICA6IGludGVyYWN0aW9uLmdlc3R1cmluZyxcbiAgICAgICAgICAgIHByZXBhcmVkICAgICAgICAgICAgICA6IGludGVyYWN0aW9uLnByZXBhcmVkLFxuICAgICAgICAgICAgbWF0Y2hlcyAgICAgICAgICAgICAgIDogaW50ZXJhY3Rpb24ubWF0Y2hlcyxcbiAgICAgICAgICAgIG1hdGNoRWxlbWVudHMgICAgICAgICA6IGludGVyYWN0aW9uLm1hdGNoRWxlbWVudHMsXG5cbiAgICAgICAgICAgIHByZXZDb29yZHMgICAgICAgICAgICA6IGludGVyYWN0aW9uLnByZXZDb29yZHMsXG4gICAgICAgICAgICBzdGFydENvb3JkcyAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5zdGFydENvb3JkcyxcblxuICAgICAgICAgICAgcG9pbnRlcklkcyAgICAgICAgICAgIDogaW50ZXJhY3Rpb24ucG9pbnRlcklkcyxcbiAgICAgICAgICAgIHBvaW50ZXJzICAgICAgICAgICAgICA6IGludGVyYWN0aW9uLnBvaW50ZXJzLFxuICAgICAgICAgICAgYWRkUG9pbnRlciAgICAgICAgICAgIDogbGlzdGVuZXJzLmFkZFBvaW50ZXIsXG4gICAgICAgICAgICByZW1vdmVQb2ludGVyICAgICAgICAgOiBsaXN0ZW5lcnMucmVtb3ZlUG9pbnRlcixcbiAgICAgICAgICAgIHJlY29yZFBvaW50ZXIgICAgICAgIDogbGlzdGVuZXJzLnJlY29yZFBvaW50ZXIsXG5cbiAgICAgICAgICAgIHNuYXAgICAgICAgICAgICAgICAgICA6IGludGVyYWN0aW9uLnNuYXBTdGF0dXMsXG4gICAgICAgICAgICByZXN0cmljdCAgICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5yZXN0cmljdFN0YXR1cyxcbiAgICAgICAgICAgIGluZXJ0aWEgICAgICAgICAgICAgICA6IGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXMsXG5cbiAgICAgICAgICAgIGRvd25UaW1lICAgICAgICAgICAgICA6IGludGVyYWN0aW9uLmRvd25UaW1lc1swXSxcbiAgICAgICAgICAgIGRvd25FdmVudCAgICAgICAgICAgICA6IGludGVyYWN0aW9uLmRvd25FdmVudCxcbiAgICAgICAgICAgIGRvd25Qb2ludGVyICAgICAgICAgICA6IGludGVyYWN0aW9uLmRvd25Qb2ludGVyLFxuICAgICAgICAgICAgcHJldkV2ZW50ICAgICAgICAgICAgIDogaW50ZXJhY3Rpb24ucHJldkV2ZW50LFxuXG4gICAgICAgICAgICBJbnRlcmFjdGFibGUgICAgICAgICAgOiBJbnRlcmFjdGFibGUsXG4gICAgICAgICAgICBpbnRlcmFjdGFibGVzICAgICAgICAgOiBpbnRlcmFjdGFibGVzLFxuICAgICAgICAgICAgcG9pbnRlcklzRG93biAgICAgICAgIDogaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93bixcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zICAgICAgICA6IGRlZmF1bHRPcHRpb25zLFxuICAgICAgICAgICAgZGVmYXVsdEFjdGlvbkNoZWNrZXIgIDogZGVmYXVsdEFjdGlvbkNoZWNrZXIsXG5cbiAgICAgICAgICAgIGFjdGlvbkN1cnNvcnMgICAgICAgICA6IGFjdGlvbkN1cnNvcnMsXG4gICAgICAgICAgICBkcmFnTW92ZSAgICAgICAgICAgICAgOiBsaXN0ZW5lcnMuZHJhZ01vdmUsXG4gICAgICAgICAgICByZXNpemVNb3ZlICAgICAgICAgICAgOiBsaXN0ZW5lcnMucmVzaXplTW92ZSxcbiAgICAgICAgICAgIGdlc3R1cmVNb3ZlICAgICAgICAgICA6IGxpc3RlbmVycy5nZXN0dXJlTW92ZSxcbiAgICAgICAgICAgIHBvaW50ZXJVcCAgICAgICAgICAgICA6IGxpc3RlbmVycy5wb2ludGVyVXAsXG4gICAgICAgICAgICBwb2ludGVyRG93biAgICAgICAgICAgOiBsaXN0ZW5lcnMucG9pbnRlckRvd24sXG4gICAgICAgICAgICBwb2ludGVyTW92ZSAgICAgICAgICAgOiBsaXN0ZW5lcnMucG9pbnRlck1vdmUsXG4gICAgICAgICAgICBwb2ludGVySG92ZXIgICAgICAgICAgOiBsaXN0ZW5lcnMucG9pbnRlckhvdmVyLFxuXG4gICAgICAgICAgICBldmVudFR5cGVzICAgICAgICAgICAgOiBldmVudFR5cGVzLFxuXG4gICAgICAgICAgICBldmVudHMgICAgICAgICAgICAgICAgOiBldmVudHMsXG4gICAgICAgICAgICBnbG9iYWxFdmVudHMgICAgICAgICAgOiBnbG9iYWxFdmVudHMsXG4gICAgICAgICAgICBkZWxlZ2F0ZWRFdmVudHMgICAgICAgOiBkZWxlZ2F0ZWRFdmVudHMsXG5cbiAgICAgICAgICAgIHByZWZpeGVkUHJvcFJFcyAgICAgICA6IHByZWZpeGVkUHJvcFJFc1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvLyBleHBvc2UgdGhlIGZ1bmN0aW9ucyB1c2VkIHRvIGNhbGN1bGF0ZSBtdWx0aS10b3VjaCBwcm9wZXJ0aWVzXG4gICAgaW50ZXJhY3QuZ2V0UG9pbnRlckF2ZXJhZ2UgPSBwb2ludGVyQXZlcmFnZTtcbiAgICBpbnRlcmFjdC5nZXRUb3VjaEJCb3ggICAgID0gdG91Y2hCQm94O1xuICAgIGludGVyYWN0LmdldFRvdWNoRGlzdGFuY2UgPSB0b3VjaERpc3RhbmNlO1xuICAgIGludGVyYWN0LmdldFRvdWNoQW5nbGUgICAgPSB0b3VjaEFuZ2xlO1xuXG4gICAgaW50ZXJhY3QuZ2V0RWxlbWVudFJlY3QgICAgICAgICA9IGdldEVsZW1lbnRSZWN0O1xuICAgIGludGVyYWN0LmdldEVsZW1lbnRDbGllbnRSZWN0ICAgPSBnZXRFbGVtZW50Q2xpZW50UmVjdDtcbiAgICBpbnRlcmFjdC5tYXRjaGVzU2VsZWN0b3IgICAgICAgID0gbWF0Y2hlc1NlbGVjdG9yO1xuICAgIGludGVyYWN0LmNsb3Nlc3QgICAgICAgICAgICAgICAgPSBjbG9zZXN0O1xuXG4gICAgLypcXFxuICAgICAqIGludGVyYWN0Lm1hcmdpblxuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgKiBEZXByZWNhdGVkLiBVc2UgYGludGVyYWN0KHRhcmdldCkucmVzaXphYmxlKHsgbWFyZ2luOiBudW1iZXIgfSk7YCBpbnN0ZWFkLlxuICAgICAqIFJldHVybnMgb3Igc2V0cyB0aGUgbWFyZ2luIGZvciBhdXRvY2hlY2sgcmVzaXppbmcgdXNlZCBpblxuICAgICAqIEBJbnRlcmFjdGFibGUuZ2V0QWN0aW9uLiBUaGF0IGlzIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBib3R0b20gYW5kIHJpZ2h0XG4gICAgICogZWRnZXMgb2YgYW4gZWxlbWVudCBjbGlja2luZyBpbiB3aGljaCB3aWxsIHN0YXJ0IHJlc2l6aW5nXG4gICAgICpcbiAgICAgLSBuZXdWYWx1ZSAobnVtYmVyKSAjb3B0aW9uYWxcbiAgICAgPSAobnVtYmVyIHwgaW50ZXJhY3QpIFRoZSBjdXJyZW50IG1hcmdpbiB2YWx1ZSBvciBpbnRlcmFjdFxuICAgIFxcKi9cbiAgICBpbnRlcmFjdC5tYXJnaW4gPSB3YXJuT25jZShmdW5jdGlvbiAobmV3dmFsdWUpIHtcbiAgICAgICAgaWYgKGlzTnVtYmVyKG5ld3ZhbHVlKSkge1xuICAgICAgICAgICAgbWFyZ2luID0gbmV3dmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFyZ2luO1xuICAgIH0sXG4gICAgJ2ludGVyYWN0Lm1hcmdpbiBpcyBkZXByZWNhdGVkLiBVc2UgaW50ZXJhY3QodGFyZ2V0KS5yZXNpemFibGUoeyBtYXJnaW46IG51bWJlciB9KTsgaW5zdGVhZC4nKSA7XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3Quc3VwcG9ydHNUb3VjaFxuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgPSAoYm9vbGVhbikgV2hldGhlciBvciBub3QgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdG91Y2ggaW5wdXRcbiAgICBcXCovXG4gICAgaW50ZXJhY3Quc3VwcG9ydHNUb3VjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRzVG91Y2g7XG4gICAgfTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5zdXBwb3J0c1BvaW50ZXJFdmVudFxuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgPSAoYm9vbGVhbikgV2hldGhlciBvciBub3QgdGhlIGJyb3dzZXIgc3VwcG9ydHMgUG9pbnRlckV2ZW50c1xuICAgIFxcKi9cbiAgICBpbnRlcmFjdC5zdXBwb3J0c1BvaW50ZXJFdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRzUG9pbnRlckV2ZW50O1xuICAgIH07XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3Quc3RvcFxuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgKiBDYW5jZWxzIGFsbCBpbnRlcmFjdGlvbnMgKGVuZCBldmVudHMgYXJlIG5vdCBmaXJlZClcbiAgICAgKlxuICAgICAtIGV2ZW50IChFdmVudCkgQW4gZXZlbnQgb24gd2hpY2ggdG8gY2FsbCBwcmV2ZW50RGVmYXVsdCgpXG4gICAgID0gKG9iamVjdCkgaW50ZXJhY3RcbiAgICBcXCovXG4gICAgaW50ZXJhY3Quc3RvcCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gaW50ZXJhY3Rpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpbnRlcmFjdGlvbnNbaV0uc3RvcChldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgfTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5keW5hbWljRHJvcFxuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciB0aGUgZGltZW5zaW9ucyBvZiBkcm9wem9uZSBlbGVtZW50cyBhcmVcbiAgICAgKiBjYWxjdWxhdGVkIG9uIGV2ZXJ5IGRyYWdtb3ZlIG9yIG9ubHkgb24gZHJhZ3N0YXJ0IGZvciB0aGUgZGVmYXVsdFxuICAgICAqIGRyb3BDaGVja2VyXG4gICAgICpcbiAgICAgLSBuZXdWYWx1ZSAoYm9vbGVhbikgI29wdGlvbmFsIFRydWUgdG8gY2hlY2sgb24gZWFjaCBtb3ZlLiBGYWxzZSB0byBjaGVjayBvbmx5IGJlZm9yZSBzdGFydFxuICAgICA9IChib29sZWFuIHwgaW50ZXJhY3QpIFRoZSBjdXJyZW50IHNldHRpbmcgb3IgaW50ZXJhY3RcbiAgICBcXCovXG4gICAgaW50ZXJhY3QuZHluYW1pY0Ryb3AgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKGlzQm9vbChuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIC8vaWYgKGRyYWdnaW5nICYmIGR5bmFtaWNEcm9wICE9PSBuZXdWYWx1ZSAmJiAhbmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvL2NhbGNSZWN0cyhkcm9wem9uZXMpO1xuICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgIGR5bmFtaWNEcm9wID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHluYW1pY0Ryb3A7XG4gICAgfTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5wb2ludGVyTW92ZVRvbGVyYW5jZVxuICAgICBbIG1ldGhvZCBdXG4gICAgICogUmV0dXJucyBvciBzZXRzIHRoZSBkaXN0YW5jZSB0aGUgcG9pbnRlciBtdXN0IGJlIG1vdmVkIGJlZm9yZSBhbiBhY3Rpb25cbiAgICAgKiBzZXF1ZW5jZSBvY2N1cnMuIFRoaXMgYWxzbyBhZmZlY3RzIHRvbGVyYW5jZSBmb3IgdGFwIGV2ZW50cy5cbiAgICAgKlxuICAgICAtIG5ld1ZhbHVlIChudW1iZXIpICNvcHRpb25hbCBUaGUgbW92ZW1lbnQgZnJvbSB0aGUgc3RhcnQgcG9zaXRpb24gbXVzdCBiZSBncmVhdGVyIHRoYW4gdGhpcyB2YWx1ZVxuICAgICA9IChudW1iZXIgfCBJbnRlcmFjdGFibGUpIFRoZSBjdXJyZW50IHNldHRpbmcgb3IgaW50ZXJhY3RcbiAgICBcXCovXG4gICAgaW50ZXJhY3QucG9pbnRlck1vdmVUb2xlcmFuY2UgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKGlzTnVtYmVyKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgcG9pbnRlck1vdmVUb2xlcmFuY2UgPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9pbnRlck1vdmVUb2xlcmFuY2U7XG4gICAgfTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5tYXhJbnRlcmFjdGlvbnNcbiAgICAgWyBtZXRob2QgXVxuICAgICAqKlxuICAgICAqIFJldHVybnMgb3Igc2V0cyB0aGUgbWF4aW11bSBudW1iZXIgb2YgY29uY3VycmVudCBpbnRlcmFjdGlvbnMgYWxsb3dlZC5cbiAgICAgKiBCeSBkZWZhdWx0IG9ubHkgMSBpbnRlcmFjdGlvbiBpcyBhbGxvd2VkIGF0IGEgdGltZSAoZm9yIGJhY2t3YXJkc1xuICAgICAqIGNvbXBhdGliaWxpdHkpLiBUbyBhbGxvdyBtdWx0aXBsZSBpbnRlcmFjdGlvbnMgb24gdGhlIHNhbWUgSW50ZXJhY3RhYmxlc1xuICAgICAqIGFuZCBlbGVtZW50cywgeW91IG5lZWQgdG8gZW5hYmxlIGl0IGluIHRoZSBkcmFnZ2FibGUsIHJlc2l6YWJsZSBhbmRcbiAgICAgKiBnZXN0dXJhYmxlIGAnbWF4J2AgYW5kIGAnbWF4UGVyRWxlbWVudCdgIG9wdGlvbnMuXG4gICAgICoqXG4gICAgIC0gbmV3VmFsdWUgKG51bWJlcikgI29wdGlvbmFsIEFueSBudW1iZXIuIG5ld1ZhbHVlIDw9IDAgbWVhbnMgbm8gaW50ZXJhY3Rpb25zLlxuICAgIFxcKi9cbiAgICBpbnRlcmFjdC5tYXhJbnRlcmFjdGlvbnMgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKGlzTnVtYmVyKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgbWF4SW50ZXJhY3Rpb25zID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1heEludGVyYWN0aW9ucztcbiAgICB9O1xuXG4gICAgaW50ZXJhY3QuY3JlYXRlU25hcEdyaWQgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXRYID0gMCxcbiAgICAgICAgICAgICAgICBvZmZzZXRZID0gMDtcblxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGdyaWQub2Zmc2V0KSkge1xuICAgICAgICAgICAgICAgIG9mZnNldFggPSBncmlkLm9mZnNldC54O1xuICAgICAgICAgICAgICAgIG9mZnNldFkgPSBncmlkLm9mZnNldC55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZ3JpZHggPSBNYXRoLnJvdW5kKCh4IC0gb2Zmc2V0WCkgLyBncmlkLngpLFxuICAgICAgICAgICAgICAgIGdyaWR5ID0gTWF0aC5yb3VuZCgoeSAtIG9mZnNldFkpIC8gZ3JpZC55KSxcblxuICAgICAgICAgICAgICAgIG5ld1ggPSBncmlkeCAqIGdyaWQueCArIG9mZnNldFgsXG4gICAgICAgICAgICAgICAgbmV3WSA9IGdyaWR5ICogZ3JpZC55ICsgb2Zmc2V0WTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBuZXdYLFxuICAgICAgICAgICAgICAgIHk6IG5ld1ksXG4gICAgICAgICAgICAgICAgcmFuZ2U6IGdyaWQucmFuZ2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGVuZEFsbEludGVyYWN0aW9ucyAoZXZlbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnRlcmFjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGludGVyYWN0aW9uc1tpXS5wb2ludGVyRW5kKGV2ZW50LCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW5Ub0RvY3VtZW50IChkb2MpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5zKGRvY3VtZW50cywgZG9jKSkgeyByZXR1cm47IH1cblxuICAgICAgICB2YXIgd2luID0gZG9jLmRlZmF1bHRWaWV3IHx8IGRvYy5wYXJlbnRXaW5kb3c7XG5cbiAgICAgICAgLy8gYWRkIGRlbGVnYXRlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGZvciAodmFyIGV2ZW50VHlwZSBpbiBkZWxlZ2F0ZWRFdmVudHMpIHtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCBldmVudFR5cGUsIGRlbGVnYXRlTGlzdGVuZXIpO1xuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsIGV2ZW50VHlwZSwgZGVsZWdhdGVVc2VDYXB0dXJlLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdXBwb3J0c1BvaW50ZXJFdmVudCkge1xuICAgICAgICAgICAgaWYgKFBvaW50ZXJFdmVudCA9PT0gd2luLk1TUG9pbnRlckV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcEV2ZW50VHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVwOiAnTVNQb2ludGVyVXAnLCBkb3duOiAnTVNQb2ludGVyRG93bicsIG92ZXI6ICdtb3VzZW92ZXInLFxuICAgICAgICAgICAgICAgICAgICBvdXQ6ICdtb3VzZW91dCcsIG1vdmU6ICdNU1BvaW50ZXJNb3ZlJywgY2FuY2VsOiAnTVNQb2ludGVyQ2FuY2VsJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcEV2ZW50VHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVwOiAncG9pbnRlcnVwJywgZG93bjogJ3BvaW50ZXJkb3duJywgb3ZlcjogJ3BvaW50ZXJvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3V0OiAncG9pbnRlcm91dCcsIG1vdmU6ICdwb2ludGVybW92ZScsIGNhbmNlbDogJ3BvaW50ZXJjYW5jZWwnIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCBwRXZlbnRUeXBlcy5kb3duICAsIGxpc3RlbmVycy5zZWxlY3RvckRvd24gKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCBwRXZlbnRUeXBlcy5tb3ZlICAsIGxpc3RlbmVycy5wb2ludGVyTW92ZSAgKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCBwRXZlbnRUeXBlcy5vdmVyICAsIGxpc3RlbmVycy5wb2ludGVyT3ZlciAgKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCBwRXZlbnRUeXBlcy5vdXQgICAsIGxpc3RlbmVycy5wb2ludGVyT3V0ICAgKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCBwRXZlbnRUeXBlcy51cCAgICAsIGxpc3RlbmVycy5wb2ludGVyVXAgICAgKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCBwRXZlbnRUeXBlcy5jYW5jZWwsIGxpc3RlbmVycy5wb2ludGVyQ2FuY2VsKTtcblxuICAgICAgICAgICAgLy8gYXV0b3Njcm9sbFxuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsIHBFdmVudFR5cGVzLm1vdmUsIGxpc3RlbmVycy5hdXRvU2Nyb2xsTW92ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgJ21vdXNlZG93bicsIGxpc3RlbmVycy5zZWxlY3RvckRvd24pO1xuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsICdtb3VzZW1vdmUnLCBsaXN0ZW5lcnMucG9pbnRlck1vdmUgKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAnbW91c2V1cCcgICwgbGlzdGVuZXJzLnBvaW50ZXJVcCAgICk7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgJ21vdXNlb3ZlcicsIGxpc3RlbmVycy5wb2ludGVyT3ZlciApO1xuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsICdtb3VzZW91dCcgLCBsaXN0ZW5lcnMucG9pbnRlck91dCAgKTtcblxuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsICd0b3VjaHN0YXJ0JyAsIGxpc3RlbmVycy5zZWxlY3RvckRvd24gKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAndG91Y2htb3ZlJyAgLCBsaXN0ZW5lcnMucG9pbnRlck1vdmUgICk7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgJ3RvdWNoZW5kJyAgICwgbGlzdGVuZXJzLnBvaW50ZXJVcCAgICApO1xuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsICd0b3VjaGNhbmNlbCcsIGxpc3RlbmVycy5wb2ludGVyQ2FuY2VsKTtcblxuICAgICAgICAgICAgLy8gYXV0b3Njcm9sbFxuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsICdtb3VzZW1vdmUnLCBsaXN0ZW5lcnMuYXV0b1Njcm9sbE1vdmUpO1xuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsICd0b3VjaG1vdmUnLCBsaXN0ZW5lcnMuYXV0b1Njcm9sbE1vdmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnRzLmFkZCh3aW4sICdibHVyJywgZW5kQWxsSW50ZXJhY3Rpb25zKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHdpbi5mcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50RG9jID0gd2luLmZyYW1lRWxlbWVudC5vd25lckRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRXaW5kb3cgPSBwYXJlbnREb2MuZGVmYXVsdFZpZXc7XG5cbiAgICAgICAgICAgICAgICBldmVudHMuYWRkKHBhcmVudERvYyAgICwgJ21vdXNldXAnICAgICAgLCBsaXN0ZW5lcnMucG9pbnRlckVuZCk7XG4gICAgICAgICAgICAgICAgZXZlbnRzLmFkZChwYXJlbnREb2MgICAsICd0b3VjaGVuZCcgICAgICwgbGlzdGVuZXJzLnBvaW50ZXJFbmQpO1xuICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQocGFyZW50RG9jICAgLCAndG91Y2hjYW5jZWwnICAsIGxpc3RlbmVycy5wb2ludGVyRW5kKTtcbiAgICAgICAgICAgICAgICBldmVudHMuYWRkKHBhcmVudERvYyAgICwgJ3BvaW50ZXJ1cCcgICAgLCBsaXN0ZW5lcnMucG9pbnRlckVuZCk7XG4gICAgICAgICAgICAgICAgZXZlbnRzLmFkZChwYXJlbnREb2MgICAsICdNU1BvaW50ZXJVcCcgICwgbGlzdGVuZXJzLnBvaW50ZXJFbmQpO1xuICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQocGFyZW50V2luZG93LCAnYmx1cicgICAgICAgICAsIGVuZEFsbEludGVyYWN0aW9ucyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaW50ZXJhY3Qud2luZG93UGFyZW50RXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZXZlbnQgbmF0aXZlIEhUTUw1IGRyYWcgb24gaW50ZXJhY3QuanMgdGFyZ2V0IGVsZW1lbnRzXG4gICAgICAgIGV2ZW50cy5hZGQoZG9jLCAnZHJhZ3N0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGludGVyYWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChpbnRlcmFjdGlvbi5lbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICYmIChpbnRlcmFjdGlvbi5lbGVtZW50ID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IG5vZGVDb250YWlucyhpbnRlcmFjdGlvbi5lbGVtZW50LCBldmVudC50YXJnZXQpKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQsIGludGVyYWN0aW9uLnRhcmdldCwgaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChldmVudHMudXNlQXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgIC8vIEZvciBJRSdzIGxhY2sgb2YgRXZlbnQjcHJldmVudERlZmF1bHRcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAnc2VsZWN0c3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbnNbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJhY3Rpb24uY3VycmVudEFjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBGb3IgSUUncyBiYWQgZGJsY2xpY2sgZXZlbnQgc2VxdWVuY2VcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAnZGJsY2xpY2snLCBkb09uSW50ZXJhY3Rpb25zKCdpZThEYmxjbGljaycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50cy5wdXNoKGRvYyk7XG4gICAgfVxuXG4gICAgbGlzdGVuVG9Eb2N1bWVudChkb2N1bWVudCk7XG5cbiAgICBmdW5jdGlvbiBpbmRleE9mIChhcnJheSwgdGFyZ2V0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycmF5W2ldID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb250YWlucyAoYXJyYXksIHRhcmdldCkge1xuICAgICAgICByZXR1cm4gaW5kZXhPZihhcnJheSwgdGFyZ2V0KSAhPT0gLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yIChlbGVtZW50LCBzZWxlY3Rvciwgbm9kZUxpc3QpIHtcbiAgICAgICAgaWYgKGllOE1hdGNoZXNTZWxlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIGllOE1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3Rvciwgbm9kZUxpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIC9kZWVwLyBmcm9tIHNlbGVjdG9ycyBpZiBzaGFkb3dET00gcG9seWZpbGwgaXMgdXNlZFxuICAgICAgICBpZiAod2luZG93ICE9PSByZWFsV2luZG93KSB7XG4gICAgICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoL1xcL2RlZXBcXC8vZywgJyAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50W3ByZWZpeGVkTWF0Y2hlc1NlbGVjdG9yXShzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hlc1VwVG8gKGVsZW1lbnQsIHNlbGVjdG9yLCBsaW1pdCkge1xuICAgICAgICB3aGlsZSAoaXNFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50ID0gcGFyZW50RWxlbWVudChlbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRm9yIElFOCdzIGxhY2sgb2YgYW4gRWxlbWVudCNtYXRjaGVzU2VsZWN0b3JcbiAgICAvLyB0YWtlbiBmcm9tIGh0dHA6Ly90YW5hbGluLmNvbS9lbi9ibG9nLzIwMTIvMTIvbWF0Y2hlcy1zZWxlY3Rvci1pZTgvIGFuZCBtb2RpZmllZFxuICAgIGlmICghKHByZWZpeGVkTWF0Y2hlc1NlbGVjdG9yIGluIEVsZW1lbnQucHJvdG90eXBlKSB8fCAhaXNGdW5jdGlvbihFbGVtZW50LnByb3RvdHlwZVtwcmVmaXhlZE1hdGNoZXNTZWxlY3Rvcl0pKSB7XG4gICAgICAgIGllOE1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3RvciwgZWxlbXMpIHtcbiAgICAgICAgICAgIGVsZW1zID0gZWxlbXMgfHwgZWxlbWVudC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbXNbaV0gPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHBvbHlmaWxsXG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGFzdFRpbWUgPSAwLFxuICAgICAgICAgICAgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG5cbiAgICAgICAgZm9yKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICFyZWFsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICAgICAgICByZXFGcmFtZSA9IHJlYWxXaW5kb3dbdmVuZG9yc1t4XSsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgICAgICBjYW5jZWxGcmFtZSA9IHJlYWxXaW5kb3dbdmVuZG9yc1t4XSsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCByZWFsV2luZG93W3ZlbmRvcnNbeF0rJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXFGcmFtZSkge1xuICAgICAgICAgICAgcmVxRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgICAgICB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpLFxuICAgICAgICAgICAgICAgICAgICBpZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sXG4gICAgICAgICAgICAgICAgICB0aW1lVG9DYWxsKTtcbiAgICAgICAgICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjYW5jZWxGcmFtZSkge1xuICAgICAgICAgICAgY2FuY2VsRnJhbWUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpKTtcblxuICAgIC8qIGdsb2JhbCBleHBvcnRzOiB0cnVlLCBtb2R1bGUsIGRlZmluZSAqL1xuXG4gICAgLy8gaHR0cDovL2RvY3VtZW50Y2xvdWQuZ2l0aHViLmlvL3VuZGVyc2NvcmUvZG9jcy91bmRlcnNjb3JlLmh0bWwjc2VjdGlvbi0xMVxuICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBpbnRlcmFjdDtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRzLmludGVyYWN0ID0gaW50ZXJhY3Q7XG4gICAgfVxuICAgIC8vIEFNRFxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoJ2ludGVyYWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVhbFdpbmRvdy5pbnRlcmFjdCA9IGludGVyYWN0O1xuICAgIH1cblxufSAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCc/IHVuZGVmaW5lZCA6IHdpbmRvdykpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaW50ZXJhY3QuanMvaW50ZXJhY3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEBmaWxlcyDkv53or4Hnv7vor5Hnqpflj6PmgLvmmK/lnKjmtY/op4jlmajop4blj6PlhoVcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoIHN0ICkge1xuICAvKipcbiAgICogQHByb3Age051bWJlcn0gd2lkdGggLSDlhYPntKDnmoTlrr3luqZcbiAgICogQHByb3Age051bWJlcn0gaGVpZ2h0IC0g5YWD57Sg55qE6auY5bqmXG4gICAqIEBwcm9wIHtOdW1iZXJ9IHRvcCAtIOWFg+e0oOeahOS4iui+uee6v+i3neinhuWPo+eahOS4iui+ueeahOi3neemu++8jOiLpeS4uui0n+aVsOWImeivtOaYjui2heWHuuinhuWPo1xuICAgKiBAcHJvcCB7TnVtYmVyfSBsZWZ0IC0g5YWD57Sg55qE5bem6L6557q/6Led6KeG5Y+j55qE5bem6L6555qE6Led56a777yM6Iul5Li66LSf5pWw5YiZ6K+05piO6LaF5Ye66KeG5Y+jXG4gICAqIEBwcm9wIHtOdW1iZXJ9IHJpZ2h0IC0g5YWD57Sg55qE5Y+z6L6557q/6Led6KeG5Y+j55qEKirlt6YqKui+ueeahOi3neemu++8jOWNsyBsZWZ0ICsgd2lkdGjvvIzoi6UgcmlnaHQgLSB3aW5kb3cuaW5uZXJXaWR0aCA+IDAg5YiZ6K+05piO6LaF5Ye66KeG5Y+jXG4gICAqIEBwcm9wIHtOdW1iZXJ9IGJvdHRvbSAtIOWFg+e0oOeahOW6lei+uee6v+i3neinhuWPo+eahCoq5LiKKirovrnnmoTot53nprvvvIzljbMgdG9wICsgaGVpZ2h077yM6IulIGJvdHRvbSAtIHdpbmRvdy5pbm5lckhlaWdodCA+IDAg5YiZ6K+05piO6LaF5Ye66KeG5Y+jXG4gICAqIEB0eXBlIHtDbGllbnRSZWN0fVxuICAgKi9cbiAgY29uc3QgcmVjdCA9IHN0LiRlbHMuc3RCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgLFxuICAgIHtib3hQb3N9ID0gc3Q7XG5cbiAgLy8g5bem6L65XG4gIGNvbnN0IHtsZWZ0fSA9IHJlY3Q7XG4gIGlmICggbGVmdCA8IDAgKSB7XG4gICAgYm94UG9zLnRyYW5zbGF0ZVggLT0gbGVmdDtcbiAgfVxuXG4gIC8vIOS4iui+uVxuICBjb25zdCB7dG9wfSA9IHJlY3Q7XG4gIGlmICggdG9wIDwgMCApIHtcbiAgICBib3hQb3MudHJhbnNsYXRlWSAtPSB0b3A7XG4gIH1cblxuICAvLyDlj7PovrlcbiAgY29uc3QgcmlnaHREaWZmID0gcmVjdC5yaWdodCAtIHdpbmRvdy5pbm5lcldpZHRoO1xuICBpZiAoIHJpZ2h0RGlmZiA+IDAgKSB7XG4gICAgYm94UG9zLnRyYW5zbGF0ZVggLT0gcmlnaHREaWZmO1xuICB9XG5cbiAgLy8g5LiL6L65XG4gIGNvbnN0IGJvdHRvbURpZmYgPSByZWN0LmJvdHRvbSAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgaWYgKCBib3R0b21EaWZmID4gMCApIHtcbiAgICBib3hQb3MudHJhbnNsYXRlWSAtPSBib3R0b21EaWZmO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL3N0L3Jlc3RyaWN0LmpzIiwiLyoqXG4gKiBAZmlsZXMg5bCG57+76K+R56qX5Y+j5LiO5omp5bGV55qEIHN0b3JhZ2Ug4oCc57uR5a6a4oCd6LW35p2lXG4gKi9cblxuaW1wb3J0IHtpc0hvc3RFbmFibGVkfSBmcm9tICcuLi8uLi9wdWJsaWMvdXRpbCc7XG5pbXBvcnQgd2F0Y2ggZnJvbSAnLi4vLi4vcHVibGljL3N0b3JhZ2Utd2F0Y2hlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICggc3QgKSB7XG4gIGxldCBkZWZBcGkgPSAnJztcblxuICBmdW5jdGlvbiBvbkFmdGVyVHJhbnNsYXRlKCkge1xuICAgIGNvbnN0IHtxdWVyeX0gPSB0aGlzICxcbiAgICAgIHt0ZXh0fSA9IHF1ZXJ5O1xuXG4gICAgLy8gYXV0b1BsYXkg5bGe5oCn5piv5ZyoIG9uU3RvcmFnZUNoYW5nZWQg55qE5pe25YCZ5omp5bGV6L+b5Y6755qEXG4gICAgaWYgKCB0aGlzLmF1dG9QbGF5ICYmIHRleHQubGVuZ3RoIDwgNTAgKSB7XG4gICAgICB0aGlzLnBsYXkoIHRleHQgLCBxdWVyeS5mcm9tICk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gb25TdG9yYWdlQ2hhbmdlZCggaXRlbXMgKSB7XG4gICAgY29uc3Qge2RlZmF1bHRBcGksZXhjbHVkZURvbWFpbnN9ID0gaXRlbXM7XG5cbiAgICBpZiAoIGRlZmF1bHRBcGkgKSB7XG4gICAgICBkZWZBcGkgPSBkZWZhdWx0QXBpO1xuICAgICAgaWYgKCAhc3QuYm94UG9zLnNob3cgKSB7XG4gICAgICAgIHN0LnF1ZXJ5LmFwaSA9IGRlZkFwaTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSBpdGVtcy5kZWZhdWx0QXBpO1xuICAgIH1cblxuICAgIGlmICggaXRlbXMuZGlzYWJsZVNlbGVjdGlvbiApIHtcbiAgICAgIHN0LnNlbGVjdGlvbiA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoIGV4Y2x1ZGVEb21haW5zICkge1xuICAgICAgc3Quc2VsZWN0aW9uID0gYXdhaXQgaXNIb3N0RW5hYmxlZCggbG9jYXRpb24gLCBleGNsdWRlRG9tYWlucyApO1xuICAgICAgZGVsZXRlIGl0ZW1zLmV4Y2x1ZGVEb21haW5zO1xuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24oIHN0ICwgaXRlbXMgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQm94UG9zU2hvdyggaXNTaG93ICkge1xuICAgIGlmICggIWlzU2hvdyApIHtcbiAgICAgIHRoaXMucXVlcnkuYXBpID0gZGVmQXBpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0aW5nJyApIHtcbiAgICBzdC5fX29uQm94U2hvdyA9IG9uQm94UG9zU2hvdztcbiAgICBzdC5fX2FmdGVyVHMgPSBvbkFmdGVyVHJhbnNsYXRlO1xuICAgIHN0Ll9fb25TdG9yYWdlQ2hhbmdlZCA9IG9uU3RvcmFnZUNoYW5nZWQ7XG4gIH0gZWxzZSB7XG4gICAgc3QuJHdhdGNoKCAnYm94UG9zLnNob3cnICwgb25Cb3hQb3NTaG93ICk7XG4gICAgc3QuJG9uKCAnYWZ0ZXIgdHJhbnNsYXRlJyAsIG9uQWZ0ZXJUcmFuc2xhdGUgKTtcblxuICAgIHdhdGNoKCBbXG4gICAgICAnc2hvd1NoYW5iYXknLFxuICAgICAgJ2lnbm9yZUNoaW5lc2UnICwgJ2lnbm9yZU51bUxpa2UnICwgJ3Nob3dCdG4nICwgJ2Rpc2FibGVTZWxlY3Rpb24nICxcbiAgICAgICduZWVkQ3RybCcgLCAnZGVmYXVsdEFwaScgLCAnZXhjbHVkZURvbWFpbnMnICwgJ2F1dG9QbGF5J1xuICAgIF0gLCBvblN0b3JhZ2VDaGFuZ2VkICk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvc3Qvc3RvcmFnZS5qcyIsIi8qKlxuICogQGZpbGVzIOWPkemAgee/u+ivkee7k+aenOWxleekuuS6i+S7tuWIsOiwt+atjOWIhuaekFxuICovXG5cbmltcG9ydCBjbGllbnQgZnJvbSAnLi4vY2xpZW50JztcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGdhKCAuLi5hcmdzICkge1xuICB0cnkge1xuICAgIGNsaWVudC5zZW5kKCAnZ2EnICwgYXJncyApO1xuICB9XG4gIGNhdGNoICggZSApIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICggc3QgKSB7XG4gICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBzdC4kd2F0Y2goICdib3hQb3Muc2hvdycgLCAoIHZhbHVlICk9PiB7XG4gICAgaWYgKCB2YWx1ZSApIHtcbiAgICAgIGdhKCAnc2VuZCcgLCAnZXZlbnQnICwgJ+e/u+ivkeeql+WPoycgLCAn5bGV56S6JyApO1xuICAgIH1cbiAgfSApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9zdC9nYS5qcyIsIi8qKlxuICogQGZpbGVzIOW9k+eUqOaIt+aMieS4iyBlc2Mg6ZSu5pe26ZqQ6JeP57+76K+R56qX5Y+jXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCBzdCApIHtcbiAgZnVuY3Rpb24gb25LZXlVcCggZSApIHtcbiAgICBpZiAoIDI3ID09PSBlLmtleUNvZGUgKSB7IC8vIGtleUNvZGUg6Jm954S25bey6KKr5byD55So77yM5L2G55uu5YmN5Yeg5LmO5rKh5pyJ5rWP6KeI5Zmo5a6e546w5LqGIGUua2V5XG4gICAgICBzdC5ib3hQb3Muc2hvdyA9IHN0LmJ0blBvcy5zaG93ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3RpbmcnICkge1xuICAgIHN0Ll9fb25LZXlVcCA9IG9uS2V5VXA7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJyAsIG9uS2V5VXAgKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9zdC9oaWRlLW9uLWVzYy5qcyIsIi8qKlxuICog5YaF5a656ISa5pys5ZCM5pe25Lmf5piv5LiA5LiqIFNlcnZlciDnq6/vvIznlKjmnaXmiafooYzmianlsZXnqIvluo/lj5HpgIHov4fmnaXnmoTlkb3ku6RcbiAqL1xuXG5pbXBvcnQge2NyZWF0ZVNlcnZlcn0gZnJvbSAnY29ubmVjdC5pbyc7XG5pbXBvcnQgc3QgZnJvbSAnLi9zdCc7XG5cbmNvbnN0IHNlcnZlciA9IGNyZWF0ZVNlcnZlcigpO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuLyoqXG4gKiDlsIboh6rlt7HnmoQgbG9jYXRpb24g5a+56LGh5oql5ZGK57uZ5ZCO5Y+wXG4gKiBAcGFyYW0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gb25HZXRMb2NhdGlvbiggZGF0YSAsIHJlc29sdmUgKSB7XG4gIGlmICggc2VsZiA9PT0gdG9wICkge1xuICAgIHJlc29sdmUoIEpTT04ucGFyc2UoIEpTT04uc3RyaW5naWZ5KCBsb2NhdGlvbiApICkgKTtcbiAgfVxufVxuXG4vKipcbiAqIOaOpeaUtuWIsOe/u+ivkeWRveS7pOaXtu+8jOe/u+ivkee9kemhteS4iueahOaLluiTnVxuICovXG5leHBvcnQgZnVuY3Rpb24gb25UcmFuc2xhdGUoKSB7XG4gIHN0LnF1ZXJ5LnRleHQgPSBnZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuICBzdC5zYWZlVHJhbnNsYXRlKCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3RpbmcnICkge1xuICBzZXJ2ZXIub24oICdjb25uZWN0JyAsICggY2xpZW50ICk9PiB7XG4gICAgY2xpZW50Lm9uKCAnZ2V0IGxvY2F0aW9uJyAsIG9uR2V0TG9jYXRpb24gKTtcbiAgICBjbGllbnQub24oICd0cmFuc2xhdGUnICwgb25UcmFuc2xhdGUgKTtcbiAgfSApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXJ2ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL3NlcnZlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=