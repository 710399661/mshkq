import React from 'react';
import { AlertProps } from './interface';
interface AlertState {
}
interface AlertLayoutProps {
}
interface AlertAdapter {
}
declare const Alert_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<AlertLayoutProps, any>;
        };
        logicalAdapter: AlertAdapter;
        readonly RenderComponent: React.ComponentClass<AlertLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: AlertAdapter;
        context: any;
        setState<K extends never>(state: AlertState | ((prevState: Readonly<AlertState>, props: Readonly<AlertProps>) => AlertState | Pick<AlertState, K>) | Pick<AlertState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<AlertProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<AlertState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<AlertProps>, nextState: Readonly<AlertState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<AlertProps>, prevState: Readonly<AlertState>): any;
        componentDidUpdate?(prevProps: Readonly<AlertProps>, prevState: Readonly<AlertState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<AlertProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<AlertProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<AlertProps>, nextState: Readonly<AlertState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<AlertProps>, nextState: Readonly<AlertState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Alert extends Alert_base {
    render(): JSX.Element;
}
export {};
