import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ActionSheetViewAdapter } from './layouts/index';
import { ActionSheetLogicalAdapter } from './adapters/index';
import { ActionSheetProps } from './interface';
import report from '../../utils/report';

interface ActionSheetState {}

interface ActionSheetLayoutProps {}

interface ActionSheetAdapter {}

export default class ActionSheet extends baseComponentFactory<
  ActionSheetProps,
  ActionSheetState,
  ActionSheetLayoutProps,
  ActionSheetAdapter
>({
  viewAdapter: ActionSheetViewAdapter,
  logicalAdapter: ActionSheetLogicalAdapter,
}) {
  static defaultProps = {};

  constructor(props) {
    super(props);

    report({
      componentName: 'actionSheet'
    })
  }

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
