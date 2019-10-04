import React, {useRef} from 'react'
import {connect} from 'react-redux'

import Counter from '../components/Conuter'
import {incrementRedux, decrementRedux} from '../redux/actions'

// 容器组件: 通过connect包装UI组件产生

// // 传统写法
// function mapStateToProps(state) {
//   return {
//     count: state
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     increment(number) {
//       dispatch(increment(number))
//     },
//     decrement(number) {
//       dispatch(decrement(number))
//     }
//   }
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Counter)

export default connect(
  (state) => ({count: state}),
  {incrementRedux, decrementRedux}
)(Counter)