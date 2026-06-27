import Button from '../../index';
import Icon from '../../../icon';
import React from 'react';

export default function Base() {
  const onClick = (e) => {
    console.log('click', e);
  };

  return (
    <>
      <Button circle={true} onClick={onClick}><Icon name="PoweroffOutlined"></Icon></Button>
      <Button type="primary" circle={true} onClick={onClick}><Icon name="SettingOutlined"></Icon></Button>
      <Button type="dashed" circle={true} onClick={onClick}><Icon name="HeartOutlined"></Icon></Button>
    </>
  );
}
