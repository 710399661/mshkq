import React, { Component } from 'react';

import isServer from '../is-server';
import {router} from '@discuzq/sdk/dist';
import Request from '@discuzq/sdk/dist/api/_example';
import { handleError } from '@discuzq/sdk/dist/api/utils/handle-error';

export default class PluginComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidCatch(err) {
        console.error('DZQ插件发生错误：',err);
    }

    render() {
        if (isServer()) return null;
        const {_pluginInfo} = this.props;

        // 异步载入会是padding
        if ( !_pluginInfo.Component || _pluginInfo.Component === 'padding' ) return null;

        return React.cloneElement(_pluginInfo.Component, {
            ...this.props,
            dzqRouter: router,
            dzqRequest: Request,
            dzqRequestHandleError: handleError
        });
    }
}

