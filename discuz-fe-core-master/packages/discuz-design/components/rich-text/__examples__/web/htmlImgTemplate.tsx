import { RichText, Button } from '@discuzq/design';
import React from 'react';

const imghtml = `
<img width='200' height='200' src="https://main.qcloudimg.com/raw/9c701525249863334dbd86397b49a11d.jpg" alt="图片" />
`;
const errorImgHtml = '<img width="200" height="200" src="https://23333.jpg" alt="图片" />';

export default function Example2() {
  const [renderContent, setRenderContent] = React.useState('');
  const [message, setMessage] = React.useState('');

  const imgLoad = () => {
    setRenderContent(imghtml);
  };
  const errorImgLoad = () => {
    setRenderContent(errorImgHtml);
  };

  return (
    <div>
      <RichText
        style={{
          width: 200,
          height: 200,
          border: '1px solid #000',
        }}
        onImgsLoaded={(e) => {
          console.log(e);
          setMessage('图片加载完成');
        }}
        onImgsErrored={(e) => {
          console.log(e);
          setMessage('图片加载失败');
        }}
        onImgClick={(e) => {
          console.log(e);
          setMessage('图片点击');
        }}
        onParse={(nodeTree, imgUrls) => {
          console.log(nodeTree, imgUrls);
          setMessage('html解析完成');
        }}
        content={renderContent}
      />
      <h3 style={{ margin: '20px 0' }}>当前事件状态：{message}</h3>
      <Button type='primary' onClick={imgLoad}>加载正常图片</Button>
      <Button type='primary' onClick={errorImgLoad}>加载错误图片</Button>
    </div>
  );
}
