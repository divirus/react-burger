import React from 'react';
import styles from "./app.scss"
import AppHeader from '../app-header/app-header';
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className={styles.app}>
        <AppHeader />
        {/* {ingredientsLoading ? (
            <Preloader />
        ) : ( */}
            <>
                <h1
                    className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
                >
                    Соберите бургер
                </h1>
                <main className={`${styles.main} pl-5 pr-5`}>
                    <BurgerIngredientsList /* ingredients={ingredients} */ />
                    <BurgerConstructor /* constructorIngredients={ingredients} */ />
                </main>
            </>
        {/* )} */}
    </div>
  );
}

export default App;
