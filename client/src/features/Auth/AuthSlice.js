import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";
import { fabClasses } from "@mui/material";

const user = JSON.parse(localStorage.getItem("user"));
const temp = JSON.parse(localStorage.getItem("temp"));

const initialState = {
  user: user ? user : null,
  temp: temp ? temp : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

// Register
export const userRegister = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await authService.userRegister(user);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login
export const userLogin = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.userLogin(user);
      localStorage.removeItem("temp");
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout
export const logOut = createAsyncThunk("auth/logOut", async () => {
  await authService.userLogout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    updateUserData: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.temp = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null;
      });
  }
});

export const { reset, updateUserData } = authSlice.actions;
export default authSlice.reducer;
