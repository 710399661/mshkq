import React from 'react';
import { RichText } from '@discuzq/design';

const html = `
<code>\n 代码片段\n GRANT RELOAD ON *.* TO \'bellen\'@\'%\';\n </code>
`;

export default function Example1() {
  const [renderContent, setRenderContent] = React.useState(html);

  return (
    <div>
      <RichText
        onParse={(nodeTree, imgUrls) => {
          console.log(nodeTree, imgUrls);
        }}
        content={renderContent}
      />
    </div>
  );
}
