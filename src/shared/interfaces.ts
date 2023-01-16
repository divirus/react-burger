export interface IIngridientsData{
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

export interface IIngredientsDataUseState {
    items: IIngridientsData[],
    loadingState: string | null
};