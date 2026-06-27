import React, { useState, useRef, useEffect } from 'react';
import Upload from '../../index';
import Button from '../../../button';
import Icon from '../../../icon';
import { View } from '@tarojs/components';

function ProgressRender(props) {
  const { file } = props;
  const [percent, setpercent] = useState(file.percent);

  useEffect(() => {
    setpercent(file.percent);
  }, [file.percent]);

  return <View>进度：{percent}</View>;
}


export default function UploadExample() {
  const fileList = [
    {
      name: '123.jpg',
      type: 'image/jpeg',
      thumbUrl: 'https://discuz.chat/_nuxt/img/logo.afe0b7d.png',
    },
  ];

  const uploadRef = useRef(null);

  return <View>
    <Upload listType='card' ref={uploadRef} fileList={fileList} limit={2} progressRender={file => <ProgressRender file={file} />}>
      <Button type='text' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Icon name="PlusOutlined" size={20}></Icon>
        <View>上传附件</View>
      </Button>
    </Upload>
  </View>;
}
