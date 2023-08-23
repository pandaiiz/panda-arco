import request from '@/utils/request';

export const getSpecificationsByPaging = (params): Promise<any> =>
  request.get(`/api/specifications/paging`, { params });
export const addSpecifications = (data): Promise<any> =>
  request.post(`/api/specifications`, data);
export const updateSpecifications = (id, data): Promise<any> =>
  request.patch(`/api/specifications/${id}`, data);
export const deleteSpecificationsById = (id): Promise<any> =>
  request.delete(`/api/specifications/${id}`);
