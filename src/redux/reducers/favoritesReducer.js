import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { product } = action.payload;
      if (!state.favorites.find((item) => item.id === product.id)) {
        state.favorites.push(product);
      }
    },
    removeFromFavorites: (state, action) => {
      const { productId } = action.payload;
      state.favorites = state.favorites.filter((item) => item.id !== productId);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
