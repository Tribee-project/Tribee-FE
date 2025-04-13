import { Route, Routes } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage/LoginPage';
import MainPage from '@/pages/MainPage/MainPage';

import SignupPage from './pages/SignupPage/SignupPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup">
        <Route path="email" element={<SignupPage />} />
        <Route path="validate-email" element={<SignupPage />} />
      </Route>
    </Routes>
  );
};

export default App;
