import React from 'react';
import { atom, selector } from 'recoil';
import defaultSettings from '../settings.json';
// Recoil key 集合
const KEYS = {
  COMMON_STATE: 'commonState',
  PRODUCT_COUNT: 'productCount',
};
interface IBaseStore {
  userInfo: any;
  settings?: typeof defaultSettings;
  userLoading: boolean;
  language: string;
  developer: string;
  email: string;
  children: React.ReactNode[] | React.ReactNode;
}
export const commonState = atom<IBaseStore>({
  key: KEYS.COMMON_STATE,
  default: {
    userInfo: {},
    settings: defaultSettings,
    userLoading: false,
    language: 'zh',
    developer: 'laisheng',
    children: [],
    email: '18826262167@163.com',
  },
});
export const productCount = selector({
  key: KEYS.PRODUCT_COUNT,
  get: ({ get }) => {
    return get(commonState);
  },
  set: ({ set, reset, get }, newValue) => {
    console.log(newValue);
  },
});
