/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _huh = __webpack_require__(1);

var _huh2 = _interopRequireDefault(_huh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TICKER = ["AAA.AA", "BB.BB", "CC.C", "DD", "EE.E", "FFF.F", "G.G", "HHHH", "I.III", "J.JJJ"];

/* SUPPORT CLASSES */

var Dispatcher = function () {
    function Dispatcher() {
        _classCallCheck(this, Dispatcher);

        this.listeners = {};
    }

    _createClass(Dispatcher, [{
        key: "addEventListener",
        value: function addEventListener(type, callback) {
            if (!(type in this.listeners)) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(callback);
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(type, callback) {
            if (!(type in this.listeners)) {
                return;
            }
            var stack = this.listeners[type];
            for (var i = 0, l = stack.length; i < l; i++) {
                if (stack[i] === callback) {
                    stack.splice(i, 1);
                    return;
                }
            }
        }
    }, {
        key: "dispatchEvent",
        value: function dispatchEvent(event) {
            if (!(event.type in this.listeners)) {
                return true;
            }
            var stack = this.listeners[event.type];
            event.target = this;
            for (var i = 0, l = stack.length; i < l; i++) {
                stack[i].call(this, event);
            }
            return !event.defaultPrevented;
        }
    }]);

    return Dispatcher;
}();

var et = new Dispatcher();

var Feeder = function () {
    function Feeder() {
        _classCallCheck(this, Feeder);
    }

    _createClass(Feeder, null, [{
        key: "start",
        value: function start() {
            var initial = TICKER.map(function (val) {
                var value = (Math.random() * 1000 | 0) / 100;
                return { name: val, value: value };
            });
            setInterval(function () {
                initial.map(function (val) {
                    var next = Feeder.getNext(val.value);
                    et.dispatchEvent({ type: 'val', value: { name: val.name, value: next } });
                });
            }, 200);
            return initial;
        }
    }, {
        key: "getNext",
        value: function getNext(val) {
            var decision = Math.floor(Math.random() * 100);
            if (decision % 3 == 0) {
                return val + .01;
            }
            if (decision % 4 == 0) {
                return val - .01;
            }
            return val;
        }
    }]);

    return Feeder;
}();

/* VIEW CLASSES */


var Ticker = function () {
    function Ticker(name, value) {
        _classCallCheck(this, Ticker);

        this.name = name;
        this.value = value;
        this.style = "width:80px;float:left;";
        this.lowStyle = "width:80px;float:left;color:#ff0000;fontSize:1.2em;";
        this.highStyle = "width:80px;float:left;color:#0000ff;fontSize:1.2em;";
        this.init();
    }

    _createClass(Ticker, [{
        key: "init",
        value: function init() {
            this.nameComponent = _huh2.default.replace(
                "div",
                { style: this.style },
                this.name
            );
            this.valueCompoenent = _huh2.default.replace(
                "div",
                { style: this.style },
                this.value
            );
        }
    }, {
        key: "applyStyle",
        value: function applyStyle(el, value) {
            var a = value.split(";");
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = a[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var e = _step.value;

                    var b = e.split(":");
                    el.style[b[0]] = b[1];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "updateValue",
        value: function updateValue(val) {
            var _this = this;

            if (this.value != val) {
                if (this.value > val) {
                    this.applyStyle(this.valueCompoenent, this.lowStyle);
                } else if (this.value < val) {
                    this.applyStyle(this.valueCompoenent, this.highStyle);
                }
                this.value = val;
                this.valueCompoenent.innerText = val.toFixed(2);
                setTimeout(function () {
                    _this.valueCompoenent.style.fontSize = '1em';
                }, 100);
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _huh2.default.replace(
                "div",
                { style: "background:#eee;width:160px;padding:5px;" },
                this.nameComponent,
                this.valueCompoenent,
                _huh2.default.replace("br", null)
            );
        }
    }]);

    return Ticker;
}();

var TickerList = function () {
    function TickerList(tickers) {
        var _this2 = this;

        _classCallCheck(this, TickerList);

        this.tickerlist = tickers;

        et.addEventListener('val', function (e) {
            var val = e.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _this2.tickerlist[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var el = _step2.value;

                    if (el.name == val.name) {
                        el.updateValue(val.value);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        });
    }

    _createClass(TickerList, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var t = this.tickerlist.map(function (t, i) {
                var el = new Ticker(t.name, t.value);
                _this3.tickerlist[i] = el;
                return el.render();
            });
            return _huh2.default.replace(
                "div",
                null,
                t
            );
        }
    }]);

    return TickerList;
}();

var Main = function () {
    function Main(tickers) {
        _classCallCheck(this, Main);

        this.tickers = tickers;
    }

    _createClass(Main, [{
        key: "render",
        value: function render() {
            return _huh2.default.replace(
                "div",
                null,
                new TickerList(this.tickers).render()
            );
        }
    }]);

    return Main;
}();

var initial = Feeder.start();

/* ADD TO STAGE */
var main = new Main(initial);

document.getElementById('main').appendChild(main.render());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var huh = function () {
    function huh() {
        _classCallCheck(this, huh);
    }

    _createClass(huh, null, [{
        key: "replace",
        value: function replace(tag, data) {
            var el = document.createElement(tag);
            for (var arg in data) {
                if (typeof data[arg] == "function") {
                    el[arg] = data[arg];
                } else {
                    el.setAttribute(arg, data[arg]);
                }
            }
            var append = function append(el, children) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var ch = _step.value;

                        if (ch && ch.nodeType) {
                            el.appendChild(ch);
                        } else if (typeof ch == "string" || typeof ch == "number") {
                            el.appendChild(document.createTextNode(ch));
                        } else if (ch && ch.length) {
                            append(el, ch);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            };

            for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                children[_key - 2] = arguments[_key];
            }

            append(el, children);
            return el;
        }
    }]);

    return huh;
}();

exports.default = huh;

/***/ })
/******/ ]);