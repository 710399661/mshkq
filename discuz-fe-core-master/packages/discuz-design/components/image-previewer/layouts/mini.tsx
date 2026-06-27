import { View } from '@tarojs/components';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import Taro from '@tarojs/taro';
import { ImagePreviewerProps, ImagePreviewerRef } from '../interface';
import { Combine } from '../../../utils/_type/util';

export const MiniLayout = forwardRef<
  ImagePreviewerRef,
  Combine<
    ImagePreviewerProps,
    {
      imgs: string[];
      currentUrl: string;
    }
  >
>((
  { imgs = [], currentUrl = '', visible = false, onComplete = () => {}, onSuccess = () => {}, onFail = () => {} },
  ref,
) => {
  const imgsRef = React.useRef([]);
  const currentImgRef = React.useRef('');

  const show = useCallback(() => {
    Taro.previewImage({
      current: currentImgRef.current,
      urls: imgsRef.current,
      complete: (res) => {
        onComplete(res);
      },
      success: (res) => {
        onSuccess(res);
      },
      fail: (res) => {
        onFail(res);
      },
    });
  }, [imgs, visible, currentUrl]);

  useImperativeHandle(ref, () => ({ show }), [show]);

  useEffect(() => {
    imgsRef.current = imgs;
  }, [imgs]);

  useEffect(() => {
    if (visible) {
      Taro.previewImage({
        current: currentImgRef.current,
        urls: imgsRef.current,
        complete: (res) => {
          onComplete(res);
        },
        success: (res) => {
          onSuccess(res);
        },
        fail: (res) => {
          onFail(res);
        },
      });
    }
  }, [visible]);

  useEffect(() => {
    currentImgRef.current = currentUrl;
  }, [currentUrl]);

  return null;
});
