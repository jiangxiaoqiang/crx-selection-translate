const path = require('path');
const webpack = require( 'webpack' ) ,
  CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin ,
  ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  entry : {
    bg : './src/background-scripts/' ,
    content : ['./src/content-scripts/firefox-fix.js', './src/content-scripts/'] ,
    options : './src/options/' ,
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
        test : /\.(css|scss)$/ ,
        use: ExtractTextPlugin.extract({
          fallback :'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass')
              }
            }]
        })
      }
    ]
  } ,
  plugins : [
    new CommonsChunkPlugin( {
      name : 'commons1',
      filename : 'commons1.js' , 
      allChunks: true,
      chunks : [ 'popup','content' ],
      chunksSortMode: 'manual',
    }) ,
    new CommonsChunkPlugin({ 
      name: 'commons2',
      filename :'commons2.js' , 
      allChunks: true,
      chunks : [ 'commons1.js' , 'options' ] 
    }) ,
    new CommonsChunkPlugin({ 
      name: 'commons3',
      filename :'commons3.js' , 
      allChunks: true,
      chunks : [ 'bg' , 'commons2.js' ] 
    }) ,
    new ExtractTextPlugin( '[name].css' )
  ]
};

