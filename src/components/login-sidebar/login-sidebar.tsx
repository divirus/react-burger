import { useSelector } from "react-redux";
import styles from './login-sidebar.module.scss';
import LoginSidebarLink from '../login-sidebar-link/login-sidebar-link';
import { logout, userSlice } from '../../services/user';

import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch } from "../../services/hooks";
import { IState } from "../../shared/interfaces";

function LoginSidebar() {
  const dispatch = useAppDispatch();

  const { userRequest } = useSelector((state: IState) => state.user);
  const { resetStatus } = userSlice.actions;
  
  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch, resetStatus])
  
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfilePage, setProfilePage] = useState(false);
  const [isHistoryPage, setHistoryPage] = useState(false);

  const currentUrl = location.pathname;
    
  useEffect(() => {
    switch (currentUrl) {
        case '/profile':
          setProfilePage(true);
          break;
        case '/profile/orders':
          setHistoryPage(true);
          break;
        default:
          break;
    }
  }, [currentUrl]);

  const onProfileClick = () => {
    navigate('/profile', { 
        replace: true
    })
  };
  const onHistoryClick = () => {
    navigate('/profile/orders', { 
        replace: true
    })
  };
  const redirectOnSuccess = () => {
    navigate('/login', { 
      replace: true
  })
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
          onClick={onHistoryClick}
          active={isHistoryPage}
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