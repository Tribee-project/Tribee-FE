import { useEffect, useState } from 'react';

import useVerifiedStore from '@/stores/verifiedStore';

const SignupNextButton: React.FC = () => {
  const verified = useVerifiedStore((state) => state.verified);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!verified);
  }, [verified]);

  return (
    <button
      className={`mt-20 w-25 rounded-lg border-1 ${
        isDisabled
          ? 'border-gray-300 bg-gray-100 text-gray-400'
          : 'cursor-pointer border-amber-300 text-gray-700 hover:bg-amber-100'
      } p-2`}
      disabled={isDisabled}
    >
      다음 👉
    </button>
  );
};

export default SignupNextButton;
