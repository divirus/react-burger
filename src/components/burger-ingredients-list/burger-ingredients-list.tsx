import React from 'react';
import styles from './burger-ingredients-list.module.scss';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientsData, IItemsSliceState } from '../../shared/interfaces';
import { Link } from 'react-scroll';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

function BurgerIngredientsList() {
    const [refBun, bunInView] = useInView({
        threshold: 0.1
    });
    const [refSauce, sauceInView] = useInView({
        threshold: 0.1
    });
    const [refMain, mainInView] = useInView({
        threshold: 0.1
    });

    const refType = (type: string) => {
        switch(type) {
            case 'bun':
                return refBun;
            case 'sauce':
                return refSauce;
            case 'main':
                return refMain;
        }
    }

    const onScroll = () => {
        if (bunInView) {
            setActiveTab('bun')
        } else if (sauceInView) {
            setActiveTab('sauce')
        } else if (mainInView) {
            setActiveTab('main')  
        }
      };
    
    const [activeTab, setActiveTab] = React.useState<string>('bun')
    const { items } = useSelector((state: { items: IItemsSliceState }) => state.items);
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
                    tabTypes.map((tab, i) => (
                        <Link
                            key={i}
                            to={`ingredients-block-${++i}`}
                            spy={true}
                            smooth={true}
                            duration={700}
                            offset={-20}
                            containerId="ingredients"
                        >
                            <Tab value={tab.type} active={activeTab === tab.type } onClick={setActiveTab}>
                                {tab.title}
                            </Tab>
                        </Link>
                    )) 
                }
            </div>
            <div id="ingredients" className={styles.scroll_container} onScroll={onScroll}>
            {
                tabTypes.map((tab, i) => (
                    <IngredientsCategory 
                        key={i}
                        id={++i}
                        title={tab.title} 
                        items={items?.filter((item: IIngredientsData) => item.type === tab.type)}
                        viewRef={refType(tab.type) as unknown as React.RefObject<HTMLElement>} 
                    />
                ))
            }
            </div>
        </main>
    );
}

export default BurgerIngredientsList;