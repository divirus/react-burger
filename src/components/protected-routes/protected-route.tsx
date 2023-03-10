import { Navigate, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from '../../services/user';
import { Dispatch, ReactElement, useEffect } from 'react';
import { IUserSliceState } from '../../shared/interfaces';

export const ProtectedRoute = (props: {element: ReactElement}) => {
  const dispatch: Dispatch<any> = useDispatch();
  const location = useLocation();
  const { isAuthorized } = useSelector((state: {user: IUserSliceState}) => state.user);
  const { checkAuthorization } = userSlice.actions;

  useEffect(() => {
    dispatch(checkAuthorization())
  }, [dispatch, checkAuthorization]);

  return isAuthorized ? props.element : <Navigate replace to='/login' state={{ from: location}} />;
}