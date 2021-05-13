import { ShopActionTypes } from "./shop.types";

export const updateCollections = (collectiosnMap) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectiosnMap,
});
