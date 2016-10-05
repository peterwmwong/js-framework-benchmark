'use strict';

module.exports = {
	entry: {
		main: './src/Main.jsx',
	},
	output: {
		path: 'dist',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	}
};
