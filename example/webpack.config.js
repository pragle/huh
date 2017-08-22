var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './client.js',
    output: {
        path: __dirname,
        filename: './build/client.js'
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015'],
                    plugins: [
                        'transform-class-properties',
                        "syntax-jsx",
                        ["transform-react-jsx", { "pragma": "huh.replace" }]
                    ]
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loaders: ['url-loader?limit=100000']
            }
        ]
    },
    plugins: [
    ]
};
