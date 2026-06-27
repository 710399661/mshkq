import React from 'react';
import { Switch } from '@discuzq/design';
import './index.scss';

export default function SwitchExample() {
  return (
    <>
      <Switch defaultChecked onChange={(checkVal, context) => console.log(checkVal, context)} />
    </>
  );
}
