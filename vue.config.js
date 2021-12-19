// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('shaders')
      .test(/\.(frag|vert|glsl)$/)
      .use('ts-shader-loader')
      .loader('ts-shader-loader')
      .end()
    config.module
      .rule('objects')
      .test(/\.obj$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
