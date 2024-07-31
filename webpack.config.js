const HtmlWebpackPlugin = require("html-webpack-plugin");
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
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./src/action/action.html"),
    filename: "action.html",
  }),
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

const entry = {
  action: "src/action.tsx",
  content: "src/content.tsx",
  background: "src/background.tsx",
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
    entry: {action: "./src/action/action.tsx"},
    plugins,
  },
  {
    ...common,
    entry: {content: "./src/content.tsx"},
  },
  {
    ...common,
    entry: {background: "./src/background.tsx"},
  },
];
