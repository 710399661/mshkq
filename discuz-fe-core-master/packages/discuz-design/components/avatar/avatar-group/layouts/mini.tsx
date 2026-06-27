import React, { Fragment } from 'react';
import { View } from '@tarojs/components';
import classnames from 'classnames';
import { AvatarGroupProps } from '../interface';
import { ConfigContext } from '../../../../extends/configContext';
import Avatar from '../../index';

export class AvatarGroupMiniLayout extends React.Component<AvatarGroupProps> {
  static contextType = ConfigContext;

  onClick(event): void {
    typeof this.props.onClick === 'function' && this.props.onClick(event);
  }
  render() {
    const { clsPrefix } = this.context;
    const {
      size,
      groupData,
      maxCount,
      uppercase,
      circle,
      style = {},
      className,
    } = this.props;

    let elem: React.ReactNode;
    const componentPrefix = `${clsPrefix}-avatar-group`;

    if (groupData?.length) {
      elem = groupData?.map((option, index: number) => {
        const { image, text, className, style } = option;
        if (index > maxCount) {
          return <Fragment key={index}></Fragment>;
        }
        const avatarImgClassNames = classnames(`${componentPrefix}__img`, className);
        const surplusNum = maxCount === index ? groupData.length - maxCount : 0;
        return (
          <Avatar
            key={index}
            circle={circle}
            size={size}
            surplus={surplusNum}
            className={avatarImgClassNames}
            style={style}
            uppercase={uppercase}
            image={image}
            text={text}
          />
        );
      });
    }

    return (
      <View
        className={classnames(componentPrefix, className)}
        style={style}
        onClick={event => this.onClick(event)}
      >
        {elem}
      </View>
    );
  }
}
