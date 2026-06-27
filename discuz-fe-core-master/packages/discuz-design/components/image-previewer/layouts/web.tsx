import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import classnames from 'classnames';
import { ImagePreviewerProps, ImagePreviewerRef } from '../interface';
import { Combine } from '../../../utils/_type/util';
import { useConfig } from '../../../extends/configContext';
import WebImgPcController from './web-components/pc-controller';
import WebImgPreviewerController from './web-components/previewer-controller';
import WebImgPreviewerViewer from './web-components/previewer';
import WebImgMobileController from './web-components/mini-controller';
import isMobile from '../../../utils/is-mobile';
import ReactDOM from 'react-dom';
import EventEmitter from 'eventemitter3';
import { useReport } from '../../../utils/report';

class PreviewerEmitter extends EventEmitter {}

const previewerEmitter = new PreviewerEmitter();

/**
 * ModalHelper helpers resolve the modal scrolling issue on mobile devices
 * https://github.com/twbs/bootstrap/issues/15852
 * requires document.scrollingElement polyfill https://github.com/yangg/scrolling-element
 */
const ModalHelper = (function (bodyCls) {
  let scrollTop;
  return {
    afterOpen() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = `${-scrollTop}px`;
    },
    beforeClose() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    },
  };
}('modal-open'));

export const WebLayout = forwardRef<
  ImagePreviewerRef,
  Combine<
    ImagePreviewerProps,
    {
      imgs: string[];
      currentUrl: string;
    }
  >
>(({ imgs = [], currentUrl = '', visible, onClose = () => {}, onError = () => '' }, ref) => {
  useReport({
    componentName: 'imagePreviewer'
  });
  const viewerDomRef = React.useRef(null);
  const { clsPrefix } = useConfig();
  const [currShowImgIdx, setCurrShowImgIdx] = React.useState(0);
  const [innerVisible, setInnerVisible] = React.useState(false);

  // 控制显示隐藏的动画
  const [previewerVisible, setPreviewerVisible] = React.useState(false);

  const showAnimTimerRef = React.useRef(null);

  const openFlag = React.useRef(false);

  const clickLockFlag = React.useRef(false);

  React.useEffect(() => {
    const hide = () => {
      setInnerVisible(false);
    };

    const show = () => {
      setInnerVisible(true);
    };

    previewerEmitter.on('hide', hide);
    previewerEmitter.on('show', show);

    return () => {
      previewerEmitter.removeListener('hide', hide);
      previewerEmitter.removeListener('show', show);
    };
  }, []);

  React.useEffect(() => {
    if (innerVisible) {
      showAnimTimerRef.current = setTimeout(() => {
        setPreviewerVisible(true);
      }, 100);
    } else {
      showAnimTimerRef.current = setTimeout(() => {
        setPreviewerVisible(false);
      }, 100);
    }

    return () => {
      clearTimeout(showAnimTimerRef.current);
    };
  }, [innerVisible]);

  React.useEffect(() => {
    if (visible) {
      openFlag.current = true;
      ModalHelper.afterOpen();
    } else {
      if (openFlag.current) {
        openFlag.current = false;
        ModalHelper.beforeClose();
      }
    }
  }, [innerVisible]);

  React.useEffect(() => {
    const onTouchMove = (e) => {
      if (typeof e.cancelable !== 'boolean' || e.cancelable) {
        e.preventDefault();
      }
    };

    const onTouchEnd = (e) => {
      if (typeof e.cancelable !== 'boolean' || e.cancelable) {
        e.preventDefault();
      }
    };

    if (typeof window !== 'undefined' && innerVisible) {
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('toouchend', onTouchEnd, { passive: false });
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('toouchend', onTouchEnd);
      }
    };
  }, [innerVisible]);

  const show = useCallback(() => {
    setInnerVisible(true);
  }, [imgs, onClose]);

  const hide = useCallback(() => {
    setInnerVisible(false);
  }, []);

  useImperativeHandle(ref, () => ({ show, hide }), [show, hide]);

  useEffect(() => {
    setInnerVisible(visible);
  }, [visible]);

  useEffect(() => {
    let currentIndex = imgs.indexOf(currentUrl);

    if (currentIndex === -1) currentIndex = 0;

    setCurrShowImgIdx(currentIndex);
  }, [currentUrl, imgs]);

  // 暂不支持 ssr
  if (typeof window === 'undefined') {
    return null;
  }

  let IS_MOBILE = false;
  if (typeof window !== 'undefined') {
    IS_MOBILE = isMobile();
  }

  const onCloseImpl = () => {
    setPreviewerVisible(false);
    setTimeout(() => {
      setInnerVisible(false);
      onClose();
    }, 300);
  };

  return ReactDOM.createPortal(
    (
      innerVisible && (
      <div
        ref={viewerDomRef}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (!IS_MOBILE) {
            if (!clickLockFlag.current) {
              setInnerVisible(false);
              onClose();
            }
          }
        }}
        className={classnames(`${clsPrefix}-img-previewer`, {
          'is-mobile': IS_MOBILE,
          'is-active': previewerVisible,
        })}
      >
        <WebImgMobileController imgUrls={imgs} currentImgIdx={currShowImgIdx} />
        <WebImgPcController
          imgUrls={imgs}
          currentImgIdx={currShowImgIdx}
          onSwipLeft={() => {
            setCurrShowImgIdx((idx) => {
              if (idx < imgs.length - 1) {
                return idx + 1;
              }
              return idx;
            });
          }}
          onSwipRight={() => {
            setCurrShowImgIdx((idx) => {
              if (idx > 0) {
                return idx - 1;
              }
              return idx;
            });
          }}
          onClose={onCloseImpl}
        />
        <WebImgPreviewerViewer
          imgUrls={imgs}
          currentImgIdx={currShowImgIdx}
          onSwipLeft={() => {
            setCurrShowImgIdx((idx) => {
              if (idx < imgs.length - 1) {
                return idx + 1;
              }
              return idx;
            });
          }}
          onSwipRight={() => {
            setCurrShowImgIdx((idx) => {
              if (idx > 0) {
                return idx - 1;
              }
              return idx;
            });
          }}
          onError={onError}
          onClose={onCloseImpl}
          onClickLock={() => {
            clickLockFlag.current = true;
          }}
          onClickUnLock={() => {
            clickLockFlag.current = false;
          }}
        />
        <WebImgPreviewerController
          imgUrls={imgs}
          onError={onError}
          currentImgIdx={currShowImgIdx}
          onImgClick={(index) => {
            setCurrShowImgIdx(index);
          }}
        />
      </div>
      )
    ), document.getElementsByTagName('body')[0],
  );
});

// 隐藏 viewer 实例
export const hideInstance = () => {
  previewerEmitter.emit('hide');
};
