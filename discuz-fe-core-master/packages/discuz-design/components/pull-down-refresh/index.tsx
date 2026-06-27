import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { PullDownRefreshViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { PullDownRefreshProps } from './interface';
import report from '../../utils/report';

interface PullDownRefreshState {}

interface PullDownRefreshLayoutProps {}

interface PullDownRefreshAdapter {}

export default class Card extends baseComponentFactory<
  PullDownRefreshProps,
  PullDownRefreshState,
  PullDownRefreshLayoutProps,
  PullDownRefreshAdapter
>({
  viewAdapter: PullDownRefreshViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'pullDownRefresh'
    })
  }

  static defaultProps = {
    damping: 80,
  };

  render() {
    const { RenderComponent } = this;
    return (
      <RenderComponent {...this.props}>{this.props.children}</RenderComponent>
    );
  }
}

// TODO 滑动事件添加16.6sm处理
// TODO 小程序方案待优化
// TODO 小程序方案待优化
