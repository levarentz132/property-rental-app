module.exports = {
  root: true,
  plugins: ["unused-imports"],
  extends: [
    "universe/native",
    "@brucesong/eslint-config-react-native",
    "prettier",
  ],
  rules: {
    "import/order": "off",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn",
    "react/function-component-definition": "off",
    "@typescript-eslint/no-namespace": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/no-children-prop": "off",
  },
};
