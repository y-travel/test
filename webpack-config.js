
const path = require('path');

module.exports = cfg => {
	cfg.module.rules.push({
		test: /\.pug$/,
		loader: 'pug-plain-loader'
	})

	cfg.resolve.alias = {
		...cfg.resolve.alias,
		utils: path.resolve(__dirname, 'src/utils'),
		services: path.resolve(__dirname, 'src/services'),
		'@components': path.resolve(__dirname, 'src/components'),
		vue$: 'vue/dist/vue.esm-bundler.js',
		'@': path.resolve(__dirname, './')
	};

	cfg.resolve.extensions.push('.tsx');
	cfg.module.rules.push({
		test: /\.ts(x?)$/,
		exclude: /(node_modules|quasar)/,
		use: [
			{
				loader: 'babel-loader',
				options: { babelrc: true }
			},
			{
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/],
					transpileOnly: true

				}
			}
		]
	});
	//@TODO we couldn't find DefinePlugin inside plugins with just name index
	cfg.plugins[2].definitions['$img-base-url'] = JSON.stringify('../cms');
	return cfg
}