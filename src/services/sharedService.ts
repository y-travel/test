import { requestGet } from './apiService';

const getAsyncEntities = async (val: any, update: any, abort: any, updateCallback: any, entityName: string, key: string, loading: any) => {
  if (val.length < 1) {
    abort();
    return;
  }
  loading = true;
  update(async () => {
    updateCallback((await requestGet(entityName, `filters[$and][0][${key}][$contains]=${val}`)).data);
    loading = false;
  });
  return true;
};

export { getAsyncEntities };
