import React, { useState, useRef } from 'react';
import { Toast, Button, Icon, Upload } from '@discuzq/design';

export default function UploadExample() {
  const post = (file, list, updater) => new Promise((relsove) => {
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
    <Upload customRequest={post}>
      <Button type='text' style={{ display: 'flex', alignItems: 'center' }}>
        <Icon name="PlusOutlined" size={14}></Icon>上传附件
      </Button>
    </Upload>
  </div>;
}
