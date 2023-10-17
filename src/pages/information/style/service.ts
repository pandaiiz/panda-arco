import request from '@/utils/request';

export const getStyleByPaging = (params): Promise<any> =>
  request.get(`/api/style/paging`, { params });
export const getStyleList = (): Promise<any> => request.get(`/api/style`);
export const addStyle = (data): Promise<any> =>
  request.post(`/api/style`, data);
export const updateStyle = (id, data): Promise<any> =>
  request.patch(`/api/style/${id}`, data);
export const deleteStyleById = (id): Promise<any> =>
  request.delete(`/api/style/${id}`);
export const getListByBaseCode = (baseStyleCode: string): Promise<any> =>
  request.get(`/api/style/baseCode/${baseStyleCode}`);
export const getListByFilter = (filter: string): Promise<any> =>
  request.get(`/api/style/filter/${filter}`);
