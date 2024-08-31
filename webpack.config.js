const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const rules = [
  {
    test: /\.tsx?$/,
    loader: "ts-loader",
  },
  {
    test: /\.(?:js|jsx|mjs|cjs)$/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [["@babel/preset-env", { targets: "defaults" }]],
        plugins: ["@babel/plugin-transform-class-properties"],
      },
    },
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.(?:png|jpg|jpeg|svg)$/,
    use: ["file-loader"],
  },
];

const resolve = {
  extensions: [".tsx", ".ts", ".jsx", ".js"],
};

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      { from: "src/images", to: "images" },
      { from: "src/manifest.json", to: "manifest.json" },
    ],
  })
];

const devServer = {
  historyApiFallback: true,
  compress: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
      runtimeErrors: true,
    },
  },
};

const output = {
  path: path.resolve(__dirname, "./dist"),
  filename: "[name].js",
};

const common = {
  target: "web",
  mode: "production",
  output,
  module: { rules },
  resolve,
  devServer,
};

module.exports = [
  {
    ...common,
    entry: {background: "./src/background.ts"},
    plugins
  },
  {
    ...common,
    entry: {content: "./src/content.ts"},
  }
];
