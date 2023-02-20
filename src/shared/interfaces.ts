export interface IIngridientsData{
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface IIngridientsDataWithKey extends IIngridientsData {
    key?: string;
}

export interface IIngredientsDataUseState {
    items: IIngridientsData[];
    loadingState: string | null;
};

export interface IOrderData {
    id: number;
    name: string;
    success: boolean;
}

export interface IOrderDataResponse {
    name: string;
    order: {
        number: number
    };
    success: boolean;
    message?: string;
}

export interface IBurgerContext {
    items: IIngridientsData[]
    orderItems: {
        bun: IIngridientsData,
        ingredients: IIngridientsData[]
    }
    onOrderButtonClick: () => void,
    onIngredientClick: (clickedItem: IIngridientsData) => void 
}

export interface IUser {
    password: string,
    email: string,
    name: string,
}

export interface IUserSliceState {
    user: IUser,
    userRequest: boolean,
    userFailed: boolean,
    userSuccess: boolean,
    isAuthorized: boolean
}

export interface IItemsSliceState {
    items: any,
    itemsPendingStatus: string;
}

export interface IIngredietsSliceState {
    selectedIngredient: IIngridientsData,
    isIngredientModalOpen: boolean
}

export interface IOrderSliceState {
    orderData?: IOrderData,
    orderPendingStatus: string,
    isOrderModalOpen: boolean,
}

export interface IBurgerConstructorSliceState {
    bun: IIngridientsDataWithKey,
    ingredients: IIngridientsDataWithKey[],
    totalPrice: number
}