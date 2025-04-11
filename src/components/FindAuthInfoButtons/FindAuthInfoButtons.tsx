import { useNavigate } from 'react-router-dom';

const FindAuthInfoButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 text-xs text-gray-900 justify-center w-full">
      <button
        className="border-none p-0 cursor-pointer"
        onClick={() => navigate('/find-id')}
      >
        아이디 찾기
      </button>
      <button
        className="border-none p-0 cursor-pointer"
        onClick={() => navigate('/find-password')}
      >
        비밀번호 찾기
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

export default FindAuthInfoButtons;
