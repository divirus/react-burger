import React, { useContext } from 'react';
import styles from './burger-ingredients-list.module.scss';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngridientsData } from '../../shared/interfaces';
import { Link } from 'react-scroll';
import { BurgerContext } from '../../utils/contexts';

function BurgerIngredientsList() {
    const [activeTab, setActiveTab] = React.useState<string>('bun')
    const { items } = useContext(BurgerContext);
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
                        items={items.filter((item: IIngridientsData) => item.type === tab.type)} 
                    />
                ))
            }
            </div>
        </main>
    );
}

export default BurgerIngredientsList;