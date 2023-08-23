import request from '@/utils/request';

export const getEnum = (key): Promise<any> =>
  request.get(`/api/dictionary/key/${key}`);
export const getUserInfo = (): Promise<any> => request.get(`/api/user/info`);
