import * as api from '../services/example'
export default {
  namespace: 'product',
  state: {
    productList: [
      {
        name: '豆子'
      },
      {
        name: '玉米'
      }
    ]
  },
  reducers: {
    updateList(state, action) {
      const currentProductList = deepClone(state)
      currentProductList.productList.push(action.payload)
      return currentProductList
    }
  },
  effects: {
    *updateListAsync({ payload }, { call, put }) {
      yield put({
        type: 'updateList',
        payload
      })
    },
    *updateListHttp({ payload }, { call, put }) {
      // 网络请求
      const result = yield call(api.getProduct, payload)
      const data = result.data
      if (data) {
        yield put({
          type: 'updateList',
          payload: data
        })
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      window.onresize = () => {
        const currentProduct = {
          name: '梨'
        }
        dispatch({
          type: "product/updateList",
          payload: currentProduct
        })
      }
    },
    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        console.log(location)
      })
    },
  },
}

function deepClone(arr) {
  const _obj = JSON.stringify(arr)
  const objClone = JSON.parse(_obj)
  return objClone
}
