import React, { useState, useRef } from 'react';
import { Button, ActionSheet } from '@discuzq/design';

export default function ActionSheetExample() {
  const [visible, setVisible] = useState(false)

  const actions = [
    {
      key: 'color',
      content: '设置文字颜色',
      color: 'red'
    },
    {
      key: 'disabled',
      content: '禁止点击',
      color: '#3eabfc',
      disabled: true
    },
    {
      key: 'loading',
      content: '加载中...',
      loading: true
    },
  ]

  return (
    <>
      <Button onClick={() => setVisible(true)}>show</Button>
      <ActionSheet
        visible={visible}
        actions={actions}
        onSelect={(e, item) => { console.log('select >>', item, e) }}
        onClose={() => setVisible(false)}
      >
      </ActionSheet>
    </>)
}
