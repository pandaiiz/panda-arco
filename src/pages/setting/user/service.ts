import request from '@/utils/request';

export const getUsersByPaging = (params): Promise<any> =>
  request.get(`/api/user/paging`, { params });
export const addUsers = (data): Promise<any> => request.post(`/api/user`, data);
export const updateUsers = (id, data): Promise<any> =>
  request.patch(`/api/user/${id}`, data);
export const deleteUsersById = (id): Promise<any> =>
  request.delete(`/api/user/${id}`);
