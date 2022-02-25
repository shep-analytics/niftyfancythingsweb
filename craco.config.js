const webpack = require("webpack");

module.exports = {
  eslint: {
    enable: false,
  },

  webpack: {
    configure: {
      resolve: {
        fallback: {
          //   process: require.resolve("process/browser"),
          //   zlib: require.resolve("browserify-zlib"),
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
          http: require.resolve("http-browserify"),
          https: require.resolve("https-browserify"),
          os: require.resolve("os-browserify/browser"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer"),
          asset: require.resolve("assert"),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      ],
    },
  },
};
