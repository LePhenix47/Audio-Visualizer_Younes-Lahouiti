const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: {
    index: ["./src/index.ts", "./src/style/sass/main.scss"],
  },
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    //The following line generates a single CSS file
    // instead of a separate JS file for the CSS
    assetModuleFilename: "css/style[ext]",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    grid: true,
                  }),
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      ignoreOrder: true,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
