import React from 'react';
import Button from '../../../button';
import { View, Text } from '@tarojs/components';
import Badge from '../../index';

export default function BadgeExample() {
  return (
    <View className="page">
      <View style={{ height: '20px' }}></View>

      <View>
        <Text>数字</Text>
        <Badge info="99+">
          <Button>数字</Button>
        </Badge>
      </View>

      <View>
        <Text>文本</Text>
        <Badge info="New">
          <Button>文本</Button>
        </Badge>
      </View>

      <View>
        <Text>小红点</Text>
        <Badge dot>
          <Button>小红点</Button>
        </Badge>
      </View>

      <View>
        <Text>方形</Text>
        <Badge square info="88折">
          <Button className="long-button">配合长按钮使用</Button>
        </Badge>
      </View>

      <View>
        <Text>自定义背景色</Text>
        <Badge square info="88折" color="#FF9C19">
          <Button>配合长按钮使用</Button>
        </Badge>
      </View>

      <View>
        <Text>圆形</Text>
        <Badge circle info="12">
          <Button className="long-button">配合长按钮使用</Button>
        </Badge>
      </View>
    </View>
  );
}
