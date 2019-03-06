"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extract;

function extract(o) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _o = {};
  var include = opt.include,
      exclude = opt.exclude;

  if (include) {
    for (var i = 0, l = include.length; i < l; i++) {
      var key = include[i];
      _o[key] = o[key];
    }
  } else {
    Object.assign(_o, o);
  }

  if (exclude) {
    for (var _i = 0, _l = exclude.length; _i < _l; _i++) {
      delete _o[exclude[_i]];
    }
  }

  return _o;
}