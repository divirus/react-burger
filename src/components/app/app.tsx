import { Dispatch, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation } from 'react-router-dom';
import { getItems } from '../../services/recipe/items';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  IngredientPage,
  NotFound404,
  IngredientModalPage,
  HistoryPage,
  OrderPage,
  FeedPage,
  OrderModalPage,
  ProfilePage
} from '../../pages';
import { ProtectedRoute } from '../protected-routes/protected-route';
import { ProtectedResetRoute } from '../protected-routes/protected-reset-route';
import { ProtectedGuestRoute } from '../protected-routes/protected-guest-route';
import AppHeader from '../app-header/app-header';
import { IItemsSliceState } from '../../shared/interfaces';

function App() {
  const dispatch: Dispatch<any> = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const { itemsPendingStatus } = useSelector((state: { items: IItemsSliceState }) => state.items);

  useEffect(() => {
    if (itemsPendingStatus !== 'success') {
      dispatch(getItems());
    }
  }, [dispatch, itemsPendingStatus]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
          <ProtectedGuestRoute element={<LoginPage /> } />
        } />
        <Route path="/register" element={
          <ProtectedGuestRoute element={<RegisterPage />} />
        } />
        <Route path="/forgot-password" element={
          <ProtectedGuestRoute element={<ForgotPasswordPage />} />
        } />
        <Route path="/reset-password" element={
          <ProtectedResetRoute element={<ResetPasswordPage />} />
        } />
        <Route path="/profile" element={
          <ProtectedRoute element={<ProfilePage />} />
        } />
        <Route path="/profile/orders" element={
          <ProtectedRoute element={<HistoryPage />} />
        } />
        <Route path="/profile/orders/:id" element={
          <ProtectedRoute element={<OrderPage />} />
        } />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<OrderPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      { background && background.pathname === '/' &&
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModalPage />} /> 
        </Routes>
      }
      { background && background.pathname === '/profile/orders' &&
        <Routes>
          <Route path="/profile/orders/:id" element={
            <ProtectedRoute element={<OrderModalPage />} />
          } /> 
        </Routes>
      }
      { background && background.pathname === '/feed' &&
        <Routes>
          <Route path="/feed/:id" element={
            <ProtectedRoute element={<OrderModalPage />} />
          } /> 
        </Routes>
      }
    </>
  );
}

export default App;