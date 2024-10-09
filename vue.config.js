const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  productionSourceMap: false, //不输出map文件
  configureWebpack: {
    devServer: {
      historyApiFallback: true,
    },
  },
})
