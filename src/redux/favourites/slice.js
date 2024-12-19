import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    itemsId: [],
  },
  reducers: {
    markAsFavorite: (state, action) => {
      const id = action.payload;
      if (state.itemsId.includes(id)) {
        state.itemsId = state.itemsId.filter((itemsId) => itemsId !== id);
      } else {
        state.itemsId.push(id);
      }
    },
  },
});

export const { markAsFavorite } = favouritesSlice.actions;
export const favsReducer = favouritesSlice.reducer;
