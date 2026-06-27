import React from 'react';
import { SubMenuProps } from './interface';
interface SubMenuState {
}
interface SubMenuLayoutProps {
}
interface SubMenuAdapter {
}
declare const SubMenu_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<SubMenuLayoutProps, any>;
        };
        logicalAdapter: SubMenuAdapter;
        readonly RenderComponent: React.ComponentClass<SubMenuLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: SubMenuAdapter;
        context: any;
        setState<K extends never>(state: SubMenuState | ((prevState: Readonly<SubMenuState>, props: Readonly<SubMenuProps>) => SubMenuState | Pick<SubMenuState, K>) | Pick<SubMenuState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<SubMenuProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<SubMenuState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<SubMenuProps>, nextState: Readonly<SubMenuState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<SubMenuProps>, prevState: Readonly<SubMenuState>): any;
        componentDidUpdate?(prevProps: Readonly<SubMenuProps>, prevState: Readonly<SubMenuState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<SubMenuProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<SubMenuProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<SubMenuProps>, nextState: Readonly<SubMenuState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<SubMenuProps>, nextState: Readonly<SubMenuState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class SubMenu extends SubMenu_base {
    render(): JSX.Element;
}
export {};
