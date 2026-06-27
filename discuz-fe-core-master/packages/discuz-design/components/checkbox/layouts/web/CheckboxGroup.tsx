import React from 'react';
import classNames from 'classnames';
import { noop } from '../../../../utils/noop';
import { useDefault } from '../../../../utils/hooks/useDefault';
import { CheckContext, CheckContextValue } from '../../../check/layouts/web';
import { CheckboxGroupProps } from '../../interface';
import { useReport } from '../../../../utils/report';

export function CheckboxGroup({
  value: checkValue,
  defaultValue: defaultCheckValue = [],
  onChange: onCheckValueChange = noop,
  disabled = false,
  type,
  block,
  className,
  style,
  children,
}: CheckboxGroupProps) {
  const [value, onChange] = useDefault(checkValue, defaultCheckValue, onCheckValueChange);

  const checkedSet = new Set(value || []);

  useReport({
    componentName: 'checkboxGroup'
  });

  const context: CheckContextValue = {
    inject: (checkProps) => {
      // 只为 checkbox 提供
      if (checkProps.radio) {
        return checkProps;
      }

      // 如果已经受控，则不注入
      if (typeof checkProps.checked === 'boolean') {
        return checkProps;
      }

      const checkName = checkProps.name;
      if (typeof checkName === 'undefined') {
        console.warn('<Checkbox> managed by <CheckboxGroup> must include the "name" prop');
        return checkProps;
      }

      return {
        ...checkProps,
        type,
        block,
        checked: checkedSet.has(checkName),
        disabled: checkProps.disabled || disabled,
        onChange(checked, context) {
          // 支持 checkbox 上的 onChange 处理时阻止默认的处理行为
          if (typeof checkProps.onChange === 'function') {
            checkProps.onChange(checked, context);
            return;
          }
          if (typeof onChange === 'function') {
            const newValue = checked ? [...value, checkName] : (checkedSet.delete(checkName), Array.from(checkedSet));
            onChange(newValue, context);
          }
        },
      };
    },
  };

  return (
    <div
      className={classNames('tea-checkbox-group', className, {
        'tea-checkbox-group--outline': type === 'button',
      })}
      style={style}
    >
      <CheckContext.Provider value={context}>{children}</CheckContext.Provider>
    </div>
  );
}

