import { LockOutlined, MailOutlined, SmileOutlined } from '@ant-design/icons';
import { Divider, Popover, Skeleton } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  editUserNickname,
  editUserPassword,
  getUserInfo,
} from '@/services/apis/userApis';
import useUserInfoStore from '@/stores/userInfoStore';
import { nicknameValidation, passwordValidation } from '@/utils/validations';
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
  } | null>(null);
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const nickname = useUserInfoStore((state) => state.userInfo.nickname);
  const setNickname = useUserInfoStore(
    (state) => state.actions.setUserNickname,
  );
  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<string>('');
  const [showNicknameError, setShowNicknameError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  const [showConfirmError, setShowConfirmError] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const NICKNAME_ALERT = <span>자음, 모음을 제외하고 3~8자 이어야 해요</span>;
  const PASSWORD_ALERT = (
    <span>영어, 숫자, !@#$%^&*를 모두 포함하여 최소 8자 이상이어야 해요</span>
  );
  const VALID_PASSWORD_ALERT = <span>비밀번호가 일치하지 않아요</span>;
  const navigate = useNavigate();

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
    setIsEditingNickname(!isEditingNickname);
  };

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>): void => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    if (newNickname.length === 0) {
      setShowNicknameError(false);
      return;
    }

    const isValid = nicknameValidation(newNickname);
    setShowNicknameError(!isValid);
    setIsDisabled(!isValid);
  };

  const handleSaveNickname = async () => {
    try {
      setUserInfo((prev) => (prev ? { ...prev, nickname: nickname } : null));
      setIsEditingNickname(false);
      await editUserNickname({ nickname: nickname });
      alert('닉네임이 변경되었습니다.');
    } catch (error) {
      console.error('닉네임 변경 실패:', error);
    }
  };

  const clickChangePassword = () => {
    setIsChangePassword(!isChangePassword);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length === 0) {
      setShowPasswordError(false);
      return;
    }

    const isValid = passwordValidation(newPassword);
    setShowPasswordError(!isValid);
    setIsDisabled(!isValid);

    if (newPassword.length === 0) {
      setShowPasswordError(false);
      return;
    }
  };

  const handleConfirmPasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const confirmPassword = e.target.value;
    setValidPassword(confirmPassword);

    if (confirmPassword.length === 0) {
      setShowConfirmError(false);
      return;
    }

    const doPasswordsMatch = confirmPassword === password;
    setShowConfirmError(!doPasswordsMatch);
    setIsDisabled(!doPasswordsMatch);
  };

  const handleSavePassword = async () => {
    try {
      setIsChangePassword(false);
      await editUserPassword({ password: password });
      alert('비밀번호가 변경되었습니다.');
      localStorage.removeItem('accessToken');
      navigate('/login');
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
    }
  };

  return (
    <div className="mt-10 mb-10 flex flex-col items-center">
      <div className="w-100 rounded-lg border-1 border-gray-300 bg-white px-5 shadow-md">
        <Divider variant="dotted" style={{ borderColor: '#FECA3A' }}>
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
          ) : userInfo ? (
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
              {isEditingNickname && (
                <div className="mt-4 flex items-center justify-center">
                  <Popover
                    content={NICKNAME_ALERT}
                    color="#FECA3A"
                    placement="bottomRight"
                    open={showNicknameError}
                  >
                    <input
                      type="text"
                      value={nickname}
                      onChange={handleChangeNickname}
                      className="rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 outline-none"
                    />
                  </Popover>
                  <button
                    className={`ml-2 flex items-center gap-1 rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 ${
                      isDisabled
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer hover:bg-gray-100'
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
          ) : (
            <div className="flex items-center justify-center text-gray-500">
              사용자 정보를 불러올 수 없습니다.
            </div>
          )}

          {userInfo && (
            <div className="flex items-center justify-center">
              <button
                className="flex cursor-pointer items-center gap-1 rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 hover:bg-gray-100"
                onClick={clickChangePassword}
              >
                <LockOutlined />
                비밀번호 수정
              </button>
            </div>
          )}
          {isChangePassword && (
            <div className="mt-4 flex items-center justify-center">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-2">
                  <span>비밀번호</span>
                  <Popover
                    content={PASSWORD_ALERT}
                    color="#FECA3A"
                    placement="bottomRight"
                    open={showPasswordError}
                  >
                    <input
                      type="password"
                      className="ml-auto rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 outline-none"
                      onChange={handleChangePassword}
                      value={password}
                    />
                  </Popover>
                </div>
                <div className="flex items-center gap-2">
                  <span>비밀번호 확인</span>
                  <Popover
                    content={VALID_PASSWORD_ALERT}
                    color="#FECA3A"
                    placement="bottomRight"
                    open={showConfirmError}
                  >
                    <input
                      type="password"
                      className="ml-auto rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 outline-none"
                      onChange={handleConfirmPasswordChange}
                      value={validPassword}
                    />
                  </Popover>
                </div>
              </div>
              <button
                className={`ml-auto rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 ${
                  isDisabled
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer hover:bg-gray-100'
                }`}
                disabled={isDisabled}
                onClick={handleSavePassword}
              >
                저장
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
