import request from '@/utils/request';

export const getOrderByPaging = (params): Promise<any> =>
  request.get(`/api/order/paging`, { params });
export const addOrder = (data): Promise<any> =>
  request.post(`/api/order`, data);
export const updateOrder = (id, data): Promise<any> =>
  request.patch(`/api/order/${id}`, data);
export const deleteOrderById = (id): Promise<any> =>
  request.delete(`/api/order/${id}`);
