import { Dispatch, memo } from 'react';
import { useDrag } from 'react-dnd';
import { itemsSlice } from '../../services/recipe/items';
import { useDispatch } from 'react-redux';
import { ingredientSlice } from '../../services/recipe/ingredient';
import { IIngridientsDataWithKey } from '../../shared/interfaces';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/recipe/burger-constructor';
import {v4} from 'uuid';
import styles from './ingredient-details-card.module.scss';

export interface detailsCardProps extends IIngridientsDataWithKey {
    value?: number | undefined;
  };

  const IngredientDetailsCard = memo((props: {ingredient: detailsCardProps, key: string }) => {
    const dispatch: Dispatch<any> = useDispatch();
    const { openIngredientModal } = ingredientSlice.actions;
    const { increaseQuantityValue } = itemsSlice.actions;
    const { addIngredient } = burgerConstructorSlice.actions

    const handleIngredientClick = () => {
        dispatch(openIngredientModal(props.ingredient))
    }

    const [{opacity}, dragRef] = useDrag({
        type: props.ingredient.type,
        item: props.ingredient,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        }),
        end(item: IIngridientsDataWithKey, monitor) {
            if(monitor.didDrop() && item.type !== 'bun') {
                const uuidq = v4();
                dispatch(addIngredient({...item, key: uuidq}));
                dispatch(increaseQuantityValue(item._id));
            }
        }
      });

    return(
        <div className={styles.card} onClick={handleIngredientClick} ref={dragRef} style={{opacity}}>
            {
                props.ingredient?.value ? 
                    <Counter count={props.ingredient?.value}/> 
                : 
                    null
            }
            <img src={props.ingredient.image} alt={props.ingredient.name} title={props.ingredient.name} className="ml-4 mr-4"/>
            <div className={styles.price + ' mt-1 mb-1 '}>
                <p className='pr-2 text text_type_digits-default'>{props.ingredient.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className={styles.name + ' text text_type_main-default'}>
                {props.ingredient.name}
            </p>
        </div>
    );
})

export default IngredientDetailsCard;