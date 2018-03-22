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
        filename: '[name].bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "My App",
            template: "./index.html"
        }),
        // new webpack.optimize.CommonsChunkPlugin({})
        // new UglifyJSPlugin(),
    ],
    optimization: {
        // minimize: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        alias: {
            broken: path.join(__dirname, 'modules/brokenjs/src'),
            components: path.join(__dirname, 'modules/components'),
            pages: path.join(__dirname, 'modules/pages'),
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
            test: /\.html$/,
            use: [{
                loader: "raw-loader" // loads raw text
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    mode: "development"
}