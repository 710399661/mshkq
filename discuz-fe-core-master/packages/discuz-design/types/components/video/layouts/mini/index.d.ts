/**
 * 目前全部都是 taro 封装好的小程序的 video
 *
 * 使用默认样式
 */
import React from 'react';
import { VideoProps } from '../../interface';
export declare class MiniLayout extends React.Component<VideoProps> {
    static contextType: React.Context<import("../../../../extends/configContext").Config>;
    videoNode: any;
    videoId: string;
    player: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handlePlay: (e: any) => void;
    handlePause: (e: any) => void;
    handleEnded: (e: any) => void;
    handleError: (e: any) => void;
    handleTimeUpdate: (e: any) => void;
    handleFullscreenChange: (e: any) => void;
    handleProgress: (e: any) => void;
    handleLoadedMetaData: (e: any) => void;
    handleWaiting: (e: any) => void;
    render(): JSX.Element;
}
