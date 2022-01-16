webpackJsonp([1],{

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  // 谷歌分析的脚本会替换全局变量 window.ga,所以每次使用时都得用 `window.ga` 而不是本地变量 `ga`
  window.ga.apply(null, arguments);
};

/**
 * @files 谷歌分析
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/
 */

/* istanbul ignore next */
if (false) {
  window.GoogleAnalyticsObject = 'ga';

  var ga = function ga() {
    ga.q.push(arguments);
  };

  ga.q = [];
  ga.l = Date.now();

  ga('create', 'UA-43276752-4', 'auto');
  ga('set', 'checkProtocolTask', null);
  window.ga = ga;

  // const script = document.createElement( 'script' );
  // script.src = 'https://www.google-analytics.com/analytics.js';
  // script.async = true;
  // document.body.appendChild( script );
} else {
  window.ga = function () {};
}

;

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = undefined;
exports.write = write;
exports.read = read;

var _util = __webpack_require__(127);

var input = exports.input = void 0;

/**
 * input 应该在第一次调用 write 或者 read 时才初始化.
 * 这是因为当我使用 new Vue({el:'body'}) 时,body 下的内容都会被清空
 */
/**
 * @files 复制、粘贴的模块，不能在内容脚本中运行。
 */

function initInput() {
  initInput = _util.noop;
  exports.input = input = document.createElement('input');
  input.style.position = 'absolute';
  input.style.top = '-99999px';
  document.body.appendChild(input);
}

/**
 * 将文本复制进剪切板
 * @param {String} text
 * @returns {*}
 */
function write(text) {
  initInput();
  input.value = text;
  input.select();
  document.execCommand('copy');
}

/**
 * 返回剪切板中的文本内容
 * @returns {String}
 */
function read() {
  initInput();
  input.value = '';
  input.focus();
  document.execCommand('paste');
  return input.value;
}

/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(185);

__webpack_require__(511);

__webpack_require__(513);

var _ga = __webpack_require__(190);

var _ga2 = _interopRequireDefault(_ga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ga2.default)('set', 'page', '/popup/index.html');
(0, _ga2.default)('send', 'pageview');

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(512);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(184)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/dist/cjs.js??ref--4-2!./popup.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/dist/cjs.js??ref--4-2!./popup.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(183)();
// imports


// module
exports.push([module.i, "body{width:250px;background-color:#32cd74}body .functions{color:#fff;-webkit-user-select:none;user-select:none;padding:5px}body .functions [role=button]:hover{background-color:#fff;color:#000}", ""]);

// exports


/***/ }),

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appOptions = undefined;

var _regenerator = __webpack_require__(79);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(80);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _vue = __webpack_require__(425);

var _vue2 = _interopRequireDefault(_vue);

var _tpl = __webpack_require__(514);

var _tpl2 = _interopRequireDefault(_tpl);

var _chromeCall = __webpack_require__(83);

var _chromeCall2 = _interopRequireDefault(_chromeCall);

var _defaultOptions = __webpack_require__(173);

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _util = __webpack_require__(127);

var _st = __webpack_require__(515);

var _st2 = _interopRequireDefault(_st);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @files 弹出页的 Vue App
 */

var appOptions = exports.appOptions = {
  el: 'app',
  template: _tpl2.default,
  data: {
    _host: null,
    canInject: false,
    enabled: false
  },
  methods: {

    /**
     * 切换是否在当前域名启用。
     * 之所以不用 watch 是因为在 compiled 事件才会初始化 enabled
     */
    switchEnable: function switchEnable() {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _host, enabled, _ref, excludeDomains;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _host = _this.$data._host;
                enabled = _this.enabled = !_this.enabled;
                _context.next = 4;
                return (0, _defaultOptions2.default)('excludeDomains');

              case 4:
                _ref = _context.sent;
                excludeDomains = _ref.excludeDomains;


                if (enabled) {
                  excludeDomains.splice(excludeDomains.indexOf(_host), 1);
                } else {
                  excludeDomains.push(_host);
                }
                return _context.abrupt('return', (0, _chromeCall2.default)('storage.local.set', { excludeDomains: excludeDomains }));

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  },
  components: {
    'st-box': _st2.default
  },
  ready: function ready() {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var locationObj;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _util.getTabLocation)();

            case 2:
              locationObj = _context2.sent;

              if (!locationObj) {
                _context2.next = 9;
                break;
              }

              _this2.$data._host = locationObj.host;
              _this2.canInject = true;
              _context2.next = 8;
              return (0, _util.isHostEnabled)(locationObj);

            case 8:
              _this2.enabled = _context2.sent;

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
};

/* istanbul ignore if */
if (true) {
  // 加快弹出页的打开速度
  window.onload = function () {
    setTimeout(function () {
      return new _vue2.default(appOptions);
    }, 0);
  };
}

/***/ }),

/***/ 514:
/***/ (function(module, exports) {

module.exports = "<section class=\"text-center functions\">\n  <div v-show=\"canInject\">\n    <div role=\"button\" @click=\"switchEnable\" :title=\"'点击切换为'+(enabled?'禁':'启')+'用状态'\">已对当前网站<span v-show=\"enabled\">启用</span><span v-else>禁用</span></div>\n  </div>\n  <div v-else>\n    划词翻译没有权限操作当前网页\n  </div>\n</section>\n<st-box v-ref:st></st-box>\n";

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(79);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(80);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _client = __webpack_require__(516);

var _client2 = _interopRequireDefault(_client);

var _index = __webpack_require__(446);

var _index2 = _interopRequireDefault(_index);

var _defaultOptions = __webpack_require__(173);

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _clipboard = __webpack_require__(439);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @files 弹出页里的 ST 组件
 */

exports.default = _index2.default.extend({
  client: _client2.default,
  compiled: function compiled() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _ref, defaultApi, autoClipboard;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.inline = true;
              _this.showForm = true;
              _context.next = 4;
              return (0, _defaultOptions2.default)(['defaultApi', 'autoClipboard']);

            case 4:
              _ref = _context.sent;
              defaultApi = _ref.defaultApi;
              autoClipboard = _ref.autoClipboard;


              _this.query.api = defaultApi;
              if (autoClipboard) {
                _this.query.text = (0, _clipboard.read)();
                _this.safeTranslate();
              }

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  ready: function ready() {
    var _this2 = this;

    setTimeout(function () {
      return _this2.$els.textarea.focus();
    }, 200);
  }
});

/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = __webpack_require__(125);

exports.default = (0, _connect.createClient)();

/***/ })

},[510]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljL2dhLmpzIiwid2VicGFjazovLy8uL3NyYy9wdWJsaWMvY2xpcGJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9wb3B1cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAvcG9wdXAuc2Nzcz80MzFjIiwid2VicGFjazovLy8uL3NyYy9wb3B1cC9wb3B1cC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9wb3B1cC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwL3RwbC5odG1sIiwid2VicGFjazovLy8uL3NyYy9wb3B1cC9zdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAvY2xpZW50LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImdhIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJwcm9jZXNzIiwiR29vZ2xlQW5hbHl0aWNzT2JqZWN0IiwicSIsInB1c2giLCJsIiwiRGF0ZSIsIm5vdyIsIndyaXRlIiwicmVhZCIsImlucHV0IiwiaW5pdElucHV0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInRleHQiLCJ2YWx1ZSIsInNlbGVjdCIsImV4ZWNDb21tYW5kIiwiZm9jdXMiLCJhcHBPcHRpb25zIiwiZWwiLCJ0ZW1wbGF0ZSIsImRhdGEiLCJfaG9zdCIsImNhbkluamVjdCIsImVuYWJsZWQiLCJtZXRob2RzIiwic3dpdGNoRW5hYmxlIiwiJGRhdGEiLCJleGNsdWRlRG9tYWlucyIsInNwbGljZSIsImluZGV4T2YiLCJjb21wb25lbnRzIiwicmVhZHkiLCJsb2NhdGlvbk9iaiIsImhvc3QiLCJvbmxvYWQiLCJzZXRUaW1lb3V0IiwiZXh0ZW5kIiwiY2xpZW50IiwiY29tcGlsZWQiLCJpbmxpbmUiLCJzaG93Rm9ybSIsImRlZmF1bHRBcGkiLCJhdXRvQ2xpcGJvYXJkIiwicXVlcnkiLCJhcGkiLCJzYWZlVHJhbnNs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QXlDLENBQXpDO0FBQ0QsR0FGRDtBQUdELEM7Ozs7Ozs7QUN6REQsK1Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQVBBOzs7O2tCQVNlLGdCQUFPbUIsTUFBUCxDQUFlO0FBQzVCQywwQkFENEI7QUFFdEJDLFVBRnNCLHNCQUVYO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNmLG9CQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLG9CQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBRmU7QUFBQSxxQkFHNEIsOEJBQVksQ0FBRSxZQUFGLEVBQWlCLGVBQWpCLENBQVosQ0FINUI7O0FBQUE7QUFBQTtBQUdSQyx3QkFIUSxRQUdSQSxVQUhRO0FBR0tDLDJCQUhMLFFBR0tBLGFBSEw7OztBQUtmLG9CQUFLQyxLQUFMLENBQVdDLEdBQVgsR0FBaUJILFVBQWpCO0FBQ0Esa0JBQUtDLGFBQUwsRUFBcUI7QUFDbkIsc0JBQUtDLEtBQUwsQ0FBVy9CLElBQVgsR0FBa0Isc0JBQWxCO0FBQ0Esc0JBQUtpQyxhQUFMO0FBQ0Q7O0FBVGM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVaEIsR0FaMkI7QUFhNUJkLE9BYjRCLG1CQWFwQjtBQUFBOztBQUNOSSxlQUFZO0FBQUEsYUFBSyxPQUFLVyxJQUFMLENBQVVDLFFBQVYsQ0FBbUIvQixLQUFuQixFQUFMO0FBQUEsS0FBWixFQUE4QyxHQUE5QztBQUNEO0FBZjJCLENBQWYsQzs7Ozs7Ozs7Ozs7Ozs7QUNUZjs7a0JBQ2UsNEIiLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlcyDosLfmrYzliIbmnpBcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL1xuICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgKSB7XG4gIHdpbmRvdy5Hb29nbGVBbmFseXRpY3NPYmplY3QgPSAnZ2EnO1xuXG4gIGNvbnN0IGdhID0gZnVuY3Rpb24gKCkge1xuICAgIGdhLnEucHVzaCggYXJndW1lbnRzICk7XG4gIH07XG5cbiAgZ2EucSA9IFtdO1xuICBnYS5sID0gRGF0ZS5ub3coKTtcblxuICBnYSggJ2NyZWF0ZScgLCAnVUEtNDMyNzY3NTItNCcgLCAnYXV0bycgKTtcbiAgZ2EoICdzZXQnICwgJ2NoZWNrUHJvdG9jb2xUYXNrJyAsIG51bGwgKTtcbiAgd2luZG93LmdhID0gZ2E7XG5cbiAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NjcmlwdCcgKTtcbiAgLy8gc2NyaXB0LnNyYyA9ICdodHRwczovL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnO1xuICAvLyBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBzY3JpcHQgKTtcbn0gZWxzZSB7XG4gIHdpbmRvdy5nYSA9IGZ1bmN0aW9uICgpIHt9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIC8vIOiwt+atjOWIhuaekOeahOiEmuacrOS8muabv+aNouWFqOWxgOWPmOmHjyB3aW5kb3cuZ2Es5omA5Lul5q+P5qyh5L2/55So5pe26YO95b6X55SoIGB3aW5kb3cuZ2FgIOiAjOS4jeaYr+acrOWcsOWPmOmHjyBgZ2FgXG4gIHdpbmRvdy5nYS5hcHBseSggbnVsbCAsIGFyZ3VtZW50cyApO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wdWJsaWMvZ2EuanMiLCIvKipcbiAqIEBmaWxlcyDlpI3liLbjgIHnspjotLTnmoTmqKHlnZfvvIzkuI3og73lnKjlhoXlrrnohJrmnKzkuK3ov5DooYzjgIJcbiAqL1xuXG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGxldCBpbnB1dDtcblxuLyoqXG4gKiBpbnB1dCDlupTor6XlnKjnrKzkuIDmrKHosIPnlKggd3JpdGUg5oiW6ICFIHJlYWQg5pe25omN5Yid5aeL5YyWLlxuICog6L+Z5piv5Zug5Li65b2T5oiR5L2/55SoIG5ldyBWdWUoe2VsOidib2R5J30pIOaXtixib2R5IOS4i+eahOWGheWuuemDveS8muiiq+a4heepulxuICovXG5mdW5jdGlvbiBpbml0SW5wdXQoKSB7XG4gIGluaXRJbnB1dCA9IG5vb3A7XG4gIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2lucHV0JyApO1xuICBpbnB1dC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIGlucHV0LnN0eWxlLnRvcCA9ICctOTk5OTlweCc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XG59XG5cbi8qKlxuICog5bCG5paH5pys5aSN5Yi26L+b5Ymq5YiH5p2/XG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZSggdGV4dCApIHtcbiAgaW5pdElucHV0KCk7XG4gIGlucHV0LnZhbHVlID0gdGV4dDtcbiAgaW5wdXQuc2VsZWN0KCk7XG4gIGRvY3VtZW50LmV4ZWNDb21tYW5kKCAnY29weScgKTtcbn1cblxuLyoqXG4gKiDov5Tlm57liarliIfmnb/kuK3nmoTmlofmnKzlhoXlrrlcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkKCkge1xuICBpbml0SW5wdXQoKTtcbiAgaW5wdXQudmFsdWUgPSAnJztcbiAgaW5wdXQuZm9jdXMoKTtcbiAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoICdwYXN0ZScgKTtcbiAgcmV0dXJuIGlucHV0LnZhbHVlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3B1YmxpYy9jbGlwYm9hcmQuanMiLCJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCAnLi9wb3B1cC5zY3NzJztcbmltcG9ydCAnLi9hcHAnO1xuXG5pbXBvcnQgZ2EgZnJvbSAnLi4vcHVibGljL2dhJztcbmdhKCAnc2V0JyAsICdwYWdlJyAsICcvcG9wdXAvaW5kZXguaHRtbCcgKTtcbmdhKCAnc2VuZCcgLCAncGFnZXZpZXcnICk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcG9wdXAvaW5kZXguanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTQtMiEuL3BvcHVwLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTQtMiEuL3BvcHVwLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS00LTIhLi9wb3B1cC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wb3B1cC9wb3B1cC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1MTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keXt3aWR0aDoyNTBweDtiYWNrZ3JvdW5kLWNvbG9yOiMzMmNkNzR9Ym9keSAuZnVuY3Rpb25ze2NvbG9yOiNmZmY7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7cGFkZGluZzo1cHh9Ym9keSAuZnVuY3Rpb25zIFtyb2xlPWJ1dHRvbl06aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmO2NvbG9yOiMwMDB9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS00LTIhLi9zcmMvcG9wdXAvcG9wdXAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNTEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQGZpbGVzIOW8ueWHuumhteeahCBWdWUgQXBwXG4gKi9cblxuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdHBsLmh0bWwnO1xuaW1wb3J0IGNocm9tZUNhbGwgZnJvbSAnY2hyb21lLWNhbGwnO1xuaW1wb3J0IGdldE9wdGlvbnMgZnJvbSAnLi4vcHVibGljL2RlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQge2dldFRhYkxvY2F0aW9uLGlzSG9zdEVuYWJsZWR9IGZyb20gJy4uL3B1YmxpYy91dGlsJztcbmltcG9ydCBTVCBmcm9tICcuL3N0JztcblxuZXhwb3J0IGNvbnN0IGFwcE9wdGlvbnMgPSB7XG4gIGVsIDogJ2FwcCcgLFxuICB0ZW1wbGF0ZSAsXG4gIGRhdGEgOiB7XG4gICAgX2hvc3QgOiBudWxsICxcbiAgICBjYW5JbmplY3QgOiBmYWxzZSAsXG4gICAgZW5hYmxlZCA6IGZhbHNlXG4gIH0gLFxuICBtZXRob2RzIDoge1xuXG4gICAgLyoqXG4gICAgICog5YiH5o2i5piv5ZCm5Zyo5b2T5YmN5Z+f5ZCN5ZCv55So44CCXG4gICAgICog5LmL5omA5Lul5LiN55SoIHdhdGNoIOaYr+WboOS4uuWcqCBjb21waWxlZCDkuovku7bmiY3kvJrliJ3lp4vljJYgZW5hYmxlZFxuICAgICAqL1xuICAgIGFzeW5jIHN3aXRjaEVuYWJsZSgpIHtcbiAgICAgIGNvbnN0IHtfaG9zdH0gPSB0aGlzLiRkYXRhICxcbiAgICAgICAgZW5hYmxlZCA9IHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWQgLFxuICAgICAgICB7ZXhjbHVkZURvbWFpbnN9ID0gYXdhaXQgZ2V0T3B0aW9ucyggJ2V4Y2x1ZGVEb21haW5zJyApO1xuXG4gICAgICBpZiAoIGVuYWJsZWQgKSB7XG4gICAgICAgIGV4Y2x1ZGVEb21haW5zLnNwbGljZSggZXhjbHVkZURvbWFpbnMuaW5kZXhPZiggX2hvc3QgKSAsIDEgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV4Y2x1ZGVEb21haW5zLnB1c2goIF9ob3N0ICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hyb21lQ2FsbCggJ3N0b3JhZ2UubG9jYWwuc2V0JyAsIHsgZXhjbHVkZURvbWFpbnMgfSApO1xuICAgIH1cbiAgfSAsXG4gIGNvbXBvbmVudHMgOiB7XG4gICAgJ3N0LWJveCcgOiBTVFxuICB9ICxcbiAgYXN5bmMgcmVhZHkoKSB7XG4gICAgY29uc3QgbG9jYXRpb25PYmogPSBhd2FpdCBnZXRUYWJMb2NhdGlvbigpO1xuICAgIGlmICggbG9jYXRpb25PYmogKSB7XG4gICAgICB0aGlzLiRkYXRhLl9ob3N0ID0gbG9jYXRpb25PYmouaG9zdDtcbiAgICAgIHRoaXMuY2FuSW5qZWN0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGF3YWl0IGlzSG9zdEVuYWJsZWQoIGxvY2F0aW9uT2JqICk7XG4gICAgfVxuICB9XG59O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0aW5nJyApIHtcbiAgLy8g5Yqg5b+r5by55Ye66aG155qE5omT5byA6YCf5bqmXG4gIHdpbmRvdy5vbmxvYWQgPSAoKT0+IHtcbiAgICBzZXRUaW1lb3V0KCAoKT0+IG5ldyBWdWUoIGFwcE9wdGlvbnMgKSAsIDAgKTtcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wb3B1cC9hcHAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNlY3Rpb24gY2xhc3M9XFxcInRleHQtY2VudGVyIGZ1bmN0aW9uc1xcXCI+XFxuICA8ZGl2IHYtc2hvdz1cXFwiY2FuSW5qZWN0XFxcIj5cXG4gICAgPGRpdiByb2xlPVxcXCJidXR0b25cXFwiIEBjbGljaz1cXFwic3dpdGNoRW5hYmxlXFxcIiA6dGl0bGU9XFxcIifngrnlh7vliIfmjaLkuLonKyhlbmFibGVkPyfnpoEnOiflkK8nKSsn55So54q25oCBJ1xcXCI+5bey5a+55b2T5YmN572R56uZPHNwYW4gdi1zaG93PVxcXCJlbmFibGVkXFxcIj7lkK/nlKg8L3NwYW4+PHNwYW4gdi1lbHNlPuemgeeUqDwvc3Bhbj48L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiB2LWVsc2U+XFxuICAgIOWIkuivjee/u+ivkeayoeacieadg+mZkOaTjeS9nOW9k+WJjee9kemhtVxcbiAgPC9kaXY+XFxuPC9zZWN0aW9uPlxcbjxzdC1ib3ggdi1yZWY6c3Q+PC9zdC1ib3g+XFxuXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcG9wdXAvdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDUxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIEBmaWxlcyDlvLnlh7rpobXph4znmoQgU1Qg57uE5Lu2XG4gKi9cblxuaW1wb3J0IGNsaWVudCBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgV2lkZ2V0IGZyb20gJy4uL3B1YmxpYy93aWRnZXQvaW5kZXgnO1xuaW1wb3J0IGdldE9wdGlvbnMgZnJvbSAnLi4vcHVibGljL2RlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQge3JlYWR9IGZyb20gJy4uL3B1YmxpYy9jbGlwYm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBXaWRnZXQuZXh0ZW5kKCB7XG4gIGNsaWVudCAsXG4gIGFzeW5jIGNvbXBpbGVkKCkge1xuICAgIHRoaXMuaW5saW5lID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dGb3JtID0gdHJ1ZTtcbiAgICBjb25zdCB7ZGVmYXVsdEFwaSAsIGF1dG9DbGlwYm9hcmR9ID0gYXdhaXQgZ2V0T3B0aW9ucyggWyAnZGVmYXVsdEFwaScgLCAnYXV0b0NsaXBib2FyZCcgXSApO1xuXG4gICAgdGhpcy5xdWVyeS5hcGkgPSBkZWZhdWx0QXBpO1xuICAgIGlmICggYXV0b0NsaXBib2FyZCApIHtcbiAgICAgIHRoaXMucXVlcnkudGV4dCA9IHJlYWQoKTtcbiAgICAgIHRoaXMuc2FmZVRyYW5zbGF0ZSgpO1xuICAgIH1cbiAgfSAsXG4gIHJlYWR5KCkge1xuICAgIHNldFRpbWVvdXQoICgpPT4gdGhpcy4kZWxzLnRleHRhcmVhLmZvY3VzKCkgLCAyMDAgKTtcbiAgfVxufSApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BvcHVwL3N0LmpzIiwiaW1wb3J0IHtjcmVhdGVDbGllbnR9IGZyb20gJ2Nvbm5lY3QuaW8nO1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ2xpZW50KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcG9wdXAvY2xpZW50LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==