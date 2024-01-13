import axios from "axios";
import { API_URL } from "../../utils/env";

const API = API_URL + "auth/";

const userRegister = async (userData) => {
  const response = await axios.post(`${API}register/`, userData);
  return response.data;
};

const userLogin = async (userData) => {
  const response = await axios.post(`${API}login/`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.removeItem("temp");
  }

  return response.data;
};

const userLogout = () => {
  localStorage.removeItem("user");
};

const authService = {
  userRegister,
  userLogin,
  userLogout
};

export default authService;
