module.exports = {
  configureWebpack: {
    externals: {
      'echarts': 'echarts'
    }
  },
  devServer: {
    proxy: 'http://jlccwss.vicp.cc:18888'
  }
}