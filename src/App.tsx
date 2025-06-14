import { Route, Routes } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage/LoginPage';
import MainPage from '@/pages/MainPage/MainPage';
import SignupCompletePage from '@/pages/SignupCompletePage/SignupCompletePage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import UserPage from '@/pages/UserPage/UserPage';

import AmericasProductList from './components/ProductLists/AmericasProductList/AmericasProductList';
import AsiaProductList from './components/ProductLists/AsiaProductList/AsiaProductList';
import AustraliaProductList from './components/ProductLists/AustraliaProductList/AustraliaProductList';
import ChinaProductList from './components/ProductLists/ChinaProductList/ChinaProductList';
import DomesticProductList from './components/ProductLists/DomesticProductList/DomesticProductList';
import EuropeProductList from './components/ProductLists/EuropeProductList/EuropeProductList';
import EventProductList from './components/ProductLists/EventProductList/EventProductList';
import HoneymoonProductList from './components/ProductLists/HoneymoonProductList/HoneymoonProductList';
import JapanProductList from './components/ProductLists/JapanProductList/JapanProductList';
import JejuProductList from './components/ProductLists/JejuProductList/JejuProductList';
import TourProductList from './components/ProductLists/TourProductList/TourProductList';
import UsProductList from './components/ProductLists/UsProductList/UsProductList';
import WorkshopProductList from './components/ProductLists/WorkshopProductList/WorkshopProductList';
import UserBooked from './components/UserBooked/UserBooked';
import UserInfo from './components/UserInfo/UserInfo';
import UserQuestions from './components/UserQuestions/UserQuestions';
import UserReviews from './components/UserReviews/UserReviews';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';

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
      <Route path="/product-list" element={<ProductListPage />}>
        <Route path="jeju" element={<JejuProductList />} />
        <Route path="domestic" element={<DomesticProductList />} />
        <Route path="europe" element={<EuropeProductList />} />
        <Route path="asia" element={<AsiaProductList />} />
        <Route path="china" element={<ChinaProductList />} />
        <Route path="japan" element={<JapanProductList />} />
        <Route path="americas" element={<AmericasProductList />} />
        <Route path="australia" element={<AustraliaProductList />} />
        <Route path="us" element={<UsProductList />} />
        <Route path="tour" element={<TourProductList />} />
        <Route path="honeymoon" element={<HoneymoonProductList />} />
        <Route path="workshop" element={<WorkshopProductList />} />
        <Route path="event" element={<EventProductList />} />
      </Route>
      <Route path="/product-detail" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default App;
