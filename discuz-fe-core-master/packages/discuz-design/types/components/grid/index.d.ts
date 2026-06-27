import React from 'react';
import { GridProps } from './interface';
interface GridState {
}
interface GridLayoutProps {
}
interface GridAdapter {
}
declare const Card_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<GridLayoutProps, any>;
        };
        logicalAdapter: GridAdapter;
        readonly RenderComponent: React.ComponentClass<GridLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: GridAdapter;
        context: any;
        setState<K extends never>(state: GridState | ((prevState: Readonly<GridState>, props: Readonly<GridProps>) => GridState | Pick<GridState, K>) | Pick<GridState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<GridProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<GridState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<GridProps>, nextState: Readonly<GridState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<GridProps>, prevState: Readonly<GridState>): any;
        componentDidUpdate?(prevProps: Readonly<GridProps>, prevState: Readonly<GridState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<GridProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<GridProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<GridProps>, nextState: Readonly<GridState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<GridProps>, nextState: Readonly<GridState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Card extends Card_base {
    render(): JSX.Element;
}
export {};
