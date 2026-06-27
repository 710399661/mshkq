import Input from '../../index';
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';

function append() {
  const [showTimer, setShowTimer] = useState(false);
  let [sencond, setSencod] = useState(0);

  const onClick = () => {
    setShowTimer(true);
    setSencod(sencond = 60);
    setRest();
  };

  const setRest = () => {
    const interval = setInterval(() => {
      sencond = sencond - 1;
      if (sencond <= 0) {
        clearInterval(interval);
        setShowTimer(false);
        return;
      }
      setSencod(sencond);
    }, 1000);
  };

  return showTimer
    ? <View style={{ textAlign: 'right', paddingRight: '6px' }}>{sencond}s后重试</View>
    : <Text size="mini" style={{ textAlign: 'right', paddingRight: '6px' }} onClick={onClick}>发送验证码</Text>;
}

export default function Example1() {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  return (
    <>
      <Input
        value={value}
        mode="password"
        placeholder="密码输入"
        onChange={e => setValue(e.target.value)}
      />

      <Input
        style={{ marginTop: '10px' }}
        miniType="number"
        value={value1}
        mode="number"
        clearable={true}
        placeholder="数字输入"
        onChange={e => setValue1(e.detail.value)}
      />

      <Input
        style={{ marginTop: '10px' }}
        value={value2}
        placeholder="身份证数输入"
        miniType="idcard"
        onChange={e => setValue2(e.detail.value)}
      />

      <Input
        style={{ marginTop: '10px' }}
        value={value3}
        append={append()}
        appendWidth='86px'
        placeholder="验证码输入"
        onChange={e => setValue3(e.target.value)}
      />
    </>
  );
}
