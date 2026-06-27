import React from 'react';
import { Avatar } from '@discuzq/design';

export default function AvatarExample() {
  return (
    <>
      <Avatar
        style={{
          marginRight: 10,
        }}
        size='primary'
        text={'崔'}
      />
      <Avatar
        style={{
          marginRight: 10,
        }}
        size='primary'
        uppercase
        circle
        text={'admin'}
      />
      <Avatar
        size='primary'
        image={
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg'
        }
      />
    </>
  );
}
