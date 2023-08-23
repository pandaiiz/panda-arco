import request from '@/utils/request';

export const getMenus = (): Promise<any> => request.get(`/api/menu`);
export const addMenu = (data): Promise<any> => request.post(`/api/menu`, data);
export const updateMenu = (id, data): Promise<any> =>
  request.patch(`/api/menu/${id}`, data);
export const deleteMenuById = (id): Promise<any> =>
  request.delete(`/api/menu/${id}`);
