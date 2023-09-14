import request from '@/utils/request';

export const getOrderByPaging = (params): Promise<any> =>
  request.get(`/api/order/paging`, { params });
export const getSpecificationByCode = (code): Promise<any> =>
  request.get(`/api/specifications/code/${code}`);
export const getOrderDetailsById = (id): Promise<any> =>
  request.get(`/api/order/details/${id}`);
export const addOrder = (data): Promise<any> =>
  request.post(`/api/order`, data);
export const updateOrder = (id, data): Promise<any> =>
  request.patch(`/api/order/${id}`, data);
export const deleteOrderById = (id): Promise<any> =>
  request.delete(`/api/order/${id}`);
export const deleteOrderDetailById = (id): Promise<any> =>
  request.delete(`/api/order/detail/${id}`);
