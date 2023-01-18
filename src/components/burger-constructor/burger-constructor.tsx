import { useContext, useReducer, useEffect } from 'react';
import styles from './burger-constructor.module.scss';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerContext, IIngridientsData } from '../../shared/interfaces';
import { BurgerContext } from '../../utils/contexts';

const initTotalPriceState = { totalPrice: 0 };

function totalPriceReducer(totalPriceState: { totalPrice: number }, items: any) {
    const sum = items.bun.price * 2 + items.ingredients.reduce((acc: number, p: IIngridientsData) => acc + p.price, 0)
    return { totalPrice: sum }
}

function BurgerConstructor() {
    const { orderItems, onOrderButtonClick } = useContext<IBurgerContext>(BurgerContext);
    const [totalPriceState, totalPriceDispatch] = useReducer(totalPriceReducer, initTotalPriceState);

    useEffect(() => {
        totalPriceDispatch( orderItems );
    }, [orderItems]);

    return(
        <main>
            <ul className={styles.list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8' key="top_bun">
                    <ConstructorElement 
                        type='top'
                        isLocked={true}
                        text={orderItems?.bun.name + ' (верх)'}
                        thumbnail={orderItems.bun.image}
                        price={orderItems.bun.price}
                    />
                </li>
                {
                    orderItems.ingredients.length > 0 ?
                        <ul className={styles.draggable_list + ' pr-2'} key="ingredients">
                            {
                                orderItems.ingredients.map((item: IIngridientsData, index: number) => (
                                    <li className={styles.draggable_item}
                                        key={item._id + '_' + index}>
                                        <span className={styles.drag_icon}>
                                            <DragIcon type='primary' />
                                        </span>
                                        <ConstructorElement 
                                            text={item.name}
                                            thumbnail={item.image}
                                            price={item.price}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    :  
                        <h3 className={styles.warningText + ' text text_type_main-default text_color_inactive pt-6 pb-6'}>
                            Добавьте ингредиенты
                        </h3>
                }
                <li className='pl-8' key="bottom_bun">
                    <ConstructorElement 
                        isLocked={true}
                        type='bottom'
                        text={orderItems.bun.name + ' (низ)'}
                        thumbnail={orderItems.bun.image}
                        price={orderItems.bun.price}
                    />
                </li>
            </ul>
            <div className={styles.order + ' mr-4 mb-10'}>
                <p className="text text_type_digits-medium">
                    {totalPriceState.totalPrice}
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="medium" htmlType="button" onClick={onOrderButtonClick}>
                    Оформить заказ
                </Button>
            </div>
        </main>
    );
}

export default BurgerConstructor;