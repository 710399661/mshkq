import React, { useState } from 'react';
import { Switch } from '@discuzq/design';

export default function SwitchExample() {
  return (
    <>
      <Switch disabled />
      <br />
      <Switch defaultChecked disabled />
    </>
  );
}
