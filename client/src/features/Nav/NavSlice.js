import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNav: "all",
  currentPage: "/"
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    resetNavigation: (state) => {
      state.selectedNav = initialState.selectedNav;
      state.currentPage = initialState.currentPage;
    },
    selectNavigation: (state, action) => {
      state.selectedNav = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const { resetNavigation, selectNavigation, setCurrentPage } =
  navSlice.actions;
export default navSlice.reducer;
