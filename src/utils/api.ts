import { checkResponse } from "./check-response";

const INGRIDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDERS_API_URL = 'https://norma.nomoreparties.space/api/orders';

export const getIngredientsData = async () => {
  return await fetch(INGRIDIENTS_API_URL).then(
    checkResponse
  );
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

  return await fetch(ORDERS_API_URL, params).then(
    checkResponse
  )
}