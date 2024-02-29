import { requestDelete, requestGet, requestUpsert } from './apiService';

// create send request to server
const getPosts = async (name = '', query?: '') =>
	(await requestGet(`${name}-posts`, query, { queryString: 'populate=image', noAuth: true }))?.data;
const getPage = async (name = '', query?: '') =>
	(await requestGet(`${name}-page`, query, { queryString: 'populate=image', noAuth: true }))?.data;
export { getPosts, getPage };
