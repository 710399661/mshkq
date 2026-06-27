import React from 'react';
import { StateInterface, PropsInterface } from './interface';
interface LayoutProps {
}
interface Adapter {
}
declare const AudioRecord_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<LayoutProps, any>;
        };
        logicalAdapter: Adapter;
        readonly RenderComponent: React.ComponentClass<LayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: Adapter;
        context: any;
        setState<K extends "second" | "isRecording" | "precent" | "file" | "isIosWechat">(state: StateInterface | ((prevState: Readonly<StateInterface>, props: Readonly<PropsInterface>) => StateInterface | Pick<StateInterface, K>) | Pick<StateInterface, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<PropsInterface> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<StateInterface>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<PropsInterface>, nextState: Readonly<StateInterface>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<PropsInterface>, prevState: Readonly<StateInterface>): any;
        componentDidUpdate?(prevProps: Readonly<PropsInterface>, prevState: Readonly<StateInterface>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<PropsInterface>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<PropsInterface>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<PropsInterface>, nextState: Readonly<StateInterface>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<PropsInterface>, nextState: Readonly<StateInterface>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
/**
 * 录音组件
 * 1、暂时需要在调用此组件的工程中安装recorder-core: npm i recorder-core -S
 * 2、后续需优化一些边界情况
 */
export default class AudioRecord extends AudioRecord_base {
    static defaultProps: {
        onError: () => void;
        onPlay: () => void;
        onPause: () => void;
        onEnded: () => void;
        onRef: () => void;
        loop: boolean;
    };
    setChildrenRef: (ref: any) => void;
    getState: () => any;
    render(): JSX.Element;
}
export {};
