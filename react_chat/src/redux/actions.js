import {
  GET_USER_INFO,
  GET_USERS_lIST
} from './action-types'

const USERS = [
  { name: 'akitaSummer', url: require('../assets/img/v2-2.jpg'), noRead: 2, time: new Date(2020, 3, 20, 14, 35), lastMessage: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', type: 'user', isFriend: true},
  { name: 'akita', url: require('../assets/img/v2-3.jpg'), noRead: 0, time: new Date(2020, 2, 12, 14, 35), lastMessage: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', type: 'user', isFriend: true},
  { name: 'summer', url: require('../assets/img/v2-4.jpg'), noRead: 32, time: new Date(2020, 1, 20, 10, 35), lastMessage: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', type: 'user', isFriend: true},
  { name: '面包', url: require('../assets/img/v2-5.jpg'), noRead: 0, time: new Date(2020, 0, 20, 14, 35), lastMessage: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', type: 'user', isFriend: false},
  { name: '喵', url: require('../assets/img/v2-7.jpg'), noRead: 0, time: new Date(2019, 11, 20, 14, 35), lastMessage: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', type: 'group', isFriend: true}
]

// 格式化日期
const formData = (time, form) => {
  if (form === 'signInTime') {
    return `${time.getFullYear()}-${time.getMonth() > 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)}-${time.getDate() > 10 ? time.getDate() : '0' + time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  } else {
    return `${time.getFullYear()}-${time.getMonth() > 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)}-${time.getDate() > 10 ? time.getDate() : '0' + time.getDate()}`
  }
}

export const getUser = () => {
  return {
    type: GET_USER_INFO,
    data: {
      name: 'User',
      img: require('../assets/img/v2-1.jpg'),
      readme: '把平凡的事做到不平凡',
      signInTime: formData(new Date(2019, 11, 22, 13, 32, 45),'signInTime'),
      ni: 'student',
      sex: '男',
      birthday: formData(new Date(1996, 4, 11)),
      tel: 13018087845,
      email: '644171127@qq.com',
      password: '123456789',
    }
  }
}

export const getList = (users) => {
  return {
    type: GET_USERS_lIST,
    data: users
  }
}

export const getUserList = () => {
  return async (dispatch) => {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(USERS)
      }, 1000)
    })
    dispatch(getList(result))
  }
}
