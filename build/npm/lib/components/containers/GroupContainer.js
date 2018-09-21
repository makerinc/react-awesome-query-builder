'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stringify = require('json-stringify-safe');

exports.default = function (Group) {
  var _class, _temp;

  var GroupContainer = (_temp = _class = function (_Component) {
    _inherits(GroupContainer, _Component);

    function GroupContainer(props) {
      _classCallCheck(this, GroupContainer);

      var _this = _possibleConstructorReturn(this, (GroupContainer.__proto__ || Object.getPrototypeOf(GroupContainer)).call(this, props));

      _this.pureShouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);

      _this.setConjunction = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var conj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (!conj && e) {
          //for RadioGroup
          conj = e.target.value;
        }

        _this.props.actions.setConjunction(_this.props.path, conj);
      };

      _this.dummyFn = function () {};

      _this.removeSelf = function (event) {
        _this.props.actions.removeGroup(_this.props.path);
        event.preventDefault();
        return false;
      };

      _this.addGroup = function (event) {
        _this.props.actions.addGroup(_this.props.path);
        event.preventDefault();
        return false;
      };

      _this.addRule = function (event) {
        _this.props.actions.addRule(_this.props.path);
        event.preventDefault();
        return false;
      };

      _this.conjunctionOptions = _this._getConjunctionOptions(props);
      return _this;
    }

    _createClass(GroupContainer, [{
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
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var config = nextProps.config,
            id = nextProps.id,
            conjunction = nextProps.conjunction;

        var oldConfig = this.props.config;
        var oldConjunction = this.props.conjunction;
        if (oldConfig != config || oldConjunction != conjunction) {
          this.conjunctionOptions = this._getConjunctionOptions(nextProps);
        }
      }
    }, {
      key: '_getConjunctionOptions',
      value: function _getConjunctionOptions(props) {
        return (0, _mapValues2.default)(props.config.conjunctions, function (item, index) {
          return {
            id: 'conjunction-' + props.id + '-' + index,
            name: 'conjunction[' + props.id + ']',
            key: index,
            label: item.label,
            checked: index === props.conjunction
          };
        });
      }
    }, {
      key: 'setNot',
      value: function setNot() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var not = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        this.props.actions.setNot(this.props.path, not);
      }
    }, {
      key: 'render',
      value: function render() {
        var currentNesting = this.props.path.size;
        var maxNesting = this.props.config.settings.maxNesting;

        // Don't allow nesting further than the maximum configured depth and don't
        // allow removal of the root group.
        var allowFurtherNesting = typeof maxNesting === 'undefined' || currentNesting < maxNesting;
        var isRoot = currentNesting == 1;

        return _react2.default.createElement(
          'div',
          {
            className: 'group-or-rule-container group-container',
            'data-id': this.props.id
          },
          [_react2.default.createElement(Group, {
            key: "dragging",
            isForDrag: true,
            id: this.props.id,
            isRoot: isRoot,
            allowFurtherNesting: allowFurtherNesting,
            conjunctionOptions: this.conjunctionOptions,
            not: this.props.not,
            selectedConjunction: this.props.conjunction,
            setConjunction: this.dummyFn,
            setNot: this.dummyFn,
            removeSelf: this.dummyFn,
            addGroup: this.dummyFn,
            addRule: this.dummyFn,
            config: this.props.config,
            children1: this.props.children1,
            actions: this.props.actions
            //tree={this.props.tree}
            , treeNodesCnt: this.props.treeNodesCnt,
            dragging: this.props.dragging
          }), _react2.default.createElement(Group, {
            key: this.props.id,
            id: this.props.id,
            isRoot: isRoot,
            allowFurtherNesting: allowFurtherNesting,
            conjunctionOptions: this.conjunctionOptions,
            not: this.props.not,
            selectedConjunction: this.props.conjunction,
            setConjunction: this.setConjunction,
            setNot: this.setNot.bind(this),
            removeSelf: this.removeSelf,
            addGroup: this.addGroup,
            addRule: this.addRule,
            config: this.props.config,
            children1: this.props.children1,
            actions: this.props.actions
            //tree={this.props.tree}
            , treeNodesCnt: this.props.treeNodesCnt,
            onDragStart: this.props.onDragStart,
            dragging: this.props.dragging
          })]
        );
      }
    }]);

    return GroupContainer;
  }(_react.Component), _class.propTypes = {
    //tree: PropTypes.instanceOf(Immutable.Map).isRequired,
    config: _propTypes2.default.object.isRequired,
    actions: _propTypes2.default.object.isRequired, //{setConjunction: Funciton, removeGroup, addGroup, addRule, ...}
    path: _propTypes2.default.instanceOf(_immutable2.default.List).isRequired,
    id: _propTypes2.default.string.isRequired,
    not: _propTypes2.default.bool,
    conjunction: _propTypes2.default.string,
    children1: _propTypes2.default.instanceOf(_immutable2.default.OrderedMap),
    onDragStart: _propTypes2.default.func,
    treeNodesCnt: _propTypes2.default.number
  }, _temp);
  ;

  var ConnectedGroupContainer = (0, _reactRedux.connect)(function (state) {
    return {
      dragging: state.dragging
    };
  })(GroupContainer);

  return ConnectedGroupContainer;
};