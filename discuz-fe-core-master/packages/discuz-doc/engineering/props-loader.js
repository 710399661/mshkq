// @ts-check
const path = require('path');
const morph = require('ts-morph');
const parseDoc = require('./parse-doc');

const ImportRegExp = /import\("(.+)"\)\.([\w\.]+)/;

const NodeModulesWhiteList = ['react-popper', 'react-transition-group'];

/**
 * webpack loader
 * @this {import('webpack').loader.LoaderContext}
 */
async function PropsLoader(input, map) {
  const loaderContext = this;
  const callback = loaderContext.async();

  try {
    const content = await loader(loaderContext);
    callback(null, content, map);
  } catch (err) {
    callback(err, input, map);
  }
};

/** @type {morph.SourceFile} */
let curSource;

/** @type {morph.Project} */
let project;

/** @type {string} */
let projectRoot;

async function loader(
  /** @type {import('webpack').loader.LoaderContext} */ loaderContext,
) {
  projectRoot = path.dirname(loaderContext.resourcePath).replace(/\\/g, '/');
  console.log(projectRoot);
  project = new morph.Project({
    tsConfigFilePath: loaderContext.resourcePath,
    skipFileDependencyResolution: true,
  });

  project.getLanguageService();

  const doc = {};
  project.getSourceFiles().forEach((source) => {
    loaderContext.dependency(source.getFilePath());
    const path = getPath(source);
    curSource = source;

    // TypeAliases
    source.getTypeAliases().forEach((alias) => {
      const name = alias.getName();
      const id = getId(path, name);
      doc[id] = {
        name,
        path,
        type: {
          name,
          type: getType(alias.getType()),
        },
        doc: getFirstDoc(alias.getJsDocs()),
      };
    });

    // Interfaces
    source.getInterfaces().forEach((interface) => {
      const name = interface.getName();
      const id = getId(path, name);
      doc[id] = {
        name,
        path,
        properties: getProperties(interface),
        doc: getFirstDoc(interface.getJsDocs()),
      };
    });
  });
  const json = JSON.stringify(doc)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return json;
}

function getProperties(/** @type {morph.InterfaceDeclaration} */ interface) {
  // Extends Properties
  const extendsProperties = [];
  interface.getExtends().forEach((extend) => {
    extend
      .getType()
      .getProperties()
      .forEach((property) => {
        // 过滤掉继承自 node_modules 中的 property
        const defPaths = property
          .getDeclarations()
          .map((d) => d.getSourceFile().getFilePath());
        const isInNodeModules = isDefinedInNodeModules(defPaths);
        if (isInNodeModules) {
          return;
        }

        const declaration = property.getDeclarations()[0];
        const symbol = property.compilerSymbol;

        extendsProperties.push({
          name: property.getName(),
          type: getType(property.getTypeAtLocation(extend)),
          // [TODO] isRequired
          isRequired: !/^\w+\?/.test(declaration.getText()),
          raw: declaration.getText(),
          doc: {
            comment: parseDoc(
              symbol
                .getDocumentationComment(
                  project.getTypeChecker().compilerObject,
                )
                .map((comment) => (comment.kind === 'text' ? comment.text : ''))
                .join('\n'),
            ),
            tags: symbol.getJsDocTags(),
          },
          source: {
            path: getPath(declaration.getSourceFile(), false),
            startLine: declaration.getStartLineNumber(),
            endLine: declaration.getEndLineNumber(),
          },
        });
      });
  });

  const properties = [
    // Properties
    ...interface.getProperties().map((property) => ({
      name: property.getName(),
      type: getType(property.getType()),
      isRequired: !property.hasQuestionToken(),
      // rawType: property.getTypeNode().getText(),
      doc: getFirstDoc(property.getJsDocs()),
      source: {
        path: getPath(property.getSourceFile(), false),
        startLine: property.getStartLineNumber(),
        endLine: property.getEndLineNumber(),
      },
    })),

    // Methods
    ...interface.getMethods().map((method) => ({
      name: method.getName(),
      type: getType(method.getType()),
      isRequired: !method.hasQuestionToken(),
      doc: getFirstDoc(method.getJsDocs()),
      source: {
        path: getPath(method.getSourceFile(), false),
        startLine: method.getStartLineNumber(),
        endLine: method.getEndLineNumber(),
      },
    })),
  ];

  return [
    ...properties,
    // 过滤 extends 中重复定义
    .../** @type {typeof properties} */ (extendsProperties).filter(
      (p) => !properties.find(({ name }) => name === p.name),
    ),
  ].sort((a, b) => {
    if (a.isRequired && !b.isRequired) {
      return -1;
    }
    if (!a.isRequired && b.isRequired) {
      return 1;
    }
    if (
      !a.doc.tags.find((t) => t.name === 'deprecated') &&
      b.doc.tags.find((t) => t.name === 'deprecated')
    ) {
      return -1;
    }
    if (
      a.doc.tags.find((t) => t.name === 'deprecated') &&
      !b.doc.tags.find((t) => t.name === 'deprecated')
    ) {
      return 1;
    }
    return 0;
  });
}

function getType(/** @type {morph.Type} */ type) {
  // 不展开 node_modules 中的类型
  if (type.getSymbol()) {
    const paths = type
      .getSymbol()
      .getDeclarations()
      .map((d) => d.getSourceFile().getFilePath());
    if (isDefinedInNodeModules(paths)) {
      return {
        name: removeImportPrefix(type.getText()),
        fromNodeModules: true,
      };
    }
  }

  if (type.isInterface()) {
    let path = '';
    let name = type.getText();
    if (ImportRegExp.test(name)) {
      path = RegExp.$1;
      name = RegExp.$2;
    }
    return {
      kind: 'interface',
      name: removeImportPrefix(name),
      interfaceKey: path ? getId(getPath(path), name) : null,
      typeArguments: type.getTypeArguments().map((arg) => getType(arg)),
    };
  }

  if (type.isBoolean()) {
    return {
      kind: 'boolean',
      name: type.getText(),
    };
  }

  if (type.isArray()) {
    return {
      kind: 'array',
      name: removeImportPrefix(type.getText()),
      arrayType: getType(type.getArrayType()),
    };
  }

  if (type.isIntersection()) {
    const intersectionTypes = type.getUnionTypes().map((type) => getType(type));
    if (intersectionTypes.find((t) => t.fromNodeModules)) {
      return {
        name: removeImportPrefix(type.getText()),
        fromNodeModules: true,
      };
    }
    return {
      kind: 'intersection',
      name: removeImportPrefix(type.getText()),
      intersectionTypes,
    };
  }

  if (type.isTuple()) {
    return {
      kind: 'tuple',
      name: removeImportPrefix(type.getText()),
      elements: type.getTupleElements().map((element) => getType(element)),
    };
  }

  if (type.isUnion()) {
    const unionTypes = type.getUnionTypes().map((type) => getType(type));
    if (unionTypes.find((t) => t.fromNodeModules)) {
      return {
        name: removeImportPrefix(type.getText()),
        fromNodeModules: true,
      };
    }
    return {
      kind: 'union',
      name: removeImportPrefix(type.getText()),
      unionTypes,
    };
  }

  if (type.getCallSignatures()) {
    const callSignatures = type.getCallSignatures();
    const name = type.getText();

    // 无法解析的包含 import 的 CallSignatures
    if (!callSignatures.length) {
      if (ImportRegExp.test(name)) {
        const interfaceName = RegExp.$2;
        const interfaceKey = getId(getPath(RegExp.$1), interfaceName);
        return {
          kind: 'interface',
          name: interfaceName,
          // 处理 { [key: string]: Scale; }
          template: name
            .replace(ImportRegExp, '###')
            .split('###')
            // 排除泛型情况 Scale<any>
            .map((i) => i.replace(/^<.+>$/, '')),
          interfaceKey,
          typeArguments: type.getTypeArguments().map((arg) => getType(arg)),
        };
      }
    }

    return {
      kind: 'callSignatures',
      name: removeImportPrefix(name),
      signatures: callSignatures.map((cs) => ({
        typeParameters: cs.getTypeParameters().map((p) => p.getText()),
        parameters: cs.getParameters().map((p) => ({
          name: p.getName(),
          type: curSource
            ? getType(p.getTypeAtLocation(curSource))
            : p.getDeclaredType(),
        })),
        returnType: getType(cs.getReturnType()),
      })),
    };
  }

  return { name: removeImportPrefix(type.getText()) };
}

function getId(path, name) {
  return `${path}#${name}`;
}

function getPath(
  /** @type {morph.SourceFile | string} */ source,
  removeExt = true,
) {
  let path;
  if (typeof source === 'string') {
    path = source
      .replace(/\\/g, '/')
      .replace(projectRoot, '');
  } else {
    path = source
      .getFilePath()
      .replace(/\\/g, '/')
      .replace(projectRoot, '');
  }
  return removeExt ? path.replace(/(\.tsx?)$/, '') : path;
}

function isDefinedInNodeModules(/** @type {string[]} */ defPaths) {
  const isInNodeModules =
    defPaths.length &&
    defPaths.reduce((pre, cur) => (
      pre &&
        cur.includes('node_modules') &&
        !cur.includes('node_modules/typescript/') &&
        !NodeModulesWhiteList.find((path) => cur.includes(path))
    ), true);
  return isInNodeModules;
}

function removeImportPrefix(str) {
  return str.replace(/import\("[^)]+"\)\.([\w]+)/g, (_, $1) => $1);
}

function getFirstDoc(/** @type {morph.JSDoc[]} */ docs) {
  const doc = docs[0];
  return !doc
    ? { comment: '', tags: [] }
    : {
      comment: parseDoc(doc.getComment()),
      tags: doc
        .getTags()
        .map((tag) => ({ name: tag.getTagName(), text: tag.getComment() })),
    };
}

module.exports = PropsLoader;
