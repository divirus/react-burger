import { FC, useEffect } from 'react';
import { useSelector } from "react-redux";
import styles from './feed.module.scss';
import OrdersList from '../../components/orders-list/orders-list';
import FeedPanel from '../../components/feed-panel/feed-panel';
import Loader from '../../components/loader/loader';
import { feedSlice, startFeed, stopFeed } from '../../services/feed';
import { useAppDispatch } from '../../services/hooks';
import { IState } from '../../shared/interfaces';

export const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  const {
    itemsPendingStatus
  } = useSelector(
    (state: IState) => state.items
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

  useEffect(() => {
    dispatch(startFeed());

    return () => {
      dispatch(stopFeed());
    };  
  }, [dispatch]);

  useEffect(() => {
    if (wsConnected && orders.length > 0)
      dispatch(feedSlice.actions.success());
    else if (wsError)
      dispatch(feedSlice.actions.failed());
  }, [wsConnected, wsError, orders, dispatch]);

  return(
    <>
      {
        (itemsPendingStatus === 'loading' || feedRequest) && 
        (!feedFailed) && 
        (!feedSuccess) && (
          <Loader />
      )}
      {
        (itemsPendingStatus === 'error' || feedFailed) && 
        (!feedRequest) && 
        (!feedSuccess) && (
          <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
            Ошибка загрузки
          </h2>
      )}
      {
        (itemsPendingStatus === 'success' && feedSuccess) && 
        (!feedFailed) && 
        (!feedRequest) && (
          <>
            <h1 className={
              styles.feed_title + ' mt-10 mb-5 text text_type_main-large text_color_default'
            }>
                Лента заказов
            </h1>
            <div className={styles.feed_container}>
              <div className={styles.feed_orders_container}>
                <OrdersList 
                  source='feed'
                  orders={orders}
                />
              </div>
              <div className={styles.feed_info_container}>
                 <FeedPanel />
              </div>
            </div>
          </>
      )}
    </>
  );
}

export default FeedPage;