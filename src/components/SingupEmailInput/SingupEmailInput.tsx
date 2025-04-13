const SignupEmailInput: React.FC = () => {
  return (
    <>
      <span className="mb-5 text-lg">이메일을 입력해주세요 😊</span>
      <div className="mb-5 flex w-90 justify-center rounded-4xl border-3 border-amber-300 p-2">
        <input
          type="email"
          id="email"
          className="w-[90%] border-none outline-none"
        />
      </div>
    </>
  );
};

export default SignupEmailInput;
