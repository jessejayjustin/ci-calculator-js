const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: [
	  './src/index.js', 
	  './src/css/all.css'
	],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	devServer: {
		port: 3001,
		contentBase: path.join(__dirname, 'public')
	},

	plugins: [
	    new MiniCssExtractPlugin({
	      filename: 'style.css'
	    }),
	    new webpack.ProvidePlugin({
		   $: 'jquery',
		   jQuery: 'jquery'
	    }),
	    new HtmlWebpackPlugin({
		   template: './public/index.html'
		}),
    ], 

	module: {
		rules: [
	      {
	        test: /\.js$/,
	        exclude: [/node_modules/],
	        use: {
	          loader: 'babel-loader'
	        },
	      },
	      {
	        test: /\.(png|jpg|gif)$/,
	        use: [{
	            loader: 'file-loader',
	            options: {}
	        }]
	      },
	      {
	        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
	        use: 'url-loader?limit=100000'
	      },
	      {
	        test: /\.css$/, 
	        use: [
	          { loader: MiniCssExtractPlugin.loader },
	          'css-loader',
            ],
	      },
        ],
	},

	devtool: 'source-map',

	mode : devMode ? 'development' : 'production',
};