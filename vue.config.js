const antdTheme = require("./src/assets/css/antd-theme")

module.exports = {
  // 如果发布时
  // publicPath: process.env.NODE_ENV === 'production' ? './': '/',
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      // 自定义ant-design主题
      // less: {
      //   modifyVars: {
      //     'primary-color': '#1DA57A',
      //     'link-color': '#1DA57A',
      //     'border-radius-base': '2px',
      //   },
      //   javascriptEnabled: true
      // }
    }
  }
}
