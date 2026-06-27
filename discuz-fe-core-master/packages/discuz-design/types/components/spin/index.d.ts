import React from 'react';
import { SpinProps } from './interface';
interface SpinState {
}
interface SpinLayoutProps {
}
interface SpinAdapter {
}
declare const Spin_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<SpinLayoutProps, any>;
        };
        logicalAdapter: SpinAdapter;
        readonly RenderComponent: React.ComponentClass<SpinLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: SpinAdapter;
        context: any;
        setState<K extends never>(state: SpinState | ((prevState: Readonly<SpinState>, props: Readonly<SpinProps>) => SpinState | Pick<SpinState, K>) | Pick<SpinState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<SpinProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<SpinState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<SpinProps>, nextState: Readonly<SpinState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<SpinProps>, prevState: Readonly<SpinState>): any;
        componentDidUpdate?(prevProps: Readonly<SpinProps>, prevState: Readonly<SpinState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<SpinProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<SpinProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<SpinProps>, nextState: Readonly<SpinState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<SpinProps>, nextState: Readonly<SpinState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Spin extends Spin_base {
    static defaultProps: {
        type: string;
        size: number;
        vertical: boolean;
    };
    render(): JSX.Element;
}
export {};
