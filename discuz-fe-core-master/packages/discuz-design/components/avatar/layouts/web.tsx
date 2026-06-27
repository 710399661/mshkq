import React from 'react';
import classnames from 'classnames';
import { AvatarProps } from '../interface';
import Icon from '../../../components/icon';
import { ConfigContext } from '../../../extends/configContext';
import { SIZE_CLASS, ICON_SIZE_CLASS } from './const';

interface AvatarState {
  isImage: boolean
}

export class AvatarWebLayout extends React.Component<AvatarProps, AvatarState> {
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

  onMouseOver(event): void {
    typeof this.props.onMouseOver === 'function' && this.props.onMouseOver(event);
  }

  onMouseOut(event): void {
    typeof this.props.onMouseOut === 'function' && this.props.onMouseOut(event);
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
        <img
          onError={this.handleImgError}
          onLoad={this.handleOnLoad}
          className={`${clsPrefix}-avatar__img`}
          src={image}
          alt="图片"
        ></img>
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
      uppercase,
      surplus,
      openData,
      style = {},
      className,
    } = this.props;
    const { isImage } = this.state;

    let letter = '';
    if (text) letter = uppercase ? (text || '').toLocaleUpperCase()[0] : text[0];

    const iconSize = SIZE_CLASS[size || 'primary'];

    let elem: React.ReactNode;

    if (surplus) {
      elem = <div className={`${clsPrefix}-avatar__text`}>{`+${surplus}`}</div>;
    } else if (image) {
      elem = this.getElem(isImage);
    } else if (text) {
      elem = <div className={`${clsPrefix}-avatar__text`}>{letter}</div>;
    }

    return (
      <div
        className={classnames(className, `${clsPrefix}-avatar`, {
          [`${clsPrefix}-avatar--circle`]: circle,
          [`${clsPrefix}-avatar--${iconSize}`]: iconSize,
        })}
        style={style}
        onClick={event => this.onClick(event)}
        onMouseOver={event => this.onMouseOver(event)}
        onMouseOut={event => this.onMouseOut(event)}
      >
        {elem}
      </div>
    );
  }
}
