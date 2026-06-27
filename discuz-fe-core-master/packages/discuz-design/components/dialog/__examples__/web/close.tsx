import Dialog from '../../index';
import Button from '../../../button';
import React, { useState } from 'react';

export default function Base() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>打开 dialog 自带关闭按钮</Button>
      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        title="我是标题"
      >
        body content
      </Dialog>
    </>
  );
}
