import Dialog from '../../index';
import Button from '../../../button';
import React from 'react';

export default function Base() {
  return (
    <>
      <Button onClick={async () => {
        const confirm = await Dialog.confirm({
          title: '提示',
          content: '内容',
          onConfirm: () => {
            return new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              }, 2000);
            })
          },
        });
        if (confirm) Dialog.hide();
      }}>打开 dialog</Button>
    </>
  );
}
