import { createContext } from 'react';
import { IBurgerContext, IIngridientsData } from '../shared/interfaces';

export const BurgerContext = createContext<IBurgerContext>({
    items: [],
    orderItems: {
        bun: {
            _id: '',
            name: '',
            type: '',
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: '',
            image_mobile: '',
            image_large: '',
            __v: 0
        },
        ingredients: []
    },
    onOrderButtonClick: () => {},
    onIngredientClick: (clickedItem: IIngridientsData) => {}
});