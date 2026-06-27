/**
 * 基于 Video.js 的封装
 * https://docs.videojs.com/index.html
 *
 * 使用默认样式
 */
import React from 'react';
import { VideoWebProps, VideoState } from '../../interface';
export declare class WebLayout extends React.Component<VideoWebProps, VideoState> {
    static contextType: React.Context<import("../../../../extends/configContext").Config>;
    player: any;
    videoNode: HTMLVideoElement;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
