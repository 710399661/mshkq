import Button from '../../index';
import React from 'react';

export default function Size() {
  return (
    <>
      <Button type="primary" size="large">
        大型按钮
      </Button>
      <Button type="primary" size="medium">
        正常按钮
      </Button>
      <Button type="primary" size="small">
        中小按钮
      </Button>
      <Button type="primary" size="mini">
        小型按钮
      </Button>
    </>
  );
}
