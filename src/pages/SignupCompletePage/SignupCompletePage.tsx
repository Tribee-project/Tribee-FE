import signupCongratulation from '@/assets/congrat.png';
import SignupCompleteLoginButton from '@/components/SignupCompleteLoginButton/SignupCompleteLoginButton';

const SignupCompletePage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-4xl border-1 border-gray-300 p-30">
        <img
          src={signupCongratulation}
          alt="logo"
          className="mb-10 ml-2 w-60 rotate-13"
        />
        <div className="text-2xl font-bold">회원가입이 완료되었어요!</div>
        <div className="mt-5 text-lg text-gray-500">여행을 떠나볼까요?</div>
        <SignupCompleteLoginButton />
      </div>
    </div>
  );
};

export default SignupCompletePage;
