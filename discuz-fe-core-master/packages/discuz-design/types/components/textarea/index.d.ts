import React from 'react';
import { WebTextareaProps, MiniTextareaProps } from './interface';
interface TextareaState {
}
interface TextareaProps extends WebTextareaProps, MiniTextareaProps {
}
export interface TextareaLayoutProps {
}
interface TextareaAdapter {
}
declare const Textarea_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<TextareaLayoutProps, any>;
        };
        logicalAdapter: TextareaAdapter;
        readonly RenderComponent: React.ComponentClass<TextareaLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: TextareaAdapter;
        context: any;
        setState<K extends never>(state: TextareaState | ((prevState: Readonly<TextareaState>, props: Readonly<TextareaProps>) => TextareaState | Pick<TextareaState, K>) | Pick<TextareaState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<TextareaProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<TextareaState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<TextareaProps>, nextState: Readonly<TextareaState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<TextareaProps>, prevState: Readonly<TextareaState>): any;
        componentDidUpdate?(prevProps: Readonly<TextareaProps>, prevState: Readonly<TextareaState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<TextareaProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<TextareaProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<TextareaProps>, nextState: Readonly<TextareaState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<TextareaProps>, nextState: Readonly<TextareaState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Textarea extends Textarea_base {
    render(): JSX.Element;
}
export {};
