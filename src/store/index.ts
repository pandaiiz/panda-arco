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
  children: React.ReactNode[] | React.ReactNode;
}
export const commonState = atom<IBaseStore>({
  key: KEYS.COMMON_STATE,
  default: {
    userInfo: {
      menus: [],
    },
    userLoading: false,
    settings: defaultSettings,
    children: [],
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
