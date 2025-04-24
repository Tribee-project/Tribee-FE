import { Popover } from 'antd';
import { useState } from 'react';

import useUserInfoStore from '@/stores/userInfoStore';
import useVerifiedStore from '@/stores/verifiedStore';
import { emailValidation } from '@/utils/validations';

const ERROR_MESSAGE = '이메일 형식이 잘못됐어요';

const SignupEmailInput: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const email = useUserInfoStore((state) => state.userInfo.email);
  const setEmail = useUserInfoStore((state) => state.actions.setUserEmail);
  const setVerified = useVerifiedStore((state) => state.actions.setVerified);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newEmail = e.target.value;
    const isValidEmail = emailValidation(newEmail);

    setEmail(newEmail);
    setIsPopoverOpen(newEmail !== '' && !isValidEmail);
    setVerified(isValidEmail);
  };

  return (
    <>
      <label htmlFor="email-input" className="text-md mb-2 block">
        이메일을 입력해주세요 😊
      </label>
      <Popover
        content={<span>{ERROR_MESSAGE}</span>}
        color="#FECA3A"
        placement="bottomRight"
        open={isPopoverOpen}
      >
        <div className="mb-5 flex w-90 justify-center rounded-4xl border-3 border-amber-300 p-2">
          <input
            id="email-input"
            type="email"
            className="w-[90%] border-none outline-none"
            value={email}
            onChange={handleEmailChange}
            aria-invalid={isPopoverOpen}
          />
        </div>
      </Popover>
    </>
  );
};

export default SignupEmailInput;
