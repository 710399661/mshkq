import React, { Component } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import { MiniInputProps } from '../interface';
import Icon from '../../icon';
import { View, Input } from '@tarojs/components';
import classNames from 'classnames';

interface InputState {
  isPassword: boolean;
  isFocus: boolean
}

export class MiniLayout extends Component<MiniInputProps, InputState> {
  static contextType = ConfigContext;

  constructor(props: MiniInputProps) {
    super(props);

    this.state = {
      isPassword: props.mode === 'password',
      isFocus: false,
    };
  }

  onIconClick(event): void {
    if (this.props.disabled) return;
    typeof this.props.onIconClick === 'function' && this.props.onIconClick(event);
  }

  onPrefixIconClick(event): void {
    if (this.props.disabled) return;
    typeof this.props.onPrefixIconClick === 'function' && this.props.onPrefixIconClick(event);
  }

  onClick(event): void {
    typeof this.props.onClick === 'function' && this.props.onClick(event);
  }

  onInput(event): void {
    if (this.props.disabled) return;

    if (this.props.trim) {
      event.detail.value = event.detail.value.replace(/\s+/g, '');
    }

    typeof this.props.onChange === 'function' && this.props.onChange(event);
  }

  onFocus(event): void {
    this.setState({
      isFocus: true,
    });
    typeof this.props.onFocus === 'function' && this.props.onFocus(event);
  }

  onBlur(event): void {
    this.setState({
      isFocus: false,
    });
    typeof this.props.onBlur === 'function' && this.props.onBlur(event);
  }

  onClearable(event) {
    if (this.props.disabled) return;

    if (typeof this.props.onChange === 'function') {
      event.target.value = '';
      this.props.onChange(event);
    }
  }

  onPassword() {
    this.setState((state: InputState, props) => ({ isPassword: !state.isPassword }));
  }

  render() {
    const {
      className,
      style,
      value,
      icon = '',
      prefixIcon = '',
      mode,
      placeholder,
      disabled,
      maxLength,
      miniType = 'text',
      showLimit,
      clearable,
      append,
      appendWidth = '50px',
      ...miniProps
    } = this.props;
    const { clsPrefix } = this.context;
    const componentPrefix = `${clsPrefix}-input`;

    const componentClassNames = classNames(componentPrefix, className, {
      'is-disabled': disabled,
      'is-focus': this.state.isFocus,
    });

    const passwordClassNames = classNames(`${componentPrefix}__icon`, {
      'is-select': !this.state.isPassword,
    });

    // 内置常见前景模式
    let modeNode;
    if (mode && mode === 'password') {
      modeNode = (
        <Icon onClick={() => this.onPassword()} className={passwordClassNames} name="EyeOutlined" size={20} />
      );
    }

    // 自定义后缀
    let appendNode;
    let inputStyle;
    if (append) {
      appendNode = <View style={{ width: appendWidth }} className={`${componentPrefix}__append`}>{append}</View>;
      inputStyle = {
        paddingRight: appendWidth,
      };
    }

    // 可清除
    let clearableNode;
    if (clearable && value?.length) {
      clearableNode = (
        <Icon
          onClick={event => this.onClearable(event)}
          className={`${componentPrefix}__icon`}
          name="WrongOutlined"
          size={20}
        />
      );
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

    // 图标
    let iconNode;
    if (icon) {
      iconNode = (
        <Icon
          onClick={event => this.onIconClick(event)}
          className={`${componentPrefix}__icon`}
          name={icon}
          size={16}
        />
      );
    }

    // 头部图标
    let prefixIconNode;
    if (prefixIcon) {
      prefixIconNode = (
        <Icon
          onClick={event => this.onPrefixIconClick(event)}
          className={`${componentPrefix}__prefix-icon`}
          name={prefixIcon}
          size={16}
        />
      );
    }

    const defaultPlaceholderClass = `${componentPrefix}__inner--placeholder`;

    return (
      <View style={style} className={componentClassNames} hoverClass="none" onClick={event => this.onClick(event)}>
        {iconNode}
        {limitNode}
        {clearableNode}
        {modeNode}
        {prefixIconNode}
        <Input
          placeholderClass={defaultPlaceholderClass}
          {...miniProps}
          disabled={disabled}
          maxlength={maxLength}
          value={value}
          placeholder={placeholder}
          className={`${componentPrefix}__inner`}
          style={inputStyle}
          type={miniType}
          password={this.state.isPassword}
          onInput={event => this.onInput(event)}
          onFocus={event => this.onFocus(event)}
          onBlur={event => this.onBlur(event)}
        />
        {appendNode}
      </View>
    );
  }
}
