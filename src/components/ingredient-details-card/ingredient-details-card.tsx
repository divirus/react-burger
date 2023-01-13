import PropTypes from 'prop-types';
import styles from './ingredient-details-card.module.scss';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BasicIngridientPropTypes } from '../../shared/prop-types';

function IngredientDetailsCard(props: any) {
    const handleIngredientClick = () => {
        props.onIngredientClick(props.ingredient)
    }

    return(
        <li className={styles.card} onClick={handleIngredientClick}>
            {props.ingredient?.value ? <Counter count={props.ingredient?.value}/> : null}
            <img src={props.ingredient.image} alt={props.ingredient.name} title={props.ingredient.name} className="ml-4 mr-4"/>
                <div className={styles.price + ' mt-1 mb-1 '}>
                    <p className='pr-2 text text_type_digits-default'>{props.ingredient.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
            <p className={styles.name + ' text text_type_main-default'}>
                {props.ingredient.name}
            </p>
        </li>
    );
}

IngredientDetailsCard.propTypes = {
    ingredient: PropTypes.shape({
        ...BasicIngridientPropTypes,
        value: PropTypes.number,
    }),
    onIngredientClick: PropTypes.func
};

export default IngredientDetailsCard;