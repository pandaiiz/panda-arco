import request from '@/utils/request';

export const getOrderDetailsList = (params): Promise<any> =>
  request.get(`/api/order/details`, { params });
export const getSpecificationByCode = (code): Promise<any> =>
  request.get(`/api/specifications/code/${code}`);
export const addOrder = (data): Promise<any> =>
  request.post(`/api/order`, data);
export const updateOrder = (id, data): Promise<any> =>
  request.patch(`/api/order/${id}`, data);
export const deleteOrderById = (id): Promise<any> =>
  request.delete(`/api/order/${id}`);
export const deleteOrderDetailById = (id): Promise<any> =>
  request.delete(`/api/order/detail/${id}`);
export const batchCreateTransfer = (data): Promise<any> =>
  request.post(`/api/transfer/batch`, data);
