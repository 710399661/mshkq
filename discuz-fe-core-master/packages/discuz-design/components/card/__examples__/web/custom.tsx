import React from 'react';
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
  return (
    <Card
      header={header()}
      footer={footer()}
    >
      <h3>Discuz! Q站点案例集41校园论坛类-《通达邮你BBS+》</h3>
      <p>随着现象级应用作为引爆点，以及人工智能的底层算法深度学习在同一时期取得巨大突破之后，以2010为分界点，整个语音江湖开始变得热闹。</p>
    </Card>
  );
}
