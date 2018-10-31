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
          callback({id: 69, name: 'such Mad'});
        }
        const experimentManager = (callback) => {
          console.log('experiment manager... duh', callback);
          callback(420);
        }
        const propsWithStoryPicker = Object.assign({},
                                                  props,
                                                  { config: { ...props.config,
                                                   experimentManager: experimentManager.bind(this),
                                                   storyPicker: storyPicker.bind(this)
                                                 } } );
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
            '["~#iM",["type","group","id","9a99988a-0123-4456-b89a-b1607f326fd8","children1",["~#iOM",["baaba898-89ab-4cde-b012-3166c738311e",["^0",["type","group","id","baaba898-89ab-4cde-b012-3166c738311e","properties",["^0",["conjunction","AND"]],"children1",["^1",["b8a88abb-4567-489a-bcde-f166c738311e",["^0",["type","rule","id","b8a88abb-4567-489a-bcde-f166c738311e","properties",["^0",["field",null,"operator",null,"value",["~#iL",[]],"valueSrc",["^2",[]],"operatorOptions",null,"conjunction","AND"]]]]]]]]]],"properties",["^0",["conjunction","AND"]]]]'

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
