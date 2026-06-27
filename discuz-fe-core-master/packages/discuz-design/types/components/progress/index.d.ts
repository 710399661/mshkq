import React from 'react';
import { ProgressProps } from './interface';
interface ProgressState {
}
interface ProgressLayoutProps {
}
interface ProgressAdapter {
}
declare const Progress_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<ProgressLayoutProps, any>;
        };
        logicalAdapter: ProgressAdapter;
        readonly RenderComponent: React.ComponentClass<ProgressLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: ProgressAdapter;
        context: any;
        setState<K extends never>(state: ProgressState | ((prevState: Readonly<ProgressState>, props: Readonly<ProgressProps>) => ProgressState | Pick<ProgressState, K>) | Pick<ProgressState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<ProgressProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<ProgressState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ProgressProps>, nextState: Readonly<ProgressState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ProgressProps>, prevState: Readonly<ProgressState>): any;
        componentDidUpdate?(prevProps: Readonly<ProgressProps>, prevState: Readonly<ProgressState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ProgressProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ProgressProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ProgressProps>, nextState: Readonly<ProgressState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ProgressProps>, nextState: Readonly<ProgressState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Progress extends Progress_base {
    static defaultProps: {
        style: {};
        percent: number;
        theme: string;
        lineWidth: number;
        width: number;
        className: string;
        text: string;
        isShowText: boolean;
    };
    render(): JSX.Element;
}
export {};
