import request from '@/utils/request';

export const getUserByPaging = (params): Promise<any> =>
  request.get(`/api/user/paging`, { params });
export const getUserList = (): Promise<any> => request.get(`/api/user`);
export const getTeacherList = (): Promise<any> =>
  request.get(`/api/user/teacher`);
export const addUser = (data): Promise<any> => request.post(`/api/user`, data);
export const updateUser = (id, data): Promise<any> =>
  request.patch(`/api/user/${id}`, data);
export const deleteUserById = (id): Promise<any> =>
  request.delete(`/api/user/${id}`);
