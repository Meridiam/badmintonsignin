var path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !== "production";

module.exports = {
	entry: './js/app.js',
	mode: 'development',
	context: __dirname + "/src",
	output: {
		path: __dirname + "/src/",
		filename: 'app.min.js'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'react'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
				}
			}
		]
	},
	stats: {
		colors: true
	},
	devtool: debug ? 'inline-sourcemap' : null,
	plugins: debug ? [] : [
		new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin()
	]
};
