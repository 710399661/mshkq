export default FixedSizeList;
declare const FixedSizeList: {
    new (props: any): {
        _instanceProps: any;
        _outerRef: any;
        _resetIsScrollingTimeoutId: {
            id: any;
        };
        state: {
            id: any;
            instance: any;
            isScrolling: boolean;
            scrollDirection: string;
            scrollOffset: number;
            scrollUpdateWasRequested: boolean;
            sizeList: any[];
        };
        field: {
            scrollLeft: number;
            scrollTop: number;
            scrollHeight: number;
            scrollWidth: number;
            clientHeight: number;
            clientWidth: number;
        };
        _callOnItemsRendered: (...args: any[]) => any;
        _callOnScroll: (...args: any[]) => any;
        _getSize: (size: any) => any;
        _getSizeUploadSync: (index: any, isHorizontal: any) => Promise<any>;
        _getSizeUpload: (index: any, isHorizontal: any) => any;
        _getCountSize: (props: any, count: any) => any;
        _getSizeCount: (props: any, offset: any) => number;
        _getStyleValue: (value: any) => any;
        _getItemStyle: (index: any) => any;
        _getItemStyleCache: (...args: any[]) => any;
        _onScrollHorizontal: (event: any) => void;
        _onScrollVertical: (event: any) => void;
        _outerRefSetter: (ref: any) => void;
        _resetIsScrollingDebounced: () => void;
        _resetIsScrolling: () => void;
        scrollTo(scrollOffset: any): void;
        scrollToItem(index: any, align?: string): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        componentWillUnmount(): void;
        render(): import("react").DetailedReactHTMLElement<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        _callPropsCallbacks(): void;
        _getRangeToRender(): any[];
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<any> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    };
    getDerivedStateFromProps(nextProps: any, prevState: any): any;
    contextType?: import("react").Context<any>;
};
