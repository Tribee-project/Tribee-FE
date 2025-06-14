export interface VerifiedStore {
  verified: boolean;
  actions: {
    setVerified: (verified: boolean) => void;
  };
}
