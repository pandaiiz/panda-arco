import request from '@/utils/request';

export const getTransferDetailsByPaging = (params): Promise<any> =>
  request.get(`/api/transfer/details/paging`, { params });
export const getTransferDetailsById = (id): Promise<any> =>
  request.get(`/api/transfer/details/${id}`);
export const deleteTransferDetailById = (id): Promise<any> =>
  request.delete(`/api/transfer/detail/${id}`);

export const addTransferDetail = (data): Promise<any> =>
  request.post(`/api/transfer/item`, data);

export const updateTransferDetail = (id, data): Promise<any> =>
  request.patch(`/api/transfer/item/${id}`, data);
