import { Dialog, Button, Icon } from '@discuzq/design';
import React, { useState } from "react";
import "./index.scss";

export default function Base() {
  const [visible, setVisible] = useState(false);

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

  return (
    <div className="dialog-wrapper">
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Dialog
      </Button>
      <Dialog
        isNew={true}
        title="提示"
        visible={visible}
        // header={headerContent}
        // footer={
        //   <div className="dialog-footer-content">
        //     <Button className="dialog-btn" onClick={() => setVisible(false)}>
        //       取消
        //     </Button>
        //     <Button type="primary" className="dialog-btn" onClick={() => setVisible(false)}>
        //       确定
        //     </Button>
        //   </div>
        // }
        onClose={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
      >
        <div> Some body content...</div>
        <div> Some body content...</div>
        <div> Some body content...</div>
        <div> Some body content...</div>
        <div> Some body content...</div>
        <div> Some body content...</div>
      </Dialog>
    </div>
  );
}
