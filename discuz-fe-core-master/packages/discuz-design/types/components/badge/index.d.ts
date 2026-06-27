import React from 'react';
import { BadgeProps } from './interface';
interface BadgeState {
}
interface BadgeLayoutProps {
}
interface BadgeAdapter {
}
declare const Badge_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<BadgeLayoutProps, any>;
        };
        logicalAdapter: BadgeAdapter;
        readonly RenderComponent: React.ComponentClass<BadgeLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: BadgeAdapter;
        context: any;
        setState<K extends never>(state: BadgeState | ((prevState: Readonly<BadgeState>, props: Readonly<BadgeProps>) => BadgeState | Pick<BadgeState, K>) | Pick<BadgeState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<BadgeProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<BadgeState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<BadgeProps>, nextState: Readonly<BadgeState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<BadgeProps>, prevState: Readonly<BadgeState>): any;
        componentDidUpdate?(prevProps: Readonly<BadgeProps>, prevState: Readonly<BadgeState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<BadgeProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<BadgeProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<BadgeProps>, nextState: Readonly<BadgeState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<BadgeProps>, nextState: Readonly<BadgeState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Badge extends Badge_base {
    static defaultProps: {};
    render(): JSX.Element;
}
export {};
