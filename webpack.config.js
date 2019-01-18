const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './demo/index.js',
    output: {
        filename: 'app.js'
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
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        historyApiFallback: true,
        compress: true,
        host: '0.0.0.0',
        port: 6321
    }
}
