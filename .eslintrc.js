module.exports = {
  root: true,
  plugins: ["unused-imports"],
  extends: ["universe/native"],
  rules: {
    "import/order": "off",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn",
  },
};
