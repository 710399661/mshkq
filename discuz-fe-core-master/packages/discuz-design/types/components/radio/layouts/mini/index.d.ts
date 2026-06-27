import React from 'react';
import { CheckProps, CheckInstance } from '../../../check/interface';
import { RadioGroup } from './RadioGroup';
/**
 * Radio 组件所接收的参数
 */
export interface RadioProps extends Omit<CheckProps, 'radio' | 'type'> {
}
export declare const RadioMiniLayout: React.FunctionComponent<RadioProps & React.RefAttributes<CheckInstance>> & {
    Group: typeof RadioGroup;
};
