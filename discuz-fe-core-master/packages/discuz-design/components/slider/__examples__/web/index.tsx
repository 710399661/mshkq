import React, { useEffect, useRef } from 'react';
import { Slider } from '@discuzq/design';

export default function SliderExample() {
  return (
    <div>
      <Slider defaultValue={30} />
    </div>
  );
}
