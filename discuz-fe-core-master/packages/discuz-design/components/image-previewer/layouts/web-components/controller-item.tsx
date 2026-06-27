import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useConfig } from '../../../../extends/configContext';
import Icon from '../../../icon';
import Spin from '../../../spin';
import isMobile from '../../../../utils/is-mobile';

const ControllerItem = (props) => {
  const [isError, setIsError] = React.useState(false);
  const [isItemLoading, setIsItemLoading] = React.useState(true);
  const { clsPrefix } = useConfig();
  const [currImgUrl, setCurrImgUrl] = React.useState(props.src || '');

  const imgRef = React.useRef(null);

  let IS_MOBILE = false;
  if (typeof window !== 'undefined') {
    IS_MOBILE = isMobile();
  }

  // 图片加载状态修正
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsItemLoading(false);
    } else {
      setIsItemLoading(true);
    }
  });

  if (isError) {
    return (
      <div
        className={classnames(
          `${clsPrefix}-img-previewer__controller-item is-error`,
          {
            'is-mobile': IS_MOBILE,
            'is-active': props.isActive,
          },
        )}
        onClick={props.onClick}
      >
        <Icon size={20} name="PictureErrorOutlined" color="white" />
      </div>
    );
  }

  const imgLoadingStyle = {};

  if (isItemLoading) {
    Object.assign(imgLoadingStyle, {
      display: 'none',
      visibility: 'hidden',
    });
  }

  return (
    <>
      <img
        alt="图片"
        ref={imgRef}
        style={imgLoadingStyle}
        onLoad={() => {
          setIsItemLoading(false);
        }}
        {...props}
        src={currImgUrl}
        onError={(err) => {
          // 图片错误，进行错误处理，如果需要重置则重置报错
          const newUrl = props.onError(props.idx || 0);
          if (newUrl && newUrl !== currImgUrl) {
            setCurrImgUrl(newUrl);
            setIsItemLoading(true);
            return;
          }
          setIsError(true);
        }}
      />
      {isItemLoading && (
        <div
          className={classnames(`${clsPrefix}-img-previewer__controller-item`, {
            'is-mobile': IS_MOBILE,
            'is-loading': imgLoadingStyle,
          })}
        >
          <Spin size={20} color="white" type="spinner" />
        </div>
      )}
    </>
  );
};

export default ControllerItem;
