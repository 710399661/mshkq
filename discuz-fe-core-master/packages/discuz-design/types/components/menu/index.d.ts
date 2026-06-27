import React from 'react';
import { MenuProps } from './interface';
import MenuItem from './menu-item';
import MenuItemGroup from './menu-item-group';
import SubMenu from './sub-menu';
interface MenuState {
}
interface MenuLayoutProps {
}
interface MenuAdapter {
}
declare const Menu_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<MenuLayoutProps, any>;
        };
        logicalAdapter: MenuAdapter;
        readonly RenderComponent: React.ComponentClass<MenuLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: MenuAdapter;
        context: any;
        setState<K extends never>(state: MenuState | ((prevState: Readonly<MenuState>, props: Readonly<MenuProps>) => MenuState | Pick<MenuState, K>) | Pick<MenuState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<MenuProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<MenuState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<MenuProps>, nextState: Readonly<MenuState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<MenuProps>, prevState: Readonly<MenuState>): any;
        componentDidUpdate?(prevProps: Readonly<MenuProps>, prevState: Readonly<MenuState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<MenuProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<MenuProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<MenuProps>, nextState: Readonly<MenuState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<MenuProps>, nextState: Readonly<MenuState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Menu extends Menu_base {
    static Item: typeof MenuItem;
    static ItemGroup: typeof MenuItemGroup;
    static SubMenu: typeof SubMenu;
    render(): JSX.Element;
}
export {};
