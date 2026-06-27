import React, { Component } from 'react';
import { StateInterface, PropsInterface } from '../../interface';
export declare class MiniLayout extends Component<PropsInterface, StateInterface> {
    static contextType: React.Context<import("../../../../extends/configContext").Config>;
    private recorderManager;
    private intervalId;
    private needToUpload;
    private needToCancel;
    constructor(props: PropsInterface);
    startRecord(): void;
    stopRecord(): void;
    cancelRecord(): void;
    resetRecord(): void;
    uploadRecord(): void;
    onRecordStart(): void;
    render(): JSX.Element;
}
