import styles from './ingredients-category.module.scss';
import IngredientDetailsCard from '../ingredient-details-card/ingredient-details-card';
import { IIngredientsData } from '../../shared/interfaces';
import { forwardRef, RefObject } from 'react';

const IngredientsCategory = forwardRef((props: {id: number, title: string, items: IIngredientsData[], viewRef: RefObject<HTMLElement>}, ref: unknown) => {
    return(
        <section id={`ingredients-block-${props.id}`} ref={props.viewRef}>
            <h2 className="text text_type_main-medium mt-10 mb-6">
                {props.title}
            </h2>
            {
                props.items.length > 0 ?
                    <ul className={styles.ingredients_list + ' ml-4 mt-6 mr-2 mb-10'}>
                        {
                            props.items.map((ingredient: IIngredientsData) => 
                                <IngredientDetailsCard
                                    ingredient={ingredient} 
                                    key={ingredient._id || ''}
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
})

export default IngredientsCategory;