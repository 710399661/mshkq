/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
export interface AnimationProps extends StyledProps {
    /**
     * 内容
     */
    children?: React.ReactNode;
    /**
     * 执行动画
     */
    action?: boolean;
    /**
     * 切换的css动画的class名称
     */
    toggleClass?: string;
    /**
     * 进入动画的自定义class名称，存在 toggleClass 时无效
     */
    enterClass?: string;
    /**
     * 离开动画的自定义class名称，存在 toggleClass 时无效
     */
    leaveClass?: string;
    /**
     * 动画的class名称，存在 toggleClass 时无效
     */
    name?: string;
    /**
     * 动画延迟执行时间
     */
    delay?: string;
    /**
     * 动画执行时间长度
     */
    duration?: string;
    /**
     * 动画执行次数，只在执行 CSS3 动画时有效
     */
    count?: number;
    /**
     * 动画缓动函数
     */
    easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
    /**
     * 是否强制轮流反向播放动画，count 为 1 时无效
     */
    reverse?: boolean;
    /**
     * 动画结束的回调
     */
    onEnd?: (any: any) => void;
    /**
     * 离开动画结束时卸载元素
     */
    exist?: boolean;
}
