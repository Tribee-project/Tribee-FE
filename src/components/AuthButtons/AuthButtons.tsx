import { useNavigate } from 'react-router-dom';

const AuthButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 text-xs text-gray-900 justify-end mt-3 w-full">
      <button
        className="border-none p-0 cursor-pointer"
        onClick={() => navigate('/login')}
      >
        로그인
      </button>
      <button
        className="border-none p-0 cursor-pointer"
        onClick={() => navigate('/signup')}
      >
        회원가입
      </button>
    </div>
  );
};

export default AuthButtons;
