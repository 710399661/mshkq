import React, { Component } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import classNames from 'classnames';
import { WebButtonProps } from '../interface';
import Spin from '../../spin';

interface WebButtonState {
  isMouseDown: boolean,
  isMouseEnter: boolean,
}

export class ButtonWebLayout extends Component<WebButtonProps, WebButtonState> {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);

    this.state = {
      isMouseDown: false,
      isMouseEnter: false,
    };
  }

  onClick(e): void {
    if (this.props.loading || this.props.disabled) return;
    this.props.onClick && this.props.onClick(e);
  }

  onMouseLeave(e): void {
    this.setState({
      isMouseEnter: false,
    });
  }

  onMouseEnter(e): void {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      isMouseEnter: true,
    });
  }

  onMouseDown(e): void {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      isMouseDown: true,
    });
  }

  onMouseUp(e): void {
    setTimeout(() => {
      this.setState({
        isMouseDown: false,
      });
    }, 50);
  }


  render() {
    const { size = 'medium', type, htmlType, disabled, loading, style, className, circle, full }: WebButtonProps = this.props;

    const { clsPrefix } = this.context;

    const componentPrefix = `${clsPrefix}-button`;

    const classNameStr: string = classNames(
      componentPrefix,
      className,
      size && `${componentPrefix}--${size}`,
      type && `${componentPrefix}--${type}`,
      {
        'is-full': full,
        'is-loading': loading,
        'is-disabled': disabled,
        'is-circle': circle,
        'is-mousedown': this.state.isMouseDown,
        'is-mouseenter': this.state.isMouseEnter,
      },
    );

    return (
      <button
        style={style}
        className={classNameStr}
        type={htmlType}
        onClick={this.onClick.bind(this)}
        onMouseEnter={e => this.onMouseEnter(e)}
        onMouseLeave={e => this.onMouseLeave(e)}
        onMouseDown={e => this.onMouseDown(e)}
        onMouseUp={e => this.onMouseUp(e)}>
        {loading && <Spin type={'spinner'} size={16} />}
        {this.props.children}
      </button>
    );
  }
}
