const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const stylesHandler = MiniCssExtractPlugin.loader;
const TerserPlugin = require("terser-webpack-plugin");

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devServer: {
    open: true,
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".css", ".less", ".mjs"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: [stylesHandler, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: lessModuleRegex,
        use: [
          stylesHandler,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentHashFunction: "md4",
                localIdentName: "[local]-[hash:5]",
                // [name]_[local]_
              },
              importLoaders: 4,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },

      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // parallel: true,
          compress: {
            drop_console: true,
            drop_debugger: true,
            unused: true,
            dead_code: true,
            reduce_vars: true,
            // comments: false,
            // extractComments: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      title: "React Extension",
      template: "./src/index.html",
      filename: `index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
  ],
};
