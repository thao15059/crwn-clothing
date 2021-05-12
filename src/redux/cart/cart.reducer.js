import CartActionTypes from "./cart.types";

const INITIAL_STATE = {
  hidden: true,
};

const cartReducer = (previousState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...previousState,
        hidden: !previousState.hidden,
      };
    default:
      return previousState;
  }
};

export default cartReducer;
