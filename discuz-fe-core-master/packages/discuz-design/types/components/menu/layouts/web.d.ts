import React, { Component } from 'react';
import { MenuProps } from '../interface';
export declare class MenuWebLayout extends Component<MenuProps> {
    static contextType: React.Context<import("../../../extends/configContext").Config>;
    constructor(props: any);
    setHoverSubMenuIndex(index: any): void;
    setCurrentActiveSubMenuIndex(index: any): void;
    setCurrentActiveItemIndex(index: any): void;
    setCurrentActiveItemIndexSet(currentActiveItemIndexSet: any): void;
    setCurrentActiveSubMenuIndexSet(currentActiveSubMenuIndexSet: any): void;
    render(): JSX.Element;
}
