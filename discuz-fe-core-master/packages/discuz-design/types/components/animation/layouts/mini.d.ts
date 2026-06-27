import React from 'react';
import { AnimationProps } from '../interface';
export declare class AnimationMiniLayout extends React.Component<AnimationProps> {
    state: {
        isExist: boolean;
    };
    onEnd: (e: any) => void;
    render(): JSX.Element;
}
