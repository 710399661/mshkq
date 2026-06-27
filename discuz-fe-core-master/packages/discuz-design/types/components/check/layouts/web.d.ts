import React from 'react';
import { CheckProps, CheckInstance } from '../interface';
/**
 * Check 组件支持使用 CheckContext 进行状态托管
 */
export declare const CheckContext: React.Context<CheckContextValue>;
/**
 * 托管 Check 组件的状态，请提供 inject() 方法注入托管好的 props
 */
export interface CheckContextValue {
    inject: (props: CheckProps) => CheckProps;
}
export declare const CheckWebLayout: React.ForwardRefExoticComponent<CheckProps & React.RefAttributes<CheckInstance>>;
