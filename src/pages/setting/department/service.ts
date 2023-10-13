import request from '@/utils/request';

export const getDepartmentByPaging = (params): Promise<any> =>
  request.get(`/api/department/paging`, { params });
export const getDepartmentList = (): Promise<any> =>
  request.get(`/api/department`);
export const addDepartment = (data): Promise<any> =>
  request.post(`/api/department`, data);
export const updateDepartment = (id, data): Promise<any> =>
  request.patch(`/api/department/${id}`, data);
export const deleteDepartmentById = (id): Promise<any> =>
  request.delete(`/api/department/${id}`);
