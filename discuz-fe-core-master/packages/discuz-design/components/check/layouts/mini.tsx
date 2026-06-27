import React, { useContext, useImperativeHandle, forwardRef } from "react";
import classNames from "classnames";
import { ITouchEvent, View } from "@tarojs/components";
import Icon from "../../icon";
import { callBoth } from "../../../utils/call-both";
import { useDefault } from "../../../utils/hooks/useDefault";
import { useConfig } from "../../../extends/configContext";
import { CheckProps, CheckInstance } from "../interface";

/**
 * Check 组件支持使用 CheckContext 进行状态托管
 */
export const CheckContext = React.createContext<CheckContextValue>(null);

/**
 * 托管 Check 组件的状态，请提供 inject() 方法注入托管好的 props
 */
export interface CheckContextValue {
  inject: (props: CheckProps) => CheckProps;
}

export const CheckMiniLayout = forwardRef(
  (
    { ...restProps }: CheckProps,
    ref: React.MutableRefObject<CheckInstance>
  ) => {
    const { clsPrefix } = useConfig();

    // 支持从 Context 注入
    const context = useContext(CheckContext);
    let props = restProps;
    if (context) {
      props = context.inject(restProps);
    }

    const {
      defaultChecked = false,
      checked,
      onChange: onCheckedChange,
      radio,
      children,
      disabled = false,
      block,
      type,
      onClick,
      className,
      style,
      ...htmlProps
    } = props;

    const [value, onChange] = useDefault(
      checked,
      defaultChecked,
      onCheckedChange
    );

    useImperativeHandle(
      ref,
      () => ({
        trigger: (event) => {
          if (disabled) {
            return;
          }
          onChange(!value, { event });
        },
      }),
      [onChange, value, disabled]
    );

    return (
      <View
        className={classNames(`${clsPrefix}-checkbox-wrap`, className, {
          "is-checked": value,
          "is-disabled": disabled,
          [`${clsPrefix}-checkbox__wrap--block`]: block,
          [`${clsPrefix}-checkbox__wrap--agreement`]: type === "agreement",
          [`${clsPrefix}-checkbox__wrap--outline`]: type === "button",
          [`${clsPrefix}-checkbox__wrap--item`]: type === "item",
        })}
        style={style}
        onClick={callBoth(onClick, (event) => {
          event.stopPropagation();
          if (disabled) {
            return;
          }
          onChange(!value, { event });
        })}
        {...htmlProps}
      >
        {type !== "button" && type !== "item" && (
          <View
            className={classNames(`${clsPrefix}-checkbox`, {
              [`${clsPrefix}-checkbox--square`]:
                type === "square" || type === "agreement",
              [`${clsPrefix}-checkbox--radio`]: radio,
            })}
          >
            {value && (
              <Icon
                name="CheckOutlined"
                className={classNames(`${clsPrefix}-checkbox__icon`, {
                  "is-disabled": disabled,
                })}
                size={type === "agreement" ? 16 : 12}
              />
            )}
          </View>
        )}
        <View
          className={classNames(`${clsPrefix}-checkbox__label`, {
            "is-disabled": disabled,
            "is-checked": value,
          })}
        >
          {children}
        </View>
        {type === "item" && (
          <View
            className={classNames(
              `${clsPrefix}-checkbox`,
              `${clsPrefix}-checkbox--item`,
              {
                [`${clsPrefix}-checkbox--radio`]: radio,
              }
            )}
          >
            {value && (
              <Icon
                name="CheckOutlined"
                className={classNames(`${clsPrefix}-checkbox__icon`, {
                  "is-disabled": disabled,
                })}
                size={12}
              />
            )}
          </View>
        )}
      </View>
    );
  }
);
