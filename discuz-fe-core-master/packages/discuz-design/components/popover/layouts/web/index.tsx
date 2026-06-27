import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  CSSProperties,
} from "react";
import classNames from "classnames";
import { PopoverProps } from "../../interface";

import Modal from "./modal";
import {
  fixPadding,
  switchPosition,
  switchTrianglePosition,
  getVisiblePlacement,
  switchFollowPosition,
  switchFollowTrianglePosition,
} from "./position";
import { useConfig } from "../../../../extends/configContext";
import { usePopoverAnimation } from "../../../../utils/hooks/use-popover-animation.ts";

export const WebLayout = ({
  placement,
  trigger,
  followTrigger,
  content,
  children,
  background,
  zIndex,
  triggerStyle,
  triggerClassName = '',
  modalStyle,
  modalClassName = '',
  innerStyle,
  innerClassName = '',
  triangleStyle,
  triangleClassName,
  triangleAtCenter,
  showTriangle,
  needOutsideClose,
  closeCallback,
  callback,
  modalRefCallback,
  onTriggerClick = () => {},
  ...props
}: PopoverProps) => {
  const { clsPrefix } = useConfig();
  const [visible, setVisible] = useState(false);
  const [positionStyle, setPositionStyle] = useState<CSSProperties>({}); // 浮层内容位置
  const [trianglePositionStyle, setTrianglePositionStyle] = useState<CSSProperties>({ }); // 浮层三角位置
  const [forceRefresh, setForceRefresh] = useState(0); // 强制刷新

  const [state, setState, unMount] = usePopoverAnimation(setVisible, 150); // 加载动画

  const triggerRef = useRef<HTMLDivElement>(null); // 触发器引用
  const modalRef = useRef<HTMLDivElement>(null); // 模态框引用

  //trigger dom
  const triggerDom = useMemo(() => {
    return (
      <div
        className={classNames(`${clsPrefix}-popover__trigger`, triggerClassName)}
        style={{ display: "inline-block", ...triggerStyle }}
        ref={triggerRef}
        onClick={() => {
          onTriggerClick();
          trigger === "click" && setState(!visible);
        }}
      >
        {children}
      </div>
    );
  }, [children, triggerStyle, triggerClassName, visible]);

  // modal dom
  const modalDom = useMemo(() => {
    return (
      <div
        className={classNames(`${clsPrefix}-popover__content`, modalClassName)}
        style={{
          ...modalStyle,
          ...positionStyle,
          padding: fixPadding,
          zIndex: zIndex,
        }}
        ref={modalRef}
      >
        <div
          className={classNames(`${clsPrefix}-popover__inner`, innerClassName)}
          style={{
            ...innerStyle,
            background: background,
          }}
        >
          {content}
        </div>
      </div>
    );
  }, [positionStyle, modalStyle, modalClassName, innerStyle, innerClassName, content]);

  // triangle dom
  const triangleDom = useMemo(() => {
    return showTriangle ? (
      <div
        className={classNames(`${clsPrefix}-popover__arrow`, triangleClassName)}
        style={{
          background: background,
          zIndex: zIndex,
          ...triangleStyle,
          ...trianglePositionStyle,
        }}
      ></div>
    ) : null;
  }, [trianglePositionStyle, triangleStyle, triangleClassName, showTriangle]);

  // 计算浮层弹框和三角的定位位置
  useEffect(() => {
    //出现时才有modal
    if (triggerRef.current && modalRef.current) {
      const scroll =
        document.documentElement.scrollTop + document.body.scrollTop; //移动端可能取不到
      const modalRect = modalRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();

      // 获取不会被遮挡的位置
      let _placement = getVisiblePlacement(placement, modalRect, triggerRect);

      // get popover position
      let res = followTrigger
        ? switchFollowPosition(_placement, modalRect, triggerRect)
        : switchPosition(_placement, modalRect, triggerRect, scroll);
      setPositionStyle(res);

      if (!showTriangle) return;
      //get triangle position
      let res2 = followTrigger
        ? switchFollowTrianglePosition(
          _placement,
          triangleAtCenter,
          triggerRect
        )
        : switchTrianglePosition(
          _placement,
          triangleAtCenter,
          triggerRect,
          scroll
        );
      setTrianglePositionStyle(res2);
    }
  }, [
    followTrigger,
    placement,
    triangleAtCenter,
    modalRef,
    visible,
    forceRefresh,
  ]);

  // 监听页面尺寸变化强制刷新
  useEffect(() => {
    const handler = () => {
      setForceRefresh((prev: number) => prev + 1);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [setForceRefresh]);

  // 回调强制刷新
  useEffect(() => {
    if (!callback) return;
    callback(() => {
      modalRef.current && setForceRefresh((v: number) => v + 1);
    });
  }, [callback]);

  // 回调弹框
  useEffect(() => {
    modalRefCallback && modalRefCallback(modalRef);
  }, [modalRefCallback]);

  // 监听页面点击，允许外部关闭浮层
  useEffect(() => {
    let listener: (event: MouseEvent) => void;

    if (needOutsideClose && trigger === "click") {
      listener = (event: MouseEvent) => {
        if (
          !modalRef.current ||
          modalRef.current.contains(event.target as Node)
        ) {
          return;
        }
        setState(false);
      };
      window.addEventListener("click", listener);
    }
    return () => {
      window.removeEventListener("click", listener);
    };
  }, [needOutsideClose, trigger, setState]);

  return (
    <Modal
      visible={visible}
      triggerNode={triggerDom}
      clsPrefix={clsPrefix}
      closeCallback={closeCallback}
      state={state}
      setState={setState}
      unMount={unMount}
      trigger={trigger}
      followTrigger={followTrigger}
      {...props}
    >
      {modalDom}
      {triangleDom}
    </Modal>
  );
};
