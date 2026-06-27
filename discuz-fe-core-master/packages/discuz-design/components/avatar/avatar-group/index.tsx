import React from 'react';
import { baseComponentFactory } from '../../../extends/baseComponent';
import { AvatarGroupViewAdapter } from './layouts/index';
import { AvatarGroupLogicalAdapter } from './adapters/index';
import { AvatarGroupProps } from './interface';

interface AvatarGroupState {}

interface AvatarGroupLayoutProps {}

interface AvatarGroupAdapter {}

export default class AvatarGroup extends baseComponentFactory<
  AvatarGroupProps,
  AvatarGroupState,
  AvatarGroupLayoutProps,
  AvatarGroupAdapter
>({
  viewAdapter: AvatarGroupViewAdapter,
  logicalAdapter: AvatarGroupLogicalAdapter,
}) {
  static defaultProps = {};

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
