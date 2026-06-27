import React from 'react';
import { MenuItemProps } from './interface';
interface MenuItemState {
}
interface MenuItemLayoutProps {
}
interface MenuItemAdapter {
}
declare const Menu_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<MenuItemLayoutProps, any>;
        };
        logicalAdapter: MenuItemAdapter;
        readonly RenderComponent: React.ComponentClass<MenuItemLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: MenuItemAdapter;
        context: any;
        setState<K extends never>(state: MenuItemState | ((prevState: Readonly<MenuItemState>, props: Readonly<MenuItemProps>) => MenuItemState | Pick<MenuItemState, K>) | Pick<MenuItemState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<MenuItemProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<MenuItemState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<MenuItemProps>, nextState: Readonly<MenuItemState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<MenuItemProps>, prevState: Readonly<MenuItemState>): any;
        componentDidUpdate?(prevProps: Readonly<MenuItemProps>, prevState: Readonly<MenuItemState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<MenuItemProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<MenuItemProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<MenuItemProps>, nextState: Readonly<MenuItemState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<MenuItemProps>, nextState: Readonly<MenuItemState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Menu extends Menu_base {
    render(): JSX.Element;
}
export {};
