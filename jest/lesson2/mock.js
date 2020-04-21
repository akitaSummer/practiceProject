import axios from 'axios'

export const fetchData = () => {
    return axios.get('/').then((response) => {
        return response.data
    })
}

export const getNumber = () => {
    return 123
}