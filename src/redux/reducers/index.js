import { combineReducers } from "redux";
import { languageReducer } from "./languageReducers";

const reducers = combineReducers({
  language: languageReducer,

});
export default reducers;