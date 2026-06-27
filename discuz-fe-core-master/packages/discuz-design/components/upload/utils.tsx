import { UploadFile } from './interface';
import * as React from 'react';

export function useForceUpdate() {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  return forceUpdate;
}

export function fileToObject(file): UploadFile {
  return {
    ...file,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file,
  };
}

const extname = (url = '') => {
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

export const isImageFileType = (type: string): boolean => typeof type === 'string' && type?.indexOf('image') === 0;

export const isImageUrl = (file: UploadFile): boolean => {
  if (file.type && !file.thumbUrl) {
    return isImageFileType(file.type);
  }
  const url: string = (file.thumbUrl || file.url) as string;
  const extension = extname(url);
  if (
    /^data:image\//.test(url)
    || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true;
  }
  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }
  if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};
