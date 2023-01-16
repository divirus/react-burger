import { useCallback, useEffect, useState } from "react";
import styles from "./app.module.scss"
import AppHeader from '../app-header/app-header';
import { IIngredientsDataUseState, IIngridientsData } from "../../shared/interfaces";
import Modal from "../modal/modal";
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getIngredientsData } from "../../utils/burger-api";

function App() {
  const [ingredientsData, setIngredientsData] = useState<IIngredientsDataUseState>({
    items: [],
    loadingState: null, // 'loading' || 'error' || 'success' || null
  });
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('123456');
  const [selectedItem, setSelectedItem] = useState<IIngridientsData>();

  useEffect(() => {
      setIngredientsData({...ingredientsData, loadingState: 'loading'})

      getIngredientsData()
      .then(({data}) => {
        setIngredientsData({ ...ingredientsData, items: data, loadingState: 'success' })
      })
      .catch((error) => {
        console.log(error);
        setIngredientsData({ ...ingredientsData, loadingState: 'error' })
      })
  }, []);

  const closeAllModals = () => {
    setIsOrderModalOpen(false);
    setIsIngredientModalOpen(false);
  };

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const openIngredientModal = useCallback((clickedItem: IIngridientsData) => {
    setSelectedItem(clickedItem);
    setIsIngredientModalOpen(true);
  }, []);

  const bun = ingredientsData.items.filter(item => item.type === 'bun')[0];
  const ingredients = ingredientsData.items.filter(item => (item.type === 'sauce' || item.type === 'main')).slice(5, 10);
    
  return (
    <main>
      <AppHeader />
        {
          ingredientsData.loadingState === 'error' &&
          <h2 className={styles.message + ' text text_type_main-large text_color_inactive'}>
            Ошибка загрузки
          </h2>
        }
        {
          ingredientsData.loadingState === 'loading' && 
          <h2 className={styles.message + ' text text_type_main-large text_color_inactive'}>
            Загрузка...
          </h2>
        }
        {
          ingredientsData.loadingState === 'success' && 
          <div className={styles.container}>
            <section className={styles.container_left + ' mr-5'}>
              <BurgerIngredientsList items={ingredientsData.items} onIngredientClick={openIngredientModal} />
            </section>
            <section className={styles.container_right + ' ml-5'}>
              <BurgerConstructor bun={bun} ingredients={ingredients} onOrderButtonClick={openOrderModal} />
            </section>
          </div>
        }
        {
          isOrderModalOpen &&
          <Modal 
            header={null}
            closeModal={closeAllModals}
          >
              <OrderDetails orderId={orderId} />
          </Modal>
        }
        {
          isIngredientModalOpen && 
          <Modal 
            header='Детали ингредиента'
            closeModal={closeAllModals} 
          >
              <IngredientDetails ingredient={selectedItem} />
          </Modal> 
        }
    </main>
  );
}

export default App;
