const path = require('path');
const glob = require('glob');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const mode =
	process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
	mode: mode,
	entry: {
		dashboard: glob.sync('./dashboard/**/*.ts'),
		graphics: glob.sync('./graphics/**/*.ts'),
	},
	output: {
		path: __dirname,
		filename: '[name]/out.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.browser.json',
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			'/bundles/gdqx18-layouts/node_modules': path.resolve(
				__dirname,
				'node_modules'
			),
		},
	},
	target: 'web',
	devtool: 'inline-source-map',
	plugins: [
		new ForkTsCheckerWebpackPlugin({tsconfig: 'tsconfig.browser.json'}),
	],
};
