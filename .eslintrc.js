const path = require("path");

module.exports = {
  extends: ["airbnb", "airbnb/hooks", "plugin:prettier/recommended"],
  globals: {
    window: true,
    document: true,
  },
  // parser: '@babel/eslint-parser',
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    semi: [2, "always"],
    "import/no-unassigned-import": 0,
    "no-console": 0,
    "no-unused-vars": 0,

    // typescript rules fix
    "no-shadow": 0,
    "@typescript-eslint/no-shadow": [2],
    "@typescript-eslint/no-unused-vars": [2, { varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": 0,
    "no-use-before-define": 0,
    "@typescript-eslint/no-use-before-define": [2],
    "import/extensions": [
      2,
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],

    // jsx rules fix
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "jsx-quotes": [2, "prefer-double"],
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "jsx-a11y/no-static-element-interactions": 0,

    // airbnb rules fix
    "no-param-reassign": [2, { props: false }], // allow object prop mutation
    "import/no-extraneous-dependencies": 0,
    "class-methods-use-this": [2, { enforceForClassFields: false }],
    "react-hooks/exhaustive-deps": 0,
  },
  settings: {
    "import/resolver": {
      typescript: path.join(__dirname, "tsconfig.json"),
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-undef": 0,
      },
    },
  ],
};
