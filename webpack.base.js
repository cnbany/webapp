const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const resolve = require('path').resolve

module.exports = {
    output: {
        path: resolve(__dirname, 'dist'),
        filename: './script/[name].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.json$/,
            type: 'javascript/auto'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 8129, //小于limit限制的图片将转为base64嵌入引用位置
                fallback: 'file-loader', //大于limit限制的将转交给指定的loader处理
                outputPath: './image/',
                name: '[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: 'file-loader',
            options: {
                outputPath: './fonts/',
                name: '[name].[hash:7].[ext]'
            }
        }, { // 命中 JavaScript 文件
            test: /\.js$/,
            // 用 babel-loader 转换 JavaScript 文件
            // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
            },
            // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
            // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
            enforce: 'post',
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
                to: './script'
            }
        ]),
    ],
    resolve: {
        alias: {
            '@': resolve('./src')
        }
    }
}
