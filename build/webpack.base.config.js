const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const nodeModules = path.resolve(__dirname, '../node_modules');
const tsImportPluginFactory = require('ts-import-plugin')
const { TsConfigPathsPlugin,CheckerPlugin } = require('awesome-typescript-loader'); // 用于alias别名配置

const isDev = !!(process.env.NODE_ENV !== 'production');

function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id,
        loaders
    })
}

module.exports = {
    resolve: {
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.react.js']
    },
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
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|js|ts)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory(
                            {
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: 'css'
                            }
                        )]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: isDev ? ['style-loader', 'happypack/loader?id=happy-css'] : [
                    "style-loader", MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.join(__dirname, './postcss.config.js')
                            }
                        }
                    }
                ]
            }, {
                test: /\.less$/,
                use: isDev ? ['style-loader', 'happypack/loader?id=happy-less'] : ["style-loader", MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.join(__dirname, './postcss.config.js')
                            }
                        }
                    }, 'less-loader']
            }, {
                test: /\.styl$/,
                use: isDev ? ['style-loader', 'happypack/loader?id=happy-stylus'] : ["style-loader", MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.join(__dirname, './postcss.config.js')
                            }
                        }
                    }, 'stylus-loader']
            }, {
                test: /.(gif|jpg|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[hash:8].[ext]'
                    }
                }]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: 'font/[name].[hash:8].[ext]'
                    }
                }]
            }
        ],
        noParse: /node_modules\/(jquey|js\-cookie\.js)/
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            chunkFilename: "[name].[contenthash:8].css"
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, "../"),
            manifest: require('./vendor-manifest.json'),
        }),
        createHappyPlugin('happy-babel-js', [{
            loader: 'cache-loader',
            options: {
                cacheDirectory: path.resolve(__dirname, '.cache--happypack')
            }
        }, {
            loader: 'babel-loader',
            query: {
                presets: isDev ? ['react-hmre'] : []
            }
        }]),
        createHappyPlugin('happy-css', [{
            loader: 'css-loader',
            query: {
                minimize: !isDev,
            }
        }, {
            loader: 'postcss-loader',
            query: {
                config: {
                    path: path.join(__dirname, './postcss.config.js')
                },
            }
        }]),
        createHappyPlugin('happy-less', [{
            loader: 'css-loader',
            query: {
                minimize: !isDev,
            }
        }, {
            loader: 'postcss-loader',
            query: {
                config: {
                    path: path.join(__dirname, './postcss.config.js')
                },
            }
        }, {
            loader: 'less-loader',
            query: {
            }
        }]),
        createHappyPlugin('happy-stylus', [{
            loader: 'css-loader',
            query: {
                minimize: !isDev,
            }
        }, {
            loader: 'postcss-loader',
            query: {
                config: {
                    path: path.join(__dirname, './postcss.config.js')
                },
            }
        }, {
            loader: 'stylus-loader',
            query: {
            }
        }]),
        new ProgressBarPlugin({
            format: chalk.blue.bold("build  ") + chalk.cyan("[:bar]") + chalk.green.bold(':percent') + ' (' + chalk.magenta(":elapsed") + ' seconds) ',
            clear: false
        }),
        new CheckerPlugin(),
        new LodashModuleReplacementPlugin(),
    ]
};