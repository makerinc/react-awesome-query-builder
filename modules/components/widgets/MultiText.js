import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Input, Col } from 'antd';
import shallowCompare from 'react-addons-shallow-compare';

export default class MultiTextWidget extends Component {
  static propTypes = {
    setValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    config: PropTypes.object.isRequired,
    value: PropTypes.object,
    field: PropTypes.string.isRequired,
    customProps: PropTypes.object,
  };

  shouldComponentUpdate = shallowCompare;

  handleChange = () => {
    this.props.setValue({ textKey: ReactDOM.findDOMNode(this.refs.textKey).value,
                          textValue: ReactDOM.findDOMNode(this.refs.textValue).value });
  }

  render() {
    let customProps = this.props.customProps || {};

    return (
      <div>
        <Col style={{display: "inline-block", marginLeft: "5px"}}>
          <Input
            key="widget-text"
            size={this.props.config.settings.renderSize || "small"}
            ref="textKey"
            type={"text"}
            value={(this.props.value || {}).textKey || null}
            placeholder={this.props.keyPlaceholder || "Key"}
            onChange={this.handleChange}
            {...customProps}
          />
        </Col>
        <Col style={{display: "inline-block", marginLeft: "5px"}}>
          <Input
            key="widget-text"
            size={this.props.config.settings.renderSize || "small"}
            ref="textValue"
            type={"text"}
            value={(this.props.value || {}).textValue || null}
            placeholder={this.props.valuePlaceholder || "Value"}
            onChange={this.handleChange}
            {...customProps}
          />
        </Col>
      </div>
    );
  }
}
