import { create } from 'zustand';

interface ValidateEmailStore {
  passcode: string;
  isValidEmail: boolean;
  actions: {
    setPasscode: (passcode: string) => void;
    setIsValid: (isValid: boolean) => void;
  };
}

const useValidateEmailStore = create<ValidateEmailStore>((set) => ({
  passcode: '',
  isValidEmail: false,
  actions: {
    setPasscode: (passcode: string) => set(() => ({ passcode: passcode })),
    setIsValid: (isValid: boolean) => set(() => ({ isValidEmail: isValid })),
  },
}));

export default useValidateEmailStore;
