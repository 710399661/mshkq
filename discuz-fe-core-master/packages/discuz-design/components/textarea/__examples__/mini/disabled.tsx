import Input from '../../../input';
import React, { useState } from 'react';

export default function Example1() {
  return (
    <>
      <Input.Textarea value="123123" rows={2} disabled={true} placeholder="禁用" />
    </>
  );
}
