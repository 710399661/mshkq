import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { AvatarViewAdapter } from './layouts/index';
import { AvatarLogicalAdapter } from './adapters/index';
import { AvatarProps } from './interface';
import AvatarGroup from './avatar-group';
import report from '../../utils/report';

interface AvatarState {}

interface AvatarLayoutProps {}

interface AvatarAdapter {}

export default class Avatar extends baseComponentFactory<
  AvatarProps,
  AvatarState,
  AvatarLayoutProps,
  AvatarAdapter
>({
  viewAdapter: AvatarViewAdapter,
  logicalAdapter: AvatarLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'avatar'
    })
  }

  static defaultProps = {
    size: 'primary',
    circle: false,
  };

  public static Group = AvatarGroup;

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
