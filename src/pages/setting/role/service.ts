import request from '@/utils/request';

export const getRoles = (): Promise<any> => request.get(`/api/role`);
export const addRole = (data): Promise<any> => request.post(`/api/role`, data);
export const updateRole = (id, data): Promise<any> =>
  request.patch(`/api/role/${id}`, data);
export const deleteRoleById = (id): Promise<any> =>
  request.delete(`/api/role/${id}`);
