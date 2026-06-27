import React from 'react';
import classnames from 'classnames';
import { AnimationProps } from '../interface';
export class AnimationWebLayout extends React.Component<AnimationProps> {
  onEnd = (e) => {
    const { onEnd, action, exist } = this.props;
    if (onEnd) {
      onEnd(e);
    }
    // 卸载 DOM 元素
    if (!action && exist) {
      const node = e.target.parentNode;
      node.parentNode.removeChild(node);
    }
  };

  render() {
    const {
      className,
      action,
      toggleClass,
      enterClass,
      leaveClass,
      name,
      delay,
      duration,
      count,
      easing,
      reverse,
      children,
    } = this.props;

    // 动画样式
    const styleText = (() => {
      const style = {
        animationFillMode: 'forwards',
      };
      // 设置延迟时长
      if (delay) {
        style.transitionDelay = delay;
        style.animationDelay = delay;
      }
      // 设置播放时长
      if (duration) {
        style.transitionDuration = duration;
        style.animationDuration = duration;
      }
      // 设置播放次数
      if (count) {
        style.animationIterationCount = count;
      }
      // 设置缓动函数
      if (easing) {
        style.transitionTimingFunction = easing;
        style.animationTimingFunction = easing;
      }
      // 设置动画方向
      if (reverse) {
        style.animationDirection = 'alternate';
      }
      return style;
    })();

    const transition = (
      <div
        className={classnames({
          transition: true,
        })}
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          onAnimationEnd={this.onEnd}
          onTransitionEnd={this.onEnd}
          className={classnames({
            'transition-wrapper': true,
            [className]: className,
            [toggleClass]: action && toggleClass,
            [`${name}-enter-active`]: !toggleClass && action && name,
            [`${name}-leave-active`]: !toggleClass && !action && name,
            [enterClass]: !toggleClass && action && enterClass,
            [leaveClass]: !toggleClass && !action && leaveClass,
          })}
          style={styleText}
        >
          {children}
        </div>
      </div>
    );

    return transition;
  }
}
