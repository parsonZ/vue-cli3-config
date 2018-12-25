//获取文件入口
const path = require('path')
const glob = require('glob')
const fs = require('fs')
const getEntry = globPath => {
	let entries = {};
	glob.sync(globPath).map((item, index) => {
		let name = item.replace('src/pages/', 	'');
		let namePath = path.resolve(__dirname, item)
		entries[name] = {
			entry: namePath + '\\' + name + '.js',
			template: namePath + '\\' + name + '.html',
			filename: name + '.html',
			title: name,
			chunks: ['chunk-vendors', 'chunk-common', name]
		}
	})
	console.log(entries)
	return entries;
}

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? './'
    : './',

  outputDir: 'dist',

  assetsDir: 'static',

  filenameHashing: true,

  pages: getEntry('src/pages/*'),

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,

  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  configureWebpack: {
		resolve: {
			alias: {
				//目录别名配置
			}
		}
	},
  // webpack 链接 API，用于生成和修改 webapck 配置
  chainWebpack: (config) => {
    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    config.optimization
      .splitChunks({
        cacheGroups: {}
      });

    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    config.module
      .rule('eslint')
      .exclude
      .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
      .end()
  },

  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: true,

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: false,

    host: '127.0.0.1',

    port: 8080,

    https: false,

    hotOnly: false,

    proxy: null,

    before: app => {
    }
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {}
};
