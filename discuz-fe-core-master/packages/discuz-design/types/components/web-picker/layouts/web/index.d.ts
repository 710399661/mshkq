import React from 'react';
import { WebPickerProps } from '../../interface';
export declare class WebLayout extends React.Component<WebPickerProps> {
    static defaultProps: {
        className: string;
        height: number;
        style: {};
        pickerData: any[];
    };
    static contextType: React.Context<import("../../../../extends/configContext").Config>;
    private BScrollList;
    constructor(props: any);
    shouldComponentUpdate(nextProps: any): boolean;
    componentDidMount(): void;
    initBScrollCallback(key: any, BScrollObj: any): void;
    renderPickerWrapper(): Array<any>;
    render(): JSX.Element;
}
