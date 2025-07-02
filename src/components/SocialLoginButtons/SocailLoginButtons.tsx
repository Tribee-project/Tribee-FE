import React, { useCallback } from 'react';

import type { SocialButtonProps, SocialProvider } from '@/types';

const SocialLoginButtons: React.FC = () => {
  const socialButtons: SocialButtonProps[] = [
    {
      name: 'naver',
      imagePath: '/src/assets/naver.webp',
    },
    {
      name: 'kakao',
      imagePath: '/src/assets/kakao.webp',
    },
    {
      name: 'google',
      imagePath: '/src/assets/google.webp',
    },
  ];

  const handleSocialLogin = useCallback((provider: SocialProvider) => {
    // 소셜 로그인 처리 로직 구현
    console.log(`${provider} 로그인 시도`);
  }, []);

  return (
    <div className="mt-7 flex w-full items-center justify-center gap-7">
      {socialButtons.map((button) => (
        <img
          key={button.name}
          src={button.imagePath}
          alt={button.name}
          className="w-10 cursor-pointer rounded-[50%]"
          onClick={() => handleSocialLogin(button.name as SocialProvider)}
        />
      ))}
    </div>
  );
};

export default SocialLoginButtons;
