const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const Html = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    devtool: false,
    mode: "production",
    entry: {
        client: './src/client/index.tsx',
        admin: './src/client/admin.tsx'
    },
    output: {
        publicPath: '/static/',
        path: path.resolve(__dirname, '../public/static'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: "[name].[chunkhash:8].js"
    },
    optimization: {
        optimization: {
            minimize: isDev, // 开发环境不压缩
            splitChunks: {
                chunks: "async", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
                minSize: 30000, // 模块超过30k自动被抽离成公共模块
                minChunks: 1, // 模块被引用>=1次，便分割
                maxAsyncRequests: 5,  // 异步加载chunk的并发请求数量<=5
                maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
                name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
                automaticNameDelimiter: '~', // 命名分隔符
                cacheGroups: { // 缓存组，会继承和覆盖splitChunks的配置
                    default: { // 模块缓存规则，设置为false，默认缓存组将禁用
                        minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                        priority: -20, // 优先级
                        reuseExistingChunk: true, // 默认使用已有的模块
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
                        priority: -10
                    }
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                // 开启多线程
                parallel: true,
                uglifyOptions: {
                    compress: {
                        // 去除 console
                        drop_console: true,
                        // 去除部分影响性能代码，如：1/0
                        keep_infinity: true,
                    },
                    output: {
                        // 去除注释
                        comments: false,
                        // 紧凑输出
                        beautify: false
                    }
                }
            })
        ],
        runtimeChunk: {
            name: 'manifest'
        }
    },
    resolve:{
        // other configs
        alias:{
          "@ant-design/icons":"purched-antd-icons"
        }
    },
    plugins: [
        new Html({
            filename: '../client.html',
            template: path.join(__dirname, '../views/client.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['manifest', 'vendors', 'client'],
            html: '<%- html %>',
            title: '<%- title %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new Html({
            filename: '../admin.html',
            template: path.join(__dirname, '../views/admin.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['manifest', 'vendors', 'admin'],
            html: '<%- html %>',
            title: '<%- title %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new SWPrecacheWebpackPlugin({
            cacheId: 'huazai',
            filename: 'service-worker.js',
            minify: true, // 其他更多配置请查看官方文档 
        })
    ]
});