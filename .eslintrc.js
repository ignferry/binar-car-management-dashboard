module.exports = {
    env: {
      es2021: true,
      node: true,
    },
    plugins: ["prettier"],
    extends: ["standard-with-typescript", "prettier"],
    overrides: [],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "semi": "off",
      "@typescript-eslint/strict-boolean-expressions": 0,
      "@typescript-eslint/no-misused-promises": 0
    },
};