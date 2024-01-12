import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./CommentService";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

// create comment
export const createComment = createAsyncThunk(
  "posts/createComment",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user._id;
      return await commentService.createComment(postData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete comment
export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user._id;
      return await commentService.deleteComment(postData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { _id } = action.payload;
        state.posts = state.posts.map((post) =>
          post._id === _id ? { ...post, ...action.payload } : post
        );
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.data._id
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
