import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { StateInterface, PropsInterface } from './interface';
import report from '../../utils/report';

interface LayoutProps {}

interface Adapter {}

/**
 * 录音组件
 * 1、暂时需要在调用此组件的工程中安装recorder-core: npm i recorder-core -S
 * 2、后续需优化一些边界情况
 */
export default class AudioRecord extends baseComponentFactory<PropsInterface, StateInterface, LayoutProps, Adapter>({
  viewAdapter: ViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'audioRecord'
    })
  }

  static defaultProps = {
    onError: () => {},
    onPlay: () => {},
    onPause: () => {},
    onEnded: () => {},
    onRef: () => {},
    loop: false,
  };

  // 获取子组件实例
  setChildrenRef = (ref) => {
    this.setState({ childrenRef: ref });
  };

  // 获取子组件实例的state值
  getState = () => this.state.childrenRef.state;

  render() {
    const { RenderComponent } = this;
    return (
      <RenderComponent ref={this.setChildrenRef} {...this.props}>
        {this.props.children}
      </RenderComponent>
    );
  }
}
