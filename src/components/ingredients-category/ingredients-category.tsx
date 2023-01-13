import PropTypes from 'prop-types';
import styles from './ingredients-category.module.scss';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BasicIngridientPropTypes } from '../../shared/prop-types/ingridients-prop-types';

const mockQntValue = 0;

function IngredientsCategory(props: {title: string, items:[]}) {
    return(
        <section>
            <h2 className="text text_type_main-medium mt-10 mb-6">
                {props.title}
            </h2>
            <ul className={styles.ingredients_list + ' ml-4 mt-6 mr-2 mb-10'}>
                {props.items.map((item: any) => 
                    <IngredientDetails name={item.name} price={item.price} image={item.image} value={mockQntValue} key={item._id}/>)
                }
            </ul>
        </section>
    );
}

IngredientsCategory.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        ...BasicIngridientPropTypes,
        _id: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default IngredientsCategory;