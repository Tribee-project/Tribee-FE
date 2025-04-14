import { Popover } from 'antd';
import { useState } from 'react';

import useUserInfoStore from '@/stores/userInfoStore';
import useVerifiedStore from '@/stores/verifiedStore';
import { emailValidation } from '@/utils/validations';

const content = <span>이메일 형식이 잘못됐어요</span>;

const SignupEmailInput: React.FC = () => {
  const setVerified = useVerifiedStore((state) => state.actions.setVerified);
  const [open, setOpen] = useState(false);
  const email = useUserInfoStore((state) => state.userInfo.email);
  const setEmail = useUserInfoStore((state) => state.actions.setUserEmail);

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void | undefined => {
    const newEmail = e.target.value;
    const isValidEmail = emailValidation(newEmail);
    setEmail(newEmail);
    setOpen(!emailValidation(newEmail) && newEmail !== '');
    setVerified(isValidEmail);
  };

  return (
    <>
      <span className="mb-2 text-lg">이메일을 입력해주세요 😊</span>
      <Popover
        content={content}
        color="#FECA3A"
        placement="bottomRight"
        open={open}
      >
        <div className="mb-5 flex w-90 justify-center rounded-4xl border-3 border-amber-300 p-2">
          <input
            type="email"
            className="w-[90%] border-none outline-none"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </Popover>
    </>
  );
};

export default SignupEmailInput;
