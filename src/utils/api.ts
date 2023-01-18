
import { checkResponse, request } from "./check-response";

const BASE_URL = 'https://norma.nomoreparties.space/api/'
const INGRIDIENTS_API_URL = 'ingredients';
const ORDERS_API_URL = 'orders';

export const getIngredientsData = async () => {
  return await request(BASE_URL + INGRIDIENTS_API_URL);
};

export const getOrdersData = async (items: string[]) => {
  const params: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": items
    })
  }

  return await request(BASE_URL + ORDERS_API_URL, params);
}