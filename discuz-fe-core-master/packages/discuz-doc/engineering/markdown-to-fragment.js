// @ts-check
// eslint-disable-next-line spaced-comment
/// <reference types="@paperist/types-remark" />

const path = require('path');
const unified = require('unified');
const markdown = require('remark-parse');

/**
 * @param {any[]} children
 */
const childrenToText = (children) =>
  /* eslint-disable */
  (children || []).reduce(
    (text, child) =>
      text +
      (child.type === 'link'
        ? `<a title={${child.title ? '${child.title}' : null}} href="${
            child.url
          }">{"${childrenToText(child.children)}"}</a>`
        : child.type === 'text'
        ? child.value.replace(/</g, '&lt;').replace(/>/, '&gt;')
        : child.children
        ? childrenToText(child.children)
        : child.value.replace(/</g, '&lt;').replace(/>/, '&gt;') || ''),
    '',
  );
/* eslint-enable */

/**
 * @param {import('unist').UNIST.Node} node
 * @returns {node is import('mdast').MDAST.Heading}
 */
const isHeading = (node) => node && node.type === 'heading';

/**
 * @param {import('unist').UNIST.Node} node
 * @returns {node is import('mdast').MDAST.Paragraph}
 */
const isParagraph = (node) => node && node.type === 'paragraph';

/**
 * @param {import('unist').UNIST.Node} node
 * @returns {node is import('mdast').MDAST.List}
 */
const isList = (node) => node && node.type === 'list';

// /**
//  * @param {import('unist').UNIST.Node} node
//  * @returns {node is import('mdast').MDAST.ListItem}
//  */
// const isListItem = (node) => node && node.type === 'listItem';

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
 * @param {import('unist').UNIST.Node} node
 * @returns {node is import('mdast').MDAST.Code}
 */
const isCode = (node) => node && node.type === 'code';

/**
 * @param {import('unist').UNIST.Node} node
 * @returns {node is import('mdast').MDAST.ThematicBreak}
 */
const isThematicBreak = (node) => node && node.type === 'thematicBreak';

/**
 * @param {import('unist').UNIST.Node[]} children
 */
const onlyChild = (children) => (children && children.length === 1 ? children[0] : null);

/**
 * 解析 Example
 * @param {import('mdast').MDAST.Paragraph} block
 */
const resolveExample = (block) => {
  const child = onlyChild(block.children);
  if (child && isLink(child)) {
    const { url } = child;
    const childText = onlyChild(child.children);
    if (childText && isText(childText)) {
      const exampleDescMatch = /^Example: (.+)$/.exec(childText.value);
      const extName = path.extname(url);
      if (extName === '.jsx' && exampleDescMatch) {
        const name = path.basename(url, extName);
        return {
          name,
          desc: exampleDescMatch[1],
          url,
        };
      }
    }
  }
  return null;
};

/**
 * 解析 Interface
 * @param {import('mdast').MDAST.Paragraph} block
 */
const resolveInterface = (block, directory) => {
  const child = onlyChild(block.children);
  if (child && isLink(child)) {
    const { url } = child;
    const childText = onlyChild(child.children);
    if (childText && isText(childText)) {
      if (/^Interface: (.+)$/.test(childText.value)) {
        const typeName = RegExp.$1;
        const filePath = path.resolve(directory, url);
        return { path: filePath, name: typeName };
      }
    }
  }
  return null;
};

/**
 * 将 Markdown 字符串转成 React Fragment 字符串
 *
 * @param {string} source Markdown 源文
 * @param {string} directory Markdown 所在目录
 * @param {string[]} importStatements 如果给到 importStatements，会把需要依赖的内容加入到该数组
 */
function markdownToFragment(source, directory, importStatements) {
  // 最终解析到的 fragment 元素集合
  const fragments = [];

  // 已经加入到 import 的集合，不再重复加入
  const importedSet = new Set();

  /**
   * 添加 import 语句
   * @param {string} statement
   */
  const addImport = (statement) => {
    // 未传入 importStatements 无需理会
    if (!importStatements) {
      return;
    }
    // 不重复添加
    if (importedSet.has(statement)) {
      return;
    }
    importStatements.push(statement);
    importedSet.add(statement);
  };

  // 解析元数据
  const metas = {};
  source = source.replace(/^\s*---\r?\n([\s\S]+)\r?\n---\r?\n/m, () => {
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

  // 记录当前大纲级别，用于处理流布局模式切换
  let outlineLevel = 1;
  // eslint-disable-next-line no-restricted-syntax
  for (const block of root.children) {
    // 标题行
    if (isHeading(block)) {
      const level = block.depth;
      switch (level) {
        // 一级标题，不渲染
        case 1: {
          break;
        }
        // 二级标题
        case 2: {
          // 之前是三级标题，关闭之前的流布局
          if (outlineLevel === 3) {
            fragments.push('</FlowLayout.Block>');
            fragments.push('</FlowLayout>');
          }
          break;
        }
        // 三级标题
        case 3: {
          // 之前大于三级标题，开启流布局
          if (outlineLevel < 3) {
            addImport('import { FlowLayout } from "@app/components/FlowLayout";');
            fragments.push('<FlowLayout>');
          }
          // 之前也是三级标题，结束当前块
          else if (outlineLevel === 3) {
            fragments.push('</FlowLayout.Block>');
          }
          fragments.push('<FlowLayout.Block>');
          break;
        }
        default:
      }
      const heading = `h${block.depth}`;
      const headingText = childrenToText(block.children);
      fragments.push(`<${heading}>${headingText}</${heading}>`);
      outlineLevel = level;
    } else if (isList(block)) {
      // 列表
      const element = block.ordered ? 'ol' : 'ul';
      fragments.push(
        `<${element}>`,
        ...block.children.map((item) => `<li>${childrenToText([item])}</li>`),
        `</${element}>`,
      );
    } else if (isParagraph(block)) {
      // 普通段落，或者示例
      // 识别示例块：
      // [Example: xxx](./path-to-example.jsx)
      const example = resolveExample(block);
      const interface = resolveInterface(block, directory);
      if (example) {
        const { name, url } = example;

        addImport("import { ExampleShowCase } from '@app/components/ExampleShowCase';");
        addImport(`import ${name} from '${url}';`);
        addImport(`import ${name}Code from '!!raw-loader!${url}';`);

        fragments.push(`<ExampleShowCase example={<${name} />} code={${name}Code} />`);
      } else if (interface) {
        // [Interface: xxxProps](./path-to-componment/name-to-componment.tsx)
        addImport("import { ApiDoc } from '@app/components/ApiDoc';");
        addImport("import propsDoc from '!!props-loader!@discuzq/design/../tsconfig.json';");

        const interfacePath = interface.path
          .replace(/\\/g, '/')
          .replace(/(.+tdesign-component\/src\/)/, '')
          .replace(/(.+tdesign-chart\/src\/)/, '')
          .replace(/(\.tsx?)$/, '');
        fragments.push(
          `<ApiDoc doc={propsDoc} path={"${interfacePath}"} name={"${interface.name}"} />`,
        );
      } else {
        // 普通段落
        fragments.push(`<p>${childrenToText(block.children)}</p>`);
      }
    } else if (isCode(block)) {
      // 代码块
      addImport("import PrismCode from 'react-prism';");
      fragments.push(
        `<PrismCode component="pre" className="prism-token token language-${block.lang}">`,
        `{${JSON.stringify(block.value)}}`,
        '</PrismCode>',
      );
    } else if (isThematicBreak(block)) {
      // HR
      fragments.push('<hr />');
    } else {
      // 无法识别的当做普通段落处理
      fragments.push(`<p>${childrenToText(block.children)}</p>`);
    }
  }

  if (outlineLevel === 3) {
    fragments.push('</FlowLayout.Block>');
    fragments.push('</FlowLayout>');
  }

  return { metas, fragments };
}

module.exports = markdownToFragment;
