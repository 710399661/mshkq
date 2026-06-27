import React from 'react';
import { AnimationProps } from './interface';
interface AnimationState {
}
interface AnimationLayoutProps {
}
interface AnimationAdapter {
}
declare const Animation_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<AnimationLayoutProps, any>;
        };
        logicalAdapter: AnimationAdapter;
        readonly RenderComponent: React.ComponentClass<AnimationLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: AnimationAdapter;
        context: any;
        setState<K extends never>(state: AnimationState | ((prevState: Readonly<AnimationState>, props: Readonly<AnimationProps>) => AnimationState | Pick<AnimationState, K>) | Pick<AnimationState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<AnimationProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<AnimationState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<AnimationProps>, nextState: Readonly<AnimationState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<AnimationProps>, prevState: Readonly<AnimationState>): any;
        componentDidUpdate?(prevProps: Readonly<AnimationProps>, prevState: Readonly<AnimationState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<AnimationProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<AnimationProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<AnimationProps>, nextState: Readonly<AnimationState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<AnimationProps>, nextState: Readonly<AnimationState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Animation extends Animation_base {
    static defaultProps: {
        action: boolean;
        count: number;
        reverse: boolean;
        exist: boolean;
    };
    render(): JSX.Element;
}
export {};
