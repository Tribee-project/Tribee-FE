import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const needAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/login');
      return false;
    }
    return true;
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return false;
    }
    return true;
  };

  return { needAuthenticated, isAuthenticated };
};

export default useAuth;
