// @ts-check
const path = require('path');
const fs = require('fs');
const parseDoc = require('./parse-doc');
const { camelCase } = require('lodash');
const getTime = require('./utils/getTime')

const COMPONENT_ROOT = path.resolve(__dirname, '../..');

/**
 * 拼接模块内容
 * @param {string} blockSource
 * @param {string} importSource
 * @param {string} exampleMapSource
 */
const buildDocModule = (blockSource, importSource, exampleMapSource, source, fileMTime) => `
${importSource}

const blocks = ${blockSource};
const exampleMap = ${exampleMapSource};
const sourceMarkdown = ${JSON.stringify(source)};
const fileMTime = ${JSON.stringify(fileMTime)};

export default {
  blocks,
  exampleMap,
  sourceMarkdown,
  fileMTime
};

`;

/**
 * Webpack Loader，把 Readme 转换成可渲染的 React 组件
 *
 * @param {string} source
 *
 * https://webpack.github.io/docs/loaders.html#loader-context
 *
 * @this {import('webpack').loader.LoaderContext}
 */
function docLoader(source) {
  // 获取文件最后修改日期
  const fileMTime = getFileLastUpdateTime(this.resourcePath);
  // 改后缀，方便给到 babel 进一步处理
  this.resourcePath = this.resourcePath.replace(/\.md$/, '.jsx');

  const importBuilder = createImportBuilder();

  importBuilder.add('import React, { Fragment } from "react";');
  importBuilder.add('import ReactDOM from "react-dom";');

  const { blocks, examples } = parseDoc(source);

  // build example lines
  const exampleLines = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const { name, url } of examples) {
    importBuilder.add(`import ${camelCase(name)}Example from '${url}';`);
    importBuilder.add(`import ${camelCase(name)}Code from '!!raw-loader!${url}';`);
    exampleLines.push(`${camelCase(name)}: { component: ${camelCase(name)}Example, code: ${camelCase(name)}Code },`);
  }
  const exampleMapSource = `{${exampleLines.join('')}}`;

  // eslint-disable-next-line no-restricted-syntax
  for (const block of blocks) {
    if (block.type === 'interface') {
      const absolutePath = path.resolve(this.context, block.url);
      block.path = absolutePath
        .replace(COMPONENT_ROOT, '')
        .replace(/\\/g, '/')
        .replace(/\.tsx?/g, '');
    }
  }

  const importSource = importBuilder.build();
  const blockSource = JSON.stringify(blocks);

  const moduleSource = buildDocModule(blockSource, importSource, exampleMapSource, source, fileMTime);

  return moduleSource;
}

function getFileLastUpdateTime(path) {
  const fileStat = fs.statSync(path);
  if (!fileStat?.mtimeMs) {
    return '';
  }
  return getTime(fileStat?.mtimeMs);
}

function timeStandard (time = 0) {
  return time > 9 ? time : "0" + time;
}

function createImportBuilder() {
  const importStatements = [];

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

  return {
    add: addImport,
    build: () => importStatements.join('\n'),
  };
}

module.exports = docLoader;
