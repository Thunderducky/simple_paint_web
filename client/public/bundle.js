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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/app.js":
/*!***************************!*\
  !*** ./client/src/app.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mathHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mathHelper */ \"./client/src/mathHelper.js\");\n/* harmony import */ var _canvasHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvasHelper */ \"./client/src/canvasHelper.js\");\n\n\nconst $ = (q) =>  document.querySelector(q)\nconst $a = (q) =>  document.querySelectorAll(q)\n\nconst coordEl = $(\"#coords\")\nconst ch = Object(_canvasHelper__WEBPACK_IMPORTED_MODULE_1__[\"canvasHelper\"])($(\"canvas\"))\n\nwindow.brush_color = \"white\"\n\nlet canvasMouseDown = false\nlet isErasing = false\nfunction getMousePos(canvasEl, evt) {\n  const rect = canvasEl.getBoundingClientRect()\n  return Object(_mathHelper__WEBPACK_IMPORTED_MODULE_0__[\"Point\"])(evt.clientX - rect.left, evt.clientY - rect.top)\n}\nch.canvasEl.addEventListener(\"mousedown\", function(e){\n  const location = ch.cellByPos(getMousePos(ch.canvasEl, e))\n  if(isErasing){\n    ch.clearCell(location)\n  } else {\n    ch.colorCell(window.brush_color, location)\n  }\n  canvasMouseDown = true\n})\ndocument.addEventListener(\"mouseup\", function(){\n  canvasMouseDown = false\n})\nch.canvasEl.addEventListener(\"mousemove\", function(e){\n  const location = ch.cellByPos(getMousePos(ch.canvasEl, e))\n  coordEl.textContent = JSON.stringify(location)\n\n  if(canvasMouseDown){\n    if(isErasing){\n      ch.clearCell(location)\n    } else {\n      ch.colorCell(window.brush_color, location)\n    }\n  }\n})\n\n$a(\"#choosable .swatch\").forEach(item => item.addEventListener(\"click\", function(e){\n  //console.log()\n  $(\"#active\").setAttribute(\"style\", \"background: \" + e.currentTarget.style.background)\n  $(\"#active\").innerHTML = e.currentTarget.innerHTML\n  window.brush_color = e.currentTarget.style.background\n  isErasing = false\n}))\n\n$a(\"#choosable .eraser\").forEach(item => item.addEventListener(\"click\", function(e){\n  //console.log()\n  $(\"#active\").setAttribute(\"style\", \"background: \" + e.currentTarget.style.background)\n  $(\"#active\").innerHTML = e.currentTarget.innerHTML\n  isErasing = true\n}))\n\n// function drawGridLines(columnWidth = CELL_WIDTH, rowHeight = CELL_HEIGHT, columnGrouping = 4, rowGrouping = 4){\n//\n//   for(let j = 0; j < CANVAS_HEIGHT; j+=rowHeight){\n//     const bigRow = (j/rowHeight) % rowGrouping == 0 && j !== 0\n//     if(bigRow){\n//       ctx.fillStyle= \"red\"\n//       ctx.fillRect(0, j-1, CANVAS_WIDTH, 3)\n//     } else {\n//       ctx.fillStyle= \"lightgray\"\n//       ctx.fillRect(0, j, CANVAS_WIDTH, 1)\n//     }\n//   }\n//   for(let i = 0; i < CANVAS_WIDTH; i+=columnWidth){\n//     const bigColumn = (i/columnWidth) % columnGrouping == 0 && i !== 0\n//     if(bigColumn){\n//       ctx.fillStyle= \"red\"\n//       ctx.fillRect(i-1, 0, 3, CANVAS_HEIGHT)\n//     } else {\n//       ctx.fillStyle= \"lightgray\"\n//       ctx.fillRect(i, 0, 1, CANVAS_HEIGHT)\n//     }\n//   }\n// }\n//\n// function drawCheckerboard(){\n//   ctx.fillStyle = \"white\";\n//   for(let j = 0; j < 32; j++){\n//     for(let i = 0; i < 32; i++){\n//       if((i + j) % 2 == 0){\n//         ctx.fillRect(i * 20, j * 20, 20, 20)\n//       }\n//     }\n//   }\n// }\n\n//drawCheckerboard();\n//drawGridLines();\n\n\n//# sourceURL=webpack:///./client/src/app.js?");

/***/ }),

/***/ "./client/src/canvasHelper.js":
/*!************************************!*\
  !*** ./client/src/canvasHelper.js ***!
  \************************************/
/*! exports provided: canvasHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvasHelper\", function() { return canvasHelper; });\n/* harmony import */ var _mathHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mathHelper */ \"./client/src/mathHelper.js\");\n\n\nconst canvasHelper = (elem, opts = {\n  CANVAS_WIDTH :640,\n  CANVAS_HEIGHT : 640,\n  CELLS_WIDE : 16,\n  CELLS_HIGH : 16\n}) => {\n  // INITIALIZE\n  const obj = {}\n  obj.CANVAS_WIDTH = opts.CANVAS_WIDTH\n  obj.CANVAS_HEIGHT = opts.CANVAS_HEIGHT\n  obj.CELLS_WIDE = opts.CELLS_WIDE\n  obj.CELLS_HIGH = opts.CELLS_HIGH\n  obj.canvasEl = elem\n  obj.ctx = obj.canvasEl.getContext(\"2d\")\n\n  obj.canvasEl.setAttribute(\"width\", obj.CANVAS_WIDTH)\n  obj.canvasEl.setAttribute(\"height\", obj.CANVAS_HEIGHT)\n\n  // CALCULATE CELL SIZE\n  obj.CELL_WIDTH = obj.CANVAS_WIDTH / obj.CELLS_WIDE\n  obj.CELL_HEIGHT = obj.CANVAS_HEIGHT / obj.CELLS_HIGH\n\n  // Let's make some methods for covering cells\n\n  obj.cellByPos = (p) => {\n    const {x, y} = p\n\n    // force in range\n    return Object(_mathHelper__WEBPACK_IMPORTED_MODULE_0__[\"Point\"])(\n      // x\n      Object(_mathHelper__WEBPACK_IMPORTED_MODULE_0__[\"clamp\"])(\n        Object(_mathHelper__WEBPACK_IMPORTED_MODULE_0__[\"div\"])(x, obj.CELL_WIDTH),\n        0, obj.CELLS_WIDE -1\n      ),\n      // y\n      Object(_mathHelper__WEBPACK_IMPORTED_MODULE_0__[\"clamp\"])(\n        Object(_mathHelper__WEBPACK_IMPORTED_MODULE_0__[\"div\"])(y, obj.CELL_HEIGHT),\n        0, obj.CELLS_HIGH -1\n      )\n    )\n  }\n\n  obj.inRange = (p) => {\n    return Object(_mathHelper__WEBPACK_IMPORTED_MODULE_0__[\"between\"])(p.x, 0, obj.CANVAS_WIDTH) && Object(_mathHelper__WEBPACK_IMPORTED_MODULE_0__[\"between\"])(p.y, 0, obj.CANVAS_HEIGHT)\n  }\n\n  obj.clearCell = p => {\n    obj.ctx.clearRect(p.x * obj.CELL_WIDTH, p.y * obj.CELL_HEIGHT, obj.CELL_WIDTH, obj.CELL_HEIGHT)\n  }\n\n  obj.colorCell = (color, p) => {\n    obj.ctx.fillStyle = color\n    obj.ctx.fillRect(p.x * obj.CELL_WIDTH, p.y * obj.CELL_HEIGHT, obj.CELL_WIDTH, obj.CELL_HEIGHT)\n  }\n\n  // All purpose\n  obj.draw = (func) => {\n    func(obj.ctx, obj)\n  }\n  return obj\n}\n\n\n\n\n//# sourceURL=webpack:///./client/src/canvasHelper.js?");

/***/ }),

/***/ "./client/src/mathHelper.js":
/*!**********************************!*\
  !*** ./client/src/mathHelper.js ***!
  \**********************************/
/*! exports provided: div, clamp, between, Point, Rectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"div\", function() { return div; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clamp\", function() { return clamp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"between\", function() { return between; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Point\", function() { return Point; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rectangle\", function() { return Rectangle; });\nconst div = (a,b) => Math.floor(a/b)\n\nconst clamp = (t,a,b) => {\n  if(b < a){\n    return clamp(t,b,a)\n  } else {\n    if(t < a){ return a }\n    else if(t > b){ return b }\n    else { return t}\n  }\n}\n\nconst between = (t,a,b, inclusive=true) => {\n  if(b < a){\n    return between(t,b,a, inclusive)\n  } else {\n\n    return (inclusive)\n      ? t >= a && t <= b\n      : t > a && t < b\n  }\n}\n\n// Apply RECTANGLE to an object, possible a fresh one\nconst Point = (x,y, obj = {}) => {\n  // fix for zeroes\n  obj.x = x || obj.x || 0\n  obj.y = y || obj.y || 0\n  return obj\n}\nconst Rectangle = (x,y,width,height,obj = {}) => {\n  Point(x,y, obj)\n  obj.width = width || obj.width\n  obj.height = height || obj.height\n  return obj\n}\n\n\n\n\n//# sourceURL=webpack:///./client/src/mathHelper.js?");

/***/ })

/******/ });