import React from 'react';
import { View } from '@tarojs/components';
import AudioRecord from '../../index';

export default function FlexExample() {
  return (
    <View style={{ padding: '16px' }}>
      <AudioRecord duration={10} onUpload={(file) => {
        console.log(file);
      }} />
    </View>
  );
}
