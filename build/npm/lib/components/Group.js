'use strict';

exports.__esModule = true;
exports.groupActionsPositionList = undefined;

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp, _initialiseProps;

require('antd/lib/icon/style/css');

require('antd/lib/radio/style/css');

require('antd/lib/button/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _startsWith = require('lodash/startsWith');

var _startsWith2 = _interopRequireDefault(_startsWith);

var _GroupContainer = require('./containers/GroupContainer');

var _GroupContainer2 = _interopRequireDefault(_GroupContainer);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactRedux = require('react-redux');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonGroup = _button2.default.Group;
var RadioButton = _radio2.default.Button;
var RadioGroup = _radio2.default.Group;
var classNames = require('classnames');
var groupActionsPositionList = exports.groupActionsPositionList = {
  topLeft: 'group--actions--tl',
  topCenter: 'group--actions--tc',
  topRight: 'group--actions--tr',
  bottomLeft: 'group--actions--bl',
  bottomCenter: 'group--actions--bc',
  bottomRight: 'group--actions--br'
};

var defaultPosition = 'topRight';

var Group = (0, _GroupContainer2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Group, _Component);

  function Group(props) {
    _classCallCheck(this, Group);

    var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, props));

    _initialiseProps.call(_this);

    _this._setConjunctionHandlers = {};
    return _this;
  }

  _createClass(Group, [{
    key: 'getRenderType',
    value: function getRenderType(props) {
      var renderType = void 0;
      if (props.dragging && props.dragging.id == props.id) {
        renderType = props.isForDrag ? 'dragging' : 'placeholder';
      } else {
        renderType = props.isForDrag ? null : 'normal';
      }
      return renderType;
    }
  }, {
    key: 'render',
    value: function render() {
      var renderType = this.getRenderType(this.props);
      if (!renderType) return null;

      var styles = {};
      if (renderType == 'dragging') {
        styles = {
          top: this.props.dragging.y,
          left: this.props.dragging.x,
          width: this.props.dragging.w
        };
      }

      return _react2.default.createElement(
        'div',
        {
          className: classNames("group", "group-or-rule", renderType == 'placeholder' ? 'qb-placeholder' : null, renderType == 'dragging' ? 'qb-draggable' : null),
          style: styles,
          ref: 'group',
          'data-id': this.props.id
        },
        _react2.default.createElement(
          'div',
          { className: 'group--header' },
          this.renderHeader(),
          this.isGroupTopPosition() && this.renderGroup(this.getGroupPositionClass())
        ),
        this.props.children1 ? _react2.default.createElement(
          'div',
          { className: classNames("group--children", this.props.children1.size < 2 && this.props.config.settings.hideConjForOne ? 'hide--line' : '') },
          this.renderChildren()
        ) : null,
        !this.isGroupTopPosition() && _react2.default.createElement(
          'div',
          { className: 'group--footer' },
          this.renderGroup(this.getGroupPositionClass())
        )
      );
    }
  }]);

  return Group;
}(_react.Component), _class2.propTypes = {
  isForDrag: _propTypes2.default.bool,
  //tree: PropTypes.instanceOf(Immutable.Map).isRequired,
  treeNodesCnt: _propTypes2.default.number,
  conjunctionOptions: _propTypes2.default.object.isRequired,
  allowFurtherNesting: _propTypes2.default.bool.isRequired,
  isRoot: _propTypes2.default.bool.isRequired,
  not: _propTypes2.default.bool,
  selectedConjunction: _propTypes2.default.string,
  config: _propTypes2.default.object.isRequired,
  id: _propTypes2.default.string.isRequired,
  path: _propTypes2.default.instanceOf(_immutable2.default.List),
  onDragStart: _propTypes2.default.func,
  children1: _propTypes2.default.instanceOf(_immutable2.default.OrderedMap),
  //actions
  addRule: _propTypes2.default.func.isRequired,
  addGroup: _propTypes2.default.func.isRequired,
  removeSelf: _propTypes2.default.func.isRequired,
  setConjunction: _propTypes2.default.func.isRequired,
  setNot: _propTypes2.default.func.isRequired,
  actions: _propTypes2.default.object.isRequired,
  //connected:
  dragging: _propTypes2.default.object //{id, x, y, w, h}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.pureShouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(this);
  this.shouldComponentUpdate = this.pureShouldComponentUpdate;

  this._getSetConjunctionHandler = function () {
    var itemKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var k = '' + itemKey;
    var h = _this2._setConjunctionHandlers[k];
    if (!h) {
      h = _this2._setConjunction.bind(_this2, itemKey);
      _this2._setConjunctionHandlers[k] = h;
    }
    return h;
  };

  this._setConjunction = function (itemKey, e) {
    _this2.props.setConjunction(e, itemKey);
  };

  this.handleDraggerMouseDown = function (e) {
    var nodeId = _this2.props.id;
    var dom = _this2.refs.group;
    if (_this2.props.onDragStart) {
      _this2.props.onDragStart(nodeId, dom, e);
    }
  };

  this.getGroupPositionClass = function () {
    var groupActionsPosition = _this2.props.config.settings.groupActionsPosition;

    return groupActionsPositionList[groupActionsPosition] || groupActionsPositionList[defaultPosition];
  };

  this.isGroupTopPosition = function () {
    return (0, _startsWith2.default)(_this2.props.config.settings.groupActionsPosition || defaultPosition, 'top');
  };

  this.renderGroup = function (position) {
    return _react2.default.createElement(
      'div',
      { className: 'group--actions ' + position },
      _react2.default.createElement(
        ButtonGroup,
        {
          size: _this2.props.config.settings.renderSize || "small"
        },
        !_this2.props.config.settings.readonlyMode && _react2.default.createElement(
          _button2.default,
          {
            icon: 'plus',
            className: 'action action--ADD-RULE',
            onClick: _this2.props.addRule
          },
          _this2.props.config.settings.addRuleLabel || "Add rule"
        ),
        !_this2.props.config.settings.readonlyMode && _this2.props.allowFurtherNesting ? _react2.default.createElement(
          _button2.default,
          {
            className: 'action action--ADD-GROUP',
            icon: 'plus-circle-o',
            onClick: _this2.props.addGroup
          },
          _this2.props.config.settings.addGroupLabel || "Add group"
        ) : null,
        !_this2.props.config.settings.readonlyMode && !_this2.props.isRoot ? _react2.default.createElement(
          _button2.default,
          {
            type: 'danger',
            icon: 'delete',
            className: 'action action--ADD-DELETE',
            onClick: _this2.props.removeSelf
          },
          _this2.props.config.settings.delGroupLabel !== undefined ? _this2.props.config.settings.delGroupLabel : "Delete"
        ) : null
      )
    );
  };

  this.renderChildren = function () {
    var props = _this2.props;
    return props.children1 ? props.children1.map(function (item) {
      return _react2.default.createElement(_Item2.default, {
        key: item.get('id'),
        id: item.get('id')
        //path={props.path.push(item.get('id'))}
        , path: item.get('path'),
        type: item.get('type'),
        properties: item.get('properties'),
        config: props.config,
        actions: props.actions,
        children1: item.get('children1')
        //tree={props.tree}
        , treeNodesCnt: props.treeNodesCnt,
        onDragStart: props.onDragStart
      });
    }).toList() : null;
  };

  this.renderHeader = function () {
    var renderConjsAsRadios = false;
    return _react2.default.createElement(
      'div',
      { className: classNames("group--conjunctions"
        // this.props.children1.size < 2 && this.props.config.settings.hideConjForOne ? 'hide--conj' : ''
        ) },
      _this2.props.config.settings.renderConjsAsRadios ? _react2.default.createElement(
        RadioGroup,
        {
          disabled: _this2.props.children1.size < 2,
          value: _this2.props.selectedConjunction,
          size: _this2.props.config.settings.renderSize || "small",
          onChange: _this2.props.setConjunction
        },
        (0, _map2.default)(_this2.props.conjunctionOptions, function (item, index) {
          return _react2.default.createElement(
            RadioButton,
            {
              key: item.id,
              value: item.key
              //checked={item.checked}
            },
            item.label
          );
        })
      ) : _react2.default.createElement(
        ButtonGroup,
        {
          size: _this2.props.config.settings.renderSize || "small",
          disabled: _this2.props.children1.size < 2
        },
        _this2.props.config.settings.showNot && _react2.default.createElement(
          _button2.default,
          {
            onClick: function onClick(ev) {
              return _this2.props.setNot(ev, !_this2.props.not);
            },
            type: _this2.props.not ? "primary" : null
          },
          _this2.props.config.settings.notLabel
        ),
        (0, _map2.default)(_this2.props.conjunctionOptions, function (item, index) {
          return _react2.default.createElement(
            _button2.default,
            {
              disabled: _this2.props.children1.size < 2,
              key: item.id,
              type: item.checked ? "primary" : null,
              onClick: _this2._getSetConjunctionHandler(item.key)
            },
            item.label
          );
        })
      ),
      _this2.props.config.settings.canReorder && _this2.props.treeNodesCnt > 2 && !_this2.props.isRoot && _react2.default.createElement(
        'span',
        { className: "qb-drag-handler", onMouseDown: _this2.handleDraggerMouseDown },
        ' ',
        _react2.default.createElement(_icon2.default, { type: 'bars' }),
        ' '
      )
    );
  };
}, _temp)) || _class;

exports.default = Group;