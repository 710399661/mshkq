import React, {useEffect, useRef, useState} from 'react';
import { Icon } from '@discuzq/design';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';

const initHighLight = () => {
    hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
    hljs.registerLanguage(
        'javascript',
        require('highlight.js/lib/languages/javascript'),
    );
    hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
    hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
    hljs.registerLanguage('apache', require('highlight.js/lib/languages/apache'));
    hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
    hljs.registerLanguage(
        'typescript',
        require('highlight.js/lib/languages/typescript'),
    );
    hljs.registerLanguage(
        'markdown',
        require('highlight.js/lib/languages/markdown'),
    );
    hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
    hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
    hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
};

initHighLight();

export default function ExampleShowCase({ example, code }) {
  const [codeOpen, setCodeOpen] = useState(false);
  const codeAreaRef = useRef(null);

  React.useEffect(() => {
      if (codeOpen) {
          if (!codeAreaRef.current) return;

          codeAreaRef.current.querySelectorAll(`pre code`).forEach((block) => {
              // then highlight each
              hljs.highlightBlock(block);
          });
      }
  }, [codeOpen]);

  return (
    <>
      <div className="tdesign-demo-item__body">{example}</div>
      <div className="tdesign-demo__code" style={{
        flexDirection: 'column'
      }}>
        <a
          className="tdesign-demo__code-toggle tdesign-main-link"
          style={{
            width: 100,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
          }}
          onClick={() => setCodeOpen((open) => !open)}
        >
            {codeOpen ? <span>收起代码 <Icon name={"UpwardOutlined"}/> </span> : <span>查看代码 <Icon name={"EyeOutlined"}/> </span>}
        </a>
        {codeOpen && (
          <div ref={codeAreaRef} className="tdesign-demo__code-text">
            <pre>
              <code>
                {code}
              </code>
            </pre>
          </div>
        )}
      </div>
    </>
  );
}
