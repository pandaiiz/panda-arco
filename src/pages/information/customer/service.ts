import request from '@/utils/request';

export const getCustomerByPaging = (params): Promise<any> =>
  request.get(`/api/customer/paging`, { params });
export const addCustomer = (data): Promise<any> =>
  request.post(`/api/customer`, data);
export const updateCustomer = (id, data): Promise<any> =>
  request.patch(`/api/customer/${id}`, data);
export const deleteCustomerById = (id): Promise<any> =>
  request.delete(`/api/customer/${id}`);
