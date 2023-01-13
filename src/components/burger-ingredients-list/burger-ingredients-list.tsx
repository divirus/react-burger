import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients-list.module.scss';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BasicIngridientPropTypes } from '../../shared/prop-types';
import { IIngridientsData } from '../../shared/interfaces';
import { Link } from 'react-scroll';

function BurgerIngredientsList(props: { items: IIngridientsData[], onIngredientClick: any }) {
    const [activeTab, setActiveTab] = React.useState('bun')
    const tabTypes = [
        {type: 'bun', title: 'Булки'},
        {type: 'sauce', title: 'Соусы'},
        {type: 'main', title: 'Начинки'},
    ];
    
    return(
        <main>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <div className={styles.tab_selector}>
                {
                    tabTypes.map((tab: { type: string, title: string }, i) => (
                        <Link
                            key={i}
                            to={`ingredients-block-${++i}`}
                            spy={true}
                            smooth={true}
                            duration={700}
                            offset={-20}
                            containerId="ingredients"
                        >
                            <Tab value={tab.type} active={activeTab === tab.type} onClick={setActiveTab}>
                                {tab.title}
                            </Tab>
                        </Link>
                    )) 
                }
            </div>
            <div id="ingredients" className={styles.scroll_container}>
            {
                tabTypes.map((tab: { type: string, title: string }, i) => (
                    <IngredientsCategory 
                        key={i}
                        id={++i}
                        title={tab.title} 
                        items={props.items.filter((item: any) => item.type === tab.type)} 
                        onIngredientClick={props.onIngredientClick}
                    />
                ))
            }
            </div>
        </main>
    );
}

BurgerIngredientsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        ...BasicIngridientPropTypes,
        type: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredientsList;