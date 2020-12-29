const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development', // 不压缩代码,加快编译速度
    devtool: 'source-map', // 提供源码映射文件调试使用
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader','css-loader'] // 使用vue-style-loader直接插入到style标签中
            },
            {
                test: /\.scss$/,
                use: ['vue-style-loader','css-loader', 'sass-loader'] // 使用vue-style-loader直接插入到style标签中
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        proxy: {
            '/apis': 'http://jlccwss.vicp.cc:18888'
        }
    }
});