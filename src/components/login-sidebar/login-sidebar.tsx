import { useSelector, useDispatch } from "react-redux";
import styles from './login-sidebar.module.scss';
import LoginSidebarLink from '../login-sidebar-link/login-sidebar-link';
import { logout, userSlice } from '../../services/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, Dispatch } from 'react';
import { IUserSliceState } from "../../shared/interfaces";

function LoginSidebar() {
  const dispatch: Dispatch<any> = useDispatch();

  const { userRequest } = useSelector((state: {user: IUserSliceState}) => state.user);
  const { resetStatus } = userSlice.actions;
  const isOrderPage = false;

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch, resetStatus])

  const navigate = useNavigate();

  const [isProfilePage, setProfilePage] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    switch (currentUrl) {
        case '/profile':
          setProfilePage(true);
          break;
        default:
          break;
    }
  }, [currentUrl, setProfilePage]);

  const onProfileClick = () => {
    navigate('/profile', { replace: true })

  };

  const redirectOnSuccess = () => {
    navigate('/login', { replace: true })
  }

  const onLogoutClick = () => {
    if (!userRequest) {
      dispatch(logout(redirectOnSuccess));
    }
  };

  return(
    <aside className={styles.sidebar_container}>
      <ul className={styles.sidebar_list}>
        <LoginSidebarLink
          text={'Профиль'}
          onClick={onProfileClick}
          active={isProfilePage}
        />
        <LoginSidebarLink
          text={'История заказов'}
          onClick={()=>{}}
          active={isOrderPage}
        /> 
        <LoginSidebarLink
          text={'Выход'}
          onClick={onLogoutClick}
        />
      </ul>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
);
}

export default LoginSidebar;