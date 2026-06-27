import React, { useState } from 'react';
import { Switch, Button } from '@discuzq/design';

export default function SwitchExample() {
  const [checked, isChecked] = useState(false);
  const onClick = () => {
    isChecked(!checked);
  };
  return (
    <>
      <Switch checked={checked}/>
      <Button type='primary' onClick={onClick}>开/关</Button>
    </>
  );
}
