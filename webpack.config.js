/*
 * @LastEditTime: 2025-03-13 18:17:13
 * @Description: webpack默认名称的配置文件。是一个js文件，使用CommonJs模块化方案
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    
    context: path.resolve(__dirname, 'src'),            // context必须为绝对路径；是entry入口的前缀；省略时的默认值为Node.js 的当前工作目录
    entry: {
        bundle: './index.js',
        vendor: ['react'],
    },                                 // entry入口文件，默认值为./src/index.js; entry可以是string、array（单个chunk,最后一个作为入口文件）、object（多个chunk文件）、function
    // context: '/',
    // entry: './src/index.js',
    output: {                                           // output输出文件，默认值为./dist/main.js; output可以是string、object（多个chunk文件）
        filename: '[name].js',                            // 输出文件名，默认值为main.js;可使用占位符 name、id、contenthash、chunkhash
        path: path.resolve(__dirname, 'dist'),          // 输出路径，默认值为./dist; path必须是绝对路径
        publicPath: '/',
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common',
            filename: '[name]-[id].js',
        }
    },
    
    devtool: 'cheap-source-map',
    devServer: {
        port: 9090,
        static: './dist',
    },

    module: {                                            // 模块配置
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                    }
                }

            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, // 将css文件从js中分离出来
                    // 'style-loader', // 将css文件插入到页面中(js形式)
                    {
                        loader: 'css-loader',
                        options: {
                            // sourceMap: true,
                            modules: true,
                        }
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                include: /\.module\.scss$/i, // 限定这个规则只对 .module.scss 文件起作用
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                namedExport: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                            // localIdent: '[name]__[local]--[hash:base64:5]',
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',  // 内置loader,对标file-loader
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({                         // html插件，自动将bundle文件引入到 html 中
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
          })
    ],
    
}