import axios from 'axios'

const API_URL = 'http://localhost:9000/waiters/'

//create waiter

const createWaiter = async(waiterData, token) => {
    const config = { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, waiterData, config)
    return response.data
}

const getAllWaiters = async(dateId, token) => {
    const config = { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + dateId, config)
    return response.data
}

const waitersService = {
    createWaiter,
    getAllWaiters
}

export default waitersService