import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import ViewerJS from 'viewerjs';
import { ImagePreviewerProps, ImagePreviewerRef } from '../interface';
import { Combine } from '../../../utils/_type/util';

class ViewerInstance {
  instance: any = {};
  rootRef = null;
  activeInstance = null;
  onCloseImpl = () => {};

  constructor() {
    // not ssr
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      const viewerDom = document.createElement('div');
      viewerDom.classList.add('viewer-root-element');
      this.rootRef = viewerDom;
      this.instance = new ViewerJS(viewerDom, {
        hide: () => {
          this.onCloseImpl();
        },
      });
      const bodyDom = document.getElementsByTagName('body')[0];
      bodyDom.appendChild(viewerDom);
    }
  }

  hideCommand() {
    if (this.instance) {
      this.instance.hide();
    }
  }

  hide(target) {
    if (target !== this.activeInstance) return;
    this.hideCommand();
  }

  show(index) {
    if (this.instance.view) {
      this.instance.view(index);
    }
  }

  destroy() {
    if (this.instance.destroy) {
      this.instance.destroy();
    }
  }

  createImgElement(src) {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      const dupImg = new Image();
      dupImg.src = src;
      dupImg.setAttribute('style', 'display: none');
      return dupImg;
    }
  }

  setImgs(imgsWrapperDomRef: HTMLDivElement) {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      // 如果当前元素和目前active元素一致，复用 dom
      const imgsDom = imgsWrapperDomRef.getElementsByTagName('img');
      const frag = document.createDocumentFragment();
      this.rootRef.innerHTML = '';
      Array.from(imgsDom).forEach((element) => {
        const clonedElement = element.cloneNode();
        (clonedElement as any).setAttribute('style', 'display: none');
        frag.appendChild(clonedElement);
      });
      this.rootRef.appendChild(frag);
      this.instance.update();
    }
  }

  registerOnClose(callback = () => {}) {
    this.onCloseImpl = callback;
  }
}

const viewerInstanceSingleton = new ViewerInstance();

export const WebLayout = forwardRef<
  ImagePreviewerRef,
  Combine<
    ImagePreviewerProps,
    {
      imgs: string[];
      currentUrl: string;
    }
  >
>(({ imgs = [], currentUrl = '', visible, onClose = () => {} }, ref) => {
  const viewerDomRef = React.useRef(null);
  const currentImgIndex = React.useRef(0);

  const show = useCallback(() => {
    if (viewerInstanceSingleton && viewerInstanceSingleton.show) {
      viewerInstanceSingleton.registerOnClose(onClose);
      if (viewerDomRef.current) {
        viewerInstanceSingleton.setImgs(viewerDomRef.current);
        viewerInstanceSingleton.show(currentImgIndex.current);
      }
      viewerInstanceSingleton.activeInstance = viewerDomRef.current;
    }
  }, [imgs, onClose]);

  const hide = useCallback(() => {
    if (viewerInstanceSingleton && viewerInstanceSingleton.hide) {
      viewerInstanceSingleton.hide(viewerDomRef.current);
    }
  }, []);

  useImperativeHandle(ref, () => ({ show, hide }), [show, hide]);

  useEffect(() => {
    if (viewerInstanceSingleton) {
      if (visible) {
        show();
      } else {
        viewerInstanceSingleton.hide(viewerDomRef.current);
      }
    }
  }, [visible]);

  useEffect(() => {
    let currentIndex = imgs.indexOf(currentUrl);

    if (currentIndex === -1) currentIndex = 0;

    currentImgIndex.current = currentIndex;
  }, [currentUrl, imgs]);

  return (
    <div
      ref={viewerDomRef}
      style={{
        display: 'none',
      }}
    >
      {imgs.map((imgUrl, idx) => (
        <img alt="图片" key={idx} src={imgUrl} />
      ))}
    </div>
  );
});

// 隐藏 viewer 实例
export const hideInstance = () => {
  viewerInstanceSingleton.hideCommand();
};
