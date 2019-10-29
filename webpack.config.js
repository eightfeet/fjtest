
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const DefinePlugin = webpack.DefinePlugin;

let cdn = process.env.PUBLIC_PATH || './';

const evn = process.env.UAT_ENV;
const isUat = evn === 'uat' ? true : false;

module.exports = (env, argv) => ({
	entry: './src/index.js',
	context: path.resolve(__dirname),
	output: {
		library: '___Modal___',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist'),
		filename: 'modal.js',
		publicPath: argv.mode === 'development' ? '/' : cdn
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ["@babel/plugin-proposal-class-properties"]
					}
				},
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".jsx", ".js", ".json", ".less", ".scss", ".css", ".html"],
		alias: {
			modules: path.resolve(__dirname, "src/modules"), // used for tests
			style: path.resolve(__dirname, "src/style"),
			core: path.resolve(__dirname, "src/core"),
			"~": path.resolve(__dirname, "src") // root
		}
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin()
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({ sourceMap: true }),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		compress: true,
		port: 9000,
		// host: '0.0.0.0',
		host: 'localhost',
		publicPath: '/',
		historyApiFallback: true,
		proxy: {
			"/mf": {
				target: "http://wx-test1.by-health.com",
				changeOrigin: true
			}
		  }
	}
});
