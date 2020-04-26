import React from 'react'

const UndoList = (props) => {

  const { list, setUndoList } = props

  const deleteItem = (i) => {
    const newList = [...list]
    newList.splice(i, 1)
    setUndoList(newList)
  }

  return (
    <div>
      <div data-testid='count'>{list.length}</div>
      <ul>
        {
          list.map((item, i) => {
            return <li data-testid='list-item' key={`${item}-${i}`}>
              {item}
              <span
                data-testid='delete-item'
                onClick={() => {deleteItem(i)}}>-</span>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default UndoList
