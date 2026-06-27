import React, { useContext } from 'react';
import { ConfigContext } from '../../../../extends/configContext';
import { MenuContext } from '../../MenuContext';
import classNames from 'classnames';
import { MenuItemProps } from '../interface';

MenuItemWebLayout.defaultProps = {
  disabled: false,
  divided: true,
};

export function MenuItemWebLayout(props) {
  const { style, className, id, disabled, divided }: MenuItemProps = props;

  const { activeItem, onHandlerChange } = useContext(MenuContext);

  const { clsPrefix } = useContext(ConfigContext);

  const componentPrefix = `${clsPrefix}-dropdown-menu__item`;

  const classNameStr: string = classNames(componentPrefix, className, {
    'is-disabled': disabled,
    'is-active': activeItem === id,
    'is-divided': divided,
  });

  const onMenuItemClick = (e) => {
    if (!disabled) {
      e.nativeEvent.stopImmediatePropagation();
      onHandlerChange(id);
    }
  };

  return (
    <li style={style} className={classNameStr} onClick={onMenuItemClick}>
      {props.children}
    </li>
  );
}
