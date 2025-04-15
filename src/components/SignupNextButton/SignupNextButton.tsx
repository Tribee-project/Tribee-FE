import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import sendVerificationEmail from '@/services/apis/emailSendApi';
import useUserInfoStore from '@/stores/userInfoStore';
import useValidateEmailStore from '@/stores/validateEmailStore';
import useVerifiedStore from '@/stores/verifiedStore';
import { generatePasscode } from '@/utils/emailPasscode';

const SignupNextButton: React.FC = () => {
  const navigate = useNavigate();
  const verified = useVerifiedStore((state) => state.verified);
  const [isDisabled, setIsDisabled] = useState(true);
  const userEmail = useUserInfoStore((state) => state.userInfo.email);
  const setPasscode = useValidateEmailStore(
    (state) => state.actions.setPasscode,
  );
  const setVerified = useVerifiedStore((state) => state.actions.setVerified);

  const handleNextButtonClick = (): void => {
    if (window.location.pathname.split('/')[2] == 'email') {
      const newPasscode = generatePasscode();
      setPasscode(newPasscode);
      sendVerificationEmail(userEmail);
      navigate('/signup/validate-email');
      setVerified(false);
    } else if (window.location.pathname.split('/')[2] == 'validate-email') {
      navigate('/signup/password');
      setVerified(false);
    } else if (
      window.location.pathname.split('/')[2] == 'password' &&
      verified
    ) {
      navigate('/signup/nickname');
      setVerified(false);
    }
  };

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
      onClick={handleNextButtonClick}
    >
      다음 👉
    </button>
  );
};

export default SignupNextButton;
