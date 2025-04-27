import { useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
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
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <>
      {isAuthenticated() ? (
        <div className="mt-3 flex w-full items-center justify-end gap-3">
          <button
            className="cursor-pointer border-none p-0 text-xs text-gray-900"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="mt-3 flex w-full items-center justify-end gap-3">
          <AuthButton label="로그인" path="/login" />
          <AuthButton label="회원가입" path="/signup/email" />
        </div>
      )}
    </>
  );
};

export default HeaderAuthButtons;
