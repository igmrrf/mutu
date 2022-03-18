module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    quotes: [2, "double", { avoidEscapte: true }],
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
    "max-len": ["warn", { code: 114 }],
    "no-underscore-dangle": [
      "error",
      {
        allow: ["_id", "_v", "_require"],
      },
    ],
    camelCase: "off",
  },
  settings: {
    "import/resolver": {
      "babel-module": {},
      node: {
        paths: ["src"],
        extenstion: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
