import { Dialog, Button } from '@discuzq/design';
import React, { useState } from "react";
import "./index.scss";

export default function Base() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="dialog-wrapper">
      <Button onClick={() => setVisible(true)}>打开 dialog</Button>
      <p className="dialog-tip">弹出dialog,点击按钮关闭或者遮罩层关闭弹窗，自定义头部、页脚，以及样式</p>
      <Dialog
        visible={visible}
        headerStyle={{
          color: "#ebedee",
        }}
        bodyStyle={{
          // color: "#ebedee",
          // width: "400px",
          height: "400px",
        }}
        footerStyle={{
          color: "#ebedee",
        }}
        headerClassName="dialog-header"
        bodyClassName="dialog-body"
        footerClassName="dialog-footer"
        header={<div>header content</div>}
        footer={
          <div>
            <div>footer content</div>
            <Button className="dialog-btn" onClick={() => setVisible(false)}>点击按钮关闭dialog</Button>
          </div>
        }
        onClose={() => setVisible(false)}
      >
        <div className="">body content</div>
      </Dialog>
    </div>
  );
}
