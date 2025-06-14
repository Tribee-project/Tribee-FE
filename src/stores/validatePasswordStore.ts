import { create } from 'zustand';

import type { ValidatePasswordStore } from '@/types';

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
