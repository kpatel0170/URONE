import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./PostService";

const initialState = {
  posts: [],
  like: [],
  disLike: [],
  comment: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCommentLoading: false,
  isLikeLoading: false,
  message: "",
  selectedPost: null,
  postStatus: null,
  selectedPostId: "",
  postDetailId: undefined
};

const handleAsyncThunk = (asyncThunk, successCallback) => {
  return createAsyncThunk(asyncThunk, async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user._id;
      const response = await successCallback(data, token);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

// Create post
export const createPost = handleAsyncThunk("post/", postService.createPost);

// Update post
export const updateSinglePost = handleAsyncThunk(
  "post/updatePost",
  postService.updatePost
);

// Get all posts
export const getAllPosts = handleAsyncThunk(
  "post/getPosts",
  postService.getAllPosts
);

// Get post
export const getSinglePost = handleAsyncThunk(
  "post/getPost",
  postService.getSinglePost
);

// Delete posts
export const deletePost = handleAsyncThunk(
  "post/deletePost",
  postService.deletePost
);

// Like posts
export const likePost = handleAsyncThunk("post/like", postService.LikePost);

// Undo like posts
export const disLikePost = handleAsyncThunk(
  "post/disLike",
  postService.disLikePost
);

// create comment
export const createComment = handleAsyncThunk(
  "post/createComment",
  postService.createComment
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
      state.postStatus = true;
      state.selectedPostId = action.payload._id;
    },
    restSelectPost: (state, action) => {
      state.selectedPost = {
        id: null,
        title: "",
        text: "",
        image: []
      };
      state.postStatus = null;
      state.selectedPostId = "";
    },
    setPostDetailId: (state, action) => {
      state.postDetailId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(state.posts);
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.data._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSinglePost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { _id } = action.payload;
        console.log(action.payload);
        state.posts = state.posts.map((post) =>
          post._id === _id ? { ...post, ...action.payload } : post
        );
      })
      .addCase(updateSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = [action.payload];
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = false;
        state.isLikeLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLikeLoading = false;
        state.isSuccess = true;

        if (state.postDetailId != undefined) {
          state.posts = action.payload;
        } else {
          const { _id } = action.payload;
          state.posts = state.posts.map((post) =>
            post._id === _id ? { ...post, ...action.payload } : post
          );
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isLikeLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(disLikePost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(disLikePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.postDetailId != undefined) {
          state.posts = action.payload;
        } else {
          const { _id } = action.payload;
          state.posts = state.posts.map((post) =>
            post._id === _id ? { ...post, ...action.payload } : post
          );
        }
      })
      .addCase(disLikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = false;
        state.isCommentLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCommentLoading = false;
        state.isSuccess = true;
        if (state.postDetailId != undefined) {
          state.posts = action.payload;
        } else {
          const { _id } = action.payload;
          state.posts = state.posts.map((post) =>
            post._id === _id ? { ...post, ...action.payload } : post
          );
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isCommentLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, selectPost, restSelectPost, setPostDetailId } =
  postSlice.actions;

export default postSlice.reducer;
