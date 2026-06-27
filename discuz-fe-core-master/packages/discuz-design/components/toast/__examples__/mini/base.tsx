import Toast from '../../index';
import React from 'react';
import Button from '../../../button';
import { ScrollView, View } from '@tarojs/components';

export default function Example1() {
  console.log(Toast.info);
  return (
    <ScrollView>
      {/* <View style={{
        minHeight: 1000,
      }}></View> */}
      <Button
        onClick={() => Toast.info({
          content: '这是一条信息提示',
          onClose: () => {
            console.log('close');
          },
        })
        }
      >
        Info
      </Button>
      <Button
        onClick={() => Toast.success({
          content: '这是一条成功提示',
        })
        }
      >
        Success
      </Button>
      <Button
        onClick={() => Toast.warning({
          content: '这是一条警告提示',
        })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() => Toast.error({
          content: '这是一条异常提示',
        })
        }
      >
        Error
      </Button>
      <Button
        onClick={() => Toast.loading({
          content: '加载中 ...',
        })
        }
      >
        Loading
      </Button>
    </ScrollView>
  );
}
