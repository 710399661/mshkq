import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import classNames from 'classnames';
import { DialogLayoutProps } from '../index';
import Icon from '../../icon';
import Button from '../../button';

export class DialogMiniLayout extends Component<DialogLayoutProps, { windowWidth }> {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
    };
  }

  componentDidMount() {
    this.getWindowWidth();
  }

  getWindowWidth() {
    Taro.getSystemInfo({
      success: res => {
        const { windowWidth } = res;
        this.setState({ windowWidth });
      },
    });
  }

  getDialogWidth() {
    const { width } = this.props;
    const { windowWidth } = this.state;
    let containerWidth = typeof width === 'number' ? `${width}px` : width;
    if (parseInt(width.toString(), 10) >= windowWidth && windowWidth) {
      containerWidth = `${windowWidth - 20}px`;
    }
    return containerWidth;
  }

  render() {
    const { clsPrefix } = this.context;
    const { children, style, zIndex, type,
      onClose, title, header, footer, cancelBtn, confirmBtn,
      confirmDisabled,
      confirmLoading,
      onCancel,
      onConfirm,
    } = this.props;

    const reStyle = { ...style, zIndex };
    const width = this.getDialogWidth();

    let headerDom = (
      <View
        className={classNames(`${clsPrefix}-modal__header`, this.props.headerClassName)}
        style={this.props.headerStyle}
      >
        {header && header}
        {!header && (this.props.isNew || this.props.inContext) && (
          <>
            {title}
            <Icon
              className={`${clsPrefix}-header__closeicon`}
              name="CloseOutlined"
              size={12}
              onClick={() => onClose()}
            />
          </>
        )}
      </View>
    );
    let footerDom = (
      <View
        className={classNames(`${clsPrefix}-modal__footer`, this.props.footerClassName)}
        style={this.props.footerStyle}
      >
        {footer && footer}
        {!footer && (this.props.isNew || this.props.inContext) && (
          <>
            {type === 'confirm' && (
              <Button
                className={`${clsPrefix}-modal_cancel`}
                onClick={() => onCancel()}
              >
                {cancelBtn}
              </Button>
            )}
            <Button
              type="primary"
              disabled={confirmDisabled}
              loading={confirmLoading}
              onClick={() => onConfirm()}
            >
              {confirmBtn}
            </Button>
          </>
        )}
      </View>
    );
    if (!header && !this.props.isNew) headerDom = null;
    if (!footer && !this.props.isNew) footerDom = null;
    return (
      <View
        className={classNames(
          `${clsPrefix}-modal`,
          {
            'is-active': this.props.visible,
          },
          this.props.className,
        )}
        style={reStyle}
      >
        <View
          className={classNames(
            `${clsPrefix}-modal__overlay`,
            {
              'animated animated-fadeIn': this.props.visible,
              'animated animated-fadeOut': !this.props.visible,
            }
          )}
          style={this.props.maskStyle}
          onClick={() => {
            if (this.props.maskClosable) {
              this.props.onClose();
            }
          }}
        />
        <View className={classNames(
          `${clsPrefix}-modal__container`,
          {
            'animated animated-zoomIn': this.props.visible,
            'animated animated-zoomOut': !this.props.visible,
          }
        )} style={{ width }}>
          {headerDom}
          <View
            className={classNames(`${clsPrefix}-modal__body`, this.props.bodyClassName)}
            style={this.props.bodyStyle}
          >
            {children}
          </View>
          {footerDom}
        </View>
      </View>
    );
  }
}
