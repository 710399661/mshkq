module.exports = {
  extends: ['tencent', 'tencent/ts'],
  globals: {
    DISCUZQ_WEB: true,
    DISCUZQ_MINI: true,
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/member-ordering': 0,
    '@typescript-eslint/no-require-imports': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/prefer-optional-chain': 0,
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
};
