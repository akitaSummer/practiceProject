import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import UndoList from './components/UndoList/UndoList'
import axios from 'axios'
import './style.css'

const TodoList = () => {

  const [undoList, setUndoList] = useState([])

  const addUndoItem = (item) => {
    const newUndoList = [...undoList, { status: 'div', value: item }]
    setUndoList(newUndoList)
  }

  useEffect( () => {
    // {
    //   data: [{
    //     status: 'div',
    //     value: 'dell lee'
    //   }],
    //     success: true
    // }
    const setList = async () => {
      try {
        const result = await axios.get('/undoList.json')
        setUndoList(result.data)
      } catch(e) {
        console.log(e)
      }
    }
    setList()
    // const I = setTimeout(() => {
    //   setList()
    // }, 5000)
    // return () => {clearTimeout(I)}
  }, [])

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
