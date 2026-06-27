import React, { PropsWithChildren, ReactNode, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { getRoot } from "../../util";
import { PopoverProps } from "../../interface";
import classNames from "classnames";

interface ModalProps extends PopoverProps {
  clsPrefix: string;
  triggerNode: ReactNode;
  visible: boolean;
  state?: boolean;
  setState?: Function;
  unMount?: Function;
}

export function Modal(props: PropsWithChildren<ModalProps>) {
  const {
    clsPrefix,
    triggerNode,
    visible,
    closeCallback,
    state,
    setState,
    unMount,
    children,
    trigger,
    followTrigger,
    onMouseEnter = () => {},
    onMouseLeave = () => {},
  } = props;

  // 传送浮层内容至目标容器
  const renderPortal = useMemo(() => {
    if (visible) {
      const stateCls = `${clsPrefix}-popover--${state ? "open" : "close"}`; // className
      const renderContent = (
        <div
          className={classNames(`${clsPrefix}-popover`, stateCls)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      );
      return followTrigger
        ? renderContent
        : createPortal(renderContent, getRoot());
    } else {
      unMount();
      return null;
    }
  }, [children, state, unMount, visible]);

  useEffect(() => {
    closeCallback && closeCallback(setState);
  }, [closeCallback]);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        unMount();
      }, 100);
    }
  }, [visible, unMount]);

  return (
    <div
      onMouseEnter={(e) => {
        onMouseEnter();
        if (trigger === "hover") {
          setTimeout(() => {
            setState(true);
          }, 75);
        }
      }}
      onMouseLeave={(e) => {
        onMouseLeave();
        if (trigger === "hover") {
          setState(false);

          setTimeout(() => {
            setState(false);
          }, 75);
        }
      }}
      style={{ display: "inline-block", position: "relative" }}
    >
      {renderPortal}
      {triggerNode}
    </div>
  );
}

export default Modal;
