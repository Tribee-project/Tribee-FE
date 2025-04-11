import { Route, Routes } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage/LoginPage';
import MainPage from '@/pages/MainPage/MainPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
