var vue = require('vue-loader');
var webpack = require('webpack');

//独立样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = function(config){
  var moduleExports = {
    entry: config.entry,
    output: config.output,
    module: {
      loaders: [
        {
          test: /\.vue$/,
          loader: 'vue'
        },
        {
          test: /\.js$/,
          // excluding some local linked packages.
          // for normal use cases only node_modules is needed.
          exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
          loader: 'babel'
        }
      ]
    },
    vue: {
      loaders: {
        css: ExtractTextPlugin.extract("css")
      }
    },
    babel: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
    }
  };

  if (config.env === 'production') {
    moduleExports.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
      //会将所有的样式文件打包成一个单独的style.css
      //new ExtractTextPlugin("style.[hash].css" , {
      //  disable: false//,
      //  //allChunks: true  //所有独立样式打包成一个css文件
      //})
    ]
  } else {
    moduleExports.devtool = '#source-map';
    moduleExports.plugins = [
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: "'" + config.env + "'"
          }
      })
    ]
  }


  return moduleExports
};


