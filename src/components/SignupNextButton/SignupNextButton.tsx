import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import sendVerificationEmail from '@/services/apis/emailSendApi';
import useUserInfoStore from '@/stores/userInfoStore';
import useValidateEmailStore from '@/stores/validateEmailStore';
import useVerifiedStore from '@/stores/verifiedStore';
import { generatePasscode } from '@/utils/emailPasscode';

const ROUTES = {
  EMAIL: 'email',
  VALIDATE_EMAIL: 'validate-email',
  PASSWORD: 'password',
  NICKNAME: 'nickname',
  SIGNUP_COMPLETE: 'signup-complete',
};

const SignupNextButton: React.FC = () => {
  const navigate = useNavigate();
  const verified = useVerifiedStore((state) => state.verified);
  const [isDisabled, setIsDisabled] = useState(true);
  const userEmail = useUserInfoStore((state) => state.userInfo.email);
  const setPasscode = useValidateEmailStore(
    (state) => state.actions.setPasscode,
  );
  const setVerified = useVerifiedStore((state) => state.actions.setVerified);

  const getCurrentPathSegment = (): string => {
    return window.location.pathname.split('/')[2] || '';
  };

  const handleEmailVerification = (): void => {
    const newPasscode = generatePasscode();
    setPasscode(newPasscode);
    sendVerificationEmail(userEmail);
  };

  const navigateToNextPage = (nextRoute: string): void => {
    navigate(`/signup/${nextRoute}`);
    setVerified(false);
  };

  const handleNextButtonClick = (): void => {
    const currentPath = getCurrentPathSegment();
    const routeActions: Record<string, () => void> = {
      [ROUTES.EMAIL]: () => {
        handleEmailVerification();
        navigateToNextPage(ROUTES.VALIDATE_EMAIL);
      },
      [ROUTES.VALIDATE_EMAIL]: () => {
        navigateToNextPage(ROUTES.PASSWORD);
      },
      [ROUTES.PASSWORD]: () => {
        navigateToNextPage(ROUTES.NICKNAME);
      },
      [ROUTES.NICKNAME]: () => {
        navigate('/signup-complete');
      },
    };

    const action = routeActions[currentPath];
    if (action) {
      action();
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
