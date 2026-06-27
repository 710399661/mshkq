import { StyledProps } from 'utils/_type/StyledProps';
/**
 * Node 节点
 */
export interface NodeType {
    /**
     * 节点的类型
     */
    type: string;
    /**
     * 节点的名称
     */
    name: string;
    /**
     * 子节点
     */
    children: NodeType[];
    /**
     * 下一个节点
     */
    next: NodeType;
    /**
     * 前一个节点
     */
    pref: NodeType;
    /**
     * 父节点
     */
    parent: NodeType;
    /**
     * 如果节点类型是 text，节点的值
     */
    data?: string;
    /**
     * 节点的附加属性
     */
    attribs: {
        [key: string]: any;
    };
}
/**
 * Icon 组件支持的属性
 */
export interface RichTextProps extends StyledProps {
    /**
     * 富文本的 html 字符串
     */
    content: string;
    /**
     * 图片被点击时的回调
     */
    onImgClick?: (node: NodeType) => void;
    /**
     * 链接被点击时的回调
     */
    onLinkClick?: (node: NodeType) => void;
    /**
     * 解析 html 字符串完毕时的回调
     */
    onParse?: (nodeTree: NodeType[], imgUrls: string[]) => void;
    /**
     * 容器点击事件
     */
    onClick: (e: any, targetNode: null | NodeType) => any;
}
