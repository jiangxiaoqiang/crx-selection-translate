webpackJsonp([3],{

/***/ 188:
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

/***/ 437:
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

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(183);

__webpack_require__(505);

__webpack_require__(506);

var _ga = __webpack_require__(188);

var _ga2 = _interopRequireDefault(_ga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ga2.default)('set', 'page', '/popup/index.html');
(0, _ga2.default)('send', 'pageview');

/***/ }),

/***/ 505:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 506:
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

var _vue = __webpack_require__(423);

var _vue2 = _interopRequireDefault(_vue);

var _tpl = __webpack_require__(507);

var _tpl2 = _interopRequireDefault(_tpl);

var _chromeCall = __webpack_require__(83);

var _chromeCall2 = _interopRequireDefault(_chromeCall);

var _defaultOptions = __webpack_require__(173);

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _util = __webpack_require__(127);

var _st = __webpack_require__(508);

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

/***/ 507:
/***/ (function(module, exports) {

module.exports = "<section class=\"text-center functions\">\n  <div v-show=\"canInject\">\n    <div role=\"button\" @click=\"switchEnable\" :title=\"'点击切换为'+(enabled?'禁':'启')+'用状态'\">已对当前网站<span v-show=\"enabled\">启用</span><span v-else>禁用</span></div>\n  </div>\n  <div v-else>\n    划词翻译没有权限操作当前网页\n  </div>\n</section>\n<st-box v-ref:st></st-box>\n";

/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(79);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(80);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _client = __webpack_require__(509);

var _client2 = _interopRequireDefault(_client);

var _index = __webpack_require__(444);

var _index2 = _interopRequireDefault(_index);

var _defaultOptions = __webpack_require__(173);

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _clipboard = __webpack_require__(437);

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

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = __webpack_require__(125);

exports.default = (0, _connect.createClient)();

/***/ })

},[504]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljL2dhLmpzIiwid2VicGFjazovLy8uL3NyYy9wdWJsaWMvY2xpcGJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9wb3B1cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAvcG9wdXAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wb3B1cC90cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAvc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwL2NsaWVudC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnYSIsImFwcGx5IiwiYXJndW1lbnRzIiwicHJvY2VzcyIsIkdvb2dsZUFuYWx5dGljc09iamVjdCIsInEiLCJwdXNoIiwibCIsIkRhdGUiLCJub3ciLCJ3cml0ZSIsInJlYWQiLCJpbnB1dCIsImluaXRJbnB1dCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJ0ZXh0IiwidmFsdWUiLCJzZWxlY3QiLCJleGVjQ29tbWFuZCIsImZvY3VzIiwiYXBwT3B0aW9ucyIsImVsIiwidGVtcGxhdGUiLCJkYXRhIiwiX2hvc3QiLCJjYW5JbmplY3QiLCJlbmFibGVkIiwibWV0aG9kcyIsInN3aXRjaEVuYWJsZSIsIiRkYXRhIiwiZXhjbHVkZURvbWFpbnMiLCJzcGxpY2UiLCJpbmRleE9mIiwiY29tcG9uZW50cyIsInJlYWR5IiwibG9jYXRpb25PYmoiLCJob3N0Iiwib25sb2FkIiwic2V0VGltZW91dCIsImV4dGVuZCIsImNsaWVudCIsImNvbXBpbGVkIiwiaW5saW5lIiwic2hvd0Zvcm0iLCJkZWZhdWx0QXBpIiwiYXV0b0NsaXBib2FyZCIsInF1ZXJ5IiwiYXBpIiwic2FmZVRyYW5zbGF0ZSIsIiRlbHMiLCJ0ZXh0YXJlYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7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LG9CQUFLQyxLQUFMLENBQVdDLEdBQVgsR0FBaUJILFVBQWpCO0FBQ0Esa0JBQUtDLGFBQUwsRUFBcUI7QUFDbkIsc0JBQUtDLEtBQUwsQ0FBVy9CLElBQVgsR0FBa0Isc0JBQWxCO0FBQ0Esc0JBQUtpQyxhQUFMO0FBQ0Q7O0FBVGM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVaEIsR0FaMkI7QUFhNUJkLE9BYjRCLG1CQWFwQjtBQUFBOztBQUNOSSxlQUFZO0FBQUEsYUFBSyxPQUFLVyxJQUFMLENBQVVDLFFBQVYsQ0FBbUIvQixLQUFuQixFQUFMO0FBQUEsS0FBWixFQUE4QyxHQUE5QztBQUNEO0FBZjJCLENBQWYsQzs7Ozs7Ozs7Ozs7Ozs7QUNUZjs7a0JBQ2UsNEIiLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlcyDosLfmrYzliIbmnpBcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL1xuICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgKSB7XG4gIHdpbmRvdy5Hb29nbGVBbmFseXRpY3NPYmplY3QgPSAnZ2EnO1xuXG4gIGNvbnN0IGdhID0gZnVuY3Rpb24gKCkge1xuICAgIGdhLnEucHVzaCggYXJndW1lbnRzICk7XG4gIH07XG5cbiAgZ2EucSA9IFtdO1xuICBnYS5sID0gRGF0ZS5ub3coKTtcblxuICBnYSggJ2NyZWF0ZScgLCAnVUEtNDMyNzY3NTItNCcgLCAnYXV0bycgKTtcbiAgZ2EoICdzZXQnICwgJ2NoZWNrUHJvdG9jb2xUYXNrJyAsIG51bGwgKTtcbiAgd2luZG93LmdhID0gZ2E7XG5cbiAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NjcmlwdCcgKTtcbiAgLy8gc2NyaXB0LnNyYyA9ICdodHRwczovL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnO1xuICAvLyBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBzY3JpcHQgKTtcbn0gZWxzZSB7XG4gIHdpbmRvdy5nYSA9IGZ1bmN0aW9uICgpIHt9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIC8vIOiwt+atjOWIhuaekOeahOiEmuacrOS8muabv+aNouWFqOWxgOWPmOmHjyB3aW5kb3cuZ2Es5omA5Lul5q+P5qyh5L2/55So5pe26YO95b6X55SoIGB3aW5kb3cuZ2FgIOiAjOS4jeaYr+acrOWcsOWPmOmHjyBgZ2FgXG4gIHdpbmRvdy5nYS5hcHBseSggbnVsbCAsIGFyZ3VtZW50cyApO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wdWJsaWMvZ2EuanMiLCIvKipcbiAqIEBmaWxlcyDlpI3liLbjgIHnspjotLTnmoTmqKHlnZfvvIzkuI3og73lnKjlhoXlrrnohJrmnKzkuK3ov5DooYzjgIJcbiAqL1xuXG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGxldCBpbnB1dDtcblxuLyoqXG4gKiBpbnB1dCDlupTor6XlnKjnrKzkuIDmrKHosIPnlKggd3JpdGUg5oiW6ICFIHJlYWQg5pe25omN5Yid5aeL5YyWLlxuICog6L+Z5piv5Zug5Li65b2T5oiR5L2/55SoIG5ldyBWdWUoe2VsOidib2R5J30pIOaXtixib2R5IOS4i+eahOWGheWuuemDveS8muiiq+a4heepulxuICovXG5mdW5jdGlvbiBpbml0SW5wdXQoKSB7XG4gIGluaXRJbnB1dCA9IG5vb3A7XG4gIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2lucHV0JyApO1xuICBpbnB1dC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIGlucHV0LnN0eWxlLnRvcCA9ICctOTk5OTlweCc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XG59XG5cbi8qKlxuICog5bCG5paH5pys5aSN5Yi26L+b5Ymq5YiH5p2/XG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZSggdGV4dCApIHtcbiAgaW5pdElucHV0KCk7XG4gIGlucHV0LnZhbHVlID0gdGV4dDtcbiAgaW5wdXQuc2VsZWN0KCk7XG4gIGRvY3VtZW50LmV4ZWNDb21tYW5kKCAnY29weScgKTtcbn1cblxuLyoqXG4gKiDov5Tlm57liarliIfmnb/kuK3nmoTmlofmnKzlhoXlrrlcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkKCkge1xuICBpbml0SW5wdXQoKTtcbiAgaW5wdXQudmFsdWUgPSAnJztcbiAgaW5wdXQuZm9jdXMoKTtcbiAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoICdwYXN0ZScgKTtcbiAgcmV0dXJuIGlucHV0LnZhbHVlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3B1YmxpYy9jbGlwYm9hcmQuanMiLCJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCAnLi9wb3B1cC5zY3NzJztcbmltcG9ydCAnLi9hcHAnO1xuXG5pbXBvcnQgZ2EgZnJvbSAnLi4vcHVibGljL2dhJztcbmdhKCAnc2V0JyAsICdwYWdlJyAsICcvcG9wdXAvaW5kZXguaHRtbCcgKTtcbmdhKCAnc2VuZCcgLCAncGFnZXZpZXcnICk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcG9wdXAvaW5kZXguanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BvcHVwL3BvcHVwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDUwNVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIvKipcbiAqIEBmaWxlcyDlvLnlh7rpobXnmoQgVnVlIEFwcFxuICovXG5cbmltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RwbC5odG1sJztcbmltcG9ydCBjaHJvbWVDYWxsIGZyb20gJ2Nocm9tZS1jYWxsJztcbmltcG9ydCBnZXRPcHRpb25zIGZyb20gJy4uL3B1YmxpYy9kZWZhdWx0LW9wdGlvbnMnO1xuaW1wb3J0IHtnZXRUYWJMb2NhdGlvbixpc0hvc3RFbmFibGVkfSBmcm9tICcuLi9wdWJsaWMvdXRpbCc7XG5pbXBvcnQgU1QgZnJvbSAnLi9zdCc7XG5cbmV4cG9ydCBjb25zdCBhcHBPcHRpb25zID0ge1xuICBlbCA6ICdhcHAnICxcbiAgdGVtcGxhdGUgLFxuICBkYXRhIDoge1xuICAgIF9ob3N0IDogbnVsbCAsXG4gICAgY2FuSW5qZWN0IDogZmFsc2UgLFxuICAgIGVuYWJsZWQgOiBmYWxzZVxuICB9ICxcbiAgbWV0aG9kcyA6IHtcblxuICAgIC8qKlxuICAgICAqIOWIh+aNouaYr+WQpuWcqOW9k+WJjeWfn+WQjeWQr+eUqOOAglxuICAgICAqIOS5i+aJgOS7peS4jeeUqCB3YXRjaCDmmK/lm6DkuLrlnKggY29tcGlsZWQg5LqL5Lu25omN5Lya5Yid5aeL5YyWIGVuYWJsZWRcbiAgICAgKi9cbiAgICBhc3luYyBzd2l0Y2hFbmFibGUoKSB7XG4gICAgICBjb25zdCB7X2hvc3R9ID0gdGhpcy4kZGF0YSAsXG4gICAgICAgIGVuYWJsZWQgPSB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkICxcbiAgICAgICAge2V4Y2x1ZGVEb21haW5zfSA9IGF3YWl0IGdldE9wdGlvbnMoICdleGNsdWRlRG9tYWlucycgKTtcblxuICAgICAgaWYgKCBlbmFibGVkICkge1xuICAgICAgICBleGNsdWRlRG9tYWlucy5zcGxpY2UoIGV4Y2x1ZGVEb21haW5zLmluZGV4T2YoIF9ob3N0ICkgLCAxICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBleGNsdWRlRG9tYWlucy5wdXNoKCBfaG9zdCApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNocm9tZUNhbGwoICdzdG9yYWdlLmxvY2FsLnNldCcgLCB7IGV4Y2x1ZGVEb21haW5zIH0gKTtcbiAgICB9XG4gIH0gLFxuICBjb21wb25lbnRzIDoge1xuICAgICdzdC1ib3gnIDogU1RcbiAgfSAsXG4gIGFzeW5jIHJlYWR5KCkge1xuICAgIGNvbnN0IGxvY2F0aW9uT2JqID0gYXdhaXQgZ2V0VGFiTG9jYXRpb24oKTtcbiAgICBpZiAoIGxvY2F0aW9uT2JqICkge1xuICAgICAgdGhpcy4kZGF0YS5faG9zdCA9IGxvY2F0aW9uT2JqLmhvc3Q7XG4gICAgICB0aGlzLmNhbkluamVjdCA9IHRydWU7XG4gICAgICB0aGlzLmVuYWJsZWQgPSBhd2FpdCBpc0hvc3RFbmFibGVkKCBsb2NhdGlvbk9iaiApO1xuICAgIH1cbiAgfVxufTtcblxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdGluZycgKSB7XG4gIC8vIOWKoOW/q+W8ueWHuumhteeahOaJk+W8gOmAn+W6plxuICB3aW5kb3cub25sb2FkID0gKCk9PiB7XG4gICAgc2V0VGltZW91dCggKCk9PiBuZXcgVnVlKCBhcHBPcHRpb25zICkgLCAwICk7XG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcG9wdXAvYXBwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzZWN0aW9uIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciBmdW5jdGlvbnNcXFwiPlxcbiAgPGRpdiB2LXNob3c9XFxcImNhbkluamVjdFxcXCI+XFxuICAgIDxkaXYgcm9sZT1cXFwiYnV0dG9uXFxcIiBAY2xpY2s9XFxcInN3aXRjaEVuYWJsZVxcXCIgOnRpdGxlPVxcXCIn54K55Ye75YiH5o2i5Li6JysoZW5hYmxlZD8n56aBJzon5ZCvJykrJ+eUqOeKtuaAgSdcXFwiPuW3suWvueW9k+WJjee9keermTxzcGFuIHYtc2hvdz1cXFwiZW5hYmxlZFxcXCI+5ZCv55SoPC9zcGFuPjxzcGFuIHYtZWxzZT7npoHnlKg8L3NwYW4+PC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgdi1lbHNlPlxcbiAgICDliJLor43nv7vor5HmsqHmnInmnYPpmZDmk43kvZzlvZPliY3nvZHpobVcXG4gIDwvZGl2Plxcbjwvc2VjdGlvbj5cXG48c3QtYm94IHYtcmVmOnN0Pjwvc3QtYm94PlxcblwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BvcHVwL3RwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA1MDdcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiLyoqXG4gKiBAZmlsZXMg5by55Ye66aG16YeM55qEIFNUIOe7hOS7tlxuICovXG5cbmltcG9ydCBjbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IFdpZGdldCBmcm9tICcuLi9wdWJsaWMvd2lkZ2V0L2luZGV4JztcbmltcG9ydCBnZXRPcHRpb25zIGZyb20gJy4uL3B1YmxpYy9kZWZhdWx0LW9wdGlvbnMnO1xuaW1wb3J0IHtyZWFkfSBmcm9tICcuLi9wdWJsaWMvY2xpcGJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgV2lkZ2V0LmV4dGVuZCgge1xuICBjbGllbnQgLFxuICBhc3luYyBjb21waWxlZCgpIHtcbiAgICB0aGlzLmlubGluZSA9IHRydWU7XG4gICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XG4gICAgY29uc3Qge2RlZmF1bHRBcGkgLCBhdXRvQ2xpcGJvYXJkfSA9IGF3YWl0IGdldE9wdGlvbnMoIFsgJ2RlZmF1bHRBcGknICwgJ2F1dG9DbGlwYm9hcmQnIF0gKTtcblxuICAgIHRoaXMucXVlcnkuYXBpID0gZGVmYXVsdEFwaTtcbiAgICBpZiAoIGF1dG9DbGlwYm9hcmQgKSB7XG4gICAgICB0aGlzLnF1ZXJ5LnRleHQgPSByZWFkKCk7XG4gICAgICB0aGlzLnNhZmVUcmFuc2xhdGUoKTtcbiAgICB9XG4gIH0gLFxuICByZWFkeSgpIHtcbiAgICBzZXRUaW1lb3V0KCAoKT0+IHRoaXMuJGVscy50ZXh0YXJlYS5mb2N1cygpICwgMjAwICk7XG4gIH1cbn0gKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wb3B1cC9zdC5qcyIsImltcG9ydCB7Y3JlYXRlQ2xpZW50fSBmcm9tICdjb25uZWN0LmlvJztcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNsaWVudCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BvcHVwL2NsaWVudC5qcyJdLCJzb3VyY2VSb290IjoiIn0=