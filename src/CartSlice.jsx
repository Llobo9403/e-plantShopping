import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const nameToRemove = action.payload;
      state.items = state.items.filter((item) => item.name !== nameToRemove);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((it) => it.name === name);
      if (item) {
        const q = Number(quantity);
        item.quantity = Number.isFinite(q) ? Math.max(1, q) : item.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
