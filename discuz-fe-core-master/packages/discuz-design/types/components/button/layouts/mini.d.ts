import React, { Component } from 'react';
import { MiniButtonProps } from '../interface';
export declare class ButtonMiniLayout extends Component<MiniButtonProps> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    onClick(event: any): void;
    onGetUserInfo(event: any): void;
    onContact(event: any): void;
    onGetPhoneNumber(event: any): void;
    onError(event: any): void;
    onOpenSetting(event: any): void;
    render(): JSX.Element;
}
