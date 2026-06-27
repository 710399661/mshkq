import React from 'react';
import { Badge, Button } from '@discuzq/design';

export default function BadgeExample() {
  return (
    <div className="page">
    <div style={{ height: '20px' }}></div>

    <div>
      <span>数字</span>
      <Badge info="99+">
        <Button>数字</Button>
      </Badge>
    </div>

    <div>
      <span>文本</span>
      <Badge info="New">
        <Button>文本</Button>
      </Badge>
    </div>

    <div>
      <span>小红点</span>
      <Badge dot>
        <Button>小红点</Button>
      </Badge>
    </div>

    <div>
      <span>方形</span>
      <Badge square info="88折">
        <Button className="long-button">配合长按钮使用</Button>
      </Badge>
    </div>

    <div>
      <span>圆形</span>
      <Badge circle info="12">
        <Button className="long-button">配合长按钮使用</Button>
      </Badge>
    </div>

    <div>
      <span>自定义背景色</span>
      <Badge square info="88折" color="#FF9C19">
        <Button>配合长按钮使用</Button>
      </Badge>
    </div>
  </div>
  );
}
