import type { GetProps } from 'antd';
import { ConfigProvider, Input } from 'antd';
import { useState } from 'react';

import useValidateEmailStore from '@/stores/validateEmailStore';
import useVerifiedStore from '@/stores/verifiedStore';

type OTPProps = GetProps<typeof Input.OTP>;

const THEME = {
  token: { colorPrimary: '#FECA3A' },
};

const SignupEmailValidateInput = () => {
  const passcode = useValidateEmailStore((state) => state.passcode);
  const setVerified = useVerifiedStore((state) => state.actions.setVerified);
  const [currentInput, setCurrentInput] = useState('');

  const handleChange: OTPProps['onChange'] = (text) => {
    setCurrentInput(text);
    if (text === passcode) {
      setVerified(true);
    }
  };

  return (
    <>
      <span className="text-md mb-2">
        입력하신 이메일로 인증번호를 보내드렸어요
      </span>
      <ConfigProvider theme={THEME}>
        <Input.OTP
          length={6}
          size="large"
          onChange={handleChange}
          value={currentInput}
        />
      </ConfigProvider>
    </>
  );
};

export default SignupEmailValidateInput;
