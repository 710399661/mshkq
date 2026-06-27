import React from 'react';
import { Avatar } from '@discuzq/design';

export default function AvatarExample() {
  return (
    <>
      <Avatar.Group
        circle={true}
        maxCount={3}
        uppercase={true}
        groupData={[
          {
            text: '崔肥肥',
          },
          {
            text: 'admin',
          },
          {
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg',
            text: 'admin',
          },
          {
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg',
            text: 'giegie',
          },
          {
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg',
            text: 'admin',
          },
        ]}
        onClick={() => {
          alert('点击');
        }}
        onMouseEnter={() => {
          console.log('鼠标移入');
        }}
        onMouseLeave={() => {
          console.log('鼠标移出');
        }}
      />
      <br />
      <Avatar.Group
        circle={true}
        maxCount={2}
        style={{ marginTop: 20 }}
        uppercase={true}
        groupData={[
          {
            text: 'giegie',
          },
          {
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg',
            text: 'admin',
          },
        ]}
        onClick={() => {
          alert('点击');
        }}
        onMouseEnter={() => {
          console.log('鼠标移入');
        }}
        onMouseLeave={() => {
          console.log('鼠标移出');
        }}
      />
    </>
  );
}
