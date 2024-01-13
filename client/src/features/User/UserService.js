import axios from "axios";
import { API_URL } from "../../utils/env";

const createRequestConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const getSingleUser = async (id, token) => {
  const config = createRequestConfig(token);
  const response = await axios.get(`${API_URL}user/${id}`, config);
  console.log(response);
  return response.data;
};

const editSingleUser = async (userData, userId, token) => {
  const config = createRequestConfig(token);
  const response = await axios.put(
    `${API_URL}user/${userId}`,
    userData,
    config
  );
  return response.data;
};

const userService = {
  getSingleUser,
  editSingleUser
};

export default userService;
