import React from 'react';
import { CheckboxViewAdapter } from './layouts/index';
import { CheckboxProps, CheckboxGroupProps } from './interface';

export default CheckboxViewAdapter() as React.FC<CheckboxProps> & { Group?: React.FC<CheckboxGroupProps> };
