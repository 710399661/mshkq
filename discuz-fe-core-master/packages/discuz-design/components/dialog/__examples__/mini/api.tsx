import Dialog from '../../index';
import Button from '../../../button';
import React from 'react';
import { View } from '@tarojs/components';

export default function Base() {
  return (
    <>
      <View>
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
        }}>打开 confirm</Button>
        <Button onClick={() => {
          Dialog.info({
            title: '提示',
            content: '内容',
            onConfirm: () => {},
          });
        }}>打开 dialog 2</Button>
      </View>
    </>
  );
}
