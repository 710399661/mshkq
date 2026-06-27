import React from 'react';
import { MenuItemGroupProps } from './interface';
interface MenuItemGroupState {
}
interface MenuItemGroupLayoutProps {
}
interface MenuItemGroupAdapter {
}
declare const MenuItemGroup_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<MenuItemGroupLayoutProps, any>;
        };
        logicalAdapter: MenuItemGroupAdapter;
        readonly RenderComponent: React.ComponentClass<MenuItemGroupLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: MenuItemGroupAdapter;
        context: any;
        setState<K extends never>(state: MenuItemGroupState | ((prevState: Readonly<MenuItemGroupState>, props: Readonly<MenuItemGroupProps>) => MenuItemGroupState | Pick<MenuItemGroupState, K>) | Pick<MenuItemGroupState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<MenuItemGroupProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<MenuItemGroupState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<MenuItemGroupProps>, nextState: Readonly<MenuItemGroupState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<MenuItemGroupProps>, prevState: Readonly<MenuItemGroupState>): any;
        componentDidUpdate?(prevProps: Readonly<MenuItemGroupProps>, prevState: Readonly<MenuItemGroupState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<MenuItemGroupProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<MenuItemGroupProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<MenuItemGroupProps>, nextState: Readonly<MenuItemGroupState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<MenuItemGroupProps>, nextState: Readonly<MenuItemGroupState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class MenuItemGroup extends MenuItemGroup_base {
    render(): JSX.Element;
}
export {};
