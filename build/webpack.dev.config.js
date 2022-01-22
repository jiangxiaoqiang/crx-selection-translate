const path = require('path');
const webpack = require( 'webpack' ) ,
config = require( './webpack.base.config' );

config.output.path = path.resolve(__dirname, '../src/bundle') ;
config.devtool = 'source-map';
config.watch = true;
config.plugins.push( new webpack.DefinePlugin( {
} ) );

module.exports = config;
