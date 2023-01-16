import styles from './ingredients-category.module.scss';
import IngredientDetailsCard from '../ingredient-details-card/ingredient-details-card';
import { IIngridientsData } from '../../shared/interfaces';

function IngredientsCategory(props: {id: number, title: string, items: IIngridientsData[], onIngredientClick: (clickedItem: IIngridientsData) => void}) {
    return(
        <section id={`ingredients-block-${props.id}`}>
            <h2 className="text text_type_main-medium mt-10 mb-6">
                {props.title}
            </h2>
            {
                props.items.length > 0 ?
                    <ul className={styles.ingredients_list + ' ml-4 mt-6 mr-2 mb-10'}>
                        {props.items.map((ingredient: IIngridientsData) => 
                            <IngredientDetailsCard
                                ingredient={ingredient} 
                                key={ingredient._id}
                                onIngredientClick={props.onIngredientClick}
                            />)
                        }
                    </ul>
                :
                    <h3 className='text text_type_main-default text_color_inactive pb-6'>
                        Категория пуста
                    </h3>
            }
        </section>
    );
}

export default IngredientsCategory;