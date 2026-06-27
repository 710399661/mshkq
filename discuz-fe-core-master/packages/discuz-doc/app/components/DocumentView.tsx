import React from 'react';
import MarkdownView from './MarkdownView';
import { ComponentDocument } from '!!toc-loader!@discuz/design/../README.md';

export interface DocumnetViewProps {
  componentKey: string;
  document?: ComponentDocument;
  header?: React.ReactNode;
}

/**
 * 用于显示文档
 */
export default function DocumentView({ componentKey, document }: DocumnetViewProps) {
  return <MarkdownView componentKey={componentKey} document={document}></MarkdownView>;
}
