import { Divider } from '@discuzq/design';
import React from "react";

export default function Base() {
  return (
    <div className="page">
      <div className="divider-section">
        <p>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</p>
        <Divider dashed={true}>虚线</Divider>
        <p>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</p>
      </div>
    </div>
  );
}
