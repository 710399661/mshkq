import React, { useState, useRef } from 'react';
import { Toast, Button, Icon, Upload } from '@discuzq/design';

export default function UploadExample() {
  const fileList = [
    {
      name: '123.jpg',
      type: 'image/jpeg',
      thumbUrl: 'https://discuz.chat/dzq-img/admin-logo-pc.png',
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

  return <div>
    <Upload listType='card' ref={uploadRef} fileList={fileList} customRequest={post}>
      <Button type='text' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Icon name="PlusOutlined" size={20}></Icon>
        <span>上传附件</span>
      </Button>
    </Upload>
  </div>;
}
