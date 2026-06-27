import Button from '../../index';
import Icon from '../../../icon';
import React from 'react';

export default function Base() {
  const onClick = (e) => {
    console.log('click', e);
  };

  return (
    <>
      <Button onClick={onClick}><Icon name="PoweroffOutlined"></Icon></Button>
      <Button type="primary" onClick={onClick}><Icon name="SettingOutlined"></Icon></Button>
      <Button type="dashed" onClick={onClick}><Icon name="HeartOutlined"></Icon></Button>
    </>
  );
}
