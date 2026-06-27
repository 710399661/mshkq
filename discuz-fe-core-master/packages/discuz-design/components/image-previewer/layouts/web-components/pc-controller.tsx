import React, { useEffect } from 'react';
import classnames from 'classnames';
import Icon from '../../../icon';
import { useConfig } from '../../../../extends/configContext';
import isMobile from '../../../../utils/is-mobile';

const WebImgPcController = ({
  onSwipRight = () => {},
  onSwipLeft = () => {},
  onClose = () => {},
  imgUrls = [],
  currentImgIdx = 0,
}) => {
  const { clsPrefix } = useConfig();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLeftDisabled, setIsLeftDisabled] = React.useState(false);
  const [isRightDisabled, setIsRightDisabled] = React.useState(false);
  const timerRef = React.useRef(null);
  const controllerRef = React.useRef(null);
  const controllerLock = React.useRef(null);

  let IS_MOBILE = false;
  if (typeof window !== 'undefined') {
    IS_MOBILE = isMobile();
  }

  useEffect(() => {
    if (imgUrls.length === 0) {
      setIsLeftDisabled(true);
      setIsRightDisabled(true);
      return;
    }
    if (currentImgIdx === 0) {
      setIsLeftDisabled(true);
    } else {
      setIsLeftDisabled(false);
    }
    if (currentImgIdx + 1 === imgUrls.length) {
      setIsRightDisabled(true);
    } else {
      setIsRightDisabled(false);
    }
  }, [imgUrls, currentImgIdx]);

  useEffect(() => {
    const mouseMoveEventHandler = () => {
      if (controllerLock.current) return;
      setIsVisible(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    const mouseEnterControllerHandler = () => {
      setIsVisible(true);
      controllerLock.current = true;
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousemove', mouseMoveEventHandler);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    const mouseOutControllerHandler = () => {
      controllerLock.current = null;
      if (typeof window !== 'undefined') {
        document.addEventListener('mousemove', mouseMoveEventHandler, false);
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousemove', mouseMoveEventHandler, false);
    }

    if (controllerRef.current) {
      if (!IS_MOBILE) {
        controllerRef.current.addEventListener(
          'mouseenter',
          mouseEnterControllerHandler,
          false,
        );
        controllerRef.current.addEventListener(
          'mouseleave',
          mouseOutControllerHandler,
          false,
        );
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousemove', mouseMoveEventHandler);
      }

      if (controllerRef.current) {
        controllerRef.current.removeEventListener(
          'mouseenter',
          mouseEnterControllerHandler,
        );

        controllerRef.current.removeEventListener(
          'mouseleave',
          mouseOutControllerHandler,
        );
      }
    };
  }, []);

  // 键盘事件 handler
  useEffect(() => {
    const keydownHandler = (e) => {
      if (e.key === 'ArrowLeft') {
        onSwipRight();
      }

      if (e.key === 'ArrowRight') {
        onSwipLeft();
      }
    };
    // 非 SSR 监听
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', keydownHandler);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keydown', keydownHandler);
      }
    };
  }, []);

  return (
    !IS_MOBILE && (
      <div
        className={classnames(
          `${clsPrefix}-img-previewer__pc-controller-wrapper`,
          {
            'is-active': isVisible,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        ref={controllerRef}
      >
        <div
          className={classnames(`${clsPrefix}-img-previewer__pc-controller-close`)}
          onClick={onClose}
        >
          <Icon name={'CloseOutlined'} size={8} color={'white'} />
        </div>
        <div
          className={classnames(`${clsPrefix}-img-previewer__pc-controller-swiper`)}
        >
          <div
            className={classnames(
              `${clsPrefix}-img-previewer__pc-controller-left-swiper`,
              {
                'is-disabled': isLeftDisabled,
              },
            )}
            onClick={onSwipRight}
          >
            <Icon name={'RightOutlined'} size={16} />
          </div>
          <div
            className={classnames(
              `${clsPrefix}-img-previewer__pc-controller-right-swiper`,
              {
                'is-disabled': isRightDisabled,
              },
            )}
            onClick={onSwipLeft}
          >
            <Icon name={'RightOutlined'} size={16} />
          </div>
        </div>
      </div>
    )
  );
};

export default WebImgPcController;
