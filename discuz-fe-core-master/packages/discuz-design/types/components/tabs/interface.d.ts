/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * 选项卡（容器）组件 Props
 */
export interface TabsProps extends StyledProps {
    /**
     * children 必须使用 Tabs.Tab 组件来定义选项卡集合
     */
    children?: any;
    /**
     * 当前激活的选项卡 ID，如传入组件为受控状态
     */
    activeId?: string;
    /**
     * 当用户激活指定选项卡时回调
     */
    onActive?: (activeId: string) => void;
    /**
     * tabs 的类型，card 是带阴影的样式，primary 不带阴影
     * @default 'card'
     */
    type?: 'card' | 'primary';
    /**
     * 默认选中的选项卡 ID，如已传入 `activeId`，此属性会被忽略
     */
    defaultActiveId?: string;
    /**
     * tab bar 上额外的元素
     */
    tabBarExtraContent: React.ReactNode;
}
/**
 * 选项卡（面板）组件 Props
 */
export interface TabProps extends StyledProps {
    /**
     * 选项卡 ID，不能重复，会用于设置 key(h5)、wx:key(小程序)
     */
    id: string;
    /**
     * 选项卡标签
     */
    label?: React.ReactNode;
    /**
     * 选项卡内容
     */
    children?: React.ReactNode;
}
