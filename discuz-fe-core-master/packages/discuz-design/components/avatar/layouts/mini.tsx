import React from 'react';
import { View, Image, OpenData, Text } from '@tarojs/components';
import classnames from 'classnames';
import { AvatarProps } from '../interface';
import { ConfigContext } from '../../../extends/configContext';
import { SIZE_CLASS, ICON_SIZE_CLASS } from './const';
import Icon from '../../../components/icon';

interface AvatarState {
  isImage: boolean
}

export class AvatarMiniLayout extends React.Component<AvatarProps, AvatarState> {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);
    this.state = {
      isImage: true,
    };
  }

  handleImgError = () => {
    this.setState({
      isImage: false,
    });
  };

  handleOnLoad = () => {
    this.setState({
      isImage: true,
    });
  };

  onClick(event): void {
    typeof this.props.onClick === 'function' && this.props.onClick(event);
  }

  getElem = (isImage) => {
    const { clsPrefix } = this.context;
    const {
      size,
      image,
    } = this.props;
    const defaultIconSize = ICON_SIZE_CLASS[size || 'primary'];
    if (isImage) {
      return (
      <Image
        onError={this.handleImgError}
        onLoad={this.handleOnLoad}
        className={`${clsPrefix}-avatar__img`}
        src={image}
      ></Image>
      );
    }
    return (
    <Icon
      size={defaultIconSize}
      name='UserOutlined'
      className={`${clsPrefix}-avatar__img`}
    />
    );
  }

  render() {
    const { clsPrefix } = this.context;
    const {
      size,
      circle,
      image,
      text,
      openData,
      surplus,
      style = {},
      className,
      uppercase,
    } = this.props;
    const { isImage } = this.state;

    let letter = '';
    if (text) letter = uppercase ? (text || '').toLocaleUpperCase()[0] : text[0];

    const iconSize = SIZE_CLASS[size || 'primary'];

    let elem: React.ReactNode;
    if (surplus) {
      elem = <View className={`${clsPrefix}-avatar__text`}>{`+${surplus}`}</View>;
    } else if (openData && openData.type === 'userAvatarUrl') {
      elem = <OpenData type={openData.type}></OpenData>;
    } else if (image) {
      elem = this.getElem(isImage);
    } else if (text) {
      elem = <Text className={`${clsPrefix}-avatar__text`}>{letter}</Text>;
    }

    return (
      <View
        className={classnames(className, `${clsPrefix}-avatar`, {
          [`${clsPrefix}-avatar--circle`]: circle,
          [`${clsPrefix}-avatar--${iconSize}`]: iconSize,
        })}
        style={style}
        onClick={event => this.onClick(event)}
      >
        {elem}
      </View>
    );
  }
}
