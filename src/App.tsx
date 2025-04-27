import { Route, Routes } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage/LoginPage';
import MainPage from '@/pages/MainPage/MainPage';
import SignupCompletePage from '@/pages/SignupCompletePage/SignupCompletePage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import UserPage from '@/pages/UserPage/UserPage';

import UserBooked from './components/UserBooked/UserBooked';
import UserInfo from './components/UserInfo/UserInfo';
import UserQuestions from './components/UserQuestions/UserQuestions';
import UserReviews from './components/UserReviews/UserReviews';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup">
        <Route path="email" element={<SignupPage />} />
        <Route path="validate-email" element={<SignupPage />} />
        <Route path="password" element={<SignupPage />} />
        <Route path="nickname" element={<SignupPage />} />
      </Route>
      <Route path="/signup-complete" element={<SignupCompletePage />} />
      <Route path="/user" element={<UserPage />}>
        <Route path="info" element={<UserInfo />} />
        <Route path="booked" element={<UserBooked />} />
        <Route path="reviews" element={<UserReviews />} />
        <Route path="questions" element={<UserQuestions />} />
      </Route>
    </Routes>
  );
};

export default App;
