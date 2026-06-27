import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ConfigContext } from '../../../extends/configContext';
import classNames from 'classnames';
import { DropdownProps } from '../interface';
import { MenuContext } from '../MenuContext';
import Icon from '../../icon';

DropdownWebLayout.defaultProps = {
  trigger: 'hover',
  arrow: true,
  placement: 'center',
  hideOnClick: true,
};

export function DropdownWebLayout(props) {
  const { clsPrefix } = useContext(ConfigContext);
  const {
    style,
    className,
    menu,
    trigger,
    hideOnClick,
    placement,
    arrow,
    onVisibleChange,
    onChange,
  }: DropdownProps = props;

  const triggerRef = useRef(null);
  const [activeItem, setActiveItem] = useState('');
  const [visible, setVisible] = useState(false);

  const componentPrefix = `${clsPrefix}-dropdown`;
  const classNameStr: string = classNames(
    componentPrefix,
    className,
    {
      'is-active': visible,
    },
  );

  const onHandlerChange = (id) => {
    setActiveItem(id);
    if (hideOnClick) {
      setVisible(false);
    }
    typeof onChange === 'function' && onChange(id);
  };

  // context provider
  const contextValue = {
    activeItem,
    visible,
    placement,
    onHandlerChange,
  };

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setVisible(!visible);
  };

  let timeout = null;
  const show = (): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setVisible(true), 250);
  };

  const hide = (e): void => {
    if (trigger === 'click' && triggerRef.current?.contains(e.target)) return;
    clearTimeout(timeout);
    timeout = setTimeout(() => setVisible(false), 150);
  };

  // 是否第一次执行的标志
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (typeof onVisibleChange === 'function') {
      onVisibleChange(visible);
    }
  }, [visible]);

  useEffect(() => {
    initEvent();
  }, [trigger]);

  // 添加hover事件
  const initEvent = (): void => {
    const triggerElm: HTMLElement = ReactDOM.findDOMNode(triggerRef.current);

    if (trigger === 'hover') {
      triggerElm.addEventListener('mouseenter', show);
      triggerElm.addEventListener('mouseleave', hide);
    }

    if (trigger === 'click') {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', hide);
      }
    }
  };

  return (
    <div className={classNameStr} style={style} ref={triggerRef}>
      <div className={`${componentPrefix}__trigger`} onClick={e => {
        trigger === 'click' && handleClick(e)
      }}>
        {props.children}
        {arrow ? <Icon className={`${componentPrefix}__icon`} size={12} name="RightOutlined"></Icon> : ''}
      </div>

      {
        visible && <MenuContext.Provider value={contextValue}>
          {menu}
        </MenuContext.Provider>
      }

    </div>
  );
}
