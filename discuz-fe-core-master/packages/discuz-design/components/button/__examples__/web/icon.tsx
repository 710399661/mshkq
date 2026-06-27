import { Button, Icon } from '@discuzq/design';
import React from 'react';

export default function Base() {
  const onClick = (e) => {
    // console.log('click', e);
  };

  return (
    <div>
      <Button onClick={onClick}><Icon name="PoweroffOutlined"></Icon></Button>
      <Button type="primary" onClick={onClick}><Icon name="SettingOutlined"></Icon></Button>
      <Button type="dashed" onClick={onClick}><Icon name="HeartOutlined"></Icon></Button>
    </div>
  );
}
