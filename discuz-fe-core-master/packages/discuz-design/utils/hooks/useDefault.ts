import { useState, useRef } from 'react';
import { noop } from '../noop';

export interface ChangeHandler<T, P extends any[]> {
  (value: T, ...args: P);
}

export function useDefault<T, P extends any[]>(
  value: T,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
): [T, ChangeHandler<T, P>] {
  const isControlledRef = useRef<boolean>(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  // 受控模式
  if (isControlledRef.current || typeof value !== 'undefined') {
    isControlledRef.current = true;
    return [value, onChange || noop];
  }

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      setInternalValue(newValue);
      if (typeof onChange === 'function') {
        onChange(newValue, ...args);
      }
    },
  ];
}

/**
 * 可直接接管 props 中 `value`，`defaultValue` 及 `onChange` 受控属性
 */
export function useDefaultValue<T, P>(
  props: P,
  defaultDefaultValue?: T,
) {
  type ReturnType = Omit<P, 'defaultValue'>;
  // @ts-ignore
  const { defaultValue, value, onChange = noop, ...restProps } = props;

  const [finalValue, finalOnChange] = useDefault(
    value,
    typeof defaultValue === 'undefined' ? defaultDefaultValue : defaultValue,
    onChange,
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    value: finalValue,
    onChange: finalOnChange,
    ...restProps,
  } as ReturnType;
}
