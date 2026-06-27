import React, { Component } from 'react';
import { WebTextareaProps } from '../interface';
interface TextareaState {
    isActive: boolean;
}
export declare class WebLayout extends Component<WebTextareaProps, TextareaState> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    constructor(props: WebTextareaProps);
    onInput(event: any): void;
    onFocus(event: React.FocusEvent): void;
    onBlur(event: any): void;
    render(): JSX.Element;
}
export {};
