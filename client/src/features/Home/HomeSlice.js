import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isDrawer: false
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    reset: (state) => initialState,
    toggleDrawer: (state) => {
      state.isDrawer = !state.isDrawer;
      console.log(state.isDrawer);
    },
    openDrawer: (state) => {
      state.isDrawer = true;
    },
    closeDrawer: (state) => {
      state.isDrawer = false;
    }
  }
});

export const { reset, toggleDrawer, openDrawer, closeDrawer } =
  homeSlice.actions;
export default homeSlice.reducer;
