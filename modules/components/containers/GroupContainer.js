import React, { Component } from "react";
import PropTypes from "prop-types";
import shallowCompare from "react-addons-shallow-compare";
import mapValues from "lodash/mapValues";
import Immutable from "immutable";
var stringify = require("json-stringify-safe");
import PureRenderMixin from "react-addons-pure-render-mixin";
import { Provider, Connector, connect } from "react-redux";

export default Group => {
  class GroupContainer extends Component {
    static propTypes = {
      //tree: PropTypes.instanceOf(Immutable.Map).isRequired,
      config: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired, //{setConjunction: Funciton, removeGroup, addGroup, addRule, ...}
      path: PropTypes.instanceOf(Immutable.List).isRequired,
      id: PropTypes.string.isRequired,
      story: PropTypes.object,
      meta: PropTypes.object,
      not: PropTypes.bool,
      conjunction: PropTypes.string,
      children1: PropTypes.instanceOf(Immutable.OrderedMap),
      onDragStart: PropTypes.func,
      treeNodesCnt: PropTypes.number
    };

    constructor(props) {
      super(props);

      this.conjunctionOptions = this._getConjunctionOptions(props);
    }

    pureShouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    //shouldComponentUpdate = this.pureShouldComponentUpdate;

    shouldComponentUpdate(nextProps, nextState) {
      let prevProps = this.props;
      let prevState = this.state;

      let should = this.pureShouldComponentUpdate(nextProps, nextState);
      if (should) {
        if (prevState == nextState && prevProps != nextProps) {
          let chs = [];
          for (let k in nextProps) {
            let changed = nextProps[k] != prevProps[k];
            if (
              k == "dragging" &&
              (nextProps.dragging.id || prevProps.dragging.id) != nextProps.id
            ) {
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

    componentWillReceiveProps(nextProps) {
      const { config, id, conjunction } = nextProps;
      const oldConfig = this.props.config;
      const oldConjunction = this.props.conjunction;
      if (oldConfig != config || oldConjunction != conjunction) {
        this.conjunctionOptions = this._getConjunctionOptions(nextProps);
      }
    }

    _getConjunctionOptions(props) {
      return mapValues(props.config.conjunctions, (item, index) => ({
        id: `conjunction-${props.id}-${index}`,
        name: `conjunction[${props.id}]`,
        key: index,
        label: item.label,
        checked: index === props.conjunction
      }));
    }

    setConjunction = (e = null, conj = null) => {
      if (!conj && e) {
        //for RadioGroup
        conj = e.target.value;
      }

      this.props.actions.setConjunction(this.props.path, conj);
    };

    setNot(e = null, not = null) {
      this.props.actions.setNot(this.props.path, not);
    }

    dummyFn = () => {};

    removeSelf = event => {
      this.props.actions.removeGroup(this.props.path);
      if (typeof (event || {}).preventDefault === "function") {
        event.preventDefault();
      }
      return false;
    };

    addGroup = (event, groupType) => {
      this.props.actions.addGroup(this.props.path, {}, groupType);
      event.preventDefault();
      return false;
    };

    addRule = (event, field, meta) => {
      this.props.actions.addRule(this.props.path, undefined, field, meta);
      if (typeof (event || {}).preventDefault === "function") {
        event.preventDefault();
      }
      return false;
    };

    setStory = story => {
      this.props.actions.setStory(this.props.path, story);
      return false;
    };

    setMeta = meta => {
      this.props.actions.setMeta(this.props.path, meta);
      return false;
    };

    render() {
      const currentNesting = this.props.path.size;
      const maxNesting = this.props.config.settings.maxNesting;

      // Don't allow nesting further than the maximum configured depth and don't
      // allow removal of the root group.
      const allowFurtherNesting =
        typeof maxNesting === "undefined" || currentNesting < maxNesting;
      const isRoot = currentNesting == 1;

      return (
        <div
          className={"group-or-rule-container group-container"}
          data-id={this.props.id}
        >
          {[
            <Group
              key={"dragging"}
              isForDrag={true}
              id={this.props.id}
              story={this.props.story}
              meta={this.props.meta}
              isRoot={isRoot}
              allowFurtherNesting={allowFurtherNesting}
              conjunctionOptions={this.conjunctionOptions}
              not={this.props.not}
              selectedConjunction={this.props.conjunction}
              setConjunction={this.dummyFn}
              setStory={this.dummyFn}
              setMeta={this.dummyFn}
              setNot={this.dummyFn}
              removeSelf={this.dummyFn}
              addGroup={this.dummyFn}
              addRule={this.dummyFn}
              config={this.props.config}
              children1={this.props.children1}
              actions={this.props.actions}
              //tree={this.props.tree}
              treeNodesCnt={this.props.treeNodesCnt}
              dragging={this.props.dragging}
            />,
            <Group
              key={this.props.id}
              id={this.props.id}
              story={this.props.story}
              meta={this.props.meta}
              isRoot={isRoot}
              allowFurtherNesting={allowFurtherNesting}
              conjunctionOptions={this.conjunctionOptions}
              not={this.props.not}
              selectedConjunction={this.props.conjunction}
              setConjunction={this.setConjunction}
              setStory={this.setStory}
              setMeta={this.setMeta}
              setNot={this.setNot.bind(this)}
              removeSelf={this.removeSelf}
              addGroup={this.addGroup}
              addRule={this.addRule}
              config={this.props.config}
              children1={this.props.children1}
              actions={this.props.actions}
              //tree={this.props.tree}
              treeNodesCnt={this.props.treeNodesCnt}
              onDragStart={this.props.onDragStart}
              dragging={this.props.dragging}
            />
          ]}
        </div>
      );
    }
  }

  const ConnectedGroupContainer = connect(state => {
    return {
      dragging: state.dragging
    };
  })(GroupContainer);

  return ConnectedGroupContainer;
};
