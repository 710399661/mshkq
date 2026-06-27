import React from 'react';
import { WebPickerProps, MiniPickerProps } from './interface';
interface PickerState {
}
interface PickerProps extends WebPickerProps, MiniPickerProps {
}
export interface PickerLayoutProps {
}
interface PickerAdapter {
}
declare const Picker_base: {
    new (props: any): {
        viewAdapter: {
            component: React.ComponentClass<PickerLayoutProps, any>;
        };
        logicalAdapter: PickerAdapter;
        readonly RenderComponent: React.ComponentClass<PickerLayoutProps, any>;
        readonly defaultViewAdapter: {
            component: any;
        };
        readonly adapter: PickerAdapter;
        context: any;
        setState<K extends never>(state: PickerState | ((prevState: Readonly<PickerState>, props: Readonly<PickerProps>) => PickerState | Pick<PickerState, K>) | Pick<PickerState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(): React.ReactNode;
        readonly props: Readonly<PickerProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<PickerState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<PickerProps>, nextState: Readonly<PickerState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<PickerProps>, prevState: Readonly<PickerState>): any;
        componentDidUpdate?(prevProps: Readonly<PickerProps>, prevState: Readonly<PickerState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<PickerProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<PickerProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<PickerProps>, nextState: Readonly<PickerState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<PickerProps>, nextState: Readonly<PickerState>, nextContext: any): void;
    };
    readonly clsPrefix: "dzq";
    readonly defaultLogicalAdapter: {};
    contextType?: React.Context<any>;
};
declare class Picker extends Picker_base {
    render(): JSX.Element;
}
export default Picker;
