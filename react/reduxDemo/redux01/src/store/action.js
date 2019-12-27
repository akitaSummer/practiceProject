import { GET_MY_LIST, CHANGE_INPUT, ADD, DEL, GET_LIST } from './action-type'
import axios from 'axios'

export const action = (value) => {
    return {
        type: CHANGE_INPUT,
        value
    }
}

export const add = () => {
    return {
        type: ADD,
        value: ''
    }
}

export const del = (value) => {
    return {
        type: DEL,
        value
    }
}

export const getList = (data) => {
    return {
        type: GET_LIST,
        data
    }
}

export const getTodoList = () => {
    return (dispatch) => {
        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
            .then((res) => {
                const data = res.data
                const action = getList(data)
                dispatch(action)
            })
    }
}

export const getMyListAction = () => {
    return {
        type: GET_MY_LIST
    }
}