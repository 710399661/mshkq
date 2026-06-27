import React from 'react';
import { ScrollViewProps } from './interface';
interface ScrollViewLayoutProps {
}
interface ScrollViewAdapter {
}
interface ScrollViewStateInterface {
    childrenRef: any;
}
declare const ScrollView_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<ScrollViewLayoutProps, any>;
        };
        logicalAdapter: ScrollViewAdapter;
        readonly RenderComponent: React.ComponentClass<ScrollViewLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: ScrollViewAdapter;
        context: any;
        setState<K extends "childrenRef">(state: ScrollViewStateInterface | ((prevState: Readonly<ScrollViewStateInterface>, props: Readonly<ScrollViewProps>) => ScrollViewStateInterface | Pick<ScrollViewStateInterface, K>) | Pick<ScrollViewStateInterface, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<ScrollViewProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<ScrollViewStateInterface>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ScrollViewProps>, nextState: Readonly<ScrollViewStateInterface>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ScrollViewProps>, prevState: Readonly<ScrollViewStateInterface>): any;
        componentDidUpdate?(prevProps: Readonly<ScrollViewProps>, prevState: Readonly<ScrollViewStateInterface>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ScrollViewProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ScrollViewProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ScrollViewProps>, nextState: Readonly<ScrollViewStateInterface>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ScrollViewProps>, nextState: Readonly<ScrollViewStateInterface>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class ScrollView extends ScrollView_base {
    ref: React.RefObject<unknown>;
    innerRef: () => unknown;
    getScrollTop: () => any;
    render(): JSX.Element;
}
export {};
