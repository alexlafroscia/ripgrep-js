'use strict';

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    // Shared ESLint options
    ecmaVersion: 2019,
    ecmaFeatures: {
      legacyDecorators: true,
    },

    // Babel-specific options
    requireConfigFile: false,
    babelOptions: {
      plugins: [[require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }]],
    },
  },
  plugins: ['@movable/no-wildcard-postmessage'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:no-unsanitized/DOM'],
  env: {
    es6: true,
  },
  rules: {
    '@movable/no-wildcard-postmessage/no-wildcard-postmessage': 'error',
  },
};
