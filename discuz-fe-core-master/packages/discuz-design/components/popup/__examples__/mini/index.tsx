import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Popup from '../../index';
import Button from '../../../button';

export default function PopupExample() {
  const [visible, setVisible] = useState({
    top: false,
    center: false,
    bottom: false,
  });

  return (
    <View className="page">
      <Text className="header">Popup 弹出层</Text>

      <View className="section">
        <Button
          onClick={() => {
            setVisible(visible => ({ ...visible, top: true }));
          }}
        >
          顶部弹出
        </Button>
        <Popup
            withCloseIcon
          position="top"
          visible={visible.top}
          onClose={() => setVisible(visible => ({ ...visible, top: false }))}
          withFooter
        >
          <View className="box">内容</View>
        </Popup>
      </View>

      <View className="section">
        <Button
          onClick={() => {
            setVisible(visible => ({ ...visible, center: true }));
          }}
        >
          中间弹出
        </Button>
        <Popup
            withCloseIcon
          position="center"
          visible={visible.center}
          onClose={() => setVisible(visible => ({ ...visible, center: false }))}
          withFooter
        >
          <View className="box">内容</View>
        </Popup>
      </View>

      <View className="section">
        <Button
          onClick={() => {
            setVisible(visible => ({ ...visible, bottom: true }));
          }}
        >
          底部弹出
        </Button>
        <Popup
            withCloseIcon
          position="bottom"
          visible={visible.bottom}
          onClose={() => setVisible(visible => ({ ...visible, bottom: false }))}
          withFooter
        >
          <View className="box">内容</View>
        </Popup>
      </View>
    </View>
  );
}
