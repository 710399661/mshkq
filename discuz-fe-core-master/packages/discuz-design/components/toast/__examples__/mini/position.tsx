import Toast from '../../index';
import React from 'react';
import Button from '../../../button';

export default function Example1() {
  return (
    <>
      <Button
        onClick={() => Toast.info({
          content: '这是一条提示信息',
          position: 'top',
          onClose: () => {
            console.log(123);
          },
        })
        }
      >
        top
      </Button>
      <Button
        onClick={() => Toast.info({
          content: '这是一条提示信息',
          position: 'center',
        })
        }
      >
        center
      </Button>
      <Button
        onClick={() => Toast.info({
          content: '这是一条提示信息',
          position: 'bottom',
        })
        }
      >
        bottom
      </Button>
    </>
  );
}
