import FindAuthInfoButtons from '../FindAuthInfoButtons/FindAuthInfoButtons';
import SocialLoginButtons from '../SocialLoginButtons/SocailLoginButtons';

const LoginForm: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-4xl border-1 border-gray-300 p-30">
      <img src={'/src/assets/Tribee.png'} alt="logo" className="mb-5 w-50" />
      <form className="mb-3 flex flex-col gap-2">
        <div className="mb-5 flex w-90 justify-center rounded-4xl border-3 border-amber-300 p-2">
          <label className="flex w-[90%] flex-col gap-0.5">
            <span className="text-[10px] text-gray-800">이메일</span>
            <input
              placeholder="tourpartner@tribee.com"
              type="email"
              id="email"
              className="border-none outline-none"
            />
          </label>
        </div>
        <div className="mb-5 flex w-90 justify-center rounded-4xl border-3 border-amber-300 p-2">
          <label className="flex w-[90%] flex-col gap-0.5">
            <span className="text-[10px] text-gray-800">비밀번호</span>
            <input
              placeholder="비밀번호를 입력해주세요"
              type="password"
              id="password"
              className="border-none outline-none"
            />
          </label>
        </div>
        <button
          className="mt-5 h-11 w-70 cursor-pointer self-center rounded-4xl bg-amber-300 p-2 text-gray-800 hover:bg-amber-400"
          type="submit"
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
