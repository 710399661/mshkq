import React from 'react';
import { Avatar } from '@discuzq/design';

export default function AvatarExample() {
  return (
    <>
      <Avatar
        style={{
          marginRight: 10,
        }}
        size={'large'}
        text={'崔'}
        circle={true}
      />
      <Avatar
        style={{
          marginRight: 10,
        }}
        size={'primary'}
        text={'崔'}
        circle={true}
      />
      <Avatar
        style={{
          marginRight: 10,
        }}
        size={'small'}
        text={'崔'}
        circle={true}
      />
    </>
  );
}
