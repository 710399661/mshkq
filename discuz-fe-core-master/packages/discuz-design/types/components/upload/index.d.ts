import React from 'react';
import { UploadProps } from './interface';
interface UploadState {
}
interface UploadLayoutProps {
}
interface UploadAdapter {
}
declare const Upload_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<UploadLayoutProps, any>;
        };
        logicalAdapter: UploadAdapter;
        readonly RenderComponent: React.ComponentClass<UploadLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: UploadAdapter;
        context: any;
        setState<K extends never>(state: UploadState | ((prevState: Readonly<UploadState>, props: Readonly<UploadProps>) => UploadState | Pick<UploadState, K>) | Pick<UploadState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<UploadProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<UploadState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<UploadProps>, nextState: Readonly<UploadState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<UploadProps>, prevState: Readonly<UploadState>): any;
        componentDidUpdate?(prevProps: Readonly<UploadProps>, prevState: Readonly<UploadState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<UploadProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<UploadProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<UploadProps>, nextState: Readonly<UploadState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<UploadProps>, nextState: Readonly<UploadState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Upload extends Upload_base {
    static defaultProps: {};
    render(): JSX.Element;
}
export {};
