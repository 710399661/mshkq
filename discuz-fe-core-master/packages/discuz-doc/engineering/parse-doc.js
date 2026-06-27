// @ts-check
// eslint-disable-next-line spaced-comment
/// <reference types="@paperist/types-remark" />

const path = require('path');
const unified = require('unified');
const markdown = require('remark-parse');

/**
 * @param {import('unist').UNIST.Node} node
 * @returns {node is import('mdast').MDAST.Paragraph}
 */
const isParagraph = (node) => node && node.type === 'paragraph';

/**
 * @param {import('unist').UNIST.Node} node
 * @returns {node is import('mdast').MDAST.Link}
 */
const isLink = (node) => node && node.type === 'link';

/**
 * @param {import('unist').UNIST.Node} node
 * @returns {node is import('mdast').MDAST.TextNode}
 */
const isText = (node) => node && node.type === 'text';

/**
 * @param {import('unist').UNIST.Node[]} children
 */
const onlyChild = (children) => (children && children.length === 1 ? children[0] : null);

/**
 * @param {*} node
 */
function removePosition(node) {
  if (!node) {
    return;
  }
  if (node.position) {
    delete node.position;
  }
  if (node.children) {
    node.children.forEach(removePosition);
  }
}

/**
 * 解析 Example
 * @param {import('unist').UNIST.Node} block
 */
const resolveExample = (block) => {
  if (!isParagraph(block)) {
    return;
  }
  const child = onlyChild(block.children);
  if (child && isLink(child)) {
    const { url } = child;
    const childText = onlyChild(child.children);
    if (childText && isText(childText)) {
      const exampleDescMatch = /^Example: (.+)$/.exec(childText.value);
      const extName = path.extname(url);
      if ((extName === '.jsx' || extName === '.tsx') && exampleDescMatch) {
        const name = path.basename(url, extName);
        return {
          type: 'example',
          name,
          desc: exampleDescMatch[1],
          url,
        };
      }
    }
  }
  return null;
};

const resolveMobileExample = (block) => {
  if (!isParagraph(block)) {
    return;
  }
  const child = onlyChild(block.children);
  if (child && isLink(child)) {
    const { url } = child;
    const childText = onlyChild(child.children);
    if (childText && isText(childText)) {
      const exampleDescMatch = /^ExampleMobile: (.+)$/.exec(childText.value);
      const extName = path.extname(url);
      if ((extName === '.jsx' || extName === '.tsx') && exampleDescMatch) {
        const name = path.basename(url, extName);
        return {
          type: 'exampleMobile',
          name,
          desc: exampleDescMatch[1],
          url,
        };
      }
    }
  }
  return null;
}

/**
 * 解析 Interface
 * @param {import('unist').UNIST.Node} block
 */
const resolveInterface = (block) => {
  if (!isParagraph(block)) {
    return;
  }
  const child = onlyChild(block.children);
  if (child && isLink(child)) {
    const { url } = child;
    const childText = onlyChild(child.children);
    if (childText && isText(childText)) {
      if (/^Interface: (.+)$/.test(childText.value)) {
        const typeName = RegExp.$1;
        return {
          type: 'interface',
          name: typeName,
          url,
        };
      }
    }
  }
  return null;
};

/**
 * 将 Markdown 字符串转成 React Fragment 字符串
 *
 * @param {string} source Markdown 源文
 */
function parseDoc(source) {
  // 解析元数据
  const metas = {};
  source = (source || '').replace(/^\s*---\r?\n([\s\S]+)\r?\n---\r?\n/m, () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const metaLine of RegExp.$1.split(/\r?\n/)) {
      const [name, value] = metaLine.split(/:\s*/);
      if (name && value) {
        metas[name] = value;
      }
    }
    return '';
  });

  /**
   * 解析成 AST，获得根节点
   * @type {import('mdast').MDAST.Root}
   */
  const root = unified()
    .use(markdown, {
      gfm: true,
      commonmark: true,
    })
    .parse(source);

  removePosition(root);

  // AST 一级节点转换为块，交给前端渲染
  const blocks = [];

  // 记录解析到的每个 example 的信息
  const examples = [];

  // 记录解析到的每个 mobile example 的信息
  const mobileExamples = [];

  // 记录解析到的每个 interface 的信息
  const interfaces = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const block of root.children) {

    const exampleBlock = resolveExample(block);
    const mobileExampleBlock = resolveMobileExample(block);
    const interfaceBlock = resolveInterface(block);

    if (exampleBlock) {
      examples.push(exampleBlock);
    }

    if (mobileExampleBlock) {
      mobileExamples.push(mobileExampleBlock);
    }

    if (interfaceBlock) {
      interfaces.push(interfaceBlock);
    }
    blocks.push(exampleBlock || interfaceBlock || block);
  }
  return { metas, blocks, examples, mobileExamples, interfaces };
}

module.exports = parseDoc;
