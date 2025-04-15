import { Popover } from 'antd';
import React from 'react';
import { useState } from 'react';

import useValidatePasswordStore from '@/stores/validatePasswordStore';
import useVerifiedStore from '@/stores/verifiedStore';
import { passwordValidation } from '@/utils/validations';

const passwordAlert = (
  <span>영어, 숫자, !@#$%^&*를 모두 포함하여 최소 8자 이상이어야 해요</span>
);

const validPasswordAlert = <span>비밀번호가 일치하지 않아요</span>;

const SignupPasswordInput: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const password = useValidatePasswordStore((state) => state.password);
  const validPassword = useValidatePasswordStore(
    (state) => state.validPassword,
  );
  const { setValidPassword, setPassword } = useValidatePasswordStore(
    (state) => state.actions,
  );
  const [isValidPassword, setIsValidPassword] = useState(false);
  const setVerified = useVerifiedStore((state) => state.actions.setVerified);

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(e.target.value);
    if (!passwordValidation(e.target.value) && e.target.value.length > 0) {
      setOpen(true);
      setIsValidPassword(false);
    } else if (
      passwordValidation(e.target.value) &&
      e.target.value.length > 0
    ) {
      setOpen(false);
      setIsValidPassword(true);
    }
  };

  const handleValidPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setValidPassword(e.target.value);
    if (e.target.value !== password) {
      setOpen2(true);
      setVerified(false);
    } else {
      setOpen2(false);
      setVerified(true);
    }
  };

  return (
    <>
      <span className="text-md mb-2">비밀번호를 입력해주세요 🔐</span>
      <Popover
        content={passwordAlert}
        color="#FECA3A"
        placement="bottomRight"
        open={open}
      >
        <div className="mb-5 flex w-90 justify-center rounded-4xl border-3 border-amber-300 p-2">
          <input
            className="w-[90%] border-none outline-none"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </Popover>
      {isValidPassword ? (
        <>
          <span className="text-md mb-2">다시한번 입력해주세요</span>
          <Popover
            content={validPasswordAlert}
            color="#FECA3A"
            placement="bottomRight"
            open={open2}
          >
            <div className="mb-5 flex w-90 justify-center rounded-4xl border-3 border-amber-300 p-2">
              <input
                className="w-[90%] border-none outline-none"
                type="password"
                value={validPassword}
                onChange={handleValidPasswordChange}
              />
            </div>
          </Popover>
        </>
      ) : null}
    </>
  );
};

export default SignupPasswordInput;
