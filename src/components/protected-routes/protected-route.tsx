import { Navigate, useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import { userSlice } from '../../services/user';
import { ReactElement, useEffect } from 'react';
import { IUserSliceState } from '../../shared/interfaces';
import { useAppDispatch } from '../../services/hooks';

export const ProtectedRoute = (props: {element: ReactElement}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthorized } = useSelector((state: {user: IUserSliceState}) => state.user);
  const { checkAuthorization } = userSlice.actions;

  useEffect(() => {
    dispatch(checkAuthorization())
  }, [dispatch, checkAuthorization]);

  return isAuthorized ? props.element : <Navigate replace to='/login' state={{ from: location}} />;
}