
import { request } from "./check-response";
import { getCookie } from "./cookie";

const BASE_URL = 'https://norma.nomoreparties.space/api/'
const WS_BASE_URL = 'wss://norma.nomoreparties.space/'
const INGRIDIENTS_API_URL = 'ingredients';
const ORDERS_API_URL = 'orders';

export const FORGOT_PASSWORD_API_URL = BASE_URL + 'password-reset';
export const RESET_PASSWORD_API_URL = BASE_URL + 'password-reset/reset';
export const REGISTER_API_URL = BASE_URL + 'auth/register';
export const LOGIN_API_URL = BASE_URL + 'auth/login';
export const LOGOUT_API_URL = BASE_URL + 'auth/logout';
export const TOKEN_API_URL = BASE_URL +'auth/token';
export const USER_API_URL = BASE_URL + 'auth/user';
export const ALL_ORDERS_WS_URL = WS_BASE_URL + 'orders/all';
export const USER_ORDERS_WS_URL = WS_BASE_URL + 'orders';

export const getIngredientsData = async () => {
  return await request(BASE_URL + INGRIDIENTS_API_URL);
};

export const getOrdersData = async (items: string[]) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Authorization', `${getCookie('accessToken')}`);

  const params: RequestInit = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      "ingredients": items
    })
  }

  return await request(BASE_URL + ORDERS_API_URL, params);
}