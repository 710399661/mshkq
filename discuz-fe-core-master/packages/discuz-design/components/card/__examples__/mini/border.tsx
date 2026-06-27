import Card from '../../index';
import React from 'react';
import Icon from '../../../icon/index';
import Button from '../../../button/index';
import { View, Text, Image } from '@tarojs/components';


function header() {
  return <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8590A6' }}>
    <Image mode="widthFix" style={{ width: '140px' }} src="https://discuz.chat/_nuxt/img/logo.afe0b7d.png" />
      <Button type="primary" size="mini">
        操作按钮
    </Button>
  </View>;
}

function footer() {
  return <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8590A6' }}>
    <Icon name="LikeOutlined">点赞</Icon>
    <Icon name="MessageOutlined">评论</Icon>
    <Icon name="ShareOutlined">分享</Icon>
  </View>;
}

export default function Example1() {
  return (
    <Card
      bordered={true}
      header={header()}
      footer={footer()}
    >
      <View>Discuz! Q站点案例集41校园论坛类-《通达邮你BBS+》</View>
      <View>随着现象级应用作为引爆点，以及人工智能的底层算法深度学习在同一时期取得巨大突破之后，以2010为分界点，整个语音江湖开始变得热闹。</View>
    </Card>
  );
}
