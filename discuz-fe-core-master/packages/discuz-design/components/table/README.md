# Table

## 组件说明

必要参数 columns 配置 [
    {
      key: 'desc',  // 数据项键值对的键
      name: '描述', // 表头名称
      width: 180, // 表格项列宽度 数字 或者数字字符传 或者 百分比字符串比如 '33.3%'
      render: ( value , index , record ) => 'Lorem ipsum',   //value数据项的value, index数量项索引，record数据项整条记录,
      fixed: 'left' // left或者right 靠左边锁列或者靠右边锁列 前提是表格项的列宽度总和大于容器宽度。
    }
]
