import React, { Component } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import { CardProps } from '../interface';
import classNames from 'classnames';

export class CardWebLayout extends Component<CardProps> {
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
      <div style={style} className={componentClassNames}>
        {this.props.header && (
          <div
            className={classNames(
              `${componentPrefix}__header`,
              this.props.fullHeader && `${componentPrefix}__header--full`,
              headerClassName,
            )}
            style={headerStyle}
          >
            {this.props.header}
          </div>
        )}

        <div
          className={classNames(
            `${componentPrefix}__body`,
            this.props.fullBody && `${componentPrefix}__body--full`,
            bodyClassName,
          )}
          style={bodyStyle}
        >
          {this.props.children}
        </div>

        {this.props.footer && (
          <div
            className={classNames(
              `${componentPrefix}__footer`,
              this.props.fullFooter && `${componentPrefix}__footer--full`,
              footerClassName,
            )}
            style={footerStyle}
          >
            {this.props.footer}
          </div>
        )}
      </div>
    );
  }
}
