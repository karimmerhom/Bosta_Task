import { ActionTypes } from "../constants/actionTypes";


export const languageReducer = (state = {language: 'eng'}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LANGUAGE:
      return { ...state, language: payload };
    default:
      return state;
  }
};
