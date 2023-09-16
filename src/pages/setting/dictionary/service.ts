import request from '@/utils/request';

export const getDicts = (): Promise<any> => request.get(`/api/dictionary`);
export const getDictsItemById = (id): Promise<any> =>
  request.get(`/api/dictionary/item/${id}`);
export const addDict = (data): Promise<any> =>
  request.post(`/api/dictionary`, data);
export const addDictItem = (data): Promise<any> =>
  request.post(`/api/dictionary/item`, data);

export const updateDict = (id, data): Promise<any> =>
  request.patch(`/api/dictionary/${id}`, data);
export const updateDictItem = (id, data): Promise<any> =>
  request.patch(`/api/dictionary/item/${id}`, data);
export const deleteDictById = (id): Promise<any> =>
  request.delete(`/api/dictionary/${id}`);
export const deleteDictItemById = (id): Promise<any> =>
  request.delete(`/api/dictionary/item/${id}`);
