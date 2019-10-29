
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let cdn = process.env.PUBLIC_PATH || './';

const isUat = !!process.env.UAT_ENV === 'uat';

module.exports = (env, argv) => ({
	entry: './src/index.js',
	context: path.resolve(__dirname),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'build.js',
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
					loader: 'babel-loader'
				},
				exclude: /node_modules/
			}, {
				test: /\.(scss|css)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name][hash:base64:8]'
							},
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}, {
				test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
				use: 'file-loader'
			}, {
				test: /\.(jpe?g|png|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			}, {
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
							removeComments: false,
							collapseWhitespace: false
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json', '.less', '.scss', '.css', '.html'],
		alias: {
			'~': path.resolve(__dirname, 'src') // root
		}
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin(),
		new CopyWebpackPlugin([ // 复制插件
			{ from: path.join(__dirname, 'src/public'), to:  path.join(__dirname,'dist/public') }
		])
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
		host: 'localhost',
		publicPath: '/',
		historyApiFallback: true
	}
});
