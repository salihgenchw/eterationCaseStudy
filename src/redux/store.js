import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import favoritesReducer from "./reducers/favoritesReducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});
