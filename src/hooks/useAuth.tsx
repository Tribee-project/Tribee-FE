import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const alertShown = useRef(false);

  const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    if (!token && !alertShown.current) {
      alertShown.current = true;
      alert('로그인이 필요한 페이지입니다.');
      navigate('/login');
      return false;
    }
    return true;
  };
  return { isAuthenticated };
};

export default useAuth;
