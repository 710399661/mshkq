import { Input } from '@discuzq/design';
import React, { useState } from "react";

export default function Example1() {
  const [value, setValue] = useState("");

  return (
    <>
      <Input.Textarea
        value={value}
        placeholder="限制字数"
        maxLength={100}
        showLimit={true}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
