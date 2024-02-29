interface IApiService {
	request(config: IApiRequestConfig): Promise<any>;

	requestGet(entity: string, queryString?: string, config?: IApiRequestConfig): Promise<any>;

	requestUpsert(entity: string, id: string | undefined, data: any, config?: IApiRequestConfig): Promise<any>;

	requestDelete(entity: string, queryString?: string, config?: IApiRequestConfig): Promise<any>;
}
interface INotifyMessage {
	notify: boolean;
	successMessage?: string;
	failedMessage?: string;
	messageParams?: [];
}
interface IApiRequestConfig {
	queryString?: string;
	axiosConfig?: any;
	noAuth?: boolean;
	defaultNotify?: INotifyMessage;
	loc?: { items: string[] };
	extraData?: any;
}
