import { create } from 'zustand';

interface VerifiedStore {
  verified: boolean;
  actions: {
    setVerified: (verified: boolean) => void;
  };
}

const useVerifiedStore = create<VerifiedStore>((set) => ({
  verified: false,
  actions: {
    setVerified: (input: boolean) => set(() => ({ verified: input })),
  },
}));

export default useVerifiedStore;
