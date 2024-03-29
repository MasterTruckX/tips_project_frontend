import axios from "axios";

const API_URL = 'http://localhost:9000/users/'

// ingresar cuenta de un usuario
const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}


// registrar un usuario
const register = async(userData) => {
    const response = await axios.post(API_URL, userData)
    return response.data
}

//logout
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService