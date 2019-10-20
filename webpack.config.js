const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: 'development',
    entry: path.join(__dirname,"src/entry.js"),
    output: {
        path: path.join(__dirname,"dist"),
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[name].[chunkhash:8].js",
        // Needed by Cesium for multiline strings
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: "empty"
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]cesium/,
              name: "cesium",
              chunks: "all"
            }
          }
        }
      },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"]
                  }
                }
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
                use: ['url-loader']
            }
        ]
    },
    resolve: {
        alias: {
            // Cesium module name
            cesium: path.resolve(__dirname, 'node_modules/cesium/Source')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['cesium', 'main']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].[chunkhash:8].css"
          }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopyWebpackPlugin([{from: path.join('node_modules/cesium/Source', '../Build/Cesium/Workers'), to: 'Workers'}]),
        new CopyWebpackPlugin([{from: path.join('node_modules/cesium/Source', 'Assets'), to: 'Assets'}]),
        new CopyWebpackPlugin([{from: path.join('node_modules/cesium/Source', 'Widgets'), to: 'Widgets'}]),
        new webpack.DefinePlugin({
            CESIUM_BASE_URL: JSON.stringify('../dist')
        }),
    ],
} 