import React from 'react';
import { DividerProps } from './interface';
interface DividerState {
}
interface DividerLayoutProps {
}
interface DividerAdapter {
}
declare const Divider_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<DividerLayoutProps, any>;
        };
        logicalAdapter: DividerAdapter;
        readonly RenderComponent: React.ComponentClass<DividerLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: DividerAdapter;
        context: any;
        setState<K extends never>(state: DividerState | ((prevState: Readonly<DividerState>, props: Readonly<DividerProps>) => DividerState | Pick<DividerState, K>) | Pick<DividerState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<DividerProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<DividerState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<DividerProps>, nextState: Readonly<DividerState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<DividerProps>, prevState: Readonly<DividerState>): any;
        componentDidUpdate?(prevProps: Readonly<DividerProps>, prevState: Readonly<DividerState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<DividerProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<DividerProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<DividerProps>, nextState: Readonly<DividerState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<DividerProps>, nextState: Readonly<DividerState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Divider extends Divider_base {
    render(): JSX.Element;
}
export {};
