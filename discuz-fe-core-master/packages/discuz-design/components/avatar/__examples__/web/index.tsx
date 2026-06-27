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
        text={'admin'}
      />
      <Avatar
        style={{
          marginRight: 10,
        }}
        uppercase={true}
        size={'primary'}
        text={'giegie'}
      />
      <Avatar
        size={'small'}
        text={'崔'}
        style={{
          marginRight: 10,
        }}
      />
    </>
  );
}
