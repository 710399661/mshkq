import React from 'react';
import { SwitchProps } from './interface';
interface SwitchState {
}
interface SwitchLayoutProps {
}
interface SwitchAdapter {
}
declare const Switch_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<SwitchLayoutProps, any>;
        };
        logicalAdapter: SwitchAdapter;
        readonly RenderComponent: React.ComponentClass<SwitchLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: SwitchAdapter;
        context: any;
        setState<K extends never>(state: SwitchState | ((prevState: Readonly<SwitchState>, props: Readonly<SwitchProps>) => SwitchState | Pick<SwitchState, K>) | Pick<SwitchState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<SwitchProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<SwitchState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<SwitchProps>, nextState: Readonly<SwitchState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<SwitchProps>, prevState: Readonly<SwitchState>): any;
        componentDidUpdate?(prevProps: Readonly<SwitchProps>, prevState: Readonly<SwitchState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<SwitchProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<SwitchProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<SwitchProps>, nextState: Readonly<SwitchState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<SwitchProps>, nextState: Readonly<SwitchState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Switch extends Switch_base {
    static defaultProps: {
        defaultChecked: boolean;
        disabled: boolean;
        loading: boolean;
        size: number;
        style: {};
        onChange: () => void;
    };
    render(): JSX.Element;
}
export {};
