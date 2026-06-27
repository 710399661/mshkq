import React from 'react';
import { WebInputProps, MiniInputProps } from './interface';
import Textarea from '../textarea';
interface InputState {
}
interface InputProps extends WebInputProps, MiniInputProps {
}
export interface InputLayoutProps {
}
interface InputAdapter {
}
declare const Input_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<InputLayoutProps, any>;
        };
        logicalAdapter: InputAdapter;
        readonly RenderComponent: React.ComponentClass<InputLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: InputAdapter;
        context: any;
        setState<K extends never>(state: InputState | ((prevState: Readonly<InputState>, props: Readonly<InputProps>) => InputState | Pick<InputState, K>) | Pick<InputState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<InputProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<InputState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<InputProps>, nextState: Readonly<InputState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<InputProps>, prevState: Readonly<InputState>): any;
        componentDidUpdate?(prevProps: Readonly<InputProps>, prevState: Readonly<InputState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<InputProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<InputProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<InputProps>, nextState: Readonly<InputState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<InputProps>, nextState: Readonly<InputState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
declare class Input extends Input_base {
    static Textarea: typeof Textarea;
    render(): JSX.Element;
}
export default Input;
