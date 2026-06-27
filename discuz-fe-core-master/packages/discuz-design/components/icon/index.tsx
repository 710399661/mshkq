import React from 'react';
import getRenderComponent from './layouts';
import { IconProps } from './interface';
import { useReport } from '../../utils/report';

interface IconLayoutInterface {
  iconStyle: React.CSSProperties;
  src?: string;
  name: string;
}

const RenderComponent: React.FC<IconLayoutInterface> = getRenderComponent();

const Icon: React.FC<IconProps> = ({ name = '', size, color, ...props }) => {

  useReport({
    componentName: 'icon'
  })
  // 判断属性 name 的值是否为 url
  const src = name.indexOf('/') !== -1 ? name : null;

  const genStyle = (): React.CSSProperties => {
    const getVar = (val: number | string) => (+val ? `${val}px` : val);

    // 默认 16
    let dimension = getVar(16);

    if (typeof size === 'string') {
      if (size === 'large') {
        dimension = getVar(32);
      } else if (size === 'small') {
        dimension = getVar(16);
      } else {
        dimension = getVar(size);
      }
    }

    if (typeof size === 'number') {
      dimension = getVar(size);
    }

    const sizeStyle: React.CSSProperties = src ? { width: dimension, height: dimension } : { fontSize: dimension };

    const colorStyle: React.CSSProperties = { color };

    return { ...sizeStyle, ...colorStyle };
  };

  return <RenderComponent iconStyle={genStyle()} src={src} name={name} {...props} />;
};

export default Icon;
