import React from "react";
import { baseComponentFactory } from "../../extends/baseComponent";
import { ViewAdapter } from "./layouts/index";
import { LogicalAdapter } from "./adapters/index";
import { PopoverProps } from "./interface";
import report from '../../utils/report';

interface PopoverState {}

interface PopoverLayoutProps {}

interface PopoverAdapter {}

export default class Popover extends baseComponentFactory<
  PopoverProps,
  PopoverState,
  PopoverLayoutProps,
  PopoverAdapter
>({
  viewAdapter: ViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'popover'
    })
  }

  static defaultProps = {
    placement: "TOP",
    trigger: "click",
    background: "white",
    followTrigger: false,
    needOutsideClose: true,
    triangleAtCenter: false,
    showTriangle: true,
    zIndex: 99,
  };

  render() {
    const { RenderComponent } = this;
    return (
      <RenderComponent {...this.props}>{this.props.children}</RenderComponent>
    );
  }
}
