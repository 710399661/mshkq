/**
 * Video 组件入口文件
 * 注意：多视频播放互斥问题
 */
import React from 'react';
import { VideoWebProps, VideoState } from './interface';
interface VideoAdapter {
}
interface VideoLayoutProps {
}
declare const Video_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<VideoLayoutProps, any>;
        };
        logicalAdapter: VideoAdapter;
        readonly RenderComponent: React.ComponentClass<VideoLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: VideoAdapter;
        context: any;
        setState<K extends never>(state: VideoState | ((prevState: Readonly<VideoState>, props: Readonly<VideoWebProps>) => VideoState | Pick<VideoState, K>) | Pick<VideoState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<VideoWebProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<VideoState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<VideoWebProps>, nextState: Readonly<VideoState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<VideoWebProps>, prevState: Readonly<VideoState>): any;
        componentDidUpdate?(prevProps: Readonly<VideoWebProps>, prevState: Readonly<VideoState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<VideoWebProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<VideoWebProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<VideoWebProps>, nextState: Readonly<VideoState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<VideoWebProps>, nextState: Readonly<VideoState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Video extends Video_base {
    constructor(props: any);
    /**
     * 属性默认值
     */
    static defaultProps: {
        controls: boolean;
        autoplay: boolean;
        loop: boolean;
        muted: boolean;
        initialTime: number;
        onReady: () => void;
        onPlay: () => void;
        onPause: () => void;
        onEnded: () => void;
        onError: () => void;
        onTimeUpdate: () => void;
        onFullscreenChange: () => void;
        onProgress: () => void;
        onLoadedMetaData: () => void;
        onWaiting: () => void;
        singleton: boolean;
    };
    render(): JSX.Element;
}
export {};
