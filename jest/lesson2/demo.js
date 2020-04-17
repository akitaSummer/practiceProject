import axios from 'axios'

export const runCallback = (callback) => {
    callback()
}

export const createObject = (classItem) => {
    new classItem()
}

export const getData = () => {
    return axios.get('http://www.dell-lee.com/react/api/demo.json').then(res => res.data)
}