const {join:pathJoin, resolve} = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry:{
        app:'./src/main.js'
    },
    output:{
        filename:'[name].[hash]].js',
        path:pathJoin(__dirname,'./dist')
    },
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'axios': 'axios',
        'echarts': 'echarts'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'src/index.html',
            filename:'index.html'
        }),
        new VueLoaderPlugin(), // +++
        new CleanWebpackPlugin()
    ],
    resolve: { // 路径别名
        alias: { 
            '@': resolve('src')
        }
    }
}