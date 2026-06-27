import React, { useState, useRef } from 'react';
import { Button, Icon, Upload } from '@discuzq/design';

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
    setTimeout(() => {
      file.status = 'uploading';
      file.percent = 50;
      updater(list);
    }, 1000);

    setTimeout(() => {
      file.status = 'success';
      updater(list);
      relsove('success');
    }, 2000);
  });

  return <div>
    <Upload listType='card' ref={uploadRef} fileList={fileList} limit={2}>
      <Button type='text' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Icon name="PlusOutlined" size={20}></Icon>
        <span>上传附件</span>
      </Button>
    </Upload>
  </div>;
}
