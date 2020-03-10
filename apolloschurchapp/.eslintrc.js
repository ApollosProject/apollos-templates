module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: [
    'import',
    'jsx-a11y',
    'babel',
    'prettier',
    'jest',
    'react',
    'react-native',
    'graphql',
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
    'react/jsx-filename-extension': 0,
    'react/jsx-handler-names': 2,
    'react/jsx-curly-brace-presence': 0,
    'react/prefer-stateless-function': [2, { ignorePureComponents: true }],
    'react/require-default-props': 0,
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'react-native/split-platform-components': 2,
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
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
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/media-has-caption': 0,
    'react-native/no-unused-styles': 0,
    'react/destructuring-assignment': 0,
    'global-require': 0,
    'import/no-cycle': 0,
    'function-paren-newline': 0,
    'no-underscore-dangle': 0,
    "graphql/template-strings": ['warn', { env: 'apollo' }]
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js'],
      },
      'babel-module': {},
    },
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
};
