import React, {useState} from 'react';
import Step from '../../index';
import Button from '../../../button/index'
import Icon from '../../../icon';
import { View } from '@tarojs/components'
import './index.scss'


export default function StepExample() {
  const onChange = (index) => {
    console.log(index);
  }
  const [current, setCurrent] = useState(0);
  const connectNode = (<View className={'connect'}>
    <Icon name={'RightOutlined'}></Icon>
  </View>)
  return <View>
    <View className={'text'}>基本用法</View>
    <Step currentKey={current} onChange={onChange}>
      <Step.Item index={0}>电脑登录站点</Step.Item>
      <Step.Item index={1}>进入个人中心-编辑资料-微信换绑</Step.Item>
      <Step.Item index={2}>手机登录新微信扫码完成换绑</Step.Item>
    </Step>
      <View className={'button'}>
      <Button
        disabled={current <= -1}
        onClick={() => setCurrent(c => c - 1)}
      >
        上一步
      </Button>
      <Button
        disabled={current >= 2}
        onClick={() => setCurrent(c => c + 1)}
      >
        下一步
      </Button>
    </View>
    <View className={'text'}>仅做展示的水平步骤条，并自定义连接节点</View>
    <Step currentKey={current} onChange={onChange} readonly={true} direction={'horizontal'} connectNode={connectNode}>
      <Step.Item index={0}>基本信息</Step.Item>
      <Step.Item index={1}>付款信息</Step.Item>
      <Step.Item index={2}>线下汇款</Step.Item>
      <Step.Item index={3}>结果反馈</Step.Item>
    </Step>
  </View>
  }
