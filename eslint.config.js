// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");
const { rules } = require('eslint-config-prettier');

module.exports = defineConfig([
  expoConfig,

  {
    extends:["prettier"],
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
    },
    ignores: ["dist/*"],
  }
]);
