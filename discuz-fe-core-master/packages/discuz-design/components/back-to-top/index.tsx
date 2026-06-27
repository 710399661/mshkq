import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { BackToTopViewAdapter } from './layouts/index';
import { BackToTopLogicalAdapter } from './adapters/index';
import { BackToTopProps } from './interface';
import { noop } from '../../utils/noop';
import report from '../../utils/report';

interface BackToTopState {}

interface BackToTopLayoutProps {}

interface BackToTopAdapter {}

export default class BackToTop extends baseComponentFactory<
  BackToTopProps,
  BackToTopState,
  BackToTopLayoutProps,
  BackToTopAdapter
>({
  viewAdapter: BackToTopViewAdapter,
  logicalAdapter: BackToTopLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'backToTop'
    })
  }

  static defaultProps = {
    right: 40,
    bottom: 40,
    onClick: noop,
    visibilityHeight: 400,
  };

  render() {
    const { RenderComponent } = this;
    return (
      <RenderComponent {...this.props}>{this.props.children}</RenderComponent>
    );
  }
}
