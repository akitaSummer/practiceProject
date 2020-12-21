import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer'

export type StoreState = {
    count: number
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware()))

export default store