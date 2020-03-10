module.exports = {
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  plugins: [
    'import',
    'babel',
    'prettier',
    'jest',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        arrowParens: 'always',
        bracketSpacing: true,
        printWidth: 80,
        semi: true,
      },
    ],
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 2,
    'import/prefer-default-export': 1,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'ignore', // off until https://github.com/benmosher/eslint-plugin-import/issues/512 is fixed
      },
    ],
    'react-native/no-unused-styles': 0,
    'react/destructuring-assignment': 0,
    'global-require': 0,
    'import/no-cycle': 0,
    'function-paren-newline': 0,
    'no-underscore-dangle': 0
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
      'babel-module': {},
    },
  },
  env: {
    node: true,
    'jest/globals': true,
  },
};
