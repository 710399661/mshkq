import React, { useContext } from 'react';
import { ConfigContext } from '../../../../extends/configContext';
import { MenuContext, SubMenuContext } from '../../MenuContext';
import classNames from 'classnames';
import { MenuItemProps } from '../interface';

export function MenuItemWebLayout(props) {
  const { style, className, index, disabled, divided, onClick }: MenuItemProps = props;

  const {
    currentActiveItemIndex,
    setCurrentActiveItemIndex,
    setCurrentActiveSubMenuIndex,
    // 多选相关
    multiple,
    currentActiveItemIndexSet,
    setCurrentActiveItemIndexSet,
    currentActiveSubMenuIndexSet,
    setCurrentActiveSubMenuIndexSet,
  } = useContext(MenuContext);

  const { subMenuIndex } = useContext(SubMenuContext);

  const { clsPrefix } = useContext(ConfigContext);

  const componentPrefix = `${clsPrefix}-menu-item`;

  const classNameStr: string = classNames(componentPrefix, className, {
    'is-disabled': disabled,
    'is-active': multiple
      ? currentActiveItemIndexSet.has(index)
      : currentActiveItemIndex === index,
    'is-divided': divided,
  });

  const onMenuItemClick = (e) => {
    if (!disabled) {
      e.nativeEvent.stopImmediatePropagation();

      // 多选模式
      if (multiple) {
        if (currentActiveItemIndexSet.has(index)) {
          currentActiveItemIndexSet.delete(index);
          // TODO:如果子菜单为空，则清除当前submenu index
        } else {
          currentActiveItemIndexSet.add(index);
          // 设置submenu index
          currentActiveSubMenuIndexSet.add(subMenuIndex);
          setCurrentActiveSubMenuIndexSet(currentActiveSubMenuIndexSet);
        }
        setCurrentActiveItemIndexSet(currentActiveItemIndexSet);
      } else {
        setCurrentActiveItemIndex(index);
        setCurrentActiveSubMenuIndex(subMenuIndex);
      }

      typeof onClick === 'function' && onClick(index, subMenuIndex, currentActiveItemIndexSet);
    }
  };

  return (
    <li style={style} className={classNameStr} onClick={onMenuItemClick}>
      {props.children}
    </li>
  );
}
