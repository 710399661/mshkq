import React, { Component } from 'react';
import { WebInputProps } from '../interface';
interface InputState {
    type: string;
    isFocus: boolean;
}
export declare class WebLayout extends Component<WebInputProps, InputState> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    oldValue: string;
    constructor(props: WebInputProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    onIconClick(event: any): void;
    onPrefixIconClick(event: any): void;
    onClick(event: any): void;
    onInput(event: any): void;
    onFocus(event: React.FocusEvent): void;
    onBlur(event: any): void;
    onKeyDown(event: React.KeyboardEvent): void;
    onClearable(event: any): void;
    onPassword(): void;
    render(): JSX.Element;
}
export {};
