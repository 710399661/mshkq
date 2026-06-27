import React, { useState } from 'react';
import SideNav from '../../index';
import Icon from '../../../icon'
import { View, Text } from '@tarojs/components';
export default function SideNavExample() {
  const [activeIndex, setActivedIndex] = useState()
  const handleClick = (e, index) => {
    setActivedIndex(index)
  }
  
  return <>
  <View className={'text'}>垂直导航栏</View>
  <View className={'container'}>
    <SideNav
      defaultActiveIndex={2}
      activeIndex={activeIndex}
      onClick={handleClick}
      activeClassName={'actived'}
    >
    <SideNav.Item className={'stepsItem'} index={0}>
      <Icon className={'icon'} name={'StrongSharpOutlined'} color='#3AC15F'></Icon>
      <Text className={'content'}> 潮流话题</Text>
    </SideNav.Item>
    <SideNav.Item className={'stepsItem'} index={1}>
      <Icon className={'icon'} name={'MemberOutlined'} color='#FFC300'></Icon>
      <Text className={'content'}> 活跃用户</Text>
    </SideNav.Item>
    <SideNav.Item className={'stepsItem'} index={2}>
      <Icon className={'icon'} name={'HotOutlined'} color='#E02433'></Icon>
      <Text className={'content'}> 热门内容</Text>
    </SideNav.Item>
  </SideNav>
  </View>
  <View className={'text'}>水平导航栏</View>
  <View className={'container'}>
    <SideNav
      defaultActiveIndex={2}
      activeIndex={activeIndex}
      onClick={handleClick}
      activeClassName={'actived'}
      direction='horizontal'
    >
    <SideNav.Item className={'stepsItem'} index={0}>
      <View className={'horizontal'}>
        <Icon name={'StrongSharpOutlined'} color='#3AC15F'></Icon>
        <Text className={'content'}> 潮流话题</Text>
      </View>
    </SideNav.Item>
    <SideNav.Item className={'stepsItem'} index={1}>
      <View className={'horizontal'}>
        <Icon name={'MemberOutlined'} color='#FFC300'></Icon>
        <Text className={'content'}> 活跃用户</Text>
      </View>
    </SideNav.Item>
    <SideNav.Item className={'stepsItem'} index={2}>
      <View className={'horizontal'}>
        <Icon name={'HotOutlined'} color='#E02433'></Icon>
        <Text className={'content'}> 热门内容</Text>
      </View>
    </SideNav.Item>
  </SideNav>
  </View>
  </>
}
