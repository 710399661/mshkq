import React from 'react';
import { DropdownProps } from './interface';
import MenuItem from './menu-item';
import Menu from './menu';
interface DropdownState {
}
interface DropdownLayoutProps {
}
interface DropdownAdapter {
}
declare const Dropdown_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<DropdownLayoutProps, any>;
        };
        logicalAdapter: DropdownAdapter;
        readonly RenderComponent: React.ComponentClass<DropdownLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: DropdownAdapter;
        context: any;
        setState<K extends never>(state: DropdownState | ((prevState: Readonly<DropdownState>, props: Readonly<DropdownProps>) => DropdownState | Pick<DropdownState, K>) | Pick<DropdownState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<DropdownProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<DropdownState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<DropdownProps>, nextState: Readonly<DropdownState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<DropdownProps>, prevState: Readonly<DropdownState>): any;
        componentDidUpdate?(prevProps: Readonly<DropdownProps>, prevState: Readonly<DropdownState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<DropdownProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<DropdownProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<DropdownProps>, nextState: Readonly<DropdownState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<DropdownProps>, nextState: Readonly<DropdownState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Dropdown extends Dropdown_base {
    static Item: typeof MenuItem;
    static Menu: typeof Menu;
    render(): JSX.Element;
}
export {};
