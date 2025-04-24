import { Popover } from 'antd';
import React, { ChangeEvent, useState } from 'react';

import useValidatePasswordStore from '@/stores/validatePasswordStore';
import useVerifiedStore from '@/stores/verifiedStore';
import { passwordValidation } from '@/utils/validations';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPopover: boolean;
  popoverContent: React.ReactNode;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
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
          type="password"
          value={value}
          onChange={onChange}
        />
      </div>
    </Popover>
  </>
);

const SignupPasswordInput: React.FC = () => {
  const PASSWORD_ALERT = (
    <span>영어, 숫자, !@#$%^&*를 모두 포함하여 최소 8자 이상이어야 해요</span>
  );
  const VALID_PASSWORD_ALERT = <span>비밀번호가 일치하지 않아요</span>;

  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmError, setShowConfirmError] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const password = useValidatePasswordStore((state) => state.password);
  const validPassword = useValidatePasswordStore(
    (state) => state.validPassword,
  );
  const { setValidPassword, setPassword } = useValidatePasswordStore(
    (state) => state.actions,
  );
  const setVerified = useVerifiedStore((state) => state.actions.setVerified);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length === 0) {
      setShowPasswordError(false);
      setIsValidPassword(false);
      return;
    }

    const isValid = passwordValidation(newPassword);
    setShowPasswordError(!isValid);
    setIsValidPassword(isValid);

    if (validPassword) {
      const doPasswordsMatch = validPassword === newPassword;
      setShowConfirmError(!doPasswordsMatch);
      setVerified(doPasswordsMatch);
    }
  };

  const handleConfirmPasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const confirmPassword = e.target.value;
    setValidPassword(confirmPassword);

    const doPasswordsMatch = confirmPassword === password;
    setShowConfirmError(!doPasswordsMatch);
    setVerified(doPasswordsMatch);
  };

  return (
    <>
      <PasswordInput
        label="비밀번호를 입력해주세요 🔐"
        value={password}
        onChange={handlePasswordChange}
        showPopover={showPasswordError}
        popoverContent={PASSWORD_ALERT}
      />

      {isValidPassword && (
        <PasswordInput
          label="다시한번 입력해주세요"
          value={validPassword}
          onChange={handleConfirmPasswordChange}
          showPopover={showConfirmError}
          popoverContent={VALID_PASSWORD_ALERT}
        />
      )}
    </>
  );
};

export default SignupPasswordInput;
