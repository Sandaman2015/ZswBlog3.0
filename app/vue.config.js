module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
<<<<<<< HEAD
        target: 'http://192.168.1.72:8004',
=======
        target: 'http://localhost:8004',
>>>>>>> 33299bb45c5492e58b2f8f5a4fbe72441ba03989
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