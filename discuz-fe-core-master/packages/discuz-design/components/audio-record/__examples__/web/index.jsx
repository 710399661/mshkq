import React, { useState } from 'react';
import AudioRecord from '../../index';

export default function FlexExample() {
  return (
    <div>
      <AudioRecord
        onUpload={(file) => {
          console.log(file);
          alert('上传文件');
        }}
      />
    </div>
  );
}
