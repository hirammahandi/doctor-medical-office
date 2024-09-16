const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  globals: {
    NodeJS: true,
  },
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    'import/no-default-export': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    camelcase: 'off',
    'no-implicit-coercion': 'off',
    'no-console': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'prefer-named-capture-group': 'warn',
    'no-useless-escape': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    'unicorn/filename-case': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/no-unstable-nested-components': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
  },
};
