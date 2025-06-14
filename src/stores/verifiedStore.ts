import { create } from 'zustand';

import type { VerifiedStore } from '@/types';

const useVerifiedStore = create<VerifiedStore>((set) => ({
  verified: false,
  actions: {
    setVerified: (input: boolean) => set(() => ({ verified: input })),
  },
}));

export default useVerifiedStore;
