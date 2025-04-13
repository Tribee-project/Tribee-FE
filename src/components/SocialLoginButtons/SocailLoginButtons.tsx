const SocialLoginButtons: React.FC = () => {
  return (
    <div className="mt-7 flex w-full items-center justify-center gap-7">
      <img
        src={'/src/assets/naver.png'}
        alt="naver"
        className="w-10 cursor-pointer rounded-[50%]"
      />
      <img
        src={'/src/assets/kakao.png'}
        alt="kakao"
        className="w-10 cursor-pointer rounded-[50%]"
      />
      <img
        src={'/src/assets/google.png'}
        alt="google"
        className="w-10 cursor-pointer rounded-[50%]"
      />
    </div>
  );
};

export default SocialLoginButtons;
