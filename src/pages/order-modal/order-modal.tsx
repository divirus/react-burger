import { useEffect, useCallback, FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Modal from '../../components/modal/modal';
import Loader from '../../components/loader/loader';
import OrderDetailedView from '../../components/order-detailed-view/order-detailed-view';
import { feedSlice } from '../../services/feed';
import { itemsSlice } from '../../services/recipe/items';
import { IOrder, IState } from '../../shared/interfaces';

export const OrderModalPage: FC = () => {
  const dispatch = useDispatch();
  
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

  const { request } = itemsSlice.actions;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (wsConnected)
      dispatch(feedSlice.actions.success());
    else if (wsError)
      dispatch(feedSlice.actions.failed());
    else 
      dispatch(feedSlice.actions.request());
  }, [wsConnected, wsError, dispatch]);

  const currentOrderId: string = useParams<{ id: string }>().id || '';
  const currentOrder: IOrder = orders.find(order => order._id === currentOrderId) || {};

  const replaceState = useCallback(() => {
    dispatch(request())
    navigate(location, { 
      replace: true,
      state: { background: undefined }
    })
  }, [navigate, dispatch, location, request]);

  const closeModal = () => {
    navigate(location.state.background.pathname, { 
      replace: true
    })
  }

  useEffect(() => {
    window.addEventListener("beforeunload", replaceState);
    return () => {
      window.removeEventListener("beforeunload", replaceState);
    };
  }, [replaceState]);

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
          <Modal
            header={`#${currentOrder?.number?.toString().padStart(6, '0')}`}
            closeModal={closeModal} >
            <OrderDetailedView
              order={currentOrder}
              isOrderModal={true}
            />
          </Modal> 
        )}
    </>
  );
}

export default OrderModalPage;