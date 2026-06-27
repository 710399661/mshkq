import React from 'react';
import { MiniButtonProps, WebButtonProps } from './interface';
interface ButtonProps extends MiniButtonProps, WebButtonProps {
}
interface ButtonState {
}
interface ButtonLayoutProps {
}
interface ButtonAdapter {
}
declare const Button_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<ButtonLayoutProps, any>;
        };
        logicalAdapter: ButtonAdapter;
        readonly RenderComponent: React.ComponentClass<ButtonLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: ButtonAdapter;
        context: any;
        setState<K extends never>(state: ButtonState | ((prevState: Readonly<ButtonState>, props: Readonly<ButtonProps>) => ButtonState | Pick<ButtonState, K>) | Pick<ButtonState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<ButtonProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<ButtonState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ButtonProps>, nextState: Readonly<ButtonState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ButtonProps>, prevState: Readonly<ButtonState>): any;
        componentDidUpdate?(prevProps: Readonly<ButtonProps>, prevState: Readonly<ButtonState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ButtonProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ButtonProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ButtonProps>, nextState: Readonly<ButtonState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ButtonProps>, nextState: Readonly<ButtonState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Button extends Button_base {
    render(): JSX.Element;
}
export {};
