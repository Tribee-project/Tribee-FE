import { create } from 'zustand';

import type { ValidateEmailStore } from '@/types';

const useValidateEmailStore = create<ValidateEmailStore>((set) => ({
  passcode: '',
  isValidEmail: false,
  actions: {
    setPasscode: (passcode: string) => set(() => ({ passcode: passcode })),
    setIsValid: (isValid: boolean) => set(() => ({ isValidEmail: isValid })),
  },
}));

export default useValidateEmailStore;
