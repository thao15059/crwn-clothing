import CartActionTypes from "./cart.types";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (previousState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...previousState,
        hidden: !previousState.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...previousState,
        cartItems: addItemToCart(previousState.cartItems, action.payload),
      };
    default:
      return previousState;
  }
};

export default cartReducer;
