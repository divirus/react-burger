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
  ProfilePage,
  IngredientPage,
  NotFound404,
  IngredientModalPage
} from '../../pages';
import { ProtectedRoute } from '../protected-routes/protected-route';
import { ProtectedResetRoute } from '../protected-routes/protected-reset-route';
import { ProtectedGuestRoute } from '../protected-routes/protected-guest-route';
import AppHeader from '../app-header/app-header';

function App() {
  const dispatch: Dispatch<any> = useDispatch();

  let location = useLocation();
  let background = location.state && location.state.background;

  const { itemsSuccess } = useSelector((state: any) => state.items);

  useEffect(() => {
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);

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
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <Routes>
        { background && <Route path="/ingredients/:id" element={<IngredientModalPage />} /> }
      </Routes>
    </>
  );
}

export default App;