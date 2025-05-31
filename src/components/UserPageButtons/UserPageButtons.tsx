import {
  AlignLeftOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

interface ButtonItem {
  icon: React.ReactNode;
  text: string;
  path: string;
}

const UserPageButtons: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isClicked = (path: string) => location.pathname === path;

  const buttonItems: ButtonItem[] = [
    {
      icon: <UserOutlined />,
      text: '내 정보',
      path: '/user/info',
    },
    {
      icon: <CalendarOutlined />,
      text: '예약 내역',
      path: '/user/booked',
    },
    {
      icon: <AlignLeftOutlined />,
      text: '나의 여행 후기',
      path: '/user/reviews',
    },
    {
      icon: <QuestionCircleOutlined />,
      text: '자주 찾는 질문',
      path: '/user/questions',
    },
  ];

  const handleClick = (index: number) => {
    navigate(buttonItems[index].path);
  };

  return (
    <div className="mt-15 flex items-center gap-10">
      {buttonItems.map((item, index) =>
        isClicked(item.path) ? (
          <div
            className="flex h-35 w-40 cursor-pointer flex-col items-center justify-center bg-[#FECA3A]"
            style={{
              clipPath:
                'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            }}
            key={index}
            onClick={() => handleClick(index)}
          >
            <span className="text-[45px]">{item.icon}</span>
            <span className="text-md text-gray-900">{item.text}</span>
          </div>
        ) : (
          <div
            className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center"
            key={index}
            onClick={() => handleClick(index)}
          >
            <span className="text-[45px]">{item.icon}</span>
            <span className="text-md text-gray-900">{item.text}</span>
          </div>
        ),
      )}
    </div>
  );
};

export default UserPageButtons;
