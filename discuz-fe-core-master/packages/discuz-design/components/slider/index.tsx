import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { SliderViewAdapter } from './layouts/index';
import { SliderLogicalAdapter } from './adapters/index';
import { SliderProps } from './interface';
import { noop } from '../../utils/noop';
import report from '../../utils/report';

const defaultFormatter = v => v;

interface SliderState {}

interface SliderLayoutProps {}

interface SliderAdapter {}

export default class Slider extends baseComponentFactory<
  SliderProps,
  SliderState,
  SliderLayoutProps,
  SliderAdapter
>({
  viewAdapter: SliderViewAdapter,
  logicalAdapter: SliderLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'slider'
    })
  }

  static defaultProps = {
    onChange: noop,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    formatter: defaultFormatter,
  };

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
