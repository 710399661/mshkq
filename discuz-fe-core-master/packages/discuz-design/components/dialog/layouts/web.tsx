import React, { Component } from 'react';
import { DialogLayoutProps } from '../index';
import { ConfigContext } from '../../../extends/configContext';
import classNames from 'classnames';
import Portal from '../../../common/web-portal';
import Icon from '../../icon';
import Button from '../../button';

export class DialogWebLayout extends Component<DialogLayoutProps> {
  static contextType = ConfigContext;

  getDialogWidth() {
    const { width } = this.props;
    let containerWidth = typeof width === 'number' ? `${width}px` : width;
    if (typeof window !== 'undefined'
      && width
      && parseInt(width.toString(), 10) >= window.innerWidth) containerWidth = `${window.innerWidth - 20}px`;
    return { width: containerWidth };
  }

  render() {
    const { clsPrefix } = this.context;
    const { children, style, zIndex, attach,
      onClose, title, header, footer, cancelBtn, confirmBtn,
      confirmDisabled,
      confirmLoading,
      onCancel,
      type,
      onConfirm,
    } = this.props;

    const reStyle = { ...style, zIndex };
    const width = this.props.visible ? this.getDialogWidth() : {};

    let headerDom = (
      <div
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
      </div>
    );
    let footerDom = (
      <div
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
      </div>
    );
    if (!header && !this.props.isNew) headerDom = null;
    if (!footer && !this.props.isNew) footerDom = null;

    const dialogDom = (
      <div
        className={classNames(
          `${clsPrefix}-modal`,
          {
            'is-active': this.props.visible,
          },
          this.props.className,
        )}
        style={reStyle}
      >
        <div
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
        <div className={classNames(
          `${clsPrefix}-modal__container`,
          {
            'animated animated-zoomIn': this.props.visible,
            'animated animated-zoomOut': !this.props.visible,
          }
        )} style={width}>
          {headerDom}
          <div
            className={classNames(`${clsPrefix}-modal__body`, this.props.bodyClassName)}
            style={this.props.bodyStyle}
          >
            {children}
          </div>
          {footerDom}
        </div>
      </div>
    );

    return <Portal attach={attach}>{dialogDom}</Portal>
  }
}
