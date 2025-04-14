import { create } from 'zustand';

interface userInfoStore {
  userInfo: {
    email: string;
    name: string;
    nickname: string;
  };
  actions: {
    setUserEmail: (email: string) => void;
  };
}

const useUserInfoStore = create<userInfoStore>((set) => ({
  userInfo: {
    email: '',
    name: '',
    nickname: '',
  },
  actions: {
    setUserEmail: (email: string) =>
      set((state) => ({
        userInfo: { ...state.userInfo, email: email },
      })),
  },
}));

export default useUserInfoStore;
