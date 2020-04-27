import React, { useState } from 'react'
import Header from './components/Header/Header'
import UndoList from './components/UndoList/UndoList'
import './style.css'

const TodoList = () => {

  const [undoList, setUndoList] = useState([])

  const addUndoItem = (item) => {
    const newUndoList = [...undoList, { status: 'div', value: item }]
    setUndoList(newUndoList)
  }

  const changeStatus = (index) => {
    const newList = undoList.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          status: 'input'
        }
      } else {
        return {
          ...item,
          status: 'div'
        }
      }
    } )
    setUndoList(newList)
  }

  const handleBlur = (index) => {
    const newList = undoList.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          status: 'div'
        }
      } else {
        return {
          ...item
        }
      }
    } )
    setUndoList(newList)
  }

  return (
    <div>
      <Header addUndoItem={addUndoItem}/>
      <UndoList
        list={undoList}
        setUndoList={setUndoList}
        changeStatus={changeStatus}
        handleBlur={handleBlur}
      />
    </div>
  )
}

export default TodoList
