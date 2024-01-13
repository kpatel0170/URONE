import axios from "axios";
import { API_URL } from "../../utils/env";

const API = API_URL + "post/";

const getAuthorizedConfig = (token, formData = false) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    ...(formData && { formData: true })
  }
});

const getRequestAPI = (data) => {
  if (
    data?.type === "usertype" &&
    ["staff", "professor"].includes(data.value)
  ) {
    return `${API}?userType=${data.value}`;
  } else if (data?.type === "userId") {
    return `${API}?userId=${data.value}`;
  } else {
    return API;
  }
};

const postService = {
  getAllPosts: async (data, token) => {
    const config = getAuthorizedConfig(token);
    const response = await axios.get(getRequestAPI(data), config);
    return response.data;
  },

  getSinglePost: async (id, token) => {
    const config = getAuthorizedConfig(token);
    const response = await axios.get(API + id, config);
    return response.data;
  },

  createPost: async (postData, token) => {
    const config = getAuthorizedConfig(token, true);
    const response = await axios.post(API, postData, config);
    return response.data;
  },

  updatePost: async (postData, id, token) => {
    const config = getAuthorizedConfig(token, true);
    const response = await axios.patch(
      `${API}${postData.postId}`,
      postData.postData,
      config
    );
    return response.data;
  },

  deletePost: async (id, token) => {
    const config = getAuthorizedConfig(token);
    const response = await axios.delete(API + id, config);
    return response.data;
  },

  LikePost: async (postData, token) => {
    const config = getAuthorizedConfig(token);
    const body = { userId: postData.userId };
    const response = await axios.patch(
      `${API}${postData.id}/like`,
      body,
      config
    );
    return response.data;
  },

  disLikePost: async (postData, token) => {
    const config = getAuthorizedConfig(token);
    const body = { userId: postData.userId };
    const response = await axios.patch(
      `${API}${postData.id}/dislike`,
      body,
      config
    );
    return response.data;
  },

  createComment: async (postData, token) => {
    const config = getAuthorizedConfig(token);
    const body = { userId: postData.userId, comment: postData.commentInput };
    const response = await axios.post(
      `${API}${postData.id}/comment`,
      body,
      config
    );
    return response.data;
  }
};

export default postService;
