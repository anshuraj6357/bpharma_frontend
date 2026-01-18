import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],   // array of property/room IDs OR objects
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;

      // prevent duplicates
      const exists = state.wishlist.find((w) => w.id === item.id);
      if (!exists) {
        state.wishlist.push(item);
      }
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== id);
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },

    hydrateWishlist: (state, action) => {
      state.wishlist = action.payload.wishlist || [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  hydrateWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
