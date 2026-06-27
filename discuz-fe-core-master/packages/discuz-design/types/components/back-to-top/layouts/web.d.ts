import React from 'react';
import { BackToTopProps } from '../interface';
interface BackToTopState {
    displayState: boolean;
}
export declare class BackToTopWebLayout extends React.Component<BackToTopProps, BackToTopState> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    constructor(props: any);
    get WindowYPosition(): number;
    handleScroll: (...args: any[]) => void;
    smoothScrollToTop: () => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
