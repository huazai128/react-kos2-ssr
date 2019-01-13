const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const Html = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    mode: "development",
    entry: {
        client: './src/client/index.tsx',
        admin: './src/client/admin.tsx'
    },
    output: {
        publicPath: '/static/',
        path: path.resolve(__dirname, '../public/static'),
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    plugins: [
        new Html({
            filename: '../client.html',
            template: path.join(__dirname, '../views/client.html'),
            chunks: ['client'],
            html: '<%- html %>',
            title: '<%- title %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new Html({
            filename: '../admin.html',
            template: path.join(__dirname, '../views/admin.html'),
            chunks: ['admin'],
            html: '<%- html %>',
            title: '<%- title %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackHarddiskPlugin()
    ]
})