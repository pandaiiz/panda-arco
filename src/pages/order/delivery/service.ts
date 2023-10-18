import request from '@/utils/request';
export const getFinishedTransferByPaging = (params): Promise<any> =>
  request.get(`/api/transfer/paging`, { params: { ...params, status: 2 } });
