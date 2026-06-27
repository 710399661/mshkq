/// <reference types="react" />
import { RowProps, ColProps } from '../interface';
export declare function Row({ gutter, flexWrap, reverse, align, justify, children, className, style, }: RowProps): JSX.Element;
export declare function Col({ children, className, offset, order, flex: flexStyle, span, style }: ColProps): JSX.Element;
export declare const FlexMiniLayout: {
    Row: typeof Row;
    Col: typeof Col;
};
