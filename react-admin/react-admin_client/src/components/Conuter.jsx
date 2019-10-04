import React, {useRef} from 'react'
import PropTypes from 'prop-types'

// UI组件
// 主要做显示与用户交互
// 代码中没有任何redux相关的代码
export default function App({count, incrementRedux, decrementRedux}) {
  App.propTypes = {
    count: PropTypes.number.isRequired,
    incrementRedux: PropTypes.func.isRequired,
    decrementRedux: PropTypes.func.isRequired
  }
  const refVal = useRef()

  const increment = () => {
    incrementRedux(refVal.current.value * 1)
  }

  const decrement = () => {
    decrementRedux(refVal.current.value * 1)
  }

  const incrementOdd = () => {
    if (this.count % 2 === 1) {
      incrementRedux(refVal.current.value * 1)
    }
  }

  const incrementAsync = () => {
    setTimeout(() => {
      incrementRedux(refVal.current.value * 1)
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