import type { GetProps } from 'antd';
import { ConfigProvider, Input } from 'antd';

import useValidateEmailStore from '@/stores/validateEmailStore';
import useVerifiedStore from '@/stores/verifiedStore';

type OTPProps = GetProps<typeof Input.OTP>;

const SignupEmailValidateInput: React.FC = () => {
  const passcode = useValidateEmailStore((state) => state.passcode);
  const setVerified = useVerifiedStore((state) => state.actions.setVerified);

  const onChange: OTPProps['onChange'] = (text) => {
    console.log('Passcode:', passcode);
    if (text === passcode) {
      setVerified(true);
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <>
      <span className="text-md mb-2">
        입력하신 이메일로 인증번호를 보내드렸어요
      </span>

      <ConfigProvider theme={{ token: { colorPrimary: '#FECA3A' } }}>
        <Input.OTP length={6} size="large" {...sharedProps} />
      </ConfigProvider>
    </>
  );
};

export default SignupEmailValidateInput;
