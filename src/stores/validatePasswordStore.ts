import { create } from 'zustand';

interface ValidatePasswordStore {
  password: string;
  validPassword: string;
  actions: {
    setPassword: (password: string) => void;
    setValidPassword: (validPassword: string) => void;
  };
}

const useValidatePasswordStore = create<ValidatePasswordStore>((set) => ({
  password: '',
  validPassword: '',
  actions: {
    setPassword: (password: string) => set(() => ({ password: password })),
    setValidPassword: (validPassword: string) =>
      set(() => ({ validPassword: validPassword })),
  },
}));

export default useValidatePasswordStore;
