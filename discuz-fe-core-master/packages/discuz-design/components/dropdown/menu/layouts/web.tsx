import React, { useContext, useState, useEffect } from 'react';
import { ConfigContext } from '../../../../extends/configContext';
import classNames from 'classnames';
import { MenuContext } from '../../MenuContext';

export function MenuWebLayout(props) {
  const { clsPrefix } = useContext(ConfigContext);
  const componentPrefix = `${clsPrefix}-dropdown-menu`;

  const { placement = 'center' } = useContext(MenuContext);

  const classNameStr: string = classNames(componentPrefix, `${componentPrefix}--${placement}`);

  return (
    <ul className={classNameStr}>
      {props.children}
    </ul >
  );
}
