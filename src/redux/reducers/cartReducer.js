import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalItems: 0, // Yeni eklenen değişken
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += parseFloat(action.payload.price);
      state.totalItems += 1;
    },
    removeItemFromCart(state, action) {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
        state.totalPrice -= parseFloat(itemToRemove.price);
        state.totalItems -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
