import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
import store from './redux/store'
import App from './App'

memoryUtils.user = storageUtils.getUser()

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))