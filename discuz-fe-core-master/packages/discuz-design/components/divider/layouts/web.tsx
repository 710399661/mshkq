import React, { Component, useContext } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import classNames from 'classnames';
import { DividerProps } from '../interface';

const defaultProps = {
  mode: 'horizontal',
  dashed: false,
  orientation: 'center',
};

export function DividerWebLayout(props) {
  const { mode, children, dashed, orientation, className, style }: DividerProps = props;
  const { clsPrefix } = useContext(ConfigContext);
  const componentClassName = `${clsPrefix}-divider`;

  const dividerClassName = classNames(className, componentClassName, `${componentClassName}--${mode}`, {
    'is-dashed': dashed,
  });

  const textClassName = classNames(`${componentClassName}__text`, `is-${orientation}`);

  return <div className={dividerClassName} style={style}>
    {(children && mode === 'horizontal') && <div className={textClassName}>
      {children}
    </div>}
  </div>;
}

DividerWebLayout.defaultProps = defaultProps;
