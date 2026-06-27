import React from 'react';
import { CardProps } from './interface';
interface CardState {
}
interface CardLayoutProps {
}
interface CardAdapter {
}
declare const Card_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<CardLayoutProps, any>;
        };
        logicalAdapter: CardAdapter;
        readonly RenderComponent: React.ComponentClass<CardLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: CardAdapter;
        context: any;
        setState<K extends never>(state: CardState | ((prevState: Readonly<CardState>, props: Readonly<CardProps>) => CardState | Pick<CardState, K>) | Pick<CardState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<CardProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<CardState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<CardProps>, nextState: Readonly<CardState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<CardProps>, prevState: Readonly<CardState>): any;
        componentDidUpdate?(prevProps: Readonly<CardProps>, prevState: Readonly<CardState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<CardProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<CardProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<CardProps>, nextState: Readonly<CardState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<CardProps>, nextState: Readonly<CardState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Card extends Card_base {
    render(): JSX.Element;
}
export {};
