import { Component } from 'react';
declare class BaseComponent<P = {}, S = {}, View extends Object = {}, Adapter extends Object = {}> extends Component<P, S> {
    viewAdapter: {
        component: React.ComponentClass<View>;
    };
    logicalAdapter: Adapter;
    constructor(props: any, { viewAdapter: ViewAdapter, logicalAdapter: LogicalAdapter }: {
        viewAdapter: any;
        logicalAdapter: any;
    });
    /**
     * 获取 class prefix
     */
    static readonly clsPrefix = "dzq";
    /**
     * 获取渲染的 Component
     */
    get RenderComponent(): import("react").ComponentClass<View, any>;
    /**
     * 获取 视图适配器，子类需要实现 viewAdapter
     */
    get defaultViewAdapter(): {
        component: any;
    };
    /**
     * 获取 逻辑处理适配器 ，子类需要实现 adapter
     */
    static get defaultLogicalAdapter(): {};
    /**
     * adapter 适配器实例
     */
    get adapter(): Adapter;
}
/**
 * 工厂方法，用于生成基于抽象基类的具体继承类
 * @param {*} param0
 */
export declare const baseComponentFactory: <P extends Object = {}, S extends Object = {}, V extends Object = {}, L extends Object = {}>({ viewAdapter, logicalAdapter, }: {
    viewAdapter: any;
    logicalAdapter: any;
}) => {
    new (props: any): {
        viewAdapter: {
            component: import("react").ComponentClass<V, any>;
        };
        logicalAdapter: L;
        /**
         * 获取渲染的 Component
         */
        readonly RenderComponent: import("react").ComponentClass<V, any>;
        /**
         * 获取 视图适配器，子类需要实现 viewAdapter
         */
        readonly defaultViewAdapter: {
            component: any;
        };
        /**
         * adapter 适配器实例
         */
        readonly adapter: L;
        context: any;
        setState<K extends keyof S>(state: S | ((prevState: Readonly<S>, props: Readonly<P>) => S | Pick<S, K>) | Pick<S, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): import("react").ReactNode;
        readonly props: Readonly<P> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<S>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): any;
        componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    };
    /**
     * 获取 class prefix
     */
    readonly clsPrefix: "dzq";
    /**
     * 获取 逻辑处理适配器 ，子类需要实现 adapter
     */
    readonly defaultLogicalAdapter: {};
    contextType?: import("react").Context<any>;
};
/**
 * 工厂方法，用于生成视图Adapter
 * @param {*} component
 */
export declare const BaseViewAdapterFactory: (component: any) => {
    component: any;
};
export default BaseComponent;
