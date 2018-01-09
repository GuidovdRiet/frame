const { DefinePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const javascript = {
    test: /\.(js)$/,
    use: [
        {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
        }
    ]
};

module.exports = {
    entry: ['babel-polyfill', './public/javascripts/frame-app.js'],
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            javascript,
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: path.resolve(__dirname, 'public/dist')
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.bundle.css'),
        new DefinePlugin({
            'typeof window': '"object"'
        })
    ]
};
