const path = require('path');
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin');
const HtmlWebpackPlugin = require( 'html-webpack-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
      return recursiveIssuer(m.issuer)
  } else if (m.name) {
      return m.name
  } else {
      return false
  }
}

module.exports = {
  entry : {
    bg : './src/background-scripts/' ,
    content : ['./src/content-scripts/firefox-fix.js', './src/content-scripts/'] ,
    options : [
      './src/options/'
    ],
    popup : './src/popup/' ,
    'bs-lite' : './src/public/bootstrap-lite.scss',
    'bs-lite1' : './src/public/bootstrap1.scss'
  } ,
  resolve: {
    alias: {
        // https://stackoverflow.com/questions/50805384/module-not-found-error-cant-resolve-vue-path-not-correct
        vue: 'vue/dist/vue.esm-bundler.js'
    },
  },
  output : {
    path : path.resolve(__dirname, '../src/bundle') ,
    filename : '[name].js'
  },
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
        options : {
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        bsLiteStyles :{
          name: 'bs-lite',
          test: /bootstrap-lite\.(scss)$/,
          chunks: 'all',
          enforce: true
        },
        popupStyles: {
          name: 'popup',
          test: /popup\.(scss)$/,
          chunks: 'all',
          enforce: true
        },
        commomStyles: {
          name: 'commons1',
          test: /bootstrap1\.(scss)$/,
          chunks: 'all',
          enforce: true
        },
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup/index.html'
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ]
};

