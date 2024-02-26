import { ActionTypes } from "../constants/actionTypes";

export const setLanguage = (language) => {
  return {
    type: ActionTypes.SET_LANGUAGE,
    payload: language,
  };
};