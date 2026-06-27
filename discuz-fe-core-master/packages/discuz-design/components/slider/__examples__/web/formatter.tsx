import React, { useEffect, useRef } from 'react';
import { Slider } from '@discuzq/design';

export default function SliderExample() {
  return (
    <div>
      <div>
        <span>不展示数量</span>
        <Slider defaultValue={50} formatter={() => null} />
      </div>

      <div>
        <span>自定义描述内容</span>
        <Slider defaultValue={40} formatter={value => `自定义的描述内容：${value} 台`} />
      </div>
    </div>
  );
}
