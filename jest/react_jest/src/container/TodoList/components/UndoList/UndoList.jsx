import React from 'react'

const UndoList = (props) => {

  const { list, setUndoList, changeStatus, handleBlur } = props

  const deleteItem = (i) => {
    const newList = [...list]
    newList.splice(i, 1)
    setUndoList(newList)
  }

  const valueChange = (value, i) => {
    const newList = [...list]
    newList[i].value = value
    setUndoList(newList)
  }

  return (
    <div className='undo-list'>
      <div className="undo-list-title">
        正在进行
        <div className="undo-list-count" data-testid='count'>{list.length}</div>
      </div>
      <ul className='undo-list-content'>
        {
          list.map((item, i) => {
            return <li
              className='undo-list-item'
              data-testid='list-item'
              onClick={() => {changeStatus(i)}}
              key={i}>
              {
                item.status === 'div' ? item.value : (
                  <input
                    className='undo-list-input'
                    type="text"
                    data-testid='input'
                    value={item.value}
                    onChange={(e) => valueChange(e.currentTarget.value, i)}
                    onBlur={() => {handleBlur(i)}}
                  />
                )
              }
              <div
                data-testid='delete-item'
                className='undo-list-delete'
                onClick={(e) => {e && e.stopPropagation();deleteItem(i)}}>-</div>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default UndoList
