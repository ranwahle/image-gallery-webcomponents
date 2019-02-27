const path = require('path');
const webpack = require('webpack');



module.exports = {
    entry: './src/components.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {

        rules:
            [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ],


    },
    devServer: {
        clientLogLevel: 'none',
        proxy: require('./webpack-proxy')
    }
}
;
