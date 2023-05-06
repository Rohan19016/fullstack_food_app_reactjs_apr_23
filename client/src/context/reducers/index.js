import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducers";
import allUserReducer from "./allUserReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  allUsers: allUserReducer,
  cart: cartReducer,
  isCart: displayCartReducer,
});

export default myReducers;
