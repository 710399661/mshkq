import React from 'react';
import { WebPopupProps } from './interface';
interface PopupState {
}
interface PopupLayoutProps extends WebPopupProps {
}
interface PopupAdapter {
}
declare const Popup_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<PopupLayoutProps, any>;
        };
        logicalAdapter: PopupAdapter;
        readonly RenderComponent: React.ComponentClass<PopupLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: PopupAdapter;
        context: any;
        setState<K extends never>(state: PopupState | ((prevState: Readonly<PopupState>, props: Readonly<WebPopupProps>) => PopupState | Pick<PopupState, K>) | Pick<PopupState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<WebPopupProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<PopupState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<WebPopupProps>, nextState: Readonly<PopupState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<WebPopupProps>, prevState: Readonly<PopupState>): any;
        componentDidUpdate?(prevProps: Readonly<WebPopupProps>, prevState: Readonly<PopupState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<WebPopupProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<WebPopupProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<WebPopupProps>, nextState: Readonly<PopupState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<WebPopupProps>, nextState: Readonly<PopupState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Popup extends Popup_base {
    static defaultProps: {
        position: string;
        maskClosable: boolean;
        onClose: () => void;
        containerClassName: string;
    };
    render(): JSX.Element;
}
export {};
