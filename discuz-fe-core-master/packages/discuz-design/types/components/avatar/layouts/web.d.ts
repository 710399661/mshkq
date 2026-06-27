import React from 'react';
import { AvatarProps } from '../interface';
export declare class AvatarWebLayout extends React.Component<AvatarProps> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    constructor(props: any);
    handleImgError: () => void;
    handleOnLoad: () => void;
    render(): JSX.Element;
}
