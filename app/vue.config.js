module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "./",
  lintOnSave: false,
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "ZswBlog";
        return args;
      })
  }
}