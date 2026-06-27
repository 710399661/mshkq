import React from 'react';
import { RichTextProps, NodeType } from './interface';
import { StyledProps } from 'utils/_type/StyledProps';
export { htmlparser2 } from 'react-html-parser';
interface RichTextState {
}
export interface RichTextLayoutProps extends StyledProps {
    content: string;
    onImgClick?: RichTextProps['onImgClick'];
    onLinkClick?: RichTextProps['onLinkClick'];
    onParse?: RichTextProps['onParse'];
    transform: (node: NodeType, index: string) => any;
    onWrapperClick: (e: any) => any;
    parserOptions: any;
    style: React.CSSProperties;
}
interface RichTextAdapter {
    transform: (node: NodeType, index: string) => any;
    onWrapperClick: (e: any) => any;
}
declare const RichText_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<RichTextLayoutProps, any>;
        };
        logicalAdapter: RichTextAdapter;
        readonly RenderComponent: React.ComponentClass<RichTextLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: RichTextAdapter;
        context: any;
        setState<K extends never>(state: RichTextState | ((prevState: Readonly<RichTextState>, props: Readonly<RichTextProps>) => RichTextState | Pick<RichTextState, K>) | Pick<RichTextState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<RichTextProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<RichTextState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<RichTextProps>, nextState: Readonly<RichTextState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<RichTextProps>, prevState: Readonly<RichTextState>): any;
        componentDidUpdate?(prevProps: Readonly<RichTextProps>, prevState: Readonly<RichTextState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<RichTextProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<RichTextProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<RichTextProps>, nextState: Readonly<RichTextState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<RichTextProps>, nextState: Readonly<RichTextState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class RichText extends RichText_base {
    /**
     * 在 web 的实现中，因为 SSR 也会执行一遍，所以这里采用顺序索引
     */
    idCount: number;
    nodes: {};
    nodeTree: any[];
    imgUrls: any[];
    options: {
        transform: (node: NodeType, index: string) => any;
        decodeEntities: boolean;
        preprocessNodes: (nodes: any) => any;
    };
    constructor(props: any);
    static getTransformFn(): any;
    componentDidMount(): void;
    onImgClick(node: any): void;
    onLinkClick(node: any): void;
    onClick(e: any, targetNode: null | NodeType): void;
    onParse(nodeTree: any): void;
    render(): JSX.Element;
}
