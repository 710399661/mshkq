import React from 'react';
import { RadioViewAdapter } from './layouts/index';
import { RadioProps, RadioGroupProps } from './interface';

export default RadioViewAdapter() as React.FC<RadioProps> & { Group?: React.FC<RadioGroupProps> };
