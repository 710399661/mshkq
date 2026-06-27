import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { UploadViewAdapter } from './layouts/index';
import { UploadLogicalAdapter } from './adapters/index';
import { UploadProps } from './interface';
import report from '../../utils/report';

interface UploadState {}

interface UploadLayoutProps {}

interface UploadAdapter {}

export default class Upload extends baseComponentFactory<
  UploadProps,
  UploadState,
  UploadLayoutProps,
  UploadAdapter
>({
  viewAdapter: UploadViewAdapter,
  logicalAdapter: UploadLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'upload'
    })
  }

  static defaultProps = {};

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
