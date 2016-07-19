'use strict';
/**
 * Created by Ben Hu on 2016/3/2.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'bundle.js'
    },
    plugins: [
    /** Minify the bundle.js */
        new webpack.optimize.UglifyJsPlugin({
            include: /\.js$/,
            minimize: true
        }),
    /** 按引用頻度來排序 ID，以便達到減少文件大小的效果 */
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel?compact=false'
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    "resolve": {
        "extensions": [
            "",
            ".js",
            ".jsx"
        ]
    }
};