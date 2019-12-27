import React from 'react';
import { connect } from 'react-redux'
import { add, inputChange } from './store/action'

const TodoList = (props) => {
    const { inputValue, add, inputChange, list } = props
        return ( 
            <div>
                <div>
                    <input type="text" value = {inputValue} onChange={(e) => inputChange(e.target.value)}/>
                    <button onClick={(e) => add(inputValue)}>提交</button>
                </div>
                <ul>
                    {list.map((item, i) => (<li key={item + '' + i}>{item}</li>))}
                </ul>
            </div>
         );
}

const stateToProps = ({inputValue, list}) => {
    return {
            inputValue,
            list
        }
}

// const dispatchToProps = (dispatch) => {
//     return {
//         add(value) {
//             const action = add(value)
//             dispatch(action)
//         },
//         inputChange(value) {
//             const action = inputChange(value)
//             dispatch(action)
//         }
//     }
// }

const dispatchToProps = { add, inputChange }
 
export default connect(stateToProps, dispatchToProps)(TodoList);