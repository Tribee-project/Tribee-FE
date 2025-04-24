import { Popover } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';

import useUserInfoStore from '@/stores/userInfoStore';
import useVerifiedStore from '@/stores/verifiedStore';
import { nicknameValidation } from '@/utils/validations';

interface NicknameInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPopover: boolean;
  popoverContent: React.ReactNode;
}

const NicknameInput: React.FC<NicknameInputProps> = ({
  label,
  value,
  onChange,
  showPopover,
  popoverContent,
}) => (
  <>
    <span className="text-md mb-2">{label}</span>
    <Popover
      content={popoverContent}
      color="#FECA3A"
      placement="bottomRight"
      open={showPopover}
    >
      <div className="mb-5 flex w-90 justify-center rounded-4xl border-3 border-amber-300 p-2">
        <input
          className="w-[90%] border-none outline-none"
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
    </Popover>
  </>
);

const SignupNicknameInput: React.FC = () => {
  const NICKNAME_ALERT = <span>자음, 모음을 제외하고 3~8자 이어야 해요</span>;

  const setVerified = useVerifiedStore((state) => state.actions.setVerified);
  const nickname = useUserInfoStore((state) => state.userInfo.nickname);
  const setNickname = useUserInfoStore(
    (state) => state.actions.setUserNickname,
  );

  const [showNicknameError, setShowNicknameError] = useState(false);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    if (newNickname.length === 0) {
      setShowNicknameError(false);
      return;
    }

    const isValid = nicknameValidation(newNickname);
    setShowNicknameError(!isValid);
    setVerified(isValid);
  };

  useEffect(() => {
    setNickname('');
  }, [setNickname]);

  return (
    <>
      <NicknameInput
        label="닉네임을 입력해주세요 😊"
        value={nickname}
        onChange={handleNicknameChange}
        showPopover={showNicknameError}
        popoverContent={NICKNAME_ALERT}
      />
    </>
  );
};

export default SignupNicknameInput;
