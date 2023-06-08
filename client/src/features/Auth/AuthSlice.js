import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './AuthService';
import { fabClasses } from '@mui/material';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register
export const userRegister = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try{
        return await authService.userRegister(user)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()        
        return thunkAPI.rejectWithValue(message);
    }
})

// Login
export const userLogin = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try{
        return await authService.userLogin(user)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Logout
export const logOut = createAsyncThunk('auth/logOut', async() => {
    await authService.userLogout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.message = action.payload
            })
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.message = action.payload
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.user = null
            })
    },
})

export const {reset} = authSlice.actions
export default authSlice.reducer