export interface UserInfoStore {
  userInfo: {
    email: string;
    nickname: string;
  };
  actions: {
    setUserEmail: (email: string) => void;
    setUserNickname: (nickname: string) => void;
  };
}
