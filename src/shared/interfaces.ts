export interface IIngridientsData{
    _id?: string;
    name?: string;
    type?: string;
    proteins?: number;
    fat?: number;
    carbohydrates?: number;
    calories?: number;
    price?: number;
    image?: string;
    image_mobile?: string;
    image_large?: string;
    __v?: number;
}

export interface IIngridientsDataWithKey extends IIngridientsData {
    key?: string;
}

export interface IDetailsCardProps extends IIngridientsDataWithKey {
    value?: number;
  };

export interface IIngredientsDataUseState {
    items: IIngridientsData[];
    loadingState: string | null;
};

export interface IOrder {
    _id?: string,
    createdAt?: string,
    updatedAt?: string,
    number?: number,
    name?: string,
    status?: string,
    ingredients?: Array<IIngridientsData>
  }

export interface IOrderDetailedView {
    order: IOrder,
    isOrderModal?: boolean
}

export interface INewOrder {
    id?: number,
    name?: string,
    number?: number,
    success?: boolean
}

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
    items: IDetailsCardProps[],
    itemsPendingStatus: string
}

export interface IIngredietsSliceState {
    selectedIngredient: IIngridientsData,
    isIngredientModalOpen: boolean
}

export interface IOrderSliceState {
    orderData?: IOrderData,
    orderRequest: boolean,
    orderSuccess: boolean,
    orderFailed: boolean,
    isOrderModalOpen: boolean,
}

export interface IBurgerConstructorSliceState {
    bun: IIngridientsDataWithKey,
    ingredients: IIngridientsDataWithKey[],
    totalPrice: number
}

export interface IRefreshTokenResponse {
    ok: boolean,
    status: number,
    statusText: string | undefined,
    json: any
}

export interface IRefreshTokenData {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    message: string | undefined
}

export interface IFeedSliceState {
    orders: Array<IOrder>,
    feedRequest: boolean,
    feedFailed: boolean,
    feedSuccess: boolean,
    ordersTotal: number,
    ordersTotalToday: number
  }

  export interface IWsState {
    wsConnected: boolean,
    wsError: boolean,
  }

  export interface IState {
    user: IUserSliceState,
    order: IOrderSliceState,
    feed: IFeedSliceState,
    items: IItemsSliceState,
    ws: IWsState
  }