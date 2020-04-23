import React, { useState } from 'react'

const Header = (props) => {

  const [value, setValue] = useState('')

  const handleInputKeyUp = (e) => {
    if (e.keyCode === 13 && value) {
      props.addUndoItem(value)
    }
  }

  return (
    <div>
      <input
        type="text"
        data-test='input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={handleInputKeyUp}
      />
    </div>
  )
}

export default Header
