import Toast from '../../index';
import React from 'react';
import Button from '../../../button';

export default function Example1() {
  return (
    <>
      <Button
        type="primary"
        onClick={() => Toast.info({
          content: '1s后关闭',
          duration: 1000,
        })
        }
      >
        duration=1000
      </Button>

      <Button
        type="primary"
        onClick={() => {
          const { destroy } = Toast.info({
            content: '一直显示，不关闭',
            duration: 0,
          });
        }
      }
      >
        一直显示，不关闭
      </Button>

      <Button
        type="primary"
        onClick={() => {
          const { destroy } = Toast.info({
            content: '一直显示，点击才关闭',
            duration: 0,
            hasMask: true,
            onMaskClick: () => {
              console.log('onMaskClick');
              Toast.hide();
            },
          });
        }
      }
      >
        一直显示，点击才关闭
      </Button>
    </>
  );
}
