import SignupEmailValidateInput from '../SignupEmailValidateInput/SignupEmailValidateInput';
import SignupNextButton from '../SignupNextButton/SignupNextButton';
import SignupEmailInput from '../SingupEmailInput/SingupEmailInput';

const SignupForm: React.FC = () => {
  let InputComponent: React.FC = () => <></>;

  if (window.location.pathname.split('/')[2] == 'email') {
    InputComponent = SignupEmailInput;
  } else if (window.location.pathname.split('/')[2] == 'validate-email') {
    InputComponent = SignupEmailValidateInput;
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-4xl border-1 border-gray-300 p-30">
      <img src={'/src/assets/Tribee.png'} alt="logo" className="mb-10 w-50" />
      <InputComponent />
      <SignupNextButton />
    </div>
  );
};

export default SignupForm;
