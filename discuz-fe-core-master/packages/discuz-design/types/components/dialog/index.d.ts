import React from 'react';
import { DialogProps } from './interface';
interface DialogState {
    visible: boolean;
}
export interface DialogLayoutProps extends DialogProps {
}
interface DialogAdapter {
}
declare const Dialog_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<DialogLayoutProps, any>;
        };
        logicalAdapter: DialogAdapter;
        readonly RenderComponent: React.ComponentClass<DialogLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: DialogAdapter;
        context: any;
        setState<K extends "visible">(state: DialogState | ((prevState: Readonly<DialogState>, props: Readonly<DialogProps>) => DialogState | Pick<DialogState, K>) | Pick<DialogState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<DialogProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<DialogState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<DialogProps>, nextState: Readonly<DialogState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<DialogProps>, prevState: Readonly<DialogState>): any;
        componentDidUpdate?(prevProps: Readonly<DialogProps>, prevState: Readonly<DialogState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<DialogProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<DialogProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<DialogProps>, nextState: Readonly<DialogState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<DialogProps>, nextState: Readonly<DialogState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Dialog extends Dialog_base {
    constructor(props: any);
    static defaultProps: {
        maskClosable: boolean;
        mask: boolean;
        inContext: boolean;
    };
    static show: () => void;
    static hide: () => void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    isControlledComponent: () => boolean;
    getDefaultState: (key: string) => any;
    onClose: () => void;
    render(): JSX.Element;
}
export {};
