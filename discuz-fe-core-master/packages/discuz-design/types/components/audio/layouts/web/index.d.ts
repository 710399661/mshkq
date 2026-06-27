import React, { Component } from 'react';
import { StateInterface, AudioProps } from '../../interface';
export declare class AudioWebLayout extends Component<AudioProps, StateInterface> {
    static contextType: React.Context<import("../../../../extends/configContext").Config>;
    constructor(props: any);
    componentDidMount(): void;
    eventListenerPlayImpl: (target: any) => void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    setAudioImg(newImg: string): void;
    playOrStopAudio: () => void;
    audioMount: (audioCtx: any) => void;
    audioTime: () => string;
    renderAudioIcon: () => JSX.Element;
    renderContent: () => JSX.Element;
    renderText: () => JSX.Element;
    render(): JSX.Element;
}
