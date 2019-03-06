"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _echarts = _interopRequireDefault(require("echarts"));

var _classnames = _interopRequireDefault(require("classnames"));

var _debounce = _interopRequireDefault(require("debounce"));

var _cssElementQueries = require("css-element-queries");

var _mergeOptions = _interopRequireDefault(require("../utils/mergeOptions"));

var _isEqual = _interopRequireDefault(require("../utils/isEqual"));

var _extract = _interopRequireDefault(require("../utils/extract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sizeKeys = ['width', 'height'];
var configKeys = ['theme', 'devicePixelRatio', 'renderer', 'notMerge', 'lazyUpdate', 'silent'];
var notOptionsKeys = ['children', 'style'].concat(configKeys, sizeKeys);

var _default =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    var _this;

    _classCallCheck(this, _default);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEchartsInit", function () {
      var _this$props = _this.props,
          theme = _this$props.theme,
          devicePixelRatio = _this$props.devicePixelRatio,
          renderer = _this$props.renderer,
          width = _this$props.width,
          height = _this$props.height;
      return _echarts.default.init(_this.dom, theme, {
        devicePixelRatio: devicePixelRatio,
        renderer: renderer,
        width: width,
        height: height
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEchartsReinit", function () {
      if (_this.chart) {
        _this.chart.dispose();

        _this.chart = null;
      }

      _this.chart = _this.handleEchartsInit();

      _this.handleBindEvent();

      _this.handleSetOption();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBindEvent", function () {
      var onEvents = _this.props.onEvents;

      if (onEvents) {
        for (var i = 0, l = onEvents.length; i < l; i++) {
          _this.chart.on.apply(_this.chart, onEvents[i]);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSetOption", function () {
      var _this$props2 = _this.props,
          notMerge = _this$props2.notMerge,
          lazyUpdate = _this$props2.lazyUpdate,
          silent = _this$props2.silent;
      var options = (0, _extract.default)(_this.props, {
        exclude: notOptionsKeys
      });

      _this.chart.setOption(Object.assign({}, options, _this.options), {
        notMerge: notMerge,
        lazyUpdate: lazyUpdate,
        silent: silent
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleReceiveChildOption", function (name, option) {
      var newOptions = (0, _mergeOptions.default)(_this.options[name], option);

      if (newOptions) {
        _this.options[name] = newOptions;

        if (_this.chart && _this.state.isLoaded) {
          // 仅重新setOption变更部分
          _this.chart.setOption(_defineProperty({}, name, newOptions));
        }
      }
    });

    _this.options = {};
    _this.state = {
      isLoaded: false
    };
    return _this;
  }

  _createClass(_default, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onLoad = this.props.onLoad;
      this.chart = this.handleEchartsInit();
      this.handleBindEvent();
      this.handleSetOption();
      this.setState({
        isLoaded: true
      }, function () {
        return onLoad && onLoad(_this2.chart);
      }); //监听 DOM 尺寸变化，并resize图表

      this.domResizeListen = new _cssElementQueries.ResizeSensor(this.layout, (0, _debounce.default)(function () {
        _this2.chart.resize();
      }, 100, false));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps) {
      // 图表初始化属性更新，重绘图表
      if (!(0, _isEqual.default)(this.props, preProps, {
        include: configKeys
      })) {
        return this.handleEchartsReinit();
      } // 尺寸变更，resize图表


      if (!(0, _isEqual.default)(this.props, preProps, {
        include: sizeKeys
      })) {
        this.chart.resize();
      } // 图表配置更新，再次setOption


      if (!(0, _isEqual.default)(this.props, preProps, {
        exclude: ['children']
      })) {
        this.handleSetOption();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.chart.dispose();
      this.domResizeListen.detach();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement("div", {
        ref: function ref(layout) {
          return _this3.layout = layout;
        },
        className: (0, _classnames.default)('react-component-echarts', this.props.className),
        style: this.props.style
      }, _react.default.createElement("div", {
        ref: function ref(dom) {
          return _this3.dom = dom;
        },
        style: {
          width: '100%',
          height: '100%'
        }
      }, _react.default.Children.map(this.props.children, function (children) {
        if ((0, _react.isValidElement)(children)) {
          return _react.default.cloneElement(children, {
            triggerPushOption: _this3.handleReceiveChildOption
          });
        }

        return children;
      })));
    }
  }]);

  return _default;
}(_react.PureComponent);

exports.default = _default;

_defineProperty(_default, "propTypes", {
  notMerge: _propTypes.default.bool,
  lazyUpdate: _propTypes.default.bool,
  silent: _propTypes.default.bool,
  theme: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  devicePixelRatio: _propTypes.default.number,
  renderer: _propTypes.default.oneOf(['canvas', 'svg']),
  onEvents: _propTypes.default.arrayOf(_propTypes.default.array)
});

_defineProperty(_default, "defaultProps", {
  notMerge: false,
  lazyUpdate: false,
  silent: false
});