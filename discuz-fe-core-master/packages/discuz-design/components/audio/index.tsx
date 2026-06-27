import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { StateInterface, AudioProps } from './interface';
import emitter from '../../utils/emitter/media';
import report from '../../utils/report';

interface AudioLayoutProps {}

interface AudioAdapter {}

export default class Audio extends baseComponentFactory<AudioProps, StateInterface, AudioLayoutProps, AudioAdapter>({
  viewAdapter: ViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'audio'
    })
  }

  static defaultProps = {
    beforePlay: () => {},
    onError: () => {},
    onPlay: () => {},
    onPause: () => {},
    onEnded: () => {},
    onRef: () => {},
    loop: false,
    singleton: true,
    emitter
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
