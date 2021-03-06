'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {
    //   "/deehow-CMS-Web": {
    //     "target": "http://deehow.vicp.cc:8501",
    //     "changeOrigin": true,
    //   },
    // },
    proxyTable: {
      "/deehow-CMS-Web": {
        "target": "http://39.105.43.10",
        "changeOrigin": true,
      },
      "/deehow-ELIBM-Web": {
        "target": "http://39.105.43.10",
        "changeOrigin": true,
      },
      "/deehow-BPM-Web": {
        "target": "http://39.105.43.10",
        "changeOrigin": true,
      },
      "/unauthorized": {
        "target": "http://39.105.43.10",
        "changeOrigin": true,
      },
      "/qingqiu": {
        "target": "http://39.105.43.10",
        "changeOrigin": true
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,// 是否默认打开浏览器
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    disableHostCheck: true, //外网ip是否可以访问
    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../LoingRegisterAndHome/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../LoingRegisterAndHome'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/LoingRegisterAndHome/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
