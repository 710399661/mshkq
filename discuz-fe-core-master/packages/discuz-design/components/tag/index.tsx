import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { TagViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { TagProps } from './interface';
import report from '../../utils/report';

interface TagState {}

interface TagLayoutProps {}

interface TagAdapter {}

export default class Tag extends baseComponentFactory<TagProps, TagState, TagLayoutProps, TagAdapter>({
  viewAdapter: TagViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'tag'
    })
  }

  static defaultProps = {
    type: 'default',
    closeable: false,
    onClose: () => {},
    onClick: () => {},
  };

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
