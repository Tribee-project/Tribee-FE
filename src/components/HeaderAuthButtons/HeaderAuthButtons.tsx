import { useNavigate } from 'react-router-dom';

const HeaderAuthButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-3 flex w-full items-center justify-end gap-3 text-xs text-gray-900">
      <button
        className="cursor-pointer border-none p-0"
        onClick={() => navigate('/login')}
      >
        로그인
      </button>
      <button
        className="cursor-pointer border-none p-0"
        onClick={() => navigate('/signup/email')}
      >
        회원가입
      </button>
    </div>
  );
};

export default HeaderAuthButtons;
