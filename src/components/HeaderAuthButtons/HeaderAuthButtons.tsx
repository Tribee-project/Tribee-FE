import { useNavigate } from 'react-router-dom';

interface AuthButtonProps {
  label: string;
  path: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ label, path }) => {
  const navigate = useNavigate();

  return (
    <button
      className="cursor-pointer border-none p-0 text-xs text-gray-900"
      onClick={() => navigate(path)}
    >
      {label}
    </button>
  );
};

const HeaderAuthButtons: React.FC = () => {
  return (
    <div className="mt-3 flex w-full items-center justify-end gap-3">
      <AuthButton label="로그인" path="/login" />
      <AuthButton label="회원가입" path="/signup/email" />
    </div>
  );
};

export default HeaderAuthButtons;
