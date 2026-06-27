import React from 'react';
import { ImagePreviewerProps, ImagePreviewerRef } from '../interface';
export declare const WebLayout: React.ForwardRefExoticComponent<ImagePreviewerProps & {
    imgs: string[];
    currentUrl: string;
} & React.RefAttributes<ImagePreviewerRef>>;
export declare const hideInstance: () => void;
