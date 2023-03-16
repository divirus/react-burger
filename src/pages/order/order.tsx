import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams, useLocation  } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import OrderDetailedView from '../../components/order-detailed-view/order-detailed-view';
import { feedSlice, startFeed, stopFeed } from '../../services/feed';
import { useAppDispatch } from '../../services/hooks';
import { startHistory, stopHistory } from '../../services/user';
import { IOrder } from '../../shared/interfaces';

export const OrderPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isFeedPage = location.pathname.split('/')[1] === 'feed';
  
  const {
    itemsPendingStatus
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

  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(() => {
    if(isFeedPage)
      dispatch(startFeed());
    else
      dispatch(startHistory());
    return () => {
      if(isFeedPage)
        dispatch(stopFeed());
      else
        dispatch(stopHistory());
    };  
  }, [dispatch, isFeedPage]);

  const currentOrderId = useParams().id;

  useEffect(() => {
    if (orders.length > 0 && wsConnected) {
      setCurrentOrder(orders.find((order: IOrder) => order._id === currentOrderId))
      dispatch(feedSlice.actions.success());
    }
    else if (wsError)
      dispatch(feedSlice.actions.failed());
    else 
      dispatch(feedSlice.actions.request());
  }, [wsConnected, orders, wsError, dispatch, currentOrderId]);

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
        (itemsPendingStatus === 'success' && feedSuccess ) &&
        (Object.keys(currentOrder).length > 0) &&
        (!feedFailed) && 
        (!feedRequest) && (
          <div className='fullscreen_message'>
            <OrderDetailedView
              order={currentOrder}
            />
          </div>
        )}
    </>
  );
}

export default OrderPage;