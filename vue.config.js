'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // 新版的webpack-dev-server增加了安全验证，默认检查hostname，如果hostname不是配置内的，将中断访问。
    disableHostCheck: true
  },
  // pwa和添加以下代码即可更换favicon。
  pwa: {
    iconPaths: {
      favicon32     : 'favicon.ico',
      favicon16     : 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon      : 'favicon.ico',
      msTileImage   : 'favicon.ico'
    }
  },
  // configureWebpack: {
  //   resolve: {
  //     extensions: ['.js', '.vue', '.json'],
  //     alias: {
  //       'vue$': 'vue/dist/vue.esm.js',
  //       '@': resolve('src'), 
  //     }
  //   },
  // },
  configureWebpack : {
    performance: {
      hints:'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))

    // config.resolve.alias.set('@images', resolve('./src/assets/images'))
    // config.resolve.alias.set('@svg', resolve('./src/icons/svg'))
    // config.module.rules.delete('svg')
    // set svg-sprite-loader
   
    config.module
      .rule('icons')
      .test(/\.(svg)(\?.*)?$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
  }
}
