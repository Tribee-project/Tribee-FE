const SocialLoginButtons: React.FC = () => {
  return (
    <div className="flex items-center gap-7 justify-center w-full mt-7">
      <img
        src={'/src/assets/naver.png'}
        alt="naver"
        className="w-10 rounded-[50%] cursor-pointer"
      />
      <img
        src={'/src/assets/kakao.png'}
        alt="kakao"
        className="w-10 rounded-[50%] cursor-pointer"
      />
      <img
        src={'/src/assets/google.png'}
        alt="google"
        className="w-10 rounded-[50%] cursor-pointer"
      />
    </div>
  );
};

export default SocialLoginButtons;
