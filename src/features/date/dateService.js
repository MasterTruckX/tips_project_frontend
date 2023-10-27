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

const dateService = {
    createDate
}

export default dateService