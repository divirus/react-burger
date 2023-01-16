import { IIngridientsData } from '../../shared/interfaces';
import styles from './ingredient-details.module.scss';

const nutritionsList = [
    {name: 'Калории, ккал', prop: 'calories'},
    {name: 'Белки, г', prop: 'proteins'},
    {name: 'Жиры, г', prop: 'fat'},
    {name: 'Углеводы, ккал', prop: 'carbohydrates'},
]

function IngredientDetails(props: { ingredient: IIngridientsData | undefined }) {
    const renderProp = (prop: string) => {
        switch(prop) {
            case 'calories':
                return props.ingredient?.calories;
            case 'proteins':
                return props.ingredient?.proteins;
            case 'fat':
                return props.ingredient?.fat;
            case 'carbohydrates':
                return props.ingredient?.carbohydrates;
        }
    }

    return(
        <div className={styles.container}>
             <img 
                src={props.ingredient?.image_large}
                alt={props.ingredient?.name}
                title={props.ingredient?.name}
            />           
            <h4 className='text text_type_main-medium mt-4 mb-8'>
                {props.ingredient?.name}
            </h4>
            <ul className={styles.nutrition_list}>
                {
                   nutritionsList.map((el: { name: string, prop: string }, index) => (
                    <li className={styles.nutrition_list_item} key={index}>
                        <p className="text text_type_main-default text_color_inactive">
                            {el.name}
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {renderProp(el.prop)}
                        </p>
                    </li>
                   )) 
                }
            </ul>
        </div>
    );
}

export default IngredientDetails;