import { requestGet } from './apiService';

const getCities = async () => (await requestGet('cities', ``, { noAuth: true } as any)).data;

export { getCities };
