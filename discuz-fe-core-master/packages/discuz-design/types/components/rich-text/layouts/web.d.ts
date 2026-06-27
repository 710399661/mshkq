import React, { Component } from 'react';
import { RichTextLayoutProps } from '../index';
export declare class RichTextWebLayout extends Component<RichTextLayoutProps> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    id: any;
    ref: any;
    parseCodeBlock(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
