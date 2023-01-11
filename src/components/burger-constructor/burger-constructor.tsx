import PropTypes from 'prop-types';
import styles from './burger-constructor.module.scss';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props: any) {
    return(
        <>
            <ul className={styles.list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8' key="top_ingredient">
                    <ConstructorElement 
                        type='top'
                        isLocked={true}
                        text={props.topIngredient.name + ' (верх)'}
                        thumbnail={props.topIngredient.image}
                        price={props.topIngredient.price}
                    />
                </li>
                <ul className={styles.draggable_list + ' pr-2'} key="middle_ingredients">
                    {props.middleIngredients.map((item: any, index: any) => (
                        <li key={item._id + '_' + index}>
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
                <li className='pl-8' key="bottom_ingredient">
                    <ConstructorElement 
                        isLocked={true}
                        type='bottom'
                        text={props.bottomIngredient.name + ' (низ)'}
                        thumbnail={props.bottomIngredient.image}
                        price={props.bottomIngredient.price}
                    />
                </li>
            </ul>
            <div className={styles.order + ' mr-4 mb-10'}>
                <p className="text text_type_digits-medium">
                    {props.topIngredient.price + 
                    props.middleIngredients.reduce((acc: any, p: any) => acc + p.price, 0) +
                    props.bottomIngredient.price}
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="medium" htmlType="button">
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

BurgerConstructor.propTypes = {
    topIngredient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired        
    }),

    middleIngredients: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired 
    })),

    bottomIngredient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired        
    })
};

export default BurgerConstructor;