import React, { Component } from 'react';
import { ConfigContext } from '../../../../extends/configContext';
import classNames from 'classnames';
import { MenuItemGroupProps } from '../interface';

export class MenuItemGroupWebLayout extends Component<MenuItemGroupProps> {
  public static contextType = ConfigContext;

  public render() {
    const { style, className, title }: MenuItemGroupProps = this.props;

    const { clsPrefix } = this.context;

    const componentPrefix = `${clsPrefix}-menu-item-group`;
    const menuClassName = `${clsPrefix}-menu`;

    const classNameStr: string = classNames(
      componentPrefix,
      className,
    );

    return (
      <div style={style} className={classNameStr}>
        <div className={`${componentPrefix}__title`}>
          {title}
        </div>
        <ul className={menuClassName}>{this.props.children}</ul>
      </div>
    );
  }
}
