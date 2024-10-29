module.exports = {
  env: {
    node: true,
  },
  plugins: ["@stylistic"],
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "@stylistic/semi": ["error", "always"],
    "@stylistic/indent": ["error", 2],
    "@stylistic/no-multi-spaces": ["error"],
    "@stylistic/array-bracket-spacing": ["always"],
    "@stylistic/js/arrow-parens": ["error", "always"],
  },
};
