import { requestGet } from './apiService';

const getAgenciesAsync = async (val: any, update: any, abort: any, callback: any) => {
  if (val.length < 1) {
    abort();
    callback([]);
    return;
  }
  update(async () => {
    const tmpData = (await requestGet('agencies', `filters[$and][0][name][$contains]=${val}`)).data;
    callback(tmpData);
  });
};

export { getAgenciesAsync };
