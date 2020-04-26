import React, { useState } from 'react'
import Header from './components/Header/Header'
import UndoList from './components/UndoList/UndoList'
import './style.css'

const TodoList = () => {

  const [undoList, setUndoList] = useState([])

  return (
    <div>
      <Header addUndoItem={setUndoList}/>
      <UndoList list={undoList} setUndoList={setUndoList}/>
    </div>
  )
}

export default TodoList
