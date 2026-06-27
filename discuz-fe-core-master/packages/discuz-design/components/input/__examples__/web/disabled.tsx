import { Input } from '@discuzq/design';
import React, { useState } from "react";

export default function Example1() {
  const [value, setValue] = useState("");

  return (
    <>
      <Input
        value={value}
        disabled={true}
        placeholder="禁用"
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
