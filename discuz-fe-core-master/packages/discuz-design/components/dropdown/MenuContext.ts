import { createContext } from 'react';

interface MenuContextValue {
  /**
   * 当前激活item key
   */
  activeItem?: string,

  /**
   * item点击触发回调事件
   */
  onHandlerChange: (key?: string) => void,
}

export const MenuContext = createContext<MenuContextValue>({
  activeItem: '',
  onHandlerChange: () => { },
});
