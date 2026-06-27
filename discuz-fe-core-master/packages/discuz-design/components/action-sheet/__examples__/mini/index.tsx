import React, {useState} from 'react';
import ActionSheet from '../../index';
import { View, Button } from '@tarojs/components';
export default function ActionSheetExample() {
  const [visible, setVisible] = useState(false)
  const [show ,setShow] = useState(false)
  const actionsColumn = [
    {
      content: '红色',
      color: 'red'
    },
    {
      content: '禁止点击',
      disabled: true
    },
    {
      content: '加载状态',
      loading: true
    },
  ]
  const actionsRow = [
    {
      icon: 'RedactOutlined',
      description: '编辑'
    },
    {
      icon: 'DeleteOutlined',
      description: '删除'
    },
    {
      icon: 'HotBigOutlined',
      description: '精华'
    },
    {
      icon: 'TopOutlined',
      description: '置顶'
    },
    {
      icon: 'CollectFunOutlined',
      description: '收藏'
    },
    {
        icon: 'PictureOutlinedBig',
        description: '生成海报'
    },
    {
        icon: 'WeChatOutlined',
        description: '微信分享',
        canShare: true
    },
  ]
  return (
    <View>
      <Button onClick={() => setVisible(true)}>
        cloumn
      </Button>
      <Button onClick={() => setShow(true)}>
        row
      </Button>
      <ActionSheet
        onSelect={(e, item) => {console.log(e, item);}}
        visible={visible}
        actions={actionsColumn}
        onClose={() => setVisible(false)}
      >
      </ActionSheet>
      <ActionSheet
        onSelect={(e, item) => {console.log(e, item);}}
        visible={show}
        actions={actionsRow}
        onClose={() => setShow(false)}
        layout='row'
      >
      </ActionSheet>
    </View>)
}
