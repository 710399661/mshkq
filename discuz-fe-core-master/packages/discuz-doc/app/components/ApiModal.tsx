import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Dialog } from '@discuzq/design';

/**
 * API 的方式唤起一个对话框
 * @returns 异步返回布尔值，为 true 则表示用户确认，为 false 则表示用户取消
 */
export function show({ content }) {
  return new Promise<void>((resolve) => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    ReactDOM.render(
      <ModalAlertAPI
        content={content}
        onExited={() => {
          ReactDOM.unmountComponentAtNode(el);
          el.remove();
        }}
      />,
      el,
    );
  });
}

function ModalAlertAPI({ content, onExited }) {
  const [visible, setVisible] = useState(false);

  // 渲染之后，马上显示
  useEffect(() => setVisible(true), []);

  const close = () => {
    setVisible(false);
    setTimeout(onExited, 300);
  };

  return (
    <ApiModal visible={visible} onClose={close}>
      {content}
    </ApiModal>
  );
}

function ApiModal({ children, onClose, visible }) {
  // TODO: 使用组件的对话框替换
  return (
    <Dialog
      bodyClassName={"markdown-body"}
      bodyStyle={{
        maxHeight: '600px',
        overflow: 'scroll'
      }}
      visible={visible}
      onClose={onClose}
      header={(
        <div style={{ textAlign: 'center' }}>
          <h3>接口文档</h3>
        </div>
      )}
      footer={(
        <div style={{ textAlign: 'center' }}>
          <Button type={"primary"} onClick={onClose}>关闭</Button>
        </div>
      )}
    >
        <div className="tdesign-page-doc">
          <div className="tdesign-document">{children}</div>
        </div>
    </Dialog>
  );
}
