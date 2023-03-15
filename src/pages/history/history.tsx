import { useEffect } from 'react';
import { useSelector } from "react-redux";
import styles from './history.module.scss';
// importing components from project
import LoginSidebar from '../../components/login-sidebar/login-sidebar';
import OrdersList from '../../components/orders-list/orders-list';
import Loader from '../../components/loader/loader';
// import slices and their functions
import { feedSlice } from '../../services/feed';
import { getUser, userSlice, startHistory, stopHistory } from '../../services/user';
import { useAppDispatch } from '../../services/hooks';

export const HistoryPage = () => {
  const dispatch = useAppDispatch();

  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
    (state: any) => state.items
  );
  const {
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
    (state: any) => state.user
  );
  const {
    orders,
    feedRequest,
    feedSuccess,
    feedFailed
  } = useSelector(
    (state: any) => state.feed
  );
  const {
    resetStatus
  } = userSlice.actions;

  const {
    wsConnected,
    wsError
  } = useSelector(
    (state: any) => state.ws
  );

  useEffect(() => {
    // reset errors on page load
    dispatch(resetStatus());

    // open new websocket when the page is opened
    dispatch(startHistory());

    // we need to have user from API in store to find user orders
    // won't call API if user data is already in process
    if (!userSuccess && !userRequest) {
      dispatch(getUser());
    }
    return () => {
      // close the websocket when the page is closed
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
          (itemsRequest || userRequest || feedRequest) && 
          (!itemsFailed || !userFailed || !feedFailed) && 
          (!itemsSuccess || !userSuccess || !feedSuccess) && (
            <Loader />
        )}
        <div className={styles.history_container + ' mt-30'}>
        <LoginSidebar />
        <div className={styles.history_orders_container}>
          {
            (itemsFailed || userFailed || feedFailed) && 
            (!itemsRequest || !userRequest || !feedRequest) && 
            (!itemsSuccess || !userSuccess || !feedSuccess) && (
              <h2 className='ml-30 text text_type_main-large text_color_inactive'>
                Ошибка загрузки
              </h2>
          )}
          {
            (itemsSuccess && userSuccess && feedSuccess) && 
            (!itemsFailed || !userFailed || !feedFailed) && 
            (!itemsRequest || !userRequest || !feedRequest) && (
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