module.exports = {
  configureWebpack: {
    externals: {
      'axios': 'axios',
      'echarts': 'echarts'
    }
  },
  devServer: {
    proxy: 'http://jlccwss.vicp.cc:18888'
  }
}