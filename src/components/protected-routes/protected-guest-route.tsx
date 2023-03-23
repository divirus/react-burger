import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userSlice } from '../../services/user';
import { ReactElement, useEffect } from 'react';
import { IUserSliceState } from '../../shared/interfaces';
import { useAppDispatch } from '../../services/hooks';

export const ProtectedGuestRoute = (props: {element: ReactElement}) => {
  const dispatch = useAppDispatch();
  const { isAuthorized } = useSelector((state: {user: IUserSliceState}) => state.user);
  const { checkAuthorization } = userSlice.actions;

  useEffect(() => {
    dispatch(checkAuthorization())
  }, [dispatch, checkAuthorization]);

  return isAuthorized ? <Navigate replace to="/profile" /> : props.element;
}