import React, { useCallback, useEffect } from 'react';
import classnames from 'classnames';
import Icon from '../../../icon';
import { useConfig } from '../../../../extends/configContext';
import Finger from '../../libs/finger-web';
import Mouse from '../../libs/mouse-web';
import { get } from '../../../../utils/get';
import Spin from '../../../spin';
import isMobile from '../../../../utils/is-mobile';

const WebImgPreviewerViewer = ({
  imgUrls = [],
  currentImgIdx = 0,
  visible = false,
  onClose = () => {},
  onSwipRight = () => {},
  onSwipLeft = () => {},
  onClickLock = () => {},
  onClickUnLock = () => {},
  onError = i => '',
}) => {
  let IS_MOBILE = false;
  if (typeof window !== 'undefined') {
    IS_MOBILE = isMobile();
  }

  const { clsPrefix } = useConfig();

  // 事件中心
  const fingerEventCenter = React.useRef(null);
  const mouseEventCenter = React.useRef(null);

  // tap 事件守卫
  const doubleTapFlag = React.useRef(false);
  const doubleTapFlagTimer = React.useRef(null);

  // pinch 事件守卫
  const pinchFlag = React.useRef(false);
  const pinchFlagTimer = React.useRef(null);

  // swipe 事件守卫
  const swipeFlag = React.useRef(false);
  const swipeFlagTimer = React.useRef(null);

  // pressMove 事件守卫
  const pressMoveFlag = React.useRef(false);
  const pressMoveFlagTimer = React.useRef(null);

  // 下滑事件守卫
  const click = React.useRef(false);
  const clickTimer = React.useRef(null);

  const imgType = React.useRef('normal');

  // 图片引用
  const imgRef = React.useRef(null);

  // 当前图片列表和引用数的 ref
  const currentImgIndexRef = React.useRef(currentImgIdx);
  const imgUrlsRef = React.useRef(imgUrls);

  // 图像长宽控制
  const [imageWidth, setImageWidth] = React.useState(null);
  const [imageHeight, setImageHeight] = React.useState(null);

  // 图像加载状态控制
  const [isImageLoading, setImageLoadingState] = React.useState(false);
  const [isImageLoadError, setIsImageLoadError] = React.useState(false);

  // 缩放比率及模式控制
  const [scaleMode, setScaleMode] = React.useState(false);
  const [scaleRate, setScaleRate] = React.useState(1);

  // 图像位移控制
  const [deltaY, setDeltaY] = React.useState(0);
  const [deltaX, setDeltaX] = React.useState(0);

  // 图像缩放原点控制
  const [zoomX, setZoomX] = React.useState(0);
  const [zoomY, setZoomY] = React.useState(0);

  // 是否为长图模式
  const [isLongPic, setIsLongPic] = React.useState(false);

  // 图像 zoom 偏移量修复
  const [zoomPositionX, setZoomPositionX] = React.useState(0);
  const [zoomPositionY, setZoomPositionY] = React.useState(0);

  // 当前图像的 url
  const [currImgUrl, setCurrImgUrl] = React.useState(imgUrls[currentImgIdx] || '');

  const firstLoadRef = React.useRef(true);

  const viewerRef = React.useRef(null);

  const transformStyle = {};

  let windowHeight = 600;

  if (typeof window !== 'undefined') {
    windowHeight = window.innerHeight;
  }

  const scaleModeHandler = React.useCallback(({ noZoomPositionChange = false }) => {
    setScaleMode((currentMode) => {
      let isErrorOrLoading = false;
      setIsImageLoadError((errorState) => {
        if (errorState) isErrorOrLoading = true;
        return errorState;
      });

      setImageLoadingState((loading) => {
        if (loading) isErrorOrLoading = true;
        return loading;
      });

      if (isErrorOrLoading) return;
      if (currentMode) {
        setScaleRate(1);

        if (imgType.current !== 'long') {
          setDeltaX(0);
          setDeltaY(0);
        } else {
          setDeltaX(0);
        }

        if (!noZoomPositionChange) {
          setZoomX(0);
          setZoomY(0);
        }
      } else {
        setScaleRate(2);
      }
      return !currentMode;
    });
  }, []);

  const lockSingleTap = React.useCallback(() => {
    if (doubleTapFlagTimer.current) {
      clearTimeout(doubleTapFlagTimer.current);
    }

    doubleTapFlag.current = true;
    doubleTapFlagTimer.current = setTimeout(() => {
      doubleTapFlag.current = false;
    }, 300);
  }, []);

  const lockPressMove = React.useCallback(() => {
    if (pressMoveFlag.current) {
      clearTimeout(pressMoveFlagTimer.current);
    }

    pressMoveFlag.current = true;
    pressMoveFlagTimer.current = setTimeout(() => {
      pressMoveFlag.current = false;
    }, 300);
  }, []);

  // 锁定 click 事件，防止由于 click 导致的穿透问题
  const lockClick = React.useCallback(() => {
    if (click.current) {
      clearTimeout(clickTimer.current);
    }

    click.current = true;
    onClickLock();

    clickTimer.current = setTimeout(() => {
      click.current = false;
      onClickUnLock();
    }, 300);
  }, []);

  // pinch 锁，100 ms，最小可能出现定位点错误问题
  const lockPinch = React.useCallback(() => {
    clearTimeout(pinchFlagTimer.current);

    pinchFlag.current = true;

    pinchFlagTimer.current = setTimeout(() => {
      pinchFlag.current = false;
    }, 500);
  }, []);

  const lockSwipe = React.useCallback(() => {
    if (swipeFlag.current) return;

    swipeFlag.current = true;
    swipeFlagTimer.current = setTimeout(() => {
      swipeFlag.current = false;
    }, 300);
  }, []);

  /**
   * 聚焦函数，会出现偏移的情况
   */
  const focusOnTargetPosition = useCallback(({
    x, y,
  }) => {
    if (!imgRef.current) return;

    let deltaX = null;
    let deltaY = null;
    let scaleRate = null;

    const offsetLeft = imgRef.current.getBoundingClientRect().left;
    const offsetTop = imgRef.current.getBoundingClientRect().top;

    // 获取当前的 rate、x、y 轴偏移量
    setScaleRate((rate) => {
      scaleRate = rate;
      return rate;
    });

    setDeltaX((x) => {
      deltaX = x;
      return x;
    });

    setDeltaY((y) => {
      deltaY = y;
      return y;
    });

    if (typeof window !== 'undefined') {
      const imagePositionX = (x - offsetLeft) / scaleRate;
      const imagePositionY = (y - offsetTop) / scaleRate;

      setZoomX(() => imagePositionX);

      setZoomY(() => imagePositionY);
    }
  }, []);

  const swipeLeftImpl = React.useCallback(() => {
    setScaleMode((scaleMode) => {
      if (scaleMode) return scaleMode;


      if (currentImgIndexRef.current + 1 !== imgUrlsRef.current.length) {
        setImageLoadingState(true);
      }

      onSwipLeft();

      setTimeout(() => {
        setDeltaX(0);
        setDeltaY(0);
      }, 300);

      return scaleMode;
    });
  }, [onSwipLeft]);

  const swipeRightImpl = React.useCallback(() => {
    setScaleMode((scaleMode) => {
      if (scaleMode) return scaleMode;

      if (currentImgIndexRef.current + 1 !== 1) {
        setImageLoadingState(true);
      }

      onSwipRight();

      setTimeout(() => {
        setDeltaX(0);
        setDeltaY(0);
      }, 300);
      return scaleMode;
    });
  }, [onSwipRight]);

  useEffect(() => {
    if (viewerRef.current) {
      fingerEventCenter.current = new Finger(viewerRef.current, {
        singleTap() {
          if (!doubleTapFlag.current) {
            onClose();
          }
        },
        doubleTap(evt) {
          const pageX = get(evt.changedTouches[0], 'pageX', 0);
          const pageY = get(evt.changedTouches[0], 'pageY', 0);
          focusOnTargetPosition({
            x: pageX,
            y: pageY,
          });
          scaleModeHandler({
            noZoomPositionChange: true,
          });
        },
        // pinch 事件暂时注释
        pinch(evt) {
          // pinch 的时候锁定 tap 和 swipe 事件，防止发生缩放时被关闭和切换
          lockSingleTap();
          lockSwipe();
          setScaleMode(true);

          // 这里也锁定下 pressmove 事件，防止误触
          lockPressMove();

          const pageX = (get(evt.touches[0], 'pageX', 0) + get(evt.touches[1], 'pageX', 0)) / 2;
          const pageY = (get(evt.touches[0], 'pageY', 0) + get(evt.touches[1], 'pageY', 0)) / 2;

          if (evt.zoom > 1 && !pinchFlag.current) {
            if (evt.zoom <= 2.5) {
              focusOnTargetPosition({
                x: pageX,
                y: pageY,
              });
              lockPinch();
            }
          }

          // 最小缩放比例 1，采用固定缩小比例
          if (Number(evt.zoom) <= 1) {
            setScaleRate((rate) => {
              if (0.85 * rate <= 1) {
                setDeltaX(0);

                if (imgType.current !== 'long') {
                  setDeltaY(0);
                }

                setScaleMode(false);
                return 1;
              }
              return 0.85 * rate;
            });
            return;
          }

          // 最大缩放比例 3
          setScaleRate((rate) => {
            if (rate >= 3) return rate;
            if (evt.zoom < rate) {
              return rate + (evt.zoom / 3);
            }
            return ((evt.zoom - rate) /  3) + rate;
          });
        },
        pressMove(evt) {
          lockSingleTap();

          // 如果此时处于事件加锁阶段，不执行
          if (pressMoveFlag.current) return;

          const deltaYSetter = () => {
            setDeltaY((currentY) => {
              const windowHeight = window.innerHeight;
              if (!imgRef.current) return;
              // 顶部和底部余量，用来在滑动边缘值时进行修正
              const topAllowance = imgRef.current.getBoundingClientRect().top;
              const bottomAllowance = imgRef.current.getBoundingClientRect().bottom - windowHeight + 89;
              const isTopEnd = topAllowance >= 0;
              const isBottomEnd = bottomAllowance <= 0;

              if (evt.deltaY >= 0) {
                if (isTopEnd) {
                  // 触顶下拉 close 事件
                  if (evt.deltaY >= 30) {
                    onClose();
                  }
                  return currentY;
                }

                if (topAllowance <= 0 && -topAllowance <= evt.deltaY) {
                  return currentY + Math.abs(topAllowance);
                }
              }

              if (evt.deltaY < 0) {
                if (isBottomEnd) {
                  return currentY;
                }

                if (bottomAllowance >= 0 && bottomAllowance <= Math.abs(evt.deltaY)) {
                  return currentY - bottomAllowance;
                }
              }

              return currentY + evt.deltaY;
            });
          };

          const deltaXSetter = () => {
            setDeltaX((currentX) => {
              const windowWidth = window.innerWidth;
              let rate = 1;
              setScaleRate((currentRate) => {
                rate = currentRate;
                return rate;
              });

              if (!imgRef.current) return;
              // 左侧和右侧的余量，用来在滑动边缘值时进行修正
              const leftAllowance = imgRef.current.getBoundingClientRect().left;
              const rightAllowance = imgRef.current.getBoundingClientRect().right - windowWidth;
              const isLeftEnd = leftAllowance >= 0;
              const isRightEnd = rightAllowance <= 0;

              if (evt.deltaX >= 0) {
                if (leftAllowance <= 0 && Math.abs(leftAllowance) <= evt.deltaX) {
                  return currentX + Math.abs(leftAllowance);
                }

                // 边缘组织
                if (isLeftEnd) {
                  if (Math.abs(evt.deltaX) > 15) {
                    if (swipeFlag.current) return;
                    lockSwipe();
                    setScaleMode(false);
                    swipeRightImpl();
                  };
                  return currentX;
                };

                // // 进行余量修正
                // if (leftAllowance > 0) {
                //   return currentX - leftAllowance;
                // }
              }

              if (evt.deltaX < 0) {
                if (rightAllowance >= 0 && rightAllowance <= Math.abs(evt.deltaX)) {
                  return currentX + rightAllowance;
                }

                if (isRightEnd) {
                  if (Math.abs(evt.deltaX) > 15) {
                    if (swipeFlag.current) return;
                    lockSwipe();
                    setScaleMode(false);
                    swipeLeftImpl();
                  };
                  return currentX;
                }

                // // 进行余量修正
                // if (rightAllowance <= 0) {
                //   return currentX - rightAllowance;
                // }
              }

              return currentX + evt.deltaX;
            });
          };

          setScaleMode((scaleMode) => {
            if (scaleMode) {
              deltaXSetter();
              deltaYSetter();
              return scaleMode;
            }
            setImageHeight((height) => {
              const windowHeight = window.innerHeight;
              const IS_LONG_PIC_MODE = height > windowHeight - 89;
              if (IS_LONG_PIC_MODE) {
                deltaYSetter();
              } else {
                if (evt.deltaY >= 30) {
                  // 下拉关闭手势
                  onClose();
                }
              }
              setImageHeight(height);
            });
            return scaleMode;
          });
        },
        swipe(evt) {
          lockSingleTap();
          lockPressMove();
          if (swipeFlag.current) {
            return;
          }
          switch (evt.direction) {
            case 'Left':
              swipeLeftImpl();
              break;
            case 'Right':
              swipeRightImpl();
          }
        },
      });

      mouseEventCenter.current = new Mouse(viewerRef.current, {
        mouseMove(evt) {
          if (!imgRef.current) return;
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          // 左侧和右侧的余量，用来在滑动边缘值时进行修正
          const leftAllowance = imgRef.current.getBoundingClientRect().left;
          const rightAllowance = imgRef.current.getBoundingClientRect().right - windowWidth;
          const topAllowance = imgRef.current.getBoundingClientRect().top;
          const bottomAllowance = imgRef.current.getBoundingClientRect().bottom - windowHeight + 80;
          const isTopEnd = topAllowance >= 0;
          const isBottomEnd = bottomAllowance <= 0;
          const isLeftEnd = leftAllowance >= 0;
          const isRightEnd = rightAllowance <= 0;

          // 锁定 click 事件，防止 click 导致的意外关闭
          lockClick();
          evt.preventDefault();
          evt.stopPropagation();

          setScaleMode((scaleMode) => {
            if (scaleMode) {
              setDeltaX(currentX =>
              // if (evt.deltaX < 0) {
              //   if (isLeftEnd) {
              //     return currentX;
              //   }
              // }

                // if (evt.deltaX >= 0) {
                //   if (isRightEnd) {
                //     return currentX;
                //   }
                // }
                currentX + evt.deltaX);
              setDeltaY(currentY =>
              // if (evt.deltaY < 0) {
              //   if (isBottomEnd) {
              //     return currentY;
              //   }
              // }

                // if (evt.deltaY >= 0) {
                //   if (isTopEnd) {
                //     return currentY;
                //   }
                // }
                currentY + evt.deltaY);
              return scaleMode;
            }
            setImageHeight((height) => {
              const windowHeight = window.innerHeight;
              const IS_LONG_PIC_MODE = height > windowHeight - 89;
              if (IS_LONG_PIC_MODE) {
                setIsLongPic(true);
                setDeltaY(currentY =>
                // if (evt.deltaY < 0) {
                //   if (isBottomEnd) {
                //     return currentY;
                //   }
                // }

                  // if (evt.deltaY >= 0) {
                  //   if (isTopEnd) {
                  //     return currentY;
                  //   }
                  // }
                  currentY + evt.deltaY);
              }
              setImageHeight(height);
            });
          });
        },
        zoomIn({ zoom, evt }) {
          setScaleMode(true);
          setScaleRate((rate) => {
            if (rate - zoom / 10 <= 1) {
              // setScaleMode(false);
              return 1;
            }
            return rate - zoom / 10;
          });
        },
        zoomOut({ zoom, evt }) {
          setScaleRate(rate => rate + zoom / 10);
          focusOnTargetPosition({
            x: evt.x,
            y: evt.y,
          });
          setScaleMode(true);
        },
      });
    }

    return () => {
      if (fingerEventCenter.current) {
        fingerEventCenter.current.destroy();
      }

      if (mouseEventCenter.current) {
        mouseEventCenter.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    setIsLongPic(false);

    let loadingStateTimer = null;
    let urlChangeTimer = null;

    if (!firstLoadRef.current) {
      setImageLoadingState(true);
    }

    firstLoadRef.current = false;

    currentImgIndexRef.current = currentImgIdx;
    imgUrlsRef.current = imgUrls;

    urlChangeTimer = setTimeout(() => {
      setCurrImgUrl(imgUrls[currentImgIdx]);
      setIsImageLoadError(false);
      setScaleMode(false);

      setZoomX(0);
      setZoomY(0);
    }, 300);

    loadingStateTimer = setTimeout(() => {
      if (!imgRef.current) {
        setIsImageLoadError(true);
        setImageLoadingState(false);
        return;
      }

      if ((imgRef.current && imgRef.current.complete) || isImageLoadError) {
        setImageLoadingState(false);
      } else {
        setImageLoadingState(true);
      }
    }, 300);

    return () => {
      clearTimeout(loadingStateTimer);
      clearTimeout(urlChangeTimer);
    };
  }, [currentImgIdx]);

  if (imageWidth) {
    Object.assign(transformStyle, {
      width: imageWidth,
    });
  }

  if (imageHeight) {
    Object.assign(transformStyle, {
      height: imageHeight,
    });
  }

  if (isImageLoading) {
    Object.assign(transformStyle, {
      visibility: 'hidden',
      opacity: 0,
    });
  } else {
    Object.assign(transformStyle, {
      visibility: 'visible',
      opacity: 1,
    });
  }

  if (windowHeight - 89 < imageHeight) {
    Object.assign(transformStyle, {
      top: `calc(50% + ${deltaY}px)`,
    });
  }

  if (scaleMode) {
    Object.assign(transformStyle, {
      transform: `translate(-50%, -50%) scale(${scaleRate}) translateZ(0)`,
      top: `calc(50% + ${deltaY}px)`,
      left: `calc(50% + ${deltaX}px)`,
    });
  }

  if (zoomX && zoomY) {
    Object.assign(transformStyle, {
      transformOrigin: `${zoomX}px ${zoomY}px`,
    });
  }

  const computeSize = ({ height, width }) => {
    if (typeof window !== 'undefined') {
      let mode = 'width';
      let rate = 1;
      if (height >= width) {
        mode = 'height';
      }

      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      switch (mode) {
        case 'width':
          setDeltaY(0);
          setDeltaX(0);
          if (width > windowWidth) {
            rate = width / windowWidth;
            setImageWidth(windowWidth);
            setImageHeight(height / rate);
            imgType.current = 'width';
          } else {
            setImageWidth(width);
            setImageHeight(height);
            imgType.current = 'normal';
          }
          break;
        case 'height':
          if (height >= windowHeight) {
            const IS_LONG_PIC = height / width >= 2.5;
            if (IS_LONG_PIC) {
              setIsLongPic(true);
              if (width <= windowWidth) {
                setImageWidth(width);
                setImageHeight(height);
                // TODO: 这里处理了长图固定顶部的逻辑，但是这里的耦合度很高
                setDeltaY((height / 2) - (windowHeight / 2));
                imgType.current = 'long';
              } else {
                setImageWidth(windowWidth);
                rate = width / windowWidth;
                setImageHeight(height / rate);
                // TODO: 这里处理了长图固定顶部的逻辑，但是这里的耦合度很高
                setDeltaY(((height / rate) / 2) - (windowHeight / 2));
                imgType.current = 'long';
              }
            } else {
              setIsLongPic(false);
              setDeltaY(0);
              setDeltaX(0);

              if (width >= windowWidth) {
                setImageWidth(windowWidth);
                rate = width / windowWidth;
                setImageHeight(height / rate);
                imgType.current = 'normal';
              } else {
                rate = height / windowHeight;
                setImageHeight(windowHeight);
                setImageWidth(width / rate);
                imgType.current = 'normal';
              }
            }
          } else {
            setIsLongPic(false);
            setDeltaY(0);
            setDeltaX(0);
            if (width >= windowWidth) {
              setImageWidth(windowWidth);
              rate = width / windowWidth;
              setImageHeight(height / rate);
            } else {
              // rate = height / windowHeight;
              // setImageHeight(windowHeight);
              // setImageWidth(width / rate);
              setImageWidth(width);
              setImageHeight(height);
            }
            imgType.current = 'normal';
          }
          break;
      }
    }
  };

  const renderStatus = () => {
    if (isImageLoading) {
      return (
        <div className={`${clsPrefix}-img-previewer__viewer-loading`}>
          <Spin type={'spinner'} />
        </div>
      );
    }

    if (isImageLoadError) {
      return (
        <div className={`${clsPrefix}-img-previewer__viewer-loading is-error`}>
          <Icon name="PictureErrorOutlined" size={50} />
          图像加载失败
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`${clsPrefix}-img-previewer__viewer-wrapper`}
      ref={viewerRef}
    >
      {!isImageLoadError && (
        <img
          style={transformStyle}
          ref={imgRef}
          draggable={false}
          onLoad={(e) => {
            computeSize({
              height: e.target.naturalHeight,
              width: e.target.naturalWidth,
            });

            setTimeout(() => {
              setImageLoadingState(false);
            }, 300);
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onError={(e) => {
            // 图片错误，进行错误处理，如果需要重置则重置报错
            const newUrl = onError(currentImgIdx);
            if (newUrl && newUrl !== currImgUrl) {
              setCurrImgUrl(newUrl);
              return;
            }
            setImageLoadingState(false);
            setIsImageLoadError(true);
          }}
          onDoubleTap={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onTap={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onDoubleClick={() => {
            if (!IS_MOBILE) {
              scaleModeHandler({
                noZoomPositionChange: false,
              });
            }
          }}
          className={classnames(`${clsPrefix}-img-previewer__viewer-instance`, {
            'is-hidden': isImageLoading,
            'is-movable': scaleMode || isLongPic,
          })}
          src={currImgUrl}
        />
      )}
      {renderStatus()}
    </div>
  );
};

export default WebImgPreviewerViewer;
