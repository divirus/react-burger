import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients-list.module.scss';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsList(props: any) {
    const [activeTab, setActiveTab] = React.useState('bun')
    return(
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <div className={styles.tab_selector}>
                <Tab value="bun" active={activeTab === 'bun'} onClick={() => setActiveTab("bun")}>
                    Булки
                </Tab>
                <Tab value="sauce" active={activeTab === 'sauce'} onClick={() => setActiveTab("sauce")}>
                    Соусы
                </Tab>
                <Tab value="main" active={activeTab === 'main'} onClick={() => setActiveTab("main")}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredients_list_container}>
                <IngredientsCategory title="Булки" items={props.items.filter((item: any) => item.type === 'bun')} />
                <IngredientsCategory title="Соусы" items={props.items.filter((item: any) => item.type === 'sauce')} />
                <IngredientsCategory title="Начинки" items={props.items.filter((item: any) => item.type === 'main')} />
            </div>
        </>
    );
}

BurgerIngredientsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default BurgerIngredientsList;