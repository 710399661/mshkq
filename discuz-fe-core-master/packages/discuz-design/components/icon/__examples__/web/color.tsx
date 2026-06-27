import { Icon } from '@discuzq/design';
import React from 'react';

export default function DefaultSize() {
  return (
    <>
      <Icon name="LoadingOutlined" size={30}/>
      <Icon name="LoadingOutlined" style={{ marginLeft: '10px' }} size={30} color='#eb2f96'/>
      <Icon name="LoadingOutlined" style={{ marginLeft: '10px' }} size={30} color='#52c41a'/>
    </>
  );
}
