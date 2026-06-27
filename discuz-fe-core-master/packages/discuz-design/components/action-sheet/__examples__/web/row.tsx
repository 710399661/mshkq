import React, { useState } from 'react';
import { Button, ActionSheet } from '@discuzq/design';

export default function ActionSheetExample() {
  const [visible, setVisible] = useState(false)

  const actions = [
    {
      key: '编辑',
      icon: 'RedactOutlined',
      description: '编辑',
    },
    {
      key: '删除',
      icon: 'DeleteOutlined',
      description: '删除',
    },
    {
      key: '精华',
      icon: 'HotBigOutlined',
      description: '精华',
    },
    {
      key: '置顶',
      icon: 'TopOutlined',
      description: '置顶',
    },
    {
      key: '收藏',
      icon: 'CollectFunOutlined',
      description: '收藏',
    },
    {
      key: '生成海报',
      icon: 'PictureOutlinedBig',
      description: '生成海报',
    },
    {
      key: '微信分享',
      icon: 'WeChatOutlined',
      description: '微信分享',
    },
  ]

  return (
    <div>
      <Button onClick={() => setVisible(true)}>show row</Button>
      <ActionSheet
        visible={visible}
        layout='row'
        title={'我是row布局'}
        actions={actions}
        onSelect={(e, item) => { console.log('select >>', item) }}
        onClose={() => setVisible(false)}
      >
      </ActionSheet>
    </div>)
}
