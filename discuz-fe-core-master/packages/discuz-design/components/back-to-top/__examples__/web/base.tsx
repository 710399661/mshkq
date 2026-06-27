import React from 'react';
import { BackToTop, Button } from '@discuzq/design';

const BackToTopExample = () => (
  <div>
    向下滚动查看右下角的灰色按钮。
      <BackToTop right={50} bottom={300} onClick={() => console.log('back top')}>
        <Button>返回顶部</Button>
      </BackToTop>
      <BackToTop right={50} bottom={400} onClick={() => console.log('back top')}>
        <Button>自定义内容</Button>
      </BackToTop>
  </div>
);

export default BackToTopExample;
