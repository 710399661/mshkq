import React, { Component } from 'react';
import { StateInterface, PropsInterface } from '../../interface';
export declare class WebLayout extends Component<PropsInterface, StateInterface> {
    static contextType: React.Context<import("../../../../extends/configContext").Config>;
    private nativeRecorder;
    private recorder;
    private intervalId;
    private needToUpload;
    private needToCancel;
    private isWechat;
    constructor(props: PropsInterface);
    componentDidMount(): Promise<void>;
    startRecord(): Promise<void>;
    stopRecord(): void;
    cancelRecord(): void;
    resetRecord(): void;
    uploadRecord(): void;
    onRecordStart(): void;
    render(): JSX.Element;
}
