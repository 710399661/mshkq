import { StyledProps } from '../../utils/_type/StyledProps';
/**
 * Avatar 组件支持的属性
 */
export interface AvatarProps extends StyledProps {
    /**
     * 头像大小
     * @default 'primary'
     */
    size?: 'big' | 'large' | 'primary' | 'small';
    /**
     * 头像是否圆形
     * @default false
     */
    circle?: boolean;
    /**
     * 以文字形式展示头像
     */
    text?: string;
    /**
     * 头像图片地址
     */
    image?: string;
    /**
     * 参考微信[开放数据](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html)
     *
     * **注意：** openData 仅支持 type 为 userAvatarUrl
     */
    openData?: {
        type: 'userAvatarUrl';
    };
}
