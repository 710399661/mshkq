import React, { useState } from 'react';
import { PullToRefresh } from '@discuzq/design';

export default function PullToRefreshExample() {
  const [refresh, setRefresh] = useState(true);
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const onRefresh = () => {
    setRefresh(false);
    setTimeout(() => {
      setList([9]);
      setRefresh(true);
    }, 3000);
  };
  const onTouchMove = (e) => {
    console.log(e);
  };
  return (
    <div>
      <PullToRefresh onRefresh={onRefresh} isFinished={refresh} height={300}>
        <div>
          {list.map((item, index) => (
            <div
              key={index}
              style={{
                height: '100px',
                backgroundColor: index % 2 === 0 ? 'red' : 'black',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </PullToRefresh>
    </div>
  );
}
