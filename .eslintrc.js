module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: '999.999.999',
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: ['**/test.tsx', '**/test.ts'] },
    ],
    '@typescript-eslint/indent': [2, 2],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        ts: 'never',
      },
    ],
    'eact/jsx-filename-extension': 0,
    'import/no-cycle': 0,
    'object-curly-newline': 'off',
    'import/prefer-default-export': 0,
    'explicit-function-return-type': 0,
    'consistent-return': 0,
    '@typescript-eslint/camelcase': 0,
    'newline-per-chained-call': 0,
    'class-methods-use-this': 0,
    'no-useless-constructor': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'operator-linebreak': 0,
    '@typescript-eslint/no-explicit-any': 0,
    eqeqeq: 0,
  },
};
