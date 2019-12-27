import { takeEvery, put } from 'redux-saga/effects'
import { GET_MY_LIST } from './action-type'
import axios from 'axios'
import { getList } from './action'

function* mySaga() {
    yield takeEvery(GET_MY_LIST, getActionList)
}

function* getActionList() {
    // axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
    //     .then((res) => {
    //         const data = res.data
    //         const action = getList(data)
    //         put(action)
    //     })
    const res = yield axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
    const action = getList(res)
    yield put(action)
}

export default mySaga