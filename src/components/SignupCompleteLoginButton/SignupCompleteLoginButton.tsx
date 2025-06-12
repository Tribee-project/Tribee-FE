import { useNavigate } from 'react-router-dom';

import { login } from '@/services/apis/authApis';
import useUserInfoStore from '@/stores/userInfoStore';
import useValidatePasswordStore from '@/stores/validatePasswordStore';

const SignupCompleteLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = useUserInfoStore((state) => state.userInfo.email);
  const userPassword = useValidatePasswordStore((state) => state.password);

  const handleClick = () => {
    login({
      email: userEmail,
      password: userPassword,
    })
      .then(() => {
        navigate(-5);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button
      className="mt-20 w-25 cursor-pointer rounded-lg border-1 border-amber-300 p-2 text-gray-700 hover:bg-amber-100"
      onClick={handleClick}
    >
      로그인 👉
    </button>
  );
};

export default SignupCompleteLoginButton;
