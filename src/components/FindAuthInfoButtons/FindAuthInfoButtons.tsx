import { useNavigate } from 'react-router-dom';

const FindAuthInfoButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-center gap-4 text-xs text-gray-900">
      <button
        className="cursor-pointer border-none p-0"
        onClick={() => navigate('/find-id')}
      >
        아이디 찾기
      </button>
      <button
        className="cursor-pointer border-none p-0"
        onClick={() => navigate('/find-password')}
      >
        비밀번호 찾기
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

export default FindAuthInfoButtons;
