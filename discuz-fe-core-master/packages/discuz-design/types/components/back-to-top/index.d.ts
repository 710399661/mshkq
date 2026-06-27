import React from 'react';
import { BackToTopProps } from './interface';
interface BackToTopState {
}
interface BackToTopLayoutProps {
}
interface BackToTopAdapter {
}
declare const BackToTop_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<BackToTopLayoutProps, any>;
        };
        logicalAdapter: BackToTopAdapter;
        readonly RenderComponent: React.ComponentClass<BackToTopLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: BackToTopAdapter;
        context: any;
        setState<K extends never>(state: BackToTopState | ((prevState: Readonly<BackToTopState>, props: Readonly<BackToTopProps>) => BackToTopState | Pick<BackToTopState, K>) | Pick<BackToTopState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<BackToTopProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<BackToTopState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<BackToTopProps>, nextState: Readonly<BackToTopState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<BackToTopProps>, prevState: Readonly<BackToTopState>): any;
        componentDidUpdate?(prevProps: Readonly<BackToTopProps>, prevState: Readonly<BackToTopState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<BackToTopProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<BackToTopProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<BackToTopProps>, nextState: Readonly<BackToTopState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<BackToTopProps>, nextState: Readonly<BackToTopState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class BackToTop extends BackToTop_base {
    static defaultProps: {
        right: number;
        bottom: number;
        onClick: () => void;
        visibilityHeight: number;
    };
    render(): JSX.Element;
}
export {};
