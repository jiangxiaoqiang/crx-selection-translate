const path = require('path');
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
  entry : {
    bg : './src/background-scripts/' ,
    content : ['./src/content-scripts/firefox-fix.js', './src/content-scripts/'] ,
    options : [
      './src/options/'
    ],
    popup : './src/popup/' ,
    'bs-lite' : './src/public/bootstrap-lite.scss'
  } ,
  output : {
    path : path.resolve(__dirname, '../src/bundle') ,
    filename : '[name].js'
  } ,
  module : {
    rules : [
      {
        test : /\.js$/ ,
        exclude : [ /node_modules(?!(\/|\\?\\)(translation\.js|selection-widget|connect\.io|chrome-env)\1)/ ] ,
        loader : 'babel-loader'
      } ,
      {
        test : /\.woff$/ ,
        loader : 'file-loader' ,
        query : {
          name : '[name].[ext]'
        }
      } ,
      {
        test : /\.html$/ ,
        loader : 'vue-html-loader'
      } , 
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test : /\.(scss)$/ ,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons1: {
          name: 'commons1',
          chunks: 'all',
          minChunks: 1,
          test(module,chunks){
            for (const chunk of module.chunksIterable) {
              if (chunk.name && /(popup|content)/.test(chunk.name)) {
                   return true;
              }
            }
            return false;
          }
        },
        commons2: {
          name: 'commons2',
          chunks: 'all',
          minChunks: 1,
          test(module,chunks){
            for (const chunk of module.chunksIterable) {
              if (chunk.name && /(options|commons1)/.test(chunk.name)) {
                   return true;
              }
            }
            return false;
          }
        },
        commons3: {
          name: 'commons3',
          chunks: 'all',
          minChunks: 1,
          test(module,chunks){
            for (const chunk of module.chunksIterable) {
              if (chunk.name && /(bg|commons2)/.test(chunk.name)) {
                   return true;
              }
            }
            return false;
          }
        },
      }
    }
  },
  plugins : [
    new MiniCssExtractPlugin()
  ]
};

