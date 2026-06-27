import React, { Component } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import { MiniTextareaProps } from '../interface';
import { View, Textarea } from '@tarojs/components';
import classNames from 'classnames';

interface TextareaState {
  isActive: boolean;
}

export class MiniLayout extends Component<MiniTextareaProps, TextareaState> {
  static contextType = ConfigContext;

  constructor(props: MiniTextareaProps) {
    super(props);
    // FIXME: 目前小程序添加边框激活样式控制后，会在第一次点击时，额外触发blur事，可能是小程序自己实现的原因
    // 这块可以考虑参考tea、taroui，都未实现边框样式；
    // 这块查明原因，在外层View上添加hoverClass="none"，即可。
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
      autoHeight,
      forwardedRef,
      ...miniProps
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
        <View className={`${componentPrefix}__limit`}>
          {value.length}/{maxLength}
        </View>
      );
    }

    return (
      <View className={componentClassNames} hoverClass="none">
        <Textarea
          {...miniProps}
          ref={forwardedRef}
          disabled={disabled}
          maxlength={maxLength}
          value={value}
          placeholder={placeholder}
          className={`${componentPrefix}__inner`}
          style={style}
          onInput={event => this.onInput(event)}
          onFocus={event => this.onFocus(event)}
          onBlur={event => this.onBlur(event)}
          autoHeight={autoHeight}
        />
        {limitNode}
      </View>
    );
  }
}
