const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        common: './modules/common.js',
        app: './modules/app.js',
    },
    output: {
        // output folder path
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].chunk.bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "My App",
            template: "./index.html"
        }),
        // new webpack.optimize.CommonsChunkPlugin({}),
        new UglifyJSPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                },
                broken: {
                    test(chunk) {
                        if (chunk.resource && chunk.resource.indexOf('brokenjs\\') > -1) {
                            console.log(chunk.resource)
                            return true;
                        }
                        return false;
                    },
                    name: "broken",
                    chunks: "all"
                },
            }
        }
    },
    resolve: {
        alias: {
            broken: path.join(__dirname, 'modules/brokenjs/src'),
            components: path.join(__dirname, 'modules/components'),
            pages: path.join(__dirname, 'modules/pages'),
            utilities: path.join(__dirname, 'modules/utilities'),
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // hot: true
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "raw-loader" // loads raw text
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }, {
            test: /\.scss$/,
            use: [{
                loader: "raw-loader" // loads raw text
            }, {
                loader: "sass-loader", // compiles Less to CSS,
                options: {
                    includePaths: ['./modules', './node_modules'],
                }
            }]
        }, {
            test: /\.html$/,
            use: [{
                loader: "raw-loader" // loads raw text
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    "@babel/plugin-transform-async-to-generator",
                    "@babel/plugin-syntax-dynamic-import",
                ]
            }
        }]
    },
    mode: "development",
}