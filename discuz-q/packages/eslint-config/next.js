const base = require('./index.js');

module.exports = {
  ...base,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    ...base.extends,
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: [...base.plugins, 'react', 'react-hooks', 'jsx-a11y'],
  settings: {
    ...base.settings,
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...base.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
