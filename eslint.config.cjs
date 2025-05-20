const js = require('@eslint/js');
const globals = require('globals');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser, 
      },
    },
  },
];