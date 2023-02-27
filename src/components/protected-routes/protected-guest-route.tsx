import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from '../../services/user';
import { Dispatch, ReactElement, useEffect } from 'react';
import { IUserSliceState } from '../../shared/interfaces';

export const ProtectedGuestRoute = (props: {element: ReactElement}) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { isAuthorized } = useSelector((state: {user: IUserSliceState}) => state.user);
  const { checkAuthorization } = userSlice.actions;

  useEffect(() => {
    dispatch(checkAuthorization())
  }, [dispatch, checkAuthorization]);

  return isAuthorized ? <Navigate replace to="/profile" /> : props.element;
}