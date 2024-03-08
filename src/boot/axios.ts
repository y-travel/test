import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ErrorService } from 'src/services/errorService';
import { NotifyService } from 'src/services/notifyService';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$axios: AxiosInstance;
	}
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({
// 	baseURL: process.env.API_SERVER == 'self' ? '' : process.env.API_SERVER,
// });



const api = axios.create({
	baseURL: 'http://stage.tourine.ir/server',
});

interface IAxiosRequestConfig extends IApiRequestConfig, InternalAxiosRequestConfig<any> {}

export default boot(({ app }) => {
	// for use inside Vue files (Options API) through this.$axios and this.$api
	api.interceptors.request.use((config: IAxiosRequestConfig) => {
		const token = Utils.auth.getCurrentToken();
		if (token && config.headers && !config.noAuth) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});
	api.interceptors.response.use(
		(config) => new NotifyService(app).messageHandler(config).data,
		(err) => new ErrorService(app).errorHandler(err)
	);
	app.config.globalProperties.$axios = axios;
	// ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
	//       so you won't necessarily have to import axios in each vue file

	app.config.globalProperties.$api = api;
	// ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
	//       so you can easily perform requests against your app's API
});

export { api, IAxiosRequestConfig };
