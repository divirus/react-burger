import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedResetRoute = (props: {element: ReactElement}) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } }

  return from === '/forgot-password' ? props.element : <Navigate replace to="/forgot-password" />
}