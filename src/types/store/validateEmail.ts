export interface ValidateEmailStore {
  passcode: string;
  isValidEmail: boolean;
  actions: {
    setPasscode: (passcode: string) => void;
    setIsValid: (isValid: boolean) => void;
  };
}
