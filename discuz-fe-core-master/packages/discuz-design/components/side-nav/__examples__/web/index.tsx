import React, { useState } from 'react';
import SideNav from '../../index';
import './index.scss'
import Icon from '../../../icon'
export default function SideNavExample() {
  const [activeIndex, setActivedIndex] = useState()
  const handleClick = (e, index) => {
    setActivedIndex(index)
  }
  
  return <>
  <div className={'text'}>垂直导航栏</div>
  <div className={'container'}>
    <SideNav
      defaultActiveIndex={2}
      activeIndex={activeIndex}
      onClick={handleClick}
      activeClassName={'actived'}
    >
    <SideNav.Item className={'stepsItem'} index={0}>
      <Icon className={'icon'} name={'StrongSharpOutlined'} color='#3AC15F'></Icon>
      <div className={'content'}> 潮流话题</div>
    </SideNav.Item>
    <SideNav.Item className={'stepsItem'} index={1}>
      <Icon className={'icon'} name={'MemberOutlined'} color='#FFC300'></Icon>
      <span className={'content'}> 活跃用户</span>
    </SideNav.Item>
    <SideNav.Item className={'stepsItem'} index={2}>
      <Icon className={'icon'} name={'HotOutlined'} color='#E02433'></Icon>
      <span className={'content'}> 热门内容</span>
    </SideNav.Item>
  </SideNav>
  </div>
  <div className={'text'}>水平导航栏</div>
  <div className={'container'}>
    <SideNav
      defaultActiveIndex={2}
      activeIndex={activeIndex}
      onClick={handleClick}
      activeClassName={'actived'}
      direction='horizontal'
    >
    <SideNav.Item className={'stepsItem'} index={0}>
      <div className={'horizontal'}>
        <Icon name={'StrongSharpOutlined'} color='#3AC15F'></Icon>
        <div className={'content'}> 潮流话题</div>
      </div>
    </SideNav.Item>
    <SideNav.Item className={'stepsItem'} index={1}>
      <div className={'horizontal'}>
        <Icon name={'MemberOutlined'} color='#FFC300'></Icon>
        <span className={'content'}> 活跃用户</span>
      </div>
    </SideNav.Item>
    <SideNav.Item className={'stepsItem'} index={2}>
      <div className={'horizontal'}>
        <Icon name={'HotOutlined'} color='#E02433'></Icon>
        <span className={'content'}> 热门内容</span>
      </div>
    </SideNav.Item>
  </SideNav>
  </div>
  </>
}
