import React from 'react';

/**
 * 提取子结点中纯文本
 */
export function getPlainText(node: React.ReactNode) {
  const text: string[] = [];
  const traverse = (children: React.ReactNode) => {
    if (!children) {
      return;
    }
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.children) {
        traverse(child.props.children);
      } else if (typeof child === 'number' || typeof child === 'string') {
        text.push(String(child));
      }
    });
  };
  traverse(node);
  return text.join(' ');
}
