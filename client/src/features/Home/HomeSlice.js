import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isDrawer: false
}

export const homeSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        reset: (state) => initialState,
        toggleDrawer: (state) => {
            state.isDrawer = !state.isDrawer;
            console.log(state.isDrawer)
        },
    },
});

export const {reset, toggleDrawer} = homeSlice.actions;
export default homeSlice.reducer;