import { ShopActionTypes } from "./shop.types";

const INITIAL_STATE = {
  collections: null,
};

const shopReducer = (previousState = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...previousState,
        collections: action.payload,
      };
    default:
      return previousState;
  }
};

export default shopReducer;
