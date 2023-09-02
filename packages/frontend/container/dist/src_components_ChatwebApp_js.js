"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_fullstack_contanier"] = self["webpackChunk_fullstack_contanier"] || []).push([["src_components_ChatwebApp_js"],{

/***/ "./src/components/ChatwebApp.js":
/*!**************************************!*\
  !*** ./src/components/ChatwebApp.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var chatwebRemote_ChatwebApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chatwebRemote/ChatwebApp */ \"webpack/container/remote/chatwebRemote/ChatwebApp\");\n/* harmony import */ var chatwebRemote_ChatwebApp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chatwebRemote_ChatwebApp__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"webpack/sharing/consume/default/react/react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"webpack/sharing/consume/default/react-router-dom/react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {\n  var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n  var history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useHistory)();\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {\n    var _mount = (0,chatwebRemote_ChatwebApp__WEBPACK_IMPORTED_MODULE_0__.mount)(ref.current, {\n        initialPath: history.location.pathname,\n        onNavigate: function onNavigate(_ref) {\n          var nextPathname = _ref.pathname;\n          var pathname = history.location.pathname;\n          if (pathname !== nextPathname) {\n            history.push(nextPathname);\n          }\n        }\n      }),\n      onParentNavigate = _mount.onParentNavigate;\n    history.listen(onParentNavigate);\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    ref: ref\n  });\n});\n\n//# sourceURL=webpack://@fullstack/contanier/./src/components/ChatwebApp.js?");

/***/ })

}]);