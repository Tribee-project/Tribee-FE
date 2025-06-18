import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import UserBooked from '@/components/UserBooked/UserBooked';
import UserInfo from '@/components/UserInfo/UserInfo';
import UserQuestions from '@/components/UserQuestions/UserQuestions';
import UserReviews from '@/components/UserReviews/UserReviews';
import LoginPage from '@/pages/LoginPage/LoginPage';
import MainPage from '@/pages/MainPage/MainPage';
import ProductListPage from '@/pages/ProductListPage/ProductListPage';
import SignupCompletePage from '@/pages/SignupCompletePage/SignupCompletePage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import UserPage from '@/pages/UserPage/UserPage';

const JejuProductList = lazy(
  () => import('@/components/ProductLists/JejuProductList/JejuProductList'),
);
const DomesticProductList = lazy(
  () =>
    import('@/components/ProductLists/DomesticProductList/DomesticProductList'),
);
const EuropeProductList = lazy(
  () => import('@/components/ProductLists/EuropeProductList/EuropeProductList'),
);
const AsiaProductList = lazy(
  () => import('@/components/ProductLists/AsiaProductList/AsiaProductList'),
);
const ChinaProductList = lazy(
  () => import('@/components/ProductLists/ChinaProductList/ChinaProductList'),
);
const JapanProductList = lazy(
  () => import('@/components/ProductLists/JapanProductList/JapanProductList'),
);
const AmericasProductList = lazy(
  () =>
    import('@/components/ProductLists/AmericasProductList/AmericasProductList'),
);
const AustraliaProductList = lazy(
  () =>
    import(
      '@/components/ProductLists/AustraliaProductList/AustraliaProductList'
    ),
);
const UsProductList = lazy(
  () => import('@/components/ProductLists/UsProductList/UsProductList'),
);

const HoneymoonProductList = lazy(
  () =>
    import(
      '@/components/ProductLists/HoneymoonProductList/HoneymoonProductList'
    ),
);
const WorkshopProductList = lazy(
  () =>
    import('@/components/ProductLists/WorkshopProductList/WorkshopProductList'),
);

const ProductDetailPage = lazy(
  () => import('@/pages/ProductDetailPage/ProductDetailPage'),
);

const EventPage = lazy(() => import('@/pages/EventPage/EventPage'));
const TourPage = lazy(() => import('@/pages/TourPage/TourPage'));

const LoadingSpinner = () => (
  <div className="flex min-h-96 items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-amber-500"></div>
  </div>
);

const signupRoutes = ['email', 'validate-email', 'password', 'nickname'];

const userRoutes = [
  { path: 'info', component: UserInfo },
  { path: 'booked', component: UserBooked },
  { path: 'reviews', component: UserReviews },
  { path: 'questions', component: UserQuestions },
];

const productListRoutes = [
  { path: 'jeju', component: JejuProductList },
  { path: 'domestic', component: DomesticProductList },
  { path: 'europe', component: EuropeProductList },
  { path: 'asia', component: AsiaProductList },
  { path: 'china', component: ChinaProductList },
  { path: 'japan', component: JapanProductList },
  { path: 'americas', component: AmericasProductList },
  { path: 'australia', component: AustraliaProductList },
  { path: 'us', component: UsProductList },
  { path: 'honeymoon', component: HoneymoonProductList },
  { path: 'workshop', component: WorkshopProductList },
];

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route path="/" element={<MainPage />} />

      {/* 인증 관련 라우트 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup">
        {signupRoutes.map((route) => (
          <Route key={route} path={route} element={<SignupPage />} />
        ))}
      </Route>
      <Route path="/signup-complete" element={<SignupCompletePage />} />

      {/* 사용자 페이지 */}
      <Route path="/user" element={<UserPage />}>
        {userRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>

      {/* 상품 목록 페이지 */}
      <Route path="/product-list" element={<ProductListPage />}>
        {productListRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>

      {/* 상품 상세 페이지 */}
      <Route
        path="/product-detail/:id"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <ProductDetailPage />
          </Suspense>
        }
      />

      {/* 이벤트 페이지 */}
      <Route path="/event" element={<EventPage />} />

      {/* 투어 페이지 */}
      <Route path="/tour" element={<TourPage />} />
    </Routes>
  );
};

export default AppRoutes;
