import React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../../../extends/configContext';
import { BackToTopProps } from '../interface';
import throttle from '../../../utils/throttle';

interface BackToTopState {
  displayState: boolean;
}

export class BackToTopWebLayout extends React.Component<
  BackToTopProps,
  BackToTopState
> {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);
    this.state = {
      displayState: false,
    };
  }

  get WindowYPosition() {
    return (
      window.pageYOffset
      || document.body.scrollTop
      || document.documentElement.scrollTop
    );
  }

  handleScroll = throttle(() => {
    const yPosition = this.WindowYPosition;
    this.setState({
      displayState: yPosition >= this.props.visibilityHeight,
    });
  }, 100);

  smoothScrollToTop = () => {
    const yPosition = this.WindowYPosition;
    if (yPosition > 1) {
      window.requestAnimationFrame(this.smoothScrollToTop);
      scrollTo(0, Math.floor(yPosition * 0.85));
    } else {
      scrollTo(0, 0);
    }
  };

  componentDidMount() {
    const scrollElement = document;
    scrollElement.addEventListener('scroll', this.handleScroll);
  }

  render() {
    const { children } = this.props;
    const { clsPrefix } = this.context;
    return (
      <div
        className={classnames(`${clsPrefix}-backtop`)}
        onClick={() => {
          this.smoothScrollToTop();
          this.props.onClick();
        }}
        style={{
          visibility: this.state.displayState ? 'visible' : 'hidden',
          bottom: this.props.bottom,
          right: this.props.right,
        }}
      >
        {children}
      </div>
    );
  }
}
