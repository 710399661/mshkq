import { RichText } from '@discuzq/design';
import React from 'react';

const html = `
<p><span id="topic" value="191">#基础解析#</span></p><br />
<blockquote><p>本文档将指导您如何在已安装宝塔面板的 Linux 服务器上安装部署 DIscuz！Q。</p></blockquote>
<hr />\n<p>123<br />\n123<br />\n </p>\n<hr />
<a href="javascript:alert('xss')">click me</a>
<a href="alert('xss')">fresh</a>
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
<p>段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落</p>
<p>段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落</p>
<p><strong>段落段落</strong>段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落</p>

<code>const helloWorld = function() {
  console.log('hello world');
}</code>

<p>
    <img width='200' height='200' src="https://main.qcloudimg.com/raw/9c701525249863334dbd86397b49a11d.jpg" alt="图片" />
</p>

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="330" height="86" src="https://music.163.com/outchain/player?type=2&id=1417244828&auto=1&height=66"></iframe>
<script>123</script>
`;

export default function Example1() {
  const [renderContent, setRenderContent] = React.useState(html);

  const whiteList = [
      'bilibili',
      '163.com',
  ];

  return (
    <div>
      <RichText
        onParse={(nodeTree, imgUrls) => {
          console.log(nodeTree, imgUrls);
        }}
        onImgClick={(node) => {
            alert('图片被点击了')
        }}
        content={renderContent}
        iframeWhiteList={whiteList}
      />
    </div>
  );
}
