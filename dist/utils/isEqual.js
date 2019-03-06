"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEqual;

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _extract = _interopRequireDefault(require("./extract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEqual(a, b) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return (0, _fastDeepEqual.default)((0, _extract.default)(a, opt), (0, _extract.default)(b, opt));
}