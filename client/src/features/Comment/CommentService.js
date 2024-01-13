import axios from "axios";
import { API_URL } from "../../utils/env";

const API = API_URL + "/post";

const createComment = async (postData, token) => {
  const response = await axios.post(
    `${API}${postData.id}/comment`,
    { userId: postData.userId },
    createRequestConfig(token)
  );
  return response.data;
};

const deleteComment = async (postData, token) => {
  const response = await axios.patch(
    `${API}${postData.id}/comment`,
    { userId: postData.userId },
    createRequestConfig(token)
  );
  return response.data;
};

const createRequestConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const commentService = {
  createComment,
  deleteComment
};

export default commentService;
