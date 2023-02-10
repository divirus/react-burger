import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedResetRoute = ({element}: any) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } }

  return from === '/forgot-password' ? element : <Navigate replace to="/forgot-password" />
}