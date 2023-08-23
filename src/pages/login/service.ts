import request from '@/utils/request';

export const login = (data: any): Promise<{ accessToken?: string }> =>
  request.post(`/api/auth/login`, data);
