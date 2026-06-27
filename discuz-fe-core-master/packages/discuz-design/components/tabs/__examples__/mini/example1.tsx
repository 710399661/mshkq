import React, { useState } from 'react';
import { View } from '@tarojs/components';
import Tabs from '../../index';

const tabList: [string, string, BadgeProps, IconProps][] = [
  // id, label, badge, icon
  ['luohu', '罗湖区', null, { name: 'location' }],
  ['futian', '福田区', null, { name: 'location' }],
  ['nanshan', '南山区', { info: '99+' }, { name: 'location' }],
  ['baoan', '宝安区', { info: 'New' }, { name: 'location' }],
  ['longgang', '龙岗区', null, { name: 'location' }],
  ['longhua', '龙华区', null, { name: 'location' }],
  ['pingshan', '坪山区', null, { name: 'location' }],
  ['yantian', '盐田区', null, { name: 'location' }],
  ['guangming', '光明区', null, { name: 'location' }],
  ['dapeng', '大鹏新区', null, { name: 'location' }],
  ['dapeng1', '大鹏新区1', null, { name: 'location' }],
  ['dapeng2', '大鹏新区2', null, { name: 'location' }],
  ['dapeng3', '大鹏新区3', null, { name: 'location' }],
  ['dapeng4', '大鹏新区4', null, { name: 'location' }],
];

export default function TabsExample() {
  const [placementIndex, setPlacementIndex] = useState(0);
  const placements = ['top', 'bottom', 'left', 'right'];
  const placementViews = ['顶部', '底部', '左侧', '右侧'];
  const placement = placements[placementIndex];

  const [scrollable, setScrollable] = useState(true);
  const [swipeable, setSwipeable] = useState(true);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);

  const [directionIndex, setDirectionIndex] = useState(0);
  const directions = ['row', 'row-reverse', 'column', 'column-reverse'];
  const directionViews = ['左右', '右左（反转）', '上下', '上下（反转）'];
  const direction = directions[directionIndex];

  return (
    <View className="page">
      <View className="header">Tabs 选项卡</View>
      <View style={{ overflow: 'hidden' }}>
        <Tabs
          external={
            <View
              style={{
                width: 40,
              }}
            >
              123
            </View>
          }
          scrollable={scrollable}
          swipeable={swipeable}
          placement={placement}
          tabLayoutDirection={direction}
        >
          {tabList.map(([id, label, badge, icon]) => (
            <Tabs.TabPanel
              key={id}
              id={id}
              label={label}
              badge={badgeVisible && badge}
              icon={iconVisible && icon}
            >
              {label}
            </Tabs.TabPanel>
          ))}
        </Tabs>
      </View>
    </View>
  );
}
