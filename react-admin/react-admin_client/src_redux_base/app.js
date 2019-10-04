import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import {action} from './redux/actions'

export default function App({store}) {
  App.propTypes = {
    store: PropTypes.object.isRequired
  }
  const refVal = useRef()
  const count = store.getState()

  const increment = () => {
    store.dispatch(action.increment(refVal.current.value * 1))
  }

  const decrement = () => {
    store.dispatch(action.decrement(refVal.current.value * 1))
  }

  const incrementOdd = () => {
    if (count % 2 === 1) {
      store.dispatch(action.increment(refVal.current.value * 1))
    }
  }

  const incrementAsync = () => {
    setTimeout(() => {
      store.dispatch(action.increment(refVal.current.value * 1))
    }, 1000)
  }

  return (
    <div>
      <p>{count}</p>
      <div>
        <select ref={refVal}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;&nbsp;
        <button onClick={increment}>+</button>&nbsp;&nbsp;
        <button onClick={decrement}>-</button>&nbsp;&nbsp;
        <button onClick={incrementOdd}>+ odd</button>&nbsp;&nbsp;
        <button onClick={incrementAsync}>+ async</button>&nbsp;&nbsp;
      </div>
    </div>
  )
}