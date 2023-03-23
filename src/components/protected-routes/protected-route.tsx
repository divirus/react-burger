import { Navigate, useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import { userSlice } from '../../services/user';
import { ReactElement, useEffect } from 'react';
import { IState } from '../../shared/interfaces';
import { useAppDispatch } from '../../services/hooks';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute = (props: {element: ReactElement}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthorized } = useSelector((state: IState) => state.user);
  const { checkAuthorization } = userSlice.actions;
  const accessToken = getCookie('accessToken') !== undefined && getCookie !== null;

  useEffect(() => {
    dispatch(checkAuthorization())
  }, [dispatch, checkAuthorization]);

  return isAuthorized || accessToken ? props.element : <Navigate replace to='/login' state={{ from: location}} />;
}