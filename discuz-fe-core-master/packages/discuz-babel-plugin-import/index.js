const t = require('@babel/types');
const humps = require('humps');

module.exports = () => {
  return {
    visitor: {
      ImportDeclaration(
        path,
        {
          opts: { libraryName, libraryDirectory }
        }
      ) {
        if (!t.isStringLiteral(path.node.source, { value: libraryName })) {
          return;
        }
        const specifiers = path.node.specifiers;
        const declarations = specifiers.map(specifier => {
          return t.ImportDeclaration(
            [t.importDefaultSpecifier(specifier.local)],
            t.StringLiteral(
              `${libraryName}/${libraryDirectory}/${humps.decamelize(
                specifier.local.name,
                { separator: '-' }
              )}`
            )
          );
        });
        path.replaceWithMultiple(declarations);
      }
    }
  };
};