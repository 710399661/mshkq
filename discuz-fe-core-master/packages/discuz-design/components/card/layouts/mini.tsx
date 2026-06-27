import { View } from '@tarojs/components';
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../../../extends/configContext';

import { CardProps } from '../interface';

export class CardMiniLayout extends Component<CardProps> {
  public static contextType = ConfigContext;

  public render() {
    const {
      className,
      style,
      bordered,
      headerClassName,
      headerStyle,
      bodyClassName,
      bodyStyle,
      footerClassName,
      footerStyle,
    } = this.props;
    const { clsPrefix } = this.context;
    const componentPrefix = `${clsPrefix}-card`;

    const componentClassNames = classNames(componentPrefix, className, {
      [`${componentPrefix}--border`]: bordered,
    });

    return (
      <View style={style} className={componentClassNames}>
        {this.props.header && (
          <View
            className={classNames(
              `${componentPrefix}__header`,
              this.props.fullHeader && `${componentPrefix}__header--full`,
              headerClassName,
            )}
            style={headerStyle}
          >
            {this.props.header}
          </View>
        )}

        <View
          className={classNames(
            `${componentPrefix}__body`,
            this.props.fullBody && `${componentPrefix}__body--full`,
            bodyClassName,
          )}
          style={bodyStyle}
        >
          {this.props.children}
        </View>

        {this.props.footer && (
          <View
            className={classNames(
              `${componentPrefix}__footer`,
              this.props.fullFooter && `${componentPrefix}__footer--full`,
              footerClassName,
            )}
            style={footerStyle}
          >
            {this.props.footer}
          </View>
        )}
      </View>
    );
  }
}
