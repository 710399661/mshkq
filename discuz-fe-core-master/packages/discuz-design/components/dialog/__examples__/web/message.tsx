import { Dialog, Button, Icon } from '@discuzq/design';
import React, { useState } from "react";
import "./index.scss";

export default function Base() {
  const [visible, setVisible] = useState(false);

  const [type, setType] = useState();

  const handleVisible = (type) => {
    setType(type);
    setVisible(true);
  };

  const renderContent = (type) => {
    switch (type) {
      case "Info":
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div>
              <Icon color="#1890ff" size={22} name="RemindOutlined" />
            </div>
            <div style={{ marginLeft: "16px" }}>
              <div className="dialog-content-text">
                This is a notification message
              </div>
              <div> some messages...some messages...</div>
              <div> some messages...some messages...</div>
            </div>
          </div>
        );
      case "Success":
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div>
              <Icon color="#52c41a" size={22} name="ExactnessOutlined" />
            </div>
            <div style={{ marginLeft: "16px" }}>
              <div> some messages...some messages...</div>
            </div>
          </div>
        );
      case "Error":
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div>
              <Icon color="#ff4d4f" size={22} name="WrongOutlined" />
            </div>
            <div style={{ marginLeft: "16px" }}>
              <div className="dialog-content-text">
                {" "}
                This is an error message
              </div>
              <div> some messages...some messages...</div>
            </div>
          </div>
        );
      case "Warning":
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div>
              <Icon color="#faad14" size={22} name="WarnOutlined" />
            </div>
            <div style={{ marginLeft: "16px" }}>
              <div className="dialog-content-text">
                {" "}
                This is a warning message
              </div>
              <div> some messages...some messages...</div>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="dialog-wrapper">
      <Button onClick={() => handleVisible("Info")}>Info</Button>
      <Button onClick={() => handleVisible("Success")}>Success</Button>
      <Button onClick={() => handleVisible("Error")}>Error</Button>
      <Button onClick={() => handleVisible("Warning")}>Warning</Button>
      <Dialog
        visible={visible}
      >
        {renderContent(type)}
        <div style={{ position: 'absolute', right: '32px', bottom: '24px' }}>
          <Button
            type="primary"
            className="dialog-btn"
            onClick={() => setVisible(false)}
          >
            知道了
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
