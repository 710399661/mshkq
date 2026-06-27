import React, { Component } from 'react';
import { MiniTextareaProps } from '../interface';
interface TextareaState {
    isActive: boolean;
}
export declare class MiniLayout extends Component<MiniTextareaProps, TextareaState> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    constructor(props: MiniTextareaProps);
    onInput(event: any): void;
    onFocus(event: React.FocusEvent): void;
    onBlur(event: any): void;
    render(): JSX.Element;
}
export {};
