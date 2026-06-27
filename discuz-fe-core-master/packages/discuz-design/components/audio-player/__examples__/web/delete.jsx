import React, { useState, useRef } from 'react';
import { AudioPlayer, Toast } from '@discuzq/design';

const audioPlayerList = [
  {
    src: 'https://mp32.9ku.com/upload/128/2020/07/03/1006548.mp3',
    name: '飞鸟和蝉',
    id: 1,
  },
  {
    src: 'https://mp32.9ku.com/upload/128/2020/07/03/1006548.mp3',
    name: '飞鸟和蝉',
    id: 2,
  },
  {
    src: 'https://mp32.9ku.com/upload/128/2020/07/03/1006548.mp3',
    name: '飞鸟和蝉',
    id: 3,
  },
];

export default function FlexExample() {
  const [listData, setListData] = useState(audioPlayerList);

  const onDelete = (id) => {
    setListData(listData.filter(item => item.id !== id));
    Toast.success({
      content: '删除成功',
    });
  };

  return (
    <div>
      {
        listData.map(item => (
          <AudioPlayer
            key={item.id}
            src={item.src}
            fileName={item.name}
            style={{ margin: '5px 0' }}
            onDelete={() => onDelete(item.id)}
          />
        ))
      }

    </div>
  );
}
