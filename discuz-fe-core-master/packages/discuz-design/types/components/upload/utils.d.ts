import { UploadFile } from './interface';
import * as React from 'react';
export declare function useForceUpdate(): React.DispatchWithoutAction;
export declare function fileToObject(file: any): UploadFile;
export declare const isImageFileType: (type: string) => boolean;
export declare const isImageUrl: (file: UploadFile) => boolean;
