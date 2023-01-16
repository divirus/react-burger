import styles from './burger-constructor.module.scss';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngridientsData } from '../../shared/interfaces';

function BurgerConstructor(props: {bun: IIngridientsData, ingredients: IIngridientsData[], onOrderButtonClick: () => void }) {
    return(
        <main>
            <ul className={styles.list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8' key="top_bun">
                    <ConstructorElement 
                        type='top'
                        isLocked={true}
                        text={props.bun.name + ' (верх)'}
                        thumbnail={props.bun.image}
                        price={props.bun.price}
                    />
                </li>
                {
                    props.ingredients.length > 0 ?
                        <ul className={styles.draggable_list + ' pr-2'} key="ingredients">
                            {props.ingredients.map((item: IIngridientsData, index: number) => (
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
                            ))}
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
                        text={props.bun.name + ' (низ)'}
                        thumbnail={props.bun.image}
                        price={props.bun.price}
                    />
                </li>
            </ul>
            <div className={styles.order + ' mr-4 mb-10'}>
                <p className="text text_type_digits-medium">
                    {
                        (props.bun.price * 2) + props.ingredients.reduce((acc: number, p: IIngridientsData) => acc + p.price, 0)
                    }
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="medium" htmlType="button" onClick={props.onOrderButtonClick}>
                    Оформить заказ
                </Button>
            </div>
        </main>
    );
}

export default BurgerConstructor;