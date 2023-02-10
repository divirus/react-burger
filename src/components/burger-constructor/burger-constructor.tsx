import { Dispatch, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-constructor.module.scss';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerConstructorSliceState, IIngridientsData, IIngridientsDataWithKey } from '../../shared/interfaces';
import { burgerConstructorSlice } from '../../services/recipe/burger-constructor';
import { itemsSlice } from '../../services/recipe/items';
import { createOrder } from '../../services/recipe/order';
import DraggableElement from '../draggable-element/draggable-element';
import { useNavigate } from 'react-router-dom';

function BurgerConstructor() {
    const dispatch: Dispatch<any> = useDispatch();
    const { increaseQuantityValue, decreaseQuantityValue } = itemsSlice.actions;
    const { setBun, calcTotalPrice } = burgerConstructorSlice.actions
    const { bun, ingredients, totalPrice } = useSelector((state: {burgerConstructor: IBurgerConstructorSliceState}) => state.burgerConstructor);
    const { isAuthorized } = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    const onOrderButtonClick = () => {
        if (isAuthorized) {
            const items = [bun._id];
            ingredients.map(item => items.push(item._id));
            dispatch(createOrder(items));
        } else {
            navigate('/login', { replace: true })
        }
    };

    useEffect(() => {
        dispatch(calcTotalPrice());
    }, [dispatch, bun, ingredients, calcTotalPrice]);

    const handleBunItemDrop = (newBun: IIngridientsData) => {
        dispatch(setBun(newBun));
        // Since the buns are the same, we should have two of the same buns in the recipe
        dispatch(decreaseQuantityValue(bun._id));
        dispatch(decreaseQuantityValue(bun._id));
        dispatch(increaseQuantityValue(newBun._id));
        dispatch(increaseQuantityValue(newBun._id));
    };

    const [, dropTopBunTarget] = useDrop({
        accept: 'bun',
        drop(newBun: IIngridientsData) {
            handleBunItemDrop(newBun);
        }
    });
    
    const [, dropBottomBunTarget] = useDrop({
        accept: 'bun',
        drop(newBun: IIngridientsData) {
            handleBunItemDrop(newBun);
        }
    });
    
    const [, dropIngredientTarget] = useDrop({
        accept: ['sauce', 'main']
    });

    return(
        <main>
            <ul className={styles.list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8' key="top_bun" ref={dropTopBunTarget}>
                    { !!bun?.name ?
                        <ConstructorElement 
                            type='top'
                            isLocked={true}
                            text={bun.name + ' (верх)'}
                            thumbnail={bun.image}
                            price={bun.price}
                        />
                    :
                        <div className={ styles.emptyBun + ' constructor-element constructor-element_pos_top'}>
                            &nbsp;
                        </div>
                    }
                </li>
                <li ref={dropIngredientTarget}>
                    {
                        ingredients?.length > 0 ?
                            <ul className={styles.draggable_list + ' pr-2'} key="ingredients">
                                {
                                    ingredients.map((item: IIngridientsDataWithKey, index: number) => (
                                        <DraggableElement 
                                            item={item}
                                            index={index}
                                            key={item.key}
                                        />
                                    ))
                                }
                            </ul>
                        :  
                            <h3 className={styles.warningText + ' text text_type_main-default text_color_inactive pt-6 pb-6'}>
                                {
                                    totalPrice === 0 ? ('Добавьте булку и ингредиенты') : ('Добавьте ингредиенты')
                                }
                            </h3>
                    }
                </li>
                <li className='pl-8' key="bottom_bun" ref={dropBottomBunTarget}>
                    {
                        !!bun?.name ?
                            <ConstructorElement 
                                isLocked={true}
                                type='bottom'
                                text={bun.name + ' (низ)'}
                                thumbnail={bun.image}
                                price={bun.price}
                            />
                        :
                            <div className={styles.emptyBun + ' constructor-element constructor-element_pos_bottom'}>
                                &nbsp;
                            </div>
                    }
                </li>
            </ul>
            <div className={`${styles.order} mr-4 mb-10 ${!bun.name ? styles.disabled : null}`}>
                <p className='text text_type_digits-medium'>
                    {totalPrice}
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type='primary' />
                </span>
                <Button type="primary" size="medium" htmlType="button" onClick={onOrderButtonClick}>
                        Оформить заказ
                </Button>
            </div>
        </main>
    );
}

export default BurgerConstructor;
