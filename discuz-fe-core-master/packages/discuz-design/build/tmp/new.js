'use strict';

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name');
  process.exit(1);
}

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const chineseName = process.argv[3] || componentname;
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, '../../components', componentname);

const componentType = process.argv[4] || 'class';
const layoutDic = {
  class: {
    mini: `export class ${ComponentName}MiniLayout extends React.Component<${ComponentName}Props> {
  static contextType = ConfigContext;

  render() {
    const { clsPrefix } = this.context;

    return <View>${ComponentName}</View>;
  }
}`,
    web: `export class ${ComponentName}WebLayout extends React.Component<${ComponentName}Props> {
  static contextType = ConfigContext;

  render() {
    const { clsPrefix } = this.context;
    
    return <div>${ComponentName}</div>;
  }
}`,
    import: 'import { ConfigContext } from \'../../../extends/configContext\';',
  },
  func: {
    mini: `export const ${ComponentName}MiniLayout = ({ ...props }) => {
  const { clsPrefix } = useConfig();

  return <View>${ComponentName}</View>;
};`,
    web: `export const ${ComponentName}WebLayout = ({ ...props }) => {
  const { clsPrefix } = useConfig();

  return <div>${ComponentName}</div>;
};`,
    import: 'import { useConfig } from \'../../../extends/configContext\';',
  },
};
const layoutTemplate = layoutDic[componentType];

const Files = [
  {
    filename: 'index.tsx',
    content: `import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ${ComponentName}ViewAdapter } from './layouts/index';
import { ${ComponentName}LogicalAdapter } from './adapters/index';
import { ${ComponentName}Props } from './interface';

interface ${ComponentName}State {}

interface ${ComponentName}LayoutProps {}

interface ${ComponentName}Adapter {}

export default class ${ComponentName} extends baseComponentFactory<
  ${ComponentName}Props,
  ${ComponentName}State,
  ${ComponentName}LayoutProps,
  ${ComponentName}Adapter
>({
  viewAdapter: ${ComponentName}ViewAdapter,
  logicalAdapter: ${ComponentName}LogicalAdapter,
}) {
  static defaultProps = {};

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}`,
  },
  {
    filename: 'interface.ts',
    content: `import { StyledProps } from 'utils/_type/StyledProps';

/**
 * ${ComponentName} 组件支持的属性
 */
export interface ${ComponentName}Props extends StyledProps {}`,
  },
  {
    filename: 'README.md',
    content: `# ${ComponentName} 组件

## 组件说明

基础${ComponentName}组件

## 示例

### WEB 示例

[Example: 基础用法](./__examples__/web/index.tsx)

### 小程序示例

[Example: 基础用法](./__examples__/mini/index.tsx)

## API 参数

[Interface: ${ComponentName}Props](./interface.ts)`,
  },
  {
    filename: '__examples__/mini/index.tsx',
    content: `import React from 'react';
import { View } from '@tarojs/components';
import ${ComponentName} from '../../index';

export default function ${ComponentName}Example() {
  return <View>${ComponentName}</View>;
}`,
  },
  {
    filename: '__examples__/web/index.tsx',
    content: `import React from 'react';
import ${ComponentName} from '../../index';

export default function ${ComponentName}Example() {
  return <div>${ComponentName}</div>;
}`,
  },
  {
    filename: 'adapters/index.ts',
    content: `import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const ${ComponentName}LogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').${ComponentName}WebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').${ComponentName}MiniAdapter;
    }
  },
});`,
  },
  {
    filename: 'adapters/mini.ts',
    content: `export const ${ComponentName}MiniAdapter = {};`,
  },
  {
    filename: 'adapters/web.ts',
    content: `export const ${ComponentName}WebAdapter = {};`,
  },
  {
    filename: 'layouts/index.ts',
    content: `import { baseLayoutFactory } from '../../../extends/baseLayout';

export const ${ComponentName}ViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').${ComponentName}WebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').${ComponentName}MiniLayout;
    }
  },
});`,
  },
  {
    filename: 'layouts/mini.tsx',
    content: `import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import { ${ComponentName}Props } from '../interface';
${layoutTemplate.import}

${layoutTemplate.mini}`,
  },
  {
    filename: 'layouts/web.tsx',
    content: `import React from 'react';
import classNames from 'classnames';
import { ${ComponentName}Props } from '../interface';
${layoutTemplate.import}

${layoutTemplate.web}`,
  },
  {
    filename: 'styles/index.scss',
    content: '',
  },
  {
    filename: path.join(
      `../../site/mini/src/pages/${componentname}`,
      'index.jsx',
    ),
    content: `import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View } from "@tarojs/components";
import ${ComponentName}Examples from "../../../../../components/${componentname}/__examples__/mini/index";

export default class Index extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <${ComponentName}Examples></${ComponentName}Examples>
    );
  }
}`,
  },
  {
    filename: path.join(
      `../../site/mini/src/pages/${componentname}`,
      'index.config.js',
    ),
    content: `export default {
  navigationBarTitleText: '${chineseName}'
}`,
  },
  {
    filename: path.join('../../site/web/pages', `${componentname}.js`),
    content: `import React from "react";
import ${ComponentName}Examples from "../../../components/${componentname}/__examples__/web/index";

function Preview() {
  return <${ComponentName}Examples />;
}

export default Preview;`,
  },
];

// 添加到 components.json
const componentsFile = require('../../site/mini/src/componentList.json');
if (componentsFile.components[componentname]) {
  console.error(`${componentname} 已存在.`);
  process.exit(1);
}
componentsFile.components[componentname] = { url: `${componentname}` };

fileSave(path.join(__dirname, '../../site/mini/src/componentList.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end();

// 添加到 index.scss
const sassPath = path.join(__dirname, '../../styles/index.scss');
const sassImportText = `${fs.readFileSync(sassPath)}@import "../components/${componentname}/styles/index.scss";`;
fileSave(sassPath).write(sassImportText, 'utf8')
  .end('\n');

// 添加到组件 index.ts
const comPath = path.join(__dirname, '../../components/index.ts');
const comImportText = `${fs.readFileSync(comPath)}export * as ${ComponentName} from './${componentname}';`;
fileSave(comPath).write(comImportText, 'utf8')
  .end('\n');

// 添加到 小程序页面
const miniPageFile = require('../../site/mini/src/app.config.js').default;
miniPageFile.pages.push(`pages/${componentname}/index`);
const miniPageFileInfo = `export default ${JSON.stringify(
  miniPageFile,
  null,
  '  ',
)}`;

fileSave(path.join(__dirname, '../../site/mini/src/app.config.js'))
  .write(miniPageFileInfo, 'utf8')
  .end('\n');

// 创建 component
Files.forEach((file) => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

console.log('DONE!');
