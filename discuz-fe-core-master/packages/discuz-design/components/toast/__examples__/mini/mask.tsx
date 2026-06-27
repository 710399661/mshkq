import Toast from '../../index';
import React from 'react';
import Button from '../../../button';

export default function Example1() {
  return (
    <>
      <Button
        onClick={() => Toast.info({
          content: '这是一条信息提示',
          hasMask: true,
        })
        }
      >
        有遮罩层
      </Button>
      <Button
        onClick={() => Toast.success({
          content: '这是一条成功提示',
          hasMask: false,
        })
        }
      >
        无遮罩层
      </Button>
    </>
  );
}
