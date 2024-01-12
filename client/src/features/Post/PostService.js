import axios from "axios";
import { API_URL } from "../../utils/env";

const API = API_URL + "post/";

//@desc Get All Posts
//@route GET /API_URL/posts/
const getAllPosts = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let requestAPI;
  if (data != undefined) {
    if (
      data.type === "usertype" &&
      (data.value === "staff" || data.value === "professor")
    ) {
      requestAPI = API + "?userType=" + data.value;
    } else if (data.type === "userId") {
      requestAPI = API + "?userId=" + data.value;
    }
  } else {
    requestAPI = API;
  }
  const response = await axios.get(requestAPI, config);
  return response.data;
};

//@desc Get single post
//@route GET /API_URL/posts/post_id
const getSinglePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API + id, config);
  return response.data;
};

//@desc Create post
//@route POST /API_URL/posts/
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      formData: true
    }
  };
  const response = await axios.post(API, postData, config);
  return response.data;
};

//@desc Update post
//@route PATCH /API_URL/posts/post_id
const updatePost = async (postData, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      formData: true
    }
  };

  const response = await axios.patch(API + id, postData, config);
  return response.data;
};

//@desc Delete post
//@route DELETE /API_URL/posts/post_id
const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.delete(API + id, config);
  return response.data;
};

//@desc Like post
//@route PATCH /API_URL/posts/post_id/like
const LikePost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const body = {
    "userId": postData.userId
  };
  const response = await axios.patch(API + postData.id + "/like", body, config);
  return response.data;
};

//@desc Dislike post
//@route PATCH /API_URL/posts/post_id/dislike
const disLikePost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const body = {
    "userId": postData.userId
  };
  const response = await axios.patch(
    API + postData.id + "/dislike",
    body,
    config
  );
  return response.data;
};

//@desc Create comment
//@route POST /API_URL/posts/comment
const createComment = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const body = {
    "userId": postData.userId,
    "comment": postData.commentInput
  };
  const response = await axios.post(
    API + postData.id + "/comment",
    body,
    config
  );
  return response.data;
};

const postService = {
  createPost,
  updatePost,
  getAllPosts,
  getSinglePost,
  deletePost,
  LikePost,
  disLikePost,
  createComment
};

export default postService;
