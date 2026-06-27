import Parser from '../../index';
import React from 'react';

export default function Example1() {
  const [html, setHTML] = React.useState(`<p><strong>123</strong> sdfsdfdsfdsfdsf<br />
  <strong>123</strong> 1231232131<br />
  </p>
  <p><strong>234</strong> 12321312312<br />
  <strong>334</strong> 123jkjkjk</p>
  <iframe height=498 width=510 src='https://player.youku.com/embed/XNTEzMTkzMzE4NA==' frameborder=0 'allowfullscreen'></iframe>
  <iframe src="https://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=88367efff75097ceced4cae95e96efa4&tvId=5711922189950400&accessToken=2.ef9c39d6c7f1d5b44768e38e5243157d&appKey=8c634248790d4343bcae1f66129c1010&appId=1368&height=100%&width=100%" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe>
  <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=k0040t2frxp" allowFullScreen="true"></iframe>
  <iframe src="//player.bilibili.com/player.html?aid=716973971&bvid=BV1nQ4y1f7Pr&cid=376697471&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
  <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=1831482748&auto=1&height=66"></iframe>
  <iframe height=498 width=510 src='https://player.youku.com/embed/XNTE4MjIyNTc4OA==' frameborder=0 'allowfullscreen'></iframe>
  `);

  return (
    <Parser
      onParse={(nodeTree, imgUrls) => {
        console.log(nodeTree, imgUrls);
      }}
      onClick={(e, node) => {
        console.log(e, node);
      }}
      onImgClick={(node) => {
        console.log('img click', node);
      }}
      onLinkClick={(node) => {
        console.log('link click', node);
      }}
      iframeWhiteList={[
        'bilibili',
        '163',
        'iqiyi',
        'qq',
        'youku',
      ]}
      content={html}
    />
  );
}
