import { App } from 'vue';

import { loc } from 'src/boot/i18n';
import { removeAuthentication } from 'src/utils/auth';
import _camelCase from 'lodash/camelCase';

const strapiErrorLocalization = (response: any, defaultMsg?: string, locItems?: any[]) => {
	return loc(
		response?.status < 500
			? response.data.error.name == 'locError'
				? response.data?.error.message
				: `msg.${_camelCase(response.data?.error.message)}` //@TODO clean ,should be return from server
			: defaultMsg ?? 'error',
		(locItems as []) ?? []
	);
};
class ErrorService {
	_$q: any;
	constructor(app: App) {
		this._$q = app.config.globalProperties.$q;
	}
	errorHandler = (error: { response: any; config: IApiRequestConfig }) => {
		if (!error.response?.status || error.response.error == 'NetworkError') {
			this._$q.notify(loc(`msg.networkError`));
		}
		if (!error.response) {
			return Promise.reject(error);
		}
		if (error.response.status == 401) {
			removeAuthentication();
			window.location.reload();
		}
		if (!error.config.defaultNotify?.notify) {
			return Promise.reject(error.response);
		}

		this._$q.notify({
			type: 'negative',
			message: loc(strapiErrorLocalization(error.response, error.config.defaultNotify?.failedMessage ?? '', error.config?.loc?.items ?? [])),
		});
		return Promise.reject(error.response);
	};
}

export { strapiErrorLocalization, ErrorService };
