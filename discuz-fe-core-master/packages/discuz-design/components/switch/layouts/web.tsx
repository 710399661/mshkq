import React from 'react';
import classnames from 'classnames';
import { SwitchProps } from '../interface';
import { useConfig } from '../../../extends/configContext';
import { useDefault } from '../../../utils/hooks/useDefault';
import { noop } from '../../../utils/noop';

export const SwitchWebLayout = ({
  checked,
  defaultChecked,
  onChange: onCheckedChange = noop,
  disabled,
  loading,
  size,
  color,
  className,
  style = {},
}: SwitchProps) => {
  const { clsPrefix } = useConfig();

  const [value, onChange] = useDefault(
    checked,
    defaultChecked,
    onCheckedChange,
  );

  return (
    <div
      style={{
        width: `${size + 26}px`,
        height: `${size}px`,
        borderRadius: `${size / 2}px`,
        backgroundColor: !disabled && value && color && `${color}`,
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
      className={classnames(`${clsPrefix}-switch`, className, {
        'is-checked': value,
        'is-disabled': disabled,
      })}
      onClick={(event) => {
        if (disabled) return;
        onChange(!value, { event });
      }}
    >
      <div
        className={classnames(`${clsPrefix}-switch__toggle`, {
          'is-loading': loading,
          'is-disabled': disabled,
        })}
        style={{ width: `${size - 10}px`, height: `${size - 10}px` }}
      />
    </div>
  );
};
