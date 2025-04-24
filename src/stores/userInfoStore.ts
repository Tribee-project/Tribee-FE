import { create } from 'zustand';

interface userInfoStore {
  userInfo: {
    email: string;
    nickname: string;
  };
  actions: {
    setUserEmail: (email: string) => void;
    setUserNickname: (nickname: string) => void;
  };
}

const useUserInfoStore = create<userInfoStore>((set) => ({
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
