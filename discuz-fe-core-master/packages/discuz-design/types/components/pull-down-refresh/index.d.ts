import React from 'react';
import { PullDownRefreshProps } from './interface';
interface PullDownRefreshState {
}
interface PullDownRefreshLayoutProps {
}
interface PullDownRefreshAdapter {
}
declare const Card_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<PullDownRefreshLayoutProps, any>;
        };
        logicalAdapter: PullDownRefreshAdapter;
        readonly RenderComponent: React.ComponentClass<PullDownRefreshLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: PullDownRefreshAdapter;
        context: any;
        setState<K extends never>(state: PullDownRefreshState | ((prevState: Readonly<PullDownRefreshState>, props: Readonly<PullDownRefreshProps>) => PullDownRefreshState | Pick<PullDownRefreshState, K>) | Pick<PullDownRefreshState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<PullDownRefreshProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<PullDownRefreshState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<PullDownRefreshProps>, nextState: Readonly<PullDownRefreshState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<PullDownRefreshProps>, prevState: Readonly<PullDownRefreshState>): any;
        componentDidUpdate?(prevProps: Readonly<PullDownRefreshProps>, prevState: Readonly<PullDownRefreshState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<PullDownRefreshProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<PullDownRefreshProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<PullDownRefreshProps>, nextState: Readonly<PullDownRefreshState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<PullDownRefreshProps>, nextState: Readonly<PullDownRefreshState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Card extends Card_base {
    static defaultProps: {
        damping: number;
    };
    render(): JSX.Element;
}
export {};
