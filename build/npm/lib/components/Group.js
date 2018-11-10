"use strict";

exports.__esModule = true;
exports.groupActionsPositionList = undefined;

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _select = require("antd/lib/select");

var _select2 = _interopRequireDefault(_select);

var _input = require("antd/lib/input");

var _input2 = _interopRequireDefault(_input);

var _radio = require("antd/lib/radio");

var _radio2 = _interopRequireDefault(_radio);

var _button = require("antd/lib/button");

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp, _initialiseProps;

require("antd/lib/icon/style/css");

require("antd/lib/select/style/css");

require("antd/lib/input/style/css");

require("antd/lib/radio/style/css");

require("antd/lib/button/style/css");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require("react-addons-shallow-compare");

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

var _startsWith = require("lodash/startsWith");

var _startsWith2 = _interopRequireDefault(_startsWith);

var _GroupContainer = require("./containers/GroupContainer");

var _GroupContainer2 = _interopRequireDefault(_GroupContainer);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _reactAddonsPureRenderMixin = require("react-addons-pure-render-mixin");

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactRedux = require("react-redux");

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

var _uuid = require("../utils/uuid");

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonGroup = _button2.default.Group;
var RadioButton = _radio2.default.Button;
var RadioGroup = _radio2.default.Group;
var classNames = require("classnames");
var groupActionsPositionList = exports.groupActionsPositionList = {
  topLeft: "group--actions--tl",
  topCenter: "group--actions--tc",
  topRight: "group--actions--tr",
  bottomLeft: "group--actions--bl",
  bottomCenter: "group--actions--bc",
  bottomRight: "group--actions--br"
};

var defaultPosition = "topRight";

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
    key: "isDraftMode",
    value: function isDraftMode(props) {
      return (props.meta || {}).status === "draft" || (props.meta || {}).status === undefined;
    }
  }, {
    key: "getRenderType",
    value: function getRenderType(props) {
      var renderType = void 0;
      if (props.dragging && props.dragging.id == props.id) {
        renderType = props.isForDrag ? "dragging" : "placeholder";
      } else {
        renderType = props.isForDrag ? null : "normal";
      }
      return renderType;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this2 = this;

      var experienceStatusOptions = (0, _map2.default)(["draft", "running", "ended", "archived", "scheduled"], function (label, value) {
        return _react2.default.createElement(
          Option,
          { key: label, value: label },
          label
        );
      }),
          disabled = ["ended", "archived", "scheduled"].indexOf((this.props.meta || {}).status) > -1;

      return !this.props.isRoot && this.props.allowFurtherNesting ? _react2.default.createElement(
        "div",
        { className: "group--footer" },
        _react2.default.createElement(
          "div",
          { style: { display: "none" } },
          _react2.default.createElement(_input2.default, {
            key: "widget-text",
            ref: "text",
            type: "text",
            value: (this.props.meta || {}).description || null,
            placeholder: "description",
            onChange: function onChange(e) {
              return _this2.props.setMeta({ description: e.target.value });
            }
          }),
          _react2.default.createElement(
            _select2.default,
            {
              style: { width: 100 },
              key: "widget-select",
              dropdownMatchSelectWidth: false,
              ref: "val",
              size: "small",
              placeholder: "status",
              value: (this.props.meta || {}).status || undefined,
              onChange: function onChange(e) {
                return _this2.props.setMeta({ status: e });
              }
            },
            experienceStatusOptions
          )
        ),
        _react2.default.createElement(_input2.default, {
          style: { width: 200 },
          key: "widget-text",
          ref: "experimentName",
          type: "text",
          value: (this.props.meta || {}).name || null,
          placeholder: "Experience name",
          onChange: function onChange(e) {
            return _this2.props.setMeta({ name: e.target.value });
          },
          disabled: Boolean((this.props.meta || {}).experiment_id)
        }),
        this.props.config.gaSignedIn ? _react2.default.createElement(
          _button2.default,
          {
            icon: (this.props.meta || {}).experiment_id != null ? "stop" : "plus",
            className: "action action--MANAGE-EXPERIMENT",
            disabled: disabled,
            onClick: function onClick(e) {
              var tmpId = (0, _uuid2.default)();
              var needsValidation = false;

              e.preventDefault();

              _this2.props.children1.map(function (item) {
                return item.get('properties').get('story') === undefined ? needsValidation = true : '';
              });

              if (needsValidation) {
                swal('Please pick a story for all variants before continuing');
                return;
              }

              if (disabled) {
                return;
              }

              _this2.props.setMeta({ tmpId: tmpId });

              setTimeout(function () {
                _this2.props.config.experimentManager({
                  tmpId: tmpId,
                  experimentId: (_this2.props.meta || {}).experiment_id,
                  gaExperimentId: (_this2.props.meta || {}).ga_experiment_id,
                  name: _this2.refs.experimentName.refs.input.value,
                  callback: function callback(attr) {
                    _this2.props.setMeta(attr);

                    if (attr.starting_status) {
                      return;
                    }

                    setTimeout(function () {
                      return document.dispatchEvent(new Event("query-builder-save"));
                    }, 100);
                  }
                });
              }, 0);
            }
          },
          disabled ? "Experience Ended" : (this.props.meta || {}).starting_status === "loading" ? "Loading..." : (this.props.meta || {}).starting_status === "failed" ? "Failed" : (this.props.meta || {}).experiment_id != null ? "Stop Experience" : "Start Experience"
        ) : _react2.default.createElement(
          "span",
          null,
          "\xA0\xA0\xA0 Connect your Google Analytics first"
        )
      ) : null;
    }
  }, {
    key: "render",
    value: function render() {
      var renderType = this.getRenderType(this.props);
      if (!renderType) return null;

      var styles = {};
      if (renderType == "dragging") {
        styles = {
          top: this.props.dragging.y,
          left: this.props.dragging.x,
          width: this.props.dragging.w
        };
      }

      return _react2.default.createElement(
        "div",
        {
          className: classNames("group", "group-or-rule", renderType == "placeholder" ? "qb-placeholder" : null, renderType == "dragging" ? "qb-draggable" : null),
          style: styles,
          ref: "group",
          "data-id": this.props.id
        },
        _react2.default.createElement(
          "div",
          { className: "group--header" },
          this.renderHeader(),
          this.isGroupTopPosition() && this.renderGroup(this.getGroupPositionClass())
        ),
        this.props.children1 ? _react2.default.createElement(
          "div",
          {
            className: classNames("group--children", this.props.children1.size < 2 && this.props.config.settings.hideConjForOne ? "hide--line" : "")
          },
          this.renderChildren()
        ) : null,
        ((this.props.config.settings || {}).page_rule || {}).enhance_page_type == "enhanced" && this.renderFooter(),
        !this.isGroupTopPosition() && _react2.default.createElement(
          "div",
          { className: "group--footer" },
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
  story: _propTypes2.default.object.isRequired,
  meta: _propTypes2.default.object.isRequired,
  path: _propTypes2.default.instanceOf(_immutable2.default.List),
  onDragStart: _propTypes2.default.func,
  children1: _propTypes2.default.instanceOf(_immutable2.default.OrderedMap),
  //actions
  addRule: _propTypes2.default.func.isRequired,
  addGroup: _propTypes2.default.func.isRequired,
  removeSelf: _propTypes2.default.func.isRequired,
  setConjunction: _propTypes2.default.func.isRequired,
  setStory: _propTypes2.default.func.isRequired,
  setMeta: _propTypes2.default.func.isRequired,
  setNot: _propTypes2.default.func.isRequired,
  actions: _propTypes2.default.object.isRequired,
  //connected:
  dragging: _propTypes2.default.object //{id, x, y, w, h},
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.pureShouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(this);
  this.shouldComponentUpdate = this.pureShouldComponentUpdate;

  this._getSetConjunctionHandler = function () {
    var itemKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var k = "" + itemKey;
    var h = _this3._setConjunctionHandlers[k];
    if (!h) {
      h = _this3._setConjunction.bind(_this3, itemKey);
      _this3._setConjunctionHandlers[k] = h;
    }
    return h;
  };

  this._setConjunction = function (itemKey, e) {
    _this3.props.setConjunction(e, itemKey);
  };

  this.handleDraggerMouseDown = function (e) {
    var nodeId = _this3.props.id;
    var dom = _this3.refs.group;
    if (_this3.props.onDragStart) {
      _this3.props.onDragStart(nodeId, dom, e);
    }
  };

  this.getGroupPositionClass = function () {
    var groupActionsPosition = _this3.props.config.settings.groupActionsPosition;

    return groupActionsPositionList[groupActionsPosition] || groupActionsPositionList[defaultPosition];
  };

  this.isGroupTopPosition = function () {
    return (0, _startsWith2.default)(_this3.props.config.settings.groupActionsPosition || defaultPosition, "top");
  };

  this.renderGroup = function (position) {
    return _react2.default.createElement(
      "div",
      { className: "group--actions " + position },
      _react2.default.createElement(
        ButtonGroup,
        { size: _this3.props.config.settings.renderSize || "small" },
        !_this3.props.config.settings.readonlyMode && _this3.isDraftMode(_this3.props) && !_this3.props.isRoot && !_this3.props.allowFurtherNesting && _react2.default.createElement(
          _button2.default,
          {
            icon: _this3.props.story != null ? "edit" : "plus",
            className: "action action--SELECT-STORY",
            onClick: function onClick(e) {
              e.preventDefault();
              _this3.props.config.storyPicker(_this3.props.setStory);
            }
          },
          _this3.props.story != null ? "Story: " + (_this3.props.story || {}).name : "Select Story"
        ),
        !_this3.props.config.settings.readonlyMode && _this3.isDraftMode(_this3.props) && !_this3.props.isRoot && !_this3.props.allowFurtherNesting && _react2.default.createElement(
          _button2.default,
          {
            icon: "plus",
            className: "action action--ADD-RULE",
            onClick: _this3.props.addRule
          },
          _this3.props.config.settings.addRuleLabel || "Add rule"
        ),
        !_this3.props.config.settings.readonlyMode && _this3.isDraftMode(_this3.props) && _this3.props.allowFurtherNesting ? _react2.default.createElement(
          _button2.default,
          {
            className: "action action--ADD-GROUP",
            icon: "plus-circle-o",
            onClick: function onClick(e) {
              return _this3.props.addGroup(e, _this3.props.isRoot ? "ADD_EXPERIENCE" : "");
            }
          },
          _this3.props.isRoot ? "Add Experience" : _this3.props.config.settings.addGroupLabel || "Add group"
        ) : null,
        !_this3.props.config.settings.readonlyMode && !_this3.props.isRoot && _this3.isDraftMode(_this3.props) ? _react2.default.createElement(
          _button2.default,
          {
            type: "danger",
            icon: "delete",
            className: "action action--ADD-DELETE",
            onClick: _this3.props.removeSelf
          },
          _this3.props.config.settings.delGroupLabel !== undefined ? _this3.props.allowFurtherNesting ? "Delete Experience" : _this3.props.config.settings.delGroupLabel : "Delete"
        ) : null
      )
    );
  };

  this.renderChildren = function () {
    var props = _this3.props;
    return props.children1 ? props.children1.map(function (item) {
      return _react2.default.createElement(_Item2.default, {
        key: item.get("id"),
        id: item.get("id"),
        story: item.get("story"),
        meta: props.meta
        //path={props.path.push(item.get('id'))}
        , path: item.get("path"),
        type: item.get("type"),
        properties: item.get("properties"),
        config: props.config,
        actions: props.actions,
        children1: item.get("children1")
        //tree={props.tree}
        , treeNodesCnt: props.treeNodesCnt,
        onDragStart: props.onDragStart
      });
    }).toList() : null;
  };

  this.renderHeader = function () {
    var renderConjsAsRadios = false;

    return _react2.default.createElement(
      "div",
      {
        className: classNames("group--conjunctions"
        // this.props.children1.size < 2 && this.props.config.settings.hideConjForOne ? 'hide--conj' : ''
        )
      },
      _this3.props.config.settings.renderConjsAsRadios ? _react2.default.createElement(
        RadioGroup,
        {
          disabled: _this3.props.children1.size < 2,
          value: _this3.props.selectedConjunction,
          size: _this3.props.config.settings.renderSize || "small",
          onChange: _this3.props.setConjunction
        },
        (0, _map2.default)(_this3.props.conjunctionOptions, function (item, index) {
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
          size: _this3.props.config.settings.renderSize || "small",
          disabled: _this3.props.children1.size < 2
        },
        _this3.props.config.settings.showNot && _react2.default.createElement(
          _button2.default,
          {
            onClick: function onClick(ev) {
              return _this3.props.setNot(ev, !_this3.props.not);
            },
            type: _this3.props.not ? "primary" : null
          },
          _this3.props.config.settings.notLabel
        ),
        (0, _map2.default)(_this3.props.conjunctionOptions, function (item, index) {
          return _react2.default.createElement(
            _button2.default,
            {
              disabled: _this3.props.children1.size < 2,
              key: item.id,
              type: item.checked ? "primary" : null,
              onClick: _this3._getSetConjunctionHandler(item.key)
            },
            item.label
          );
        })
      ),
      _this3.props.config.settings.canReorder && _this3.props.treeNodesCnt > 2 && !_this3.props.isRoot && _this3.isDraftMode(_this3.props) && _react2.default.createElement(
        "span",
        {
          className: "qb-drag-handler",
          onMouseDown: _this3.handleDraggerMouseDown
        },
        " ",
        _react2.default.createElement(_icon2.default, { type: "bars" }),
        " "
      )
    );
  };
}, _temp)) || _class;

exports.default = Group;