import { RichText } from '@discuzq/design';
import React from 'react';

const html = `
<iframe frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" width=\"330\" height=\"86\" src=\"https://music.163.com/outchain/player?type=2&amp;id=1417244828&amp;auto=1&amp;height=66\"></iframe>
`;

const whiteList = [
  'bilibili',
  '163.com',
];

export default function Example1() {
  const [renderContent, setRenderContent] = React.useState(html);

  return (
    <div>
      <RichText
        onParse={(nodeTree, imgUrls) => {
          console.log(nodeTree, imgUrls);
        }}
        iframeWhiteList={whiteList}
        content={renderContent}
      />
      <p>当前白名单：</p>
      {whiteList.map(item => <p>{item}</p>)}
    </div>
  );
}
