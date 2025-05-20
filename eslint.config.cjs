const js = require('@eslint/js')
const globals = require('globals')

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = (async () => {
  const stylistic = await import('@stylistic/eslint-plugin')

  return [
    {
      files: ['webpack.config.js'],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: 'commonjs',
        globals: {
          ...globals.node,
        },
      },
      rules: {
        // Можно добавить специфические правила сюда, если нужно
        'no-undef': 'off', // отключаем если require ругается
      },
    },
    {
      files: ['**/*.js'],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
      plugins: {
        '@stylistic': stylistic.default,
      },
      rules: {
        '@stylistic/semi': ['error', 'never'],
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/indent': ['error', 2],
        '@stylistic/eol-last': ['error', 'always'],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
        '@stylistic/arrow-parens': ['error', 'as-needed'],
        '@stylistic/brace-style': ['error', '1tbs'],
        '@stylistic/padded-blocks': ['error', 'never'],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/spaced-comment': ['error', 'always'],
      },
    },
  ]
})()