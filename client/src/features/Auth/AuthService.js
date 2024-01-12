import axios from "axios";

// const API = 'https://rone.onrender.com/api/v1/auth/'
const API = "http://localhost:3001/api/auth/";

//@desc User Register
//@route POST /API_URL/register
const userRegister = async (userData) => {
  const response = await axios.post(API + "register/", userData);
  return response.data;
};

//@desc User Login
//@route POST /API_URL/login
const userLogin = async (userData) => {
  const response = await axios.post(API + "login/", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.removeItem("temp");
  }

  return response.data;
};

//Logout

const userLogout = () => {
  localStorage.removeItem("user");
};

const authService = {
  userRegister,
  userLogin,
  userLogout
};

export default authService;
