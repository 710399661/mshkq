import React, { useState, useRef, useEffect } from 'react';
import { Toast, Button, Icon, Upload } from '@discuzq/design';

function ProgressRender(props) {
  const { file } = props;
  const [percent, setpercent] = useState(file.percent);

  useEffect(() => {
    console.log(file.percent);
    setpercent(file.percent);
  }, [file.percent]);

  return <span>进度：{percent}</span>;
}

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
    <Upload listType='card' customRequest={post} multiple={true} progressRender={file => <ProgressRender file={file} />}>
      <Button type='text' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Icon name="PlusOutlined" size={20}></Icon>
        <span>上传附件</span>
      </Button>
    </Upload>
  </div>;
}
