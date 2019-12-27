import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
// import thunk from 'redux-thunk'
import createSageMiddleware from 'redux-saga'
import mySage from './sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

// const enhancer = composeEnhancers(applyMiddleware(thunk))
const sageMiddleware = createSageMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sageMiddleware))


const store = createStore(
    reducer,
    enhancer
)

sageMiddleware.run(mySage)

export default store