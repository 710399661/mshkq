import React from 'react';
import { WebPickerWrapperProps } from '../../interface';
export default class PickerWrapper extends React.PureComponent<WebPickerWrapperProps> {
    static defaultProps: {
        wrapperKey: string;
        height: number;
        data: any[];
    };
    static contextType: React.Context<import("../../../../extends/configContext").Config>;
    private wrapper;
    private wheelScroll;
    private BScrollObj;
    private currIndex;
    constructor(props: any);
    componentDidUpdate(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    resetBScrollConfig(): any;
    getWrapper(div: any): void;
    getWheelScroll(div: any): void;
    touchEnd(): void;
    touchStart(): void;
    removeActiveItem(): void;
    addActiveItem(): void;
    renderItem(): Array<any>;
    render(): JSX.Element;
}
