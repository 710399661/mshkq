import React, { useContext } from 'react';
import { View } from '@tarojs/components';
import { ConfigContext } from '../../../extends/configContext';
import classNames from 'classnames';
import { DividerProps } from '../interface';

const defaultProps = {
  mode: 'horizontal',
  dashed: false,
  orientation: 'center',
};

export function DividerMiniLayout(props) {
  const { mode, children, dashed, orientation, className, style }: DividerProps = props;
  const { clsPrefix } = useContext(ConfigContext);
  const componentClassName = `${clsPrefix}-divider`;

  const dividerClassName = classNames(className, componentClassName, `${componentClassName}--${mode}`, {
    'is-dashed': dashed,
  });

  const textClassName = classNames(`${componentClassName}__text`, `is-${orientation}`);

  return <View className={dividerClassName} style={style}>
    {(children && mode === 'horizontal') && <View className={textClassName}>
      {children}
    </View>}
  </View>;
}

DividerMiniLayout.defaultProps = defaultProps;
