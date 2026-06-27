import Button from '../../index';
import React from 'react';

export default function HtmlType() {
  const onContact = (e) => {
    console.log('onContact', e);
  };

  return (
    <>
      <Button type="primary" openType="contact" onContact={onContact} sendMessageTitle="自定义回话标题">
        客服消息
      </Button>
      <Button type="primary" openType="getPhoneNumber">
        获取手机号码
      </Button>
      <Button type="primary" openType="share">
        分享
      </Button>
    </>
  );
}
