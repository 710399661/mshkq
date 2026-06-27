import React from 'react';
import Base from '../../../components/upload/__examples__/web/base';
import Card from '../../../components/upload/__examples__/web/card';
import Limit from '../../../components/upload/__examples__/web/limit';
import Custom from '../../../components/upload/__examples__/web/custom';

function Title(props) {
  return <h1>{props.children}</h1>;
}

function Preview() {
  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Title>基本用法</Title>
      <Base></Base>

      <Title>卡片模式</Title>
      <Card></Card>

      <Title>限制数量</Title>
      <Limit></Limit>

      <Title>自定义上传</Title>
      <Custom></Custom>
    </div>
  );
}

export default Preview;
