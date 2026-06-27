import React, { Component } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import { WebInputProps } from '../interface';
import Icon from '../../icon';
import classNames from 'classnames';

interface InputState {
  type: string;
  isFocus: boolean;
}

export class WebLayout extends Component<WebInputProps, InputState> {
  static contextType = ConfigContext;
  oldValue: string;
  inputLock: boolean;

  constructor(props: WebInputProps) {
    super(props);

    this.state = {
      type: props.mode === 'password' ? 'password' : props.htmlType,
      isFocus: this.props.focus,
    };

    this.inputLock = false;
    this.oldValue = '';
  }

  componentDidMount() {
    if (this.props.focus) {
      const inputElem: HTMLInputElement = this.refs.input as HTMLInputElement;
      inputElem && typeof inputElem.focus === 'function' && inputElem.focus();
    }
    if (this.props.useRef) {
      const inputElem: HTMLInputElement = this.refs.input as HTMLInputElement;
      this.props.useRef(inputElem);
    }
  }

  componentDidUpdate() {
    if (!this.props.value) {
      this.refs.input.value = '';
    }
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

  onInput(event): any {
    if (this.props.disabled) {
      typeof this.props.onChange === 'function' && this.props.onChange(event);
      return this.props.value;
    }

    if (this.inputLock) {
      typeof this.props.onChange === 'function' && this.props.onChange(event);
      return this.props.value;
    }

    if (this.props.trim) {
      event.target.value = event.target.value.replace(/\s+/g, '');
    }

    // 这里根据mode来判断，只容许数字输入
    if (this.props.mode === 'number') {
      const str = event.target.value;
      event.target.value = str.replace(/[^\d+|.]/g, '');
    }

    typeof this.props.onChange === 'function' && this.props.onChange(event);
  }

  onFocus(event: React.FocusEvent): void {
    this.setState({
      isFocus: true,
    });
    typeof this.props.onFocus === 'function' && this.props.onFocus(event);
  }

  onCompositionStart = (event: React.CompositionEvent) => {
    this.inputLock = true;
  }

  onCompositionEnd = (event: React.CompositionEvent) => {
    this.inputLock = false;
    this.onInput(event);
  }

  onBlur(event): void {
    // 数字类型格式化输入的内容
    if (this.props.mode === 'number') {
      const str = event.target.value;
      if (str === '') {
        event.target.value = '';
      } else if (isNaN(Number(str))) {
        event.target.value = this.oldValue;
      } else {
        event.target.value = String(Number(event.target.value));
      }
      this.oldValue = event.target.value;
      typeof this.props.onChange === 'function' && this.props.onChange(event);
    }

    typeof this.props.onBlur === 'function' && this.props.onBlur(event);
    this.setState({
      isFocus: false,
    });
  }

  onKeyDown(event: React.KeyboardEvent): void {
    if (this.props.disabled) return;
    if (event.keyCode === 13) {
      typeof this.props.onEnter === 'function' && this.props.onEnter(event);
    }
    if (event.keyCode === 8) {
      typeof this.props.onBackspace === 'function' && this.props.onBackspace(event);
    }
  }

  onClearable(event) {
    if (this.props.disabled) return;

    if (typeof this.props.onChange === 'function') {
      event.target.value = '';
      this.props.onChange(event);
    }
  }

  onPassword() {
    this.setState((state: InputState, props) => ({ type: state.type === 'password' ? props.htmlType : 'password' }));
  }

  render() {
    const {
      className,
      style,
      value = this.props.defaultValue || '',
      icon = '',
      prefixIcon = '',
      mode,
      placeholder,
      disabled,
      maxLength,
      showLimit,
      clearable,
      append,
      appendWidth = '50px',
      ...webProps
    } = this.props;
    const { clsPrefix } = this.context;
    const componentPrefix = `${clsPrefix}-input`;

    const componentClassNames = classNames(componentPrefix, className, {
      'is-disabled': disabled,
      'is-focus': this.state.isFocus,
    });

    const passwordClassNames = classNames(`${componentPrefix}__icon`, `${componentPrefix}__select-icon`, {
      'is-select': this.state.type !== 'password',
    });

    // 内置常见前景模式
    let modeNode;
    if (mode && mode === 'password') {
      modeNode = (
        <Icon
          onClick={event => this.onPassword()}
          className={passwordClassNames}
          name="EyeOutlined"
          size={20}
        />
      );
    }

    // 自定义后缀
    let appendNode;
    let inputStyle;
    if (append) {
      appendNode = <div style={{ width: appendWidth }} className={`${componentPrefix}__append`}>{append}</div>;
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
        <div className={`${componentPrefix}__limit`}>
          {value.length}/{maxLength}
        </div>
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

    return (
      <div style={style} className={componentClassNames} onClick={event => this.onClick(event)}>
        {iconNode}
        {limitNode}
        {clearableNode}
        {modeNode}
        {prefixIconNode}
        <input
          ref='input'
          {...webProps}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          style={inputStyle}
          placeholder={placeholder}
          className={`${componentPrefix}__inner`}
          type={this.state.type}
          onInput={event => this.onInput(event)}
          onKeyDown={event => this.onKeyDown(event)}
          onFocus={event => this.onFocus(event)}
          onBlur={event => this.onBlur(event)}
          onCompositionStart={this.onCompositionStart}
          onCompositionEnd={this.onCompositionEnd}
        />
        {appendNode}
      </div>
    );
  }
}
