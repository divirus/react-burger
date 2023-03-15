import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams, useLocation  } from 'react-router-dom';
// importing components from project
import Loader from '../../components/loader/loader';
import OrderDetailedView from '../../components/order-detailed-view/order-detailed-view';
// import slices and their functions
import { feedSlice, startFeed, stopFeed } from '../../services/feed';
import { useAppDispatch } from '../../services/hooks';
import { startHistory, stopHistory } from '../../services/user';
import { IOrder } from '../../shared/interfaces';

export const OrderPage = () => {
  const dispatch = useAppDispatch();
  // for user profile page we should open different websocket with auth token
  // useRouteMatch for some reason returning always null here
  const location = useLocation();
  const isFeedPage = location.pathname.split('/')[1] === 'feed';
  
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

    const [currentOrder, setCurrentOrder] = useState({});

  // we need to have feed from websocket in store to render orders data
  useEffect(() => {
    // open new websocket when the page is opened
    if(isFeedPage)
      dispatch(startFeed());
    else
      dispatch(startHistory());
    return () => {
      // close the websocket when the page is closed
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
        (itemsSuccess && feedSuccess ) &&
        (Object.keys(currentOrder).length !== 0) &&
        (!itemsFailed || !feedFailed) && 
        (!itemsRequest || !feedRequest) && (
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