import { CheckProps } from '../check/interface';
import { StyledProps } from 'utils/_type/StyledProps';

export interface RadioProps extends Omit<CheckProps, 'radio' | 'type'> {}

export interface CheckInstance {
  trigger: (event: any) => void;
}

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

export interface RadioGroupProps extends ControlledProps<string>, Pick<CheckProps, 'block'>, StyledProps {
  /**
   * 禁用组件
   * @default false
   * */
  disabled?: boolean;

  /**
   * 单选框类型
   *
   * - `"default"` 默认样式
   * - `"button"` 按钮样式
   * @default "default"
   */
  type?: 'default' | 'button' | 'item';

  /**
   * 单选框内容
   */
  children?: React.ReactNode;
}
