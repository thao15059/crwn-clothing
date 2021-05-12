import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
});
