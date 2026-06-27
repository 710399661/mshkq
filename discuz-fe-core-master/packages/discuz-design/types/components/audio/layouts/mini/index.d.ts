import React, { Component } from 'react';
import { StateInterface, AudioProps } from '../../interface';
export declare class AudioMiniLayout extends Component<AudioProps, StateInterface> {
    static contextType: React.Context<import("../../../../extends/configContext").Config>;
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    setAudioImg(newImg: string): void;
    playOrStopAudio: () => void;
    audioTime: () => string;
    renderAudioIcon: () => JSX.Element;
    renderContent: () => JSX.Element;
    renderText: () => JSX.Element;
    render(): JSX.Element;
}
