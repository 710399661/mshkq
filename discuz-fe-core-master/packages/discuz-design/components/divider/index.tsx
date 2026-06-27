import React from "react";
import { baseComponentFactory } from "../../extends/baseComponent";
import { DividerViewAdapter } from "./layouts/index";
import { DividerLogicalAdapter } from "./adapters/index";
import { DividerProps } from "./interface";
import report from "../../utils/report";

interface DividerState {}

interface DividerLayoutProps {}

interface DividerAdapter {}

export default class Divider extends baseComponentFactory<
  DividerProps,
  DividerState,
  DividerLayoutProps,
  DividerAdapter
>({
  viewAdapter: DividerViewAdapter,
  logicalAdapter: DividerLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: "divider",
    });
  }

  public render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return (
      <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>
    );
  }
}
