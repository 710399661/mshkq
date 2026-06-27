import React, { useEffect, useState } from "react";
import { Input } from '@discuzq/design';

export default function Example1() {
  const [value, setValue] = useState("");
  const ref = React.createRef();

  useEffect(() => {
    console.log(ref, ref.current);
  }, []);

  return (
    <>
      <Input.Textarea
        forwardedRef={ref}
        value={value}
        placeholder="基础输入框"
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
