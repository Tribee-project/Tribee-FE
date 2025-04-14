import emailJS from 'emailjs-com';

import useValidateEmailStore from '@/stores/validateEmailStore';

const sendVerificationEmail = async (userEmail: string): Promise<void> => {
  const { passcode } = useValidateEmailStore.getState();

  const templateParams = {
    email: userEmail,
    from_name: 'Tribee',
    passcode: passcode,
  };

  await emailJS
    .send('tribee_xblv9g8', 'tOTP_nbikbsg', templateParams, 'PV13y234DVvSLC35t')
    .then((res) => {
      console.log('Email sent successfully:', res.status, res.text);
    })
    .catch((err) => {
      console.error('Error sending email:', err);
    });
};

export default sendVerificationEmail;
