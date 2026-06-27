import { Input } from '@discuzq/design';
import React, { useState } from "react";

export default function Example1() {
  const [value, setValue] = useState("");

  return (
    <>
      <Input.Textarea
        value={value}
        placeholder="基础输入框"
        autoFocus={true}
        rows={5}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
