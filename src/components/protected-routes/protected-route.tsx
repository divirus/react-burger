import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from '../../services/user';
import { Dispatch, useEffect } from 'react';

export const ProtectedRoute = ({element}: any) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { isAuthorized } = useSelector((state: any) => state.user);
  const { checkAuthorization } = userSlice.actions;

  useEffect(() => {
    dispatch(checkAuthorization())
  }, [dispatch, checkAuthorization]);

  return isAuthorized ? element : <Navigate replace to='/login' />;
}