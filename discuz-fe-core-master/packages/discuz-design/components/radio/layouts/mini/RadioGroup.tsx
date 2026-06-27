import React from 'react';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import { noop } from '../../../../utils/noop';
import { useDefault } from '../../../../utils/hooks/useDefault';
import { CheckContext, CheckContextValue } from '../../../check/layouts/mini';
import { RadioGroupProps } from '../../interface';

export function RadioGroup({
  value: checkValue,
  defaultValue: defaultCheckValue,
  onChange: onCheckValueChange = noop,
  disabled = false,
  type,
  block,
  className,
  style,
  children,
}: RadioGroupProps) {
  const [value, onChange] = useDefault(checkValue, defaultCheckValue, onCheckValueChange);

  const context: CheckContextValue = {
    inject: (checkProps) => {
      // 只为 radio 提供
      if (!checkProps.radio) {
        return checkProps;
      }

      // 如果已经受控，则不注入
      if (typeof checkProps.checked === 'boolean') {
        return checkProps;
      }

      const checkName = checkProps.name;
      if (typeof checkName === 'undefined') {
        console.warn('<Radio> managed by <RadioGroup> must include the "name" prop');
        return checkProps;
      }

      return {
        ...checkProps,
        type,
        block,
        checked: value === checkProps.name,
        disabled: checkProps.disabled || disabled,
        onChange(checked, context) {
          if (typeof checkProps.onChange === 'function') {
            checkProps.onChange(checked, context);
            return;
          }
          if (typeof onChange === 'function') {
            onChange(checkName, context);
          }
        },
      };
    },
  };

  return (
    <View
      className={classNames('tea-checkbox-group', className, {
        'tea-checkbox-group--outline': type === 'button',
      })}
      style={style}
    >
      <CheckContext.Provider value={context}>{children}</CheckContext.Provider>
    </View>
  );
}
