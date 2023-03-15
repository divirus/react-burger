import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// importing components from project
import Modal from '../../components/modal/modal';
import Loader from '../../components/loader/loader';
import OrderDetailedView from '../../components/order-detailed-view/order-detailed-view';
// import slices and their functions
import { feedSlice } from '../../services/feed';
import { itemsSlice } from '../../services/recipe/items';
import { IOrder } from '../../shared/interfaces';

export const OrderModalPage = () => {
  const dispatch = useDispatch();
  
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

  const currentOrderId = useParams().id;
  const currentOrder = orders.find((order: IOrder) => order._id === currentOrderId);

  const replaceState = useCallback(() => {
    // hiding the content on page before the reload starts
    dispatch(request())
    // remove the background element to show ingredient page instead of a modal
    navigate(location, { 
      replace: true,
      state: { background: undefined }
    })
  }, [navigate, dispatch, location, request]);

  // return to parent page if modal is closed
  const closeModal = () => {
    navigate(location.state.background.pathname, { 
      replace: true
    })
  }

  // handle state cleaning in case of page refresh
  useEffect(() => {
    window.addEventListener("beforeunload", replaceState);
    return () => {
      window.removeEventListener("beforeunload", replaceState);
    };
  }, [replaceState]);

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
          <Modal
            header={`#${currentOrder.number.toString().padStart(6, 0)}`}
            // isOrderModal={true}
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