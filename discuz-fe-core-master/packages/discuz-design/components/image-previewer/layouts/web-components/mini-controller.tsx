import React, {
  useEffect,
} from 'react';
import classnames from 'classnames';
import Icon from '../../../icon';
import { useConfig } from '../../../../extends/configContext';
import isMobile from '../../../../utils/is-mobile';

const WebImgMobileController = ({
  imgUrls = [],
  currentImgIdx,
}) => {
  const { clsPrefix } = useConfig();

  let IS_MOBILE = false;
  if (typeof window !== 'undefined') {
    IS_MOBILE = isMobile();
  }

  if (imgUrls.length === 0 || !IS_MOBILE) return null;

  return (
    <div className={classnames(`${clsPrefix}-img-previewer__mobile-cursor`)}>
        {currentImgIdx + 1} / {imgUrls.length}
    </div>
  );
};

export default WebImgMobileController;
