import React from 'react';
import { ImagePreviewerProps, ImagePreviewerRef } from '../interface';
export declare const MiniLayout: React.ForwardRefExoticComponent<ImagePreviewerProps & {
    imgs: string[];
    currentUrl: string;
} & React.RefAttributes<ImagePreviewerRef>>;
