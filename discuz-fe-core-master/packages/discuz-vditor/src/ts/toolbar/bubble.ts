/**
 * 当选中文本之后的 气泡工具栏
 */

import { Toolbar } from "./";

const className = 'vditor-bubble-toolbar';
export class BubbleToolbar extends Toolbar {
  bubbleBottomDom: HTMLElement;
  bubbelTopDom: HTMLElement;
  constructor(vditor: IVditor) {
    super(vditor);
    // 初始化 dom
    this.element = this.createDocument('div', '', { className });
    this.init(vditor);
  }

  createDocument(type = 'div', content = '', props: any = {}) {
    const doc:any = document.createElement(type);
    doc.textContent = content;
    Object.keys(props).forEach((key) => {
      doc[key] = props[key];
    });
    return doc;
  }

  init(vditor: IVditor) {
    vditor.options.bubbleToolbar.forEach((item: IMenuItem, i: number) => {
      const itemElem = this.genItem(vditor, item, i);
      this.element.appendChild(itemElem);
    });
    this.bubbleBottomDom = this.createDocument('div', '', { className: `${className}__bottom` });
    this.bubbelTopDom = this.createDocument('div', '', { className: `${className}__top` });
    this.element.appendChild(this.bubbleBottomDom);
    this.element.appendChild(this.bubbelTopDom);
    this.hide();
  }

  hide() {
    if (this.element.style.display !== 'none') {
      this.element.style.display = 'none';
    }
  }

  show(vditor: IVditor) {
    if (this.element.style.display !== 'flex') {
      this.element.style.display = 'flex';
      try {
        const vditorElementRect = vditor.element.getBoundingClientRect();
        const rects = window.getSelection().getRangeAt(0).getClientRects();
        const bubbleDomRect = this.element.getBoundingClientRect();
        const selectedPosition = rects[0];
        const gap =  selectedPosition.y - vditorElementRect.y;

        let curTop = selectedPosition.top - bubbleDomRect.height - 10 - vditorElementRect.y;
        const curLeft = (selectedPosition.width - bubbleDomRect.width) / 2 + selectedPosition.left - vditorElementRect.x;

        if (gap < bubbleDomRect.height * 2) {
          curTop = selectedPosition.top + bubbleDomRect.height - vditorElementRect.y;
          this.bubbleBottomDom.style.display = 'none';
          this.bubbelTopDom.style.display = 'block';
          this.bubbelTopDom.style.top = '-8px';
          this.bubbelTopDom.style.left = `${bubbleDomRect.width / 2 - 4}px`;
        } else {
          this.bubbelTopDom.style.display = 'none';
          this.bubbleBottomDom.style.display = 'block';
          this.bubbleBottomDom.style.top = `${bubbleDomRect.height}px`;
          this.bubbleBottomDom.style.left = `${bubbleDomRect.width / 2 - 4}px`;
        }
        this.element.style.top = `${curTop}px`;
        this.element.style.left = curLeft > 0 ? `${curLeft}px` : '0px';
      } catch (error) {
        console.error(error);
      }
    }
  }
};
