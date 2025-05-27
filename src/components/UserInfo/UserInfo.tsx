import { LockOutlined, MailOutlined, SmileOutlined } from '@ant-design/icons';
import { Divider, Popover, Skeleton } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';

import { editUserNickname, getUserInfo } from '@/services/axios/userApis';
import useUserInfoStore from '@/stores/userInfoStore';
import { nicknameValidation } from '@/utils/validations';

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
    </>
  );
};

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{
    email: string;
    nickname: string;
  }>({ email: '', nickname: '' });
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const nickname = useUserInfoStore((state) => state.userInfo.nickname);
  const setNickname = useUserInfoStore(
    (state) => state.actions.setUserNickname,
  );
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const NICKNAME_ALERT = <span>자음, 모음을 제외하고 3~8자 이어야 해요</span>;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('유저 정보 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [setNickname]);

  const clickEditNickname = () => {
    setIsEditingName(true);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    if (newNickname.length === 0) {
      setShowPopover(false);
      return;
    }

    const isValid = nicknameValidation(newNickname);
    setShowPopover(!isValid);
    setIsDisabled(!isValid);
  };

  const handleSaveNickname = async () => {
    try {
      setUserInfo((prev) => ({ ...prev, nickname: nickname }));
      setIsEditingName(false);
      await editUserNickname({ nickname: nickname });
    } catch (error) {
      console.error('닉네임 변경 실패:', error);
    }
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
          {loading ? (
            <>
              <div className="flex items-center gap-2">
                <MailOutlined />
                <Skeleton.Input active size="small" style={{ width: 150 }} />
              </div>
              <Divider />
              <div className="flex items-center gap-2">
                <SmileOutlined />
                <Skeleton.Input active size="small" style={{ width: 120 }} />
              </div>
              <Divider />
            </>
          ) : (
            <>
              <ProfileItem icon={<MailOutlined />} text={userInfo.email} />
              <Divider />
              <ProfileItem
                icon={<SmileOutlined />}
                text={userInfo.nickname}
                action={{
                  label: '수정',
                  onClick: clickEditNickname,
                }}
              />
              {isEditingName && (
                <div className="mt-4 flex items-center justify-center">
                  <Popover
                    content={NICKNAME_ALERT}
                    color="#FECA3A"
                    placement="bottomRight"
                    open={showPopover}
                  >
                    <input
                      type="text"
                      value={nickname}
                      onChange={handleNicknameChange}
                      className="rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 outline-none"
                    />
                  </Popover>
                  <button
                    className={`${
                      isDisabled
                        ? 'ml-2 flex cursor-not-allowed items-center gap-1 rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 hover:bg-gray-100'
                        : 'ml-2 flex cursor-pointer items-center gap-1 rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={handleSaveNickname}
                    disabled={isDisabled}
                  >
                    저장
                  </button>
                </div>
              )}
              <Divider />
            </>
          )}

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
