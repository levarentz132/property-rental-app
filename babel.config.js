module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            src: "./src",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          allowUndefined: false,
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
