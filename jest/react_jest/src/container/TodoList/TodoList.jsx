import React, { useState } from 'react'
import Header from './components/Header/Header'
import './style.css'

const TodoList = () => {

  const [undoList, setUndoList] = useState([])

  return (
    <div>
      <Header addUndoItem={setUndoList}/>
      <span data-testid='undoList'>{undoList.length}</span>
    </div>
  )
}

export default TodoList
