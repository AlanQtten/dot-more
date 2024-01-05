module.exports = {
  root: true,
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['coverage'],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
  },
  // tips: 0 = 0, 1 = 1, 2 = 2
  rules: {
    // ==================== native eslint ====================
    'max-classes-per-file': 0,
    'no-case-declarations': 0,
    'no-underscore-dangle': 0,
    'no-const-assign': 1,
    'no-this-before-super': 1,
    'no-undef': 1,
    'no-unreachable': 1,
    'no-unused-vars': 1,
    'constructor-super': 1,
    'valid-typeof': 1,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-new': 0,
    'no-restricted-syntax': 0,
    'no-console': 0,
    'global-require': 0,
    'no-continue': 0,
    'consistent-return': 0,
    // ==================== typescript ====================
    '@typescript-eslint/no-unused-expressions': [
      1,
      {
        allowShortCircuit: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],
    // ==================== plugin:import ====================
    'import/prefer-default-export': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
  },
  settings: {
    react: {
      version: '^18.0.0',
    },
  },
};
