import { App } from 'vue';
import { loc } from 'src/boot/i18n';
import { IAxiosRequestConfig } from 'boot/axios';

class NotifyService {
	_$q: any;
	constructor(app: App) {
		this._$q = app.config.globalProperties.$q;
	}
	messageHandler(config: { data: any; config: IAxiosRequestConfig }) {
		if (config.config?.defaultNotify?.notify && config.config.defaultNotify.successMessage) {
			this._$q.notify({
				type: 'positive',
				message: loc(config.config.defaultNotify.successMessage ?? '', config.config.defaultNotify.messageParams),
			});
		}
		return config;
	}
}

export { NotifyService };
