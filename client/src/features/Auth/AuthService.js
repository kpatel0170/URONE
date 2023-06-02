import axios from 'axios'

const API = '/api/'

//Register
const userRegister = async (userData) => {
    const response = await axios.post(API + "register/", userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login
const userLogin = async (userData) => {
    const response = await axios.post(API + "login/", userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout

const userLogout = () =>{
    localStorage.removeItem('user')
}

const authService = {
    userRegister,
    userLogin,
    userLogout
}

export default authService;