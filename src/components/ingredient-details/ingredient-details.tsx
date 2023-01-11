import PropTypes from 'prop-types';
import styles from './ingredient-details.module.scss';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientDetails(props: any) {
    return(
        <li className={styles.ingredient_card}>
            {props.value ? <Counter count={props.value}/> : null}
            <img src={props.image} alt={props.name} title={props.name} className="ml-4 mr-4"/>
                <div className={styles.ingredient_price + ' mt-1 mb-1 '}>
                    <p className='pr-2 text text_type_digits-default'>{props.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
            <p className={styles.ingredient_name + ' text text_type_main-default'}>
                {props.name}
            </p>
        </li>
    );
}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};

export default IngredientDetails;