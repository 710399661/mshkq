import { Dialog, Button, Icon } from '@discuzq/design';
import React, { useState } from "react";
import "./index.scss";

export default function Base() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const headerContent = (
    <div className="dialog-header-content">
      <div className="dialog-title">Title</div>
      <div>
        <Icon
          onClick={() => setVisible(false)}
          name="CloseOutlined"
          size={12}
        />
      </div>
    </div>
  );

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="dialog-wrapper">
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Dialog with async logic
      </Button>
      <Dialog
        visible={visible}
        bodyStyle={{
          width: '520px',
          padding: '16px 24px'
        }}
        header={headerContent}
        footer={
          <div className="dialog-footer-content">
            <Button disabled={confirmLoading} className="dialog-btn" onClick={() => handleCancel()}>
              取消
            </Button>
            <Button disabled={confirmLoading} loading={confirmLoading} type="primary" className="dialog-btn" onClick={() => handleOk()}>
              确定
            </Button>
          </div>
        }
        onClose={() => setVisible(false)}
      >
        <div>{modalText}</div>
      </Dialog>
    </div>
  );
}
