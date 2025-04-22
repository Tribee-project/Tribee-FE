import { useNavigate } from 'react-router-dom';

interface AuthButtonProps {
  text: string;
  path: string;
}

const FindAuthInfoButtons: React.FC = () => {
  const navigate = useNavigate();

  const buttons: AuthButtonProps[] = [
    { text: '아이디 찾기', path: '/find-id' },
    { text: '비밀번호 찾기', path: '/find-password' },
    { text: '회원가입', path: '/signup/email' },
  ];

  return (
    <div className="flex w-full items-center justify-center gap-4 text-xs text-gray-900">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="cursor-pointer border-none p-0"
          onClick={() => navigate(button.path)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default FindAuthInfoButtons;
