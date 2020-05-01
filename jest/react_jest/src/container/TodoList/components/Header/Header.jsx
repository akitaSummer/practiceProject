import React from 'react'
import { connect } from 'react-redux'
import { handleInputChange } from '../../../../redux/actions'

const Header = (props) => {

  const handleInputKeyUp = (e) => {
    if (e.keyCode === 13 && props.todoReducer.inputValue) {
      props.addUndoItem(props.todoReducer.inputValue)
      props.handleInputChange('')
    }
  }

  return (
      <div className='header'>
        <div className="header-content">
          Todo
          <input
            placeholder='Todo'
            className='header-input'
            type="text"
            data-testid='header-input'
            value={props.todoReducer.inputValue}
            onChange={(e) => props.handleInputChange(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>
      </div>
  )
}

export default connect(
  state => ({ todoReducer: state.todoReducer }),
  {handleInputChange}
)(Header)
