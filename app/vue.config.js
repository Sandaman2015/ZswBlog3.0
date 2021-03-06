module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:8004',
        changeOrigin: true
      }
    },
    before: () => {}
  },
  publicPath: "/",
  lintOnSave: false,
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "ZswBlog";
        return args;
      })
  }
}