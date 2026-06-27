import React, { Component } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import { WebTextareaProps } from '../interface';
import classNames from 'classnames';

interface TextareaState {
  isActive: boolean;
}

export class WebLayout extends Component<WebTextareaProps, TextareaState> {
  static contextType = ConfigContext;

  constructor(props: WebTextareaProps) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  onInput(event): void {
    if (this.props.disabled) return;

    typeof this.props.onChange === 'function' && this.props.onChange(event);
  }

  onFocus(event: React.FocusEvent): void {
    this.setState({
      isActive: true,
    });
    typeof this.props.onFocus === 'function' && this.props.onFocus(event);
  }

  onBlur(event): void {
    this.setState({
      isActive: false,
    });
    typeof this.props.onBlur === 'function' && this.props.onBlur(event);
  }

  render() {
    const {
      className,
      style = {},
      value,
      placeholder,
      rows,
      disabled,
      maxLength,
      showLimit,
      forwardedRef,
      ...webProps
    } = this.props;
    const { clsPrefix } = this.context;
    const componentPrefix = `${clsPrefix}-textarea`;

    const componentClassNames = classNames(componentPrefix, className, {
      'is-disabled': disabled,
      'is-active': this.state.isActive,
    });

    if (rows && rows > 0) {
      style.height = `${rows * 25}px`;
    }

    // 限制字数
    let limitNode;
    if (showLimit && maxLength >= 0) {
      limitNode = (
        <div className={`${componentPrefix}__limit`}>
          {value.length}/{maxLength}
        </div>
      );
    }

    return (
      <div className={componentClassNames}>
        <textarea
          {...webProps}
          ref={forwardedRef}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          placeholder={placeholder}
          className={`${componentPrefix}__inner`}
          style={style}
          onInput={event => this.onInput(event)}
          onFocus={event => this.onFocus(event)}
          onBlur={event => this.onBlur(event)}
        />
        {limitNode}
      </div>
    );
  }
}
