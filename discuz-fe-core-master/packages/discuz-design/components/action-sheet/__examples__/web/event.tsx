import React, { useState, useRef } from 'react';
import { Button, ActionSheet } from '@discuzq/design';

export default function ActionSheetExample() {
  const [visible, setVisible] = useState(false)

  const actions = [
    {
      key: '1',
      content: '选项1',
      color: '#333'
    },
    {
      key: '2',
      content: '选项2',
      color: '#333'
    },
    {
      key: '3',
      content: '选项3',
      color: '#333'
    },
  ]

  return (
    <>
      <Button onClick={() => setVisible(true)}>show</Button>
      <ActionSheet
        visible={visible}
        actions={actions}
        onSelect={(e, item) => { alert('你选中了：' + item.content) }}
        onClose={() => {
          alert('即将关闭')
          setVisible(false)
        }}
        onCancel={() => alert('你点击了取消')}
      >
      </ActionSheet>
    </>)
}
