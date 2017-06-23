const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: 'web',
	devtool: 'inline-source-map',

	resolve: {
		extensions: [
			".js"
		]
	    },
	entry: {
		app: [
			"./src/spinner/app.js"
		]
	},
	output: {
		path: path.join(__dirname, '/../../dist/spinner/'),
		filename: "[name].min.js"
	},
	module: {
		rules: [
      {
				test: /\.css$/,
				use: [
					{ loader: 'style-loader', options: { base: 2000 } },
					'css-loader'
				]
			},
			{
				test: /\.tag(.html)?$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        options: {
          //type: 'es6', // NO!!!
          hot: true,
          debug: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			hash: true,
			template: './src/spinner/index.html',
			filename: 'index.html'
		})
	]
};
