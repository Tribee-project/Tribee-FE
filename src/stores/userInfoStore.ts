import { create } from 'zustand';

import type { UserInfoStore } from '@/types';

const useUserInfoStore = create<UserInfoStore>((set) => ({
  userInfo: {
    email: '',
    nickname: '',
  },
  actions: {
    setUserEmail: (email: string) =>
      set((state) => ({
        userInfo: { ...state.userInfo, email: email },
      })),
    setUserNickname: (nickname: string) =>
      set((state) => ({
        userInfo: { ...state.userInfo, nickname: nickname },
      })),
  },
}));

export default useUserInfoStore;
