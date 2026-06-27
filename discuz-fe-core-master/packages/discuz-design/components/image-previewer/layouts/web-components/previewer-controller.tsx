import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Icon from '../../../icon';
import { useConfig } from '../../../../extends/configContext';
import isMobile from '../../../../utils/is-mobile';
import ControllerItem from './controller-item';

const WebImgPreviewerController = ({
  imgUrls = [],
  currentImgIdx = 0,
  visible = false,
  onImgClick = () => {},
  onError = i => '',
}) => {
  const { clsPrefix } = useConfig();
  const [translateX, setTranslateX] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const timerRef = React.useRef(null);
  const controllerRef = React.useRef(null);
  const controllerLock = React.useRef(null);

  // 记录当前滑动位置，用来计算下一帧的位置
  const currentX = React.useRef(null);

  let IS_MOBILE = false;
  if (typeof window !== 'undefined') {
    IS_MOBILE = isMobile();
  }

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
          'mouseover',
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
          'mouseover',
          mouseEnterControllerHandler,
        );

        controllerRef.current.removeEventListener(
          'mouseleave',
          mouseOutControllerHandler,
        );
      }
    };
  }, []);

  useEffect(() => {
    // ssr 不执行
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const container = controllerRef.current;
        if (container) {
          const elements = document.getElementsByClassName(`${clsPrefix}-img-previewer__controller-item`);
          const containerWidth = container.getBoundingClientRect().width;
          const offset = Array.from(elements)
            .slice(0, currentImgIdx)
            .reduce((prev, curr) => prev + curr.getBoundingClientRect().width, 0);
          if (offset >= containerWidth / 2) {
            if (offset < containerWidth - 40) {
            // 修正 40px
              setTranslateX(offset - containerWidth / 2 + 40);
            } else {
              setTranslateX(offset - containerWidth / 2 + 30);
            }
          } else {
            setTranslateX(0);
          }
        }
      }
    }, 300);
  }, [currentImgIdx]);

  return (
    <div
      ref={controllerRef}
      className={classnames(`${clsPrefix}-img-previewer__controller-wrapper`, {
        'is-mobile': IS_MOBILE,
      })}
      style={{
        visibility: isVisible || IS_MOBILE ? 'visible' : 'hidden',
        overflow: 'hidden',
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
        currentX.current = e.touches[0].clientX;
      }}
      onTouchMove={(e) => {
        e.stopPropagation();
        const touchDeltaX = e.touches[0].clientX - currentX.current;
        currentX.current = e.touches[0].clientX;

        const container = controllerRef.current;

        const containerWidth = container.getBoundingClientRect().width;

        const elements = document.getElementsByClassName(`${clsPrefix}-img-previewer__controller-item`);

        const offset = Array.from(elements)
          .slice(0, elements.length - 1)
          .reduce((prev, curr) => prev + curr.getBoundingClientRect().width, 0);

        setTranslateX((currentTranslateX) => {
          if (currentTranslateX - touchDeltaX <= 0) {
            return 0;
          }

          if (currentTranslateX - touchDeltaX >= offset - (containerWidth / 2) + 30) {
            return offset - (containerWidth / 2) + 30;
          }

          return currentTranslateX - touchDeltaX;
        });
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div
        style={{
          transform: `translateX(-${translateX}px)`,
          transition: 'transform .3s',
        }}
        className={classnames(`${clsPrefix}-img-previewer__controller-container`)}
      >
        {imgUrls.map((imgSrc, idx) => (
          <ControllerItem
            className={classnames(
              `${clsPrefix}-img-previewer__controller-item`,
              {
                'is-active': idx === currentImgIdx,
                'is-mobile': IS_MOBILE,
              },
            )}
            alt={''}
            isActive={idx === currentImgIdx}
            onClick={() => {
              onImgClick(idx);
            }}
            idx={idx}
            onError={onError}
            src={imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default WebImgPreviewerController;
