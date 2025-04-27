import { AliwangwangOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

const UserInfoButtons: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleUserInfo = () => {
    if (isAuthenticated()) {
      navigate('/user/info');
    }
  };

  const handleUserBooked = () => {
    if (isAuthenticated()) {
      navigate('/user/booked');
    }
  };

  return (
    <div className="flex items-center gap-6 text-4xl">
      <AliwangwangOutlined onClick={handleUserInfo} />
      <BookOutlined onClick={handleUserBooked} />
    </div>
  );
};

export default UserInfoButtons;
