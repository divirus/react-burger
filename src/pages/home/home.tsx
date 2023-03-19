import styles from './home.module.scss';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients-list/burger-ingredients-list';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';
import Loader from '../../components/loader/loader';
import { useSelector } from "react-redux";
import { orderSlice } from '../../services/recipe/order';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { IItemsSliceState, IOrderSliceState } from '../../shared/interfaces';
import { useAppDispatch } from '../../services/hooks';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { closeOrderModal } = orderSlice.actions;
  const { itemsPendingStatus } = useSelector((state: { items: IItemsSliceState }) => state.items);
  const { isOrderModalOpen } = useSelector((state: {order:IOrderSliceState}) => state.order);
  const closeModal = () => {
    dispatch(closeOrderModal());
  };

  return (
    <>
        {
          itemsPendingStatus === 'error' && (
            <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
              Ошибка загрузки
            </h2>
        )}
        {
          itemsPendingStatus === 'loading' && (
            <Loader />
        )}
        {
          itemsPendingStatus === 'success' && (
            <div className={styles.container}>
              <DndProvider backend={HTML5Backend}>
                <section className={styles.container_left + ' mr-5'}>
                  <BurgerIngredients />
                </section>
                <section className={styles.container_right + ' ml-5'}>
                  <BurgerConstructor />
                </section>
              </DndProvider>
            </div>
        )}
        {
          isOrderModalOpen && (
            <Modal 
              header={null}
              closeModal={closeModal}
            >
                <OrderDetails />
            </Modal>
        )}
    </>
  );
}

export default HomePage;