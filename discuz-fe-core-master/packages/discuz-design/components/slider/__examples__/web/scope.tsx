import React, { useEffect, useRef } from 'react';
import { Slider } from '@discuzq/design';

export default function SliderExample() {
  return (
    <div>
      <Slider defaultValue={40} max={50} min={10} />
    </div>
  );
}
