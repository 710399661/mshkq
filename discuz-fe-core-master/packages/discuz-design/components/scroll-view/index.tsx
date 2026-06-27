import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ScrollViewViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { ScrollViewProps } from './interface';
import report from '../../utils/report';

interface ScrollViewLayoutProps {}

interface ScrollViewAdapter {}

interface ScrollViewStateInterface {
  childrenRef: any
}

export default class ScrollView extends baseComponentFactory<
  ScrollViewProps,
  ScrollViewStateInterface,
  ScrollViewLayoutProps,
  ScrollViewAdapter
>({
  viewAdapter: ScrollViewViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'scrollView'
    })
  }

  // 获取子组件实例
  ref = React.createRef()

  // 获取子组件ref
  innerRef = () => this.ref.current;

  // 获取偏移量
  // @ts-ignore
  getScrollTop = () => this.ref.current.scrollTop.current

  render() {
    const { RenderComponent } = this;
    return (
      <RenderComponent ref={this.ref} {...this.props}>
        {this.props.children}
      </RenderComponent>
    );
  }
}
