import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { PopupViewAdapter } from './layouts/index';
import { PopupLogicalAdapter } from './adapters/index';
import { WebPopupProps } from './interface';
import { noop } from '../../utils/noop';
import report from '../../utils/report';

interface PopupState {}

interface PopupLayoutProps extends WebPopupProps {}

interface PopupAdapter {}

export default class Popup extends baseComponentFactory<
  WebPopupProps,
  PopupState,
  PopupLayoutProps,
  PopupAdapter
>({
  viewAdapter: PopupViewAdapter,
  logicalAdapter: PopupLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'popup'
    })
  }

  static defaultProps = {
    position: 'bottom',
    maskClosable: true,
    onClose: noop,
    containerClassName: ''
  };

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
