import React from 'react';
import { TagProps } from './interface';
interface TagState {
}
interface TagLayoutProps {
}
interface TagAdapter {
}
declare const Tag_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<TagLayoutProps, any>;
        };
        logicalAdapter: TagAdapter;
        readonly RenderComponent: React.ComponentClass<TagLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: TagAdapter;
        context: any;
        setState<K extends never>(state: TagState | ((prevState: Readonly<TagState>, props: Readonly<TagProps>) => TagState | Pick<TagState, K>) | Pick<TagState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<TagProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<TagState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<TagProps>, nextState: Readonly<TagState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<TagProps>, prevState: Readonly<TagState>): any;
        componentDidUpdate?(prevProps: Readonly<TagProps>, prevState: Readonly<TagState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<TagProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<TagProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<TagProps>, nextState: Readonly<TagState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<TagProps>, nextState: Readonly<TagState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Tag extends Tag_base {
    static defaultProps: {
        type: string;
        closeable: boolean;
        onClose: () => void;
        onClick: () => void;
    };
    render(): JSX.Element;
}
export {};
