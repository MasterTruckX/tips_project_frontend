import axios from 'axios'

const API_URL = 'http://localhost:9000/dates/'


// create date

const createDate = async(dateData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, dateData, config)
    return response.data
}

// get all date
const getAllDates = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// get date by Id
const getDateById = async(id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'date/' + id, config)
    return response.data
}

// update date
const updateDate = async(id,dateData) => {
    const response = await axios.put(API_URL + id,dateData)
    return response.data
}

const deleteDate = async(id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const dateService = {
    createDate,
    getAllDates,
    getDateById,
    updateDate,
    deleteDate
}

export default dateService