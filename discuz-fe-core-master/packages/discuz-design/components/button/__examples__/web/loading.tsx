import { Button } from '@discuzq/design';
import React, { useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(false);

  const entryLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  };

  return (
    <div style={{
        display: 'flex',
    }}>
      <Button size="large" loading={true}>
        加载中
      </Button>
      <Button
        size="large"
        type="primary"
        loading={loading}
        onClick={entryLoading}
      >
        click me!
      </Button>
    </div>
  );
}
