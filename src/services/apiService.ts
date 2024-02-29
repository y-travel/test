import { AxiosRequestConfig } from 'axios';
import { IAxiosRequestConfig, api } from 'boot/axios';
//@TODO clean,
/*api response e.g.
{
	data:[] || {},
	meta:{

	}
}
*/

const defaultCreateMessage: INotifyMessage = {
	notify: true,
	successMessage: 'successCreate',
	failedMessage: 'failedCreate',
};
const defaultEditMessage: INotifyMessage = {
	notify: true,
	successMessage: 'successEdit',
	failedMessage: 'failedEdit',
};
const defaultRemoveMessage: INotifyMessage = {
	notify: true,
	successMessage: 'successRemove',
	failedMessage: 'failedRemove',
};

const getFullURL = (url: string, queryString = '') => `/api/${url}${queryString ? `?${queryString}` : ''}`;

const request = async (config: IAxiosRequestConfig) => await api.request(config).catch((err) => ({ data: null, error: err }));

const requestGet = async (entity: string, queryString = '', config?: IApiRequestConfig) =>
	await request({ url: getFullURL(entity, queryString), ...(config ?? {}) } as IAxiosRequestConfig);

const requestUpsert = async (entity: string, id: string | undefined, data: any, config?: IApiRequestConfig) => {
	return await request({
		data: { data: data, ...(config?.extraData ?? {}) },
		url: getFullURL(id ? (entity.indexOf(':id') > 0 ? `${entity.replace(':id', id)}` : `${entity}/${id}`) : entity, config?.queryString ?? ''),
		method: id ? 'put' : 'post',
		defaultNotify: id ? defaultEditMessage : defaultCreateMessage,
		...(config ?? {}),
	} as IAxiosRequestConfig);
};

const requestDelete = async (entity: string, queryString = '', config?: IApiRequestConfig) =>
	await request({
		url: getFullURL(entity, queryString),
		method: 'delete',
		defaultNotify: defaultRemoveMessage,
		...(config ?? {}),
	} as IAxiosRequestConfig);

export { request, requestGet, requestUpsert, requestDelete };
