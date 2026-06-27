import React, { Component } from 'react';
import { WebButtonProps } from '../interface';
interface WebButtonState {
    isMouseDown: boolean;
    isMouseEnter: boolean;
}
export declare class ButtonWebLayout extends Component<WebButtonProps, WebButtonState> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    constructor(props: any);
    onClick(e: any): void;
    onMouseLeave(e: any): void;
    onMouseEnter(e: any): void;
    onMouseDown(e: any): void;
    onMouseUp(e: any): void;
    render(): JSX.Element;
}
export {};
