import React from 'react';
import { forwardRefWithStatics } from '../../../../utils/forward-ref-with-statics';
import { CheckboxGroup } from './CheckboxGroup';
import Check from '../../../check/index';
import { CheckboxProps } from '../../interface';
import { CheckInstance } from '../../../check/interface';

export const CheckboxWebLayout = forwardRefWithStatics(
  (props: CheckboxProps, ref: React.MutableRefObject<CheckInstance>) => <Check ref={ref} {...props} />,
  // statics
  {
    Group: CheckboxGroup,
  },
);

