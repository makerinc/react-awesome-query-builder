'use strict';

exports.__esModule = true;
exports.default = undefined;

var _timePicker = require('antd/lib/time-picker');

var _timePicker2 = _interopRequireDefault(_timePicker);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

require('antd/lib/time-picker/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeWidget = (_temp = _class = function (_Component) {
    _inherits(TimeWidget, _Component);

    function TimeWidget(props) {
        _classCallCheck(this, TimeWidget);

        var _this = _possibleConstructorReturn(this, (TimeWidget.__proto__ || Object.getPrototypeOf(TimeWidget)).call(this, props));

        _initialiseProps.call(_this);

        var valueFormat = props.valueFormat,
            value = props.value,
            setValue = props.setValue;

        var mValue = value ? (0, _moment2.default)(value, valueFormat) : null;
        if (mValue && !mValue.isValid()) {
            setValue(null);
        }
        return _this;
    }

    _createClass(TimeWidget, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                timeFormat = _props.timeFormat,
                valueFormat = _props.valueFormat,
                value = _props.value,
                use12Hours = _props.use12Hours;

            var dateValue = value ? (0, _moment2.default)(value, valueFormat) : null;
            var customProps = this.props.customProps || {};

            return _react2.default.createElement(_timePicker2.default, _extends({
                use12Hours: use12Hours,
                key: 'widget-time',
                size: this.props.config.settings.renderSize || "small",
                placeholder: this.props.placeholder,
                format: timeFormat,
                value: dateValue,
                onChange: this.handleChange,
                ref: 'datetime'
            }, customProps));
        }
    }]);

    return TimeWidget;
}(_react.Component), _class.propTypes = {
    setValue: _propTypes2.default.func.isRequired,
    timeFormat: _propTypes2.default.string,
    valueFormat: _propTypes2.default.string,
    use12Hours: _propTypes2.default.bool,
    value: _propTypes2.default.string, //in valueFormat
    config: _propTypes2.default.object.isRequired,
    field: _propTypes2.default.string.isRequired,
    placeholder: _propTypes2.default.string,
    customProps: _propTypes2.default.object
}, _class.defaultProps = {
    timeFormat: 'HH:mm',
    valueFormat: 'HH:mm:ss',
    use12Hours: false
}, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.shouldComponentUpdate = _reactAddonsShallowCompare2.default;

    this.handleChange = function (_value) {
        var _props2 = _this2.props,
            setValue = _props2.setValue,
            valueFormat = _props2.valueFormat;

        var value = _value && _value.isValid() ? _value.format(valueFormat) : null;
        if (value || _value === null) setValue(value);
    };
}, _temp);
exports.default = TimeWidget;