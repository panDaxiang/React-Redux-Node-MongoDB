const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pathResolve = dir => path.resolve(__dirname, dir);

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: pathResolve("dist"),
    chunkFilename: "[name].chunk.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@component": pathResolve("src/component"),
      "@pages": pathResolve("src/pages"),
      "@store": pathResolve("src/store"),
      "@util": pathResolve("src/util")
    }
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: pathResolve("src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // 如果需要引入第三方UI库，需要处理CSS文件
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              localIdentName: "[name]_[local]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [require("autoprefixer")()]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: pathResolve("src"),
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              localIdentName: "[name]_[local]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [require("autoprefixer")()]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        include: pathResolve("src"),
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        include: pathResolve("src"),
        use: {
          loader: "url-loader",
          options: {
            limit: 10000
          }
        }
      }
    ]
  },
  devServer: {
    host: "localhost",
    port: 9000,
    proxy:{
      '/':{
        target:'http://localhost:9001',
        changeOrigin:true
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
      Component: ["react", "Component"]
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      title: "index"
    })
  ]
};
