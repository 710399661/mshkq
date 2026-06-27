import Card from '../../index';
import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Icon from '../../../icon/index';
import Button from '../../../button/index';

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
    <>
      <Card fullBody={true} header={<View>设置fullBody来铺满内容区域</View>} footer={footer()}>
        <Image
          style={{ width: '100%', display: 'block' }}
          src="////main.qcloudimg.com/raw/6c8fd423cd9bdd7a77b0e99725e04fff.png"
        />
      </Card>

      <Card
        style={{ marginTop: '50px' }}
        fullHeader={true}
        header={
          <Image
            style={{ width: '100%', display: 'block' }}
            src="////main.qcloudimg.com/raw/6c8fd423cd9bdd7a77b0e99725e04fff.png"
          />
        }
        footer={footer()}
      >
        设置fullHeader来铺满头部区域
      </Card>

      <Card
        style={{ marginTop: '50px' }}
        fullFooter={true}
        header={header()}
        footer={
          <Image
            style={{ width: '100%', display: 'block' }}
            src="////main.qcloudimg.com/raw/6c8fd423cd9bdd7a77b0e99725e04fff.png"
          />
        }
      >
        设置fullFooter来铺满底部区域
      </Card>
    </>
  );
}
