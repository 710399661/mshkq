import React, { useState } from 'react';
import AudioRecord from '../../index';

export default function FlexExample() {
  return (
    <div>
      <AudioRecord
        onRecordBegan={() => alert('录音开始')}
        onRecordCompleted={() => {
          alert('录音完成');
        }}
        onRecordReset={() => alert('重置录音')}
        onUpload={(file) => {
          console.log(file);
          alert('上传文件');
        }}
        duration={10}
      />
    </div>
  );
}
