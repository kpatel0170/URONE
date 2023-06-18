import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './UserService';

const initialState = {
    users: [],
    singleUser: {},
    selectedUserId: undefined,
    isError: false,
    isSuccess: false,
    isLoading: false,
}

//@desc Get single user
export const getSingleUser = createAsyncThunk('users/getUser', async(userId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
        return await userService.getSingleUser(userId, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
        throw new Error(message)
    }
})

//@desc Update single user
export const updateSingleUser = createAsyncThunk('users/updateUser', async(userData, thunkAPI) => {
    try{
        console.log(userData)
        const token = thunkAPI.getState().auth.user._id;
        return await userService.editSingleUser(userData, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
        throw new Error(message)
    }
})

export const userSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setUser: (state, action) => {
            state.singleUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSingleUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.singleUser = action.payload
            })
            .addCase(getSingleUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateSingleUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSingleUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.singleUser = action.payload
            })
            .addCase(updateSingleUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        },
});

export const {reset, setUser} = userSlice.actions;
export default userSlice.reducer;