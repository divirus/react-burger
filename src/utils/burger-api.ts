import { checkResponse } from "./check-response";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredientsData = async () => {
  return await fetch(API_URL).then(
    checkResponse
  );
};