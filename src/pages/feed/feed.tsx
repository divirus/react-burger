import { useEffect } from 'react';
import { useSelector } from "react-redux";
import styles from './feed.module.scss';
// importing components from project
import OrdersList from '../../components/orders-list/orders-list';
import FeedPanel from '../../components/feed-panel/feed-panel';
import Loader from '../../components/loader/loader';
// import slices and their functions
import { feedSlice, startFeed, stopFeed } from '../../services/feed';
import { useAppDispatch } from '../../services/hooks';

export const FeedPage = () => {
  const dispatch = useAppDispatch();

  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
    (state: any) => state.items
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
    wsConnected,
    wsError
  } = useSelector(
    (state: any) => state.ws
  );

  // we need to have feed from websocket in store to render orders data
  useEffect(() => {
    // open new websocket when the page is opened
    dispatch(startFeed());

    return () => {
      // close the websocket when the page is closed
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
        (itemsRequest || feedRequest) && 
        (!itemsFailed || !feedFailed) && 
        (!itemsSuccess || !feedSuccess) && (
          <Loader />
      )}
      {
        (itemsFailed || feedFailed) && 
        (!itemsRequest || !feedRequest) && 
        (!itemsSuccess || !feedSuccess) && (
          <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
            Ошибка загрузки
          </h2>
      )}
      {
        (itemsSuccess && feedSuccess) && 
        (!itemsFailed || !feedFailed) && 
        (!itemsRequest || !feedRequest) && (
          <>
            <h1 className={
              styles.feed_title +
              ' mt-10 mb-5 text text_type_main-large text_color_default'
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