/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configure } = require('quasar/wrappers');
const extendWebpack = require('./webpack-config.js');
const path = require('path');
const pkg = require(path.resolve(__dirname, 'package.json'));
const envConfig = { ...require('dotenv').config().parsed, ...process.env };

console.log('version:', pkg.version);

module.exports = configure(function (ctx) {
	return {
		// https://quasar.dev/quasar-cli/supporting-ts
		supportTS: {
			tsCheckerConfig: {
				eslint: {
					enabled: false,
					files: './src/**/*.{ts,tsx,js,jsx,vue}',
				},
			},
		},

		// https://quasar.dev/quasar-cli/prefetch-feature
		// preFetch: true,

		// app boot file (/src/boot)
		// --> boot files are part of "main.js"
		// https://quasar.dev/quasar-cli/boot-files
		boot: ['i18n', 'axios', 'filter', 'service', 'utils'],

		// https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
		css: ['app.scss'],

		// https://github.com/quasarframework/quasar/tree/dev/extras
		extras: [
			// 'ionicons-v4',
			// 'mdi-v5',
			// 'fontawesome-v5',
			// 'eva-icons',
			// 'themify',
			'line-awesome',
			// 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

			// 'material-icons', // optional, you are not bound to it
		],
		htmlVariables: {
			version: pkg.version,
		},
		sourceFiles: {
			rootComponent: 'src/App.tsx',
		},
		// Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
		build: {
			//publicPath: process.env.NODE_ENV === "production" ? "/app" : ".",
			transpile: true,
			transpileDependencies: [/quasar-ui-qcalendar[\\/]src/],

			vueRouterMode: 'hash', // available values: 'hash', 'history'

			extendWebpack,
			// transpile: false,
			// publicPath: '/',
			env: envConfig,

			// Add dependencies for transpiling with Babel (Array of string/regex)
			// (from node_modules, which are by default not transpiled).
			// Applies only if "transpile" is set to true.
			// transpileDependencies: [],

			rtl: true, // https://quasar.dev/options/rtl-support
			// preloadChunks: true,
			// showProgress: false,
			// gzip: true,
			// analyze: true,

			// Options below are automatically set depending on the env, set them if you want to override
			// extractCSS: false,

			// https://quasar.dev/quasar-cli/handling-webpack
			// "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
			chainWebpack(config) {
				config.module
					.rule('scss')
					.oneOf('normal')
					.use('sass-loader')
					.tap((options) => {
						options.additionalData = `@import '@/src/css/build.variables.scss';`; //not used , just for sample of importing extra scss variables just during build
						return options;
					});
			},
		},

		// Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
		devServer: {
			// onBeforeSetupMiddleware(devServer) {
			// 	devServer.app.use('/app', function(req, res, next) {
			// 	  req.url = req.url.replace(/^\/app/, '/');
			// 	  next();
			// 	});
			//   },
			server: {
				type: 'http',
			},
			open: true, // opens browser window automatically
			port: 9090,
			proxy: {
				// proxy all requests starting with /api to jsonplaceholder
				'/api': {
					target: `${envConfig.API_SERVER}/api`,
					changeOrigin: true,
					pathRewrite: {
						'^/api': '',
					},
				},
				'/uploads': {
					target: `${envConfig.API_SERVER}/uploads`,
					changeOrigin: true,
					pathRewrite: {
						'^/uploads': '',
					},
				},
			},
		},

		// https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
		framework: {
			lang: 'fa',
			config: {},

			iconSet: 'line-awesome', // Quasar icon set
			// lang: 'en-US', // Quasar language pack

			// For special cases outside of where the auto-import strategy can have an impact
			// (like functional components as one of the examples),
			// you can manually specify Quasar components/directives to be available everywhere:
			//
			// components: [],
			// directives: [],

			// Quasar plugins
			plugins: ['Notify', 'Dialog', 'Loading'],
		},

		// animations: 'all', // --- includes all animations
		// https://quasar.dev/options/animations
		animations: [],

		// https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
		ssr: {
			pwa: false,

			// manualStoreHydration: true,
			// manualPostHydrationTrigger: true,

			prodPort: 3000, // The default port that the production server should use
			// (gets superseded if process.env.PORT is specified at runtime)

			maxAge: 1000 * 60 * 60 * 24 * 30,
			// Tell browser when a file from the server should expire from cache (in ms)

			chainWebpackWebserver(/* chain */) {
				//
			},

			middlewares: [
				ctx.prod ? 'compression' : '',
				'render', // keep this as last one
			],
		},

		// https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
		pwa: {
			workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
			workboxOptions: {}, // only for GenerateSW

			// for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
			// if using workbox in InjectManifest mode
			chainWebpackCustomSW(/* chain */) {
				//
			},

			manifest: {
				name: 'taha',
				short_name: 'taha',
				description: 'سیستم رزرواسیون طاها',
				display: 'standalone',
				orientation: 'portrait',
				background_color: '#ffffff',
				theme_color: '#027be3',
				icons: [
					{
						src: 'icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png',
					},
					{
						src: 'icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icons/icon-256x256.png',
						sizes: '256x256',
						type: 'image/png',
					},
					{
						src: 'icons/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png',
					},
					{
						src: 'icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		},

		// Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
		cordova: {
			// noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
		},

		// Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
		capacitor: {
			hideSplashscreen: true,
		},

		// Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
		electron: {
			bundler: 'packager', // 'packager' or 'builder'

			packager: {
				// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
				// OS X / Mac App Store
				// appBundleId: '',
				// appCategoryType: '',
				// osxSign: '',
				// protocol: 'myapp://path',
				// Windows only
				// win32metadata: { ... }
			},

			builder: {
				// https://www.electron.build/configuration/configuration

				appId: 'taha',
			},

			// "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
			chainWebpack(/* chain */) {
				// do something with the Electron main process Webpack cfg
				// extendWebpackMain also available besides this chainWebpackMain
			},

			// "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
			chainWebpackPreload(/* chain */) {
				// do something with the Electron main process Webpack cfg
				// extendWebpackPreload also available besides this chainWebpackPreload
			},
		},
	};
});
