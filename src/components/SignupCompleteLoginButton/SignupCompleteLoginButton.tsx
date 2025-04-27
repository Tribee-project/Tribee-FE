import { useNavigate } from 'react-router-dom';

const SignupCompleteLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    // 자동으로 로그인 하는 로직 구현
    navigate(-5);
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
