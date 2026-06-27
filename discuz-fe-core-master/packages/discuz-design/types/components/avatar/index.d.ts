import React from 'react';
import { AvatarProps } from './interface';
interface AvatarState {
}
interface AvatarLayoutProps {
}
interface AvatarAdapter {
}
declare const Avatar_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<AvatarLayoutProps, any>;
        };
        logicalAdapter: AvatarAdapter;
        readonly RenderComponent: React.ComponentClass<AvatarLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: AvatarAdapter;
        context: any;
        setState<K extends never>(state: AvatarState | ((prevState: Readonly<AvatarState>, props: Readonly<AvatarProps>) => AvatarState | Pick<AvatarState, K>) | Pick<AvatarState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<AvatarProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<AvatarState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<AvatarProps>, nextState: Readonly<AvatarState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<AvatarProps>, prevState: Readonly<AvatarState>): any;
        componentDidUpdate?(prevProps: Readonly<AvatarProps>, prevState: Readonly<AvatarState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<AvatarProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<AvatarProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<AvatarProps>, nextState: Readonly<AvatarState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<AvatarProps>, nextState: Readonly<AvatarState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Avatar extends Avatar_base {
    static defaultProps: {
        size: string;
        circle: boolean;
    };
    render(): JSX.Element;
}
export {};
