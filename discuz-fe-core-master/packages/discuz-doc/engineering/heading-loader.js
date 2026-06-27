// @ts-check
// eslint-disable-next-line spaced-comment
/// <reference types="@paperist/types-remark" />

const unified = require('unified');
const markdown = require('remark-parse');

/**
 * @param {import('unist').UNIST.Node} node
 * @returns {node is import('mdast').MDAST.Heading}
 */
const isHeading = (node) => node && node.type === 'heading';

/**
 * @param {any[]} children
 */
const childrenToText = (children) =>
  (children || []).reduce(
    (text, child) =>
      text +
      (child.type === 'text'
        ? child.value.replace(/</g, '&lt;').replace(/>/, '&gt;')
        : child.children
        ? childrenToText(child.children)
        : child.value.replace(/</g, '&lt;').replace(/>/, '&gt;') || ''),
    '',
  );

/**
 * 提取 Markdown 中的标题
 */
function headingLoader(source) {
  const headings = [];
  const root = unified()
    .use(markdown, {
      gfm: true,
      commonmark: true,
    })
    .parse(source);

  for (const block of root.children) {
    // 标题行
    if (isHeading(block)) {
      const level = block.depth;
      headings.push({
        level,
        content: childrenToText(block.children),
      });
    }
  }

  return `export default ${JSON.stringify(headings)}`;
}

module.exports = headingLoader;
