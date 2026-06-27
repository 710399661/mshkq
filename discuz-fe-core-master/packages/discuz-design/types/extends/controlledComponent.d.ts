/// <reference types="react" />
export declare const controlledComponentFactory: <P extends Object = {}, S extends Object = {}, V extends Object = {}, L extends Object = {}>({ viewAdapter, logicalAdapter, }: {
    viewAdapter: any;
    logicalAdapter: any;
}) => {
    new (props: any): {
        onChange: any;
        getDefaultState(): void;
        internalOnChange(): void;
        viewAdapter: {
            component: import("react").ComponentClass<V, any>;
        };
        logicalAdapter: L;
        readonly RenderComponent: import("react").ComponentClass<V, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
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
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: import("react").Context<any>;
};
