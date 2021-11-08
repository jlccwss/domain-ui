const CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path')
let libDir = path.resolve('src/lib');
let imgDir = path.resolve('src/assets');
let echartPath = path.resolve(libDir, 'echarts.min.js');
let normalizePath = path.resolve(libDir, 'normalize.min.css');
let faviconPath = path.resolve(imgDir, 'favicon.png');

module.exports = {
  configureWebpack: {
    externals: {
      'echarts': 'echarts'
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {from: echartPath, to: './lib'},
          {from: normalizePath, to: './lib'},
          {from: faviconPath, to: './img'}
        ]
      })
    ]
  },
  // chainWebpack: config => {
  //   config.plugin('copy')
  //     .use(CopyPlugin, [
  //       {
  //         patterns: [{from: echartPath, to: './lib'}]
  //       }
  //     ])
  // },
  devServer: {
    proxy: 'https://jlccwss.vicp.cc:18888'
  }
}


// [
//   [{from: echartPath, to: './lib'}]
// ]