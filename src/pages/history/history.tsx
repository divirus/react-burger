import { useEffect } from 'react';
import { useSelector } from "react-redux";
import styles from './history.module.scss';
import LoginSidebar from '../../components/login-sidebar/login-sidebar';
import OrdersList from '../../components/orders-list/orders-list';
import Loader from '../../components/loader/loader';
import { feedSlice } from '../../services/feed';
import { getUser, userSlice, startHistory, stopHistory } from '../../services/user';
import { useAppDispatch } from '../../services/hooks';
import { IState } from '../../shared/interfaces';

export const HistoryPage = () => {
  const dispatch = useAppDispatch();

  const {
    itemsPendingStatus
  } = useSelector(
    (state: IState) => state.items
  );
  const {
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
    (state: IState) => state.user
  );
  const {
    orders,
    feedRequest,
    feedSuccess,
    feedFailed
  } = useSelector(
    (state: IState) => state.feed
  );

  const {
    wsConnected,
    wsError
  } = useSelector(
    (state: IState) => state.ws
  );

  const {
    resetStatus
  } = userSlice.actions;

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(startHistory());

    if (!userSuccess && !userRequest) {
      dispatch(getUser());
    }
    return () => {
      dispatch(stopHistory());
    };  
  }, [dispatch, userRequest, userSuccess, resetStatus]);

  useEffect(() => {
    if (wsConnected)
      dispatch(feedSlice.actions.success());
    else if (wsError)
      dispatch(feedSlice.actions.failed());
  }, [wsConnected, wsError, dispatch]);

  return(
    <>
        {
          (itemsPendingStatus === 'loading' || userRequest || feedRequest) && 
          (!userFailed || !feedFailed) && 
          (!userSuccess || !feedSuccess) && (
            <Loader />
        )}
        <div className={styles.history_container + ' mt-30'}>
        <LoginSidebar />
        <div className={styles.history_orders_container}>
          {
            (itemsPendingStatus === 'error' || userFailed || feedFailed) && 
            (!userRequest || !feedRequest) && 
            (!userSuccess || !feedSuccess) && (
              <h2 className='ml-30 text text_type_main-large text_color_inactive'>
                Ошибка загрузки
              </h2>
          )}
          {
            (itemsPendingStatus === 'success' && userSuccess && feedSuccess) && 
            (!userFailed || !feedFailed) && 
            (!userRequest || !feedRequest) && (
              <OrdersList 
                source='history'
                orders={orders}
              />
          )}
        </div>
      </div>
    </>
  );
}

export default HistoryPage;