import React from 'react';
import { RowProps, ColProps } from './interface';
import { FlexViewAdapter } from './layouts/index';

export default FlexViewAdapter() as { Row: React.FC<RowProps>; Col: React.FC<ColProps> };
