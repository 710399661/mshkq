import React from 'react';
import { Grid } from '@discuzq/design';
import './index.scss';

export default function GridExample() {
  const data = [
    {
      icon: { name: 'PictureOutlinedBig', color: 'white' },
      title: '标题文字',
      description: '描述文字',
      style: { background: '#7ac3fa' },
    },
    {
      icon: { name: 'PictureOutlinedBig', color: 'white' },
      title: '标题文字',
      description: '描述文字',
      style: { background: '#3eabfc' },
    },
    {
      icon: { name: 'PictureOutlinedBig', color: 'white' },
      title: '标题文字',
      description: '描述文字',
      style: { background: '#7ac3fa' },
    },
  ];

  return (
    <div className="page">
      <Grid data={data} onClick={console.log} />
    </div>
  );
}
