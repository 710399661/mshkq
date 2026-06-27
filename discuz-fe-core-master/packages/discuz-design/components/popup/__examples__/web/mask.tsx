import React, { useState } from "react";
import { Popup, Button } from '@discuzq/design';
import "./index.scss";

export default function PopupExample() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="page">
      <div className="popup-section">
        <Button
          onClick={() => setVisible(true)}
          className="popup-btn"
          type="primary"
        >
          点击遮罩层不可关闭
        </Button>
        <Popup position={"center"} visible={visible} maskClosable={false}>
          <div className="popup-box">
            <div className="popup-header">Mask Popup</div>
            <div className="popup-content">
              <div>Some contents...</div>
              <div>Some contents...</div>
              <div>Some contents...</div>
              <div className="popup-btn-wrap">
                <Button type="primary" className="popup-btn" onClick={() => setVisible(false)}>
                  关闭
                </Button>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
