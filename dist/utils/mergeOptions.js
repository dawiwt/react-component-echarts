"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _isEqual = _interopRequireDefault(require("../utils/isEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(oldOption, newOption) {
  if (oldOption) {
    // 当前配置是个数组
    if (Array.isArray(oldOption)) {
      for (var i = 0, l = oldOption.length; i < l; i++) {
        var option = oldOption[i];

        if (option.__rechartId === newOption.__rechartId) {
          return (0, _isEqual.default)(option, newOption) ? false : (oldOption[i] = newOption, oldOption);
        }
      }

      return oldOption.concat(newOption);
    } else {
      if (oldOption.__rechartId !== newOption.__rechartId) {
        return [oldOption, newOption];
      }
    }
  }

  return newOption;
}