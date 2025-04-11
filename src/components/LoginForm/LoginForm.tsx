import FindAuthInfoButtons from '../FindAuthInfoButtons/FindAuthInfoButtons';
import SocialLoginButtons from '../SocialLoginButtons/SocailLoginButtons';

const LoginForm: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center border-1 p-30 border-gray-300 rounded-4xl">
      <img src={'/src/assets/Tribee.png'} alt="logo" className="w-50 mb-5" />
      <form className="flex flex-col gap-2 mb-3">
        <div className="border-3 border-amber-300 rounded-4xl p-2 w-90 flex justify-center mb-5">
          <label className="flex flex-col w-[90%] gap-0.5">
            <span className="text-[10px] text-gray-800">이메일</span>
            <input
              placeholder="tourpartner@tribee.com"
              type="email"
              id="email"
              className="border-none outline-none"
            />
          </label>
        </div>
        <div className="border-3 border-amber-300 rounded-4xl p-2 w-90 flex justify-center mb-5">
          <label className="flex flex-col w-[90%] gap-0.5">
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
          className="bg-amber-300 text-gray-800 rounded-4xl p-2 w-70 h-11 self-center cursor-pointer hover:bg-amber-400 mt-5"
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
