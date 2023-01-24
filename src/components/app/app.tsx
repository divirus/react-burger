import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./app.module.scss"
import AppHeader from '../app-header/app-header';
import { IIngredientsDataUseState, IIngridientsData, IOrderData, IOrderDataResponse } from "../../shared/interfaces";
import Modal from "../modal/modal";
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getIngredientsData, getOrdersData } from "../../utils/api";
import { BurgerContext } from "../../utils/contexts";

function App() {
  const [ingredientsData, setIngredientsData] = useState<IIngredientsDataUseState>({
    items: [],
    loadingState: null, // 'loading' || 'error' || 'success' || null
  });
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<IOrderData>({id: 0, name: '', success: false});
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

  const bun = useMemo(() => ingredientsData.items.filter(item => item.type === 'bun')[0], [ingredientsData.items]);
  const ingredients = useMemo(() => ingredientsData.items.filter(item => (item.type === 'sauce' || item.type === 'main')).slice(5, 10), [ingredientsData.items]);
  const orderItems = {
    bun,
    ingredients
  }

  const closeAllModals = () => {
    setIsOrderModalOpen(false);
    setIsIngredientModalOpen(false);
  };

  const openIngredientModal = useCallback((clickedItem: IIngridientsData) => {
    setSelectedItem(clickedItem);
    setIsIngredientModalOpen(true);
  }, []);
  
  const openOrderModal = () => {
    const items: string[] = [bun._id].concat(ingredients.map(item => item._id));

    getOrdersData(items)
    .then((data: IOrderDataResponse) => {
      if (data.success)
        setOrderData({ id: data.order.number, name: data.name, success: data.success });
      else {
        throw Error(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsOrderModalOpen(true);
    })
  };
    
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
          <BurgerContext.Provider value={{
            items: ingredientsData.items,
            orderItems,
            onOrderButtonClick: openOrderModal,
            onIngredientClick: openIngredientModal 
          }}>
            <div className={styles.container}>
              <section className={styles.container_left + ' mr-5'}>
                <BurgerIngredientsList />
              </section>
              <section className={styles.container_right + ' ml-5'}>
                <BurgerConstructor />
              </section>
            </div>
          </BurgerContext.Provider>
        }
        {
          isOrderModalOpen &&
          <Modal 
            header={null}
            closeModal={closeAllModals}
          >
              <OrderDetails orderData={orderData} />
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
