import React, { useState } from 'react';
import { Audio } from '@discuzq/design';
import { audioUrl1 } from './constant';

export default function FlexExample() {
  const [src, setSrc] = useState(audioUrl1);

  return (
    <div>
      <Audio src={src} loop={true} />
    </div>
  );
}
