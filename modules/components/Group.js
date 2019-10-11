import React, { Component } from "react";
import PropTypes from "prop-types";
import shallowCompare from "react-addons-shallow-compare";
import map from "lodash/map";
import startsWith from "lodash/startsWith";
import GroupContainer from "./containers/GroupContainer";
import {
  Row,
  Col,
  Icon,
  Button,
  Radio,
  Input,
  Select,
  Menu,
  Dropdown,
  Modal,
  Switch
} from "antd";
const ButtonGroup = Button.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const classNames = require("classnames");
import Immutable from "immutable";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { Provider, Connector, connect } from "react-redux";
import Item from "./Item";
import uuid from "../utils/uuid";

export const groupActionsPositionList = {
  topLeft: "group--actions--tl",
  topCenter: "group--actions--tc",
  topRight: "group--actions--tr",
  bottomLeft: "group--actions--bl",
  bottomCenter: "group--actions--bc",
  bottomRight: "group--actions--br"
};

const defaultPosition = "topRight";

@GroupContainer
class Group extends Component {
  static propTypes = {
    isForDrag: PropTypes.bool,
    //tree: PropTypes.instanceOf(Immutable.Map).isRequired,
    treeNodesCnt: PropTypes.number,
    conjunctionOptions: PropTypes.object.isRequired,
    allowFurtherNesting: PropTypes.bool.isRequired,
    isRoot: PropTypes.bool.isRequired,
    not: PropTypes.bool,
    selectedConjunction: PropTypes.string,
    config: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    story: PropTypes.object,
    meta: PropTypes.object,
    path: PropTypes.instanceOf(Immutable.List),
    onDragStart: PropTypes.func,
    children1: PropTypes.instanceOf(Immutable.OrderedMap),
    //actions
    addRule: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
    removeSelf: PropTypes.func.isRequired,
    setConjunction: PropTypes.func.isRequired,
    setStory: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
    setNot: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    //connected:
    dragging: PropTypes.object //{id, x, y, w, h},
  };

  pureShouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  shouldComponentUpdate = this.pureShouldComponentUpdate;

  constructor(props) {
    super(props);

    this._setConjunctionHandlers = {};
  }

  _getSetConjunctionHandler = (itemKey = null) => {
    const k = "" + itemKey;
    let h = this._setConjunctionHandlers[k];
    if (!h) {
      h = this._setConjunction.bind(this, itemKey);
      this._setConjunctionHandlers[k] = h;
    }
    return h;
  };

  _setConjunction = (itemKey, e) => {
    this.props.setConjunction(e, itemKey);
  };

  handleDraggerMouseDown = e => {
    var nodeId = this.props.id;
    var dom = this.refs.group;
    if (this.props.onDragStart) {
      this.props.onDragStart(nodeId, dom, e);
    }
  };

  getGroupPositionClass = () => {
    const { groupActionsPosition } = this.props.config.settings;
    return (
      groupActionsPositionList[groupActionsPosition] ||
      groupActionsPositionList[defaultPosition]
    );
  };

  isGroupTopPosition = () => {
    return startsWith(
      this.props.config.settings.groupActionsPosition || defaultPosition,
      "top"
    );
  };

  isDraftMode(props) {
    return (
      (props.meta || {}).status === "draft" ||
      (props.meta || {}).status === undefined
    );
  }

  getRenderType(props) {
    let renderType;
    if (props.dragging && props.dragging.id == props.id) {
      renderType = props.isForDrag ? "dragging" : "placeholder";
    } else {
      renderType = props.isForDrag ? null : "normal";
    }
    return renderType;
  }

  renderGroup = position => {
    let storyIcon = <Icon type="arrow-right" />;
    if (this.props.story != null) {
      storyIcon = this.props.config.settings.editIcon || <Icon type="check" />;
    }

    return (
      <div className={`group--actions ${position}`}>
        <ButtonGroup size={this.props.config.settings.renderSize || "small"}>
          {!this.props.isRoot && !this.props.allowFurtherNesting ? (
            <Button
              className="action action--SELECT-STORY"
              disabled={
                this.props.config.settings.readonlyMode ||
                !this.isDraftMode(this.props)
              }
              onClick={e => {
                e.preventDefault();
                this.props.config.storyPicker(this.props.setStory);
              }}
            >
              {storyIcon}
              {this.props.story != null
                ? `Story: ${(this.props.story || {}).name}${
                    (this.props.story || {}).variantName
                      ? ` | Variant: ${this.props.story.variantName}`
                      : ""
                  }`
                : "Story"}
            </Button>
          ) : null}
          {!this.props.config.settings.readonlyMode &&
            this.isDraftMode(this.props) &&
            !this.props.isRoot &&
            !this.props.allowFurtherNesting && (
              <Button
                icon="plus"
                className="action action--ADD-RULE"
                onClick={this.props.addRule}
              >
                {this.props.config.settings.addRuleLabel || "Add rule"}
              </Button>
            )}
          {!this.props.config.settings.readonlyMode &&
          this.isDraftMode(this.props) &&
          this.props.allowFurtherNesting ? (
            <Button
              className="action action--ADD-GROUP"
              icon="plus-circle-o"
              onClick={e =>
                this.props.addGroup(
                  e,
                  this.props.isRoot ? "ADD_EXPERIENCE" : ""
                )
              }
            >
              {this.props.isRoot
                ? "Add Experience"
                : this.props.config.settings.addGroupLabel || "Add group"}
            </Button>
          ) : null}
          {!this.props.config.settings.readonlyMode &&
          !this.props.isRoot &&
          this.isDraftMode(this.props) ? (
            <Button
              className="action action--PREVIEW"
              onClick={this.props.config.settings.onPreview}
            >
              {this.props.config.settings.previewLabel || "Preview"}
            </Button>
          ) : null}
          {this.renderMoreOptions()}
        </ButtonGroup>
      </div>
    );
  };

  showDeleteConfirm = e => {
    e.preventDefault();

    Modal.confirm({
      title: "Are you sure?",
      content: "This action can't be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: this.props.removeSelf
    });
  };

  renderMoreOptions = () => {
    if (
      this.props.config.settings.readonlyMode ||
      this.props.isRoot ||
      !this.isDraftMode(this.props)
    ) {
      return null;
    }

    const cookies = ((this.props.meta || {}).cookies || {}).enabled;

    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a
            href="#"
            onClick={e => this.props.config.settings.onCookies(e, this.props)}
          >
            <Switch size="small" checked={cookies} /> Cookie visitors
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <a href="#" onClick={this.showDeleteConfirm}>
            Delete experience
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button className="ant-btn-icon-only action action--MORE-OPTIONS">
          {this.props.config.settings.menuIcon}
        </Button>
      </Dropdown>
    );
  };

  renderChildren = () => {
    let props = this.props;
    return props.children1
      ? props.children1
          .map(item => (
            <Item
              key={item.get("id")}
              id={item.get("id")}
              story={item.get("story")}
              meta={props.meta || item.get("meta")}
              //path={props.path.push(item.get('id'))}
              path={item.get("path")}
              type={item.get("type")}
              properties={item.get("properties")}
              config={props.config}
              actions={props.actions}
              children1={item.get("children1")}
              //tree={props.tree}
              treeNodesCnt={props.treeNodesCnt}
              onDragStart={props.onDragStart}
            />
          ))
          .toList()
      : null;
  };

  renderDragHandle = () => {
    if (
      this.props.config.settings.canReorder &&
      this.props.treeNodesCnt > 2 &&
      !this.props.isRoot &&
      this.isDraftMode(this.props)
    ) {
      return (
        <span
          className={"qb-drag-handler"}
          onMouseDown={this.handleDraggerMouseDown}
        >
          {this.props.config.settings.dragIcon || <Icon type="bars" />}
        </span>
      );
    }

    return null;
  };

  renderHeader = () => {
    let renderConjsAsRadios = false;

    return (
      <div
        className={classNames(
          "group--conjunctions"
          // this.props.children1.size < 2 && this.props.config.settings.hideConjForOne ? 'hide--conj' : ''
        )}
      >
        {this.props.config.settings.renderConjsAsRadios ? (
          <RadioGroup
            disabled={
              this.props.children1.size < 2 || !this.isDraftMode(this.props)
            }
            value={this.props.selectedConjunction}
            size={this.props.config.settings.renderSize || "small"}
            onChange={this.props.setConjunction}
          >
            {map(this.props.conjunctionOptions, (item, index) => (
              <RadioButton
                key={item.id}
                value={item.key}
                //checked={item.checked}
              >
                {item.label}
              </RadioButton>
            ))}
          </RadioGroup>
        ) : (
          <ButtonGroup
            size={this.props.config.settings.renderSize || "small"}
            disabled={this.props.children1.size < 2}
          >
            {this.props.config.settings.showNot && (
              <Button
                onClick={ev => this.props.setNot(ev, !this.props.not)}
                type={this.props.not ? "primary" : null}
              >
                {this.props.config.settings.notLabel}
              </Button>
            )}
            {map(this.props.conjunctionOptions, (item, index) => (
              <Button
                disabled={this.props.children1.size < 2}
                key={item.id}
                type={item.checked ? "primary" : null}
                onClick={this._getSetConjunctionHandler(item.key)}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </div>
    );
  };

  renderFooter() {
    const experienceStatusOptions = map(
        ["draft", "running", "ended", "archived", "scheduled"],
        (label, value) => {
          return (
            <Option key={label} value={label}>
              {label}
            </Option>
          );
        }
      ),
      disabled =
        ["ended", "archived", "scheduled"].indexOf(
          (this.props.meta || {}).status
        ) > -1;

    return !this.props.isRoot && this.props.allowFurtherNesting ? (
      <div className="group--footer">
        <div style={{ display: "none" }}>
          <Input
            key="widget-text"
            ref="text"
            type={"text"}
            value={(this.props.meta || {}).description || null}
            placeholder="description"
            onChange={e => this.props.setMeta({ description: e.target.value })}
          />

          <Select
            style={{ width: 100 }}
            key={"widget-select"}
            dropdownMatchSelectWidth={false}
            ref="val"
            size="small"
            placeholder="status"
            value={(this.props.meta || {}).status || undefined}
            onChange={e => this.props.setMeta({ status: e })}
          >
            {experienceStatusOptions}
          </Select>
        </div>

        <Input
          style={{ width: 200 }}
          key="widget-text"
          ref="experimentName"
          type={"text"}
          value={(this.props.meta || {}).name || null}
          placeholder="Experience name"
          onChange={e => this.props.setMeta({ name: e.target.value })}
          disabled={Boolean((this.props.meta || {}).experiment_id)}
        />

        {this.props.config.gaSignedIn ? (
          <Button
            icon={
              (this.props.meta || {}).experiment_id != null ? "stop" : "plus"
            }
            className="action action--MANAGE-EXPERIMENT"
            disabled={disabled}
            onClick={e => {
              const tmpId = uuid();
              let needsValidation = false;

              e.preventDefault();

              this.props.children1.map(item =>
                item.get("properties").get("story") === undefined
                  ? (needsValidation = true)
                  : ""
              );

              if (needsValidation) {
                swal("Please pick a story for all variants before continuing");
                return;
              }

              if (disabled) {
                return;
              }

              this.props.setMeta({ tmpId: tmpId });

              setTimeout(() => {
                this.props.config.experimentManager({
                  tmpId: tmpId,
                  experimentId: (this.props.meta || {}).experiment_id,
                  gaExperimentId: (this.props.meta || {}).ga_experiment_id,
                  name: this.refs.experimentName.refs.input.value,
                  callback: attr => {
                    this.props.setMeta(attr);

                    if (attr.starting_status) {
                      return;
                    }

                    setTimeout(
                      () =>
                        document.dispatchEvent(new Event("query-builder-save")),
                      100
                    );
                  }
                });
              }, 0);
            }}
          >
            {disabled
              ? "Experience Ended"
              : (this.props.meta || {}).starting_status === "loading"
              ? "Loading..."
              : (this.props.meta || {}).starting_status === "failed"
              ? "Failed"
              : (this.props.meta || {}).experiment_id != null
              ? "Stop Experience"
              : "Start Experience"}
          </Button>
        ) : (
          <span>&nbsp;&nbsp;&nbsp; Connect your Google Analytics first</span>
        )}
      </div>
    ) : null;
  }

  render() {
    let renderType = this.getRenderType(this.props);
    if (!renderType) return null;

    let styles = {};
    if (renderType == "dragging") {
      styles = {
        top: this.props.dragging.y,
        left: this.props.dragging.x,
        width: this.props.dragging.w
      };
    }

    return (
      <div
        className={classNames(
          "group",
          "group-or-rule",
          renderType == "placeholder" ? "qb-placeholder" : null,
          renderType == "dragging" ? "qb-draggable" : null
        )}
        style={styles}
        ref="group"
        data-id={this.props.id}
      >
        <div className="group--header">
          {this.renderDragHandle()}
          {this.renderHeader()}
          {this.isGroupTopPosition() &&
            this.renderGroup(this.getGroupPositionClass())}
        </div>
        {this.props.children1 ? (
          <div
            className={classNames(
              "group--children",
              this.props.children1.size < 2 &&
                this.props.config.settings.hideConjForOne
                ? "hide--line"
                : ""
            )}
          >
            {this.renderChildren()}
          </div>
        ) : null}
        {((this.props.config.settings || {}).page_rule || {})
          .enhance_page_type == "enhanced" && this.renderFooter()}
        {!this.isGroupTopPosition() && (
          <div className="group--footer">
            {this.renderGroup(this.getGroupPositionClass())}
          </div>
        )}
      </div>
    );
  }
}

export default Group;
