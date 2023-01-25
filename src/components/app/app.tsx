import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.scss"
import AppHeader from '../app-header/app-header';
import Modal from "../modal/modal";
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { ingredientSlice } from "../../services/recipe/ingredient";
import { getItems } from "../../services/recipe/items";
import { orderSlice } from "../../services/recipe/order";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch: any = useDispatch();
  const { closeOrderModal } = orderSlice.actions;
  const { closeIngredientModal } = ingredientSlice.actions;

  const { itemsPendingStatus } = useSelector((state: any) => state.items);
  const { orderData, isOrderModalOpen } = useSelector((state: any) => state.order);
  const { selectedIngredient, isIngredientModalOpen } = useSelector((state: any) => state.ingredient);

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch]);

  const closeAllModals = () => {
    dispatch(closeOrderModal());
    dispatch(closeIngredientModal());
  };
    
  return (
    <main>
      <AppHeader />
        {
          itemsPendingStatus === 'error' &&
          <h2 className={styles.message + ' text text_type_main-large text_color_inactive'}>
            Ошибка загрузки
          </h2>
        }
        {
          itemsPendingStatus === 'loading' &&
          <h2 className={styles.message + ' text text_type_main-large text_color_inactive'}>
            Загрузка...
          </h2>
        }
        {
          itemsPendingStatus === 'success' && 
          <div className={styles.container}>
            <DndProvider backend={HTML5Backend}>
              <section className={styles.section_left + ' mr-5'}>
                <BurgerIngredientsList />
              </section>
              <section className={styles.section_right + ' ml-5'}>
                <BurgerConstructor />
              </section>
            </DndProvider>
          </div>
        }
        {
          isOrderModalOpen &&
          <Modal header={null} closeModal={closeAllModals}>
            <OrderDetails orderData={orderData} />
          </Modal>
        }
        {
          isIngredientModalOpen && 
          <Modal header='Детали ингредиента' closeModal={closeAllModals}>
            <IngredientDetails ingredient={selectedIngredient} />
          </Modal> 
        }
    </main>
  );
}

export default App;
