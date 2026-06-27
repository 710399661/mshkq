import React from 'react';
import { SliderProps } from './interface';
interface SliderState {
}
interface SliderLayoutProps {
}
interface SliderAdapter {
}
declare const Slider_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<SliderLayoutProps, any>;
        };
        logicalAdapter: SliderAdapter;
        readonly RenderComponent: React.ComponentClass<SliderLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: SliderAdapter;
        context: any;
        setState<K extends never>(state: SliderState | ((prevState: Readonly<SliderState>, props: Readonly<SliderProps>) => SliderState | Pick<SliderState, K>) | Pick<SliderState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<SliderProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<SliderState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<SliderProps>, nextState: Readonly<SliderState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<SliderProps>, prevState: Readonly<SliderState>): any;
        componentDidUpdate?(prevProps: Readonly<SliderProps>, prevState: Readonly<SliderState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<SliderProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<SliderProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<SliderProps>, nextState: Readonly<SliderState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<SliderProps>, nextState: Readonly<SliderState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Slider extends Slider_base {
    static defaultProps: {
        onChange: () => void;
        min: number;
        max: number;
        step: number;
        disabled: boolean;
        formatter: (v: any) => any;
    };
    render(): JSX.Element;
}
export {};
