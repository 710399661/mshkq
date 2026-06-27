import React from 'react';
import { CheckboxGroup } from './CheckboxGroup';
import { CheckboxProps } from '../../interface';
import { CheckInstance } from '../../../check/interface';
export declare const CheckboxMiniLayout: React.FunctionComponent<CheckboxProps & React.RefAttributes<CheckInstance>> & {
    Group: typeof CheckboxGroup;
};
