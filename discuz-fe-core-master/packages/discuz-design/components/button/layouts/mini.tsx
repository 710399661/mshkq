import { View, Button } from '@tarojs/components';
import React, { Component } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import classNameFn from 'classnames';
import { MiniButtonProps } from '../interface';
import Icon from '../../icon';

export class ButtonMiniLayout extends Component<MiniButtonProps> {
  static contextType = ConfigContext;

  onClick(event): void {
    if (this.props.loading || this.props.disabled) return;
    this.props.onClick && this.props.onClick(event);
  }

  onGetUserInfo(event): void {
    this.props.onGetUserInfo && this.props.onGetUserInfo(event);
  }

  onContact(event): void {
    this.props.onContact && this.props.onContact(event);
  }

  onGetPhoneNumber(event): void {
    this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(event);
  }

  onError(event): void {
    this.props.onError && this.props.onError(event);
  }

  onOpenSetting(event): void {
    this.props.onOpenSetting && this.props.onOpenSetting(event);
  }

  render() {
    const {
      size = 'medium',
      type,
      disabled,
      loading,
      style,
      className,
      formType,
      openType,
      circle,
      // lang,
      sessionFrom,
      sendMessageTitle,
      sendMessagePath,
      sendMessageImg,
      showMessageCard,
      appParameter,
      full,
    }: MiniButtonProps = this.props;

    const { clsPrefix } = this.context;
    const componentPrefix = `${clsPrefix}-button`;

    const classNames: string = classNameFn(
      componentPrefix,
      className,
      size && `${componentPrefix}--${size}`,
      type && `${componentPrefix}--${type}`,
      {
        'is-full': full,
        'is-loading': loading,
        'is-disabled': disabled,
        'is-circle': circle,
      },
    );

    return (
      <Button
        style={style}
        className={classNames}
        openType={openType}
        // lang={lang}
        formType={formType}
        sessionFrom={sessionFrom}
        sendMessageTitle={sendMessageTitle}
        sendMessagePath={sendMessagePath}
        sendMessageImg={sendMessageImg}
        showMessageCard={showMessageCard}
        appParameter={appParameter}
        onClick={this.onClick.bind(this)}
        onGetUserInfo={this.onGetUserInfo.bind(this)}
        onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
        onOpenSetting={this.onOpenSetting.bind(this)}
        onError={this.onError.bind(this)}
        onContact={this.onContact.bind(this)}
      >
        {loading && <Icon name='LoadingOutlined' size={13}/>}
        {this.props.children}
      </Button>
    );
  }
}
