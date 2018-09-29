import React, {Component} from 'react';
import {Query, Builder, Preview, Utils} from 'react-awesome-query-builder';
const {queryBuilderFormat, queryString} = Utils;
import config from './config';
var stringify = require('json-stringify-safe');
import '../../css/reset.scss';
import '../../css/styles.scss';
import '../../css/compact_styles.scss';
import '../../css/denormalize.scss';
const Immutable = require('immutable');
const transit = require('transit-immutable-js');

export default class DemoQueryBuilder extends Component {
    getChildren(props) {
        const jsonStyle = { backgroundColor: 'darkgrey', margin: '10px', padding: '10px' }
        const storyPicker = (callback) => {
          console.log('story picker... duh', callback);
          callback(69);
        }
        const propsWithStoryPicker = Object.assign({}, props, { config: { ...props.config, storyPicker: storyPicker.bind(this)} } );

        return (
            <div style={{padding: '10px'}}>
                <div className="query-builder">
                    <Builder {...propsWithStoryPicker} />
                </div>
                <br />
                <div>
                  stringFormat:
                  <pre style={jsonStyle}>
                    {stringify(queryString(props.tree, props.config), undefined, 2)}
                  </pre>
                </div>
                <hr/>
                <div>
                  humanStringFormat:
                  <pre style={jsonStyle}>
                    {stringify(queryString(props.tree, props.config, true), undefined, 2)}
                  </pre>
                </div>
                <hr/>
                <div>
                  queryBuilderFormat:
                    <pre style={jsonStyle}>
                      {stringify(queryBuilderFormat(props.tree, props.config), undefined, 2)}
                    </pre>
                </div>
                <hr/>
                <div>
                  Tree:
                  <pre style={jsonStyle}>
                    {stringify(props.tree, undefined, 2)}
                  </pre>
                </div>
                <hr/>
                <div>
                  Immutable Tree:
                  <div style={jsonStyle}>
                    {transit.toJSON(props.tree)}
                  </div>
                </div>
            </div>
        )
    }

    render() {
        let initValueJSON =
            '["~#iM",["type","group","id","9ba9ab8b-0123-4456-b89a-b165f919dcb8","children1",["~#iOM",["b99a9b9a-cdef-4012-b456-7165f919dcb8",["^0",["type","rule","id","b99a9b9a-cdef-4012-b456-7165f919dcb8","properties",["^0",["field",null,"operator",null,"value",["~#iL",[]],"valueSrc",["^2",[]],"operatorOptions",null]],"path",["^2",["9ba9ab8b-0123-4456-b89a-b165f919dcb8","b99a9b9a-cdef-4012-b456-7165f919dcb8"]]]],"8a898a88-89ab-4cde-b012-3165f919ff2f",["^0",["type","group","id","8a898a88-89ab-4cde-b012-3165f919ff2f","properties",["^0",["conjunction","OR"]],"path",["^2",["9ba9ab8b-0123-4456-b89a-b165f919dcb8","8a898a88-89ab-4cde-b012-3165f919ff2f"]],"children1",["^1",["9b9998a8-4567-489a-bcde-f165f919ff31",["^0",["type","rule","id","9b9998a8-4567-489a-bcde-f165f919ff31","properties",["^0",["field","matchedSegments__name","operator","select_equals","value",["^2",["Fortune 1,000"]],"valueSrc",["^2",["value"]],"operatorOptions",null,"conjunction","OR","valueType",["^2",["select"]]]],"path",["^2",["9ba9ab8b-0123-4456-b89a-b165f919dcb8","8a898a88-89ab-4cde-b012-3165f919ff2f","9b9998a8-4567-489a-bcde-f165f919ff31"]]]],"ab88b9ab-0123-4456-b89a-b165f91a5fdf",["^0",["type","rule","id","ab88b9ab-0123-4456-b89a-b165f91a5fdf","properties",["^0",["field",null,"operator",null,"value",["^2",[]],"valueSrc",["^2",[]],"operatorOptions",null]],"path",["^2",["9ba9ab8b-0123-4456-b89a-b165f919dcb8","8a898a88-89ab-4cde-b012-3165f919ff2f","ab88b9ab-0123-4456-b89a-b165f91a5fdf"]]]]]]]]]],"properties",["^0",["conjunction","OR"]],"path",["^2",["9ba9ab8b-0123-4456-b89a-b165f919dcb8"]]]]';

        const {tree, ...config_props} = config;

        return (
            <div>
                <Query
                    value={transit.fromJSON(initValueJSON)}
                    {...config_props}
                    get_children={this.getChildren}
                > </Query>
            </div>
        );
    }
}
