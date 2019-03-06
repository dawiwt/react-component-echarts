const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './demo/index.js',
        tools: './tools/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'gh-pages'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'react-echarts': path.resolve(__dirname, 'src/index.js')
        }
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './demo/index.html',
            filename: './index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            template: './tools/index.html',
            filename: './tools.html',
            chunks: ['tools']
        })
    ]
}
