import React, { useState, useRef } from 'react';
import Upload from '../../index';
import Button from '../../../button';
import Icon from '../../../icon';
import Toast from '../../../toast';
import { View } from '@tarojs/components';

export default function UploadExample() {
  const fileList = [
    {
      name: '123.jpg',
      type: 'image/jpeg',
      thumbUrl: 'https://discuz.chat/_nuxt/img/logo.afe0b7d.png',
    },
  ];

  const uploadRef = useRef(null);

  const post = (file, list, updater) => new Promise((relsove, reject) => {
    const interval = setInterval(() => {
      file.status = 'uploading';
      file.percent += 10;
      updater(list);
    }, 1000);


    setTimeout(() => {
      clearInterval(interval);
      relsove(false);
      Toast.error({ content: '上传失败' });
    }, 6000);
  });

  return <View>
    <Upload listType='card' ref={uploadRef} fileList={fileList} customRequest={post}>
      <Button type='text' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Icon name="PlusOutlined" size={20}></Icon>
        <span>上传附件</span>
      </Button>
    </Upload>
  </View>;
}
