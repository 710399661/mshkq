import React, { forwardRef, useEffect, useMemo, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const isNoSSR = () => typeof document !== 'undefined';

export function getAttach(attach) {
  let parent;
  if (typeof attach === 'string' && attach && isNoSSR()) {
    parent = document.querySelector(attach);
  }
  if (typeof attach === 'function') {
    parent = attach();
  }
  if (typeof attach === 'object' && attach instanceof window.HTMLElement) {
    parent = attach;
  }
  if (isNoSSR()) return parent || document.body;
  return parent;
}

type AttachNodeReturnValue = HTMLElement | Element | Document;
export type AttachNode = string | (() => AttachNodeReturnValue);

interface PortalProps {
  /**
   * 指定挂载的节点
   */
  attach?: React.ReactElement | AttachNode | boolean;
  /**
   * 要挂载的节点
   */
  children?: React.ReactNode;
}

const Portal = forwardRef((props: PortalProps, ref) => {
  const { attach, children } = props;
  const [parent, container] = useMemo(() => {
    const parentDom = getAttach(attach);
    if (parentDom && isNoSSR()) {
      const div = document.createElement('div');
      parentDom.appendChild(div);
      return [parentDom, div];
    }
    return [null, children];
  }, [attach]);

  useEffect(() => {
    return () => {
      if (container instanceof window.HTMLElement) container.remove();
    };
  }, [])

  useImperativeHandle(ref, () => parent);

  return parent ? createPortal(children, container) : container;
});

Portal.displayName = 'Portal';

export default Portal;
