import emailJS from 'emailjs-com';

import useValidateEmailStore from '@/stores/validateEmailStore';

const sendVerificationEmail = async (userEmail: string): Promise<void> => {
  const { passcode } = useValidateEmailStore.getState();

  const templateParams = {
    email: userEmail,
    from_name: 'Tribee',
    passcode: passcode,
  };

  await emailJS.send(
    'tribee_xblv9g8',
    'tOTP_nbikbsg',
    templateParams,
    'PV13y234DVvSLC35t',
  );
};

export default sendVerificationEmail;
