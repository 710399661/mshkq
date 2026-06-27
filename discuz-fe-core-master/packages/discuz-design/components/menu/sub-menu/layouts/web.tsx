import React, { useContext, useState, useEffect } from 'react';
import { ConfigContext } from '../../../../extends/configContext';
import { MenuContext, INITIAL_VALUE, SubMenuContext } from '../../MenuContext';

import classNames from 'classnames';
import { SubMenuProps } from '../interface';
import Icon from '../../../icon/index';

export function SubMenuWebLayout(props) {
  const { style, className, title, index, onClick }: SubMenuProps = props;

  const {
    uniqueOpened,
    mode,
    menuTrigger,
    hoverSubMenuIndex,
    setHoverSubMenuIndex,
    currentActiveSubMenuIndex,
    setCurrentActiveItemIndex,
    setCurrentActiveSubMenuIndex,
    // 多选相关
    multiple,
    currentActiveSubMenuIndexSet,
    setCurrentActiveSubMenuIndexSet,

    // 默认展开的子菜单
    defaultOpeneds,
  } = useContext(MenuContext);

  const { clsPrefix } = useContext(ConfigContext);
  const componentPrefix = `${clsPrefix}-submenu`;
  const menuClassName = `${clsPrefix}-menu`;

  // 默认展开
  let defaultOpened = false;
  if (defaultOpeneds && defaultOpeneds.length) {
    defaultOpened = defaultOpeneds.some(item => item === index);
  }

  const [open, setOpen] = useState(index === currentActiveSubMenuIndex || defaultOpened);
  const classNameStr: string = classNames(componentPrefix, className, {
    'is-open': open,
  });

  const active = (multiple
    ? currentActiveSubMenuIndexSet.has(index)
    : index === currentActiveSubMenuIndex);
  const titleClassNameStr: string = classNames(`${componentPrefix}__title`, {
    'is-active': active,
  });

  // 开启手风琴模式
  if (mode === 'horizontal' || uniqueOpened) {
    useEffect(() => {
      setOpen(index === currentActiveSubMenuIndex);
    }, [currentActiveSubMenuIndex]);
  }

  // menu菜单子元素
  let childrenElemet = open ? <ul className={menuClassName}>
    <SubMenuContext.Provider value={{ subMenuIndex: index }}>
      {props.children}
    </SubMenuContext.Provider>
  </ul> : '';

  // hover模式相关事件
  let hoverEvent = {};
  if (mode === 'horizontal' && menuTrigger === 'hover') {
    childrenElemet = index === hoverSubMenuIndex ? <ul className={menuClassName}>
      <SubMenuContext.Provider value={{ subMenuIndex: index }}>
        {props.children}
      </SubMenuContext.Provider>
    </ul> : '';

    const onMouseEnter = (e) => {
      setHoverSubMenuIndex(index);
      setOpen(true);
    };

    const onMouseLeave = (e) => {
      setHoverSubMenuIndex(INITIAL_VALUE);
      setOpen(false);
    };
    hoverEvent = {
      onMouseEnter: e => onMouseEnter(e),
      onMouseLeave: e => onMouseLeave(e),
    };
  }

  const onSubMenuClick = (e) => {
    e.nativeEvent.stopImmediatePropagation();

    // 多选模式
    if (multiple) {
      currentActiveSubMenuIndexSet.has(index)
        ? currentActiveSubMenuIndexSet.delete(index)
        : currentActiveSubMenuIndexSet.add(index);
      setCurrentActiveSubMenuIndexSet(currentActiveSubMenuIndexSet);
      setOpen(!open);
    } else {
      setCurrentActiveSubMenuIndex(index);
      setCurrentActiveItemIndex(INITIAL_VALUE);
      setOpen(!open);
    }

    typeof onClick === 'function' && onClick(index, !open, currentActiveSubMenuIndexSet);
  };

  return (
    <li style={style} className={classNameStr} {...hoverEvent}>
      <div className={titleClassNameStr} onClick={e => onSubMenuClick(e)}>
        {mode !== 'horizontal' && <Icon
            className={`${componentPrefix}__icon`}
            name="RightOutlined"
            size={12}
          ></Icon>}
        {title}
        {mode === 'horizontal' && <Icon
            className={`${componentPrefix}__icon ${componentPrefix}__icon--horizontal`}
            name="RightOutlined"
            size={12}
          />}
      </div>

      { childrenElemet}
    </li >
  );
}
