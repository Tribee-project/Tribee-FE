import { Popover } from 'antd';
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '@/services/axios/authApis';
import { emailValidation, passwordValidation } from '@/utils/validations';

import FindAuthInfoButtons from '../FindAuthInfoButtons/FindAuthInfoButtons';
import SocialLoginButtons from '../SocialLoginButtons/SocailLoginButtons';

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPopover: boolean;
  popoverContent: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  id,
  value,
  placeholder,
  onChange,
  showPopover,
  popoverContent,
}) => {
  return (
    <Popover
      content={popoverContent}
      color="#FECA3A"
      placement="bottomRight"
      open={showPopover}
    >
      <div className="mb-5 flex w-90 justify-center rounded-4xl border-3 border-amber-300 p-2">
        <label className="flex w-[90%] flex-col gap-0.5">
          <span className="text-[10px] text-gray-800">{label}</span>
          <input
            placeholder={placeholder}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className="border-none outline-none"
          />
        </label>
      </div>
    </Popover>
  );
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): void => {
    const isEmailValid = emailValidation(email);
    const isPasswordValid = passwordValidation(password);
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setShowEmailError(newEmail !== '' && !emailValidation(newEmail));
    validateForm();
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setShowPasswordError(
      newPassword !== '' && !passwordValidation(newPassword),
    );
    validateForm();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isFormValid) {
      login({
        email: email,
        password: password,
      })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 401) {
            alert('이메일 또는 비밀번호가 일치하지 않습니다');
          }
        });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-4xl border-1 border-gray-300 bg-white p-30 shadow-md">
      <img src={'/src/assets/Tribee.png'} alt="logo" className="mb-5 w-50" />
      <form className="mb-3 flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormInput
          label="이메일"
          type="email"
          id="email"
          value={email}
          placeholder="tourpartner@tribee.com"
          onChange={handleEmailChange}
          showPopover={showEmailError}
          popoverContent={<span>올바른 이메일 형식이 아닙니다</span>}
        />
        <FormInput
          label="비밀번호"
          type="password"
          id="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={handlePasswordChange}
          showPopover={showPasswordError}
          popoverContent={
            <span>영어, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다</span>
          }
        />
        <button
          className={`mt-5 h-11 w-70 self-center rounded-4xl p-2 text-gray-800 ${
            isFormValid
              ? 'cursor-pointer bg-amber-300 hover:bg-amber-400'
              : 'cursor-not-allowed bg-gray-300'
          }`}
          type="submit"
          onKeyDown={handleKeyDown}
          disabled={!isFormValid}
        >
          로그인
        </button>
      </form>
      <FindAuthInfoButtons />
      <SocialLoginButtons />
    </div>
  );
};

export default LoginForm;
