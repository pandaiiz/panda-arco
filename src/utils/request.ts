import axios from 'axios';
import { Message } from '@arco-design/web-react';
const request = axios.create({
  timeout: 60000, // request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem('X-Token');
    // Do something before request is sent
    if (TOKEN) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = `Bearer ${TOKEN}`;
      // config.headers['X-Token'] = getToken()
    }
    return config;
  },
  (error) => {
    console.log(error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */
  // response => response.data,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.setItem('userStatus', 'logout');
      Message.error('登录过期，请重新登录！');
    } else {
      Message.error(error.response.data.message || '请求失败！');
    }
    return Promise.reject(error.response);
  }
);

export const getFetcher = (url) => request.get(url).then((res) => res.data);
export const postFetcher = (url, { arg }) =>
  request.post(url, arg).then((res) => res.data);
export const patchFetcher = (url, { arg }) =>
  request.patch(`${url}/${arg.id}`, arg.data).then((res) => res.data);
export const deleteFetcher = (url, { arg }) =>
  request.delete(`${url}/${arg}`).then((res) => res.data);
