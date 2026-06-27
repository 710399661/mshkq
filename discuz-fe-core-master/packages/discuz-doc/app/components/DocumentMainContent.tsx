import React from "react";
import { DocumentMainContentFooter } from "./DocumentFooter";
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

export function DocumentMainContent({
  children,
  fileMTime
}: {
  children: React.ReactNode;
  fileMTime?: string;
}) {

  React.useEffect(() => {
      document.querySelectorAll(`pre`).forEach((block) => {
          // then highlight each
          hljs.highlightBlock(block);
      });
  }, [children])

  return (
    <div className="tdesign-doc-content">
      <div className="tdesign-document-wrapper">
        <div className="tdesign-document markdown-body">{children}</div>
        {fileMTime && <div className="tdesign-documen-info__time">最后更新时间：{fileMTime}</div>}
        <DocumentMainContentFooter />
      </div>
    </div>
  );
}
