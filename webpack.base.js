const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const resolve = require('path').resolve


module.exports = {
    output: {
        path: resolve(__dirname, 'dist'),
        filename: './js/[name].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, { // 命中 SCSS 文件
            test: /\.scss$/,
            // 使用一组 Loader 去处理 SCSS 文件。
            // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
            use: ['style-loader', 'css-loader', 'sass-loader'],
            // 排除 node_modules 目录下的文件
            exclude: resolve(__dirname, 'node_modules'),
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            loader: 'file-loader'
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: 'file-loader'
        }, { // 命中 JavaScript 文件
            test: /\.js$/,
            // 用 babel-loader 转换 JavaScript 文件
            // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
            use: ['babel-loader?cacheDirectory'],
            // 只命中src目录里的js文件，加快 Webpack 搜索速度
            include: resolve(__dirname, 'src'),
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            )
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            // './src/templates/api.js',
            {
                from: './src/templates/fastclick.min.js',
                to: './js'
            }
        ]),
    ],
    resolve: {
        alias: {
            '@': resolve('./src')
        }
    }
}
