const plugins = () => {
  const defaultPlugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        absoluteRuntime: true,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
        version: "7.0.0-beta.0",
      },
    ],
    [
      "module-resolver",
      {
        cwd: "babelrc",
        alias: {
          src: "./src/",
          test: "./src/test/",
          app: "./src/app/",
          base: "./src/base/",
          modules: "./src/modules",
          helpers: "./src/helpers/",
          config: "./src/config/",
          containers: "./src/containers",
          domain: "./src/domain/",
          interfaces: "./src/interfaces/",
          routes: "./src/interfaces/http/routes/",
          controllers: "./src/interfaces/http/controllers/",
          middleware: "./src/interfaces/http/middleware/",
        },
      },
    ],
  ];
  return defaultPlugins;
};

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "14.18.1",
        },
      },
    ],
  ],
  plugins: plugins(),
};
