import React from 'react'
import ReactDOM from 'react-dom'

import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
import App from './App'

memoryUtils.user = storageUtils.getUser()

ReactDOM.render(<App/>, document.getElementById('root'))