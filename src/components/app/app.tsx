import { mockData } from "../../utils/data"
import styles from "./app.module.scss"
import AppHeader from '../app-header/app-header';
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const topIngredient = mockData[0];
const middleIngredients = mockData.filter((i, key) => key > 0 && key < mockData.length-1 && key%2);
const bottomIngredient = mockData[mockData.length-1];

function App() {
    return (
        <>
          <AppHeader />
          <div className={styles.container}>
            <section className={styles.section_left + ' mr-5'}>
              <BurgerIngredientsList items={mockData}/>
            </section>
            <section className={styles.section_right + ' ml-5'}>
              <BurgerConstructor 
                topIngredient={topIngredient} 
                middleIngredients={middleIngredients} 
                bottomIngredient={bottomIngredient} 
              />
            </section>
          </div>
        </>
      );
}

export default App;
