import React from "react";
import BaseDemo from "./base";
import HideDemo from "./hide";
import CloseDemo from "./close";
import PositionDemo from "./position";
import ArrowDemo from "./arrow";
import BackgroundDemo from "./background";
import StyleDemo from "./style";
import ScrollContainer from "./scroll";
import EventDemo from "./event";
import "./index.scss";

export default function Index() {
  return (
    <>
      <p>Popover 组件示例</p>
      <BaseDemo />
      <HideDemo />
      <CloseDemo />
      <PositionDemo />
      <ArrowDemo />
      <BackgroundDemo />
      <StyleDemo />
      <EventDemo />
      <ScrollContainer />
      <div style={{ height: '500px' }}></div>
    </>
  );
}
