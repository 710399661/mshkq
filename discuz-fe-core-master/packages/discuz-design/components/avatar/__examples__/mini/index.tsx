import React from 'react';
import { View } from '@tarojs/components';
import Avatar from '../../index';

export default function AvatarExample() {
  return (
    <>
      <Avatar
        style={{
          marginBottom: 10,
        }}
        size={'large'}
        text={'admin'}
        onClick={() => {
          console.log('点击');
        }}
        onMouseOut={() => {
          console.log('鼠标移出');
        }}
        onMouseOver={() => {
          console.log('鼠标移入');
        }}
      />
      <Avatar
        style={{
          marginBottom: 10,
        }}
        uppercase={true}
        size={'primary'}
        text={'giegie'}
        circle={true}
      />
      <Avatar size={'small'} text={'崔'} />
      <Avatar
        size={'large'}
        image={
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1H6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg'
        }
      />
      <Avatar
        size={'large'}
        text={'giegie'}
        image={
          'https://bbsv3.techo.chat/storage/avatars/3.png?1579577637&imageMogr2/format/webp/quality/25/interlace/1/ignore-error/1'
        }
      />
      <Avatar.Group
        circle={true}
        maxCount={3}
        uppercase={true}
        groupData={[
          {
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg',
            text: 'giegie',
          },
          {
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg',
            text: 'admin',
          },
          {
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg',
            text: 'admin',
          },
          {
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg',
            text: 'admin',
          },
          {
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1611688293,2175392062&fm=26&gp=0.jpg',
            text: 'admin',
          },
        ]}
        onClick={() => {
          console.log('点击');
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
