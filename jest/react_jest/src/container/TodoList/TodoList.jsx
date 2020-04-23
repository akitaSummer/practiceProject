import React, { useState } from 'react'
import Header from './components/Header/Header'

const TodoList = () => {

  const [undoList, setUndoList] = useState([])

  return (
    <div>
      <Header addUndoItem={setUndoList}/>
    </div>
  )
}

export default TodoList
