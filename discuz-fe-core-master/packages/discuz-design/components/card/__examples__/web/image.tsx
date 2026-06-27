import React, { useState } from 'react';
import { Card, Button, Icon } from '@discuzq/design';

function header() {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8590A6' }}>
    <Icon name="LeftOutlined">返回</Icon>
    <Button type="primary" size="small">
        操作按钮
    </Button>
  </div>;
}

function footer() {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8590A6' }}>
    <div className='dzq-card__bottom'>
      <Icon style={{ marginRight: 4 }} name="LikeOutlined"></Icon>点赞
    </div>
    <div className='dzq-card__bottom'>
      <Icon style={{ marginRight: 4 }} name="MessageOutlined"></Icon>评论
    </div>
    <div className='dzq-card__bottom'>
      <Icon style={{ marginRight: 4 }} name="ShareAltOutlined"></Icon>分享
    </div>
  </div>;
}


export default function Example1() {
  const [fullHeader, setFullHeader] = useState(false);
  const [fullBody, setFullBody] = useState(false);
  const [fullFooter, setFullFooter] = useState(false);

  const onClickFullHeader = () => {
    setFullHeader(true);
  };
  const onClickFullBody = () => {
    setFullBody(true);
  };
  const onClickFullFooter = () => {
    setFullFooter(true);
  };
  const reset = () => {
    setFullHeader(false);
    setFullBody(false);
    setFullFooter(false);
  };
  return (
    <>
      <Card
        bordered={true}
        fullHeader={fullHeader}
        fullBody={fullBody}
        fullFooter={fullFooter}
        header={header()}
        footer={footer()}
      >
        <img
            style={{ width: '100%', height: '50px', display: 'block' }}
          src="////main.qcloudimg.com/raw/6c8fd423cd9bdd7a77b0e99725e04fff.png"
          alt="bg"
        />
      </Card>
      <p style={{ margin: '10px 0' }}>
        <Button type='primary' onClick={onClickFullHeader}>点击铺满头部</Button>
        <Button type='primary' onClick={onClickFullBody}>点击铺满内容</Button>
        <Button type='primary' onClick={onClickFullFooter}>点击铺满尾部</Button>
        <Button type='primary' onClick={reset}>重置铺满</Button>
      </p>
    </>
  );
}
