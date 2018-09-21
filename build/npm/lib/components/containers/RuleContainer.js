'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _size = require('lodash/size');

var _size2 = _interopRequireDefault(_size);

var _configUtils = require('../../utils/configUtils');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (Rule) {
  var _class, _temp;

  var RuleContainer = (_temp = _class = function (_Component) {
    _inherits(RuleContainer, _Component);

    function RuleContainer(props) {
      _classCallCheck(this, RuleContainer);

      var _this = _possibleConstructorReturn(this, (RuleContainer.__proto__ || Object.getPrototypeOf(RuleContainer)).call(this, props));

      _this.dummyFn = function () {};

      _this.removeSelf = function () {
        _this.props.actions.removeRule(_this.props.path);
      };

      _this.setField = function (field) {
        _this.props.actions.setField(_this.props.path, field);
      };

      _this.setOperator = function (operator) {
        _this.props.actions.setOperator(_this.props.path, operator);
      };

      _this.setOperatorOption = function (name, value) {
        _this.props.actions.setOperatorOption(_this.props.path, name, value);
      };

      _this.setValue = function (delta, value, type) {
        _this.props.actions.setValue(_this.props.path, delta, value, type);
      };

      _this.setValueSrc = function (delta, srcKey) {
        _this.props.actions.setValueSrc(_this.props.path, delta, srcKey);
      };

      _this.pureShouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);


      _this.componentWillReceiveProps(props);
      return _this;
    }

    _createClass(RuleContainer, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {}
    }, {
      key: 'shouldComponentUpdate',

      //shouldComponentUpdate = this.pureShouldComponentUpdate;

      value: function shouldComponentUpdate(nextProps, nextState) {
        var prevProps = this.props;
        var prevState = this.state;

        var should = this.pureShouldComponentUpdate(nextProps, nextState);
        if (should) {
          if (prevState == nextState && prevProps != nextProps) {
            var chs = [];
            for (var k in nextProps) {
              var changed = nextProps[k] != prevProps[k];
              if (k == 'dragging' && (nextProps.dragging.id || prevProps.dragging.id) != nextProps.id) {
                changed = false; //dragging another item -> ignore
              }
              if (changed) {
                chs.push(k);
              }
            }
            if (!chs.length) should = false;
          }
        }

        return should;
      }
    }, {
      key: 'render',
      value: function render() {
        var fieldConfig = (0, _configUtils.getFieldConfig)(this.props.field, this.props.config);
        var isGroup = fieldConfig && fieldConfig.type == '!struct';

        return _react2.default.createElement(
          'div',
          {
            className: 'group-or-rule-container rule-container',
            'data-id': this.props.id
          },
          [_react2.default.createElement(Rule, {
            key: "dragging",
            isForDrag: true,
            id: this.props.id,
            setField: this.dummyFn,
            setOperator: this.dummyFn,
            setOperatorOption: this.dummyFn,
            removeSelf: this.dummyFn,
            selectedField: this.props.field || null,
            selectedOperator: this.props.operator || null,
            value: this.props.value || null,
            valueSrc: this.props.valueSrc || null,
            operatorOptions: this.props.operatorOptions,
            config: this.props.config,
            treeNodesCnt: this.props.treeNodesCnt,
            dragging: this.props.dragging
          }), _react2.default.createElement(Rule, {
            key: this.props.id,
            id: this.props.id,
            removeSelf: this.removeSelf,
            setField: this.setField,
            setOperator: this.setOperator,
            setOperatorOption: this.setOperatorOption,
            setValue: this.setValue,
            setValueSrc: this.setValueSrc,
            selectedField: this.props.field || null,
            selectedOperator: this.props.operator || null,
            value: this.props.value || null,
            valueSrc: this.props.valueSrc || null,
            operatorOptions: this.props.operatorOptions,
            config: this.props.config,
            treeNodesCnt: this.props.treeNodesCnt,
            onDragStart: this.props.onDragStart,
            dragging: this.props.dragging
          })]
        );
      }
    }]);

    return RuleContainer;
  }(_react.Component), _class.propTypes = {
    id: _propTypes2.default.string.isRequired,
    config: _propTypes2.default.object.isRequired,
    path: _propTypes2.default.instanceOf(_immutable2.default.List).isRequired,
    operator: _propTypes2.default.string,
    field: _propTypes2.default.string,
    actions: _propTypes2.default.object.isRequired, //{removeRule: Funciton, setField, setOperator, setOperatorOption, setValue, setValueSrc, ...}
    onDragStart: _propTypes2.default.func,
    value: _propTypes2.default.any, //depends on widget
    valueSrc: _propTypes2.default.any,
    operatorOptions: _propTypes2.default.object,
    treeNodesCnt: _propTypes2.default.number
    //connected:
    //dragging: PropTypes.object, //{id, x, y, w, h}
  }, _temp);
  ;

  var ConnectedRuleContainer = (0, _reactRedux.connect)(function (state) {
    return {
      dragging: state.dragging
    };
  })(RuleContainer);

  return ConnectedRuleContainer;
};