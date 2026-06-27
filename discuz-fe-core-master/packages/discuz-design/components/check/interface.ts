import { StyledProps } from 'utils/_type/StyledProps';

export interface ControlledProps<V> {
  /**
   * 未提供 `value` 的情况下，提供了 `defaultValue`，则可以当做是非受控组件使用
   */
  defaultValue?: V;

  /**
   * 当前值
   */
  value?: V;

  /**
   * 值发生变更时进行回调
   * - `value` 变更的目标值
   * - `context` 此次变更的更多上下文信息，其中 `context.event` 可以获得导致变更的事件
   */
  onChange?: (value: V, context: any) => void;
}

export interface CheckProps extends StyledProps {
  /**
   * 选框的名称，对于 `Group` 等管理时必传
   */
  name?: string;

  /**
   * 选中状态
   */
  checked?: boolean;

  /**
   * 默认选中状态
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * 点击回调函数
   */
  onChange?: (checked: boolean, context: any) => void;

  /**
   * 是否为单选
   * @default false
   */
  radio?: boolean;

  /**
   * 是否可用
   * @default false
   */
  disabled?: boolean;

  /**
   * 选框样式
   * @default "default"
   */
  type?: 'default' | 'square' | 'button' | 'agreement' | 'item';

  /**
   * 是否显示为块级元素
   * @default false
   */
  block?: boolean;

  /**
   * 选中状态颜色
   * @default "#006EFF"
   */
  color?: string;

  /**
   * 选框中内容
   */
  children?: React.ReactNode;

  /**
   * 点击时触发
   */
  onClick?: (event: any) => void;
}

export interface CheckInstance {
  trigger: (event: any) => void;
}
