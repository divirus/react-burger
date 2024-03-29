import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Loader from '../../components/loader/loader';
import { itemsSlice } from '../../services/recipe/items';
import { IIngredientsData, IItemsSliceState } from '../../shared/interfaces';
import { useAppDispatch } from '../../services/hooks';

export const IngredientModalPage = () => {
  const dispatch = useAppDispatch();
  const { items, itemsPendingStatus } = useSelector((state: { items: IItemsSliceState }) => state.items);
  const { request } = itemsSlice.actions;

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const currentItem = items.find((item: IIngredientsData) => item._id === id);

  const replaceState = useCallback(() => {
    dispatch(request())
    navigate(location, { state: { background: undefined } })
  }, [dispatch, navigate, location, request]);

  const closeModal = () => {
    navigate('/', {replace: true})
  }

  useEffect(() => {
    window.addEventListener("beforeunload", replaceState);
    return () => {
      window.removeEventListener("beforeunload", replaceState);
    };
  }, [replaceState]);
  
  return (
    <>
      {
        itemsPendingStatus === 'loading' && (
          <Loader />
      )}
      {
        itemsPendingStatus === 'error' && (
          <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
            Ошибка загрузки
          </h2>
      )}
      {
        itemsPendingStatus === 'success' && (
          <Modal 
            header='Детали ингредиента'
            closeModal={closeModal} >
              <IngredientDetails ingredient={currentItem} />
          </Modal> 
      )}
  </>
  );
}

export default IngredientModalPage;