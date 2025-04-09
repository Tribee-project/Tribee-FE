import { AliwangwangOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UserInfoButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-6 text-4xl">
      <AliwangwangOutlined onClick={() => navigate('/user/info')} />
      <BookOutlined onClick={() => navigate('/user/booked')} />
    </div>
  );
};

export default UserInfoButtons;
