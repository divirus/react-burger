export interface IIngredientsData{
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

export interface IIngredientsDataWithKey extends IIngredientsData {
    key?: string;
}

export interface IDetailsCardProps extends IIngredientsDataWithKey {
    value?: number;
  };

export interface IIngredientsDataUseState {
    items: IIngredientsData[];
    loadingState: string | null;
};

export interface IOrder {
    _id?: string,
    createdAt?: string,
    updatedAt?: string,
    number?: number,
    name?: string,
    status?: string,
    ingredients?: Array<IIngredientsData>
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
    items: IIngredientsData[]
    orderItems: {
        bun: IIngredientsData,
        ingredients: IIngredientsData[]
    }
    onOrderButtonClick: () => void,
    onIngredientClick: (clickedItem: IIngredientsData) => void 
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
    selectedIngredient: IIngredientsData,
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
    bun: IIngredientsDataWithKey,
    ingredients: IIngredientsDataWithKey[],
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