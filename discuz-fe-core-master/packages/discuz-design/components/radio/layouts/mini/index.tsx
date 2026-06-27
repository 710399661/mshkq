import React from 'react';
import { forwardRefWithStatics } from '../../../../utils/forward-ref-with-statics';
import { CheckProps, CheckInstance } from '../../../check/interface';
import Check from '../../../check/index';
import { RadioGroup } from './RadioGroup';

/**
 * Radio 组件所接收的参数
 */
export interface RadioProps extends Omit<CheckProps, 'radio' | 'type'> {}

export const RadioMiniLayout = forwardRefWithStatics(
  (props: RadioProps, ref: React.MutableRefObject<CheckInstance>) => <Check ref={ref} radio {...props} />,
  // statics
  {
    Group: RadioGroup,
  },
);
