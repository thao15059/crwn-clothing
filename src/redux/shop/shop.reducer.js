import { ShopActionTypes } from "./shop.types";

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer = (previousState = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...previousState,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...previousState,
        isFetching: false,
        collections: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...previousState,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return previousState;
  }
};

export default shopReducer;
