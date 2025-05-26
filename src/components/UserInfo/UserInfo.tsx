import { LockOutlined, MailOutlined, SmileOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';

import { getUserInfo } from '@/services/axios/userApis';

interface ProfileItemProps {
  icon: React.ReactNode;
  text: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, text, action }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        {icon}
        <span>{text}</span>
        {action && (
          <button
            className="ml-auto cursor-pointer rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 hover:bg-gray-100"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
      <Divider />
    </>
  );
};

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{
    email: string;
    nickname: string;
  }>({ email: '', nickname: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditName = () => {
    // 이름 수정 로직 구현
  };

  const handleChangePassword = () => {
    // 비밀번호 변경 로직 구현
  };

  return (
    <div className="mt-10 mb-10 flex flex-col items-center">
      <div className="w-100 rounded-lg border-1 border-gray-300 bg-white px-5 shadow-md">
        <Divider variant="dotted" style={{ borderColor: '#B59171' }}>
          내 프로필
        </Divider>
        <div className="mb-6 flex flex-col">
          <ProfileItem icon={<MailOutlined />} text={userInfo.email} />
          <ProfileItem
            icon={<SmileOutlined />}
            text={userInfo.nickname}
            action={{
              label: '수정',
              onClick: handleEditName,
            }}
          />

          <div className="flex items-center justify-center">
            <button
              className="flex cursor-pointer items-center gap-1 rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 hover:bg-gray-100"
              onClick={handleChangePassword}
            >
              <LockOutlined />
              비밀번호 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
