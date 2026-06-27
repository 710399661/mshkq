import React, { forwardRef, useEffect, useState } from 'react';
import getRenderComponent from './layouts';
import getAdapterHooks from './adapters';
import { ImagePreviewerProps, ImagePreviewerRef } from './interface';

const RenderComponent = getRenderComponent();
const useAdapter = getAdapterHooks();

const ImagePreviewer = forwardRef<ImagePreviewerRef, ImagePreviewerProps>(({ imgUrls = [], visible = false, current = '', onClose = () => {}, ...props }, ref) => (
    <RenderComponent ref={ref} imgs={imgUrls} visible={visible} currentUrl={current} onClose={onClose} {...props} />
));

export default ImagePreviewer;
