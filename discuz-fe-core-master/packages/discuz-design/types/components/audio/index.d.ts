import React from 'react';
import { StateInterface, AudioProps } from './interface';
interface AudioLayoutProps {
}
interface AudioAdapter {
}
declare const Audio_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<AudioLayoutProps, any>;
        };
        logicalAdapter: AudioAdapter;
        readonly RenderComponent: React.ComponentClass<AudioLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: AudioAdapter;
        context: any;
        setState<K extends "duration" | "audioCtx" | "audioImg" | "currentTime" | "childrenRef">(state: StateInterface | ((prevState: Readonly<StateInterface>, props: Readonly<AudioProps>) => StateInterface | Pick<StateInterface, K>) | Pick<StateInterface, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<AudioProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<StateInterface>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<AudioProps>, nextState: Readonly<StateInterface>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<AudioProps>, prevState: Readonly<StateInterface>): any;
        componentDidUpdate?(prevProps: Readonly<AudioProps>, prevState: Readonly<StateInterface>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<AudioProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<AudioProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<AudioProps>, nextState: Readonly<StateInterface>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<AudioProps>, nextState: Readonly<StateInterface>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
export default class Audio extends Audio_base {
    static defaultProps: {
        onError: () => void;
        onPlay: () => void;
        onPause: () => void;
        onEnded: () => void;
        onRef: () => void;
        loop: boolean;
        singleton: boolean;
    };
    setChildrenRef: (ref: any) => void;
    getState: () => any;
    render(): JSX.Element;
}
export {};
