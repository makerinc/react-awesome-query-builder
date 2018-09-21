'use strict';

exports.__esModule = true;
exports.default = undefined;

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

require('antd/lib/col/style/css');

require('antd/lib/input/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextWidget = (_temp2 = _class = function (_Component) {
  _inherits(TextWidget, _Component);

  function TextWidget() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextWidget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextWidget.__proto__ || Object.getPrototypeOf(TextWidget)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = _reactAddonsShallowCompare2.default, _this.handleChange = function () {
      _this.props.setValue(_reactDom2.default.findDOMNode(_this.refs.text).value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextWidget, [{
    key: 'render',
    value: function render() {
      var customProps = this.props.customProps || {};

      return _react2.default.createElement(
        _col2.default,
        null,
        _react2.default.createElement(_input2.default, _extends({
          key: 'widget-text',
          size: this.props.config.settings.renderSize || "small",
          ref: 'text',
          type: "text",
          value: this.props.value || null,
          placeholder: this.props.placeholder,
          onChange: this.handleChange
        }, customProps))
      );
    }
  }]);

  return TextWidget;
}(_react.Component), _class.propTypes = {
  setValue: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string,
  config: _propTypes2.default.object.isRequired,
  value: _propTypes2.default.string,
  field: _propTypes2.default.string.isRequired,
  customProps: _propTypes2.default.object
}, _temp2);
exports.default = TextWidget;