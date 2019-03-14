const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const Html = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); // 多进程压缩

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
            }),
            // new ParallelUglifyPlugin({
            //     cacheDir: '.cache/',
            //     // 传递给 UglifyJS的参数如下：
            //     uglifyJS: {
            //       output: {
            //         /*
            //          是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
            //          可以设置为false
            //         */
            //         beautify: false,
            //         /*
            //          是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
            //         */
            //         comments: false
            //       },
            //       compress: {
            //         /*
            //          是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
            //          不大的警告
            //         */
            //         warnings: false,
          
            //         /*
            //          是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
            //         */
            //         drop_console: true,
          
            //         /*
            //          是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
            //          转换，为了达到更好的压缩效果，可以设置为false
            //         */
            //         collapse_vars: true,
          
            //         /*
            //          是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
            //          var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
            //         */
            //         reduce_vars: true
            //       }
            //     }
            //   }),
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
            filename: '../client.html', // 出入文件
            template: path.join(__dirname, '../views/client.html'), // 定义入口文件
            minify: {
                removeComments: true, // 删除注释
                collapseWhitespace: true // 合并空格
            },
            chunks: ['manifest', 'vendors', 'client'], // 多个入口文件
            html: '<%- html %>', // html
            title: '<%- title %>', // 标题
            script: '<%- JSON.stringify(ServerData) %>' // js
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
        }),
        new BundleAnalyzerPlugin(),
    ]
});