const path = require('path');
const HtmlWbpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : "tictactoe-bundler.js"
    },
    mode : "development",
    module :{
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            },
            {       
                test : /\.(css|scss)$/,
                exclude : /node_modules/,
                use : ExtractTextWebpackPlugin.extract({
                    fallback : 'style-loader',
                    use : 'css-loader!sass-loader'
                })
            }
        ]
    },
    plugins : [
        new HtmlWbpackPlugin({
        template : './src/index.html'
        }),
        new ExtractTextWebpackPlugin('style.css')
    ]
}