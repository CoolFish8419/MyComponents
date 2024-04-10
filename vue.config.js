const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// // 配置接口输出文件
// var GenerateAssetPlugin = require('generate-asset-webpack-plugin');
// var createServerConfig = function(compilation){
//   // 配置需要的api接口
//   const cfgJson = {
//     VUE_APP_SERVE_URL: 'https://mazutempletest.warmheart.top/institution-server',
//   }
//   return JSON.stringify(cfgJson);
// }
module.exports = {
  // 选项...
  chainWebpack: config => {
    config.resolve.alias .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))


},

  publicPath: "./",
  assetsDir: "",
  indexPath: "index.html",
  lintOnSave: false,
  devServer: {
    port: 8081
  },
  transpileDependencies:['csui'],
  productionSourceMap:false,
  css: {
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: true,
  }
}