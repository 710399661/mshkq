// eslint-disable-next-line spaced-comment
/// <reference types="@paperist/types-remark" />

declare module '*.md' {
  const value: any;
  export default value;
}

declare module '!!toc-loader!@discuzq/design/../README.md' {
  import { UNIST } from 'unist';

  export interface Category {
    category: string;
    components: Component[];
  }

  export interface Component {
    done: boolean;
    deprecated: boolean;
    sourceName: string;
    componentName: string;
    chineseName: string;
    document: ComponentDocument;
  }

  export interface ComponentDocument {
    blocks: (UNIST.Node | ExampleNode | InterfaceNode)[];
    exampleMap?: {
      [key: string]: {
        component: React.ComponentType;
        code: string;
      };
    };
    fileMTime: string;
  }

  export interface ExampleNode {
    type: 'example';
    name: string;
    desc: string;
    url: string;
  }

  export interface InterfaceNode {
    type: 'example';
    name: string;
    url: string;
    path: string;
  }

  const value: Category[];
  export default value;
}

declare module '!!props-loader!@discuzq/design/../tsconfig.json' {}
