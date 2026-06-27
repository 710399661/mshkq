import Dialog from '../../index';
import Button from '../../../button';
import React, { useState } from 'react';
import { View } from '@tarojs/components';

export default function Base() {
  const [visible, setVisible] = useState(false);
  const [visibleClose, setVisibleClose] = useState(false);
  return (
    <>
      <View>
        <Button onClick={() => setVisible(true)}>打开 dialog</Button>
        <Dialog
          visible={visible}
          header={<View>header content</View>}
          headerStyle={{
            color: 'blue',
          }}
          bodyStyle={{
            color: 'yellow',
          }}
          footerStyle={{
            color: 'red',
          }}
          onClose={() => {
            // console.log('close');
          }}
        >
          body content
          <Button onClick={() => setVisible(false)}>关闭</Button>
        </Dialog>
        <Button onClick={() => setVisibleClose(true)}>打开 dialog - close</Button>
        <Dialog
          visible={visibleClose}
          onClose={() => setVisibleClose(false)}
          title="我是标题"
        >
          body content
          <Button onClick={() => setVisibleClose(false)}>关闭</Button>
        </Dialog>
      </View>
    </>
  );
}
