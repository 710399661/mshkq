import React from 'react';
import { CheckProps } from './interface';
interface CheckState {
}
interface CheckLayoutProps {
}
interface CheckAdapter {
}
declare const Check_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<CheckLayoutProps, any>;
        };
        logicalAdapter: CheckAdapter;
        readonly RenderComponent: React.ComponentClass<CheckLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: CheckAdapter;
        context: any;
        setState<K extends never>(state: CheckState | ((prevState: Readonly<CheckState>, props: Readonly<CheckProps>) => CheckState | Pick<CheckState, K>) | Pick<CheckState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<CheckProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<CheckState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<CheckProps>, nextState: Readonly<CheckState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<CheckProps>, prevState: Readonly<CheckState>): any;
        componentDidUpdate?(prevProps: Readonly<CheckProps>, prevState: Readonly<CheckState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<CheckProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<CheckProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<CheckProps>, nextState: Readonly<CheckState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<CheckProps>, nextState: Readonly<CheckState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Check extends Check_base {
    render(): JSX.Element;
}
export {};
