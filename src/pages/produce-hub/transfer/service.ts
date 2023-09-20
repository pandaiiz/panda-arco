import request from '@/utils/request';

export const getTransferByPaging = (params): Promise<any> =>
  request.get(`/api/transfer/paging`, { params });
export const getSpecificationByCode = (code): Promise<any> =>
  request.get(`/api/specifications/code/${code}`);
export const getTransferDetailsById = (id): Promise<any> =>
  request.get(`/api/transfer/details/${id}`);
export const addTransfer = (data): Promise<any> =>
  request.post(`/api/transfer`, data);
export const updateTransfer = (id, data): Promise<any> =>
  request.patch(`/api/transfer/${id}`, data);
export const deleteTransferById = (id): Promise<any> =>
  request.delete(`/api/transfer/${id}`);
export const deleteTransferDetailById = (id): Promise<any> =>
  request.delete(`/api/transfer/detail/${id}`);
