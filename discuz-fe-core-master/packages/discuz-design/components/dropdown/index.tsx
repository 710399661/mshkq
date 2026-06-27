import React from "react";
import { baseComponentFactory } from "../../extends/baseComponent";
import { DropdownViewAdapter } from "./layouts/index";
import { DropdownLogicalAdapter } from "./adapters/index";
import { DropdownProps } from "./interface";
import MenuItem from "./menu-item";
import Menu from "./menu";
import report from "../../utils/report";

interface DropdownState {}

interface DropdownLayoutProps {}

interface DropdownAdapter {}

export default class Dropdown extends baseComponentFactory<
  DropdownProps,
  DropdownState,
  DropdownLayoutProps,
  DropdownAdapter
>({
  viewAdapter: DropdownViewAdapter,
  logicalAdapter: DropdownLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: "dropdown",
    });
  }

  public static Item = MenuItem;

  public static Menu = Menu;

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
