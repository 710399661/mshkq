import React, { Component } from 'react';
import { MiniInputProps } from '../interface';
interface InputState {
    type: string;
    isFocus: boolean;
}
export declare class MiniLayout extends Component<MiniInputProps, InputState> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    constructor(props: MiniInputProps);
    onIconClick(event: any): void;
    onPrefixIconClick(event: any): void;
    onClick(event: any): void;
    onInput(event: any): void;
    onFocus(event: any): void;
    onBlur(event: any): void;
    onClearable(event: any): void;
    onPassword(): void;
    render(): JSX.Element;
}
export {};
