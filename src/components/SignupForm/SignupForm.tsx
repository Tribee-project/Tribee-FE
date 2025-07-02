import { useLocation } from 'react-router-dom';

import tribeeLogo from '@/assets/Tribee.webp';

import SignupEmailValidateInput from '../SignupEmailValidateInput/SignupEmailValidateInput';
import SignupNextButton from '../SignupNextButton/SignupNextButton';
import SignupNicknameInput from '../SignupNicknameInput/SignupNicknameInput';
import SignupPasswordInput from '../SignupPasswordInput/SignupPasswordInput';
import SignupEmailInput from '../SingupEmailInput/SingupEmailInput';

const SignupForm: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2];

  const componentMap: Record<string, React.FC> = {
    email: SignupEmailInput,
    'validate-email': SignupEmailValidateInput,
    password: SignupPasswordInput,
    nickname: SignupNicknameInput,
  };

  const InputComponent = componentMap[currentPath] || (() => <></>);

  return (
    <div className="flex flex-col items-center justify-center rounded-4xl border-1 border-gray-300 bg-white p-30 shadow-md">
      <img src={tribeeLogo} alt="logo" className="mb-10 w-50" />
      <InputComponent />
      <SignupNextButton />
    </div>
  );
};

export default SignupForm;
