const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './demo/index.js',
        tools: './tools/index.js'
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'cheap-eval-source-map',
    resolve: {
        alias: {
            'react-echarts': path.resolve(__dirname, 'src/index.js')
        }
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
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
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        compress: true,
        host: '0.0.0.0',
        port: 6321
    }
}
