export interface ValidatePasswordStore {
  password: string;
  validPassword: string;
  actions: {
    setPassword: (password: string) => void;
    setValidPassword: (validPassword: string) => void;
  };
}
